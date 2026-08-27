import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { TOOLS_BY_CATEGORY, PUBLIC_TOOLS } from '@site/src/data/tools';
import styles from './styles.module.css';

const TOOL_COUNT = PUBLIC_TOOLS.filter((t) => t.kind === 'tool').length;
const DEMO_COUNT = PUBLIC_TOOLS.filter((t) => t.kind === 'demo').length;

// Đo tool nào thật sự được bấm để xếp lại thứ tự, thay vì đoán.
// gtag do preset gtag của Docusaurus nạp — chỉ có ở production build.
function trackClick(tool, catLabel) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'tool_menu_click', {
    tool_id: tool.id,
    tool_name: tool.name,
    tool_kind: tool.kind,
    tool_category: catLabel,
  });
}

/** Một mục tool. File .html tĩnh phải là <a href>, trang React mới dùng <Link to>. */
function ToolItem({ tool, catLabel, onNavigate }) {
  const inner = (
    <>
      <span className={styles.icon} aria-hidden="true">{tool.icon}</span>
      <span className={styles.text}>
        <span className={styles.name}>
          {tool.name}
          {tool.kind === 'demo' && <span className={styles.demoTag}>Demo</span>}
        </span>
        <span className={styles.desc}>{tool.desc}</span>
      </span>
    </>
  );

  const handleClick = () => {
    trackClick(tool, catLabel);
    if (onNavigate) onNavigate();
  };

  return tool.staticFile ? (
    <a href={tool.to} className={styles.item} onClick={handleClick}>{inner}</a>
  ) : (
    <Link to={tool.to} className={styles.item} onClick={handleClick}>{inner}</Link>
  );
}

/** Bản mobile: Docusaurus render navbar item trong sidebar với prop mobile=true.
 *  Mega menu 4 cột không dùng được ở đây — đổ về danh sách xổ theo nhóm. */
function MobileMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="menu__list-item">
      <button
        type="button"
        className={`menu__link menu__link--sublist ${styles.mobileToggle}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Tools
      </button>
      {open && (
        <ul className="menu__list">
          {TOOLS_BY_CATEGORY.map((cat) => (
            <React.Fragment key={cat.id}>
              <li className={styles.mobileCat}>{cat.label}</li>
              {cat.items.map((tool) => (
                <li className="menu__list-item" key={tool.id}>
                  <ToolItem tool={tool} catLabel={cat.label} onNavigate={onNavigate} />
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MegaMenu({ mobile, onClick }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { pathname } = useLocation();

  // Đóng menu khi đổi route — bấm vào tool React mà menu còn mở thì rất khó chịu
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (mobile) return <MobileMenu onNavigate={onClick} />;

  return (
    <div
      className={styles.wrap}
      ref={wrapRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`navbar__item navbar__link ${styles.trigger}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Tools
        <span className={styles.caret} aria-hidden="true">▼</span>
      </button>

      {/* Luôn render trong DOM (chỉ ẩn bằng CSS) để Googlebot đọc được toàn bộ
          link tool từ mọi trang — đây là phần internal linking của mega menu. */}
      <div className={`${styles.panel} ${open ? styles.panelOpen : ''}`}>
        <div className={styles.grid}>
          {TOOLS_BY_CATEGORY.map((cat) => (
            <div className={styles.col} key={cat.id}>
              <h4 className={styles.colTitle}>{cat.label}</h4>
              {cat.items.map((tool) => (
                <ToolItem key={tool.id} tool={tool} catLabel={cat.label} />
              ))}
            </div>
          ))}

          <div className={styles.promo}>
            <div className={styles.promoRow}>
              <b>{TOOL_COUNT}</b> tool nhập liệu được
            </div>
            <div className={styles.promoRow}>
              <b>{DEMO_COUNT}</b> demo để xem tham khảo
            </div>
            <p className={styles.promoNote}>
              Tất cả miễn phí, chạy thẳng trên trình duyệt. Dữ liệu không rời máy bạn.
            </p>
            <a
              className={styles.promoLink}
              href="https://zalo.me/0967696836"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cần tool khác? Nhắn tôi →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
