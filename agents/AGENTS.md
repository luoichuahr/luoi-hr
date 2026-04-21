# Hệ thống Agents — Lười HR

Bộ 4 agents + QA chạy trong Cowork để vận hành website luoi-hr tự động.

## Danh sách agents

| Agent | File | Chạy khi nào |
|---|---|---|
| Content Agent | `content-agent.md` | Chủ nhật tối + Thứ 3 tối (tự động) |
| Frontend Agent | `frontend-agent.md` | Sau mỗi deploy + 2 tuần/lần audit |
| Backend Agent | `backend-agent.md` | Thứ 6 hàng tuần + cuối tháng |
| SEO Agent | `seo-agent.md` | 2 tuần/lần (thứ 6) |
| QA Agent | `qa-agent.md` | Trước mọi publish (chốt chặn) |

## Flow tổng thể

```
SEO Agent (2 tuần/lần)     → keywords → Content Agent
Backend Agent (cuối tháng)  → insights → Content Agent

[Chủ nhật tối]
Content Agent → draft bài thứ 3 (.md + LinkedIn + Facebook)

[Thứ 2 sáng]
Andy → review + approve

[Thứ 2 tối]
QA Agent → pass/fail
  fail → Content Agent revise
  pass → sẵn sàng publish

[Thứ 3]
Andy → git push → Vercel
Frontend Agent → check sau deploy
9h → LinkedIn | 18h → Facebook

[Thứ 3 tối] → lặp lại cho bài thứ 5
[Thứ 6] → Backend Agent weekly report
```

## Nguyên tắc chung
- Mỗi agent chỉ làm đúng scope của mình, không lấn sang agent khác
- QA là chốt chặn duy nhất — không có gì lên Vercel khi chưa qua QA
- Output của mỗi agent phải là file cụ thể trong workspace, không chỉ trả lời chat
