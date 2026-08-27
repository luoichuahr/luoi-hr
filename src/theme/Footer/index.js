import React from 'react';
import Footer from '@theme-original/Footer';
import { useLocation } from '@docusaurus/router';

// Cùng lý do với theme/Navbar: footer trong themeConfig là tĩnh, không đổi
// theo route. Dùng lại class footer của Infima nên không cần CSS riêng.
function FooterEn() {
  return (
    <footer className="footer footer--dark">
      <div className="container container-fluid">
        <div className="row footer__links">
          <div className="col footer__col">
            <div className="footer__title">Guides</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <a className="footer__link-item" href="/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban" hrefLang="vi">
                  All articles (in Vietnamese)
                </a>
              </li>
            </ul>
          </div>
          <div className="col footer__col">
            <div className="footer__title">Tools in English</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <a className="footer__link-item" href="/en/org-chart/">Org Chart Builder</a>
              </li>
            </ul>
          </div>
          <div className="col footer__col">
            <div className="footer__title">Contact</div>
            <ul className="footer__items clean-list">
              <li className="footer__item">
                <a className="footer__link-item" href="https://zalo.me/0967696836">Zalo</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom text--center">
          <div className="footer__copyright">
            © {new Date().getFullYear()} Lười HR — AI for HR people
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function FooterWrapper(props) {
  const { pathname } = useLocation();
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  return isEn ? <FooterEn /> : <Footer {...props} />;
}
