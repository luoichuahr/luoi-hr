# CHANGELOG — Lười HR Website

## Quy ước
- `[DESIGN]` — quyết định giao diện/UX
- `[ARCH]` — quyết định kiến trúc kỹ thuật
- `[CONTENT]` — quyết định nội dung/cấu trúc bài
- `[BUSINESS]` — quyết định monetization/funnel

---

## v0.1 — Khởi tạo dự án (2025-04)

### Quyết định kiến trúc
- `[ARCH]` Stack: **Docusaurus + GitHub + Vercel**
  - Lý do: newbie-friendly, thêm bài = thêm file .md, sidebar tự cập nhật, free deploy
  - Bác bỏ: Notion+Super.so (ít control design), Next.js scratch (overkill cho newbie)
- `[ARCH]` CMS: **Markdown files** trong thư mục `/docs`
  - Lý do: không cần database, không cần backend, Claude Cowork tạo file trực tiếp
- `[ARCH]` Workflow thêm bài mới: **Claude Cowork → tạo .md → git push → Vercel auto-deploy**
  - Không cần gọi lại prompt từ đầu mỗi lần thêm bài

### Quyết định giao diện
- `[DESIGN]` Layout: **Sidebar trái (260px) + Content chính giữa (max 780px)**
  - Lý do: documentation-style, người dùng tìm bài nhanh, không bị distract
- `[DESIGN]` Font: **Be Vietnam Pro** — đọc tiếng Việt tốt, modern, không generic
- `[DESIGN]` Màu chủ đạo: **Green #10B981** cho CTA, Slate cho text, Off-white cho bg
  - Lý do: green = action/productivity, phù hợp tone "lười mà hiệu quả"
- `[DESIGN]` Tone: **Playful nhưng credible** — không quá corporate, không quá indie
- `[DESIGN]` Brand icon: **🦥 sloth** — nhất quán với tên "Lười HR"

### Quyết định nội dung
- `[CONTENT]` Cấu trúc sidebar 4 nhóm:
  1. Nhập môn (AI cơ bản, Claude vs Gemini, viết prompt)
  2. Build Tools & Web (tạo website, HR agent, Google Sheet)
  3. Skills cho Agent (JD, Offer, KPI, thông báo)
  4. Theo vị trí (HRBP, Recruiter, C&B)
- `[CONTENT]` Mỗi bài có: badge độ khó + thời gian đọc + Prompt Block có nút Copy + Callout "Lưu ý chống ngáo"
- `[CONTENT]` Đối tượng: HR, Recruiter, C&B, Headhunter — không biết code, muốn dùng AI ngay

### Quyết định monetization
- `[BUSINESS]` Funnel 3 tầng:
  - Tier 1: Đọc free, copy prompt, tự làm → build trust
  - Tier 2: Donate cafe (QR Momo) → nuôi cộng đồng
  - Tier 3: Thuê làm A-Z (form lead → Google Sheet + Zalo) → thu nhập chính
- `[BUSINESS]` Lead capture: form 3 field (tên, Zalo/email, vị trí) → Google Sheet
  - Lý do: Zalo đơn độc không đủ — mất lead ban đêm

### So sánh với đối thủ tham khảo
- `[BUSINESS]` Tham khảo: mastering-da.com — ngách khác (Data Analyst vs HR), không phải đối thủ
- `[DESIGN]` MDA mạnh hơn về first impression (ảnh, partner logo, địa chỉ)
- `[DESIGN]` Lười HR mạnh hơn về actionability (prompt dùng ngay, small win trong bài)
- `[DESIGN]` Cần bổ sung sau: ảnh preview bài, số liệu social proof, emoji trong sidebar

### Việc cần làm (backlog)
- [ ] Setup Docusaurus project thực tế trên máy
- [ ] Config theme màu green + font Be Vietnam Pro
- [ ] Tạo PromptBlock component (reusable)
- [ ] Tạo Callout component (warn/tip/info)
- [ ] Tích hợp Google Form → Sheet cho lead capture
- [ ] Thêm social proof section (số người dùng, testimonial nhỏ)
- [ ] Gắn tên miền riêng
- [ ] Tối ưu first impression: ảnh header mỗi bài

---

## v0.2 — Setup Guide & Architecture Review (2026-04)

### Quyết định kiến trúc (ARCH_REVIEW)
- `[ARCH]` **JavaScript (not TypeScript)** cho Docusaurus setup
  - Lý do: Lười HR là doc site đơn giản, không cần strict typing
  - Theo nguyên tắc: không over-engineer, focus content vs small wins
  - Setup nhanh hơn, compile step ít hơn → dev speed tốt hơn

### Quyết định hướng dẫn
- `[CONTENT]` **Thêm links + setup guide vào SKILL_website.md**
  - Node.js link: https://nodejs.org (chọn LTS)
  - Git link: https://git-scm.com
  - Giải thích JavaScript vs TypeScript choice → tránh confusion

---

## v0.3 — Git Setup Guide for Newbie (2026-04-09)

### Quyết định hướng dẫn
- `[CONTENT]` **Tạo file SETUP-GIT-NEWBIE.md riêng để hướng dẫn chi tiết Git setup**
  - Lý do: GitHub chỉ cho 3 dòng lệnh (giả định bạn đã làm phần trước), nhưng newbie bị confuse vì không biết phần trước cần làm gì
  - Giải pháp: cung cấp **toàn bộ 6 bước từ zero** kèm giải thích tại sao
  - Bảng so sánh rõ ràng: "GitHub cho 3 dòng" vs "Newbie cần 6 dòng"
- `[CONTENT]` **Hai cách thực hiện:** gõ từng dòng (an toàn) vs copy/paste (nhanh)
- `[CONTENT]` **Giải thích từng lệnh là dùng để làm gì** với ví dụ hộp thư/bưu điện
- `[CONTENT]` **Hướng dẫn tạo GitHub Personal Access Token** (vì GitHub không chấp nhận mật khẩu thường)
- `[CONTENT]` **Khắc phục lỗi thường gặp** (not a git repository, remote already exists, etc.)
