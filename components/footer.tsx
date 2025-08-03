"use client"
import Link from "next/link"
import PageNavigation from "@/components/page-navigation"
import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {}
      <PageNavigation />

      {}
      <div className={styles.main}>
        <div className={styles.container}>
          {}
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <Link href="#" className={styles.link}>
                Youtube
              </Link>
            </div>
            <div className={styles.linkGroup}>
              <Link href="#" className={styles.link}>
                GitHub
              </Link>
              <Link href="#" className={styles.link}>
                Twitter
              </Link>
            </div>
          </div>

          {}
          <div className={styles.info}>
            <p className={styles.infoText}>
              Have questions? Email us at{" "}
              <Link href="sjl473@outlook.com" className={styles.emailLink}>
                sjl473@outlook.com
              </Link>
            </p>
            <div className={styles.meta}>
              <span>version: preview test</span>
              <span>last updated Aug 3rd, 2025</span>
              <span>© 2025 sjl473, all right reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
