"use client"

import { useEffect, useRef } from 'react';

interface UseTableHeaderAlignmentOptions {
  tableSelector?: string;
  debounceMs?: number;
  enableResize?: boolean;
  maxHeight?: string;
  enableHorizontalScroll?: boolean;
  enableVerticalScroll?: boolean;
}

export function useTableHeaderAlignment({
                                          tableSelector = '.cds--data-table',
                                          debounceMs = 100,
                                          enableResize = true,
                                          maxHeight = '400px',
                                          enableHorizontalScroll = true,
                                          enableVerticalScroll = true
                                        }: UseTableHeaderAlignmentOptions = {}) {
  
  const rafId = useRef<number>();
  const timeoutId = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    
    const isMobile = () => window.innerWidth <= 768;
    
    const perfectlyAlignTableHeaders = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        const tables = document.querySelectorAll(tableSelector);
        
        tables.forEach(table => {
          const tableElement = table as HTMLElement;
          const container = tableElement.closest('.scrollableTableContainer') as HTMLElement;
          
          if (container) {
            // 设置容器滚动属性
            container.style.overflowX = enableHorizontalScroll ? 'scroll' : 'hidden';
            container.style.overflowY = enableVerticalScroll ? 'scroll' : 'hidden';
            container.style.maxHeight = maxHeight;
            container.style.display = 'block';
            container.style.position = 'relative';
          }
          
          const tbodyRows = table.querySelectorAll('tbody tr');
          const theadRow = table.querySelector('thead tr');
          
          if (tbodyRows.length > 0 && theadRow) {
            const firstTbodyRow = tbodyRows[0];
            const tbodyCells = firstTbodyRow.querySelectorAll('td');
            const theadCells = theadRow.querySelectorAll('th');
            
            // 先重置所有样式
            tableElement.style.tableLayout = 'auto';
            tableElement.style.width = 'auto';
            
            theadCells.forEach((th) => {
              (th as HTMLElement).style.width = 'auto';
            });
            
            tbodyCells.forEach((td) => {
              (td as HTMLElement).style.width = 'auto';
            });
            
            // 强制重新计算
            tableElement.offsetHeight;
            
            // 现在获取实际的单元格宽度
            const cellWidths: number[] = [];
            tbodyCells.forEach((td, index) => {
              const rect = td.getBoundingClientRect();
              cellWidths[index] = rect.width;
            });
            
            // 设置表格为固定布局
            tableElement.style.tableLayout = 'fixed';
            
            // 计算总宽度
            const totalWidth = cellWidths.reduce((sum, width) => sum + width, 0);
            const minTableWidth = isMobile() ? 600 : 800;
            const finalTableWidth = Math.max(totalWidth, minTableWidth);
            
            tableElement.style.width = finalTableWidth + 'px';
            tableElement.style.minWidth = finalTableWidth + 'px';
            
            // 精确设置每列宽度
            theadCells.forEach((th, index) => {
              if (cellWidths[index]) {
                const thElement = th as HTMLElement;
                const exactWidth = cellWidths[index];
                
                thElement.style.width = exactWidth + 'px';
                thElement.style.minWidth = exactWidth + 'px';
                thElement.style.maxWidth = exactWidth + 'px';
                thElement.style.boxSizing = 'border-box';
                thElement.style.whiteSpace = 'nowrap';
                thElement.style.overflow = 'hidden';
                thElement.style.textOverflow = 'ellipsis';
                
                // 同步tbody单元格
                if (tbodyCells[index]) {
                  const tdElement = tbodyCells[index] as HTMLElement;
                  tdElement.style.width = exactWidth + 'px';
                  tdElement.style.minWidth = exactWidth + 'px';
                  tdElement.style.maxWidth = exactWidth + 'px';
                  tdElement.style.boxSizing = 'border-box';
                  tdElement.style.whiteSpace = 'nowrap';
                  tdElement.style.overflow = 'hidden';
                  tdElement.style.textOverflow = 'ellipsis';
                }
              }
            });
            
            // 同步其他行的单元格
            for (let i = 1; i < tbodyRows.length; i++) {
              const rowCells = tbodyRows[i].querySelectorAll('td');
              rowCells.forEach((td, index) => {
                if (cellWidths[index]) {
                  const tdElement = td as HTMLElement;
                  tdElement.style.width = cellWidths[index] + 'px';
                  tdElement.style.minWidth = cellWidths[index] + 'px';
                  tdElement.style.maxWidth = cellWidths[index] + 'px';
                  tdElement.style.boxSizing = 'border-box';
                  tdElement.style.whiteSpace = 'nowrap';
                  tdElement.style.overflow = 'hidden';
                  tdElement.style.textOverflow = 'ellipsis';
                }
              });
            }
            
            console.log('Perfect alignment completed:', {
              tableWidth: finalTableWidth,
              cellWidths,
              theadCount: theadCells.length,
              tbodyCount: tbodyCells.length
            });
          }
        });
      });
    };
    
    // 带防抖的对齐函数
    const debouncedAlign = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      
      timeoutId.current = setTimeout(perfectlyAlignTableHeaders, debounceMs);
    };
    
    // 即时对齐函数
    const immediateAlign = () => {
      perfectlyAlignTableHeaders();
      debouncedAlign();
    };
    
    // 初次加载时对齐
    const initialAlign = () => {
      requestAnimationFrame(() => {
        setTimeout(perfectlyAlignTableHeaders, 100);
      });
    };
    
    initialAlign();
    
    // 监听窗口变化
    if (enableResize) {
      window.addEventListener('resize', immediateAlign);
    }
    
    // 监听DOM变化
    const observer = new MutationObserver((mutations) => {
      let shouldRealign = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          
          const hasTableChanges = [...addedNodes, ...removedNodes].some(node => {
            return node.nodeType === Node.ELEMENT_NODE &&
              ((node as Element).matches('tr, td, th, tbody, thead, table, .cds--data-table') ||
                (node as Element).querySelector?.('tr, td, th, tbody, thead, table, .cds--data-table'));
          });
          
          if (hasTableChanges) {
            shouldRealign = true;
          }
        }
      });
      
      if (shouldRealign) {
        debouncedAlign();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (enableResize) {
        window.removeEventListener('resize', immediateAlign);
      }
      observer.disconnect();
    };
  }, [tableSelector, debounceMs, enableResize, maxHeight, enableHorizontalScroll, enableVerticalScroll]);
}