"use client"

import {GlobalTheme, ListItem, Theme, UnorderedList} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function BlogSystemConceptPage() {
  const {theme} = useTheme()
  
  return (
    <>
      <style jsx>{`
        h1 {
          font-size: 3rem;
          color: ${theme === 'white' ? '#491d8b' : '#be95ff'};
        }

        h2 {
          color: ${theme === 'white' ? '#491d8b' : '#be95ff'};
        }


        a {
          color: ${theme === 'g100' ? '#78a9ff' : '#002d9c'};
          text-decoration: underline;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
      
      <GlobalTheme theme={theme}>
        <div className="v0plex-content">
          <div className="page-typography-content">
            
            <h1>需求分析：基于Carbon Design的React博客系统构想</h1>
            
            <p style={{fontFamily: "IBM Plex Mono", fontSize: '0.8rem', fontWeight: 'bold'}}>
              最后更新：2025年7月20日
            </p>
            
            <p>
              从2023年年末开始，我一直想借鉴<a href="https://carbondesignsystem.com/" target="_blank"
                                              rel="noopener noreferrer"><strong>Carbon Design</strong></a>做一个React博客页面，因为我很欣赏IBM
              design的UI和grid system。但是限于自己前端开发的水平，一直没有形成什么项目。
            </p>
            
            <p>
              我觉得一个博客系统应该至少支持以下七个功能性需求：
            </p>
            
            <div className="nested-list-container">
              <Theme as="section" theme={theme}>
                <UnorderedList isExpressive={false}>
                  <ListItem>
                    侧边栏 (Sidebar)
                    <UnorderedList nested>
                      <ListItem>侧边目录，可以查找文章的标题</ListItem>
                      <ListItem>支持多级目录。比如，一些博客明显属于一个主题下的嵌套主题，就要使用多级目录</ListItem>
                      <ListItem>支持超长文章列表上下左右的滚动，文章标题超长如何处理</ListItem>
                    </UnorderedList>
                  </ListItem>
                  
                  <ListItem>
                    <>全局搜索 (Global Search)</>
                    <UnorderedList nested>
                      <ListItem>可以搜索文章的内容和标题</ListItem>
                      <ListItem>支持多种语言</ListItem>
                    </UnorderedList>
                  </ListItem>
                  
                  <ListItem>
                    <>数学公式支持 (Math Formula Support)</>
                    <UnorderedList nested>
                      <ListItem>支持<a href="https://katex.org/">KaTeX</a>语法</ListItem>
                    </UnorderedList>
                  </ListItem>
                  
                  <ListItem>
                    <>代码高亮 (Code Highlight)</>
                    <UnorderedList nested>
                      <ListItem>包括inline和block</ListItem>
                    </UnorderedList>
                  </ListItem>
                  
                  <ListItem>
                    主题切换
                    <UnorderedList nested>
                      <ListItem>Light/Dark theme切换</ListItem>
                    </UnorderedList>
                  </ListItem>
                  
                  <ListItem>
                    多种HTML元素嵌入
                    <UnorderedList nested>
                      <ListItem>可以嵌入iframe。比如，方便嵌入实时的金融市场数据、GIS地图、视频链接</ListItem>
                      <ListItem>可以嵌入其他JS、CSS的元素。比如，用户想要灵活地定制一组图片组成的Gallery，需要特制一些CSS，或者使用第三方库</ListItem>
                      <ListItem>可以嵌入JSX元素。有些特制的元素不是vanilla JS，而是默认就提供React JSX或者TSX，这一点Hexo和Hugo是不支持的，用户在使用md或者mdx的同时就牺牲了自由度</ListItem>
                    </UnorderedList>
                  </ListItem>
                  
                  <ListItem>
                    响应式布局
                    <UnorderedList nested>
                      <ListItem>支持平板、手机、电脑三种布局。在布局切换变化时，同时兼顾满足上面的所有需求</ListItem>
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
              </Theme>
            </div>
            
            <p>
              实际上能同时做到这七点的blog system很少。经常是能满足4-5点之后不满足，而且UI的设计还有排版并不合我意。
              于是我打算利用AI工具生成大体的模板，自己再根据进度针对某一模块做<strong>小幅、多次的修改</strong>。
              实际上到现在为止，<strong>v0plex</strong>也没有完全实现我说的7点，有各种各样小的问题，后续会一一修正。
            </p>
            <p>
              除此之外，非功能性需求也不可忽视，以下是我在开发过程中遇到的技术选型问题
            </p>
            <div className="nested-list-container">
              <Theme as="section" theme={theme}>
                <UnorderedList isExpressive={false}>
                  <ListItem>
                    <>Node, npm, React等dependency的版本问题</>
                    <UnorderedList nested>
                      <ListItem>经常性的，太老的framework引入新的React
                        component会导致版本问题，反之亦然，有些component甚至6-7年没有更新</ListItem>
                      <ListItem>强制将隔代的dependency互相杂糅会导致配置文件地狱</ListItem>
                      <ListItem>用户无法一次性build成功，即使是按照教程，no matter how they tried</ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    <>编译速度</>
                    <UnorderedList nested>
                      <ListItem>例如：IBM Carbon Design
                        System的官方文档由Gatsby驱动，又内依赖大量的scss，编译速度非常慢，每次清理cache之后至少要等一分钟</ListItem>
                    </UnorderedList>
                  </ListItem>
                  <ListItem>
                    <>是否引入了新型非主流技术栈</>
                    <UnorderedList nested>
                      <ListItem>前端社区3月一更新，各类舞文弄墨的新技术栈无法形成广泛共识</ListItem>
                    </UnorderedList>
                  </ListItem>
                </UnorderedList>
              </Theme>
            </div>
            <p>所以综上所述，我理想中的blog system具备的特质也就水落石出了：</p>
            <div className="nested-list-container">
              <Theme as="section" theme={theme}>
                <UnorderedList isExpressive={false}>
                  <ListItem>纯react或者纯vue</ListItem>
                  <ListItem>node版本应该是最新的</ListItem>
                  <ListItem>商业级ui框架可以自由嵌入，允许用户<strong>快速的、完全自由的自定义其他插件</strong>，所以不能是Hexo或者Hugo，甚至由于保守的技术栈选型，不能使用Astro等太新的技术栈</ListItem>
                </UnorderedList>
              </Theme>
            </div>
            <p>
              <>总之，强自由度就会更少依赖于某一框架，总体来讲，得益于这个时代有ai工具加持，能实现开发者心中很多原本虚无缥缈的idea，通过v0.dev的神力，我上述的需求不再是idea，而是已经实现了的现实。下一篇blog会详细介绍v0.dev如何快速的帮我fast prototype</>
            </p>
          </div>
        </div>
      </GlobalTheme>
    </>
  )
}