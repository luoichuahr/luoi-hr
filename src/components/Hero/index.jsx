import React, { useState, useEffect } from 'react';
import { VI } from './content';
import styles from './styles.module.css';

// Animated chat — loop qua các kịch bản trong t.scenarios
function ChatMockup({ t }) {
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
        setScene(s => (s + 1) % t.scenarios.length);
        setPhase('user');
      }, 2800);
    }
    return () => clearTimeout(timer);
  }, [phase, scene, t]);

  const cur = t.scenarios[scene];

  return (
    <div className={styles.chatCard}>
      <div className={styles.chatHeader}>
        <div className={styles.chatDots}><span /><span /><span /></div>
        <span className={styles.chatTitle}>{t.chatTitle}</span>
      </div>
      <div className={styles.chatBody}>
        <div className={`${styles.msg} ${styles.msgUser}`}>{cur.user}</div>
        {phase === 'typing' && (
          <div className={styles.msgTyping}><span /><span /><span /></div>
        )}
        {phase === 'agent' && (
          <div className={`${styles.msg} ${styles.msgAgent}`}>
            <strong>{t.chatDone}</strong>
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
function WingmanFlashcard({ fc }) {
  const [step, setStep] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hold = setTimeout(() => {
      // Fade out
      setShow(false);
      const next = setTimeout(() => {
        setStep(s => (s + 1) % fc.steps.length);
        setShow(true);
      }, 350);
      return () => clearTimeout(next);
    }, 2000);
    return () => clearTimeout(hold);
  }, [step, fc]);

  const cur = fc.steps[step];

  return (
    <a href={fc.href} className={styles.flashcard}>
      <div className={styles.flashcardTop}>
        <span className={styles.flashcardLabel}>{fc.label}</span>
        <span className={styles.flashcardCta}>{fc.cta}</span>
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
        {fc.steps.map((s, i) => (
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

export default function Hero({ t = VI }) {
  return (
    <section className={styles.hero}>
      <div className={styles.blob} />
      <span className={styles.spark1}>✦</span>
      <span className={styles.spark2}>✦</span>
      <span className={styles.spark3}>✦</span>

      <div className={styles.container}>
        <div className={styles.left}>
          <a href={t.pill.href} className={styles.newToolPill}>
            <span className={styles.pulseDot} />
            {t.pill.prefix} <strong>{t.pill.strong}</strong> {t.pill.suffix}
          </a>

          <h1 className={styles.headline}>
            {t.headline[0]}<br />
            <em className={styles.highlight}>{t.headline[1]}</em><br />
            {t.headline[2]}
          </h1>

          <p className={styles.sub}>{t.sub}</p>

          <div className={styles.ctas}>
            <a href={t.ctaPrimary.href} className={styles.btnPrimary}>{t.ctaPrimary.label}</a>
            <a href={t.ctaSecondary.href} className={styles.btnSecondary}>{t.ctaSecondary.label}</a>
          </div>

          <div className={styles.proof}>
            <span className={styles.stars}>⭐⭐⭐⭐⭐</span>
            <span>{t.proof[0]} <strong>{t.proof[1]}</strong></span>
          </div>

          <div className={styles.tags}>
            {t.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <ChatMockup t={t} />
          <WingmanFlashcard fc={t.flashcard} />
        </div>
      </div>
    </section>
  );
}
