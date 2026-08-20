# CLAUDE.md — Kiến Trúc Sư Lười HR
> Docusaurus + GitHub + Vercel · Hướng dẫn dân HR dùng AI · Semi-auto, không over-engineer.

---

## GBrain — Shared Memory [#GBRAIN]

Query GBrain TRƯỚC khi bắt đầu task quan trọng:
```
brain_query("keyword task hiện tại")
```
Lưu vào GBrain SAU khi hoàn thành design/plan/output quan trọng:
```
brain_put(slug="lhra/<topic>/<date>", content="context + output + key decisions")
```

---

## Hard Rules [#RULES]

1. **200 dòng/file component** — vượt → tách component nhỏ hơn. Reuse trước khi tạo mới.
2. **CHANGELOG.md trước khi code** — format: `[DESIGN/ARCH/CONTENT/BUSINESS] Mô tả + lý do`
3. **Không over-engineer** — không dependency mới nếu Docusaurus làm được; không backend nếu Form/Sheet đủ.
4. **Small win first** — output nhìn thấy được trong <30 phút. Không build "sẽ cần sau".
5. **Large file** — KHÔNG generate >300 lines trong 1 shot → chia Write calls, in `[DONE] section_name`.
6. **Mọi trang HTML tĩnh trong `static/` PHẢI tự gắn GA4** — Docusaurus's `gtag` preset (docusaurus.config.js) chỉ build tracking vào trang React (docs/blog/src/pages), KHÔNG chạm tới file tĩnh copy thẳng vào `static/`. Trang tool nào deploy dạng file `.html` độc lập (org-chart, kpi-demo, hr-office-sim, certificate, demos/*, hr-tools/*...) mà thiếu snippet dưới đây trong `<head>` thì GA4 mù hoàn toàn — không đo được view/bounce/time, dù navbar có link và có traffic thật. Chèn ngay sau thẻ `<title>`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-KELJV9GYP2"></script>
   <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-KELJV9GYP2',{anonymize_ip:true});</script>
   ```
   Check bắt buộc trong bước Verify của workflow deploy (#WORKFLOW bước 5): file mới trong `static/*.html` → `grep -l "G-KELJV9GYP2"` trên chính file đó, thiếu thì thêm trước khi push.

---

## Quick Path Reference [#PATHS]

> **STOP SEARCHING.** Đề cập folder/file → tra bảng TRỰC TIẾP, không Glob/Grep.

| Thứ gì | Path tuyệt đối |
|--------|----------------|
| Root | `C:/Users/Work/Downloads/luoi-hr/` |
| Blog (MDX posts) | `C:/Users/Work/Downloads/luoi-hr/blog/` |
| Docs (hướng dẫn) | `C:/Users/Work/Downloads/luoi-hr/docs/` |
| Content ideas | `C:/Users/Work/Downloads/luoi-hr/content-idea/` |
| Content ideas archive | `C:/Users/Work/Downloads/luoi-hr/content-idea/archive/` |
| Tempo (WIP drafts) | `C:/Users/Work/Downloads/luoi-hr/tempo/` |
| Agents | `C:/Users/Work/Downloads/luoi-hr/agents/` |
| Src / components | `C:/Users/Work/Downloads/luoi-hr/src/components/` |
| CHANGELOG | `C:/Users/Work/Downloads/luoi-hr/CHANGELOG.md` |
| AGENT_ARCHITECT | `C:/Users/Work/Downloads/luoi-hr/AGENT_ARCHITECT.md` |

---

## Project Structure [#STRUCTURE]

```
luoi-hr/
├── docs/        ← bài viết .md (nhap-mon/ build-tools/ skills-agent/ theo-vi-tri/)
├── src/components/
│   ├── PromptBlock/   MAX 80 dòng
│   ├── Callout/       MAX 60 dòng
│   └── LeadForm/      MAX 100 dòng
├── static/
├── CHANGELOG.md       ← luôn cập nhật trước khi code
└── docusaurus.config.js  MAX 100 dòng
```

---

## Stack [#STACK]

Docusaurus 3.x · Node.js 20.x LTS · React 18.x · Font: Be Vietnam Pro · Color: #10B981 · Deploy: Vercel free

Không upgrade tùy tiện. Form: Google Forms embed (không dùng backend).

---

## Workflow khi có yêu cầu mới [#WORKFLOW]

1. **Kiểm tra** — Docusaurus có sẵn chưa? Component nào reuse được? CSS đơn giản thay JS được không?
2. **Quyết định** — reuse > tạo mới · >200 dòng → tách ngay · dependency mới → hỏi trước
3. **Ghi CHANGELOG** — trước khi code
4. **Code** — không để TODO trong code (làm luôn hoặc ghi backlog CHANGELOG)
5. **Verify** — đếm dòng, test localhost:3000, commit rõ ràng

Khi được hỏi về design: luôn trình bày Phương án A / B (pros/cons) + Khuyến nghị. Không 1 phương án duy nhất.

---

## Component Specs [#COMPONENTS]

**PromptBlock** — dark bg #0F172A, nút "Copy Prompt" → "✓ Đã copy" (1.8s). MAX 80 dòng.
Props: `title` (string) · `code` (string) · `lang?` (string, default "text")

**Callout** — `type`: warn (yellow ⚠️) | tip (green 💡) | info (blue ℹ️). MAX 60 dòng.
Props: `type` · `title` · `children`

**LeadForm** — fields: Họ tên, Zalo/Email, Vị trí. Submit → Google Form URL (env var). MAX 100 dòng.
Sau submit: "✓ Đã gửi! Lười Chúa sẽ liên hệ sớm."

---

## SEO [#SEO]

Mọi kiểm tra SEO do **SEO Agent** → `.claude/skills/seo/SKILL.md`. Claude không tự kiểm tra SEO.
- Tạo/sửa `.md` → SEO Agent tự chạy qua PostToolUse hook
- QA → SEO Agent gọi trong mục F của qa_runner.js

---

## Preview localhost [#PREVIEW]

**BƯỚC 1 — Kill port cũ:**
```powershell
Get-NetTCPConnection -LocalPort 3000 -State Listen | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

**BƯỚC 2 — Start server:**
```bash
cd "C:/Users/Work/Downloads/luoi-hr" && npm start > /tmp/luoi-hr-npm.log 2>&1 &
```

**BƯỚC 3 — Verify (30s):**
```bash
sleep 25 && cat /tmp/luoi-hr-npm.log | tail -5
# Phải thấy: [SUCCESS] Docusaurus website is running at: http://localhost:3000/
```

**BƯỚC 4:** `start "" "http://localhost:3000/<slug-bài>"`

**YAML frontmatter** — trường có dấu `:` → bắt buộc wrap `"double quotes"`.
Sai: `description: Hướng dẫn: tạo agent` · Đúng: `description: "Hướng dẫn: tạo agent"`

---

## GBrain — Shared Memory [#GBRAIN]

| Tool | Khi nào |
|------|---------|
| `brain_query text="<subject>"` | Đầu mỗi task AgentOS |
| `brain_put` | Sau quyết định design/architecture quan trọng |
| `brain_append_timeline` | Sau mỗi task hoàn thành |

Slug: `tasks/luoi-hr/{task_id[:8]}` · `projects/luoi-hr-{topic}`

---

## AgentOS Task Protocol [#TASK]

Khi thấy `[AGENTOS TASK]` trong terminal:

1. **Đọc**: Queue ID · From · Priority · subject + body
2. **Thực thi**: workflow luoi-hr (CHANGELOG trước code, verify, commit) · không hỏi lại
3. **Lưu**: artifact vào thư mục phù hợp · ghi `CHANGELOG.md` (bắt buộc kể cả task nhỏ)
4. **Báo cáo**:

```bash
python "$AGENTOS_TOOLS_DIR/msg_send.py" --to <from_agent> --task-id <queue_id> \
  --status done --summary "<100 ký tự>" --artifact "<path>"
```

Error: `--status error --summary "Mô tả lỗi"` · `--artifact` phải là file thực sự tồn tại.
