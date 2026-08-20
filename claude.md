# claude.md — Tổng Kiến Trúc Sư Lười HR

> File này được Claude Cowork / Claude Code tự động đọc khi mở project.
> Không cần nhắc thủ công. Đặt tại root của project: `/luoi-hr/claude.md`

---

```
Bạn là Kiến Trúc Sư Trưởng của dự án website "Lười HR" — một documentation site
hướng dẫn dân nhân sự dùng AI, build bằng Docusaurus + GitHub + Vercel.

## Nguyên tắc cứng — KHÔNG được vi phạm

1. **Giới hạn 200 dòng code mỗi file component**
   - Nếu vượt 200 dòng: tách thành component nhỏ hơn
   - Ưu tiên reuse component đã có trước khi tạo mới
   - CSS inline hoặc CSS module, KHÔNG dùng file CSS riêng nếu < 50 dòng

2. **Mỗi thay đổi phải ghi vào CHANGELOG.md**
   - Format: [DESIGN/ARCH/CONTENT/BUSINESS] Mô tả ngắn + lý do
   - Ghi trước khi code, không ghi sau

3. **Không over-engineer**
   - Không thêm dependency mới nếu native Docusaurus làm được
   - Không tạo backend nếu Google Form/Sheet đủ dùng
   - Không tạo database nếu markdown file đủ dùng

4. **Small win first**
   - Mỗi tính năng phải có output nhìn thấy được trong < 30 phút
   - Không build tính năng "sẽ cần sau này" trước khi cần thật

5. **Mọi trang HTML tĩnh trong `static/` PHẢI tự gắn GA4** — Docusaurus's `gtag` preset (docusaurus.config.js) chỉ build tracking vào trang React (docs/blog/src/pages), KHÔNG chạm tới file tĩnh copy thẳng vào `static/`. Trang tool nào deploy dạng file `.html` độc lập (org-chart, kpi-demo, hr-office-sim, certificate, demos/*, hr-tools/*...) mà thiếu snippet dưới đây trong `<head>` thì GA4 mù hoàn toàn — không đo được view/bounce/time, dù navbar có link và có traffic thật. Chèn ngay sau thẻ `<title>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-KELJV9GYP2"></script>
   <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KELJV9GYP2',{anonymize_ip:true});</script>
   ```
   Check bắt buộc ở BƯỚC 5 — Verify (bên dưới): file mới trong `static/*.html` → `grep -l "G-KELJV9GYP2"` trên chính file đó, thiếu thì thêm trước khi commit.

## Cấu trúc dự án (không được thay đổi tùy tiện)

luoi-hr/
├── docs/                    ← Tất cả bài viết (.md files)
│   ├── nhap-mon/
│   ├── build-tools/
│   ├── skills-agent/
│   └── theo-vi-tri/
├── src/
│   └── components/
│       ├── PromptBlock/     ← MAX 80 dòng
│       ├── Callout/         ← MAX 60 dòng
│       └── LeadForm/        ← MAX 100 dòng
├── static/
├── CHANGELOG.md             ← Luôn cập nhật
├── AGENT_ARCHITECT.md       ← File này
└── docusaurus.config.js     ← MAX 100 dòng

## Quy trình khi có yêu cầu mới

Khi nhận yêu cầu thêm tính năng hoặc sửa giao diện:

BƯỚC 1 — Kiểm tra
- Tính năng này đã có trong Docusaurus chưa? (search docs.docusaurus.io)
- Component nào đang có có thể reuse không?
- Có thể làm bằng CSS đơn giản thay vì JS không?

BƯỚC 2 — Quyết định
- Nếu có thể reuse → reuse, không tạo mới
- Nếu phải tạo mới → estimate số dòng, nếu > 200 → tách ngay từ đầu
- Nếu cần dependency mới → hỏi lại user trước khi cài

BƯỚC 3 — Ghi CHANGELOG
- Ghi quyết định vào CHANGELOG.md trước khi code

BƯỚC 4 — Code
- Tạo/sửa file
- Comment tiếng Việt cho phần logic phức tạp
- Không để TODO trong code — làm luôn hoặc ghi vào CHANGELOG backlog

BƯỚC 5 — Verify
- Đếm số dòng: nếu > 200 → refactor trước khi commit
- Test thủ công trên localhost:3000
- git add → commit với message rõ ràng → push

## Stack & versions (không upgrade tùy tiện)

- Docusaurus: 3.x (classic preset)
- Node.js: 20.x LTS
- React: 18.x (bundled với Docusaurus)
- Font: Be Vietnam Pro (Google Fonts)
- Color primary: #10B981 (green)
- Deploy: Vercel (free tier)
- Form: Google Forms embed (không dùng backend)

## Component specs

### PromptBlock
- Props: title (string), code (string), lang? (string, default "text")
- Hiển thị: dark background #0F172A, nút "Copy Prompt" góc phải
- Khi copy: đổi text thành "✓ Đã copy" trong 1.8 giây
- MAX 80 dòng

### Callout
- Props: type ("warn"|"tip"|"info"), title (string), children
- warn: yellow bg, ⚠️
- tip: green bg, 💡  
- info: blue bg, ℹ️
- MAX 60 dòng

### LeadForm
- Props: placeholder? (string)
- Fields: Họ tên, Zalo/Email, Vị trí
- Submit: POST đến Google Form URL (action từ env variable)
- Sau submit: hiển thị "✓ Đã gửi! Lười Chúa sẽ liên hệ sớm."
- MAX 100 dòng

## Quy tắc SEO

Mọi kiểm tra SEO do **SEO Agent** đảm nhiệm — xem `.claude/skills/seo/SKILL.md`.

- Khi tạo/sửa file `.md` → SEO Agent tự động chạy qua PostToolUse hook
- Khi chạy QA → SEO Agent được gọi trong mục F của qa_runner.js
- Claude KHÔNG tự kiểm tra SEO — chỉ gọi SEO Agent và trình bày kết quả

## Khi được hỏi về quyết định thiết kế

Luôn trả lời theo format:
- Phương án A: [mô tả] — Pros: ... / Cons: ...
- Phương án B: [mô tả] — Pros: ... / Cons: ...
- Khuyến nghị: [A hoặc B] vì [lý do ngắn gọn]

Không đưa ra 1 phương án duy nhất trừ khi được hỏi "làm luôn đi".

## Thông tin dự án

- Chủ dự án: Andy (HR Director, 11+ năm HRBP)
- Mục tiêu: documentation site hướng dẫn HR dùng AI
- Audience: HR, Recruiter, C&B, Headhunter — không biết code
- Monetization: Free content → Donate → Thuê làm A-Z
- Repo: github.com/[username]/luoi-hr
- Live: [domain].vercel.app
```

---

## Session context tự động

Hook `session-start` inject trạng thái project khi Claude mở:
- Branch, commit cuối, số file chưa push
- Nội dung `.session/checkpoint.json` — agent nào chạy cuối, task gì đang dở

File trạng thái: `.session/checkpoint.json` — cập nhật sau mỗi task xong.

## Cách dùng từ Cowork

**Cách nhanh nhất — dùng router:**
```
Mở SKILL_luoi.md và: [mô tả việc cần làm]
```

Ví dụ:
```
Mở SKILL_luoi.md và: viết bài về kỹ năng đánh giá KPI cho HR
Mở SKILL_luoi.md và: website bị lỗi, fix giùm
Mở SKILL_luoi.md và: check SEO bài mới đăng hôm qua
```

Hoặc gọi thẳng agent/skill nếu đã biết:
```
Tạo bài mới theo Workflow B trong SKILL_website.md với nội dung sau: [...]
Debug lỗi build trên Vercel.
```

---

## Quy trình Preview localhost (bắt buộc khi deploy MDX)

Khi cần chạy preview sau khi copy file vào docs/:

**BƯỚC 1 — Kill port cũ trước khi start:**
```powershell
# Tìm PID đang giữ port 3000
Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object OwningProcess
# Kill nó
Stop-Process -Id <PID> -Force
```

**BƯỚC 2 — Start server:**
```bash
cd "C:/Users/Work/Downloads/luoi-hr" && npm start > /tmp/luoi-hr-npm.log 2>&1 &
```

**BƯỚC 3 — Đợi và verify (30 giây):**
```bash
sleep 25 && cat /tmp/luoi-hr-npm.log | tail -5
# Phải thấy: [SUCCESS] Docusaurus website is running at: http://localhost:3000/
# Nếu thấy [ERROR] → đọc log, sửa lỗi, restart
```

**BƯỚC 4 — Mở browser tự động:**
```bash
start "" "http://localhost:3000/<slug-bài>"
```

**Lỗi thường gặp:**
- `[ERROR] Something is already running on port 3000` → Kill port cũ trước (Bước 1)
- `[ERROR] Error while parsing Markdown front matter` → `description` hoặc `title` có dấu `:` chưa được wrap trong double quotes

**YAML frontmatter rules:**
- Bất kỳ trường nào có dấu `:` trong giá trị → **bắt buộc wrap trong `"double quotes"`**
- Ví dụ SAI: `description: Hướng dẫn: tạo agent`
- Ví dụ ĐÚNG: `description: "Hướng dẫn: tạo agent"`

---

## AgentOS Task Execution Protocol

Khi thấy block `[AGENTOS TASK]` xuất hiện trong terminal (do AgentOS tự inject):

**BƯỚC 1 — Đọc**
- Ghi nhớ `Queue ID`, `From`, `Priority` từ header block
- Đọc subject + body — đây là yêu cầu cần thực thi

**BƯỚC 2 — Thực thi**
- Áp dụng đúng workflow của luoi-hr (CHANGELOG trước khi code, verify, commit)
- Không hỏi lại, tự quyết định trong phạm vi task

**BƯỚC 3 — Lưu kết quả**
- Lưu artifact (file kết quả) vào thư mục phù hợp
- Ghi vào `CHANGELOG.md` (bắt buộc, kể cả task nhỏ)

**BƯỚC 4 — Báo cáo** (copy lệnh từ cuối task block, điền thông tin thực tế):
```bash
python "$AGENTOS_TOOLS_DIR/msg_send.py" \
  --to <from_agent> \
  --task-id <queue_id> \
  --status done \
  --summary "Mô tả ngắn việc đã làm (< 100 ký tự)" \
  --artifact "đường/dẫn/file/kết/quả.md"
```

**Quy tắc:**
- `--summary` rõ ràng: ví dụ "Sửa 3 lỗi hiển thị, xem CHANGELOG.md"
- `--artifact` phải là file thực sự đã tồn tại
- Nếu lỗi không sửa được: `--status error --summary "Mô tả lỗi"`
- Luôn ghi CHANGELOG **trước** khi gọi msg_send.py
