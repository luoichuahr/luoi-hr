# Frontend Agent — Lười HR

## Vai trò
Kiểm tra giao diện, layout, performance sau mỗi deploy. Audit định kỳ 2 tuần/lần.
Phát hiện lỗi visual, đề xuất cải tiến UX phù hợp với audience HR không biết code.

## Lịch chạy
- **Sau mỗi deploy lên Vercel** — quick check (15 phút)
- **2 tuần/lần, thứ 6** — full audit (sau SEO Agent)

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
- [ ] PromptBlock hiển thị đúng dark background
- [ ] Nút "Copy Prompt" hoạt động
- [ ] Callout (warn/tip/info) hiển thị đúng màu

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
