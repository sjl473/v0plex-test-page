"use client"

import CodeBlock from "@/components/code-block"
import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function OperatorOverloadingPage() {
  const {theme} = useTheme()
  
  return (
    <>
      <style jsx>{`
        h1 {
          font-weight: bolder;
          font-size: 4rem;
          color: ${theme === 'white' ? '#491d8b' : '#be95ff'};
        }

        h4 {
          color: ${theme === 'g100' ? '#78a9ff' : '#002d9c'};
        }

        strong {
          color: ${theme === 'white' ? '#740937' : '#ffafd2'};
        }
      `}</style>
      
      <GlobalTheme theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            <h1>操作符重载学习</h1>
            
            <h4>基础概念</h4>
            <p>
              首先定义两个复数类，并使用 <CodeBlock inline language="cpp">+=</CodeBlock> 使这两个类相加：
            </p>
            <CodeBlock language="cpp">
              {`complex c1 (5, 1);
complex c2 (2);
c2 += c1;
c2 += c1 += c1;`}
            </CodeBlock>
            
            <p>
              我们的目标是实现一组合格的操作符重载：
            </p>
            <CodeBlock language="cpp">
              {`inline complex& complex::operator += (const complex& r) {
  return __doapl(this, r);
}

inline complex& __doapl(complex* ths, const complex& r) {
  ths->re += r.re;
  ths->im += r.im;
  return *ths;
}`}
            </CodeBlock>
            
            <h4>inline 关键字</h4>
            <p>
              <CodeBlock inline language="cpp">inline</CodeBlock> 涉及编译器认为此段代码何时应该展开的实现细节，很难在此论述它的含义，有兴趣可以去看
              gcc 的实现。
            </p>
            
            <h4>__doapl 的设计考量</h4>
            <p>
              这种设计目的是为了将目标和功能过程分离，比如我要做 A，A 包括了 2 个很常见的动作 X 和 Y，那么 X、Y 都应当单独封装：
            </p>
            <CodeBlock language="cpp">
              {`do A() { X; Y; }
do X() {}
do Y() {}`}
            </CodeBlock>
            
            <h4>类内和类外重载</h4>
            <p>
              众所周知，操作符重载还有另一种常见的形式：
            </p>
            <CodeBlock language="cpp">
              {`inline complex operator+(const complex& x, const complex& y) {
  return complex(real(x) + real(y), image(x) + image(y));
}

complex c1, c2, c3;
c2 = c1 + c2;`}
            </CodeBlock>
            
            <p>
              通过发现它和上部分的区别，产生问题：什么时候参数里有两个值，什么时候有一个值？<CodeBlock inline
                                                                                                   language="cpp">c1 =
              c2 + c3 + c4</CodeBlock> 和 <CodeBlock inline language="cpp">c1 += c2 += c3</CodeBlock> 的处理逻辑会因为参数而改变么？
            </p>
            
            
            <p>
              <strong>this 指针省略：</strong>
              <br/>
              对于 <CodeBlock inline language="cpp">inline complex& complex::operator += (const complex&
              r)</CodeBlock> 函数，编译器会将它认为是 <CodeBlock inline language="cpp">inline complex& complex::operator
              += (this, const complex & r)</CodeBlock>，因为它是类的成员函数，所以多了一个 <CodeBlock inline
                                                                                                    language="cpp">this</CodeBlock>，代表这个类的实例本身，所以 <CodeBlock
              inline language="cpp">c2 += c1</CodeBlock>，本质上还是两个参数，为什么只写一个参数是因为剩下的那个（隐藏的）参数代表自身。
            </p>
            
            <h4>连续累加的实现原理</h4>
            <p>
              <strong>针对类内重载：</strong>为什么可以 <CodeBlock inline
                                                                  language="cpp">c1+=c2+=c1+=cn......</CodeBlock>，因为它的实现是返回一个 <CodeBlock
              inline language="cpp">complex&</CodeBlock>，假设不返回 <CodeBlock inline
                                                                               language="cpp">complex&</CodeBlock> 而返回一个
              void，结果会导致：<CodeBlock inline language="cpp">c1+=c2</CodeBlock> 没有问题，但是 <CodeBlock inline
                                                                                                           language="cpp">c1+=c2+=c3</CodeBlock> 会出现不能将空转换为 <CodeBlock
              inline language="cpp">complex&</CodeBlock> 的错误。所以类内重载要用 <CodeBlock inline
                                                                                            language="cpp">&</CodeBlock>，但是直接
              return by value 也是可以的，用 <CodeBlock inline language="cpp">&</CodeBlock> 只是因为性能考量。
            </p>
            
            <p>
              <strong>对于类外重载：</strong>基本不可以 return by ref，因为生命周期会消失。
            </p>
            
            <CodeBlock language="cpp">
              {`// 合法，为什么？不知道
inline complex& operator+ (const complex& x) {
   return x;
}
cout << (+x) << endl;`}
            </CodeBlock>
            
            <CodeBlock language="cpp">
              {`// 不合法，因为必须返回本地对象，不能返回complex&
inline complex& operator- (const complex& x) {
  return complex(-real(x), -image(x));
}

// 同样不合法
inline complex& operator+(const complex& x, const complex& y)`}
            </CodeBlock>
            
            <h4>为什么重载 &lt;&lt; 需要在类外</h4>
            <CodeBlock language="cpp">
              {`inline complex conj(const complex &x ) {
  return complex(real(x), -image(x));
}

cout << conj(c1) << endl;
cout << conj(c1) << conj(c2) << endl;`}
            </CodeBlock>
            
            <CodeBlock language="cpp">
              {`#include <iostream>
ostream& operator << (ostream& os, complex& c1) {
  return os << "image" << c1.image <<  "real" << c1.real;
}`}
            </CodeBlock>
            
            <p>
              这个无法写成类函数，因为 <CodeBlock inline language="cpp">cout</CodeBlock> 是一个 <CodeBlock inline
                                                                                                          language="cpp">ostream</CodeBlock> 对象，标准库写好的，我们只能写成
              global，然后，按照 <CodeBlock inline
                                          language="cpp">ostream &lt;&lt; complex</CodeBlock> 的结构，我们将第一个参数定义为 <CodeBlock
              inline language="cpp">ostream& os</CodeBlock>，<CodeBlock inline language="cpp">&</CodeBlock> 为了效率。
            </p>
            
            <ul>
              <li>- 不能加 <CodeBlock inline language="cpp">const</CodeBlock>，因为加了 <CodeBlock inline
                                                                                                  language="cpp">const</CodeBlock> 我们就没有办法写入这个 <CodeBlock
                inline language="cpp">ostream</CodeBlock>。
              </li>
              <li>- 对于连续输出 <CodeBlock inline
                                            language="cpp">&lt;</CodeBlock>，本质是一个执行顺序的问题，从左到右，返回 <CodeBlock
                inline language="cpp">ostream&</CodeBlock>，（不存在 <CodeBlock inline
                                                                              language="cpp">ostream&</CodeBlock> 对象在函数内销毁，所以没必要输出 <CodeBlock
                inline language="cpp">ostream</CodeBlock> 值类型）
              </li>
            </ul>
          </div>
        </div>
      </GlobalTheme>
    </>
  )
}