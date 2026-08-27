// Chuỗi hiển thị của section Skills. Tách khỏi index.jsx để bản EN
// (src/pages/en/content.js) truyền object cùng hình dạng vào prop `t`.

export const VI = {
  stats: [
    { n: '30+',  l: 'Skills sẵn có' },
    { n: '0',    l: 'Dòng code cần biết' },
    { n: '5-10', l: 'Phút setup xong' },
    { n: '24/7', l: 'Hoạt động liên tục' },
  ],

  eyebrow: 'Agent của bạn thành thạo',
  title: 'Hơn 30 nghiệp vụ nhân sự',
  titleAccent: 'từ A-Z',
  titleNoWrap: true, // tiêu đề VI đủ ngắn để ép 1 dòng; bản EN dài hơn nên để false
  sub: 'Giao bất kỳ task HR nào — Agent biết làm tất cả. Không gì không thể.',

  // 30 skills theo 6 nghiệp vụ HR — mỗi category agent đều thành thạo
  categories: [
    {
      cat: '🎯 Tuyển dụng',
      items: ['Viết JD', 'Lọc & chấm CV', 'Câu hỏi phỏng vấn', 'Scorecard ứng viên', 'Tin đăng tuyển', 'Email chăm sóc ứng viên'],
    },
    {
      cat: '📋 Onboarding',
      items: ['Checklist nhận việc', 'Plan 30/60/90 ngày', 'Email chào mừng', 'Assign buddy & mentor', 'KPI tuần đầu'],
    },
    {
      cat: '💰 C&B',
      items: ['Thư Offer chuẩn', 'Phân tích band lương', 'Cấu trúc thưởng', 'Mô hình phúc lợi', 'Equity & ESOP'],
    },
    {
      cat: '📈 Performance',
      items: ['KPI framework', 'Review template', 'Calibration prep', 'PIP action plan', '360° feedback'],
    },
    {
      cat: '📢 Truyền thông HR',
      items: ['Thông báo nội bộ', 'Draft policy', 'Email toàn công ty', 'Employer branding post'],
    },
    {
      cat: '📊 Báo cáo & Phân tích',
      items: ['Headcount snapshot', 'Attrition report', 'Diversity metrics', 'Flight risk analysis', 'Monthly HR report'],
    },
  ],

  cta: { href: '/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban', label: 'Bắt đầu xây Agent của bạn →' },
  ctaNote: 'Dễ dàng · Không cần biết code',
};
