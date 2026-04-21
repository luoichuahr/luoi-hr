# CHANGELOG — Lười HR Website

## Quy ước
- `[DESIGN]` — quyết định giao diện/UX
- `[ARCH]` — quyết định kiến trúc kỹ thuật
- `[CONTENT]` — quyết định nội dung/cấu trúc bài
- `[BUSINESS]` — quyết định monetization/funnel

---

## v1.1 — UI Refresh: Hero animated + FloatingContact (2026-04-21)

### Quyết định thiết kế
- `[DESIGN]` **Hero headline + subtitle** — đổi sang "HR Agent / giúp bạn làm mọi thứ / trong nhân sự", subtitle nhấn đủ 4 nghiệp vụ chính
- `[DESIGN]` **Chat mockup animated** — typewriter loop 3 kịch bản (JD → KPI → Onboarding), dùng useState/useEffect, không thêm dependency
- `[DESIGN]` **Xóa floating cards** Hero ("JD viết xong", "30 skills sẵn sàng") — giảm noise, tập trung vào chat demo
- `[DESIGN]` **CTA "Xem 30+ Skills"** — thêm dấu + để trung thực hơn về số lượng
- `[DESIGN]` **Stats bar**: 30 → 30+, 10' → 5-10 / "Phút setup xong", "Agent hoạt động" → "Hoạt động liên tục"
- `[DESIGN]` **Section title**: "30 Nghiệp vụ..." → "Hơn 30 nghiệp vụ nhân sự từ A-Z" + nowrap
- `[DESIGN]` **Footer note**: bỏ "Miễn phí · credit card" → "Dễ dàng · Không cần biết code" (đúng với audience)
- `[DESIGN]` **LeadForm thu nhỏ**: max-width 380px, padding 24px — form gọn hơn, không chiếm quá nhiều viewport
- `[ARCH]` **FloatingContact component** — 2 nút LinkedIn + Zalo cố định góc dưới phải; Zalo mobile mở app, desktop hiện QR popup
- `[CONTENT]` **Sửa typo** Testimonials: "sủa" → "sửa"

---

## v1.0 — Analytics Agent + Google Analytics 4 (2026-04-21)

### Quyết định kiến trúc
- `[ARCH]` **Gắn Google Analytics 4 (GA4) vào Docusaurus** via `@docusaurus/plugin-google-gtag` (built-in classic preset, không cần cài thêm dependency)
  - Plugin: `gtag` option trong classic preset, `trackingID: G-XXXXXXXXXX` (user thay bằng ID thực)
  - `anonymizeIP: true` — tuân thủ privacy, ẩn IP người dùng
  - Lý do: GA4 là tracking chuẩn nhất cho Docusaurus, tích hợp qua config thuần, không code thêm
  - Bác bỏ: Vercel Analytics (không có free tier đủ dùng), Plausible (thêm dependency mới)

- `[ARCH]` **Tạo Analytics Agent** tại `agents/analytics-agent.md`
  - Vai trò: đọc GA4 data export (CSV) hàng tuần, phân tích traffic/content/conversion, output report + action items cho Content Agent
  - Lịch: **Thứ 2 mỗi tuần** (trước SEO Agent thứ 6, trước Content Agent thứ 3 & 5)
  - Workflow: User export CSV từ GA4 → đặt vào `agents/analytics-data/` → Agent đọc → Output `agents/analytics-output/latest.md`
  - Lý do tạo riêng, không gộp vào SEO Agent: SEO Agent = acquisition (trước visit), Analytics Agent = behavior (sau visit) — hai mục đích, hai data source, hai tần suất khác nhau

---

## v0.9 — Hero Animated Chat + Layout Fix (2026-04-20)

### Giao diện
- `[DESIGN]` **Animated chat mockup** — chuyển từ static sang typewriter animation + agent trả lời từng dòng, loop 3 kịch bản (JD → KPI → Onboarding)
  - Lý do: sinh động hơn, demo được value prop rõ hơn với user lần đầu vào
  - Dùng React useState/useEffect, không dependency mới
- `[DESIGN]` **Fix floating cards** — thêm padding vào `.right` để floatA/floatB không bị clip/tràn ra ngoài



