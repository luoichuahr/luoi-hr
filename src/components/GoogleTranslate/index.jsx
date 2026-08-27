import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import 'flag-icons/css/flag-icons.min.css';
import styles from './styles.module.css';

const LANGS = [
  { code: '',      country: 'vn', name: 'Tiếng Việt' },
  { code: 'en',    country: 'us', name: 'English' },
  { code: 'ja',    country: 'jp', name: '日本語' },
  { code: 'ko',    country: 'kr', name: '한국어' },
  { code: 'zh-TW', country: 'tw', name: '繁體中文' },
  { code: 'th',    country: 'th', name: 'ภาษาไทย' },
  { code: 'de',    country: 'de', name: 'Deutsch' },
  { code: 'fr',    country: 'fr', name: 'Français' },
  { code: 'ms',    country: 'my', name: 'Melayu' },
  { code: 'id',    country: 'id', name: 'Bahasa Indonesia' },
  { code: 'tl',    country: 'ph', name: 'Filipino' },
  { code: 'hi',    country: 'in', name: 'हिन्दी' },
];

export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGS[0]);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const isEnPage = pathname === '/en' || pathname.startsWith('/en/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: 'vi', autoDisplay: false },
        'gt-hidden'
      );
    };
    if (!document.getElementById('google-translate-script')) {
      const s = document.createElement('script');
      s.id = 'google-translate-script';
      s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.body.appendChild(s);
    }
    const onOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  function selectLang(lang) {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang.code;
      combo.dispatchEvent(new Event('change'));
    }
    setCurrent(lang);
    setOpen(false);
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <div id="gt-hidden" className={styles.hidden} />
      {/* Bản tiếng Anh do người viết, khác hẳn dịch máy của nút bên cạnh.
          Đặt trong cùng flex wrap với nút GT nên không bao giờ đè lên nhau.
          Ẩn khi đã ở /en/ — navbar bản EN có sẵn đường về tiếng Việt. */}
      {!isEnPage && (
        <a className={styles.enLink} href="/en/" aria-label="Read in English">EN</a>
      )}
      <button className={styles.btn} onClick={() => setOpen(o => !o)} aria-label="Chọn ngôn ngữ">
        <span className={`fi fi-${current.country} ${styles.flag}`} />
        <span className={styles.chevron}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className={styles.dropdown}>
          {LANGS.map(lang => (
            <button
              key={lang.country}
              className={`${styles.item} ${lang.country === current.country ? styles.active : ''}`}
              onClick={() => selectLang(lang)}
            >
              <span className={`fi fi-${lang.country} ${styles.itemFlag}`} />
              <span className={styles.itemName}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
