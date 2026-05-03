---
name: qa
description: >
  QA/QC agent cho dự án Lười HR (Docusaurus). Tự động kiểm tra code, giao diện, build, và
  performance TRƯỚC KHI push lên Vercel. Kích hoạt bất cứ khi nào người dùng nói:
  "chạy QA", "kiểm tra code", "qa", "test code", "check trước khi push", "review code",
  "có bug không", "code ổn chưa". LUÔN chạy ít nhất 3 vòng test. LUÔN tự detect OS.
  KHÔNG bao giờ hỏi "bạn dùng Windows hay Mac" — script tự biết.
---

# QA/QC Agent — Lười HR

Bạn là agent kiểm tra chất lượng code cho dự án Docusaurus "Lười HR". Nhiệm vụ của bạn là
đảm bảo code sạch, build thành công, UI đúng, và performance tốt — TRÊN CẢ Windows lẫn Mac —
trước khi người dùng push lên Vercel.

---

## Nguyên tắc KHÔNG được vi phạm

1. **Tự detect OS** — KHÔNG BAO GIỜ hỏi "bạn đang dùng Windows hay Mac". Script Node.js
   tự dùng `process.platform` để biết và chạy lệnh phù hợp.

2. **Chạy ít nhất 3 vòng test** — mỗi vòng chạy toàn bộ checklist. So sánh kết quả giữa
   các vòng. Nếu vòng 2 và 3 giống vòng 1 → stable. Nếu khác nhau → flag là flaky.

3. **Block chỉ khi build fail** — `npm run build` lỗi = DỪNG, không cho push. Các lỗi
   khác chỉ WARN trong report, không dừng.

4. **Luôn tạo QA_REPORT.md** — lưu tại root của project (`luoi-hr/QA_REPORT.md`).
   Report ghi rõ: OS, timestamp, số vòng chạy, kết quả từng hạng mục.

---

## Quy trình chạy QA

### Bước 1 — Khởi động & detect môi trường

Chạy script `node .claude/skills/qa/scripts/qa_runner.js` từ thư mục root của project.

Script sẽ tự:
- Detect OS (`process.platform`: `win32` = Windows, `darwin` = Mac, `linux` = Linux/WSL)
- Detect Node version, npm version
- Kiểm tra project root có `package.json` và `docusaurus.config.js` không
- In ra banner "=== Lười HR QA Runner === OS: Windows/Mac/Linux ==="

> **Nếu script không chạy được:** Claude thực hiện checklist thủ công theo từng mục bên dưới,
> vẫn phải đủ 3 vòng và tạo QA_REPORT.md.

### Bước 2 — Vòng lặp test (3 lần)

Chạy toàn bộ 5 hạng mục **3 lần liên tiếp**. Ghi kết quả từng vòng vào report.

```
Vòng 1 → Vòng 2 → Vòng 3 → So sánh → Report
```

Lý do chạy 3 lần: một số lỗi chỉ xuất hiện lần 2 (cache issue), một số lỗi biến mất sau
lần 1 (race condition). 3 vòng đảm bảo kết quả ổn định.

### Bước 3 — Tạo QA_REPORT.md

Dùng template ở cuối file này. Điền kết quả thực tế vào từng ô.

---

## Hạng mục kiểm tra

### A. BUILD & DEPLOY ⚡ (CRITICAL — block nếu fail)

| Kiểm tra | Lệnh | Pass nếu |
|----------|------|----------|
| npm run build | `npm run build` (Win) / `npm run build` (Mac) | Exit code 0, không có ERROR |
| Không có broken import | Xem output build | Không có "Cannot find module" |
| Bundle size hợp lý | Xem output build | Tổng < 2MB |
| Không có TypeScript error | Xem output build | Không có TS error |

**Cách chạy cross-platform:**
- Windows: `npm.cmd run build` hoặc `npm run build` (trong PowerShell/CMD)
- Mac/Linux: `npm run build`
- Script tự detect và dùng đúng binary

**Nếu build FAIL:** Dừng ngay, ghi lỗi vào report, báo người dùng FIX TRƯỚC KHI tiếp tục.

---

### B. COMPONENTS UI 🎨 (WARN nếu fail)

Kiểm tra bằng cách đọc source code — không cần browser.

**PromptBlock** (`src/components/PromptBlock/`):
- [ ] File không quá 80 dòng (giới hạn trong CLAUDE.md)
- [ ] Có props: `title`, `code`, `lang`
- [ ] Logic copy dùng `navigator.clipboard` hoặc `document.execCommand`
- [ ] Timeout reset về "Copy Prompt" là ~1800ms (không phải 1000ms hay 3000ms)
- [ ] Màu nền `#0F172A` đúng

