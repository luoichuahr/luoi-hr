# SKILL — Tạo & Quản Lý Website Lười HR

## Khi nào dùng skill này
- Khi cần setup Docusaurus từ đầu trên máy mới
- Khi cần thêm bài viết mới vào website
- Khi cần tạo component mới (PromptBlock, Callout, LeadForm)
- Khi cần sửa giao diện, màu sắc, font
- Khi cần debug lỗi build/deploy

## Files quan trọng cần đọc trước

Trước khi làm bất cứ việc gì, đọc theo thứ tự:
1. `CHANGELOG.md` — hiểu các quyết định đã được đưa ra
2. `AGENT_ARCHITECT.md` — đọc toàn bộ system prompt và nguyên tắc
3. File cần sửa/tạo (nếu có)

---

## WORKFLOW A — Setup dự án từ đầu (làm 1 lần)

⏱️ **Tổng thời gian: ~10 phút setup + 1 phút push + 2 phút deploy = 13 phút từ zero đến live!**

---

### 🎯 Bước 1: Cài Node.js & Git

**Kiểm tra đã cài chưa:**
```bash
node -v        # Cần >= 18.x
git --version  # Cần >= 2.x
```

**Nếu chưa có — tải về cài:**
- **Node.js:** https://nodejs.org — chọn bản **LTS** (bên trái)
- **Git:** https://git-scm.com — tải về cài mặc định

> Sau cài xong, **mở terminal mới** và chạy lại `node -v` + `git --version` để confirm

---

### 🎯 Bước 2: Tạo Docusaurus project

Mở terminal, chọn thư mục bạn muốn lưu project (ví dụ Desktop), rồi chạy:

```bash
cd Desktop
npx create-docusaurus@latest luoi-hr classic
cd luoi-hr
```

#### ❓ Terminal hỏi: "Use TypeScript?"
**👉 Chọn: NO (JavaScript)**

**Vì sao?**
- Lười HR là documentation website, không phải complex app
- JavaScript đơn giản hơn, setup nhanh hơn
- Đủ dùng cho dự án này, không cần type-safety

| Chọn | JavaScript | TypeScript |
|------|-----------|-----------|
| **Setup** | Ngay lập tức, không compile | Cần compile .ts → .js |
| **Độ phức tạp** | Đơn giản | Phức tạp hơn |
| **Khi nào dùng** | ✅ Lười HR (website đơn giản) | ❌ Complex app |

#### ✅ Kiểm tra Docusaurus chạy được:
```bash
npm start
```

Trình duyệt sẽ tự mở `http://localhost:3000` — đây là website của bạn chạy trên máy (chưa ai xem được). Bước tiếp theo sẽ đưa nó lên internet.

---

### 🎯 Bước 3: Đẩy lên GitHub — Setup Git + Push

#### 3.1: Setup Git Config (BẮT BUỘC làm 1 lần)

**Nói cho Git biết tên + email của bạn:**

```bash
git config --global user.name "Tên của bạn"
git config --global user.email "email@example.com"
```

Ví dụ:
```bash
git config --global user.name "Tran An Duc"
git config --global user.email "anhductran@gmail.com"
```

> 💡 Làm 1 lần duy nhất. Lần sau Git sẽ tự ghi nhớ.

---

#### 3.2: Tạo repo trên GitHub

1. Truy cập: https://github.com/new
2. Điền:
   - **Repository name:** `luoi-hr`
   - **Description:** `AI cho dân nhân sự — lười mà hiệu quả`
   - **Public** (để mọi người có thể xem)
3. Click **"Create repository"**

GitHub sẽ cho bạn các lệnh. **Đừng copy lệnh của GitHub** — hãy làm theo dưới đây (chi tiết hơn):

---

#### 3.3: Push code từ máy lên GitHub

**Dừng `npm start`** (Ctrl + C), rồi chạy:

```bash
git init
git add .
git commit -m "init: thiết lập dự án Lười HR"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/luoi-hr.git
git push -u origin main
```

