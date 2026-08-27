// Toàn bộ chuỗi hiển thị của Hero. Tách khỏi index.jsx để bản tiếng Anh
// (src/pages/en/content.js) truyền object cùng hình dạng vào prop `t`.
// Sửa chữ ở đây, không sửa trong JSX.

export const VI = {
  pill: {
    href: '/tools/ai-career-wingman',
    prefix: '✨ Tool mới:',
    strong: 'Tool tạo CV phù hợp JD',
    suffix: '— Thử ngay →',
  },
  // 3 dòng headline; dòng giữa được bọc <em> làm highlight
  headline: ['HR Agent', 'giúp bạn làm mọi thứ', 'trong nhân sự'],
  sub: 'Từ viết JD, Offer, xây dựng KPI, tạo hành trình Onboarding đến báo cáo phân tích nhân sự — giao task là HR Agent xử lý.',
  ctaPrimary: { href: '/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban', label: 'Xây Agent ngay →' },
  ctaSecondary: { href: '#skills', label: 'Xem 30+ Skills' },
  proof: ['Được dùng bởi', '300+ HR Việt Nam'],
  tags: ['HRBP', 'Recruiter', 'C&B', 'HRM', 'Headhunter'],

  chatTitle: '🤖 HR Agent · Đang hoạt động',
  chatDone: '✓ Xong trong 3 giây!',
  scenarios: [
    {
      user: 'Viết JD cho vị trí HRBP Senior',
      items: ['📄 JD chuẩn 500 từ, chuẩn SEO', '❓ 12 câu hỏi phỏng vấn', '📊 Scorecard đánh giá ứng viên'],
    },
    {
      user: 'Tạo KPI tháng 4 cho team Talent',
      items: ['🎯 5 KPI đo lường rõ ràng', '📈 Dashboard theo dõi tiến độ', '📋 Template báo cáo tuần'],
    },
    {
      user: 'Xây hành trình Onboarding 30 ngày',
      items: ['✅ Checklist nhận việc đầy đủ', '📅 Plan 30/60/90 ngày', '🤝 Assign buddy & mentor'],
    },
  ],

  flashcard: {
    href: '/tools/ai-career-wingman',
    label: 'Tool tạo CV phù hợp JD',
    cta: 'Thử ngay →',
    steps: [
      { icon: '📄', tag: 'Bước 1', text: 'Tải lên CV của bạn...', sub: 'AI đang đọc 11 năm kinh nghiệm', color: '#3B82F6' },
      { icon: '🔍', tag: 'Bước 2', text: 'Phân tích hồ sơ', sub: 'Tìm thấy 6 thành tích chưa có số', color: '#8B5CF6' },
      { icon: '📋', tag: 'Bước 3', text: 'Đọc JD: HRBP Manager · Bosch', sub: 'Đối chiếu 14 tiêu chí tuyển dụng', color: '#F59E0B' },
      { icon: '✨', tag: 'Bước 4', text: 'CV mới khớp 81% với JD này', sub: 'Gap report + STAR stories sẵn sàng', color: '#0D9488' },
      { icon: '📍', tag: 'Bước 5', text: 'Bosch cách nhà bạn ~22 phút 🛵', sub: 'Giờ cao điểm 7–8h: khoảng 38 phút', color: '#EF4444' },
    ],
  },
};
