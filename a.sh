#!/bin/bash

# 设置脚本在遇到错误时退出
set -e

# 颜色输出函数
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查必要的命令是否存在
check_commands() {
    local commands=("pnpm" "git")
    for cmd in "${commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            print_error "$cmd 命令未找到，请先安装"
            exit 1
        fi
    done
}

# 主函数
main() {
    print_info "开始部署流程..."

    # 检查必要命令
    check_commands

    # 步骤1: 运行构建
    print_info "步骤1: 运行 pnpm run build"
    if ! pnpm run build; then
        print_error "构建失败"
        exit 1
    fi

    # 检查构建输出目录是否存在
    if [ ! -d "gh-page-output" ]; then
        print_error "构建输出目录 gh-page-output 不存在"
        exit 1
    fi

    # 步骤2: 检查目标目录
    TARGET_DIR="$HOME/sjl473.github.io"
    if [ ! -d "$TARGET_DIR" ]; then
        print_error "目标目录 $TARGET_DIR 不存在"
        exit 1
    fi

    # 步骤3: 清理目标目录（保留.git）
    print_info "步骤2: 清理目标目录..."
    cd "$TARGET_DIR"

    # 确保我们在正确的git仓库中
    if [ ! -d ".git" ]; then
        print_error "目标目录不是一个git仓库"
        exit 1
    fi

    # 清理除.git外的所有文件
    print_info "清理现有文件..."
    find . -maxdepth 1 ! -name ".git" ! -name "." -exec rm -rf {} + 2>/dev/null || true

    # 步骤4: 复制新文件
    print_info "步骤3: 复制构建文件..."
    cd - > /dev/null  # 回到原始目录
    cp -r gh-page-output/* "$TARGET_DIR/"

    # 步骤5: Git操作
    print_info "步骤4: 提交并推送到GitHub..."
    cd "$TARGET_DIR"

    # 检查是否有改动
    if git diff --quiet && git diff --staged --quiet; then
        print_warning "没有检测到文件改动，跳过提交"
        exit 0
    fi
    touch .nojekyll
    # 添加所有文件
    git add .

    # 生成提交消息（包含时间戳）
    COMMIT_MSG="Deploy website - $(date '+%Y-%m-%d %H:%M:%S')"

    # 提交
    if git commit -m "$COMMIT_MSG"; then
        print_info "提交成功: $COMMIT_MSG"
    else
        print_error "提交失败"
        exit 1
    fi

    # 推送
    if git push; then
        print_info "推送成功！"
        print_info "部署完成！"
    else
        print_error "推送失败"
        exit 1
    fi
}

# 运行主函数
main "$@"