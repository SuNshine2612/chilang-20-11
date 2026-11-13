# Khu vườn tri ân — Báo tường Chi Lăng

## Mở dự án

- Trong Visual Studio 2026 có workload **ASP.NET and web development** và .NET 10 SDK, mở `ChiLang.slnx`. Chọn profile **ChiLang**, bấm **Ctrl+F5** để xem trang.
- Để xem offline, mở trực tiếp `wwwroot/index.html` bằng trình duyệt. Giữ nguyên thư mục `wwwroot` khi sao chép sang máy khác.
- Có thể chạy từ terminal tại thư mục dự án bằng `dotnet run --project ChiLang.csproj`.

Trang dùng HTML, CSS, JavaScript thuần và minh họa SVG cục bộ. ASP.NET Core phục vụ các tệp tĩnh khi chạy dự án trong Visual Studio.

## Biên tập báo của lớp

1. Mở `wwwroot/content.js` và điền `className`. Thay các bài và lời chúc mẫu bằng nội dung lớp thực hiện. Giữ nguyên các tên trường như `title`, `body` và `kind`. Dùng `\n` để xuống dòng trong thơ.
2. Chép ảnh tranh và bài viết tay vào `wwwroot/images/tranh/`. Thêm tranh vào `exhibitionArt` và ảnh bài viết tay vào `exhibitionWriting`. Điền `src` theo đường dẫn tương đối từ `wwwroot`, cùng với `title` và `alt`. Với bài viết tay, điền thêm `author`. Thiệp có hình minh họa riêng trong `card`.
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
- Nhạc nền `wwwroot/bui-phan.mp3` có nút phát/tạm dừng.
- Nội dung lời tri ân dành riêng cho cô Mai và các thầy cô nhân Ngày Nhà giáo Việt Nam 20/11.
- Giao diện trang trí theo phong cách sổ lưu bút thiếu nhi, màu sắc tươi sáng, có hiệu ứng chuyển động và hỗ trợ màn hình di động.
- Website được triển khai qua GitHub Pages: https://sunshine2612.github.io/chilang-20-11/.
- Hai bài thơ “Cô giáo em” của Trần Hoàng Khánh Trân và “Người gieo hạt” của Vũ Minh Diệp Chi có bản chữ trong Văn học tuổi thơ và ảnh bài viết tay trong Triển lãm của em. Các ảnh JPG bổ sung đã được tích hợp vào triển lãm.

## Vườn cây tri ân

Mỗi trình duyệt lưu số cây đã gieo bằng localStorage. Vườn hoạt động trên GitHub Pages và khi mở báo tường offline. Cảnh ngày đêm được chọn theo giờ Việt Nam và có thể đổi bằng nút trong vườn.
