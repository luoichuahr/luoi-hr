/**
 * Nguồn dữ liệu DUY NHẤT cho danh sách tool.
 * Đọc bởi: src/components/MegaMenu (navbar) và sitemap trong docusaurus.config.js.
 *
 * Thêm tool mới → thêm 1 object vào đây là xong, không phải sửa chỗ nào khác.
 * Nếu tool là file .html đặt trong static/ thì nhớ chèn snippet GA4 vào <head>
 * của chính file đó (Hard Rule #6 trong CLAUDE.md) — preset gtag không chạm static/.
 *
 * kind  : 'tool' = người dùng nhập liệu được | 'demo' = chỉ để xem, không có ô nhập
 * index : false  = gắn noindex, loại khỏi sitemap và khỏi mega menu
 */

export const TOOL_CATEGORIES = [
  { id: 'recruit', label: 'Tuyển dụng & Nhân tài' },
  { id: 'org', label: 'Tổ chức & Vận hành' },
  { id: 'perf', label: 'Hiệu suất & Trải nghiệm' },
];

export const TOOLS = [
  {
    id: 'career-wingman',
    icon: '✨',
    name: 'AI Career Wingman',
    desc: 'Viết và chấm CV theo đúng JD',
    to: '/tools/ai-career-wingman',
    cat: 'recruit',
    kind: 'tool',
    priority: 0.9,
  },
  {
    id: 'org-chart',
    icon: '🧬',
    name: 'Tạo sơ đồ tổ chức',
    desc: 'Upload danh sách nhân sự, ra sơ đồ ngay',
    to: '/org-chart/',
    cat: 'org',
    kind: 'tool',
    priority: 0.9,
  },
  {
    id: 'kpi',
    icon: '📊',
    name: 'Hệ thống đánh giá KPI',
    desc: 'Nhập mục tiêu, tự chấm điểm hiệu suất',
    to: '/kpi-demo/',
    cat: 'perf',
    kind: 'tool',
    priority: 0.8,
  },
  {
    id: 'hr-department',
    icon: '🗂️',
    name: 'Sơ đồ chức năng phòng HR',
    desc: 'Ai làm gì trong một phòng Nhân sự',
    to: '/hr-tools/hr_department.html',
    cat: 'org',
    kind: 'demo',
    priority: 0.6,
  },
  {
    id: 'hr-lifecycle',
    icon: '🔄',
    name: 'Vòng đời nhân viên',
    desc: 'Từ lúc tuyển vào đến khi nghỉ việc',
    to: '/hr-tools/hr_lifecycle_simulation.html',
    cat: 'org',
    kind: 'demo',
    priority: 0.6,
  },
  {
    id: 'attrition',
    icon: '📈',
    name: 'Dashboard chi phí nhân lực',
    desc: 'Đọc dữ liệu nghỉ việc bằng biểu đồ',
    to: '/demos/hr-ibm-dashboard.html',
    cat: 'perf',
    kind: 'demo',
    priority: 0.6,
  },
  {
    id: 'office-sim',
    icon: '🏢',
    name: 'Văn phòng nhân sự số hóa',
    desc: 'Dạo quanh phòng HR mô phỏng',
    to: '/hr-office-sim/',
    cat: 'perf',
    kind: 'demo',
    priority: 0.6,
  },
  {
    // Trang phục vụ đúng một workshop, không phải tool chung → không index,
    // không lên menu. Ai có link trực tiếp vẫn mở được bình thường.
    id: 'certificate',
    icon: '🏅',
    name: 'Giấy chứng nhận workshop',
    desc: 'Trang riêng của một khóa đào tạo',
    to: '/certificate/',
    cat: 'perf',
    kind: 'tool',
    index: false,
  },
];

/**
 * Trang React (route Docusaurus) hay file .html tĩnh copy thẳng vào build?
 * File tĩnh bắt buộc dùng <a href> — <Link to> sẽ cố client-side routing rồi ra 404.
 * Quy ước: chỉ những gì nằm dưới /tools/ mới là trang React.
 */
const isStaticFile = (to) => !to.startsWith('/tools/');

/** Tool hiện lên menu và sitemap — bỏ những mục index:false */
export const PUBLIC_TOOLS = TOOLS.filter((t) => t.index !== false).map((t) => ({
  ...t,
  staticFile: isStaticFile(t.to),
}));

/** Gom tool theo nhóm, giữ đúng thứ tự khai báo trong TOOL_CATEGORIES */
export const TOOLS_BY_CATEGORY = TOOL_CATEGORIES.map((cat) => ({
  ...cat,
  items: PUBLIC_TOOLS.filter((t) => t.cat === cat.id),
})).filter((cat) => cat.items.length > 0);
