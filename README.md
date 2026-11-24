# Tiếng Trung Mỗi Ngày

Website tĩnh học tiếng Trung bằng tiếng Việt. Có từ vựng, flashcard hai chiều, bài kiểm tra 20 từ, ngữ pháp, ghép câu và tiến độ HSK 1–5. Mở `index.html` để chạy ngay.

## Đưa lên GitHub Pages

1. Trên [GitHub](https://github.com/new), tạo kho mới, chẳng hạn `tieng-trung-moi-ngay`. Dùng kho công khai nếu bạn dùng GitHub Free và muốn xuất bản Pages.
2. Giải nén tệp ZIP. Đưa các tệp bên trong thư mục giải nén lên nhánh `main`, đặt `index.html` ngay ở thư mục gốc. Có thể dùng **Add file → Upload files** hoặc lệnh Git bên dưới.
3. Trong kho, mở **Settings → Pages**. Chọn **Deploy from a branch**, nhánh **main**, thư mục **/ (root)**, rồi bấm **Save**.
4. Đợi lượt triển khai hoàn thành và mở địa chỉ trong **Settings → Pages**. Với tên kho ở ví dụ, đường dẫn thường là `https://TEN-GITHUB.github.io/tieng-trung-moi-ngay/`.

Tài liệu [cấu hình GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Dùng Git trên Mac

Mở Terminal trong thư mục chứa `index.html`. Tạo kho trống trên GitHub trước, không chọn tạo README trên GitHub vì bản ZIP đã có README. Thay `TEN-GITHUB` bằng tên tài khoản của bạn.

```sh
git init -b main
git add .
git commit -m "Thêm website Tiếng Trung Mỗi Ngày"
git remote add origin https://github.com/TEN-GITHUB/tieng-trung-moi-ngay.git
git push -u origin main
```

Đăng nhập GitHub Desktop nếu muốn dùng giao diện thay cho Terminal. Nếu dùng Terminal và được yêu cầu xác thực, dùng Git Credential Manager, GitHub CLI hoặc SSH theo [tài liệu xác thực GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github).

## Nội dung và dữ liệu

- HSK 1–3 là bộ từ chọn lọc. HSK 4–5 có từ mẫu dùng offline, cùng nút **Tải bộ từ đầy đủ** trong tab **Từ vựng**. Lần tải cần Internet.
- Bộ HSK 4–5 lấy mục từ của từng cấp theo HSK 2.0 trong [Complete HSK Vocabulary](https://github.com/drkameleon/complete-hsk-vocabulary) (Yanis Zafirópulos, MIT). Nghĩa tiếng Việt được ghép từ [CVDICT](https://github.com/ph0ngp/CVDICT) của Phong Phan, dựa trên CC-CEDICT, theo [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Nghĩa ghép tự động mang tính tham khảo. Mục chưa có nghĩa vẫn có trong danh sách và được bỏ qua khi tạo đề kiểm tra.
- Các bài ngữ pháp và ghép câu là bài thực hành chọn lọc.
- Tiến độ và từ tự thêm được lưu trong trình duyệt theo địa chỉ trang. Bản mở từ tệp HTML và bản GitHub Pages có vùng lưu riêng. GitHub nhận mã nguồn khi bạn đẩy kho; lịch sử học nằm trong trình duyệt.
