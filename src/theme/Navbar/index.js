import React from 'react';
import Navbar from '@theme-original/Navbar';
import { useLocation } from '@docusaurus/router';
import NavbarEn from '@site/src/components/NavbarEn';

// navbar.items trong docusaurus.config.js là cấu hình tĩnh, không đổi được theo
// route. Wrap ở đây để mỗi route được prerender với đúng menu của nó — nếu ẩn
// bằng CSS thì HTML trang EN vẫn chứa link tiếng Việt cho Googlebot đọc.
export default function NavbarWrapper(props) {
  const { pathname } = useLocation();
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  return isEn ? <NavbarEn /> : <Navbar {...props} />;
}