**Thay `YOUR_USERNAME` bằng username GitHub của bạn**, ví dụ:
```bash
git remote add origin https://github.com/luoichuahr/luoi-hr.git
```

#### ⚠️ Nếu lỗi từng bước:

| Lỗi | Nguyên nhân | Fix |
|-----|------------|-----|
| **"Author identity unknown"** | Git chưa biết tên/email | Làm lại 3.1 (`git config --global user.name` + `user.email`) |
| **"remote origin already exists"** | URL đã được liên kết rồi | `git remote remove origin` → rồi `git remote add origin` lại |
| **"LF will be replaced by CRLF"** (warning) | Git xử lý line break khác nhau | Không cần lo — Git tự xử lý |
| **"fatal: not a git repository"** | Chưa chạy `git init` | Chạy `git init` lại |

#### ✅ Thành công khi thấy:
```
To https://github.com/luoichuahr/luoi-hr.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

---

### 🎯 Bước 4: Kết nối Vercel — Website live trong 2 phút!

1. Truy cập: https://vercel.com
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. **Paste GitHub URL:**
   ```
   https://github.com/YOUR_USERNAME/luoi-hr.git
   ```
5. Vercel tự nhận ra Docusaurus → Click **"Deploy"**
6. Chờ ~1-2 phút → Website live tại:
   ```
   luoi-hr.vercel.app
   ```

#### ✅ Setup xong rồi!

**Từ đây, mỗi khi bạn push code mới lên GitHub, Vercel tự động build và deploy lại.**

---

## WORKFLOW B — Thêm bài viết mới

Sau khi setup xong, workflow của bạn rất đơn giản:

1. **Đưa nội dung bài mới cho Claude Cowork**
2. **Claude tạo file .md + commit**
3. **Bạn mở terminal → `git push` (1 lần, ~3 giây)**
4. **Vercel tự detect push → build & deploy → Bài live trong ~1 phút**

> ⚠️ **Tại sao Claude không tự push?**
> Claude chạy trong sandbox Linux, không có quyền truy cập vào GitHub credentials
> đang lưu trên máy Windows của bạn (Git Credential Manager). Bước push phải làm
> từ terminal trên máy bạn. Không cần nhập username/password — Git tự lấy từ
> Windows Credential Manager. Chỉ cần gõ `git push` là xong.

### Template bài viết chuẩn
```markdown
---
sidebar_position: 1
title: [Tên bài ngắn gọn]
description: [Mô tả 1 dòng — hiện trên preview/SEO]
tags: [claude, gemini, recruiter]
---

import PromptBlock from '@site/src/components/PromptBlock';
import Callout from '@site/src/components/Callout';

# [Tiêu đề đầy đủ của bài]

> **⚡ Newbie thân thiện · X phút đọc · [Tool: Claude/Gemini]**

[Câu dẫn 1-2 dòng — vấn đề bài này giải quyết]

## Bước 1 — [Tên bước]

[Mô tả ngắn, đủ để làm, không thừa]

<PromptBlock
  title="Prompt — copy & dùng ngay"
  code={`[Nội dung prompt đầy đủ ở đây
Dùng backtick template string để giữ xuống dòng]`}
/>

<Callout type="warn" title="Lưu ý chống ngáo">
[Lỗi phổ biến nhất người dùng hay gặp — viết ngắn, thẳng]
</Callout>

## Bước 2 — [Tên bước]

[Tiếp tục...]

---

## Làm được rồi? Còn muốn đi tiếp không?

