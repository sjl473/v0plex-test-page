"use client"

import {GlobalTheme} from "@carbon/react"
import {useTheme} from "@/components/theme-provider"
import Link from "@/components/link"

export default function LinkExample() {
  const {theme} = useTheme()
  
  return (
    <GlobalTheme theme={theme}>
      <div className="v0plex-content">
        <div className="page-typography-content">
          
          <div>
            <br></br>
            <h1>v0plex components: @link</h1>
            
            <div style={{marginBottom: "1rem"}}>
              <Link
                href="https://example.com"
              >
                A very normal link
              </Link>
            </div>
            
            
            <div style={{marginBottom: "1rem"}}>
              <Link
                href="https://example.com"
                style={{fontSize: "1.2rem", fontWeight: "bold"}}
              >
                A customized link with inline stylesheets
              </Link>
            </div>
            
            
            <div style={{
              backgroundColor: "#000000",
              padding: "1rem",
              marginBottom: "1rem"
            }}>
              <Link
                href="https://example.com"
                isDark={true}
              >
                A link with constant dark theme
              </Link>
            </div>
            
            
            <div style={{display: "flex", gap: "2rem"}}>
              <Link
                href="#"
                disabled
              >
                A disabled link with light theme
              </Link>
              
              <Link
                href="#"
                disabled
                isDark
              >
                A disabled link with dark theme
              </Link>
            </div>
          </div>
        
        </div>
      </div>
    </GlobalTheme>
  )
}

