"use client"

import type React from "react"

interface FakeCdsCardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export default function FakeCdsCard({ title, children, className = "" }: FakeCdsCardProps) {
  return (
    <div
      className={`carbon-card ${className}`}
      style={{
        background: "var(--v0plex-background)",
        border: "1px solid var(--v0plex-border-subtle)",
        borderRadius: "4px",
        padding: "1.5rem",
        marginBottom: "1rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {title && (
        <h3
          style={{
            color: "var(--v0plex-text-primary)",
            fontSize: "1.25rem",
            fontWeight: 600,
            marginBottom: "1rem",
            marginTop: 0,
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ color: "var(--v0plex-text-primary)" }}>{children}</div>
    </div>
  )
}