[LeadForm hoặc link Zalo ở đây]
```

### Lệnh sau khi tạo file xong

**Claude tự làm:**
```bash
git add docs/[thu-muc]/[ten-bai].md
git commit -m "content: thêm bài [tên bài ngắn]"
# Claude commit xong, báo bạn push
```

**Bạn mở terminal Windows, gõ 1 lệnh:**
```bash
git push
# Không cần nhập gì thêm — Git tự dùng credentials đã lưu
# Vercel tự deploy trong ~1 phút sau khi push xong
```

---

## WORKFLOW C — Sửa giao diện / component

### Quy tắc bắt buộc
1. Đọc AGENT_ARCHITECT.md trước
2. Kiểm tra số dòng hiện tại: `wc -l src/components/[Component]/index.jsx`
3. Nếu sắp vượt 200 dòng → tách component trước khi sửa
4. Ghi vào CHANGELOG.md sau khi sửa xong

### Sửa màu / font
- Chỉ sửa trong `src/css/custom.css` — không hardcode màu trong component
- Biến CSS của Docusaurus: `--ifm-color-primary`, `--ifm-font-family-base`

### Test trước khi push
```bash
npm start          # Chạy local, kiểm tra trực quan
npm run build      # Kiểm tra build không lỗi
```

---

## WORKFLOW D — Debug lỗi thường gặp

| Lỗi | Nguyên nhân | Fix |
|-----|-------------|-----|
| `Module not found` | Import sai đường dẫn | Kiểm tra `@site/src/components/...` |
| Sidebar không hiện bài mới | Thiếu `sidebar_position` trong frontmatter | Thêm vào đầu file .md |
| Build lỗi trên Vercel | Node version khác | Thêm `.nvmrc` với nội dung `20` |
| Font không load | Google Fonts bị block | Dùng `@fontsource/be-vietnam-pro` thay thế |
| Component không render | Quên import ở đầu file .md | Thêm `import` sau frontmatter |

---

## Checklist trước khi push bài mới

- [ ] Frontmatter đủ: title, sidebar_position, description, tags
- [ ] Có ít nhất 1 PromptBlock với nội dung thật
- [ ] Có ít nhất 1 Callout (warn hoặc tip)
- [ ] Đọc lại bài — người không biết code có làm được không?
- [ ] Commit message rõ ràng: `content: thêm bài [tên]`
- [ ] Ghi CHANGELOG nếu có thay đổi cấu trúc/component

---

## WORKFLOW E — Pre-push review (chạy trước mọi git push)

> Hook QA Agent trong `.claude/settings.json` tự động chặn nếu phát hiện vấn đề nghiêm trọng.
> Workflow này là bước review thủ công bổ sung — đọc nhanh trước khi bấm push.

### Bước 1 — Xem những gì sắp push

```bash
git diff --name-only HEAD       # danh sách file đã thay đổi
git diff --stat HEAD            # tóm tắt số dòng thêm/bớt
git log --oneline origin/main..HEAD   # các commit chưa push
```

### Bước 2 — Checklist review (Claude đọc và confirm từng mục)

**Nội dung:**
- [ ] CHANGELOG.md đã được cập nhật cho mọi thay đổi trong lần push này
- [ ] Không có file `.env`, secret key, token nào bị include

**Code:**
- [ ] Mọi component chỉnh sửa vẫn trong giới hạn dòng (PromptBlock ≤80, Callout ≤60, LeadForm ≤100, khác ≤200)
- [ ] Không import dependency mới chưa được Andy approve

**Build:**
```bash
npm run build    # phải pass trước khi push
```

**Nếu có bài viết mới:**
- [ ] Frontmatter đầy đủ: `title`, `description`, `sidebar_position`, `tags`
- [ ] `description` có từ khóa chính, dài 120–155 ký tự
- [ ] Có ít nhất 1 `PromptBlock` với prompt thực tế
- [ ] Đọc lại — người HR không biết code có tự làm được không?

### Bước 3 — Cập nhật checkpoint rồi mới push

Sau khi mọi mục xanh hết, ghi vào `.session/checkpoint.json`:
```json
{
  "status": "done",
  "last_agent": "manual-review",
  "last_task": "[mô tả ngắn việc vừa làm]",
  "note": "đã push lên main",
  "updated_at": "[ngày hôm nay]"
}
```

Rồi mới chạy:
```bash
git push
```

> Hook QA Agent sẽ tự động chạy lần cuối khi bạn gõ `git push` — nếu có gì bất thường nó sẽ chặn lại.
