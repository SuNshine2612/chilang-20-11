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
## Tình trạng dự án báo tường 20/11

Trang báo tường điện tử của lớp 1/7, Trường Tiểu học Chi Lăng được xây dựng bằng HTML, CSS và JavaScript thuần, theo bố cục onepage responsive, phù hợp với học sinh tiểu học.

### Các nội dung và tính năng đã triển khai

- Các chuyên mục: Lời ngỏ yêu thương, Văn học tuổi thơ, Triển lãm của em, Kỷ niệm dưới mái trường, Lời chúc, Việc tốt và Góc sáng tạo của em.
- Mục Bông hoa việc tốt có thêm 4 câu chuyện mẫu: chia sẻ bút màu, xếp sách, phụ cô phát vở và chào buổi sáng; học sinh nên chỉnh lời kể cho đúng trải nghiệm thật trước khi giới thiệu như chuyện của mình.
- Thanh menu cố định, liên kết cuộn đến từng chuyên mục; các hiệu ứng xuất hiện khi cuộn được kích hoạt lại khi điều hướng đến mục.
- Trình xem ảnh phóng lớn có nút đóng, xem ảnh trước/sau, tự chạy và tạm dừng; ảnh được tải trì hoãn để giảm tải ban đầu.
- Ảnh dọc trong album được căn vừa khung để xem trọn ảnh, không bị cắt mất nội dung.
- Hiệu ứng cánh hoa rơi nhẹ và điểm xuyết hoa điểm 10; tôn trọng cài đặt giảm chuyển động của thiết bị.
- Nhạc nền `wwwroot/bui-phan.mp3` có nút điều khiển phát/tạm dừng và âm lượng.
- Nội dung lời tri ân dành riêng cho cô Mai và các thầy cô nhân Ngày Nhà giáo Việt Nam 20/11.
- Giao diện trang trí theo phong cách sổ lưu bút thiếu nhi, màu sắc tươi sáng, có hiệu ứng chuyển động và hỗ trợ màn hình di động.
- Website được triển khai qua GitHub Pages: https://sunshine2612.github.io/chilang-20-11/.

### Nội dung đang chờ bổ sung

Hai bài thơ mới đã được thêm vào mục Văn học tuổi thơ: “Cô giáo em” của Khánh Trân và “Người gieo hạt” của Vũ Minh Diệp Chi. Phần ảnh JPG mới gửi cho mục Triển lãm của em vẫn đang chờ tích hợp. Chưa commit, push hoặc publish thay đổi này.
