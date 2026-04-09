# 📖 Hướng Dẫn Setup Git - Chi Tiết Cho Newbie

> File này hướng dẫn từng bước cách liên kết project Lười HR với GitHub

---

## 🎯 Mục đích là gì?

Bạn cần làm 3 việc:
1. **Khởi tạo Git** trên máy tính (nói với máy tính "dự án này cần track thay đổi")
2. **Liên kết với GitHub** (nói với GitHub "tôi muốn lưu code ở đó")
3. **Push code lên** (gửi code từ máy tính lên GitHub.com)

---

## 🔧 Chuẩn bị

### Bước 1: Mở Terminal (Command Prompt)

**Trên Windows:**
- Nhấn `Win + R` → gõ `cmd` → Enter
- Hoặc: Start → tìm "Command Prompt" → mở

**Trên Mac:**
- `Cmd + Space` → gõ "Terminal" → Enter

**Trên Linux:**
- Ctrl + Alt + T (hoặc tìm Terminal trong menu)

Terminal sẽ hiện ra như này:
```
C:\Users\LAP062>  ← (Windows)
```

### Bước 2: Điều hướng vào thư mục dự án

Bạn cần **chuyển vào folder `luoi-hr`**. 

Gõ lệnh này (**chỉnh sửa đường dẫn theo máy bạn**):

```bash
cd C:\Users\LAP062\Downloads\luoi-hr
```

Sau khi gõ, nhấn **Enter** → sẽ thấy:
```
C:\Users\LAP062\Downloads\luoi-hr>
```

✅ Lúc này bạn đã "vào" thư mục dự án

---

## ⚙️ Setup Git Config (LÀM MỘT LẦN DÙNG MÃI)

**Trước khi chạy `git commit`, bạn cần nói cho Git biết tên và email của bạn**

### Bước 0a: Thiết lập tên
Gõ:
```bash
git config --global user.name "Tên của bạn"
```

Thay `"Tên của bạn"` bằng tên thực, ví dụ:
```bash
git config --global user.name "Tran An Duc"
```

Nhấn **Enter**

*(Không có tin nhắn = thành công)*

---

### Bước 0b: Thiết lập email
Gõ:
```bash
git config --global user.email "email@example.com"
```

Thay `"email@example.com"` bằng email GitHub của bạn, ví dụ:
```bash
git config --global user.email "anhductran@gmail.com"
```

Nhấn **Enter**

*(Không có tin nhắn = thành công)*

---

✅ **Hoàn thành:** Từ giờ mỗi khi bạn commit, Git sẽ biết là bạn rồi

---

## 🚀 Thực hiện các lệnh Git

### ⚡ Lựa chọn 1: Gõ từng dòng một (AN TOÀN, DỄ HIỂU)

Đây là cách **tốt nhất cho newbie** vì bạn biết từng bước đang làm gì.

#### Bước 1: Khởi tạo Git

Gõ:
```bash
git init
```

Nhấn **Enter**

Máy sẽ trả lời:
```
Initialized empty Git repository in C:\Users\LAP062\Downloads\luoi-hr\.git
```

✅ Hoàn thành: Git đã "quản lý" thư mục này

---

#### Bước 2: Thêm tất cả file vào "sân khấu" (staging)

Gõ:
```bash
git add .
```

Nhấn **Enter**

*(Không có tin nhắn trả lời = thành công)*

✅ Hoàn thành: Tất cả file chuẩn bị được commit

---

#### Bước 3: Lưu "bản chụp" đầu tiên (commit)

Gõ:
```bash
git commit -m "init: thiết lập dự án Lười HR"
```

Nhấn **Enter**

Máy sẽ in ra:
```
[main (root-commit) abc1234] init: thiết lập dự án Lười HR
 25 files changed, 1500 insertions(+)
```

✅ Hoàn thành: Code bạn được "lưu" dưới tên "init: thiết lập dự án Lười HR"

---

#### Bước 4: Đổi tên branch (nếu cần)

Gõ:
```bash
git branch -M main
```

Nhấn **Enter**

*(Không có tin nhắn = thành công)*

✅ Hoàn thành: Branch chính được gọi là "main" (tên chuẩn)

---

#### Bước 5: Liên kết với GitHub

Gõ (**copy/paste từ GitHub bạn nhận**):
```bash
git remote add origin https://github.com/luoichuahr/luoi-hr.git
```

Nhấn **Enter**

*(Không có tin nhắn = thành công)*

✅ Hoàn thành: Máy tính biết "code sẽ được gửi lên đây"

---

#### Bước 6: Gửi code lên GitHub

Gõ:
```bash
git push -u origin main
```

Nhấn **Enter**

Máy sẽ hỏi **username và password GitHub**. Gõ:
- **Username:** `luoichuahr` (hoặc username bạn)
- **Password:** Token GitHub (không phải mật khẩu thường)

> 🔒 Nếu bạn chưa tạo token, xem hướng dẫn ở phần cuối

✅ Hoàn thành: Code đã lên GitHub! 🎉

---

### ⚡ Lựa chọn 2: Copy/Paste tất cả lệnh (NHANH nhưng cần cẩn thận)

**Đầu tiên, làm Bước 0a + 0b (Git Config) phía trên TRƯỚC**

Rồi copy toàn bộ lệnh này vào Terminal:

1. **Copy** toàn bộ block bên dưới
2. **Paste** vào Terminal (Chuột phải → Paste, hoặc `Ctrl+Shift+V`)
3. Nhấn **Enter**

```bash
git init
git add .
git commit -m "init: thiết lập dự án Lười HR"
git branch -M main
git remote add origin https://github.com/luoichuahr/luoi-hr.git
git push -u origin main
```

