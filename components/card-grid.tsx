"use client"

import type React from "react"
import styles from "./card-grid.module.css"

interface CardGridProps {
  children: React.ReactNode
  columns?: number
}

export default function CardGrid({ children, columns = 2 }: CardGridProps) {
  return (
    <div
      className={styles.cardGrid}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  )
}
