import React, { useState } from 'react'
import Image from 'next/image'
import { useTheme } from '@/components/theme-provider'
import styles from './responsive-img.module.css'

interface ResponsiveImageProps {
  src: string
  alt: string
  caption?: string
  maxWidth?: string
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
  className?: string
  priority?: boolean
}

export default function ResponsiveImage({
                                          src,
                                          alt,
                                          caption,
                                          maxWidth = '100%',
                                          aspectRatio = 'auto',
                                          className = '',
                                          priority = false
                                        }: ResponsiveImageProps) {
  const { theme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  // 为不同宽高比设置合理的默认尺寸
  const getImageDimensions = () => {
    if (aspectRatio === 'auto') {
      return { width: 1200, height: 800 } // 3:2 默认尺寸
    }
    
    const ratios = {
      'square': { width: 800, height: 800 },
      '16:9': { width: 1920, height: 1080 },
      '4:3': { width: 1200, height: 900 },
      '3:2': { width: 1200, height: 800 }
    }
    
    return ratios[aspectRatio] || { width: 1200, height: 800 }
  }
  
  const { width, height } = getImageDimensions()
  
  const containerClasses = [
    styles.container,
    styles[`theme-${theme}`],
    styles[`aspect-${aspectRatio}`],
    isHovering ? styles.hover : '',
    className
  ].filter(Boolean).join(' ')
  
  const imageContainerClasses = [
    styles.imageContainer,
    styles[`aspect-${aspectRatio}`]
  ].join(' ')
  
  return (
    <figure
      className={containerClasses}
      style={{ maxWidth }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={imageContainerClasses}>
        {hasError ? (
          <div className={`${styles.placeholder} ${styles[`theme-${theme}`]}`}>
            <span>图片加载失败</span>
          </div>
        ) : (
          <>
            {!isLoaded && (
              <div className={`${styles.placeholder} ${styles[`theme-${theme}`]}`}>
                <span>加载中...</span>
              </div>
            )}
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`${styles.image} ${isLoaded && !hasError ? styles.loaded : ''}`}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                console.error('Image load error:', src)
                setHasError(true)
                setIsLoaded(true)
              }}
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              style={{
                objectFit: 'contain' // 确保图片不被裁剪或拉伸
              }}
            />
          </>
        )}
      </div>
      {caption && (
        <figcaption className={`${styles.caption} ${styles[`theme-${theme}`]}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}