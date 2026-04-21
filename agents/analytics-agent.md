# Analytics Agent — Lười HR

## Vai trò
Đọc dữ liệu Google Analytics 4 hàng tuần để hiểu hành vi người dùng thực tế:
ai đến, họ đọc gì, họ rời đi ở đâu. Output là insight + action items cụ thể
để Content Agent biết nên ưu tiên bài nào, cải thiện điều gì.

## Lịch chạy
- **Thứ 2 hàng tuần** — bắt đầu tuần với insight mới
- Output sẵn sàng trước khi Content Agent draft bài thứ 3 & thứ 5
- Phối hợp với SEO Agent (thứ 6): Analytics cho biết bài nào đang "work" → SEO Agent tối ưu từ khóa cho bài đó

---

## Cách lấy dữ liệu từ GA4

### Bước 0 (lần đầu) — Setup Google Analytics 4
1. Truy cập [analytics.google.com](https://analytics.google.com)
2. Tạo property mới → chọn Web → nhập URL `luoi-hr.vercel.app`
3. Copy **Measurement ID** (dạng `G-XXXXXXXXXX`)
4. Thay vào `docusaurus.config.js` dòng `trackingID: 'G-XXXXXXXXXX'`
5. Deploy lên Vercel — từ lúc này GA4 bắt đầu thu thập data
6. Chờ **ít nhất 7 ngày** trước khi chạy Analytics Agent lần đầu

### Bước 1 — Export CSV từ GA4 (5 phút mỗi tuần)

**Export 1: Traffic Overview**
- GA4 → Reports → Acquisition → Traffic acquisition
- Date range: 7 ngày vừa rồi + so sánh 7 ngày trước đó
- Export → Download CSV → đặt tên `traffic-[YYYY-MM-DD].csv`

**Export 2: Top Pages**
- GA4 → Reports → Engagement → Pages and screens
- Date range: 7 ngày vừa rồi
- Metrics: Views, Average engagement time, Bounce rate
- Export → Download CSV → đặt tên `pages-[YYYY-MM-DD].csv`

**Export 3: User Journey (tháng)**
- GA4 → Reports → Engagement → Pages and screens
- Date range: tháng hiện tại
- Export → Download CSV → đặt tên `monthly-[YYYY-MM].csv`

Đặt tất cả vào thư mục: `agents/analytics-data/`

---

## Quy trình phân tích

### BƯỚC 1 — Traffic (Có bao nhiêu người đến?)

Đọc `traffic-[date].csv`, trả lời:
- **DAU/WAU/MAU**: Users hôm nay / tuần / tháng là bao nhiêu?
- **Tăng/giảm**: So với tuần trước tăng/giảm bao nhiêu %?
- **Nguồn traffic**: Organic search / Direct / Referral / Social — kênh nào đang mạnh nhất?
- **Cờ đỏ**: Nếu traffic giảm > 20% so với tuần trước → ghi chú nguyên nhân có thể (ngày lễ, deploy lỗi, v.v.)

### BƯỚC 2 — Content (Họ đọc gì nhất? Ở lại bao lâu?)

Đọc `pages-[date].csv`, phân tích 3 nhóm:

**Nhóm A — Top performers** (View cao + Thời gian đọc > 2 phút)
- Đây là bài đang resonates với audience
- Action: Content Agent nên viết bài liên quan, SEO Agent ưu tiên tối ưu từ khóa cho bài này

**Nhóm B — High bounce** (View cao nhưng Bounce rate > 70% hoặc thời gian < 30 giây)
- Người vào rồi thoát ngay — title/intro chưa match với kỳ vọng
- Action: Cần viết lại intro, kiểm tra title có đúng search intent không

**Nhóm C — Hidden gems** (View thấp nhưng Thời gian đọc > 3 phút)
- Bài chất lượng nhưng ít người tìm thấy
- Action: SEO Agent ưu tiên cải thiện meta/title, nội dung không cần sửa

### BƯỚC 3 — Conversion (Ai có khả năng trở thành lead?)

Phân tích hành trình từ bài đọc → LeadForm:
- Bài nào thường xuất hiện trước khi user submit form?
- Bài nào có session > 3 trang (user đọc nhiều bài liên tiếp)?

Action: Content Agent ưu tiên thêm CTA / LeadForm vào các bài top performer và hidden gems.

### BƯỚC 4 — Monthly snapshot (đầu tháng)

Chạy khi có `monthly-[YYYY-MM].csv`:
- Tổng MAU tháng vừa rồi so với tháng trước
- Top 5 bài được đọc nhiều nhất trong tháng
- Kênh traffic nào tăng trưởng mạnh nhất
- 1-2 insight lớn để báo cáo với Andy (chủ dự án)

---

## Output

### File output chuẩn
```
agents/analytics-output/latest.md      ← bản mới nhất (Content + SEO Agent đọc)
agents/analytics-output/analytics-[YYYY-MM-DD].md  ← lưu lịch sử
```

### Template output

```markdown
# Analytics Report — [ngày]
**Period:** [từ ngày] → [đến ngày]

## Traffic snapshot
- Users tuần này: [X] ([+/-Y%] so với tuần trước)
- Nguồn mạnh nhất: [Organic/Direct/Social]
- Cờ đỏ: [nếu có, hoặc "Không có"]

## Top performers (đọc nhiều + ở lâu)
1. [/docs/path] — [X views] — [Y phút avg]
2. [/docs/path] — [X views] — [Y phút avg]
3. [/docs/path] — [X views] — [Y phút avg]

## Cần cải thiện (bounce cao)
- [/docs/path] — Bounce [X%] — Gợi ý: [viết lại intro / đổi title]

## Hidden gems (chất lượng, thiếu visibility)
- [/docs/path] — [Y phút avg] nhưng chỉ [X views] — Gợi ý: [SEO meta update]

## Action items tuần này
→ Content Agent: [viết bài liên quan đến topic X vì top performer]
→ SEO Agent: [update meta bài Y vì hidden gem]
→ Andy review: [nếu có insight lớn cần quyết định]
```

---

## Nguyên tắc phân tích cho Lười HR

- **Không tối ưu bài chưa có traffic** — focus vào bài đang có data thực tế
- **Avg. engagement time > 2 phút = bài tốt** — chuẩn cho content how-to dài
- **Bounce rate < 50% là lý tưởng** — Docusaurus doc site thường 55-65%, dưới 50% là xuất sắc
- **Organic search tăng = SEO Agent đang work** — track trend này mỗi tháng
- **Direct traffic tăng = brand awareness tăng** — người nhớ URL mà vào thẳng

## Liên kết với các agent khác

| Agent | Nhận từ Analytics Agent | Trả lại |
|---|---|---|
| Content Agent | Top performers, Hidden gems, Topics cần viết | Bài mới → data mới cho Analytics |
| SEO Agent | Bài nào cần ưu tiên tối ưu meta | CTR cải thiện → impressions tăng |
| Backend Agent | Bài nào dẫn leads nhiều nhất | Lead data → validation cho Analytics |
