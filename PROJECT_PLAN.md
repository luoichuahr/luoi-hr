# PROJECT PLAN — Lười HR
> Cập nhật: 4/5/2026 | Launch đã xong ✅ — Đang chạy tuần 1

---

## Trạng thái tổng thể

| Hạng mục | Trạng thái |
|---|---|
| Hạ tầng (Docusaurus + Vercel) | ✅ Done |
| UI/UX (Hero, Navbar, Components) | ✅ Done |
| GA4, QA Agent, SEO Skill | ✅ Done |
| Wingman Tool landing page | ✅ Done |
| Trang ủng hộ (`/ung-ho`) | ✅ Done |
| Bài viết docs (6 bài bi-kip) | ✅ Done |
| Bài key launch 4/5 | ✅ Done — deployed + LinkedIn post |
| Security (rel, vercel.json headers) | ✅ Done — 4/5 |
| SEO internal links (6 bài) | ✅ Done — 4/5 |
| Ảnh WebP (−63% size) | ✅ Done — 4/5 |
| Bundle JS (458KB → 29KB main) | ✅ Done — 4/5 |
| Google Translate flag selector | ✅ Done — 4/5 |

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
| T2 4/5 | **KEY LAUNCH:** "Xây dựng trợ lý nhân sự của riêng bạn" | `docs/bi-kip/` ✅ Done |
| T3 6/5 | "Claude AI là gì? So sánh ChatGPT và Gemini" | `docs/nhap-mon/` ✅ Done |
| T5 8/5 | LinkedIn short: "3 lý do HR nên thử Claude" | LinkedIn only ✅ Done |

### Tuần 2 (11/5–15/5)
| Ngày | Bài | Folder |
|---|---|---|
| T2 11/5 | LinkedIn short hook | LinkedIn only |
| T3 13/5 | "Claude AI giúp gì cho HR? + preview 30+ Skills" | `docs/nhap-mon/` ✅ Done |
| T5 15/5 | "So sánh gói Free/Pro/Max — dùng thế nào tiết kiệm?" | `docs/nhap-mon/` ✅ Done |

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

## Social Media Automation — Quyết định pending

**Hiện tại:** Claude for Chrome (browser automation)
**Vấn đề:** Phải click quá nhiều, UX kém

**Kế hoạch:**
- Thử thêm 1–2 case với Claude for Chrome
- Nếu vẫn không ổn → **chuyển sang Make.com** (free tier, 1,000 ops/tháng)
- Make.com có Facebook + LinkedIn native connector, không cần Blotato hay n8n

**Không dùng:** Blotato (startup nhỏ, likely sponsored content), Apify (không phù hợp), n8n (cần self-host)

---

## Backlog — Ưu tiên thấp

| Tính năng | Mô tả | Effort |
|---|---|---|
| SEO content length | `nhan-su-chon-goi-claude` (815 từ) và `nhan-su-lua-chon-tinh-nang-claude` (795 từ) — nên mở rộng lên ≥ 1500 từ | Medium |
| SEO filename | `cv_extract_tool.mdx` dùng `_` — nên đổi sang `-` | Low |
| Social proof | Thêm số liệu thật (người dùng, testimonial) sau khi có data | Low |
| Ảnh header bài | Thêm ảnh đại diện cho từng bài khi có đủ nội dung | Low |

---

## Stack (không thay đổi tùy tiện)

- Docusaurus 3.x + React 18 + Node 20 LTS
- Font: Be Vietnam Pro | Color: `#10B981`
- Deploy: Vercel (free tier) | Form: Google Forms embed
- Repo: GitHub | Analytics: GA4
