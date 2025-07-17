import { useState, useEffect, useRef } from "react"
import { Copy, Checkmark } from "@carbon/icons-react"

interface CarbonCodeBlockProps {
  children: string
  language?: string
  inline?: boolean
}

export default function CodeBlock({ children, language = "text", inline = false }: CarbonCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [parentFontSize, setParentFontSize] = useState(16)
  const codeRef = useRef<HTMLElement>(null)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }
  
  useEffect(() => {
    if (inline && codeRef.current) {
      // 查找父元素的字体大小
      let parent = codeRef.current.parentElement
      while (parent) {
        const computedStyle = window.getComputedStyle(parent)
        const tagName = parent.tagName.toLowerCase()
        
        // 如果找到标题标签，使用其字体大小
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
          const fontSize = parseFloat(computedStyle.fontSize)
          setParentFontSize(fontSize)
          break
        }
        
        // 如果是段落或其他文本元素，也可以使用其字体大小
        if (['p', 'div', 'span'].includes(tagName)) {
          const fontSize = parseFloat(computedStyle.fontSize)
          if (fontSize > 0) {
            setParentFontSize(fontSize)
            break
          }
        }
        
        parent = parent.parentElement
      }
    }
  }, [inline])
  
  // 根据父元素字体大小计算内联代码块的样式
  const getInlineStyles = () => {
    const baseFontSize = parentFontSize
    const scaleFactor = 0.85 // 代码块字体比父元素小15%
    const codeFontSize = baseFontSize * scaleFactor
    
    // 根据字体大小动态计算padding和其他属性
    const padding = `${codeFontSize * 0.1}px ${codeFontSize * 0.2}px`
    const margin = `0 ${codeFontSize * 0.1}px`
    const borderRadius = Math.max(2, codeFontSize * 0.1)
    
    return {
      background: "#121619",
      color: "var(--v0plex-text-inverse)",
      padding: "0.1rem 0.2rem", // 减少内边距
      borderRadius: `${borderRadius}px`,
      fontSize: `${codeFontSize}px`,
      fontFamily: '"IBM Plex Mono", monospace',
      display: "inline-block",
      margin,
      // verticalAlign: "-10px",
      lineHeight: 1,
    }
  }
  
  if (inline) {
    return (
      <code
        ref={codeRef}
        style={getInlineStyles()}
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
          background: "#21272a",
          color: "#f4f4f4",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.3rem 1rem",
            background: "#21272a",
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
        
        <pre
          style={{
            background: "#121619 !important",
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