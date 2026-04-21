# Setup Guide: Tally → Make.com → Google Sheets → Backend Agent

Làm 1 lần, sau đó mọi thứ chạy tự động.
Tổng thời gian: ~25 phút.

---

## PHẦN 1 — Tạo Google Sheet (5 phút)

1. Vào [Google Sheets](https://sheets.google.com) → tạo spreadsheet mới
2. Đặt tên: `Lười HR — Leads`
3. Tạo header ở hàng 1 với các cột sau (đúng thứ tự):

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Ho ten | Email | So dien thoai | Noi dung tu van |

4. **Lưu lại Spreadsheet ID** — lấy từ URL:
   `https://docs.google.com/spreadsheets/d/**[SPREADSHEET_ID]**/edit`
   Ghi vào file này: `SPREADSHEET_ID = ____________________`

---

## PHẦN 2 — Tạo Google Service Account (10 phút)

Service account cho phép Backend Agent đọc sheet tự động, không cần login.

1. Vào [Google Cloud Console](https://console.cloud.google.com)
2. Tạo project mới: đặt tên `luoi-hr-backend`
3. Vào **APIs & Services → Enable APIs** → bật **Google Sheets API**
4. Vào **APIs & Services → Credentials → Create Credentials → Service Account**
   - Name: `luoi-hr-reader`
   - Role: `Viewer`
5. Sau khi tạo xong → click vào service account → tab **Keys → Add Key → JSON**
6. Download file JSON → lưu tại:
   `C:\Users\LAP062\Downloads\luoi-hr\agents\backend-data\google-credentials.json`

   ⚠️ **Quan trọng:** File này chứa thông tin nhạy cảm.
   Thêm dòng sau vào `.gitignore` của project:
   ```
   agents/backend-data/google-credentials.json
   ```

7. **Share Google Sheet với service account:**
   - Mở file JSON vừa download, tìm dòng `"client_email"`: `luoi-hr-reader@....iam.gserviceaccount.com`
   - Vào Google Sheet → Share → paste email đó → chọn **Viewer**

---

## PHẦN 3 — Setup Make.com Scenario (10 phút)

1. Tạo tài khoản tại [make.com](https://make.com) (free)
2. **Create a new scenario**
3. **Module 1 — Trigger: Tally**
   - Chọn app: `Tally`
   - Trigger: `Watch Responses`
   - Connect Tally account → chọn form `WOpZke` (form Lười HR)
4. **Module 2 — Action: Google Sheets**
   - Chọn app: `Google Sheets`
   - Action: `Add a Row`
   - Connect Google account
   - Spreadsheet: `Lười HR — Leads`
   - Sheet: `Sheet1`
   - Map các fields:
     | Sheet Column | Tally Field |
     |---|---|
     | Timestamp | `Submission time` |
     | Ho ten | `Ho ten` |
     | Email | `Email` |
     | So dien thoai | `So dien thoai` |
     | Noi dung tu van | `Noi dung can tu van` |
5. **Scheduling:** Set `Immediately` (real-time) hoặc `Every 15 minutes`
6. **Turn ON** scenario

Test bằng cách submit thử form trên website → kiểm tra Google Sheet có row mới không.

---

## PHẦN 4 — Lưu config cho Backend Agent

Tạo file `C:\Users\LAP062\Downloads\luoi-hr\agents\backend-data\config.txt`:
```
SPREADSHEET_ID=[paste ID từ bước 1.4]
SHEET_NAME=Sheet1
CREDENTIALS_PATH=C:\Users\LAP062\Downloads\luoi-hr\agents\backend-data\google-credentials.json
```

---

## Checklist hoàn thành

- [ ] Google Sheet tạo xong, có header đúng cột
- [ ] Service account tạo xong, file JSON đã lưu
- [ ] `.gitignore` đã thêm `agents/backend-data/google-credentials.json`
- [ ] Google Sheet đã share với email service account
- [ ] Make.com scenario đang ON
- [ ] Test submit form → row xuất hiện trong Sheet
- [ ] `config.txt` đã điền đủ thông tin

Sau khi tick hết checklist → Backend Agent sẽ tự đọc Sheet mỗi thứ 6 mà không cần làm gì thêm.