### Nội dung
- `[CONTENT]` **Sửa headline Hero** — "Tạo cho bản thân 1 Agent làm hết..." → "HR Agent giúp bạn làm mọi thứ trong nhân sự"
  - Lý do: headline cũ dài dòng, mới ngắn gọn và rõ value prop hơn
- `[CONTENT]` **Sửa subtitle Hero** — chi tiết hóa các use case: viết JD, xây dựng KPI, hành trình Onboarding, báo cáo phân tích nhân sự; đổi "Agent" → "HR Agent"
  - Lý do: cụ thể hơn, phù hợp audience HR

---

## v0.8 — Agent System + LeadForm Tư Vấn (2026-04-20)

### Quyết định kiến trúc
- `[ARCH]` **Tạo hệ thống 4 agents** — Content, Frontend, Backend, SEO chạy trong Cowork
  - Lý do: tự động hóa quy trình viết bài 2 lần/tuần + SEO + lead analysis
  - Agents điều phối nhau, QA là chốt chặn cuối
- `[BUSINESS]` **Cập nhật LeadForm → Tally.so embed**
  - Lý do: đổi hướng từ "dùng thử" sang "tư vấn 1-1", phù hợp monetization
  - Dùng Tally embed (WOpZke) thay custom form — Tally quản lý data, không cần env var
  - CSS dọn sạch các style form cũ không còn dùng

---

## v0.7 — QA Agent Setup + Bug Fixes (2026-04-20)

### Quyết định kiến trúc
- `[ARCH]` **Tạo skill `luoi-hr-qa`** — QA agent tự động kiểm tra toàn bộ codebase theo rules CLAUDE.md
  - Lý do: Claude code sai nhiều lần, cần hệ thống kiểm tra tự động mạnh hơn
  - Trigger: tự động sau mỗi lần Edit/Write, hoặc invoke thủ công bất cứ lúc nào
- `[ARCH]` **Nâng cấp `scripts/qa-check.js`** — thêm 4 checks mới: REACT_APP_ prefix, dead components, key={idx}, stats inconsistency

### Bug fixes
- `[ARCH]` **Fix critical: LeadForm env var sai prefix**
  - Bug: `process.env.REACT_APP_GOOGLE_FORM_URL` — Docusaurus không nhận `REACT_APP_` prefix
  - Fix: đổi sang `process.env.DOCUSAURUS_GOOGLE_FORM_URL`
  - Hậu quả trước đây: form không bao giờ submit được Google Forms

---

## v0.6 — Landing Page Redesign: Dribbble Visual + Agent Positioning (2026-04-20)

