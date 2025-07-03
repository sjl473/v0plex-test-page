"use client"

import type React from "react"
import styles from "./content-table.module.css"

interface TableRow {
  [key: string]: React.ReactNode
}

interface ContentTableProps {
  headers: string[]
  rows: TableRow[]
}

export default function ContentTable({ headers, rows }: ContentTableProps) {
  
  const allRows = [
    
    headers.reduce((acc, header, index) => {
      acc[`col${index}`] = header
      return acc
    }, {} as TableRow),
    
    ...rows.map((row) => {
      const newRow: TableRow = {}
      headers.forEach((header, index) => {
        newRow[`col${index}`] = row[header]
      })
      return newRow
    }),
  ]

  return (
    <div className={styles.tableContainer}>
      <table className={styles.contentTable}>
        <tbody>
          {allRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((_, cellIndex) => (
                <td key={cellIndex}>{row[`col${cellIndex}`]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
