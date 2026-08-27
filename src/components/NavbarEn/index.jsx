import React from 'react';
import styles from './styles.module.css';

// Menu tiếng Anh — bản dịch 1-1 của navbar trong docusaurus.config.js.
// Tool nào đã có bản EN thì trỏ thẳng sang bản EN; tool chưa dịch giữ URL
// tiếng Việt và gắn nhãn (VI) để khách EN biết trước khi bấm.
const ITEMS = [
  { href: '/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban', label: 'HR Guides', note: 'VI' },
  { href: '/en/org-chart/', label: '🧬 Org Chart Builder' },
  { href: '/tools/ai-career-wingman', label: '✨ CV Builder', note: 'VI' },
  { href: '/hr-office-sim/', label: '🏢 HR Office Sim', note: 'VI' },
  { href: '/kpi-demo/', label: '📊 KPI System', note: 'VI' },
];

export default function NavbarEn() {
  return (
    <nav className="navbar navbar--fixed-top">
      <div className="navbar__inner">
        <a className="navbar__brand" href="/en/">
          <b className="navbar__title">🦥 Lười HR</b>
        </a>

        <div className={styles.links}>
          {ITEMS.map(({ href, label, note }) => (
            <a key={href} className={styles.link} href={href}>
              {label}
              {note && <span className={styles.note}>{note}</span>}
            </a>
          ))}
          <a className={styles.lang} href="/" hrefLang="vi">🇻🇳 Tiếng Việt</a>
        </div>
      </div>
    </nav>
  );
}
