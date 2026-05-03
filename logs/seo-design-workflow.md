# Workflow Thiết Kế Website Chuẩn SEO — Lười HR
**Nguồn tham khảo:** [13 tiêu chí website chuẩn SEO — Advertising Vietnam](https://advertisingvietnam.com/article/13-tieu-chi-cho-mot-website-chuan-seo-ma-ban-can-biet-p18040)  
**Ngày lập:** 2026-04-21  
**Áp dụng cho:** luoi-hr (Docusaurus + Vercel)

---

## 13 Tiêu Chí Website Chuẩn SEO

### 1. Tốc độ tải trang
- Load time: 1–3 giây là chuẩn
- Google mất 90%+ người dùng nếu trang load > 3–5 giây
- **Áp dụng:** Tối ưu ảnh (WebP), lazy loading, minimize JS bundle

### 2. Mobile Friendly (Responsive)
- Google ưu tiên mobile-first indexing
- Thiết kế phải hoạt động tốt trên smartphone, tablet, desktop
- **Áp dụng:** Test responsive breakpoints 320px–1440px

### 3. SSL / HTTPS
- Chứng chỉ bảo mật bắt buộc
- Google đánh dấu HTTP là "Not Secure"
- **Áp dụng:** Vercel tự cấp SSL free ✓

### 4. Meta Title & Meta Description
- Title: 50–60 ký tự, chứa từ khóa chính, không ALL CAPS
- Description: 150–160 ký tự, mô tả lợi ích rõ ràng, chứa CTA nhẹ
- **Áp dụng:** Cấu hình trong `docusaurus.config.js` và từng trang docs

### 5. URL chuẩn
- Ngắn gọn, dễ đọc, chứa từ khóa
- Dùng dấu gạch ngang `-` thay vì `_` hoặc ký tự đặc biệt
- Không dùng tham số query string cho nội dung chính
- **Áp dụng:** Slug docs phải là tiếng Việt không dấu hoặc tiếng Anh

### 6. Nội dung chất lượng (Content)
- Bài viết 1500+ từ đạt SEO tốt nhất
- Mật độ từ khóa 2–5% (không nhồi từ khóa)
- Cấu trúc rõ ràng: H1 → H2 → H3
- Google ưu tiên nội dung cung cấp thông tin thực tế: tips, kinh nghiệm, hướng dẫn
- **Áp dụng:** Mỗi bài docs nên có H1 rõ, 1500+ chữ với từ khóa HR + AI

### 7. Internal Link (Liên kết nội bộ)
- Liên kết giữa các trang liên quan, giúp Google crawl toàn bộ site
- Tăng time-on-site, giảm bounce rate
- **Áp dụng:** Mỗi bài docs liên kết đến ít nhất 2–3 bài khác liên quan

### 8. Hình ảnh tối ưu
- Nén dung lượng (< 200KB/ảnh)
- Định dạng WebP thay PNG/JPEG
- Alt text mô tả có từ khóa
- Kích thước phù hợp (không scale down bằng CSS)
- **Áp dụng:** Tất cả ảnh trong `static/` phải có alt text, nén về WebP

### 9. Giao diện & UX
- Tối đa 3 màu chủ đạo
- Đơn giản, dễ nhìn, thể hiện đầy đủ tính năng
- Điều hướng trực quan, không quá 3 click để đến nội dung bất kỳ
- **Áp dụng:** Lười HR dùng #10B981 + #0F172A + #FAFAF8 — đạt chuẩn ✓

### 10. Sitemap XML
- Giúp Google/Bing khám phá tất cả trang
- Cập nhật tự động khi thêm bài mới
- **Áp dụng:** Docusaurus tự sinh `/sitemap.xml` ✓ — cần submit lên Google Search Console

### 11. Schema Markup / Structured Data
- Giúp Google hiểu nội dung sâu hơn (Article, HowTo, FAQ, BreadcrumbList)
- Rich snippets tăng CTR trên SERP
- **Áp dụng:** Thêm Article schema cho docs, FAQ schema cho trang chính

### 12. Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID/INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Áp dụng:** Test trên PageSpeed Insights, tối ưu font loading (preconnect)

### 13. Breadcrumb Navigation
- Giúp user biết vị trí hiện tại trong site
- Google hiển thị breadcrumb trên SERP thay vì URL dài
- Tăng CTR và giúp crawling
- **Áp dụng:** Docusaurus tự sinh breadcrumb trong docs ✓ — cần thêm BreadcrumbList schema

---

## Checklist Áp Dụng Cho Lười HR

| # | Tiêu chí | Trạng thái hiện tại | Cần làm |
|---|---|---|---|
| 1 | Tốc độ tải trang | ⚠️ Chưa đo | Chạy PageSpeed Insights |
| 2 | Mobile Friendly | ✅ Responsive | Test 320px–768px |
| 3 | SSL/HTTPS | ✅ Vercel tự cấp | — |
| 4 | Meta Title/Description | ⚠️ Chỉ có trang chủ | Thêm cho từng docs page |
| 5 | URL chuẩn | ⚠️ Chưa kiểm tra slug | Audit tất cả URL docs |
| 6 | Nội dung 1500+ từ | ⚠️ Đa số bài ngắn | Mở rộng các bài docs chính |
| 7 | Internal Link | ⚠️ Thiếu | Thêm "Xem thêm" links vào cuối bài |
| 8 | Hình ảnh tối ưu | ❌ Chưa có alt text | Thêm alt text, convert WebP |
| 9 | Giao diện UX | ✅ 3 màu chuẩn | Cải thiện navigation |
| 10 | Sitemap | ✅ Auto Docusaurus | Submit lên Search Console |
| 11 | Schema Markup | ❌ Chưa có | Thêm Article + FAQ schema |
| 12 | Core Web Vitals | ⚠️ Chưa đo | Test PageSpeed + optimize |
| 13 | Breadcrumb | ✅ Docusaurus tự sinh | Thêm BreadcrumbList schema |

---

## Quy Trình Thiết Kế SEO-First (Workflow)

### Trước khi tạo trang mới
1. Nghiên cứu từ khóa → chọn 1 từ khóa chính + 2–3 từ khóa phụ
2. Đặt slug URL chuẩn (không dấu, dùng `-`)
3. Viết Meta Title (50–60 ký tự, có từ khóa)
4. Viết Meta Description (150–160 ký tự, có CTA)

### Khi viết nội dung
1. H1 = title bài (có từ khóa chính)
2. Chia section bằng H2/H3 rõ ràng
3. Độ dài: 1500+ từ
4. Mật độ từ khóa: 2–5%
5. Thêm ít nhất 1 hình ảnh có alt text
6. Thêm 2–3 internal links đến bài liên quan

### Khi publish
1. Test mobile trên Chrome DevTools (375px, 768px)
2. Chạy Lighthouse score (target: 90+)
3. Kiểm tra breadcrumb hiển thị đúng
4. Ping Google Search Console (submit URL)

### Định kỳ (hàng tháng)
1. Chạy PageSpeed Insights toàn site
2. Kiểm tra Core Web Vitals trên Search Console
3. Audit internal links (trang nào thiếu link?)
4. Review hình ảnh chưa có alt text
