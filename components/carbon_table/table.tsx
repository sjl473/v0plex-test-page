"use client"

import React, { ReactNode } from 'react';
import { useTableHeaderAlignment } from './hook';
import styles from "./table.module.css"

interface AlignedTableProps {
  children: ReactNode;
  tableSelector?: string;
  debounceMs?: number;
  enableResize?: boolean;
  className?: string;
  containerClassName?: string;
  maxHeight?: string;
  enableHorizontalScroll?: boolean;
  enableVerticalScroll?: boolean;
}

export default function AlignedTable({
                                       children,
                                       tableSelector = '.cds--data-table',
                                       debounceMs = 100,
                                       enableResize = true,
                                       className = '',
                                       containerClassName = '',
                                       maxHeight = '400px',
                                       enableHorizontalScroll = true,
                                       enableVerticalScroll = true
                                     }: AlignedTableProps) {
  
  // 使用自定义hook处理表头对齐
  useTableHeaderAlignment({
    tableSelector,
    debounceMs,
    enableResize,
    maxHeight,
    enableHorizontalScroll,
    enableVerticalScroll
  });
  
  return (
    <div
      className={`${styles.scrollableTableContainer} ${containerClassName}`}
      style={{
        maxHeight,
        overflowX: enableHorizontalScroll ? 'scroll' : 'hidden',
        overflowY: enableVerticalScroll ? 'scroll' : 'hidden'
      }}
    >
      <div className={`${styles.carbonTableAlignment} ${className}`}>
        {children}
      </div>
    </div>
  );
}