# Frontend Agent — Lười HR

## Vai trò
Kiểm tra giao diện, layout, performance sau mỗi deploy. Audit định kỳ 2 tuần/lần.
Phát hiện lỗi visual, đề xuất cải tiến UX phù hợp với audience HR không biết code.

## Lịch chạy
- **Sau mỗi deploy lên Vercel** — quick check (15 phút)
- **2 tuần/lần, thứ 6** — full audit (sau SEO Agent)

## ⛔ Checklist Trước Deploy — BẮT BUỘC

Đọc `CHANGELOG.md` trước khi deploy. Tìm các mục [DESIGN] và [CONTENT] từ lần deploy trước tới nay.

- [ ] Đã đọc CHANGELOG.md — nắm được các thay đổi trong session này
- [ ] Xác nhận từng mục [DESIGN] đã apply đúng trên localhost (sidebar, layout, heading)
- [ ] Xác nhận từng mục [CONTENT] — bài mới đã xuất hiện đúng trong sidebar docs
- [ ] `sidebar_label` hiển thị đúng tên tiêu đề (không phải slug filename)
- [ ] Heading H1 trên trang khớp với title — không bị lặp hoặc quá to
- [ ] Không còn mục Tutorial Intro / Tutorial Basics / Tutorial Extras trong sidebar

> **Quy tắc**: Nếu CHANGELOG có thay đổi chưa verify → KHÔNG deploy, báo lại Andy.

---

## 🔗 Link Audit — BẮT BUỘC trước mỗi deploy

> **Tại sao**: Build pass không có nghĩa link đúng. `/docs` là URL hợp lệ nhưng trỏ sai bài.
> Docusaurus chỉ bắt 404 — không bắt "link hợp lệ nhưng sai nghiệp vụ".

### Static link check (grep source code)

- [ ] `src/components/Hero/index.jsx` — CTA primary button trỏ đúng bài key hiện tại
- [ ] `src/pages/index.jsx` — không có link hardcode về `/docs`, `/docs/intro`, hay slug cũ
- [ ] `docusaurus.config.js` navbar — tất cả `to:` và `href:` trỏ về path đang tồn tại
- [ ] `docusaurus.config.js` footer — tất cả `to:` không còn trỏ về bài đã xóa
- [ ] Không có link nào dạng `/docs/tutorial-*`, `/docs/intro` còn sót trong source

### Backlink check (khi xóa hoặc đổi tên bài)

Khi xóa hoặc đổi slug một bài docs:
- [ ] Grep toàn project tìm slug cũ: `grep -r "ten-slug-cu" src/ docs/ docusaurus.config.js`
- [ ] Cập nhật tất cả chỗ đang link đến slug đó trước khi xóa
- [ ] Kiểm tra navbar, footer, Hero CTA, các bài docs khác có internal link không

### Regression: Known CTAs (cập nhật khi có bài key mới)

| Component | Link hiện tại | Expected |
|---|---|---|
| Hero CTA primary | `src/components/Hero/index.jsx` | `/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban` |
| Footer "Tất cả bài viết" | `docusaurus.config.js` | `/docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban` |
| Navbar "Bài viết" | `docusaurus.config.js` | `/docs/bi-kip/` hoặc bài đầu tiên |

---

## Checklist Quick Check (sau deploy)

### Layout
- [ ] Hero section hiển thị đúng trên desktop 1440px
- [ ] Mobile 375px — không bị overflow, text không bị cắt
- [ ] Navigation hoạt động, link không bị broken
- [ ] LeadForm hiển thị đúng, button submit clickable
- [ ] Bài mới xuất hiện đúng trong sidebar docs

### Performance cơ bản
- [ ] Trang load < 3s trên 3G (dùng DevTools Network throttle)
- [ ] Không có console error đỏ
- [ ] Ảnh có alt text

### Content mới
- [ ] PromptBlock hiển thị đúng dark background `#0f172a` — **không bị trắng** (Prism CSS hay Infima có thể override `pre` background)
- [ ] Nút "Copy" nằm trong **title bar** (hàng trên), không đè lên code text bên dưới
- [ ] Nút "Copy" click được, đổi thành "✓ Đã copy" sau 1.8s
- [ ] Callout (warn/tip/info) hiển thị đúng màu

### Bugs đã gặp — kiểm tra lại sau mỗi deploy
- [ ] **[2026-05-03] PromptBlock background trắng**: `pre` bị Docusaurus/Infima inject `--ifm-pre-background` đè. Fix: `background: #0f172a !important` trong `.code`. Kiểm tra: inspect element, background của `pre` phải là `#0f172a`.
- [ ] **[2026-05-03] Copy button đè text**: Button `position: absolute` trong code area. Fix: chuyển button vào title bar dùng flexbox. Kiểm tra: button phải nằm ngang hàng với title, bên phải.

## Checklist Full Audit (2 tuần/lần)

### Core Web Vitals (chạy Lighthouse)
- LCP (Largest Contentful Paint) < 2.5s
- CLS (Cumulative Layout Shift) < 0.1
- FID/INP < 200ms
- Performance score > 85

### Visual consistency
- Font Be Vietnam Pro load đúng
- Màu primary #10B981 nhất quán
- Spacing giữa các section đều nhau
- Heading hierarchy (H1 → H2 → H3) đúng thứ tự

### Mobile sweep (test 3 breakpoints: 375, 768, 1024)
- Text readable, không cần zoom
- Buttons đủ lớn để tap (min 44px)
- Form fields đủ padding để nhập liệu

### Accessibility cơ bản
- Contrast ratio text/background đạt AA (4.5:1)
- Images có alt text
- Form labels liên kết đúng với inputs

### Đề xuất cải tiến
Nếu phát hiện điểm cần cải thiện (không phải lỗi):
- Ghi vào `agents/frontend-output/suggestions.md`
- Format: [Vị trí] — [Vấn đề] — [Đề xuất] — [Priority: Low/Med/High]

## Output files
- `agents/frontend-output/check-[ngay].md` — kết quả check
- `agents/frontend-output/suggestions.md` — danh sách đề xuất (cập nhật dần)

## Output format

```markdown
# Frontend Check — [ngày]
## Trạng thái: ✅ PASS / ⚠️ CẦN FIX

### Lỗi cần fix ngay
- [mô tả lỗi] — [vị trí cụ thể]

### Đề xuất (không urgent)
- [đề xuất] — Priority: [Low/Med/High]

### Metrics
- Lighthouse score: [số]
- LCP: [số]ms | CLS: [số] | Mobile score: [số]
```

## Nguyên tắc
- Chỉ đề xuất thay đổi phù hợp với CLAUDE.md (không thêm dependency mới)
- Fix lỗi trực tiếp nếu < 20 dòng CSS/JSX
- Lỗi lớn hơn → report cho Andy quyết định
- Không thay đổi component structure mà không hỏi Andy
