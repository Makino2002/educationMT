---
name: create-ui-component
description: "Tạo một React UI Component chuẩn cho dự án (React 19, TypeScript, SCSS). Sử dụng khi cần tạo UI component mới."
user-invocable: true
---

# Tạo React UI Component

## Mục đích

Tạo nhanh và chuẩn xác các UI component dùng chung cho dự án sử dụng React 19, TypeScript và CSS Modules (SCSS). Đảm bảo file được tạo ra tuân thủ các quy tắc linting/formatting đã được định nghĩa trong `package.json`.

## Vị trí lưu trữ mặc định

Các component mặc định sẽ được đặt trong thư mục `frontend/src/components/`. Mở rộng ra các thư mục con tương ứng nếu được yêu cầu đặc tả (VD: `frontend/src/components/ui/`). Với SCSS, luôn đi kèm 1 file `Component.tsx` và 1 file style `Component.module.scss`.

## Workflow thực hiện

1. **Khởi tạo Component**:
   - Giao tiếp với người dùng để lấy Tên Component và logic mô tả.
   - Tạo file `[TênComponent].tsx` và `[TênComponent].module.scss`.
   - Khai báo đầy đủ các interface/type cho Props theo chuẩn TypeScript.

2. **Áp dụng Styling (SCSS Modules)**:
   - Import class từ file scss: `import styles from './[TênComponent].module.scss';`
   - Cung cấp thuộc tính `className` cho thẻ bao ngoài cùng để kết hợp từ CSS tự định nghĩa và file SCSS.

3. **Code Quality Checks**:
   - Sau khi tạo/sửa file xong, sử dụng Tool Terminal để chạy lệnh:
     `npm run format` (Prettier xoá lỗi định dạng)
   - Tiếp tục chạy lệnh:
     `npm run lint:fix` (ESLint sửa các lỗi coding standards nếu có)
   - Hoặc hướng dẫn người dùng tự động chạy nếu tác vụ quá đơn giản.
