# 🚀 TaskPro - Advanced Task Management Dashboard

[![Live Demo](https://lenam-winter.github.io/TodoList/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![CSS3](https://img.shields.io/badge/CSS3-Modern_UI-1572B6?style=for-the-badge&logo=css3&logoColor=white)]()

Một ứng dụng bảng điều khiển quản lý công việc (Task Management Dashboard) chuyên nghiệp, được xây dựng hoàn toàn bằng **HTML, CSS và Vanilla JavaScript**. Dự án tập trung vào trải nghiệm người dùng (UX) mượt mà, giao diện hiện đại (Dark Theme) và khả năng xử lý dữ liệu, kiểm soát lỗi chặt chẽ.

## 🎯 Điểm nổi bật của dự án (Why this project?)

Khác với các ứng dụng To-do list cơ bản, TaskPro được thiết kế với tư duy của một sản phẩm thực tế (Production-ready). Dự án chú trọng vào **đảm bảo chất lượng (QA)** và xử lý triệt để các trường hợp rủi ro (Edge cases):
- **Bảo vệ dữ liệu đầu vào:** Ngăn chặn lỗi XSS (Cross-Site Scripting) thông qua hàm `sanitizeInput`. Xử lý các trường hợp người dùng nhập rỗng, nhập toàn khoảng trắng hoặc chuỗi quá dài.
- **Tối ưu hóa hiệu năng:** Thuật toán lọc kết hợp tìm kiếm (Live Search) hoạt động mượt mà, không độ trễ.
- **Quản lý trạng thái thông minh:** Trải nghiệm người dùng không bị gián đoạn, dữ liệu được bảo toàn tuyệt đối bằng Local Storage ngay cả khi tải lại trang.

## ✨ Tính năng cốt lõi

* 🔍 **Tìm kiếm trực tiếp (Live Search):** Lọc công việc ngay khi gõ phím.
* 📊 **Dashboard Thống kê:** Theo dõi số lượng công việc (Tổng, Đang chờ, Đã hoàn thành) theo thời gian thực.
* ⏳ **Quản lý thời hạn (Deadline):** Nhận diện và cảnh báo tự động các công việc đã quá hạn.
* 🏷️ **Phân loại ưu tiên:** Gắn thẻ mức độ quan trọng (Cao/Trung bình/Thấp) với mã màu UI/UX rõ ràng.
* 🔔 **Toast Notifications:** Hệ thống thông báo trượt mượt mà thay thế cho Alert truyền thống.
* 💾 **Local Storage:** Lưu trữ dữ liệu an toàn trên trình duyệt.

## 💻 Cấu trúc Công nghệ (Tech Stack)

* **Cốt lõi:** Semantic HTML5, CSS3 (Grid, Flexbox, CSS Variables), ES6+ JavaScript.
* **Kiến trúc Code:** Modular design, tách biệt rõ ràng giữa Data Logic và UI Rendering.
* **Icon:** FontAwesome 6.

## 🚀 Hướng dẫn cài đặt (Installation)

1. Clone repository này về máy:
   ```bash
   git clone [https://github.com/Username_cua_ban/taskpro-dashboard.git](https://github.com/Username_cua_ban/taskpro-dashboard.git)
