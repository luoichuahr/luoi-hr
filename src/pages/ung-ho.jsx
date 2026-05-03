import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './ung-ho.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/anhductran';
const ZALO_URL = 'https://zalo.me/0967696836';

export default function UngHo() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://tally.so/widgets/embed.js';
    s.async = true;
    document.head.appendChild(s);
    return () => { try { document.head.removeChild(s); } catch(_) {} };
  }, []);

  return (
    <Layout
      title="Ủng hộ Lười Chúa ☕"
      description="Nếu Lười HR giúp bạn làm việc nhanh hơn — hãy mời Lười Chúa một ly cà phê để tiếp tục viết."
    >
      <main className={styles.page}>

        {/* Hero */}
        <div className={styles.hero}>
          <span className={styles.emoji}>☕</span>
          <h1 className={styles.title}>Mời Lười Chúa một ly cà phê</h1>
          <p className={styles.subtitle}>
            Không bắt buộc. Không áp lực. Chỉ là một cách nói cảm ơn nhẹ nhàng
            nếu nội dung ở đây giúp ích được cho bạn.
          </p>
        </div>

        <div className={styles.content}>

          {/* Story */}
          <section className={styles.section}>
            <h2>Tại sao trang này tồn tại?</h2>
            <p>
              Lười HR được tạo ra từ một câu hỏi thực tế: <em>"Tại sao dân HR phải mất cả buổi
              sáng để soạn JD, khi AI có thể làm trong 3 phút?"</em>
            </p>
            <p>
              Sau 11 năm làm HRBP, tôi nhận ra rằng phần lớn người làm nhân sự không thiếu năng lực
              — họ thiếu <strong>công cụ đúng và cách dùng đúng</strong>. Tôi xây trang này để
              chia sẻ những gì mình học được: không phải lý thuyết hàn lâm, mà là những thứ
              dùng được ngay trong công việc thật.
            </p>
          </section>

          {/* Cost */}
          <section className={styles.section}>
            <h2>Blog miễn phí, nhưng không phải không có chi phí</h2>
            <p>
              Tất cả nội dung trên Lười HR đều <strong>miễn phí</strong>, không cần đăng ký,
              không paywall. Nhưng để site chạy ổn định, tôi vẫn cần chi trả mỗi năm: domain,
              hosting, công cụ AI để thử nghiệm trước khi viết hướng dẫn, và quan trọng nhất
              là <strong>thời gian</strong> — mỗi bài viết tốt mất 4–6 giờ nghiên cứu và viết.
            </p>
            <p>
              Một ly cà phê của bạn không trả được hết chi phí đó — nhưng nó nói với tôi rằng
              nội dung này <strong>thực sự có ích</strong>, và đó là lý do lớn nhất để tiếp tục.
            </p>
          </section>

          {/* Meaning grid */}
          <section className={styles.section}>
            <h2>Ủng hộ có ý nghĩa gì?</h2>
            <div className={styles.meaningGrid}>
              <div className={styles.meaningCard}>
                <span>✍️</span>
                <h3>Thêm nội dung chuyên sâu</h3>
                <p>Sự ủng hộ giúp tôi dành thêm thời gian viết các bài dài, thực tế thay vì lo việc khác.</p>
              </div>
              <div className={styles.meaningCard}>
                <span>🔧</span>
                <h3>Cập nhật nhanh hơn</h3>
                <p>AI thay đổi rất nhanh. Sự ủng hộ giúp tôi mua và thử nghiệm công cụ mới để hướng dẫn bạn sớm nhất.</p>
              </div>
              <div className={styles.meaningCard}>
                <span>🎯</span>
                <h3>Giữ trang độc lập</h3>
                <p>Không quảng cáo, không sponsored post. Lười HR chỉ viết những gì thực sự hữu ích.</p>
              </div>
            </div>
          </section>

          {/* QR */}
          <section className={styles.section}>
            <h2>Quét mã để ủng hộ</h2>
            <p>Không có số tiền tối thiểu. Một ly cà phê 20–30k là đủ ấm lòng. ❤️</p>
            <div className={styles.qrBlock}>
              <img
                src="/img/qr-techcombank.jpg"
                alt="QR Techcombank - TRAN ANH DUC - 1902 8132 6230 18"
                className={styles.qrImage}
              />
            </div>
          </section>

          {/* CTA bottom */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaLeft}>
              <h2>Muốn được tư vấn kỹ hơn?</h2>
              <p>
                Nếu bạn muốn Lười Chúa tư vấn kỹ hơn về nhu cầu của bạn, hoặc bạn quá lười để
                tự làm — hãy để <strong>Lười Chúa làm thay cho bạn</strong>. Để lại thông tin
                bên dưới hoặc liên hệ trực tiếp.
              </p>
            </div>
            <div className={styles.ctaRight}>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href={ZALO_URL} target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} ${styles.zaloBtn}`} title="Zalo">
                <svg viewBox="0 0 48 48" fill="white" width="20" height="20">
                  <path d="M24 4C12.95 4 4 12.95 4 24c0 3.9 1.09 7.55 2.98 10.67L4 44l9.62-2.92C16.59 42.94 20.2 44 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4zm-6.5 11h2.5v10h-2.5V15zm4 0h2.3l4.7 6.5V15H31v10h-2.3L24 18.5V25h-2.5V15zm9 8.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm-12 0c0 .83-.67 1.5-1.5 1.5S15.5 24.33 15.5 23.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
                </svg>
                <span>Zalo</span>
              </a>
            </div>
          </section>

        </div>

        {/* Tally form embed */}
        <div className={styles.tallyWrap}>
          <h2 className={styles.tallyTitle}>Bạn có nhu cầu gì muốn nhắn đến Lười Chúa?</h2>
          <iframe
            data-tally-src="https://tally.so/embed/WOpZke?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="284"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Form tư vấn Lười HR"
          />
        </div>

      </main>
    </Layout>
  );
}
