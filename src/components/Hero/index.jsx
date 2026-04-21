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

// Các bước demo của Wingman Agent (tên nội bộ)
const WINGMAN_STEPS = [
  { icon: '📄', tag: 'Bước 1', text: 'Tải lên CV của bạn...', sub: 'AI đang đọc 11 năm kinh nghiệm', color: '#3B82F6' },
  { icon: '🔍', tag: 'Bước 2', text: 'Phân tích hồ sơ', sub: 'Tìm thấy 6 thành tích chưa có số', color: '#8B5CF6' },
  { icon: '📋', tag: 'Bước 3', text: 'Đọc JD: HRBP Manager · Bosch', sub: 'Đối chiếu 14 tiêu chí tuyển dụng', color: '#F59E0B' },
  { icon: '✨', tag: 'Bước 4', text: 'CV mới khớp 81% với JD này', sub: 'Gap report + STAR stories sẵn sàng', color: '#10B981' },
  { icon: '📍', tag: 'Bước 5', text: 'Bosch cách nhà bạn ~22 phút 🛵', sub: 'Giờ cao điểm 7–8h: khoảng 38 phút', color: '#EF4444' },
];

// Animated chat — 3 kịch bản loop: JD → KPI → Onboarding
function ChatMockup() {
  const [scene, setScene] = useState(0);
  const [phase, setPhase] = useState('user');

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
        <div className={styles.chatDots}><span /><span /><span /></div>
        <span className={styles.chatTitle}>🤖 HR Agent · Đang hoạt động</span>
      </div>
      <div className={styles.chatBody}>
        <div className={`${styles.msg} ${styles.msgUser}`}>{cur.user}</div>
        {phase === 'typing' && (
          <div className={styles.msgTyping}><span /><span /><span /></div>
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

// Animated flashcard — Wingman Agent (tên nội bộ)
function WingmanFlashcard() {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hold = setTimeout(() => {
      // Fade out
      setShow(false);
      const next = setTimeout(() => {
        setStep(s => (s + 1) % WINGMAN_STEPS.length);
        setShow(true);
      }, 350);
      return () => clearTimeout(next);
    }, 2000);
    return () => clearTimeout(hold);
  }, [step]);

  const cur = WINGMAN_STEPS[step];

  return (
    <a href="/tools/ai-career-wingman" className={styles.flashcard}>
      <div className={styles.flashcardTop}>
        <span className={styles.flashcardLabel}>Tool tạo CV phù hợp JD</span>
        <span className={styles.flashcardCta}>Thử ngay →</span>
      </div>

      {/* Animated step */}
      <div className={`${styles.flashcardStep} ${show ? styles.stepIn : styles.stepOut}`}>
        <span
          className={styles.flashcardIcon}
          style={{ background: cur.color + '18', color: cur.color }}
        >
          {cur.icon}
        </span>
        <div className={styles.flashcardStepBody}>
          <span className={styles.flashcardTag} style={{ color: cur.color }}>{cur.tag}</span>
          <span className={styles.flashcardText}>{cur.text}</span>
          <span className={styles.flashcardSub}>{cur.sub}</span>
        </div>
      </div>

      {/* Progress dots */}
      <div className={styles.flashcardDots}>
        {WINGMAN_STEPS.map((s, i) => (
          <span
            key={i}
            className={styles.flashcardDot}
            style={{ background: i === step ? s.color : '#e2e8f0' }}
          />
        ))}
      </div>
    </a>
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
          <a href="/tools/ai-career-wingman" className={styles.newToolPill}>
            <span className={styles.pulseDot} />
            ✨ Tool mới: <strong>Tool tạo CV phù hợp JD</strong> — Thử ngay →
          </a>

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
          <WingmanFlashcard />
        </div>
      </div>
    </section>
  );
}
