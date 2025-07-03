"use client"

import type React from "react"
import { ArrowRight } from "@carbon/icons-react"
import styles from "./info-card.module.css"

interface InfoCardProps {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
  clickable?: boolean
  onClick?: () => void
}

export default function InfoCard({ title, children, icon, clickable = false, onClick }: InfoCardProps) {
  return (
    <div
      className={`${styles.infoCard} ${clickable ? styles.infoCardClickable : ""}`}
      onClick={onClick}
    >
      {}
      {icon && (
        <div className={styles.iconBottomLeft}>
          {icon}
        </div>
      )}

      {}
      {clickable && (
        <div className={styles.iconBottomRight}>
          <ArrowRight size={16} />
        </div>
      )}

      <h4 className={styles.cardTitle}>
        {title}
      </h4>

      <div className={`${styles.cardContent} ${clickable ? styles.cardContentClickable : ""}`}>
        {children}
      </div>
    </div>
  )
}
