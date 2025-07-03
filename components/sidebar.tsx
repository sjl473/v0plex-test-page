"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, X, ChevronRight, ChevronDown } from "lucide-react"
import styles from "./sidebar.module.css"

interface NavItem {
  title: string
  path: string
  children?: NavItem[]
}

interface CarbonSidebarProps {
  isMobileOpen: boolean
  onCloseMobile: () => void
}

const navigationStructure: NavItem[] = [
  { title: "Home", path: "/" },
  { title: "Test 1", path: "/test-1" },
  { title: "Test 2", path: "/test-2" },
  { title: "Test 3", path: "/test-3" },
  // {
  //   title: "Test Folder 1",
  //   path: "/test-folder-1",
  //   children: [
  //     {
  //       title: "Test Folder 2",
  //       path: "/test-folder-1/test-folder-2",
  //       children: [
  //         { title: "Test Folder 3", path: "/test-folder-1/test-folder-2/test-folder-3" },
  //         { title: "Test Folder 4", path: "/test-folder-1/test-folder-2/test-folder-4" },
  //         {
  //           title: "Test Folder 5",
  //           path: "/test-folder-1/test-folder-2/test-folder-5",
  //           children: [{ title: "Test 4", path: "/test-folder-1/test-folder-2/test-folder-5/test-4" }],
  //         },
  //       ],
  //     },
  //   ],
  // },
]

function flattenNavigation(items: NavItem[]): NavItem[] {
  const result: NavItem[] = []

  function traverse(items: NavItem[]) {
    for (const item of items) {
      result.push(item)
      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(items)
  return result
}

// @ts-ignore
export default function Sidebar({ isMobileOpen, onCloseMobile }: CarbonSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [sidebarWidth, setSidebarWidth] = useState(256)
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const allItems = flattenNavigation(navigationStructure)
  const filteredItems = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.path.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const updateSidebarWidth = useCallback((width: number) => {
    const clampedWidth = Math.max(200, Math.min(600, width))
    setSidebarWidth(clampedWidth)
    document.documentElement.style.setProperty("--sidebar-width", `${clampedWidth}px`)
  }, [])

  useEffect(() => {
    updateSidebarWidth(sidebarWidth)
  }, [sidebarWidth, updateSidebarWidth])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)

      const handleMouseMove = (e: MouseEvent) => {
        updateSidebarWidth(e.clientX)
      }

      const handleMouseUp = () => {
        setIsResizing(false)
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    },
    [updateSidebarWidth],
  )

  const toggleExpanded = (path: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.path
    const isExpanded = expandedItems.has(item.path)
    const hasChildren = item.children && item.children.length > 0
    const paddingLeft = `${0.75 + level * 1}rem`

    return (
      <div key={item.path}>
        <div
          className={`${styles.navItem} ${isActive ? styles.active : ""} ${hasChildren ? styles.hasChildren : ""}`}
          style={{ paddingLeft }}
        >
          <Link href={item.path} className={styles.navItemLink} onClick={onCloseMobile}>
            <span className={styles.navItemText}>{item.title}</span>
          </Link>
          {hasChildren && (
            <button
              className={styles.navItemChevron}
              onClick={() => toggleExpanded(item.path)}
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>
          )}
        </div>
        {hasChildren && isExpanded && <div>{item.children?.map((child) => renderNavItem(child, level + 1))}</div>}
      </div>
    )
  }

  return (
    <>
      <div
        ref={sidebarRef}
        className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ""}`}
        style={{ width: `${sidebarWidth}px` }}
      >
        <div className={styles.searchSection}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button onClick={clearSearch} className={styles.searchClearButton} aria-label="Clear search">
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.navigationContent}>
          {searchQuery ? (
            <div className={styles.searchResults}>
              <div className={styles.searchResultsHeader}>Search Results ({filteredItems.length})</div>
              <div className={styles.searchResultsList}>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <div
                      key={item.path}
                      className={`${styles.searchResultItem} ${pathname === item.path ? styles.active : ""}`}
                    >
                      <Link href={item.path} className={styles.searchResultLink} onClick={onCloseMobile}>
                        <div className={styles.searchResultTitle}>{item.title}</div>
                        <div className={styles.searchResultPath}>{item.path}</div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>No results found</div>
                )}
              </div>
            </div>
          ) : null}

          <div className={styles.directoryStructure}>
            <div className={styles.allArticlesHeader}>All Articles</div>
            {navigationStructure.map((item) => renderNavItem(item))}
          </div>
        </div>

        <div className={`${styles.resizeHandle} ${isResizing ? styles.resizing : ""}`} onMouseDown={handleMouseDown} />
      </div>

      {isMobileOpen && (
        <div className={`${styles.mobileOverlay} ${isMobileOpen ? styles.show : ""}`} onClick={onCloseMobile} />
      )}
    </>
  )
}
