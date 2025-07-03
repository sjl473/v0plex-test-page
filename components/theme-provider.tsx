"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    
    try {
      const savedTheme = localStorage.getItem("carbon-theme")
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme)
      } else {
        
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          setTheme("dark")
        }
      }
    } catch (error) {
      console.log("Error reading theme from localStorage:", error)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      try {
        
        document.documentElement.setAttribute("v0plex-theme", theme)
        document.body.setAttribute("v0plex-theme", theme)
        localStorage.setItem("carbon-theme", theme)
      } catch (error) {
        console.log("Error applying theme:", error)
      }
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
