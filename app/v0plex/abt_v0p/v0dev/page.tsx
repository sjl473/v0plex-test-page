"use client"

import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"
import CodeBlock from "@/components/code-block"
import ResponsiveImage from "@/components/responsive-img";

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
            <h1>Fast Prototyping: 使用vercel公司的v0.dev</h1>
            <h5>"We are using Radix Primitives on some parts of our design system, multiple mid to large size public and
              internal Next.js apps, marketing websites, and internal prototypes that we experiment with." --- said by
              Rauno Freiberg, UI Engineer at Vercel</h5>
            <br></br>
            <p style={{fontFamily: "IBM Plex Mono", fontSize: '0.8rem', fontWeight: 'bold'}}>
              最后更新：2025年7月20日
            </p>
            
            <p>
              我对前端一窍不通，而且毫不掩饰这一点，自从LLM兴起之后我就再思考如何能用外界工具对我浅薄的前端水准给出帮助，直到有一天我在Twitter上发现了Vercel的v0.dev，我开始认真的觉得AI绝不是华尔街的泡沫。</p>
            <p>原本Vercel我是不在意的，我早就知道了它，不就是翻版Netlify吗？这种公司想模仿私有云又模仿不像，对于向来支持保守商业主义的我来说自然是思维惯性，即使我知道Next
              JS影响范围也蛮广的，可能是因为在银行也有一段时间了，对于小微企业的contribution就当看个乐子
            </p>
            <p>
              但再固执的人也有个限度，当我遇见v0.dev的时候我才认真的感叹Vercel真的下了一步漂亮的大棋，加州的一些初创公司不愧是卷王中的卷王
            </p>
            <ResponsiveImage
              src="/vercel-build.jpeg"
              alt="Vercel的广告"
              caption="Vercel Ship Advertisement"
              aspectRatio="16:9"
              maxWidth="800px"
            />
            <p>v0.dev就是一个prompt
              engineer的壳子，你可以输入你想要的样式、上传Figma文件、上传项目，然后自动的生成你想要的页面，免费用户大概有50轮对话，我试了几下觉得不错之后为了更好的“利用”免费的Credit注册了10个邮箱，理直气壮的用完了6个</p>
            <p>在使用过程中我也发现了一些小问题</p>
            <p>1. 它的replace是纯command line + text search的，比如你有1000行的<CodeBlock inline>global.css</CodeBlock>，你想要它替换，它是整体读入，然后整体输出，这会浪费用户宝贵的token。其实更有想象力的是使用Intellij
              Idea，Jetbrains应该将它的所有GUI功能抽象成CMD，这样人机交互更有力一些</p>
            <p>2. 它默认使用radix ui和tailwindcss，有些component
              lib是默认做好的，你只能自己手动下载之后删除无用的再上传，如果你命令它删除，它会把项目删崩。比如很明显的，我命令v0把所有<CodeBlock
                inline>/app</CodeBlock>中没有使用<CodeBlock inline>/lib</CodeBlock>文件夹的组件清点出来，并做一次code
              cleanup，它清点的永远都不对</p>
            <p>注：我已经很清楚它的lib文件不是每一个都在使用，我让v0.dev去删，却删不对，反而我用Idea很轻松的就do
              refactor了，这很明显就是一个可以优化的点，它还是需要对大型ide的功能做一次拿来主义</p>
            <p>3.
              上下文记忆短，健忘是ai的通病。还是那个问题，它默认的ui是radix，可能它确实频繁的使用radix和tailwindcss做了一定的强化学习，但是这并不是强绑用户必须使用tailwindcss的理由。在我的使用体验中，我开始的prompt是：“you
              must use framework XXX instead of using any tailwindcss and radix
              ui”，起初的5步还是遵守的，但鉴于训练数据带来的惯性，第6步就忘掉了。所以这就是我认为v0只适合打layout而不是focus
              on detail的原因</p>
            <p>再来说说优点</p>
            <p>1. 是最新的npm和node，用的是自家公司的Next
              JS和React，React属于主流技术栈，训练数据并非旁门左道，这样会减少历史包袱</p>
            <p>2. 不会的样式真的可以用v0.dev快速的起一个底子</p>
            <p>3. 商业模式可以持续经营，现在的市面还是属于将ai当成高质量新型产业的阶段，并没有将比如公司首页这种适合v0.dev开发的项目作为替代外包公司的首选项，需要时间来get
              used to it</p>
            <strong>Vercel能将Next
              JS作为最基础的训练项目，充分体现了未来的AI会使用标准化的、稳定的前端开发框架的趋势。可以遇见的未来，我相信Vercel会成为ai前端开发的王</strong>
          </div>
        
        </div>
      </GlobalTheme>
    </>
  )
}