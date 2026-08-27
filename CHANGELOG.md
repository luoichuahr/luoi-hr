# CHANGELOG — Lười HR Website

## 2026-08-26 — Fix: `/en/` phải là bản dịch trang chủ, không phải landing page của Org Chart

- `[CONTENT]` **Làm sai ở lần trước:** `/en/` được viết thành trang giới thiệu riêng tool Org Chart. Đúng ra `/en/` là **bản tiếng Anh của trang chủ** — cùng bố cục Hero → Skills → LeadForm như `/`, chỉ khác ngôn ngữ. Viết lại toàn bộ.
- `[ARCH]` **Tách chuỗi ra khỏi `Hero`, `Features3Column`, `LeadForm` thay vì nhân bản component.** Mỗi component nhận prop `t`, mặc định là bản tiếng Việt trong `./content.js` cùng thư mục → trang `/` **không đổi một dòng render nào**. Bản EN chỉ truyền object khác vào. Nhân bản component sẽ đẻ ra ~500 dòng JSX + CSS trùng và chắc chắn lệch nhau sau vài lần sửa.
- `[ARCH]` **Chuỗi VI để trong `content.js` của từng component, không nhét vào `index.jsx`** — `Hero/index.jsx` đang 179 dòng, gộp thêm object nội dung là vượt luật MAX 200. Toàn bộ chuỗi EN gom về một chỗ: `src/pages/en/content.js`.
- `[DESIGN]` **Menu tiếng Anh qua `src/theme/Navbar/index.js`** — wrap navbar gốc, `pathname` bắt đầu bằng `/en` thì render `<NavbarEn/>`, còn lại trả nguyên navbar Docusaurus. Chọn cách này thay vì nhét cả 2 bộ item vào `themeConfig` rồi ẩn bằng CSS: cách CSS khiến HTML của trang EN vẫn chứa link tiếng Việt (Googlebot đọc được) và nháy menu Việt trước khi hydrate. Wrapper thì SSG prerender đúng từng route. Footer làm y hệt.
- `[BUSINESS]` **Menu EN trỏ Org Chart sang `/en/org-chart/`** (tool duy nhất có bản EN thật). Ba tool còn lại chưa dịch nên vẫn trỏ URL tiếng Việt và ghi rõ nhãn `(VI)` — thà nói trước còn hơn để khách EN bấm vào rồi gặp trang tiếng Việt.

---

## 2026-08-26 — Feat: Trang chủ tiếng Anh tại `/en/`

