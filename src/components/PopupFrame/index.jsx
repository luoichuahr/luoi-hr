import React, { useState } from 'react';
import styles from './styles.module.css';

export default function PopupFrame({ src, title, thumbHeight = 480 }) {
  const [open, setOpen] = useState(false);
  const scale = thumbHeight / 900;

  return (
    <>
      {/* Thumbnail */}
      <div
        className={styles.thumb}
        style={{ height: thumbHeight }}
        onClick={() => setOpen(true)}
        title="Click để xem toàn màn hình"
      >
        <iframe
          src={src}
          title={title}
          style={{
            width: 1280,
            height: 900,
            border: 'none',
            display: 'block',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        />
        <div className={styles.overlay}>
          <span className={styles.hint}>🔍 Click để xem toàn màn hình</span>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <span className={styles.modalTitle}>{title}</span>
              <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕ Đóng</button>
            </div>
            <iframe
              src={src}
              title={title}
              style={{ flex: 1, border: 'none', width: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
