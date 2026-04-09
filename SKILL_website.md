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

### Bước 1: Kiểm tra & cài môi trường

**Kiểm tra đã cài chưa:**
```bash
node -v        # Cần >= 18.x
git --version  # Cần >= 2.x
```

**Nếu chưa có — tải về cài:**
- **Node.js:** https://nodejs.org — chọn bản **LTS** (bên trái)
- **Git:** https://git-scm.com — tải về cài mặc định

> Sau cài xong, mở terminal mới và chạy lại `node -v` + `git --version` để confirm

### Bước 2: Tạo Docusaurus project
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
- Nếu sau này cần TypeScript, có thể nâng cấp (khó nhưng possible)

| Chọn | JavaScript | TypeScript |
|------|-----------|-----------|
| **Setup** | Ngay lập tức, không compile | Cần compile .ts → .js |
| **Độ phức tạp** | Đơn giản | Phức tạp hơn |
| **Khi nào dùng** | ✅ Lười HR (website đơn giản) | ❌ Complex app với nhiều logic |

**→ Khuyến nghị:** Nếu bạn không quen TypeScript, chọn **NO** để tập trung vào content!

### Bước 3: Cài font Be Vietnam Pro
Mở file `src/css/custom.css`, thêm vào đầu file:
```css
@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&display=swap');

:root {
  --ifm-font-family-base: 'Be Vietnam Pro', sans-serif;
  --ifm-color-primary: #10B981;
  --ifm-color-primary-dark: #059669;
  --ifm-color-primary-darker: #047857;
  --ifm-color-primary-darkest: #065F46;
  --ifm-color-primary-light: #34D399;
  --ifm-color-primary-lighter: #6EE7B7;
  --ifm-color-primary-lightest: #A7F3D0;
  --ifm-background-color: #F8FAFC;
  --ifm-navbar-background-color: #FFFFFF;
}
```

### Bước 4: Tạo cấu trúc thư mục bài viết
```bash
mkdir -p docs/nhap-mon
mkdir -p docs/build-tools
mkdir -p docs/skills-agent
mkdir -p docs/theo-vi-tri
mkdir -p src/components/PromptBlock
mkdir -p src/components/Callout
mkdir -p src/components/LeadForm
```

### Bước 5: Config docusaurus.config.js
Thay thế nội dung file với config chuẩn dự án:
```js
// docusaurus.config.js — MAX 100 dòng
const config = {
  title: 'Lười HR',
  tagline: 'AI cho dân nhân sự — lười mà hiệu quả',
  favicon: 'img/favicon.ico',
  url: 'https://luoi-hr.vercel.app',
  baseUrl: '/',
  organizationName: 'luoi-hr',
  projectName: 'luoi-hr',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'vi', locales: ['vi'] },
  presets: [['classic', {
    docs: {
      sidebarPath: './sidebars.js',
      routeBasePath: '/',
    },
    blog: false,
    theme: { customCss: './src/css/custom.css' },
  }]],
  themeConfig: {
    navbar: {
      title: 'Lười HR 🦥',
      items: [
        { href: 'https://zalo.me/0xxx', label: '💬 Zalo', position: 'right' },
      ],
    },
    footer: { style: 'light', copyright: 'Lười HR © 2025' },
    colorMode: { defaultMode: 'light', disableSwitch: false },
  },
};
module.exports = config;
```

### Bước 6: Tạo component PromptBlock
```bash
# Tạo file src/components/PromptBlock/index.jsx
```
Nội dung (MAX 80 dòng):
```jsx
import React, { useState } from 'react';
import styles from './styles.module.css';

export default function PromptBlock({ title = 'Prompt — copy & dùng ngay', code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <span className={styles.label}>{title}</span>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? '✓ Đã copy' : 'Copy Prompt'}
        </button>
      </div>
      <pre className={styles.code}>{code}</pre>
    </div>
  );
}
```

```css
/* src/components/PromptBlock/styles.module.css */
.block { background: #0F172A; border-radius: 10px; padding: 16px 20px; margin: 16px 0; position: relative; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.label { font-size: 11px; color: #64748B; letter-spacing: .5px; text-transform: uppercase; }
.copyBtn { background: #10B981; color: white; border: none; border-radius: 6px; padding: 5px 12px; font-size: 12px; cursor: pointer; }
.copyBtn:hover { background: #059669; }
.code { font-family: 'Courier New', monospace; font-size: 13px; color: #E2E8F0; margin: 0; white-space: pre-wrap; line-height: 1.7; }
```

### Bước 7: Tạo component Callout
```jsx
// src/components/Callout/index.jsx — MAX 60 dòng
import React from 'react';
import styles from './styles.module.css';

const CONFIG = {
  warn:  { icon: '⚠️', className: 'warn' },
  tip:   { icon: '💡', className: 'tip'  },
  info:  { icon: 'ℹ️', className: 'info' },
};

export default function Callout({ type = 'tip', title, children }) {
  const { icon, className } = CONFIG[type] || CONFIG.tip;
  return (
    <div className={`${styles.callout} ${styles[className]}`}>
      <span className={styles.icon}>{icon}</span>
      <div>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
```

### Bước 8: Kết nối GitHub và Vercel
```bash
git init
git add .
git commit -m "init: Lười HR website"
git branch -M main
git remote add origin https://github.com/USERNAME/luoi-hr.git
git push -u origin main
```
Sau đó: vercel.com → Import repo → Deploy (Vercel tự nhận Docusaurus)

---

## WORKFLOW B — Thêm bài viết mới

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
```bash
git add docs/[thu-muc]/[ten-bai].md
git commit -m "content: thêm bài [tên bài ngắn]"
git push
# Vercel tự deploy trong ~30 giây
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
