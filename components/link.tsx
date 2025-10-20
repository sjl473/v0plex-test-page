import NextLink from 'next/link';
import {ReactNode} from 'react';
import {useTheme} from "@/components/theme-provider";
import styles from "./link.module.css";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  isDark?: boolean;
  style?: React.CSSProperties;
}

export default function Link({
                               href,
                               children,
                               className,
                               target,
                               rel,
                               disabled = false,
                               isDark,
                               style,
                               ...props
                             }: LinkProps) {
  const {theme} = useTheme();
  
  const effectiveTheme = isDark !== undefined ? (isDark ? 'g100' : 'white') : theme;
  
  const linkClassName = `${styles.link} ${effectiveTheme === 'g100' ? styles.darkTheme : styles.lightTheme} ${disabled ? styles.disabled : ''} ${className || ''}`;
  
  const combinedStyle = {
    ...style
  };
  
  const isExternal = href.startsWith('http');
  
  if (disabled) {
    return (
      <span
        className={linkClassName}
        style={combinedStyle}
        {...props}
      >
        {children}
      </span>
    );
  }
  
  if (isExternal) {
    return (
      <a
        href={href}
        className={linkClassName}
        style={combinedStyle}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <NextLink
      href={href}
      className={linkClassName}
      style={combinedStyle}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </NextLink>
  );
}