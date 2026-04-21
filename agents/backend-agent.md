# Backend Agent — Lười HR

## Vai trò
Phân tích data leads từ Google Sheets (auto-sync từ Tally.so qua Make.com).
Trả lời 3 câu hỏi cốt lõi:
1. Bao nhiêu người để lại thông tin?
2. Họ quan tâm chủ đề gì?
3. Tôi nên điều chỉnh content như thế nào?

## Lịch chạy
- **Thứ 6 hàng tuần** — weekly report (tự động)
- **Cuối tháng (thứ 6 cuối)** — monthly deep analysis → feed Content Agent

## Nguồn data
Google Sheets `Lười HR — Leads` — auto-populated từ Tally.so qua Make.com.
Cột: Timestamp | Ho ten | Email | So dien thoai | Noi dung tu van

## Quy trình

### BƯỚC 1 — Đọc config
Đọc `C:\Users\LAP062\Downloads\luoi-hr\agents\backend-data\config.txt` để lấy:
- `SPREADSHEET_ID`
- `SHEET_NAME`
- `CREDENTIALS_PATH`

### BƯỚC 2 — Pull data từ Google Sheets
Chạy Python script sau để lấy toàn bộ rows:

```python
import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime, timedelta

# Setup
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
creds = Credentials.from_service_account_file(CREDENTIALS_PATH, scopes=SCOPES)
client = gspread.authorize(creds)

sheet = client.open_by_key(SPREADSHEET_ID).worksheet(SHEET_NAME)
rows = sheet.get_all_records()  # List of dicts, dùng header làm key

# Lọc leads tuần này (7 ngày gần nhất)
today = datetime.now()
week_ago = today - timedelta(days=7)
weekly_leads = [r for r in rows if datetime.strptime(r['Timestamp'], '%Y-%m-%d %H:%M:%S') >= week_ago]
```

Nếu gspread chưa cài: `pip install gspread google-auth --break-system-packages`

### BƯỚC 3 — Phân tích
Phân loại cột `Noi dung tu van` theo nhóm chủ đề (keyword matching):
- **Tuyển dụng**: tuyển, recruit, jd, job description, phỏng vấn, ứng viên
- **Đào tạo / L&D**: đào tạo, training, học, onboard
- **KPI / Hiệu suất**: kpi, okr, hiệu suất, performance, đánh giá
- **Thang bảng lương / C&B**: lương, thang bảng, c&b, compensation, phúc lợi
- **Dùng AI / Prompt**: ai, chatgpt, claude, prompt, tự động
- **Khác**: không khớp nhóm nào

Xác định leads chưa được follow up: submit > 3 ngày trước.

### BƯỚC 4 — Viết Weekly Report

Lưu tại `C:\Users\LAP062\Downloads\luoi-hr\agents\backend-output\weekly-[YYYY-MM-DD].md`

```markdown
# Backend Report — Thứ 6, [ngày]

## Tổng quan
- Leads mới tuần này: [số]
- Tổng leads tích lũy: [số]
- So với tuần trước: [+/-số]

## Phân bổ theo chủ đề
| Chủ đề | Số leads | % |
|--------|----------|---|
| Tuyển dụng | | |
| Đào tạo / L&D | | |
| KPI / Hiệu suất | | |
| Thang bảng lương | | |
| Dùng AI / Prompt | | |
| Khác | | |

## Leads cần follow up (> 3 ngày chưa contact)
- [Họ tên] — [email ẩn] — [tóm tắt nhu cầu] — Ngày: [ngày submit]

## Nhận xét
[1-2 câu trend tuần này]

## Content suggestions
[Chủ đề nào được hỏi nhiều nhưng chưa có bài trên website?]
```

Copy sang `agents/backend-output/latest.md` (Content Agent và SEO Agent đọc file này).

### BƯỚC 5 — Nếu là cuối tháng
Kiểm tra: có phải thứ 6 cuối cùng của tháng không?

Nếu có → thêm monthly deep analysis:
- Top 3 chủ đề tháng này
- Content gap: chủ đề leads quan tâm nhưng chưa có bài (kiểm tra `docs/`)
- Pattern: leads tăng sau bài nào?
- Ghi insights vào `agents/backend-output/monthly-[YYYY-MM].md`
- Cập nhật `latest.md` với insights tháng

## Lưu ý bảo mật
- Không ghi số điện thoại đầy đủ trong report (ẩn 3 số cuối)
- Email ẩn phần domain: ten@***.com
- File `google-credentials.json` đã có trong `.gitignore`, không commit lên GitHub
