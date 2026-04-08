# UI Copy Guidelines

## Mục tiêu
Giữ toàn bộ wording trong app ngắn gọn, rõ nghĩa, nhất quán và phù hợp mobile-first.

## Nguyên tắc chung
- Ưu tiên **tiếng Việt đầy đủ** cho toàn bộ UI người dùng cuối.
- Tránh trộn Anh - Việt trong cùng một màn nếu không thật sự cần.
- Câu ngắn, dễ đọc, ưu tiên hành động rõ ràng.
- Không viết kiểu marketing quá mức; ưu tiên hữu ích và tự nhiên.
- Một khái niệm chỉ nên có **một cách gọi chính** xuyên suốt app.

## Quy ước wording
### CTA
- Dùng động từ rõ ràng: `Đăng nhập`, `Tiếp tục`, `Lưu thay đổi`, `Đổi món`, `Xem chi tiết`.
- Tránh CTA mơ hồ như `Xác nhận ngay`, `Khám phá thêm` nếu không thật sự cần.

### Loading
- Mẫu nên dùng: `Đang tải ...`
- Ví dụ:
  - `Đang tải dashboard...`
  - `Đang tải thực đơn...`
  - `Đang tải cài đặt...`

### Empty state
- Title ngắn, mô tả cụ thể.
- Ví dụ:
  - `Chưa có lịch tuần`
  - `Timeline luyện tập sẽ xuất hiện ở đây sau khi được tạo.`

### Error state
- Không quá kỹ thuật nếu không cần.
- Ưu tiên:
  - `Đã xảy ra lỗi ngoài dự kiến`
  - `Vui lòng thử lại sau.`
  - CTA: `Thử lại`

### Form copy
- Label ngắn, đúng nghĩa:
  - `Tên hiển thị`
  - `Mật khẩu`
  - `Số điện thoại`
- Placeholder mang tính ví dụ tự nhiên:
  - `tenban@example.com`
  - `Nguyễn Văn A`

## Từ ngữ nên thống nhất
- `Dashboard chi tiết`
- `Tiến độ tuần`
- `Thực đơn hôm nay`
- `Lịch tuần`
- `Lịch tháng`
- `Tóm tắt hồ sơ`
- `Gợi ý từ AI`
- `Đăng xuất`

## Từ nên tránh hoặc hạn chế
- `Pass` -> thay bằng `Đạt` nếu cần hiển thị trạng thái.
- `Workout details` -> `Chi tiết buổi tập`
- `Start this meal plan` -> `Bắt đầu thực đơn này`
- `Open dashboard detail` -> `Mở dashboard chi tiết`

## Khi nào giữ tiếng Anh
Chỉ giữ tiếng Anh khi:
- là tên thương hiệu hoặc tên tính năng cố định
- là thuật ngữ quen thuộc khó dịch hơn bản gốc
- đã được quyết định ở cấp product naming

Ví dụ có thể giữ:
- `FitNutri AI`
- `OTP`
- `Kcal`
- `BMI`, `BMR`

## Checklist trước khi merge UI mới
- [ ] Toàn màn dùng cùng một ngôn ngữ chính
- [ ] CTA ngắn và rõ
- [ ] Loading / Empty / Error có wording phù hợp
- [ ] Label và placeholder không lặp ý
- [ ] Không có text demo kiểu `Lorem ipsum`, `Sample`, `Placeholder`
