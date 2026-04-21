import React from 'react';
import styles from './styles.module.css';

// 30 skills theo 6 nghiệp vụ HR — mỗi category agent đều thành thạo
const SKILL_CATEGORIES = [
  {
    cat: '🎯 Tuyển dụng',
    items: ['Viết JD', 'Lọc & chấm CV', 'Câu hỏi phỏng vấn', 'Scorecard ứng viên', 'Tin đăng tuyển', 'Email chăm sóc ứng viên'],
  },
  {
    cat: '📋 Onboarding',
    items: ['Checklist nhận việc', 'Plan 30/60/90 ngày', 'Email chào mừng', 'Assign buddy & mentor', 'KPI tuần đầu'],
  },
  {
    cat: '💰 C&B',
    items: ['Thư Offer chuẩn', 'Phân tích band lương', 'Cấu trúc thưởng', 'Mô hình phúc lợi', 'Equity & ESOP'],
  },
  {
    cat: '📈 Performance',
    items: ['KPI framework', 'Review template', 'Calibration prep', 'PIP action plan', '360° feedback'],
  },
  {
    cat: '📢 Truyền thông HR',
    items: ['Thông báo nội bộ', 'Draft policy', 'Email toàn công ty', 'Employer branding post'],
  },
  {
    cat: '📊 Báo cáo & Phân tích',
    items: ['Headcount snapshot', 'Attrition report', 'Diversity metrics', 'Flight risk analysis', 'Monthly HR report'],
  },
];

// Stats 4 con số — thay thế TrustIndicators cũ
const STATS = [
  { n: '30+',  l: 'Skills sẵn có' },
  { n: '0',    l: 'Dòng code cần biết' },
  { n: '5-10', l: 'Phút setup xong' },
  { n: '24/7', l: 'Hoạt động liên tục' },
];

export default function AgentSkills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>

        {/* Stats strip — 4 con số ấn tượng */}
        <div className={styles.statsRow}>
          {STATS.map(({ n, l }) => (
            <div key={l} className={styles.stat}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>Agent của bạn thành thạo</div>
          <h2 className={styles.title} style={{ whiteSpace: 'nowrap' }}>
            Hơn 30 nghiệp vụ nhân sự{' '}
            <span className={styles.titleAccent}>từ A-Z</span>
          </h2>
          <p className={styles.sub}>
            Giao bất kỳ task HR nào — Agent biết làm tất cả. Không gì không thể.
          </p>
        </div>

        {/* Skills grid — 6 categories */}
        <div className={styles.grid}>
          {SKILL_CATEGORIES.map(({ cat, items }) => (
            <div key={cat} className={styles.card}>
              <div className={styles.cardCat}>{cat}</div>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.check}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA cuối section */}
        <div className={styles.footer}>
          <a href="/docs" className={styles.cta}>
            Bắt đầu xây Agent của bạn →
          </a>
          <p className={styles.footerNote}>
            Dễ dàng · Không cần biết code
          </p>
        </div>

      </div>
    </section>
  );
}
