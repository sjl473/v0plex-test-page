"use client"

import { useState } from "react"
import { Copy, Checkmark } from "@carbon/icons-react"

interface CarbonCodeBlockProps {
    children: string
    language?: string
    inline?: boolean 
}


export default function CodeBlock({ children, language = "text", inline = false }: CarbonCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }
    if (inline) {
        return (
            <code
                style={{
                    background: "var(--v0plex-background-inverse)",
                    color: "var(--v0plex-text-inverse)",
                    padding: "0.125rem 0.25rem",
                    borderRadius: "2px",
                    fontSize: "0.55rem",
                    fontFamily: '"IBM Plex Mono", monospace',
                    display: "inline-block",
                    margin: "0 0.25rem",
                }}
            >
                {children}
            </code>
        )
    }


    
  const getHighlightedCode = () => {
    
    
    return children
  }

  return (
    <div style={{ marginBottom: "1.5rem", position: "relative" }}>
      <div
        style={{
          background: "#161616",
          color: "#f4f4f4",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.75rem 1rem",
            background: "#262626",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#c6c6c6",
            }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              color: "#c6c6c6",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f4f4f4"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#c6c6c6"
            }}
            title="Copy Code"
          >
            {copied ? <Checkmark size={16} /> : <Copy size={16} />}
          </button>
        </div>

        {}
        <pre
          style={{
            background: "#161616",
            color: "#f4f4f4",
            padding: "1rem",
            margin: 0,
            overflow: "auto",
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: "0.7rem",
            lineHeight: 1.1,
            whiteSpace: "pre-wrap",
          }}
        >
          <code>{getHighlightedCode()}</code>
        </pre>
      </div>
    </div>
  )
}