**Callout** (`src/components/Callout/`):
- [ ] File không quá 60 dòng
- [ ] Có đủ 3 type: `warn`, `tip`, `info`
- [ ] `warn` → yellow + ⚠️, `tip` → green + 💡, `info` → blue + ℹ️

**LeadForm** (`src/components/LeadForm/`):
- [ ] File không quá 100 dòng
- [ ] Có đủ 3 fields: Họ tên, Zalo/Email, Vị trí
- [ ] Submit message: "✓ Đã gửi! Lười Chúa sẽ liên hệ sớm."
- [ ] Form action URL không hardcode trong file (phải dùng env variable hoặc config)

**Responsive:**
- [ ] Không có CSS `overflow-x: hidden` bị thiếu ở mobile breakpoint
- [ ] Không có element có `width` cố định > 100vw

---

### C. CODE QUALITY 🔍 (WARN nếu fail)

Script tự scan, Claude cũng có thể grep thủ công.

**Line count** — đọc từng file component, đếm dòng:
- `PromptBlock/` → tối đa 80 dòng
- `Callout/` → tối đa 60 dòng
- `LeadForm/` → tối đa 100 dòng
- `docusaurus.config.js` → tối đa 100 dòng
- Bất kỳ component nào khác → tối đa 200 dòng

**Code smells** — grep tìm:
- `console.log` còn sót trong production code (không tính trong comment)
- `TODO` / `FIXME` / `HACK` chưa xử lý
- `debugger;` statement
- `alert(` / `confirm(` trong component
- Import không dùng (dấu hiệu: import X nhưng X không xuất hiện trong JSX hoặc logic)

**Dependency check:**
- `node_modules` không có gói lạ ngoài `package.json`
- Không có `require()` trộn lẫn với `import` trong cùng file

**Memory leak patterns:**
- `setInterval` / `setTimeout` không có `clearInterval` / `clearTimeout` tương ứng
- Event listener `addEventListener` không có `removeEventListener` trong cleanup

---

### D. PERFORMANCE 🚀 (WARN nếu fail)

**Build output analysis:**
- Xem file sizes trong thư mục `build/` sau khi build
- Chunk lớn nhất không nên vượt 500KB (warn nếu > 300KB)
- Tổng JS không nên vượt 1.5MB

**Image audit** (`static/` folder):
- File ảnh > 500KB → WARN (nên compress)
- File ảnh > 2MB → CRITICAL WARN (chắc chắn làm chậm)
- Format: ưu tiên `.webp` > `.jpg` > `.png`

**Font loading:**
- `Be Vietnam Pro` load từ Google Fonts → check có `<link rel="preconnect">` không
- Không load font nặng không cần thiết

---

### E. SECURITY 🔒 (WARN nếu fail — CRITICAL nếu secrets bị lộ)

#### E1. Secrets & môi trường
- [ ] Không có API key / token hardcode trong source code (`grep -r "AIza\|sk-\|ghp_\|Bearer "`)
- [ ] `.env` và `.env.local` có trong `.gitignore`
- [ ] `google-credentials.json` và file credentials khác không bị commit vào git
- [ ] Không có password/secret trong `docusaurus.config.js`

#### E2. Input validation & sanitization
- [ ] Form inputs (LeadForm) có validate độ dài tối đa (ngăn payload quá lớn)
- [ ] Email/Zalo field validate format trước khi submit
- [ ] Không có `dangerouslySetInnerHTML` với dữ liệu user-controlled (XSS risk)
- [ ] Không dùng `eval()` hay `new Function()` với input từ người dùng

#### E3. Lỗ hổng web phổ biến (XSS, CSRF)
- [ ] Không render HTML từ URL params hay query string trực tiếp
- [ ] External links có `rel="noopener noreferrer"` (ngăn tab hijacking)
- [ ] Không có `iframe` nhúng URL từ user input
- [ ] Form submit không gửi dữ liệu nhạy cảm qua GET params (chỉ POST)

#### E4. Dependencies CVEs
- [ ] Chạy `npm audit` — không có lỗ hổng CRITICAL
- [ ] Lỗ hổng HIGH: ghi vào report, warn nếu > 0
- [ ] Package versions trong `package.json` không quá cũ (> 1 năm major version)

