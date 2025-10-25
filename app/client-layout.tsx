"use client"

import type React from "react"
import { useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { MathJaxProvider } from "@/components/mathjax-provider"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import Footer from "@/components/footer"
import styles from "./client-layout.module.css"
import PageNavigation from "@/components/page-navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const toggleMobileSidebar = () => {
    console.log("Toggle sidebar clicked, current state:", isMobileSidebarOpen)
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  const closeMobileSidebar = () => {
    console.log("Close sidebar clicked")
    setIsMobileSidebarOpen(false)
  }

  return (
    <ThemeProvider>
      <MathJaxProvider>
        <div className={styles.container}>
          <Header onToggleSidebar={toggleMobileSidebar} />
          <div className={styles.layout}>
            <Sidebar isMobileOpen={isMobileSidebarOpen} onCloseMobile={closeMobileSidebar} />
            <main className={styles.mainContent}>
              <div className={styles.contentWrapper}>{children}</div>
              <PageNavigation />
              <Footer />
            </main>
          </div>
        </div>
      </MathJaxProvider>
    </ThemeProvider>
  )
}
