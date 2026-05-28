# React 19 & SCSS Styling Rules

1. **CSS Modules:** Luôn sử dụng SCSS Modules cho các React UI Component (VD: tên file phải kết thúc bằng `.module.scss`). Điều này giúp cô lập style tránh đụng độ toàn cục.
2. **Naming Convention:** Đặt tên class trong SCSS dạng `camelCase` (ví dụ: `.logoBox`, `.headerContainer`) để dễ truy cập qua object `styles` trên React (`styles.logoBox`).
3. **Dynamic Classes:** Nếu phải render class dựa ngoài và trong, hãy gộp qua template string (`\${styles.myClass} \${className}`).
4. **React 19:** Function component làm default, khai báo TypeScript rõ ràng. CSS Reset chỉ dùng trong `app/globals.scss`.
