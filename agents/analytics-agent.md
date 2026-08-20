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

### AUTO WORKFLOW (khuyến nghị) — Không cần export CSV thủ công

**Setup 1 lần duy nhất:**

**Bước 1 — Lấy GA4 Property ID**
- GA4 → Admin → Property Settings → copy **Property ID** (số như `123456789`)
- Điền vào `agents/backend-data/config.txt` → dòng `GA4_PROPERTY_ID=`

**Bước 2 — Cấp quyền cho Service Account**
- GA4 → Admin → Property Access Management → Add users
- Nhập email của service account (xem trong file `google-credentials.json`, trường `client_email`)
- Chọn role: **Viewer**

**Bước 3 — Cài thư viện**
```bash
pip install google-analytics-data
```

**Bước 4 — Chạy scheduler (1 lần)**
```powershell
# Mở PowerShell as Administrator
cd "C:\Users\Work\Downloads\luoi-hr\agents\scripts"
.\setup-schedule.ps1
```

Sau đó Analytics Agent tự chạy mỗi thứ Hai 8:00 sáng.
Report lưu tại: `agents/analytics-output/latest.md`

**Test ngay (không đợi thứ 2):**
```powershell
python "C:\Users\Work\Downloads\luoi-hr\agents\scripts\fetch-ga4.py"
```

---

### MANUAL WORKFLOW (backup) — Export CSV thủ công

Dùng khi API bị lỗi hoặc muốn kiểm tra cross-check:

**Export 1: Traffic Overview**
- GA4 → Reports → Acquisition → Traffic acquisition
- Date range: 7 ngày vừa rồi + so sánh 7 ngày trước đó
- Export → Download CSV → đặt tên `traffic-[YYYY-MM-DD].csv`
- Đặt vào `agents/analytics-data/`

**Export 2: Top Pages**
- GA4 → Reports → Engagement → Pages and screens
- Export → Download CSV → đặt tên `pages-[YYYY-MM-DD].csv`
- Đặt vào `agents/analytics-data/`

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

## ⚠️ Blind spot đã biết — Static HTML tools không tự có GA4

