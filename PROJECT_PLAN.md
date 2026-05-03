# PROJECT PLAN — Lười HR
> Cập nhật: 30/4/2026 | Launch: 4/5/2026 (T2)

---

## Trạng thái tổng thể

| Hạng mục | Trạng thái |
|---|---|
| Hạ tầng (Docusaurus + Vercel) | ✅ Done |
| UI/UX (Hero, Navbar, Components) | ✅ Done |
| GA4, QA Agent, SEO Skill | ✅ Done |
| Wingman Tool landing page | ✅ Done |
| Trang ủng hộ (`/ung-ho`) | ✅ Done |
| QR ngân hàng | ✅ Done — nằm trong trang /ung-ho |
| Bài viết docs | ✅ Done — `docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban.mdx` |
| Bài key launch 4/5 | ✅ Done — LinkedIn post + bài bi-kip là bài launch |
| Git dirty files | ❌ Chưa commit + push → Vercel |

---

## Critical path — 4 ngày còn lại

### 30/4 (T4 — Hôm nay)
- [ ] Andy: Chụp QR ngân hàng → `static/img/qr-ung-ho.png`
- [ ] Tạo `src/pages/ung-ho.jsx` (cần số TK + tên ngân hàng từ Andy)
- [ ] Soạn caption LinkedIn teaser #2 (đăng ngày 1/5)

### 1/5 (T5)
- [ ] Đăng teaser #2 LinkedIn lúc 7:30 — "4/5 tới mình ra mắt thứ gì đó cho dân HR…"

### 2–3/5 (T7–CN)
- [ ] Viết bài key: "HR Agent là gì? 5 Agents người làm nhân sự nên tạo ngay" → `docs/hr-agents/hr-agent-la-gi.md`
- [ ] SEO Agent audit bài key
- [ ] QA Agent gate (3 vòng)
- [ ] Commit 9 dirty files theo nhóm + push staging Vercel
- [ ] Soạn LinkedIn + Facebook caption cho ngày launch

### 4/5 (T2 — LAUNCH DAY)
- [ ] **Git commit + push → Vercel** — chạy trước 7:00 (việc cuối còn lại)
- [ ] Đăng LinkedIn lúc 7:30–8:00 — post đã sẵn tại `tempo/xay-dung-tro-ly-nhan-su-linkedin.html`
- [ ] Đăng Facebook lúc 18:00

---

## Việc của Andy (không thể delegate)

1. Chụp QR ngân hàng → lưu file `static/img/qr-ung-ho.png`
2. Cung cấp: tên ngân hàng + số tài khoản (để điền vào trang `/ung-ho`)
3. Viết nội dung bài HR Agent (hoặc cung cấp outline để agent draft)
4. Đăng LinkedIn thủ công ngày 1/5 và 4/5

---

## Content plan tháng 5 — 3 bài/tuần

| Kênh | Giờ | Lịch |
|---|---|---|
| T2 — LinkedIn only | 7:30–8:00 | Short post (hook/engagement) |
| T3 — Website + LinkedIn | 7:30–8:00 | Bài dài + teaser |
| T5 — Website + LinkedIn | 12:00–12:30 | Bài dài + teaser |

### Tuần 1 — LAUNCH WEEK (4/5–8/5)
| Ngày | Bài | Folder |
|---|---|---|
| T2 4/5 | **KEY LAUNCH:** "HR Agent là gì? 5 Agents người làm nhân sự nên tạo ngay" | `docs/hr-agents/` |
| T3 6/5 | "Claude AI là gì? So sánh ChatGPT và Gemini" | `docs/nhap-mon/` |
| T5 8/5 | LinkedIn short: "3 lý do HR nên thử Claude" | LinkedIn only |

### Tuần 2 (11/5–15/5)
| Ngày | Bài | Folder |
|---|---|---|
| T2 11/5 | LinkedIn short hook | LinkedIn only |
| T3 13/5 | "Claude AI giúp gì cho HR? + preview 30+ Skills" | `docs/nhap-mon/` |
| T5 15/5 | "So sánh gói Free/Pro/Max — dùng thế nào tiết kiệm?" | `docs/nhap-mon/` |

### Tuần 3 (18/5–22/5)
| Ngày | Bài | Folder |
|---|---|---|
| T2 18/5 | LinkedIn short | LinkedIn only |
| T3 20/5 | "Tổng quan 30+ Skills cho HR" | `docs/skills/` |
| T5 22/5 | "Quá lười để tự làm? Để Lười Chúa làm cho bạn" | `docs/dich-vu/` |

### Tuần 4 (25/5–29/5)
| Ngày | Bài | Folder |
|---|---|---|
| T2 25/5 | LinkedIn social proof | LinkedIn only |
| T3 27/5 | Deep-dive: "Skill Viết JD chuẩn trong 3 phút" | `docs/skills/` |
| T5 29/5 | Deep-dive: "Skill Tạo KPI không cần Excel" | `docs/skills/` |

---

## Docs structure (cần build trong tháng 5)

```
docs/
├── nhap-mon/         ← Giới thiệu Claude AI cho người mới
├── hr-agents/        ← Bài key launch + series HR Agents
├── skills/           ← 30+ Skills theo chủ đề
├── dich-vu/          ← Giới thiệu dịch vụ làm thuê A-Z
└── build-tools/      ← Hướng dẫn build tools với AI
```

---

## Backlog — Ưu tiên thấp

| Tính năng | Mô tả | Effort |
|---|---|---|
| Google Translate widget | Thêm nút dịch tự động cho người đọc nước ngoài (HR quốc tế). Dịch toàn bộ kể cả prompt. Không cần i18n thủ công. | ~30 phút |

---

## Stack (không thay đổi tùy tiện)

- Docusaurus 3.x + React 18 + Node 20 LTS
- Font: Be Vietnam Pro | Color: `#10B981`
- Deploy: Vercel (free tier) | Form: Google Forms embed
- Repo: GitHub | Analytics: GA4
