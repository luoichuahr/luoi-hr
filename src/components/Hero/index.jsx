import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const SCENARIOS = [
  {
    user: 'Viết JD cho vị trí HRBP Senior',
    items: ['📄 JD chuẩn 500 từ, chuẩn SEO', '❓ 12 câu hỏi phỏng vấn', '📊 Scorecard đánh giá ứng viên'],
  },
  {
    user: 'Tạo KPI tháng 4 cho team Talent',
    items: ['🎯 5 KPI đo lường rõ ràng', '📈 Dashboard theo dõi tiến độ', '📋 Template báo cáo tuần'],
  },
  {
    user: 'Xây hành trình Onboarding 30 ngày',
    items: ['✅ Checklist nhận việc đầy đủ', '📅 Plan 30/60/90 ngày', '🤝 Assign buddy & mentor'],
  },
];

// Animated chat — 3 kịch bản loop: JD → KPI → Onboarding
function ChatMockup() {
  const [scene, setScene] = useState(0);
  const [phase, setPhase] = useState('user'); // 'user' | 'typing' | 'agent'

  useEffect(() => {
    let timer;
    if (phase === 'user') {
      timer = setTimeout(() => setPhase('typing'), 1200);
    } else if (phase === 'typing') {
      timer = setTimeout(() => setPhase('agent'), 1500);
    } else {
      timer = setTimeout(() => {
        setScene(s => (s + 1) % SCENARIOS.length);
        setPhase('user');
      }, 2800);
    }
    return () => clearTimeout(timer);
  }, [phase, scene]);

  const cur = SCENARIOS[scene];

  return (
    <div className={styles.chatCard}>
      <div className={styles.chatHeader}>
        <div className={styles.chatDots}>
          <span /><span /><span />
        </div>
        <span className={styles.chatTitle}>🤖 HR Agent · Đang hoạt động</span>
      </div>
      <div className={styles.chatBody}>
        <div className={`${styles.msg} ${styles.msgUser}`}>
          {cur.user}
        </div>
        {phase === 'typing' && (
          <div className={styles.msgTyping}>
            <span /><span /><span />
          </div>
        )}
        {phase === 'agent' && (
          <div className={`${styles.msg} ${styles.msgAgent}`}>
            <strong>✓ Xong trong 3 giây!</strong>
            <div className={styles.msgItems}>
              {cur.items.map(item => <span key={item}>{item}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.blob} />
      <span className={styles.spark1}>✦</span>
      <span className={styles.spark2}>✦</span>
      <span className={styles.spark3}>✦</span>

      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.eyebrow}>🦥 AI-Powered HR Platform</div>

          <h1 className={styles.headline}>
            HR Agent<br />
            <em className={styles.highlight}>giúp bạn làm mọi thứ</em><br />
            trong nhân sự
          </h1>

          <p className={styles.sub}>
            Từ viết JD, Offer, xây dựng KPI, tạo hành trình Onboarding đến báo cáo phân tích nhân sự — giao task là HR Agent xử lý.
          </p>

          <div className={styles.ctas}>
            <a href="/docs" className={styles.btnPrimary}>Xây Agent ngay →</a>
            <a href="#skills" className={styles.btnSecondary}>Xem 30+ Skills</a>
          </div>

          <div className={styles.proof}>
            <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
            <span>Được dùng bởi <strong>300+ HR Việt Nam</strong></span>
          </div>

          <div className={styles.tags}>
            {['HRBP', 'Recruiter', 'C&B', 'HRM', 'Headhunter'].map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <ChatMockup />
        </div>
      </div>
    </section>
  );
}
