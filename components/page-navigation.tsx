"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import styles from "./page-navigation.module.css"

const PAGE_ROUTES = [
  "/",
  "/test-1",
  "/test-2",
  "/test-3",
]

const PAGE_TITLES: Record<string, string> = {
  "/": "Home",
  "/test-1": "Test 1",
  "/test-2": "Test 2",
  "/test-3": "Test 3",
}

export default function PageNavigation() {
  const pathname = usePathname()
  const currentIndex = PAGE_ROUTES.indexOf(pathname)

  const prevPage = currentIndex > 0 ? PAGE_ROUTES[currentIndex - 1] : null
  const nextPage = currentIndex < PAGE_ROUTES.length - 1 ? PAGE_ROUTES[currentIndex + 1] : null

  const prevTitle = prevPage ? PAGE_TITLES[prevPage] : "None"
  const nextTitle = nextPage ? PAGE_TITLES[nextPage] : "None"

  return (
    <div className={styles.navigation}>
      <div className={styles.navContainer}>
        {prevPage ? (
          <Link href={prevPage} className={styles.navLink}>
            <div className={styles.navLabel}>Previous</div>
            <div className={styles.navTitle}>{prevTitle}</div>
          </Link>
        ) : (
          <div className={`${styles.navLink} ${styles.disabled}`}>
            <div className={styles.navLabel}>Previous</div>
            <div className={styles.navTitle}>None</div>
          </div>
        )}

        {nextPage ? (
          <Link href={nextPage} className={styles.navLink}>
            <div className={styles.navLabel}>Next</div>
            <div className={styles.navTitle}>{nextTitle}</div>
          </Link>
        ) : (
          <div className={`${styles.navLink} ${styles.disabled}`}>
            <div className={styles.navLabel}>Next</div>
            <div className={styles.navTitle}>None</div>
          </div>
        )}
      </div>
    </div>
  )
}
