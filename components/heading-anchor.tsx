import React, { ReactNode, createElement } from 'react';
import styles from './heading-anchor.module.css';

interface HeadingProps {
  children: ReactNode;
  id?: string;
}

// 辅助函数：根据内容生成ID
const generateId = (content: ReactNode): string | undefined => {
  if (typeof content === 'string') {
    return content.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }
  return undefined;
};

export const H1: React.FC<HeadingProps> = ({ children, id }) => {
  const headingId = id || generateId(children);
  
  return (
    <div className={styles.headingContainer}>
      {createElement('h1', { id: headingId },
        <>
          <span className={styles.headingPrefix}></span>
          {children}
        </>
      )}
    </div>
  );
};

export const H2: React.FC<HeadingProps> = ({ children, id }) => {
  const headingId = id || generateId(children);
  
  return (
    <div className={styles.headingContainer}>
      {createElement('h2', { id: headingId },
        <>
          <span className={styles.headingPrefix}>#</span>
          {children}
        </>
      )}
    </div>
  );
};

export const H3: React.FC<HeadingProps> = ({ children, id }) => {
  const headingId = id || generateId(children);
  
  return (
    <div className={styles.headingContainer}>
      {createElement('h3', { id: headingId },
        <>
          <span className={styles.headingPrefix}>#</span>
          {children}
        </>
      )}
    </div>
  );
};

export const H4: React.FC<HeadingProps> = ({ children, id }) => {
  const headingId = id || generateId(children);
  
  return (
    <div className={styles.headingContainer}>
      {createElement('h4', { id: headingId },
        <>
          <span className={styles.headingPrefix}>#</span>
          {children}
        </>
      )}
    </div>
  );
};

export const H5: React.FC<HeadingProps> = ({ children, id }) => {
  const headingId = id || generateId(children);
  
  return (
    <div className={styles.headingContainer}>
      {createElement('h5', { id: headingId },
        <>
          <span className={styles.headingPrefix}>#</span>
          {children}
        </>
      )}
    </div>
  );
};

export const H6: React.FC<HeadingProps> = ({ children, id }) => {
  const headingId = id || generateId(children);
  
  return (
    <div className={styles.headingContainer}>
      {createElement('h6', { id: headingId },
        <>
          <span className={styles.headingPrefix}>#</span>
          {children}
        </>
      )}
    </div>
  );
};