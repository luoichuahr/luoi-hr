import React from 'react';
import styles from './styles.module.css';

export default function TrustIndicators() {
  const indicators = [
    { number: '1,200+', label: 'Người dùng' },
    { number: '50+', label: 'Prompt templates' },
    { number: '98%', label: 'Hài lòng' },
  ];

  const audiences = [
    'Dành cho HRBP',
    'Recruiter',
    'C&B',
    'Doanh nghiệp SME',
  ];

  return (
    <section className={styles.trust}>
      <div className={styles.container}>
        <h2 className={styles.title}>Được tin tưởng bởi</h2>

        <div className={styles.stats}>
          {indicators.map((item, idx) => (
            <div key={idx} className={styles.stat}>
              <div className={styles.number}>{item.number}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.audienceLabel}>
          Dành cho những người:
        </div>

        <div className={styles.audience}>
          {audiences.map((aud, idx) => (
            <div key={idx} className={styles.badge}>
              ✓ {aud}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