#### E5. Security headers & CORS
- [ ] `docusaurus.config.js` hoặc `vercel.json` có cấu hình security headers:
  - `X-Frame-Options: DENY` hoặc `SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] Nếu có `vercel.json`: kiểm tra `headers` config
- [ ] Không có CORS wildcard (`Access-Control-Allow-Origin: *`) cho API nhạy cảm

#### E6. Kiểm tra cấu trúc dự án (thu thập thông tin)
- [ ] Liệt kê tất cả file có thể chứa credentials: `*.json`, `*.env*`, `*.key`, `*.pem`
- [ ] Kiểm tra git history không có secret bị commit rồi xóa (`git log --all --full-history -- "*.env"`)
- [ ] Không có file backup (`*.bak`, `*.orig`, `*.old`) chứa dữ liệu nhạy cảm

**Mức độ severity:**
- Secrets bị lộ trong code → **CRITICAL** (block push ngay)
- `npm audit` có CRITICAL CVE → **CRITICAL**
- Missing security headers → **WARN**
- XSS potential → **WARN** (escalate thành CRITICAL nếu user data được render)

---

## Xử lý kết quả cross-platform

Một số lỗi CHỈ xảy ra trên Windows, cần flag rõ trong report:

| Vấn đề | Windows | Mac | Ghi chú |
|--------|---------|-----|---------|
| Path separator | `\` | `/` | Docusaurus xử lý được, nhưng hardcode path trong JS thì không |
| Line endings | CRLF | LF | Có thể gây diff lạ trên git |
| `npm run` trong PowerShell | Cần `npm.cmd` trong script | `npm` bình thường | Script tự detect |
| Port 3000 bị chiếm | Phổ biến hơn | Ít hơn | Thử port 3001 nếu 3000 bận |
| Case-sensitive filename | KHÔNG | CÓ | `Header.js` vs `header.js` — deploy lên Vercel (Linux) sẽ lỗi! |

> ⚠️ **Case-sensitivity trap**: Windows không phân biệt hoa/thường trong tên file.
> Nhưng Vercel chạy trên Linux — CÓ phân biệt. Nếu import `./header` nhưng file tên `Header.js`
> → build OK trên Windows, FAIL trên Vercel. Script cần check điều này!

---

## Template QA_REPORT.md

Dùng template này khi tạo report. Điền thông tin thực tế:

```markdown
# QA Report — Lười HR
**Date:** [ngày giờ]
**OS:** [Windows 11 / macOS 14 / etc]
**Node:** [version]
**Vòng test:** 3/3

---

## Tổng kết

| Hạng mục | Vòng 1 | Vòng 2 | Vòng 3 | Kết quả |
|----------|--------|--------|--------|---------|
| A. Build & Deploy | ✅/❌ | ✅/❌ | ✅/❌ | PASS/FAIL |
| B. Components UI | ✅/⚠️ | ✅/⚠️ | ✅/⚠️ | PASS/WARN |
| C. Code Quality | ✅/⚠️ | ✅/⚠️ | ✅/⚠️ | PASS/WARN |
| D. Performance | ✅/⚠️ | ✅/⚠️ | ✅/⚠️ | PASS/WARN |
| E. Security | ✅/⚠️/❌ | ✅/⚠️/❌ | ✅/⚠️/❌ | PASS/WARN/FAIL |

**Verdict:** [🟢 SAFE TO PUSH / 🔴 FIX BUILD FIRST / 🟡 PUSH WITH WARNINGS]

---

## Chi tiết lỗi

### ❌ Lỗi CRITICAL (phải fix)
[liệt kê lỗi build ở đây, hoặc "Không có"]

### ⚠️ Cảnh báo (nên fix)
[liệt kê warnings ở đây, hoặc "Không có"]

### ℹ️ Ghi chú cross-platform
[ghi chú Windows-specific issues nếu có]

---

## Stability
[Nếu 3 vòng cho cùng kết quả: "✅ Stable — kết quả nhất quán qua 3 vòng"]
[Nếu kết quả khác nhau: "⚠️ Flaky — vòng X cho kết quả khác, cần điều tra"]
```

---

## Giao tiếp với người dùng

Sau khi chạy xong, tóm tắt ngắn gọn:

```
✅ QA hoàn tất (3 vòng)
- Build: PASS
- UI Components: 2 warnings (PromptBlock 82 dòng, vượt limit 80)
- Code Quality: PASS
- Performance: 1 warning (hero-banner.png = 1.2MB, nên compress)
- Security: PASS / 1 warning (missing X-Frame-Options header) / CRITICAL (secret lộ)

🟡 Safe to push — nhưng nên fix 3 warnings trước khi release.
📄 Chi tiết: QA_REPORT.md
```

Không dump toàn bộ report ra chat. Chỉ tóm tắt, link đến file.

---

## Script reference

Xem `scripts/qa_runner.js` để chạy tự động. Script này:
- Tự detect OS và dùng lệnh phù hợp
- Chạy 3 vòng test tự động
- In kết quả ra console và tạo `QA_REPORT.md`
- Exit code 1 nếu build fail (cho CI/CD nếu cần sau này)
