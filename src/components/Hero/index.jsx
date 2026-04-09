import React from 'react';
import styles from './styles.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Xây dựng HR Agent trong 10 phút với AI
          </h1>

          <p className={styles.subheadline}>
            Tự động hóa JD, KPI, Offer và quy trình tuyển dụng mà không cần biết code
          </p>

          <div className={styles.buttons}>
            <button className={styles.btnPrimary}>
              Bắt đầu miễn phí
            </button>
            <button className={styles.btnSecondary}>
              Xem demo
            </button>
          </div>

          <div className={styles.trustBadge}>
            🦥 Lười không phải chịu — Lười vì hiệu quả
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.mockup}>
            {/* Placeholder for hero image/mockup */}
            <div className={styles.placeholder}>
              📊 AI Chat Interface Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