⚠️ **Cẩn thận:** Kiểm tra URL `https://github.com/luoichuahr/luoi-hr.git` có đúng không trước khi paste!

---

## 🤔 Tại sao GitHub chỉ cho 3 dòng lệnh?

### GitHub chỉ cho:
```bash
git remote add origin https://github.com/luoichuahr/luoi-hr.git
git branch -M main
git push -u origin main
```

### Nhưng bạn cần cả 6 dòng:
```bash
git init                                           ← GitHub không nhắc
git add .                                          ← GitHub không nhắc
git commit -m "init: thiết lập dự án Lười HR"    ← GitHub không nhắc
git branch -M main                                 ← GitHub nhắc
git remote add origin https://github.com/...      ← GitHub nhắc
git push -u origin main                           ← GitHub nhắc
```

### Lý do:
**GitHub giả định bạn đã làm 3 dòng đầu rồi!**

Khi bạn tạo repo trên GitHub, nó hiểu rằng:
- ✅ Bạn đã chạy `git init` trên máy (khởi tạo Git)
- ✅ Bạn đã chạy `git add .` và `git commit` (lưu code)
- ❌ Nhưng GitHub không biết bạn chưa liên kết nó lên GitHub

Nên GitHub chỉ nhắc **3 dòng còn lại** để "liên kết máy tính với GitHub"

### ⚠️ **Điều này gây confuse cho newbie rất nhiều!**

Vì thế, hướng dẫn này cung cấp **toàn bộ 6 bước** từ đầu đến cuối.

---

## 📊 Bảng so sánh: GitHub vs Hướng dẫn này

| # | Bước | GitHub cho? | Ghi chú |
|---|------|---|---|
| 1 | `git init` | ❌ Không | GitHub giả định bạn đã làm |
| 2 | `git add .` | ❌ Không | GitHub giả định bạn đã làm |
| 3 | `git commit -m "..."` | ❌ Không | GitHub giả định bạn đã làm |
| 4 | `git branch -M main` | ✅ Có | GitHub nhắc (dòng 2) |
| 5 | `git remote add origin [URL]` | ✅ Có | GitHub nhắc (dòng 1) |
| 6 | `git push -u origin main` | ✅ Có | GitHub nhắc (dòng 3) |

**⚡ Kết luận:** 
- **GitHub chỉ nhắc 3 dòng cuối** vì nó giả định phần trước bạn đã làm rồi
- **Hướng dẫn này nhắc cả 6 bước** từ lúc zero để newbie không bị confuse ✅

---

---

## 🔐 Nếu GitHub hỏi mật khẩu

GitHub hiện đại **không chấp nhận mật khẩu thường** nữa. Cần tạo **Personal Access Token**:

### Cách tạo Token:

1. Truy cập: https://github.com/settings/tokens
2. Click **"Generate new token"** (hoặc "Generate new token (classic)")
3. Điền:
   - **Note:** `luoi-hr-push` (tên bất kỳ)
   - **Expiration:** 90 days (hoặc không hết hạn)
   - **Select scopes:** Chọn `repo` (để có quyền push)
4. Click **"Generate token"**
5. **Copy token** (chỉ hiển thị 1 lần!)

### Khi Terminal hỏi password:
- Paste token vào → Enter
- ✅ Xong!

---

## ✅ Kiểm tra lại

Sau khi hoàn thành, kiểm tra trên GitHub:

1. Truy cập: https://github.com/luoichuahr/luoi-hr
2. Bạn sẽ thấy tất cả file từ máy tính của bạn
3. Commit message hiển thị: "init: thiết lập dự án Lười HR"

---

## 🆘 Nếu có lỗi

### Lỗi: "Author identity unknown"
- **Nguyên nhân:** Git chưa biết tên + email của bạn
- **Cách sửa:** 
  ```bash
  git config --global user.name "Tên bạn"
  git config --global user.email "email@example.com"
  ```
  Rồi chạy `git commit` lại

### ⚠️ Warning: "LF will be replaced by CRLF"
- **Điều này có nguy hiểm không?** Không, đây chỉ là Git tự động xử lý line break khác nhau giữa Windows vs Mac/Linux
- **Bạn cần làm gì?** Không cần làm gì, Git tự xử lý ✅

### Lỗi: "fatal: not a git repository"
- **Nguyên nhân:** Bạn chưa chạy `git init`
- **Cách sửa:** Chạy `git init` lại

### Lỗi: "fatal: remote origin already exists"
- **Nguyên nhân:** URL này đã được liên kết rồi
- **Cách sửa:** Gõ `git remote remove origin` → rồi chạy `git remote add origin` lại

### Lỗi: "fatal: could not create work tree dir"
- **Nguyên nhân:** Bạn không ở trong thư mục đúng
- **Cách sửa:** Kiểm tra lại `cd` vào đúng folder `luoi-hr`

---

## 📚 Tóm tắt 6 bước

| Bước | Lệnh | Mục đích |
|------|------|---------|
| 1 | `git init` | Khởi tạo Git |
| 2 | `git add .` | Thêm tất cả file |
| 3 | `git commit -m "..."` | Lưu bản chụp |
| 4 | `git branch -M main` | Đổi tên branch |
| 5 | `git remote add origin [URL]` | Liên kết GitHub |
| 6 | `git push -u origin main` | Gửi code lên |

---

## 🎯 Lần tới thay đổi code

Sau khi setup lần đầu, mỗi lần bạn sửa code:

```bash
git add .
git commit -m "mô tả thay đổi"
git push
```

Xong! 🚀

---

**Bạn cần giúp ở bước nào không?**
