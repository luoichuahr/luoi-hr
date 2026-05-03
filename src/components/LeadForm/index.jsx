import React, { useEffect } from 'react';
import styles from './styles.module.css';

export default function LeadForm() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://tally.so/widgets/embed.js';
    s.async = true;
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch(_) {} };
  }, []);

  return (
    <section className={styles.formSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Không muốn tự build?</h2>
        <p className={styles.subtitle}>Nhắn tin — Lười Chúa tư vấn miễn phí hoặc làm A-Z cho bạn.</p>
        <iframe
          data-tally-src="https://tally.so/embed/WOpZke?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="284"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Form tư vấn Lười HR"
        />
      </div>
    </section>
  );
}
