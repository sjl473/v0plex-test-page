"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "./theme-provider"
import { Search, Light, Asleep, Menu, Close } from "@carbon/icons-react"
import styles from "./header.module.css"


const getAllHitWordsContents = () => {
  return [
    {
      title: "test 1",
      href: "/test-1",
      content: "这是一个简单的数学公式测试页面 基础公式 质能方程 E=mc^2 复杂公式 求和公式 测试完成",
    },
    {
      title: "test 2",
      href: "/test-2",
      content: "这是一个代码块测试页面 JavaScript 代码 function hello console.log Hello World 测试完成",
    },
    {
      title: "test 3",
      href: "/test-3",
      content: "混合内容测试 测试图片 行内公式 勾股定理 x^2+y^2=z^2 Python print Hello 完成",
    },
    {
      title: "test 4",
      href: "/test-folder-1/test-folder-2/test-folder-5/test-4",
      content: "深层嵌套测试页面 积分公式 integral 代码示例 TypeScript const test number 嵌套测试完成",
    },
    {
      title: "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit",
      href: "/another-nest-folder/documentation/getting-started/lorem-ipsum-dolor-sit-amet-consectetur-adipiscing-elit",
      content:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua introduction key features getting started",
    },
    {
      title: "Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua",
      href: "/another-nest-folder/documentation/getting-started/sed-do-eiusmod-tempor-incididunt-ut-labore-et-dolore-magna-aliqua",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua overview implementation details best practices code example",
    },
    {
      title: "Ut Enim Ad Minim Veniam Quis Nostrud Exercitation Ullamco",
      href: "/another-nest-folder/documentation/advanced-topics/ut-enim-ad-minim-veniam-quis-nostrud-exercitation-ullamco",
      content:
        "Ut enim ad minim veniam quis nostrud exercitation ullamco advanced concepts technical implementation performance considerations",
    },
    {
      title: "Duis Aute Irure Dolor In Reprehenderit In Voluptate Velit Esse",
      href: "/another-nest-folder/documentation/advanced-topics/duis-aute-irure-dolor-in-reprehenderit-in-voluptate-velit-esse",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse architecture overview complex patterns advanced code example optimization strategies",
    },
    {
      title: "Excepteur Sint Occaecat Cupidatat Non Proident Sunt In Culpa",
      href: "/another-nest-folder/tutorials/beginner-level/excepteur-sint-occaecat-cupidatat-non-proident-sunt-in-culpa",
      content:
        "Excepteur sint occaecat cupidatat non proident sunt in culpa tutorial overview step by step guide basic example common mistakes",
    },
    {
      title: "Qui Officia Deserunt Mollit Anim Id Est Laborum Sed Ut Perspiciatis",
      href: "/another-nest-folder/tutorials/beginner-level/qui-officia-deserunt-mollit-anim-id-est-laborum-sed-ut-perspiciatis",
      content:
        "Qui officia deserunt mollit anim id est laborum sed ut perspiciatis learning objectives prerequisites interactive example key takeaways next steps",
    },
    {
      title: "Unde Omnis Iste Natus Error Sit Voluptatem Accusantium Doloremque",
      href: "/another-nest-folder/tutorials/intermediate-level/unde-omnis-iste-natus-error-sit-voluptatem-accusantium-doloremque",
      content:
        "Unde omnis iste natus error sit voluptatem accusantium doloremque intermediate concepts advanced techniques complex implementation performance metrics troubleshooting",
    },
  ]
}

interface CarbonHeaderProps {
  onToggleSidebar?: () => void
}

