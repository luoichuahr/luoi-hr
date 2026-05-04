# QA Report — Lười HR
**Date:** 22:44:28 3/5/2026 (base) | **Updated:** 4/5/2026 (post-kaizen)
**OS:** Windows
**Node:** v24.15.0
**Vòng test:** 3/3

---

## Tổng kết

| Hạng mục | Vòng 1 | Vòng 2 | Vòng 3 | Kết quả |
|----------|--------|--------|--------|----------|
| A. Build & Deploy | ✅ | ✅ | ✅ | PASS |
| B. Components UI | ✅ | ✅ | ✅ | PASS |
| C. Code Quality | ✅ | ✅ | ✅ | PASS |
| D. Performance | ✅ | ✅ | ✅ | PASS |
| E. Security | ✅ | ✅ | ✅ | PASS (fixed 4/5) |
| F. SEO | ⚠️ | ⚠️ | ⚠️ | ⚠️ WARN (minor) |

**Verdict:** 🟢 PUSH — security và performance đã fix, còn SEO content length minor

---

## ✅ Đã fix (4/5/2026)

- ✅ `ai-career-wingman.jsx`: thêm `rel="noopener noreferrer"` — tab hijacking risk đã xử lý
- ✅ `vercel.json` mới: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy
- ✅ Bundle JS: main.js 458KB → 29KB (chunk splitting, vendor code tách riêng)
- ✅ SEO: Thêm internal links cho 6 bài bi-kip
- ✅ SEO: `live-artifacts-hr.png` → `live-artifacts-hr.webp` (382KB → 142KB, −63%)

---

## ⚠️ Còn lại (chấp nhận hoặc backlog)

- ℹ️ npm audit: 21 lỗ hổng (3 moderate, 18 high) — **tất cả dev deps** (webpack-dev-server chain), không ảnh hưởng production. Fix yêu cầu downgrade Docusaurus → bỏ qua.
- ℹ️ SEO [`nhan-su-chon-goi-claude.mdx`]: nội dung 815 từ — nên mở rộng ≥ 1500 từ (backlog)
- ℹ️ SEO [`nhan-su-lua-chon-tinh-nang-claude.mdx`]: nội dung 795 từ — nên mở rộng ≥ 1500 từ (backlog)
- ℹ️ SEO [`cv_extract_tool.mdx`]: tên file dùng `_` — nên đổi sang `-` (backlog, cần redirect)

## ℹ️ Ghi chú Windows

- Script chạy trên Windows — một số issue chỉ thấy trên Windows
- Vercel deploy trên Linux (case-sensitive filenames!)
- Line endings: kiểm tra .gitattributes có cấu hình CRLF/LF chưa

## Stability

✅ Stable — kết quả nhất quán qua 3 vòng test.