Preset `gtag` trong `docusaurus.config.js` chỉ build tracking vào trang React (docs/blog/src/pages).
File `.html` copy thẳng vào `static/` (org-chart, kpi-demo, hr-office-sim, certificate, demos/*,
hr-tools/*) **KHÔNG** đi qua build pipeline này → nếu quên tự chèn snippet gtag thì trang đó
**0 view trong GA4 mãi mãi**, dù có traffic thật (navbar link, LinkedIn share...). Phát hiện
2026-08-20 khi `static/org-chart/index.html` deploy 19/8 nhưng GA4 báo 0 view suốt.

Đã vá cho 6 file hiện có (org-chart, kpi-demo, hr-office-sim, certificate, demos/hr-ibm-dashboard,
hr-tools/hr_department, hr-tools/hr_lifecycle_simulation) ngày 2026-08-20. File tool tĩnh mới sau
này PHẢI chèn snippet này ngay sau `<title>` — xem chi tiết CLAUDE.md mục Hard Rules #6.

**Không có cách nào lấy lại số liệu GA4 đã mất trước ngày vá** — GA không hồi cứu được traffic
xảy ra trước khi tracking tag tồn tại trên trang. Nguồn thay thế duy nhất cho giai đoạn "mù":
LinkedIn tự lưu số liệu click link ở cấp bài post (Analytics riêng của từng post trên LinkedIn,
độc lập với GA) — nếu Andy có bài LinkedIn dẫn link tới trang đó, số "Click" trong đó là ước
lượng thật gần nhất cho traffic giai đoạn chưa gắn tag.

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

---

## CROSS-ANALYSIS WORKFLOW — GA × LinkedIn × Content

Chạy khi Andy export LinkedIn analytics (xlsx) và muốn thấy toàn bộ bức tranh.
Trigger: *"cross-check GA và LinkedIn"*, *"full report"*, *"insight từ tất cả kênh"*

### Nguồn dữ liệu cần đọc (theo thứ tự)

**1. GA data** — chạy script:
```powershell
python "C:\Users\Work\Downloads\luoi-hr\agents\scripts\fetch-ga4.py"
```
Output: `agents/analytics-output/latest.md`

**2. LinkedIn xlsx** — đọc bằng Python (bắt buộc set utf-8):
```python
import openpyxl, os, sys
sys.stdout.reconfigure(encoding='utf-8')
folder = 'agents/analytics-output/linkedin'
# Đọc tất cả .xlsx trong folder, extract: Post Date, Post Publish Time,
# Impressions, Members reached, Social engagements, Reactions, Comments,
# Reposts, Saves, Sends, Link engagements, Demographics (Job title, Seniority, Industry)
```

**3. LinkedIn post content** — đọc HTML trong `tempo/`:
```
tempo/*linkedin*.html
```
Tìm `<div ... contenteditable="true" ...>` — đây là text thực tế của post.
Lấy: tiêu đề/hook (dòng đầu), CTA cuối bài, có link trong post hay link trong bio/comment.

**4. Website articles** — đọc từ `docs/bi-kip/*.mdx`:
- Lấy: `title`, `description`, badge "Đọc X phút", nội dung phần đầu (500 ký tự đầu sau frontmatter)

### Mapping: Post → Website article → GA metrics

Ghép theo logic:
1. Lấy Post Date từ xlsx → xác định bài LinkedIn nào đăng ngày đó
2. Đọc nội dung post HTML tương ứng → tìm slug website được nhắc đến trong CTA
3. Tìm GA metrics cho slug đó: views, bounce rate, avg time
4. So sánh: LinkedIn reach vs website quality

**Quy tắc ghép tự động:**
- `xay-dung*linkedin.html` → `docs/bi-kip/xay-dung-tro-ly-nhan-su*`
- `claude-ai*linkedin.html` → `docs/bi-kip/claude-ai-la-gi-cho-nhan-su*`
- `lam-hr-dashboard*linkedin.html` → `docs/bi-kip/lam-hr-dashboard*`
- `thiet-ke*linkedin.html` → `docs/bi-kip/thiet-ke-he-dieu-hanh*`

### Phân tích 5 chiều

**[1] Content quality LinkedIn:**
- Hook format: Personal story / Pain point question / Generic list → Story và Pain point >> Generic list
- Có số liệu cụ thể không? (giờ tiết kiệm, % kết quả, n nhân viên...)
- CTA: link trong bio / link trong comment / link trong post body
- Câu hỏi cuối bài có không? → kích comments
- Đánh giá: Strong / Medium / Weak

**[2] Timing:**
- Chủ nhật/Thứ Hai sáng → tệ (reach rate thấp)
- Thứ Ba–Năm 3–5 PM → peak 2026 (Buffer data)
- Nếu ER cao mà impressions thấp → likely giờ đăng sai
- Nếu impressions cao mà ER thấp → content chưa đủ hook

**[3] Audience fit:**
- HR Services % trong demographics → càng cao càng đúng target
- Entry level % → nếu > 25% là viral spread ra ngoài core audience
- Software Engineer / IT xuất hiện → content chạm tech audience, HR audience loãng hơn

**[4] Content-Website match (bounce diagnosis):**
- Bounce < 20%: Promise của post = Delivery của bài → PERFECT MATCH
- Bounce 20–50%: Match tương đối, có thể cải thiện intro bài
- Bounce > 50%: MISMATCH — post hứa đơn giản, bài deliver phức tạp hơn (hoặc ngược lại)
- Avg time < 2 phút + bounce > 40% → viết lại 200 từ đầu của bài

**[5] Dark horses (GA vs LinkedIn gap):**
- Bài có views cao nhưng không có post LinkedIn nào promote → cần post ngay
- Bài có ER cao trên LinkedIn nhưng website không có trong GA top pages → link strategy sai (link quá xa, e.g. "link trong bio")

### Template output Cross-Analysis Report

```markdown
# Cross-Analysis Report — LinkedIn × GA × Content
**Period:** [ngày] → [ngày]  |  **Posts analyzed:** [n]

## Post Performance vs Website Quality

| Post | Date | Impressions | ER | Website slug | Views | Bounce | Avg Time | Verdict |
|------|------|-------------|-----|-------------|-------|--------|----------|---------|
| [hook đầu 5 từ] | [DD/MM HH:MM] | [X] | [X%] | [slug] | [X] | [X%] | [X phút] | ✅/⚠️/❌ |

## Content Formula Ranking (bài này)
1. [Loại hook] — [kết quả] → [Verdict]
2. ...

## Timing Diagnosis
- [Post X]: đăng [giờ] → [nhận xét] → nên đăng [giờ tốt hơn]

## Link Strategy Gap
- Link engagements LinkedIn: [X] | Social users GA: [Y] → [nhận xét]
- Indirect path: [mô tả path hiện tại]

## Dark Horses — Bài cần post ngay
- [slug]: [X views] chưa có LinkedIn post → ước tính reach nếu post: [dựa trên avg post của Andy]

## Audience Mismatch (nếu có)
- Post [X]: HR Services [%] → [nhận xét về audience quality]

## Action Items
→ Content Agent: [...]
→ SEO Agent: [...]
→ Andy: [...]
```

### Nguyên tắc cross-analysis

- **Viral ≠ Tốt cho business**: Impressions cao mà bounce > 50% là lãng phí traffic
- **Nhỏ nhưng đúng người**: 165 views, 9% bounce tốt hơn 912 views, 50% bounce cho mục tiêu leads
- **Link trong bio = Direct traffic trong GA**: Social users thực tế cao hơn số LinkedIn "Link engagements" rất nhiều
- **So sánh reading time badge vs avg time on page**: Badge nói "8 phút" nhưng avg time chỉ 1.9 phút → người đọc chưa đọc xong → cần hook mạnh hơn ở phần đầu bài
- **Lưu report vào**: `agents/analytics-output/cross-analysis-[YYYY-MM-DD].md`
