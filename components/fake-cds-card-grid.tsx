"use client"

import type React from "react"
import styles from "./fake-cds-card-grid.module.css"

interface CardGridProps {
  children: React.ReactNode
  columns?: number
}

export default function FakeCdsCardGrid({ children, columns = 2 }: CardGridProps) {
  return (
    <div
      className={styles.fakeCdsCardGrid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  )
}
