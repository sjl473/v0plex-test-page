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
                Contact
              </Link>
              <Link href="#" className={styles.link}>
                Privacy
              </Link>
              <Link href="#" className={styles.link}>
                Terms
              </Link>
              <Link href="#" className={styles.link}>
                Accessibility
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
              <Link href="mailto:test@example.com" className={styles.emailLink}>
                test@example.com
              </Link>
            </p>
            <div className={styles.meta}>
              <span>Version 1.82.0</span>
              <span>Last updated May 22, 2025</span>
              <span>© 2025 Test123456</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
