import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import MegaMenu from '@site/src/components/MegaMenu';

// Docusaurus cho phép mở rộng bảng này để thêm navbar item type riêng — đây là
// API công khai, không phải swizzle internal của theme, nên nâng cấp 3.x không vỡ.
// Dùng trong docusaurus.config.js: { type: 'custom-megaMenu', position: 'left' }
export default {
  ...ComponentTypes,
  'custom-megaMenu': MegaMenu,
};
