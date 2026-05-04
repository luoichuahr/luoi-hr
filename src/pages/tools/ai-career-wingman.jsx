import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from './ai-career-wingman.module.css';

const FEATURES = [
  {
    icon: '🎯',
    title: 'CV Tailored theo JD',
    desc: 'Upload CV + paste JD → AI phân tích gap và xuất CV .docx chuẩn MNC, tailored theo từng công ty target.',
  },
  {
    icon: '📊',
    title: 'Evidence Coaching',
    desc: 'Không có số? AI dùng Logic Map (Nhanh / Rẻ / Tốt hơn) để giúp bạn tính impact thật từ kinh nghiệm thật.',
  },
  {
    icon: '🔍',
    title: 'Gap Analysis 3 chiều',
    desc: 'Phân biệt Skill Gap (có thể bù), Structural Gap (cảnh báo thẳng), Domain Gap (để bạn tự đánh giá).',
  },
  {
    icon: '📍',
    title: 'Distance Calculator',
    desc: 'Nhập địa chỉ nhà → AI tính khoảng cách đến từng công ty, cả giờ cao điểm. Flag nếu >45 phút.',
  },
];

const STEPS = [
  { num: '01', title: 'Upload CV', desc: 'AI scan từng dòng kinh nghiệm, nhận diện số liệu còn thiếu' },
  { num: '02', title: 'Coaching 1-1', desc: 'AI hỏi có mục tiêu — giúp bạn số hóa thành tích thật' },
  { num: '03', title: 'Nhận output', desc: 'CV .docx tailored + Gap Analysis + STAR stories sẵn sàng' },
];

function DemoCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.demoCard}>
      <div className={styles.cardHeader}>
        <span className={styles.badgeDirect}>Tự đăng · TopCV</span>
        <span className={styles.cardDate}>Apr 2026</span>
        <span className={styles.scoreHigh}>81%</span>
      </div>
      <div className={styles.cardTitle}>HRBP Manager</div>
      <div className={styles.cardMeta}>Công ty A · Q10, HCM</div>
      <div className={styles.cardPills}>
        <span className={styles.pill}>💰 55–70tr</span>
        <span className={styles.pillMatch}>Match 81%</span>
        <span className={styles.pillCall}>Call: Cao</span>
        <span className={styles.pillDomain}>Tech</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.strength}>✓ HRBP skills match 89% core requirements của JD</div>
      <div className={styles.strength}>✓ TOEIC 880 + kinh nghiệm với expat team</div>
      <div className={styles.tradeoff}>~ Tech domain — industry penalty nhẹ (-8%)</div>
      <div className={styles.coaching}>Với background analytics (Power BI, Looker), anh có lợi thế rõ ở vòng phỏng vấn chiến lược HR.</div>
      <button className={styles.toggleBtn} onClick={() => setExpanded(!expanded)}>
        {expanded ? '▲' : '▼'} Xem khoảng cách di chuyển
      </button>
      {expanded && (
        <div className={styles.distance}>
          <div>📍 Công ty A — Lotte Center, Q10, HCM</div>
          <div>🏍️ Giờ thường: ~22 phút · Cao điểm 7–8h: ~38 phút</div>
        </div>
      )}
      <div className={styles.divider} />
      <div className={styles.contact}>
        <div className={styles.avatar}>LB</div>
        <div className={styles.contactInfo}>
          <div className={styles.contactName}>Lê Thị B</div>
          <div className={styles.contactRole}>HR Manager · Công ty A</div>
          <div className={styles.contactRow}><span className={styles.contactLabel}>LinkedIn</span><span className={styles.linkedinOk}>✅ Đã xác nhận</span></div>
          <div className={styles.contactRow}><span className={styles.contactLabel}>Email</span><span className={styles.contactVal}>N/A</span></div>
        </div>
      </div>
      <a href="#" className={styles.viewJd} onClick={e => e.preventDefault()}>→ Xem JD đầy đủ</a>
    </div>
  );
}

export default function AICareerWingman() {
  return (
    <Layout
      title="Tool tạo CV phù hợp JD"
      description="Upload CV, paste JD — AI coaching, gap analysis, và xuất CV .docx chuẩn MNC trong 1 session."
    >
      <section className={styles.hero}>
        <div className={styles.blob} />
        <div className={styles.container}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>✨ Tool mới · Pre-deploy</div>
            <h1 className={styles.heroTitle}>Tool tạo CV<br />phù hợp JD</h1>
            <p className={styles.heroSub}>
              Upload CV + paste JD — AI phân tích gap, coaching có số, xuất CV .docx tailored.<br />
              Không viết hộ sáo rỗng — chỉ dùng <strong>sự thật</strong> và <strong>con số thật</strong>.
            </p>
            <div className={styles.heroCtas}>
              <button className={styles.btnDisabled} disabled>Thử ngay — Coming Soon</button>
              <a href="#how-it-works" className={styles.btnSecondary}>Xem hoạt động →</a>
            </div>
            <div className={styles.proofRow}>
              <div className={styles.proofItem}>🧪 Đã test với CV thật (Mar 2026)</div>
              <div className={styles.proofItem}>📈 +9% matching score sau coaching</div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.demoLabel}>Preview — Job Card thực tế</div>
            <DemoCard />
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.eyebrow}>Tính năng</div>
          <h2 className={styles.sectionTitle}>Không chỉ sửa CV cho đẹp</h2>
          <p className={styles.sectionDesc}>4 tính năng cốt lõi — evidence-based, không sáo rỗng, không bịa số.</p>
          <div className={styles.featuresGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.howItWorks} id="how-it-works">
        <div className={styles.container}>
          <div className={styles.eyebrow}>Quy trình</div>
          <h2 className={styles.sectionTitle}>3 bước — 1 session</h2>
          <div className={styles.stepsRow}>
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className={styles.step}>
                  <div className={styles.stepNum}>{s.num}</div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && <div className={styles.stepArrow}>→</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Muốn thử khi tool ra mắt?</h2>
          <p className={styles.ctaSub}>Để lại Zalo — Lười Chúa báo ngay khi Tool tạo CV phù hợp JD deploy.</p>
          <a href="https://zalo.me/0967696836" target="_blank" rel="noopener noreferrer" className={styles.btnCta}>
            Nhắn Zalo ngay
          </a>
        </div>
      </section>
    </Layout>
  );
}
