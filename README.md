# Khu vườn tri ân — Báo tường Chi Lăng

## Mở dự án

- Trong Visual Studio 2026 có workload **ASP.NET and web development** và .NET 10 SDK, mở `ChiLang.slnx`. Chọn profile **ChiLang**, bấm **Ctrl+F5** để xem trang.
- Để xem offline, mở trực tiếp `wwwroot/index.html` bằng trình duyệt. Giữ nguyên thư mục `wwwroot` khi sao chép sang máy khác.
- Có thể chạy từ terminal tại thư mục dự án bằng `dotnet run --project ChiLang.csproj`.

Trang dùng HTML, CSS, JavaScript thuần và minh họa SVG cục bộ. ASP.NET Core phục vụ các tệp tĩnh khi chạy dự án trong Visual Studio.

## Biên tập báo của lớp

1. Mở `wwwroot/content.js` và điền `className`. Thay các bài và lời chúc mẫu bằng nội dung lớp thực hiện. Giữ nguyên các tên trường như `title`, `body` và `kind`. Dùng `\n` để xuống dòng trong thơ.
2. Chép tranh vào `wwwroot/assets/` rồi cập nhật đường dẫn tương đối `src`, tên tranh `title` và mô tả `alt` trong mục `art`. Thiệp có hình minh họa riêng trong mục `card`.
3. Chỉnh tên báo ở bìa, tiêu đề tab và chân trang trong `wwwroot/index.html` nếu lớp chọn tên khác. Giữ dòng tiêu đề 20/11 và năm học trên bìa theo kế hoạch. Bỏ ghi chú bản mẫu sau khi lớp đã thay nội dung minh họa.
4. Ghi nguồn cho nội dung tham khảo và chỉ công khai thông tin, ảnh hoặc giọng nói học sinh khi đã đáp ứng quy định của trường và có sự đồng ý cần thiết.
