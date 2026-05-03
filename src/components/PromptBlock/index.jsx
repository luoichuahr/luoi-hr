import React, { useState } from 'react';
import styles from './styles.module.css';

export default function PromptBlock({
  title = 'Prompt Template',
  code = 'Viết ở đây...',
  lang = 'text',
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={styles.promptBlock}>
      <div className={styles.title}>
        <span>{title}</span>
        <button
          className={styles.copyBtn}
          onClick={handleCopy}
          title={copied ? '✓ Đã copy' : 'Copy prompt'}
        >
          {copied ? '✓ Đã copy' : '📋 Copy'}
        </button>
      </div>

      <div className={styles.codeWrapper}>
        <pre className={styles.code}>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
