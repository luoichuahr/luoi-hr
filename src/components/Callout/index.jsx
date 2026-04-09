import React from 'react';
import styles from './styles.module.css';

export default function Callout({
  type = 'info',
  title = 'Ghi chú',
  children,
}) {
  const icons = {
    warn: '⚠️',
    tip: '💡',
    info: 'ℹ️',
  };

  return (
    <div className={`${styles.callout} ${styles[type]}`}>
      <div className={styles.header}>
        <span className={styles.icon}>{icons[type]}</span>
        <h4 className={styles.title}>{title}</h4>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
