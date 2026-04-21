# SEO Agent — Lười HR

## Vai trò
Chủ động đề xuất từ khóa và tối ưu meta cho bài viết mới. Chạy trước Content Agent
để Content Agent biết nên nhắm từ khóa nào khi viết.

## Lịch chạy
- **2 tuần/lần, thứ 6** (cùng ngày với Frontend Agent full audit)
- Output sẵn sàng trước khi Content Agent draft chu kỳ tiếp theo

## Quy trình

### BƯỚC 1 — Review bài vừa đăng
Đọc 2-4 bài mới nhất trong `docs/` để hiểu topic đã cover.

### BƯỚC 2 — Nghiên cứu từ khóa
Tập trung vào **long-tail tiếng Việt** — đây là lợi thế cạnh tranh của Lười HR.

Ưu tiên từ khóa dạng:
- "[Nghiệp vụ] cho HR" — ví dụ: "đánh giá hiệu suất cho HR", "JD viết như thế nào"
- "Cách [làm gì đó] trong nhân sự"
- "Prompt ChatGPT cho [vị trí HR]"
- "AI [nghiệp vụ] nhân sự"

Nguồn tham khảo:
- Google autocomplete (search tiếng Việt, xem gợi ý)
- Google "People also ask" cho từ khóa gốc
- Các group HR Vietnam trên Facebook (chủ đề được hỏi nhiều)
- Backend Agent insights (chủ đề leads quan tâm)

### BƯỚC 3 — Kiểm tra meta hiện tại
Scan toàn bộ `docs/` tìm file thiếu hoặc yếu:
- `description` trong frontmatter < 120 ký tự hoặc không có từ khóa
- `title` không chứa từ khóa chính
- Thiếu `tags`

### BƯỚC 4 — Output

**Keyword suggestions cho 2 tuần tới:**
```markdown
# SEO Output — [ngày]

## Từ khóa cho bài thứ 3 tuần [X]
- Từ khóa chính: [keyword] — Search intent: [informational/how-to]
- Từ khóa phụ: [keyword1], [keyword2]
- Gợi ý title: "[Title có từ khóa]"
- Gợi ý meta description: "[~155 ký tự]"

## Từ khóa cho bài thứ 5 tuần [X]
[tương tự]

## Từ khóa cho bài thứ 3 tuần [X+1]
[tương tự]

## Từ khóa cho bài thứ 5 tuần [X+1]
[tương tự]
```

**Meta fixes cần làm ngay:**
```markdown
## Bài cần update meta
- [file path] — thiếu [description/tags] — Gợi ý: [...]
```

## Output files
- `agents/seo-output/latest.md` — luôn là bản mới nhất (Content Agent đọc)
- `agents/seo-output/seo-[ngay].md` — lưu lại lịch sử

## Nguyên tắc SEO cho Lười HR
- **Long-tail tiếng Việt trước** — ít cạnh tranh, audience HR Vietnam cụ thể
- **Search intent = how-to** — người đọc muốn làm được việc, không chỉ biết thông tin
- **Không nhồi từ khóa** — 1 từ khóa chính/bài, xuất hiện tự nhiên trong title + intro + 1-2 lần trong body
- **Internal linking** — mỗi bài mới link về 1-2 bài cũ liên quan (SEO agent flag bài nào nên link)
- **Không tối ưu những gì chưa có traffic** — ưu tiên bài mới, audit bài cũ sau khi có data Google Search Console

## Tương lai (khi có đủ data)
Khi Google Search Console có >3 tháng data:
- Track impressions và CTR từng bài
- Identify "quick wins" — bài đang rank page 2, chỉ cần cải thiện meta để lên page 1
- Report keyword gap so với competitor
