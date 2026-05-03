# SKILL_luoi — Router cho Lười HR

> Một điểm vào duy nhất. Nói điều bạn muốn, Claude tự biết mở agent nào.

---

## Cách dùng

Thay vì nhớ tên file agent, chỉ cần mô tả việc cần làm:

```
Mở SKILL_luoi.md, đọc bảng router, sau đó:
[mô tả việc bạn muốn làm]
```

Ví dụ:
```
Mở SKILL_luoi.md và: viết bài về kỹ năng phỏng vấn cho Recruiter
Mở SKILL_luoi.md và: check SEO bài vừa đăng
Mở SKILL_luoi.md và: website bị lỗi gì đó, fix giùm
Mở SKILL_luoi.md và: xem tình hình tuần này
```

---

## Bảng Router

| Bạn muốn làm gì | Từ khóa nhận dạng | Agent / Skill |
|---|---|---|
| **Viết bài mới** | viết bài, content, bài mới, draft, tạo bài | `agents/content-agent.md` |
| **Sửa giao diện / component** | giao diện, UI, component, màu, font, hero, layout | `SKILL_website.md` → Workflow C |
| **Thêm bài vào website** | thêm bài, publish, đăng bài | `SKILL_website.md` → Workflow B |
| **Fix lỗi website / build** | lỗi, bug, fix, không chạy, build fail | `SKILL_website.md` → Workflow D |
| **Setup từ đầu** | setup, cài đặt, máy mới | `SKILL_website.md` → Workflow A |
| **Tối ưu SEO bài viết** | SEO, từ khóa, meta, description, title | `agents/seo-agent.md` |
| **Xem traffic / analytics** | traffic, GA4, analytics, người dùng, lượt xem | `agents/analytics-agent.md` |
| **Xem tổng quan / tình hình** | tổng quan, dashboard, tuần này, tình hình | `agents/backend-agent.md` |
| **Review bài trước khi push** | review, kiểm tra, QA, trước khi push | `SKILL_website.md` → Workflow E |
| **Quyết định kỹ thuật** | nên dùng gì, phương án A hay B, thiết kế | `AGENT_ARCHITECT.md` |

---

## Luồng agents theo tuần

```
[Thứ 6 cách 2 tuần]  SEO Agent     → keywords → lưu agents/seo-output/
[Thứ 2 hàng tuần]    Analytics     → traffic insights → lưu agents/analytics-output/
[Chủ nhật tối]       Content Agent → đọc SEO + Analytics → draft bài thứ 3
[Thứ 3 tối]          Content Agent → draft bài thứ 5
[Trước mọi git push] QA Agent      → auto-chạy qua hook
```

---

## Quy tắc bắt buộc (nhắc lại từ CLAUDE.md)

1. Ghi CHANGELOG.md **trước** khi code
2. Không vượt giới hạn dòng: PromptBlock ≤80, Callout ≤60, LeadForm ≤100, component khác ≤200
3. Không thêm dependency mới mà không hỏi Andy trước
4. Sau mỗi việc xong → cập nhật `.session/checkpoint.json`

---

## Cập nhật checkpoint sau khi xong việc

Sau khi hoàn thành bất kỳ task nào, ghi vào `.session/checkpoint.json`:

```json
{
  "status": "done",
  "last_agent": "content-agent",
  "last_task": "viết bài phỏng vấn Recruiter → tempo/2026-04-24-phong-van.md",
  "note": "chờ Andy review rồi push",
  "updated_at": "2026-04-24"
}
```

Các giá trị `status` hợp lệ: `idle` | `in-progress` | `done` | `blocked` | `needs-review`
