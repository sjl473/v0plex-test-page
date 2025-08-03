"use client"

import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"
import CodeBlock from "@/components/code-block"
import ResponsiveImage from "@/components/responsive-img";
import PageDates from "@/components/last-updated-at";

export default function UseV0DevPage() {
  const {theme} = useTheme()
  
  return (
    <>
      <style jsx>{`
        h1 {
          font-size: 3rem;
          color: ${theme === 'white' ? '#491d8b' : '#be95ff'};
        }

        h5 {
          font-size: 0.7rem;
          font-weight: 400;
          font-family: 'IBM Plex Mono', serif;
          color: ${theme === 'white' ? '#00539a' : '#82cfff'};
        }


        strong {
          color: ${theme === 'g100' ? '#78a9ff' : '#002d9c'};
        }
      
      `}</style>
      
      <GlobalTheme theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            <h1>Fast Prototyping：使用 Vercel 公司的 v0.dev</h1>
            <h5>"We are using Radix Primitives on some parts of our design system, multiple mid to large size public and
              internal Next.js apps, marketing websites, and internal prototypes that we experiment with." --- said by
              Rauno Freiberg, UI Engineer at Vercel</h5>
            <br></br>
            <PageDates               publishedAt="July 20th 2025"
                                     updatedAt="August 3nd 2025"/>
            
            <p>
              我对前端一窍不通，而且毫不掩饰这一点。自从 LLM 兴起之后我就在思考如何能用外界工具对我浅薄的前端水准给出帮助，直到有一天我在
              Twitter 上发现了 Vercel 的 v0.dev，我开始认真地觉得 AI 绝不是华尔街的泡沫。</p>
            <p>原本 Vercel 我是不在意的，我早就知道了它，不就是翻版 Netlify
              吗？这种公司想模仿私有云又模仿不像，对于向来支持保守商业主义的我来说自然是思维惯性，即使我知道 Next.js
              影响范围也蛮广的，可能是因为在银行也有一段时间了，对于小微企业的 contribution 就当看个乐子。</p>
            <p>
              但当我遇见 v0.dev 的时候我才认真地感叹 Vercel
              真的下了一步漂亮的大棋，加州的一些初创公司不愧是卷王中的卷王。</p>
            <ResponsiveImage
              src="/vercel-build.jpeg"
              alt="Vercel的在加州某车库上打的广告"
              caption="Vercel的在加州某车库上打的广告"
              aspectRatio="16:9"
              maxWidth="800px"
            />
            <p>v0.dev 就是一个 prompt engineer 的壳子，你可以输入你想要的样式、上传 Figma 文件、上传项目，然后自动地生成你想要的页面。免费用户大概有
              50 轮对话，我试了几下觉得不错之后为了更好地"利用"免费的 Credit 注册了 10 个邮箱，理直气壮地用完了 6 个。</p>
            <p>在使用过程中我也发现了一些小问题：</p>
            <p>1. 它的 replace 是纯 command line + text search 的，比如你有 1000 行的 <CodeBlock
              inline>global.css</CodeBlock>，你想要它替换，它是整体读入，然后整体输出，这会浪费用户宝贵的 token。其实更有想象力的是使用
              Intellij Idea，Jetbrains 应该将它的所有 GUI 功能抽象成 CMD，这样人机交互更有力一些。</p>
            <p>2. 它默认使用 Radix UI 和 TailwindCSS，有些 component lib
              是默认做好的，你只能自己手动下载之后删除无用的再上传，如果你命令它删除，它会把项目删崩。比如很明显的，我命令 v0
              把所有 <CodeBlock inline>/app</CodeBlock> 中没有使用 <CodeBlock inline>/lib</CodeBlock> 文件夹的组件清点出来，并做一次
              code cleanup，它清点的永远都不对。</p>
            <p>注：我已经很清楚它的 lib 文件不是每一个都在使用，我让 v0.dev 去删，却删不对，反而我用 Idea 很轻松地就 do
              refactor 了，这很明显就是一个可以优化的点，它还是需要对大型 IDE 的功能做一次拿来主义。</p>
            <p>3. 上下文记忆短，健忘是 AI 的通病。还是那个问题，它默认的 UI 是 Radix，可能它确实频繁地使用 Radix 和
              TailwindCSS 做了一定的强化学习，但是这并不是强绑用户必须使用 TailwindCSS 的理由。在我的使用体验中，我开始的
              prompt 是："you must use framework XXX instead of using any TailwindCSS and Radix UI"，起初的 5
              步还是遵守的，但鉴于训练数据带来的惯性，第 6 步就忘掉了。所以这就是我认为 v0 只适合打 layout 而不是 focus on
              detail 的原因。</p>
            <p>再来说说优点：</p>
            <p>1. 是最新的 npm 和 node，用的是自家公司的 Next.js 和 React，React
              属于主流技术栈，训练数据并非旁门左道，这样会减少历史包袱。</p>
            <p>2. 不会的样式真的可以用 v0.dev 快速地起一个底子。</p>
            <p>3. 商业模式可以持续经营，现在的市面还是属于将 AI 当成高质量新型产业的阶段，并没有将比如公司首页这种适合
              v0.dev 开发的项目作为替代外包公司的首选项，需要时间来 get used to it。</p>
            <strong>Vercel 能将 Next.js 作为最基础的训练项目，充分体现了未来的 AI 会使用标准化的、稳定的前端开发框架的趋势。可以遇见的未来，我相信
              Vercel 会成为 AI 前端开发的王。</strong>
            <p></p>
            <p><strong>2025年8月2号更新：</strong>很遗憾，没有任何一家企业会让用户注册15个邮箱去白嫖它的GPU，自大概这个时候起，v0.dev只提供md模型的5次月度免费使用，所以基本用户只能使用sm模型来用完5个单位的credit；sm模型的性能基本不够看，且bolt.new,
              rocket.new等竞争产品一来是缺乏和v0.dev媲美的竞争力，二是也不支持给用户很大的credit来常鲜，所以v0plex白嫖v0.dev的日子一去不复返了，后续本站的framework会使用普通问答式的模型进行迭代。</p>
            <p><strong>2025年8月3号更新：</strong>喜闻字节跳动推出了新一代Agent平台，但经过实践，还是无法和Vercel的v0.dev进行媲美，给人的感觉一如既往的浮夸且臃肿，不支持上传代码库进行Agent化开发，也找不到上传Figma做Prototype。国内市场的产品使用端从Steve
              Jobs那个时代开始就抓不住重点，堆叠功能和自以为是，用户即使在“缺芯少魂”的卡脖子现状被攻破后，预测也将会长期陷入糟糕的产品体验中，最终将变成大厂项目组互相内卷的鱼肉游戏。同比下，个人还是更期待Alibaba的Lingma一些，至少和Jetbrains整合的路线是正确的，AI
              Agent需要建立在一个已经完备的非AI
              Agent上，搞个“精通各项技能的「通用实习生」，各行各业的「领域专家」”纯属玩具的杂耍，没有任何意义。</p>
          </div>
        
        </div>
      </GlobalTheme>
    </>
  )
}