### Quyết định giao diện
- `[DESIGN]` **Redesign Hero section theo Dribbble "AI HR Management" style (Caliber Design)**
  - Bỏ: gradient xám nhạt, placeholder text, headline technical "Xây dựng HR Agent 10 phút"
  - Mới: cream background (#FAFAF8), chat mockup live demo, sparkle decorations, floating cards
  - Headline mới: "Tạo cho bản thân 1 Agent làm hết mọi thứ trong nhân sự"
  - Lý do: Dribbble design mạnh ở human element + social proof in hero + section diversity — học visual, giữ personality Lười HR
  - Thêm: eyebrow badge (green pill), audience tags (HRBP/Recruiter/C&B/HRM), star rating + user count ngay trong hero
  - Thêm: animated typing dots trong chat mockup → cảm giác Agent đang làm việc thật

- `[DESIGN]` **Rewrite Features3Column → AgentSkills (30 Skills grid)**
  - Bỏ: 3 feature card generic (JD, KPI, AI Agent)
  - Mới: 6 category × 5-6 skills = 30 skills hiển thị dạng card grid
  - Stats strip 4 con số: 30 Skills · 0 Dòng code · 10' Setup · 24/7 hoạt động
  - Lý do: người HR nhìn vào biết ngay Agent làm được việc của mình, không phải generic SaaS

### Quyết định kiến trúc
- `[ARCH]` Không thêm dependency mới — decorative elements dùng CSS + Unicode characters (✦)
- `[ARCH]` Chat mockup dùng pure JSX + CSS module, không dùng ảnh/SVG external
- `[ARCH]` Giữ nguyên file name Features3Column để không phải sửa import trong index.jsx

---

## v0.5 — Bài viết CV Extract Tool (2026-04-09)

### Quyết định nội dung
- `[CONTENT]` **Tạo bài hướng dẫn CV Extract Tool tại `docs/bi-kip/cv_extract_tool.mdx`**
  - Nội dung: Google Drive + Gemini AI tự động trích xuất thông tin CV thành Google Sheets
  - Tạo thư mục mới `docs/bi-kip/` + `_category_.json`
  - Dùng PromptBlock cho Gemini AI prompt (component đã có sẵn)
  - Format MDX (.mdx) để hỗ trợ import React component PromptBlock
  - Lý do: Tái sử dụng component PromptBlock thay vì markdown code block thuần

---

## v0.2 — QA/QC Skill (2026-04-09)

### Quyết định kiến trúc
- `[ARCH]` Tạo **QA/QC Skill** tại `.claude/skills/qa/`
  - Lý do: cần kiểm tra code tự động trước mỗi lần push — tránh bug lên Vercel
  - Scope: Build & Deploy + Components UI + Code Quality + Performance
  - Cross-platform: script tự detect Windows (win32) vs Mac (darwin), không hỏi user
  - Output: file `QA_REPORT.md` lưu vào root project
  - Gồm 2 file: `SKILL.md` (hướng dẫn Claude) + `scripts/qa_runner.js` (Node.js script)
  - Block policy: chỉ block khi `npm run build` fail, các lỗi khác warn thôi
  - Trigger: gọi thủ công ("chạy QA", "kiểm tra code", "qa")

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
- `[CONTENT]` **Khắc phục lỗi thường gặp** (Author identity unknown, LF/CRLF warning, not a git repository, etc.)
- `[CONTENT]` **Bước 0 bắt buộc:** Setup `git config user.name` + `user.email` TRƯỚC khi commit (lỗi newbie hay gặp)

### Update SKILL_website.md — Đồng nhất với huong-dan-website-tu-dong.html
- `[CONTENT]` **Viết lại SKILL_website.md với 4 bước RÕNG, giống file HTML**
  - **Bước 1:** Cài Node.js & Git
  - **Bước 2:** Tạo Docusaurus project
  - **Bước 3:** Đẩy lên GitHub (Git Config + Commit + Push)
  - **Bước 4:** Kết nối Vercel → Live trong 2 phút
- `[CONTENT]` **Thêm troubleshooting chi tiết** cho mỗi bước Git (Author identity, remote already exists, LF/CRLF, v.v.)
- `[CONTENT]` **Giữ WORKFLOW B, C, D** như cũ (thêm bài, sửa component, debug)
- **Lý do:** Newbie bị confuse vì SKILL_website.md ghi "Bước 8-13" nhưng HTML ghi "Bước 1-4" → Giờ cả 2 file cùng cấu trúc 4 bước rõ ràng

---

## v0.4 — Landing Page Redesign: Hybrid SaaS + Docs (2026-04-09)

### Quyết định kiến trúc (ARCH)
- `[ARCH]` **Hybrid approach: Custom landing page (src/pages/index.jsx) + Docusaurus docs**
  - Lý do: Docusaurus theme mặc định "nhàm", user muốn modern SaaS feel (Hero + Features + Testimonials) nhưng vẫn giữ docs area clean
  - Bác bỏ: Pure Next.js (overkill, không cần), Pure Docusaurus (không đủ marketing feel)
  - Giải pháp: Tạo landing page riêng ở `src/pages/index.jsx` với components custom, `/docs` folder giữ nguyên documentation style

- `[ARCH]` **Component architecture: 7 reusable components, mỗi ≤ 200 lines**
  1. **Hero** (70 lines) — SaaS-style hero, CTA buttons, headline: "Xây dựng HR Agent trong 10 phút với AI"
  2. **Features3Column** (85 lines) — 3 feature cards: "Tạo JD", "KPI tự động", "AI Agent"
  3. **Testimonials** (100 lines) — testimonial grid/carousel, quotes từ users
  4. **TrustIndicators** (75 lines) — social proof: "Dành cho HRBP • Recruiter • C&B • SME"
  5. **LeadForm** (100 lines) — form 3 field (Name, Zalo/Email, Position) → POST Google Form
  6. **PromptBlock** (80 lines) — reusable dark code block + Copy button
  7. **Callout** (60 lines) — reusable warn/tip/info alerts

- `[ARCH]` **Styling: CSS Modules + Infima (NOT adding Tailwind)**
  - Lý do: Docusaurus 3.x ships with Infima, project đã dùng CSS Modules
  - Scoped styles prevent naming conflicts, không cần compile step thêm
  - Google Fonts: Be Vietnam Pro (import trong custom.css)

- `[ARCH]` **No new dependencies**
  - Docusaurus 3.10.0 (already)
  - React 19 (bundled)
  - clsx v2.0.0 (already)
  - CSS Modules (built-in)

### Quyết định giao diện (DESIGN)
- `[DESIGN]` **Landing page sections: Hero → Features → Testimonials → Trust indicators → Form → CTA cards**
  - Hero: "Xây dựng HR Agent trong 10 phút với AI" + CTA "Bắt đầu miễn phí" & "Xem demo"
  - Features: 3 columns (JD, KPI, Agent) với icons + descriptions
  - Testimonials: User quotes + position + avatar placeholders
  - Trust: "Dành cho HRBP, Recruiter, C&B, SME", social proof stats
  - Form: Email lead capture (name, zalo/email, position)
  - CTA cards: "Trải nghiệm miễn phí" + "Dịch vụ Setup A-Z"

- `[DESIGN]` **Color & Typography**
  - Primary: #10B981 (green CTA buttons) — already in custom.css
  - Secondary: #0F172A (dark blue for PromptBlock/code blocks)
  - Font: Be Vietnam Pro (Google Fonts import)
  - Tone: Modern SaaS for landing + Academic clean for docs

- `[DESIGN]` **Responsive: Mobile-first**
  - Hero: stacked on mobile, side-by-side on desktop
  - Features: 1-column on mobile, 3-column on desktop
  - Testimonials: carousel/grid responsive

### Quyết định nội dung (CONTENT)
- `[CONTENT]` **Vietnamese UI text** — tất cả buttons, headings, placeholder text tiếng Việt
- `[CONTENT]` **Google Form integration**
  - LeadForm component POST to Google Form (action URL → env variable)
  - Success message: "✓ Đã gửi! Lười Chúa sẽ liên hệ sớm." (1.8s delay then hide)
- `[CONTENT]` **PromptBlock & Callout examples bên trong landing**
  - PromptBlock có sample prompt từ File 1
  - Callout component dùng trong feature descriptions

### Implementation Plan
- Phase 0: Update CHANGELOG + docusaurus.config.js + custom.css (15 min)
- Phase 1: 5 small wins (Hero, Features, LeadForm, PromptBlock, Callout) — mỗi < 30 min ✓ testable independently
- Phase 2: Testimonials + TrustIndicators assembly
- Phase 3: Full landing assembly + verify + deploy

**Estimated time:** ~2h 43m total (Haiku sufficient, ~15.3k tokens)

### Files to modify/create
- ✅ Update: `/CHANGELOG.md` (this file — recording decisions)
- ✅ Update: `docusaurus.config.js` (title, tagline, font imports)
- ✅ Update: `src/css/custom.css` (Be Vietnam Pro, CSS vars)
- 🆕 Create: `src/pages/index.jsx` (landing page orchestrator, rename from .js)
- 🆕 Create: `src/components/Hero/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/Features3Column/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/Testimonials/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/TrustIndicators/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/LeadForm/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/PromptBlock/index.jsx`
- 🆕 Create: `src/components/Callout/index.jsx`

### Backlog (not in this sprint)
- [ ] A/B test hero copy ("10 phút" vs "15 phút")
- [ ] Optimize SEO (meta descriptions, OG tags)
- [ ] Add video hero background or animated hero image
- [ ] Setup Zalo webhook → auto-reply form submissions
- [ ] Dark mode testing & refinement
- [ ] Analytics (Google Analytics on landing)