export default function Header({ onToggleSidebar }: CarbonHeaderProps) {
  const { theme, toggleTheme, mounted } = useTheme()
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState<ReturnType<typeof getAllHitWordsContents>>([])
  const [showResults, setShowResults] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchValue, setMobileSearchValue] = useState("")
  const [mobileSearchResults, setMobileSearchResults] = useState<ReturnType<typeof getAllHitWordsContents>>([])

  const handleSearch = (value: string) => {
    setSearchValue(value)
    if (value.trim()) {
      const allContent = getAllHitWordsContents()
      const results = allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.content.toLowerCase().includes(value.toLowerCase()),
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleMobileSearch = (value: string) => {
    setMobileSearchValue(value)
    if (value.trim()) {
      const allContent = getAllHitWordsContents()
      const results = allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.content.toLowerCase().includes(value.toLowerCase()),
      )
      setMobileSearchResults(results)
    } else {
      setMobileSearchResults([])
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      console.log("Search:", searchValue)
    }
  }

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mobileSearchValue.trim()) {
      console.log("Search:", mobileSearchValue)
    }
  }

  const handleResultClick = (href: string) => {
    if (href !== "#") {
      window.location.href = href
    }
    setShowResults(false)
    setSearchValue("")
  }

  const handleMobileResultClick = (href: string) => {
    if (href !== "#") {
      window.location.href = href
    }
    setMobileSearchOpen(false)
    setMobileSearchValue("")
    setMobileSearchResults([])
  }

  const openMobileSearch = () => {
    setMobileSearchOpen(true)
    
    setTimeout(() => {
      const input = document.querySelector(`.${styles.mobileSearchInput}`) as HTMLInputElement
      if (input) {
        input.focus()
      }
    }, 100)
  }

  const closeMobileSearch = () => {
    setMobileSearchOpen(false)
    setMobileSearchValue("")
    setMobileSearchResults([])
  }

  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.leftSection}>
          <button className={styles.mobileMenuBtn}>
            <Menu size={20} />
          </button>
          <Link href="/" className={styles.logoLink}>
            Test Blog
          </Link>
        </div>
        <div style={{ width: "320px", height: "32px", background: "#262626" }} />
      </header>
    )
  }

  return (
    <>
      <header className={styles.header}>
        {}
        <div className={styles.leftSection}>
          <button onClick={onToggleSidebar} className={styles.mobileMenuBtn}>
            <Menu size={20} />
          </button>

          <Link href="/" className={styles.logoLink}>
            Test Blog
          </Link>
        </div>

        {}
        <div className={styles.rightSection}>
          {}
          <div className={styles.searchContainer}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <div style={{ position: "relative" }}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="搜索..."
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchValue && setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className={styles.searchInput}
                />
              </div>
            </form>

            {}
            {showResults && searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.map((result, index) => (
                  <div key={index} className={styles.searchResultItem} onClick={() => handleResultClick(result.href)}>
                    <div className={styles.searchResultTitle}>{result.title}</div>
                    <div className={styles.searchResultContent}>{result.content.substring(0, 100)}...</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {}
          <button onClick={openMobileSearch} className={styles.mobileSearchBtn}>
            <Search size={20} />
          </button>

          {}
          <button
            aria-label={theme === "light" ? "切换到深色主题" : "切换到浅色主题"}
            title={theme === "light" ? "切换到深色主题" : "切换到浅色主题"}
            onClick={toggleTheme}
            className={styles.themeToggle}
          >
            {theme === "light" ? <Asleep size={20} /> : <Light size={20} />}
          </button>
        </div>
      </header>

      {}
      <div
        className={`${styles.mobileSearchOverlay} ${mobileSearchOpen ? styles.active : ""}`}
        onClick={closeMobileSearch}
      />

      {}
      {mobileSearchOpen && (
        <>
          <div className={styles.mobileSearchContainer}>
            <form onSubmit={handleMobileSearchSubmit} style={{ flex: 1, display: "flex", gap: "1rem" }}>
              <input
                type="text"
                placeholder="搜索..."
                value={mobileSearchValue}
                onChange={(e) => handleMobileSearch(e.target.value)}
                className={styles.mobileSearchInput}
                autoFocus
              />
            </form>
            <button onClick={closeMobileSearch} className={styles.mobileSearchClose}>
              <Close size={20} />
            </button>
          </div>

          {}
          {mobileSearchResults.length > 0 && (
            <div className={styles.mobileSearchResults}>
              {mobileSearchResults.map((result, index) => (
                <div
                  key={index}
                  className={styles.mobileSearchResultItem}
                  onClick={() => handleMobileResultClick(result.href)}
                >
                  <div className={styles.mobileSearchResultTitle}>{result.title}</div>
                  <div className={styles.mobileSearchResultContent}>{result.content.substring(0, 150)}...</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
