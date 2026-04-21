import React, { useState } from 'react';
import styles from './styles.module.css';

const ZALO_URL = 'https://zalo.me/0967696836';

// Mobile: mở app Zalo trực tiếp qua scheme
// Desktop: hiện popup QR để quét
function handleZaloClick(e, setShowQR) {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    // Thử mở app Zalo, nếu không có thì fallback về web
    window.location.href = 'zalo://qr/p/' + '0967696836';
    setTimeout(() => { window.open(ZALO_URL, '_blank'); }, 1200);
    e.preventDefault();
  } else {
    e.preventDefault();
    setShowQR(v => !v);
  }
}

export default function FloatingContact() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className={styles.wrap}>

      {/* Popup QR — desktop only */}
      {showQR && (
        <div className={styles.qrPopup}>
          <button className={styles.closeBtn} onClick={() => setShowQR(false)}>✕</button>
          <img src="/img/zalo-qr.jpg" alt="QR Zalo" className={styles.qrImg} />
          <p className={styles.qrLabel}>Quét để kết nối Zalo</p>
        </div>
      )}

      {/* Nút LinkedIn */}
      <a
        href="https://www.linkedin.com/in/anhductran"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.btnLinkedin}`}
        title="Kết nối LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      {/* Nút Zalo */}
      <a
        href={ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.btnZalo}`}
        title="Kết nối Zalo"
        onClick={(e) => handleZaloClick(e, setShowQR)}
      >
        <svg viewBox="0 0 48 48" fill="white" width="22" height="22">
          <path d="M24 4C12.95 4 4 12.95 4 24c0 3.9 1.09 7.55 2.98 10.67L4 44l9.62-2.92C16.59 42.94 20.2 44 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm-6.5 11h2.5v10h-2.5V15zm4 0h2.3l4.7 6.5V15H31v10h-2.3L24 18.5V25h-2.5V15zm9 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm-12 0c0 .83-.67 1.5-1.5 1.5S15.5 24.33 15.5 23.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
        </svg>
      </a>

    </div>
  );
}