- `[ARCH]` **`src/pages/en/index.jsx` — React page, KHÔNG bật `locales:['vi','en']` của Docusaurus.** Bật locale sẽ sinh `/en/` cho toàn bộ docs, mà Docusaurus khi thiếu bản dịch thì fallback về nội dung gốc → phục vụ chữ tiếng Việt dưới URL tiếng Anh (duplicate content sai ngôn ngữ) và build gấp đôi. Hiện chỉ có 2 trang EN thật nên không đáng.
- `[ARCH]` **Là route React nên vào `sitemap.xml` tự động** — đây là lý do chọn React page thay vì file tĩnh `static/en/index.html`. Trang này link sang `/en/org-chart/`, kéo luôn trang tool tĩnh (plugin sitemap không thấy) ra khỏi tình trạng orphan page. Đồng thời được preset `gtag` phủ GA4, không phải chèn snippet tay như Hard Rule #6.
- `[CONTENT]` **Không tái dùng `<Hero/>`, `<Features3Column/>`** — hai component này không nhận props, chuỗi tiếng Việt hardcode trong file. Viết mới cho đúng đối tượng: khách EN đến từ truy vấn công cụ, quan tâm "dữ liệu có bị upload không", không quan tâm định vị "AI cho dân Nhân Sự".
- `[DESIGN]` **hreflang hai chiều `/` ↔ `/en/`** + canonical, đặt qua `<Head>` để override `<title>` mặc định của `<Layout>` (mặc định sẽ nối thêm site title tiếng Việt vào sau).
- `[ARCH]` **`sitemap.createSitemapItems` trong `docusaurus.config.js` — bổ sung 8 trang tĩnh vào sitemap.** Plugin sitemap chỉ enumerate route React, nên trước thay đổi này `sitemap.xml` không có một URL tool nào: `/org-chart/`, `/kpi-demo/`, `/hr-office-sim/`, `/certificate/`, `/hr-tools/*`, `/demos/*`. Không sửa được bằng cách viết tay `static/sitemap.xml` vì plugin ghi đè ở bước postBuild. Sau build: 57 URL, đủ cả 8 trang tĩnh + `/en/`. **Thêm file `.html` mới vào `static/` thì phải thêm vào danh sách này**, cùng lúc với việc chèn GA4 (Hard Rule #6).
- **Chưa làm, tách riêng:** (1) đổi navbar theo ngôn ngữ — hiện đứng ở `/en/` navbar vẫn là tiếng Việt, điều hướng EN đặt trong thân trang; chỉ nên làm khi có ≥3 trang EN; (2) nút Google Translate chưa biết điều hướng sang bản EN thật, vẫn dịch máy tại chỗ.

---

## 2026-08-26 — Feat: Bản tiếng Anh của Org Chart Builder tại `/en/org-chart/`

- `[ARCH]` **Tạo route tĩnh riêng `static/en/org-chart/index.html` thay vì gắn Google Translate Widget** — widget dịch client-side sinh chữ bằng JavaScript sau khi trang tải, Googlebot index bản HTML gốc nên toàn bộ từ khoá tiếng Anh ("free org chart builder", "excel to org chart", "no sign up") không bao giờ vào chỉ mục. Trang riêng có HTML tiếng Anh thật trong source → index được. Dùng sub-directory `/en/` (không phải sub-domain) để giữ toàn bộ authority về cùng một domain.
- `[ARCH]` **Không nhân bản `vendor/`** — 4 thư viện (xlsx, html2canvas, jsPDF, PptxGenJS) + `fonts.js` nặng ~2.1 MB, bản EN trỏ đường dẫn tương đối `../../org-chart/vendor/*`. Chỉ file thứ hai duy nhất được nhân bản là template Excel (`Org_Chart_Template.xlsx`, tiêu đề cột tiếng Anh) vì `mapHeader()` phải nhận diện được header EN.
- `[ARCH]` **`static/en/org-chart/index.html` có snippet GA4 riêng** (`G-KELJV9GYP2`, `anonymize_ip:true`) theo Hard Rule #6 — preset `gtag` của Docusaurus không chạm file trong `static/`. Traffic EN tách khỏi VI bằng chính path `/en/org-chart/`, không cần custom dimension.
- `[CONTENT]` **Copywriting viết mới, không dịch máy** — nhắm thẳng vào rào cản "sợ lộ dữ liệu" của HR/B2B nước ngoài bằng thuật ngữ chuẩn ngành: "100% client-side processing", "zero data retention", "no server uploads". Thêm section "How it works", "Why it is private by design", và FAQ 6 câu để tranh Featured Snippet.
- `[CONTENT]` **`STATUS` map nhận cả key EN lẫn VI** (`active`/`hiện tại`, `leaving`/`nghỉ việc`...) — người Việt làm việc ở công ty nước ngoài upload file cũ vẫn vẽ được. Legend dedupe theo nhãn hiển thị để không hiện 2 dòng trùng nghĩa.
- `[DESIGN]` **SEO on-page**: `<html lang="en">`, `<title>` 55 ký tự, `<meta description>` 154 ký tự, đúng 1 `<h1>` chứa keyword chính, canonical, `hreflang` en/vi/x-default hai chiều, Open Graph + Twitter card, JSON-LD `SoftwareApplication` + `FAQPage`.
- `[DESIGN]` **Bản VI được thêm hreflang đối ứng + link chéo** — hreflang chỉ có hiệu lực khi hai trang trỏ lẫn nhau. Thêm vào menu ☰ của cả hai bản một mục đổi ngôn ngữ (thẻ `<a>` thật, crawl được).
- `[BUSINESS]` **KHÔNG auto-redirect theo `navigator.language`/IP** — Googlebot crawl chủ yếu từ IP Mỹ với `Accept-Language: en`; redirect cứng sẽ khiến bản VI (đang có traffic thật) bị crawl thành bản EN và rớt chỉ mục tiếng Việt. Thay bằng banner gợi ý đóng được ở bản VI khi `navigator.language` không phải `vi`, lưu lựa chọn vào `localStorage`. Đây đúng là khuyến nghị của Google về i18n.
- `[DESIGN]` **Vá lỗi tràn ngang trên mobile — có sẵn ở bản VI từ trước, không phải do bản EN sinh ra.** Đo bằng headless Chrome (nhúng trang thật vào `<iframe>` đúng bề rộng máy, vì cửa sổ Chrome trên Windows không xuống dưới 500px được): sau khi vẽ xong sơ đồ, nút `#btnNew` hiện ra làm `.hdr` (flex, không wrap) rộng hơn màn hình → `documentElement.scrollWidth` 424px (VI) và 505px (EN) trên viewport 360–414px, cả trang scroll ngang, Lighthouse báo "content wider than screen". Sửa trong `@media(max-width:700px)` của cả hai file: khối tiêu đề `min-width:0` + ellipsis, `.hdr .btn` giảm padding/font, nhãn EN đổi "↺ Use another file" → "↺ New file". Đo lại: overflow = 0 ở cả 360/390/414px. Tiện thể nâng vùng chạm `.tb .btn.sm` và checkbox `.tgl` lên ~32px.
- **Hạn chế đã biết, chưa xử lý:** kéo-thả sửa cơ cấu dùng HTML5 Drag & Drop API (`draggable` + `dragstart`/`dragover`/`drop`) — API này không phát sự kiện trên trình duyệt cảm ứng, nên trên điện thoại **cả hai bản chỉ xem/xuất file được, không kéo-thả được**. Muốn hỗ trợ cần thêm lớp dịch pointer events. Ghi vào backlog, không tự làm.
- **Backlog chưa làm:** (1) `sitemap.xml` do plugin Docusaurus sinh chỉ liệt kê route React — cả 7 tool tĩnh (`/org-chart/`, `/kpi-demo/`, `/hr-office-sim/`... và nay `/en/org-chart/`) đều không có trong sitemap, phải bổ sung qua `createSitemapItems`; (2) biểu mẫu góp ý Tally (`QKN7V1`) vẫn là tiếng Việt, nên tạo form EN riêng.

---

## 2026-08-20 — Fix: Vá lỗ hổng tracking GA4 cho toàn bộ tool HTML tĩnh

- `[ARCH]` **6 file `static/**/*.html` thiếu tag GA4 — vá bằng cách chèn snippet `gtag` sau `<title>`** — Andy hỏi kiểm tra view trang Org Chart (deploy 19/8) thì phát hiện GA4 báo 0 view suốt dù có link navbar. Nguyên nhân gốc: preset `gtag` của Docusaurus (`docusaurus.config.js`) chỉ build tracking vào trang React (docs/blog/src/pages) qua webpack, KHÔNG chạm tới file `.html` copy thẳng vào `static/` — các trang này đi thẳng ra output, hoàn toàn không có script GA4 nào. Ảnh hưởng **toàn bộ 6 tool tĩnh hiện có**, không riêng org-chart: `static/org-chart/index.html`, `static/kpi-demo/index.html`, `static/hr-office-sim/index.html`, `static/certificate/index.html`, `static/demos/hr-ibm-dashboard.html`, `static/hr-tools/hr_department.html`, `static/hr-tools/hr_lifecycle_simulation.html`. Đã chèn snippet gtag (`G-KELJV9GYP2`, `anonymize_ip:true`) ngay sau thẻ `<title>` mỗi file.
- `[ARCH]` **Số liệu view trước 20/8 cho các trang này KHÔNG thể phục hồi** — GA4 không hồi cứu traffic xảy ra trước khi tag tồn tại trên trang. Từ nay các trang này bắt đầu được đo thật.
- `[BUSINESS]` **Thêm quy tắc bắt buộc chống tái phạm** — CLAUDE.md Hard Rules #6: mọi file `.html` mới trong `static/` phải tự chèn snippet gtag trước khi commit, check bằng `grep -l "G-KELJV9GYP2"`. Đồng thời ghi vào `agents/analytics-agent.md` (mục "Blind spot đã biết") và checklist deploy 5 bước trong memory (`feedback_commit_components.md` bước 5) để agent tương lai không bỏ sót.

---

## 2026-08-19 — Fix: Căn giữa sơ đồ trong tool Org Chart Builder

- `[DESIGN]` **static/org-chart/index.html: Sơ đồ bị lệch sát mép trái, nay căn giữa khung** — Andy báo cả tab `▦ Sơ đồ đầy đủ` lẫn các tab phòng ban đều dồn về trái, chừa khoảng trống lớn bên phải. Hai nguyên nhân, sửa cả hai: (1) `.tc` (khối chứa các node, rộng đúng bằng bề ngang cây) không có canh lề nên luôn dính trái trong `.tree-wrap` → thêm `margin:0 auto`, xử lý các tab phòng ban vốn hẹp hơn khung; (2) khi cây rộng hơn khung thì `margin:auto` vô tác dụng, phải cuộn → sau `bindCanvas()` trong `render()` đặt `scrollLeft` về giữa phần tràn. Chỉ chạy khi `viewKey()` đổi (cờ `S._cv`) để kéo thả card không làm khung nhảy ngang.
- `[ARCH]` **Sửa tận gốc ở `Sandbox/org-chart-builder/index.html` rồi mới sync** — không vá tay riêng bản trên site, nên lần re-copy sau không mất fix. Đã sync bằng cách port đúng 2 thay đổi vào file `static/` thay vì copy đè cả file, giữ nguyên 2 khối site-only (`.bmc*` + `.lmenu*`, nút Buy me a coffee + menu ☰). Đã đối chiếu: file trên site nay chứa trọn vẹn nội dung bản gốc mới, phần dôi ra đúng bằng 2 khối đó. `vendor/` và `Mau_So_Do_To_Chuc_v2.xlsx` không đổi.
- **Backlog chưa duyệt:** trên điện thoại 390px thanh tab và khung sơ đồ vẫn tràn ngang. Chưa sửa vì nằm ngoài phạm vi Andy giao lần này.

---

## 2026-08-19 — Business: Đưa tool Org Chart Builder lên site + menu

- `[BUSINESS]` **static/org-chart/: Thêm tool tạo sơ đồ tổ chức** — copy `Sandbox/org-chart-builder/index.html` (bản đúng; `index_v2 (wrong).html` KHÔNG dùng). Tool nạp thư viện bằng đường dẫn tương đối (`vendor/fonts.js`, `vendor/xlsx.full.min.js`, `vendor/html2canvas.min.js`, `vendor/jspdf.umd.min.js`, `vendor/pptxgen.bundle.js`) và nút tải file mẫu trỏ `Mau_So_Do_To_Chuc_v2.xlsx` → phải copy kèm cả `vendor/` (2.1 MB) và file xlsx, không chỉ mình `index.html`. Đường dẫn tương đối chạy đúng ở subpath `/org-chart/` nên không phải sửa mã nguồn.
- `[DESIGN]` **static/org-chart/index.html: Thêm nút "Buy me a coffee" bản thuần HTML/CSS** — trang tĩnh không chạy React nên không dùng được `src/components/BuyMeCoffee`. Viết lại lớp `.bmc` khớp `styles.module.css` (fixed bottom/left 20px, z-index 999, nền `#FFDD00`, bo 32px, hover `translateY(-2px)`, chữ Pacifico `.7rem`, ẩn chữ ở `max-width:480px`), copy nguyên SVG cốc cà phê, link tuyệt đối `https://luoi-hr.vercel.app/ung-ho`. Bỏ localStorage/gtag/badge ✓ cho gọn. Góc trái dưới của tool đang trống (chỉ có `.toast` fixed ở giữa, hiện thoáng qua) → không đè UI.
- `[DESIGN]` **static/org-chart/index.html: Thêm menu nổi góc phải dưới có mục "← Về trang Lười HR"** — trang tĩnh không có navbar Docusaurus nên khách bị kẹt, giống vấn đề đã xử lý cho 2 demo ở commit 2d9429b; dùng đúng nhãn `← Về trang Lười HR` và địa chỉ tuyệt đối `https://luoi-hr.vercel.app/`. Nút pill `.lmenu-btn` fixed `bottom:20px;right:20px`, bấm mở `.lmenu-pop` bung lên trên, bấm ra ngoài hoặc Esc thì đóng. `z-index:940` — cố ý thấp hơn `.ov` (950) để hộp thoại Góp ý che được, cao hơn `.toast` (900); không đụng `.bmc` ở góc trái. Thêm mục thứ 2 sau này chỉ cần thêm 1 thẻ `<a>` trong `#lmenuPop`. Dùng token sẵn có (`--navy`, `--bd`, `--bd2`, `--sh`, `--shm`), không thêm thư viện/file.
- **⚠️ Chỉ có ở bản trên site — KHÔNG có trong file gốc:** nút "Về trang Lười HR" và nút "Buy me a coffee" là thứ riêng của `static/org-chart/index.html`, cố ý không đưa vào `Sandbox/org-chart-builder/index.html` (tool chạy độc lập/offline không cần). **Lần sync sau từ Sandbox phải thêm lại 2 khối này** (khối CSS `.lmenu*` + `.bmc*` trước `</style>`, khối markup `<div class="lmenu">` + `<a class="bmc">` trước `</body>`).
- `[BUSINESS]` **docusaurus.config.js: Thêm mục navbar "🧬 Tool tạo Org Chart"** — chèn giữa "✨ Tool tạo CV" và "🏢 Văn phòng nhân sự số hóa". Cùng cách làm 2 demo cũ: `href` full URL tuyệt đối + `target: '_self'` để tránh broken-link check và giữ mở cùng tab.
- **Lưu ý vượt rule:** `docusaurus.config.js` nay 114 dòng (giới hạn MAX 100). Andy đã chốt trước đó là để nguyên, không tách `navbar.items` ra file riêng.

---

## 2026-08-17 — Fix: Nút quay về trang chính cho 2 demo + sửa tận gốc đường dẫn icon

- `[DESIGN]` **static/hr-office-sim/index.html, static/kpi-demo/index.html: Thêm nút quay về trang chính** — khách vào 2 trang demo (HTML tĩnh trong `static/`, không có navbar Docusaurus) bị kẹt, không có lối về site. Nay dòng đầu sidebar của cả 2 app là `<a class="nav-item backlink" href="https://luoi-hr.vercel.app/">`; trên điện thoại nút này nằm đầu ngăn kéo `☰`. Riêng kpi-demo có thêm 1 nút `<a class="btn ghost tiny">` ở màn đăng nhập vì màn đó chưa có sidebar. Dùng địa chỉ tuyệt đối, không path tương đối.
- `[ARCH]` **static/hr-office-sim/index.html: Sửa tận gốc đường dẫn icon VOV** — dứt điểm backlog của lần sync trước. Fix nay nằm trong file nguồn `Sandbox/hr-office-sim/index.html` chứ không vá tay trong `static/`, nên lần re-copy sau không mất nữa: `const ICON_DIR=location.protocol==='file:'?'assets/icons/vov/':'/hr-office-sim/assets/icons/vov/';`. Mở bằng `file://` lúc phát triển vẫn chạy (đường dẫn tương đối), lên web dùng đường dẫn tuyệt đối nên không phụ thuộc dấu `/` cuối URL.
- **Nguồn hợp lệ giữ nguyên như lần trước:** chỉ copy `Sandbox/kpi-system-demo/public/index.html`; `index_v4/v5/v6.html`, `build_public.js`, `docs/` là bản đầy đủ nội bộ, không lên web. Đã verify file lên web không chứa `Hướng dẫn`, `VIEWS.guide`, `'guide'`, `g-dienform`, `g-thuviec`.

---

## 2026-08-17 — Fix: Đồng bộ bản sửa hiển thị điện thoại cho 2 trang demo

- `[DESIGN]` **static/hr-office-sim/index.html: Sync bản sửa mobile mới nhất từ Sandbox** — bản đang live là bản sửa mobile đời cũ, còn lỗi. Bản mới: menu ngăn kéo `☰` (`id="btnMenu"` + lớp phủ `.navdim`) cho màn ≤900px, phòng làm việc giữ tỷ lệ và vuốt ngang được (`.floor{aspect-ratio:1.55;height:min(calc(100vh - 196px),620px)}`), tự cuộn vào giữa khi mở.
- `[DESIGN]` **static/kpi-demo/index.html: Sync bản sửa mobile mới nhất từ Sandbox** — ép lưới về 1 cột trên điện thoại, cho ô lưới co được, sửa dòng hành động IDP. Nguồn duy nhất được phép lên web là `Sandbox/kpi-system-demo/public/index.html` (bản đã cắt tính năng bán); `index_v4/v5/v6.html`, `build_public.js`, `docs/` là bản nội bộ, không copy. Đã verify file lên web không chứa `Hướng dẫn`, `VIEWS.guide`, `'guide'`, `g-dienform`, `g-thuviec`.
- **Backlog:** `static/hr-office-sim/index.html` đang dùng đường dẫn icon tương đối (`assets/icons/vov/*.png`) — fix "relative → absolute" ở commit 53ffeae đã bị ghi đè khi re-copy từ Sandbox (commit 56586c8) và lần sync này giữ nguyên tình trạng đó vì không được sửa nội dung file. Icon vẫn hiển thị đúng khi vào từ menu (URL có dấu `/` cuối); chỉ 404 nếu vào `/hr-office-sim` không có dấu `/`. Cần sửa tại nguồn `Sandbox/hr-office-sim/index.html` để không tái diễn.

---

## 2026-08-17 — Business: Đưa 2 demo tương tác lên site + menu

- `[BUSINESS]` **static/hr-office-sim/, static/kpi-demo/: Cập nhật/thêm 2 demo app** — Andy muốn khách xem được sản phẩm ngay trên Lười HR thay vì gửi file rời. Re-copy `hr-office-sim/index.html` từ `Sandbox/hr-office-sim/` (bản cũ 2026-07-25 đã lỗi thời, thiếu fix mobile 2026-08-17) + assets/icons/vov/. Thêm mới `kpi-demo/index.html` từ `Sandbox/kpi-system-demo/public/index.html` (bản công khai đã cắt tính năng bán, verify không có chuỗi "Hướng dẫn").
- `[BUSINESS]` **docusaurus.config.js: Thêm 2 mục navbar** — "🏢 Văn phòng nhân sự số hóa" → `/hr-office-sim/`, "📊 Hệ thống đánh giá KPI" → `/kpi-demo/`. 2 trang này là HTML tĩnh trong `static/`, KHÔNG phải route Docusaurus → dùng `href` full URL tuyệt đối (`https://luoi-hr.vercel.app/...`) thay vì path tương đối, vì Docusaurus `<Link>` coi path nội bộ bắt đầu bằng `/` là route và bắt buộc phải khớp route đã đăng ký (kể cả file tồn tại thật trong `static/`) → build fail "Broken link". Dùng full URL để Docusaurus xử lý như external link (thẻ `<a>` thường, bỏ qua broken-link check) + thêm `target: '_self'` để override default `target="_blank"` Docusaurus tự gắn cho external link, giữ mở cùng tab.
- **Lưu ý vượt rule:** `docusaurus.config.js` hiện 108 dòng (CLAUDE.md giới hạn MAX 100). Không tự refactor theo yêu cầu — 2 navbar item mới (href + target) là phần tăng dòng, cần Andy xác nhận có tách navbar items ra file riêng hay chấp nhận vượt.

---

## 2026-07-25 — Content: HR Office Sim Page

- `[CONTENT]` **static/hr-office-sim/index.html: Tạo trang /hr-office-sim** — Mô phỏng phòng nhân sự sống (neumorphism), copy nguyên từ `HR Agent/tempo/hr-office-sim/`. Single HTML file + assets/icons, Vercel serve tĩnh (giống pattern certificate page). Nút "Đưa lên CHRO Council" tạm ẩn (`display:none`) — link trỏ ra ngoài repo, chưa có bản deploy web cho CHRO Council Room, sẽ bật lại sau khi build xong.

---

## 2026-06-12 — Content: Certificate Page — Cotecons Workshop

- `[CONTENT]` **static/certificate/index.html: Tạo trang /certificate cho workshop Cotecons** — Class code gate "june2026", 2 template (Classic Gold + Cotecons Brand), input tên học viên, 3 nút export (Gốc 1200×848 / FB-LinkedIn 1200×630 / Locket 1080×1080). Single HTML file, Vercel serve tĩnh.

---

## 2026-05-19 — Content: CV Matching Tool — Claude Projects

- `[CONTENT]` **docs/bi-kip/cv-matching-tool-claude.mdx: Thêm bài mới** — Hướng dẫn lọc và chấm điểm CV tự động bằng Claude Projects. Bài tiếp nối cv-extract-tool, giải quyết bước còn thiếu: so CV với JD, chấm 5 tiêu chí, xuất bảng xếp hạng màu sắc. PromptBlock với Project Instructions copy-paste sẵn. sidebar_position: 2.

---

## 2026-05-16 — AI Career Wingman: Job Search Architecture

- `[ARCH]` **wingman-scraper.py: Thay Gmail OAuth2 bằng LinkedIn Guest API** — phát hiện endpoint `linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search` không cần login, trả về job thật với URL `www.linkedin.com/jobs/view/{id}/`. Script lưu vào `jobs.json`, user upload cho Wingman phân tích thay vì kết nối Gmail.
- `[ARCH]` **ai-career-wingman-skill-v1.0.md: Cập nhật Bước 4B + Hard Rule #11** — xóa toàn bộ luồng Gmail OAuth2, thay bằng luồng `scraper.py → jobs.json → upload`. Lý do: Gmail OAuth2 vẫn phụ thuộc user setup; LinkedIn guest API cho data thật không cần auth.
- `[ARCH]` **Research: TopCV/VietnamWorks/CareerViet đều chặn scraping đơn giản** — TopCV dùng Vue.js + Cloudflare; VietnamWorks dùng Algolia (app ID cũ đã hết hạn, cần extract credentials mới từ JS bundle); CareerViet load dynamic. Cả 3 cần Playwright hoặc Algolia API. **Chưa implement — để backlog.**
- `[ARCH]` **Phát hiện: VietnamWorks dùng Algolia làm search engine** — credentials public trong frontend JS (`appId`, `apiKey`, index `vnw_job_v2`). Cần extract app ID mới. Khi làm được → không cần Playwright, query thẳng Algolia API.

---

## 2026-05-15

[DESIGN] Đổi tên OG image từ social-card.png → social-card-v2.png để force Zalo re-scrape preview (cache cũ đang giữ hình con khủng long Docusaurus)

## Quy ước
- `[DESIGN]` — quyết định giao diện/UX
- `[ARCH]` — quyết định kiến trúc kỹ thuật
- `[CONTENT]` — quyết định nội dung/cấu trúc bài
- `[BUSINESS]` — quyết định monetization/funnel

---

## 2026-05-13

- [DESIGN] **xay-dung-phong-nhan-su**: Thay markdown table → auto-grid HTML (icon + % badge), thay bullet list → stats-row HTML (số lớn xanh) — theo đúng thiết kế HTML reference của Andy

---

## 2026-05-11

- [DESIGN] Fix ảnh QR Zalo bị broken trên Vercel — đổi tên `zalo-qr.JPG` → `zalo-qr.jpg` (Linux case-sensitive, code gọi lowercase)

---

## 2026-05-10 — SEO Fix (từ Analytics Agent + SEO Agent audit)

- `[CONTENT]` **cv_extract_tool: Fix slug `_` → `-`** — thêm `slug: cv-extract-tool` vào frontmatter; Google xử lý underscore như 1 từ liền, không tách keyword
- `[ARCH]` **vercel.json: Thêm redirect 301** từ `/docs/bi-kip/cv_extract_tool` → `/docs/bi-kip/cv-extract-tool` — giữ SEO juice cho URL cũ
- `[CONTENT]` **cv_extract_tool: Fix heading H1→H3** — đổi `###` thành `##` cho "Những hỗ trợ đột phá", tránh nhảy cấp heading
- `[CONTENT]` **cv_extract_tool: Thêm FAQ section** — 5 câu hỏi long-tail target keyword: "miễn phí", "không cần code", "hỗ trợ định dạng", "không quét lại", "bảo mật"
- `[CONTENT]` **thiet-ke-he-dieu-hanh: Mở rộng description** từ 97 → 192 ký tự — thêm CTA và liệt kê component cụ thể để tăng CTR trên SERP

---

## 2026-05-07

### [CONTENT] Embed IBM HR Dashboard vào bài S29 — replace placeholder
- Copy `1778071649_HR_Dashboard_2026-05-06.html` → `static/demos/hr-ibm-dashboard.html`
- Replace `![insert:hr-dashboard-preview.jpg]` bằng iframe thumbnail + link fullscreen
- Update cả docs/bi-kip/ và tempo/

### [CONTENT] Deploy bài "Xây dựng HR Dashboard bằng skill" (S29)
- Publish `docs/bi-kip/lam-hr-dashboard-voi-claude-s29.mdx` — 185 dòng, trung cấp
- Đã QA + SEO check, nội dung khớp với bản Andy review trong tempo/

---

## 2026-05-04

### [ARCH] Security fix — rel="noopener noreferrer" + vercel.json security headers
- Fix `target="_blank"` thiếu rel trên ai-career-wingman.jsx (line 152) — tab hijacking risk
- Tạo vercel.json: X-Content-Type-Options, X-Frame-Options (SAMEORIGIN), X-XSS-Protection, Referrer-Policy, Permissions-Policy
- Lưu ý npm audit: 21 lỗ hổng đều ở dev deps (webpack-dev-server chain) — KHÔNG fix, fix yêu cầu downgrade Docusaurus

### [CONTENT] SEO — Thêm internal links cho 6 bài bi-kip
- Mỗi bài thêm section "Đọc thêm" với 2 link liên quan: claude-ai-la-gi, cv_extract_tool, nhan-su-chon-goi-claude, nhan-su-lua-chon-tinh-nang-claude, thiet-ke-he-dieu-hanh, xay-dung-tro-ly-nhan-su

### [ARCH] SEO — Convert ảnh PNG → WebP (63% nhỏ hơn)
- live-artifacts-hr.png (382KB) → live-artifacts-hr.webp (142KB) dùng sharp
- Cập nhật reference trong nhan-su-lua-chon-tinh-nang-claude.mdx

### [ARCH] Performance — Webpack chunk splitting
- Thêm plugin chunkSplitter vào docusaurus.config.js: splitChunks all + vendor cache group
- Mục tiêu: split vendor bundle khỏi main chunk

### [DESIGN] Google Translate widget — flag selector navbar
- Tạo GoogleTranslate component: flag button + dropdown card 12 ngôn ngữ
- Dùng flag-icons (SVG sprites) — hiển thị đúng trên Windows, không dùng emoji cờ
- Vị trí: fixed top-right, cùng hàng navbar, viền xanh #10B981, transparent background
- Bỏ dark mode toggle (disableSwitch: true), trang vẫn tự theo OS preference
- Ẩn Google Translate banner mặc định (goog-te-banner-frame)
- Trigger dịch qua .goog-te-combo hidden element — không reload trang

---

## 2026-05-03

### [ARCH] BuyMeCoffee — localStorage boolean + GA4 event tracking
- Đổi từ counter → boolean flag: click lần 2+ không tăng số, không fire lại event
- Thêm `window.gtag('event', 'coffee_button_click')` để đo unique clicks thật
- Badge đổi từ số sang "✓" — phản ánh đúng trạng thái "đã ủng hộ"

### [DESIGN] Fix Hero CTA button — /docs → /docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban
- Button "Xây Agent ngay →" trỏ sai về /docs → fix đúng bài launch

### [ARCH] Fix broken link footer — /docs/intro → /docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban
- Footer link "Tất cả bài viết" vẫn trỏ về /docs/intro đã bị xóa → build fail
- Phát hiện bởi QA runner pre-launch, fix trước khi push

### [ARCH] Thêm Link Compliance vào QA Skill + Frontend Agent
- QA SKILL.md: thêm hạng mục B "Link Compliance" — phân biệt 404 (build bắt) vs wrong destination (test case)
- 4 test cases TC-01 đến TC-04 cho Hero CTA, footer, navbar, banned paths
- Frontend Agent: thêm "Link Audit" — static grep check + bảng regression Known CTAs
- Nguồn: bug Hero button /docs → /docs/bi-kip/... bị bỏ sót vì build pass

### [ARCH] Thêm Workflow mạng xã hội vào Content Agent
- Cập nhật `agents/content-agent.md`: LinkedIn/Facebook workflow với 3 bước rõ ràng
- Quy tắc spacing: tối đa 1 dòng trống giữa các đoạn (double blank line = trông như AI)
- Hashtag 3 lớp: Brand + Topic + Reach, SEO-aligned với luoi-hr.vercel.app
- Output: HTML preview có contenteditable + nút Copy + nút "Tải ảnh về máy" (html2canvas)
- Trigger: khi Andy nói "viết bài LinkedIn/Facebook" → LCA viết → LHRA tạo HTML preview

### [CONTENT] Deploy bài "Xây dựng trợ lý nhân sự của riêng bạn" vào docs/bi-kip
- Copy từ tempo/ → docs/bi-kip/xay-dung-tro-ly-nhan-su-cua-rieng-ban.mdx
- Verdict: PASS WITH NOTES (H1 duplicate line 18, 4 placeholder lạ, bold formatting line 250)
- Andy xem xét khi preview để quyết định sửa hay giữ nguyên



### [ARCH] Mount FloatingContact + BuyMeCoffee global trên mọi trang
- Tạo `src/theme/Root.js` — Docusaurus swizzle, render 2 component cố định toàn site
- Trước đây chỉ có ở homepage; giờ hiện trên tất cả docs, tools, landing page

### [ARCH] Fix lỗi window.gtag is not a function
- Chỉ enable Google Tag plugin trong production (`NODE_ENV === 'production'`)
- Lý do: gtag script bị block/chưa load xong trong dev → uncaught runtime error



### [CONTENT] Deploy bài mới: thiet-ke-he-dieu-hanh-lam-viec-voi-claude-danh-rieng-cho-nguoi-lam-nhan-su
- Copy `tempo/thiet-ke-he-dieu-hanh-lam-viec-voi-claude-danh-rieng-cho-nguoi-lam-nhan-su.mdx` → `docs/bi-kip/` (PASS WITH NOTES)
- Review notes: H1 trùng frontmatter (line 18), Callout type="warning" nên là "warn" (line 89) — không block build

### [CONTENT] Deploy bài mới: nhan-su-lua-chon-tinh-nang-claude
- Tạo `docs/bi-kip/nhan-su-lua-chon-tinh-nang-claude.mdx` từ `tempo/` (Andy's source)
- sidebar_position: 4 (tránh conflict với bài position 3)
- Thêm badge row (Nhập môn / 5 phút / Claude.ai)
- `[insert:claude-projects-hr.jpg]` bỏ qua — không có file trong tempo/
- `[insert:live-artifacts-hr.jpg]` → copy `tempo/live-artifacts-hr.png` vào `static/img/` + đổi sang MDX img syntax



### [DESIGN] Áp dụng template HTML vào 3 trang docs/bi-kip
- **CSS** `custom.css`: thêm typography docs (h1=28px, h2=20px+border-top, h3=16px), badge-row, stat-row, usecase-grid, plan-grid, flow diagram, dark mode overrides, mobile responsive
- **claude-ai-la-gi**: rewrite theo HTML template — badge row + stat-row (70%/3-5×/Miễn phí) + usecase-grid thay H3+list + flow diagram JSX
- **nhan-su-chon-goi-claude**: rewrite — badge row + plan-grid (4 cards) thay H3+text; sidebar_label đổi về đúng tiêu đề đầy đủ
- **cv_extract_tool**: thêm badge row; heading size tự apply qua CSS

### [CONTENT] Fix sidebar label + heading cho 2 bài mới trong bi-kip
- Thêm `sidebar_label` explicit vào cả 2 file — Docusaurus fallback về filename slug khi thiếu trường này
- `claude-ai-la-gi`: align H1 body với frontmatter title (2 text khác nhau → heading to bất thường trên trang)
- `nhan-su-chon-goi-claude`: đổi `sidebar_position` 2 → 3 để tránh trùng với bài trên
- Sidebar labels ngắn gọn theo format cv_extract_tool: "Claude AI là gì?" / "Nên dùng gói Claude nào?"

### [CONTENT] Deploy 2 bài mới vào docs/bi-kip + dọn tutorial mặc định
- Copy `tempo/nhan-su-chon-goi-claude.mdx` → `docs/bi-kip/`
- Copy `tempo/claude-ai-la-gi-cho-nhan-su.mdx` đã có từ task trước
- Xóa `docs/intro.mdx`, `docs/tutorial-basics/`, `docs/tutorial-extras/` — nội dung mẫu Docusaurus, không dùng

### [CONTENT] Đổi label sidebar "Bí Kíp" → "Bí Kíp Nhân sự"
- **File**: `docs/bi-kip/_category_.json`
- **Lý do**: Tên rõ hơn, đúng audience

---

### [DESIGN] Xóa Table of Contents sidebar bên phải toàn trang
- **File**: `src/css/custom.css`
- **Lý do**: Không có trong thiết kế — Docusaurus tự thêm mặc định, gây layout thừa cột
- **Cách làm**: Ẩn `.theme-doc-toc-desktop` + expand `[class*='docItemCol']` lên 100%

---

## 2026-04-30

- [DESIGN] **LeadForm — thu nhỏ và sửa flow** — đổi title từ "Bạn có nhu cầu gì..." → "Không muốn tự build?" + subtitle rõ mục đích; giảm max-width 380→320px; giảm padding 80→48px; tạo lối thoát thứ 2 rõ ràng (tự làm /docs vs thuê làm A-Z)
- [DESIGN] **Ẩn Testimonials + TrustIndicators** — 2 section trùng lặp thông điệp trust, số liệu chưa thực, comment out để tái sử dụng sau khi có nội dung thật
- [DESIGN] **Giảm padding các section** — Hero 80/100px → 64/80px; AgentSkills 80/90px → 60/72px; Testimonials 80px → 56px; TrustIndicators 60px → 40px (áp dụng cho tương lai); giảm scroll không cần thiết
- [DESIGN] **Fix white-space mobile trong WingmanFlashcard** — bỏ `white-space: nowrap` khỏi `.flashcardText` và `.flashcardSub` tại breakpoint ≤480px; text không còn bị cắt trên màn hình nhỏ

---

## 2026-04-27

- [CONTENT] Xóa folder `docs/quy-trinh-testing/` và toàn bộ nội dung — danh mục testing không cần thiết sau khi verify luồng
- [CONTENT] Tạo folder `docs/quy-trinh-testing/` (AgentOS task d54d4a47) — thêm danh mục "Quy trình (testing)" vị trí 3 để test luồng tạo nội dung HR policy
- [CONTENT] Bài đầu tiên: Quy trình thăng tiến nội bộ BCM Solutions — tiêu chí, các bước, cấp duyệt, timeline

---

## 2026-04-21

- [ARCH] Tạo landing page `/tools/ai-career-wingman` — preview UI trước khi deploy tool thật. Static mockup, không gắn backend.
- [DESIGN] Demo Job Card tái hiện đúng spec v1.3 (badge, matching %, coaching text, distance toggle, contact). Toggle di chuyển interactive (useState).
- [BUSINESS] Thêm nav item "✨ Tools" vào navbar — điểm vào cho tính năng tools tương lai.
- [DESIGN] Phương án A+B: thêm announcement pill (amber, pulsing dot) vào Hero homepage — link đến landing page tool.
- [DESIGN] Thay floating badge bằng process strip 3 bước (Upload CV → Coaching → Nhận CV) bên dưới ChatMockup, cùng chiều ngang. Cleaner, contextual hơn floating absolute.

## v1.1 — UI Refresh: Hero animated + FloatingContact (2026-04-21)

### Quyết định thiết kế
- `[DESIGN]` **Hero headline + subtitle** — đổi sang "HR Agent / giúp bạn làm mọi thứ / trong nhân sự", subtitle nhấn đủ 4 nghiệp vụ chính
- `[DESIGN]` **Chat mockup animated** — typewriter loop 3 kịch bản (JD → KPI → Onboarding), dùng useState/useEffect, không thêm dependency
- `[DESIGN]` **Xóa floating cards** Hero ("JD viết xong", "30 skills sẵn sàng") — giảm noise, tập trung vào chat demo
- `[DESIGN]` **CTA "Xem 30+ Skills"** — thêm dấu + để trung thực hơn về số lượng
- `[DESIGN]` **Stats bar**: 30 → 30+, 10' → 5-10 / "Phút setup xong", "Agent hoạt động" → "Hoạt động liên tục"
- `[DESIGN]` **Section title**: "30 Nghiệp vụ..." → "Hơn 30 nghiệp vụ nhân sự từ A-Z" + nowrap
- `[DESIGN]` **Footer note**: bỏ "Miễn phí · credit card" → "Dễ dàng · Không cần biết code" (đúng với audience)
- `[DESIGN]` **LeadForm thu nhỏ**: max-width 380px, padding 24px — form gọn hơn, không chiếm quá nhiều viewport
- `[ARCH]` **FloatingContact component** — 2 nút LinkedIn + Zalo cố định góc dưới phải; Zalo mobile mở app, desktop hiện QR popup
- `[CONTENT]` **Sửa typo** Testimonials: "sủa" → "sửa"

---

## v1.0 — Analytics Agent + Google Analytics 4 (2026-04-21)

### Quyết định kiến trúc
- `[ARCH]` **Gắn Google Analytics 4 (GA4) vào Docusaurus** via `@docusaurus/plugin-google-gtag` (built-in classic preset, không cần cài thêm dependency)
  - Plugin: `gtag` option trong classic preset, `trackingID: G-XXXXXXXXXX` (user thay bằng ID thực)
  - `anonymizeIP: true` — tuân thủ privacy, ẩn IP người dùng
  - Lý do: GA4 là tracking chuẩn nhất cho Docusaurus, tích hợp qua config thuần, không code thêm
  - Bác bỏ: Vercel Analytics (không có free tier đủ dùng), Plausible (thêm dependency mới)

- `[ARCH]` **Tạo Analytics Agent** tại `agents/analytics-agent.md`
  - Vai trò: đọc GA4 data export (CSV) hàng tuần, phân tích traffic/content/conversion, output report + action items cho Content Agent
  - Lịch: **Thứ 2 mỗi tuần** (trước SEO Agent thứ 6, trước Content Agent thứ 3 & 5)
  - Workflow: User export CSV từ GA4 → đặt vào `agents/analytics-data/` → Agent đọc → Output `agents/analytics-output/latest.md`
  - Lý do tạo riêng, không gộp vào SEO Agent: SEO Agent = acquisition (trước visit), Analytics Agent = behavior (sau visit) — hai mục đích, hai data source, hai tần suất khác nhau

---

## v0.9 — Hero Animated Chat + Layout Fix (2026-04-20)

### Giao diện
- `[DESIGN]` **Animated chat mockup** — chuyển từ static sang typewriter animation + agent trả lời từng dòng, loop 3 kịch bản (JD → KPI → Onboarding)
  - Lý do: sinh động hơn, demo được value prop rõ hơn với user lần đầu vào
  - Dùng React useState/useEffect, không dependency mới
- `[DESIGN]` **Fix floating cards** — thêm padding vào `.right` để floatA/floatB không bị clip/tràn ra ngoài



### Nội dung
- `[CONTENT]` **Sửa headline Hero** — "Tạo cho bản thân 1 Agent làm hết..." → "HR Agent giúp bạn làm mọi thứ trong nhân sự"
  - Lý do: headline cũ dài dòng, mới ngắn gọn và rõ value prop hơn
- `[CONTENT]` **Sửa subtitle Hero** — chi tiết hóa các use case: viết JD, xây dựng KPI, hành trình Onboarding, báo cáo phân tích nhân sự; đổi "Agent" → "HR Agent"
  - Lý do: cụ thể hơn, phù hợp audience HR

---

## v0.8 — Agent System + LeadForm Tư Vấn (2026-04-20)

### Quyết định kiến trúc
- `[ARCH]` **Tạo hệ thống 4 agents** — Content, Frontend, Backend, SEO chạy trong Cowork
  - Lý do: tự động hóa quy trình viết bài 2 lần/tuần + SEO + lead analysis
  - Agents điều phối nhau, QA là chốt chặn cuối
- `[BUSINESS]` **Cập nhật LeadForm → Tally.so embed**
  - Lý do: đổi hướng từ "dùng thử" sang "tư vấn 1-1", phù hợp monetization
  - Dùng Tally embed (WOpZke) thay custom form — Tally quản lý data, không cần env var
  - CSS dọn sạch các style form cũ không còn dùng

---

## v0.7 — QA Agent Setup + Bug Fixes (2026-04-20)

### Quyết định kiến trúc
- `[ARCH]` **Tạo skill `luoi-hr-qa`** — QA agent tự động kiểm tra toàn bộ codebase theo rules CLAUDE.md
  - Lý do: Claude code sai nhiều lần, cần hệ thống kiểm tra tự động mạnh hơn
  - Trigger: tự động sau mỗi lần Edit/Write, hoặc invoke thủ công bất cứ lúc nào
- `[ARCH]` **Nâng cấp `scripts/qa-check.js`** — thêm 4 checks mới: REACT_APP_ prefix, dead components, key={idx}, stats inconsistency

### Bug fixes
- `[ARCH]` **Fix critical: LeadForm env var sai prefix**
  - Bug: `process.env.REACT_APP_GOOGLE_FORM_URL` — Docusaurus không nhận `REACT_APP_` prefix
  - Fix: đổi sang `process.env.DOCUSAURUS_GOOGLE_FORM_URL`
  - Hậu quả trước đây: form không bao giờ submit được Google Forms

---

## v0.6 — Landing Page Redesign: Dribbble Visual + Agent Positioning (2026-04-20)

### Quyết định giao diện
- `[DESIGN]` **Redesign Hero section theo Dribbble "AI HR Management" style (Caliber Design)**
  - Bỏ: gradient xám nhạt, placeholder text, headline technical "Xây dựng HR Agent 10 phút"
  - Mới: cream background (#FAFAF8), chat mockup live demo, sparkle decorations, floating cards
  - Headline mới: "Tạo cho bản thân 1 Agent làm hết mọi thứ trong nhân sự"
  - Lý do: Dribbble design mạnh ở human element + social proof in hero + section diversity — học visual, giữ personality Lười HR
  - Thêm: eyebrow badge (green pill), audience tags (HRBP/Recruiter/C&B/HRM), star rating + user count ngay trong hero
  - Thêm: animated typing dots trong chat mockup → cảm giác Agent đang làm việc thật

- `[DESIGN]` **Rewrite Features3Column → AgentSkills (30 Skills grid)**
  - Bỏ: 3 feature card generic (JD, KPI, AI Agent)
  - Mới: 6 category × 5-6 skills = 30 skills hiển thị dạng card grid
  - Stats strip 4 con số: 30 Skills · 0 Dòng code · 10' Setup · 24/7 hoạt động
  - Lý do: người HR nhìn vào biết ngay Agent làm được việc của mình, không phải generic SaaS

### Quyết định kiến trúc
- `[ARCH]` Không thêm dependency mới — decorative elements dùng CSS + Unicode characters (✦)
- `[ARCH]` Chat mockup dùng pure JSX + CSS module, không dùng ảnh/SVG external
- `[ARCH]` Giữ nguyên file name Features3Column để không phải sửa import trong index.jsx

---

## v0.5 — Bài viết CV Extract Tool (2026-04-09)

### Quyết định nội dung
- `[CONTENT]` **Tạo bài hướng dẫn CV Extract Tool tại `docs/bi-kip/cv_extract_tool.mdx`**
  - Nội dung: Google Drive + Gemini AI tự động trích xuất thông tin CV thành Google Sheets
  - Tạo thư mục mới `docs/bi-kip/` + `_category_.json`
  - Dùng PromptBlock cho Gemini AI prompt (component đã có sẵn)
  - Format MDX (.mdx) để hỗ trợ import React component PromptBlock
  - Lý do: Tái sử dụng component PromptBlock thay vì markdown code block thuần

---

## v0.2 — QA/QC Skill (2026-04-09)

### Quyết định kiến trúc
- `[ARCH]` Tạo **QA/QC Skill** tại `.claude/skills/qa/`
  - Lý do: cần kiểm tra code tự động trước mỗi lần push — tránh bug lên Vercel
  - Scope: Build & Deploy + Components UI + Code Quality + Performance
  - Cross-platform: script tự detect Windows (win32) vs Mac (darwin), không hỏi user
  - Output: file `QA_REPORT.md` lưu vào root project
  - Gồm 2 file: `SKILL.md` (hướng dẫn Claude) + `scripts/qa_runner.js` (Node.js script)
  - Block policy: chỉ block khi `npm run build` fail, các lỗi khác warn thôi
  - Trigger: gọi thủ công ("chạy QA", "kiểm tra code", "qa")

---

## v0.1 — Khởi tạo dự án (2025-04)

### Quyết định kiến trúc
- `[ARCH]` Stack: **Docusaurus + GitHub + Vercel**
  - Lý do: newbie-friendly, thêm bài = thêm file .md, sidebar tự cập nhật, free deploy
  - Bác bỏ: Notion+Super.so (ít control design), Next.js scratch (overkill cho newbie)
- `[ARCH]` CMS: **Markdown files** trong thư mục `/docs`
  - Lý do: không cần database, không cần backend, Claude Cowork tạo file trực tiếp
- `[ARCH]` Workflow thêm bài mới: **Claude Cowork → tạo .md → git push → Vercel auto-deploy**
  - Không cần gọi lại prompt từ đầu mỗi lần thêm bài

### Quyết định giao diện
- `[DESIGN]` Layout: **Sidebar trái (260px) + Content chính giữa (max 780px)**
  - Lý do: documentation-style, người dùng tìm bài nhanh, không bị distract
- `[DESIGN]` Font: **Be Vietnam Pro** — đọc tiếng Việt tốt, modern, không generic
- `[DESIGN]` Màu chủ đạo: **Green #10B981** cho CTA, Slate cho text, Off-white cho bg
  - Lý do: green = action/productivity, phù hợp tone "lười mà hiệu quả"
- `[DESIGN]` Tone: **Playful nhưng credible** — không quá corporate, không quá indie
- `[DESIGN]` Brand icon: **🦥 sloth** — nhất quán với tên "Lười HR"

### Quyết định nội dung
- `[CONTENT]` Cấu trúc sidebar 4 nhóm:
  1. Nhập môn (AI cơ bản, Claude vs Gemini, viết prompt)
  2. Build Tools & Web (tạo website, HR agent, Google Sheet)
  3. Skills cho Agent (JD, Offer, KPI, thông báo)
  4. Theo vị trí (HRBP, Recruiter, C&B)
- `[CONTENT]` Mỗi bài có: badge độ khó + thời gian đọc + Prompt Block có nút Copy + Callout "Lưu ý chống ngáo"
- `[CONTENT]` Đối tượng: HR, Recruiter, C&B, Headhunter — không biết code, muốn dùng AI ngay

### Quyết định monetization
- `[BUSINESS]` Funnel 3 tầng:
  - Tier 1: Đọc free, copy prompt, tự làm → build trust
  - Tier 2: Donate cafe (QR Momo) → nuôi cộng đồng
  - Tier 3: Thuê làm A-Z (form lead → Google Sheet + Zalo) → thu nhập chính
- `[BUSINESS]` Lead capture: form 3 field (tên, Zalo/email, vị trí) → Google Sheet
  - Lý do: Zalo đơn độc không đủ — mất lead ban đêm

### So sánh với đối thủ tham khảo
- `[BUSINESS]` Tham khảo: mastering-da.com — ngách khác (Data Analyst vs HR), không phải đối thủ
- `[DESIGN]` MDA mạnh hơn về first impression (ảnh, partner logo, địa chỉ)
- `[DESIGN]` Lười HR mạnh hơn về actionability (prompt dùng ngay, small win trong bài)
- `[DESIGN]` Cần bổ sung sau: ảnh preview bài, số liệu social proof, emoji trong sidebar

### Việc cần làm (backlog)
- [ ] Setup Docusaurus project thực tế trên máy
- [ ] Config theme màu green + font Be Vietnam Pro
- [ ] Tạo PromptBlock component (reusable)
- [ ] Tạo Callout component (warn/tip/info)
- [ ] Tích hợp Google Form → Sheet cho lead capture
- [ ] Thêm social proof section (số người dùng, testimonial nhỏ)
- [ ] Gắn tên miền riêng
- [ ] Tối ưu first impression: ảnh header mỗi bài

---

## v0.2 — Setup Guide & Architecture Review (2026-04)

### Quyết định kiến trúc (ARCH_REVIEW)
- `[ARCH]` **JavaScript (not TypeScript)** cho Docusaurus setup
  - Lý do: Lười HR là doc site đơn giản, không cần strict typing
  - Theo nguyên tắc: không over-engineer, focus content vs small wins
  - Setup nhanh hơn, compile step ít hơn → dev speed tốt hơn

### Quyết định hướng dẫn
- `[CONTENT]` **Thêm links + setup guide vào SKILL_website.md**
  - Node.js link: https://nodejs.org (chọn LTS)
  - Git link: https://git-scm.com
  - Giải thích JavaScript vs TypeScript choice → tránh confusion

---

## v0.3 — Git Setup Guide for Newbie (2026-04-09)

### Quyết định hướng dẫn
- `[CONTENT]` **Tạo file SETUP-GIT-NEWBIE.md riêng để hướng dẫn chi tiết Git setup**
  - Lý do: GitHub chỉ cho 3 dòng lệnh (giả định bạn đã làm phần trước), nhưng newbie bị confuse vì không biết phần trước cần làm gì
  - Giải pháp: cung cấp **toàn bộ 6 bước từ zero** kèm giải thích tại sao
  - Bảng so sánh rõ ràng: "GitHub cho 3 dòng" vs "Newbie cần 6 dòng"
- `[CONTENT]` **Hai cách thực hiện:** gõ từng dòng (an toàn) vs copy/paste (nhanh)
- `[CONTENT]` **Giải thích từng lệnh là dùng để làm gì** với ví dụ hộp thư/bưu điện
- `[CONTENT]` **Hướng dẫn tạo GitHub Personal Access Token** (vì GitHub không chấp nhận mật khẩu thường)
- `[CONTENT]` **Khắc phục lỗi thường gặp** (Author identity unknown, LF/CRLF warning, not a git repository, etc.)
- `[CONTENT]` **Bước 0 bắt buộc:** Setup `git config user.name` + `user.email` TRƯỚC khi commit (lỗi newbie hay gặp)

### Update SKILL_website.md — Đồng nhất với huong-dan-website-tu-dong.html
- `[CONTENT]` **Viết lại SKILL_website.md với 4 bước RÕNG, giống file HTML**
  - **Bước 1:** Cài Node.js & Git
  - **Bước 2:** Tạo Docusaurus project
  - **Bước 3:** Đẩy lên GitHub (Git Config + Commit + Push)
  - **Bước 4:** Kết nối Vercel → Live trong 2 phút
- `[CONTENT]` **Thêm troubleshooting chi tiết** cho mỗi bước Git (Author identity, remote already exists, LF/CRLF, v.v.)
- `[CONTENT]` **Giữ WORKFLOW B, C, D** như cũ (thêm bài, sửa component, debug)
- **Lý do:** Newbie bị confuse vì SKILL_website.md ghi "Bước 8-13" nhưng HTML ghi "Bước 1-4" → Giờ cả 2 file cùng cấu trúc 4 bước rõ ràng

---

## v0.4 — Landing Page Redesign: Hybrid SaaS + Docs (2026-04-09)

### Quyết định kiến trúc (ARCH)
- `[ARCH]` **Hybrid approach: Custom landing page (src/pages/index.jsx) + Docusaurus docs**
  - Lý do: Docusaurus theme mặc định "nhàm", user muốn modern SaaS feel (Hero + Features + Testimonials) nhưng vẫn giữ docs area clean
  - Bác bỏ: Pure Next.js (overkill, không cần), Pure Docusaurus (không đủ marketing feel)
  - Giải pháp: Tạo landing page riêng ở `src/pages/index.jsx` với components custom, `/docs` folder giữ nguyên documentation style

- `[ARCH]` **Component architecture: 7 reusable components, mỗi ≤ 200 lines**
  1. **Hero** (70 lines) — SaaS-style hero, CTA buttons, headline: "Xây dựng HR Agent trong 10 phút với AI"
  2. **Features3Column** (85 lines) — 3 feature cards: "Tạo JD", "KPI tự động", "AI Agent"
  3. **Testimonials** (100 lines) — testimonial grid/carousel, quotes từ users
  4. **TrustIndicators** (75 lines) — social proof: "Dành cho HRBP • Recruiter • C&B • SME"
  5. **LeadForm** (100 lines) — form 3 field (Name, Zalo/Email, Position) → POST Google Form
  6. **PromptBlock** (80 lines) — reusable dark code block + Copy button
  7. **Callout** (60 lines) — reusable warn/tip/info alerts

- `[ARCH]` **Styling: CSS Modules + Infima (NOT adding Tailwind)**
  - Lý do: Docusaurus 3.x ships with Infima, project đã dùng CSS Modules
  - Scoped styles prevent naming conflicts, không cần compile step thêm
  - Google Fonts: Be Vietnam Pro (import trong custom.css)

- `[ARCH]` **No new dependencies**
  - Docusaurus 3.10.0 (already)
  - React 19 (bundled)
  - clsx v2.0.0 (already)
  - CSS Modules (built-in)

### Quyết định giao diện (DESIGN)
- `[DESIGN]` **Landing page sections: Hero → Features → Testimonials → Trust indicators → Form → CTA cards**
  - Hero: "Xây dựng HR Agent trong 10 phút với AI" + CTA "Bắt đầu miễn phí" & "Xem demo"
  - Features: 3 columns (JD, KPI, Agent) với icons + descriptions
  - Testimonials: User quotes + position + avatar placeholders
  - Trust: "Dành cho HRBP, Recruiter, C&B, SME", social proof stats
  - Form: Email lead capture (name, zalo/email, position)
  - CTA cards: "Trải nghiệm miễn phí" + "Dịch vụ Setup A-Z"

- `[DESIGN]` **Color & Typography**
  - Primary: #10B981 (green CTA buttons) — already in custom.css
  - Secondary: #0F172A (dark blue for PromptBlock/code blocks)
  - Font: Be Vietnam Pro (Google Fonts import)
  - Tone: Modern SaaS for landing + Academic clean for docs

- `[DESIGN]` **Responsive: Mobile-first**
  - Hero: stacked on mobile, side-by-side on desktop
  - Features: 1-column on mobile, 3-column on desktop
  - Testimonials: carousel/grid responsive

### Quyết định nội dung (CONTENT)
- `[CONTENT]` **Vietnamese UI text** — tất cả buttons, headings, placeholder text tiếng Việt
- `[CONTENT]` **Google Form integration**
  - LeadForm component POST to Google Form (action URL → env variable)
  - Success message: "✓ Đã gửi! Lười Chúa sẽ liên hệ sớm." (1.8s delay then hide)
- `[CONTENT]` **PromptBlock & Callout examples bên trong landing**
  - PromptBlock có sample prompt từ File 1
  - Callout component dùng trong feature descriptions

### Implementation Plan
- Phase 0: Update CHANGELOG + docusaurus.config.js + custom.css (15 min)
- Phase 1: 5 small wins (Hero, Features, LeadForm, PromptBlock, Callout) — mỗi < 30 min ✓ testable independently
- Phase 2: Testimonials + TrustIndicators assembly
- Phase 3: Full landing assembly + verify + deploy

**Estimated time:** ~2h 43m total (Haiku sufficient, ~15.3k tokens)

### Files to modify/create
- ✅ Update: `/CHANGELOG.md` (this file — recording decisions)
- ✅ Update: `docusaurus.config.js` (title, tagline, font imports)
- ✅ Update: `src/css/custom.css` (Be Vietnam Pro, CSS vars)
- 🆕 Create: `src/pages/index.jsx` (landing page orchestrator, rename from .js)
- 🆕 Create: `src/components/Hero/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/Features3Column/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/Testimonials/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/TrustIndicators/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/LeadForm/index.jsx` + `styles.module.css`
- 🆕 Create: `src/components/PromptBlock/index.jsx`
- 🆕 Create: `src/components/Callout/index.jsx`

### Backlog (not in this sprint)
- [ ] A/B test hero copy ("10 phút" vs "15 phút")
- [ ] Optimize SEO (meta descriptions, OG tags)
- [ ] Add video hero background or animated hero image
- [ ] Setup Zalo webhook → auto-reply form submissions
- [ ] Dark mode testing & refinement
- [ ] Analytics (Google Analytics on landing)
