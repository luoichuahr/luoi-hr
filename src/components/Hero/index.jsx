import React from 'react';
import styles from './styles.module.css';

// Mock chat UI — demo Agent đang làm việc thật
function ChatMockup() {
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
          Viết JD cho vị trí HRBP Senior
        </div>
        <div className={`${styles.msg} ${styles.msgAgent}`}>
          <strong>✓ Xong trong 3 giây!</strong>
          <div className={styles.msgItems}>
            <span>📄 JD chuẩn 500 từ, chuẩn SEO</span>
            <span>❓ 12 câu hỏi phỏng vấn</span>
            <span>📊 Scorecard đánh giá ứng viên</span>
          </div>
        </div>
        <div className={`${styles.msg} ${styles.msgUser}`}>
          Tạo KPI tháng 4 cho team Talent
        </div>
        {/* Typing animation — Agent đang xử lý */}
        <div className={styles.msgTyping}>
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Blob gradient nền */}
      <div className={styles.blob} />
      {/* Sparkle decorations kiểu Dribbble */}
      <span className={styles.spark1}>✦</span>
      <span className={styles.spark2}>✦</span>
      <span className={styles.spark3}>✦</span>

      <div className={styles.container}>
        {/* Cột trái: copy + CTA */}
        <div className={styles.left}>
          <div className={styles.eyebrow}>🦥 AI-Powered HR Platform</div>

          <h1 className={styles.headline}>
            Tạo cho bản thân<br />
            <em className={styles.highlight}>1 Agent làm hết</em><br />
            mọi thứ trong nhân sự
          </h1>

          <p className={styles.sub}>
            Từ JD, Offer, KPI, Onboarding đến báo cáo —{' '}
            giao task là Agent xử lý.<br />
            <strong>Không gì không thể. Không cần biết code.</strong>
          </p>

          <div className={styles.ctas}>
            <a href="/docs" className={styles.btnPrimary}>Xây Agent ngay →</a>
            <a href="#skills" className={styles.btnSecondary}>Xem 30 Skills</a>
          </div>

          {/* Social proof ngay trong hero — học từ Dribbble */}
          <div className={styles.proof}>
            <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
            <span>Được dùng bởi <strong>300+ HR Việt Nam</strong></span>
          </div>

          {/* Audience tags */}
          <div className={styles.tags}>
            {['HRBP', 'Recruiter', 'C&B', 'HRM', 'Headhunter'].map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </div>

        {/* Cột phải: chat mockup + floating cards */}
        <div className={styles.right}>
          <ChatMockup />
          <div className={styles.floatA}>✓ JD viết xong · <small>3 giây</small></div>
          <div className={styles.floatB}>📊 30 skills sẵn sàng</div>
        </div>
      </div>
    </section>
  );
}
