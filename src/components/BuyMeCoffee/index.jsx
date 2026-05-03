import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function CoffeeCup() {
  return (
    <svg viewBox="0 0 44 54" width="20" height="25" aria-hidden="true">
      <ellipse cx="22" cy="10" rx="18" ry="5" fill="white" stroke="#1a1a2e" strokeWidth="2.5" />
      <ellipse cx="22" cy="7" rx="14" ry="3" fill="white" stroke="#1a1a2e" strokeWidth="2" />
      <path d="M6 14 L9 47 Q9 50 12 50 L32 50 Q35 50 35 47 L38 14 Z"
        fill="white" stroke="#1a1a2e" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M12 24 Q22 21 32 24" stroke="#d4d4d4" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const STORAGE_KEY = 'luoi_coffee_clicked';

export default function BuyMeCoffee() {
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    setHasClicked(localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  function handleClick() {
    if (hasClicked) return;
    setHasClicked(true);
    localStorage.setItem(STORAGE_KEY, 'true');
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'coffee_button_click', {
        event_category: 'engagement',
        event_label: 'buy_me_coffee',
      });
    }
  }

  return (
    <Link to="/ung-ho" className={styles.trigger} onClick={handleClick} aria-label="Ủng hộ Lười Chúa">
      <CoffeeCup />
      <span className={styles.label}>Buy me a coffee</span>
      <span className={styles.heart}>❤️</span>
      {hasClicked && <span className={styles.badge}>✓</span>}
    </Link>
  );
}
