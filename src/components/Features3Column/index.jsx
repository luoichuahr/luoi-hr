import React from 'react';
import { VI } from './content';
import styles from './styles.module.css';

export default function AgentSkills({ t = VI }) {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>

        {/* Stats strip — 4 con số ấn tượng */}
        <div className={styles.statsRow}>
          {t.stats.map(({ n, l }) => (
            <div key={l} className={styles.stat}>
              <div className={styles.statNum}>{n}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div className={styles.header}>
          <div className={styles.eyebrow}>{t.eyebrow}</div>
          <h2 className={styles.title} style={{ whiteSpace: t.titleNoWrap ? 'nowrap' : 'normal' }}>
            {t.title}{' '}
            <span className={styles.titleAccent}>{t.titleAccent}</span>
          </h2>
          <p className={styles.sub}>{t.sub}</p>
        </div>

        {/* Skills grid — 6 categories */}
        <div className={styles.grid}>
          {t.categories.map(({ cat, items }) => (
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
          <a href={t.cta.href} className={styles.cta}>{t.cta.label}</a>
          <p className={styles.footerNote}>{t.ctaNote}</p>
        </div>

      </div>
    </section>
  );
}
