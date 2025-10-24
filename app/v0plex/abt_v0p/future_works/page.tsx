"use client"

import CodeBlock from "@/components/code-block"
import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"

export default function FutureWorksPage() {
  const {theme} = useTheme()
  
  return (
    <>
      <style jsx>{`
        h1 {
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
          </div>
        </div>
      </GlobalTheme>
    </>
  )
}