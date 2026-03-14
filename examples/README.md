# Ví dụ về Prompt Caching và System Message

Thư mục này chứa các ví dụ minh họa nguyên tắc "Dùng System Message thay vì sửa System Prompt" từ bài viết về xây dựng Claude Code.

## Các file

### 1. `prompt-caching-demo.md`
Giải thích chi tiết về:
- Tại sao không nên sửa system prompt
- Cách dùng system message đúng cách
- So sánh chi phí giữa 2 cách
- Checklist thiết kế hệ thống

### 2. `system-message-implementation.tsx`
Code mẫu TypeScript/React cho:
- Cấu trúc system prompt tĩnh
- Hàm tạo system message động
- Cách gọi API đúng cách
- Component React áp dụng pattern

## Nguyên tắc cốt lõi

```
System Prompt (TĨNH) = Thông tin không đổi
    ↓
User Message (ĐỘNG) = Context + Query
```

## Chạy ví dụ

```bash
# Đọc tài liệu
cat examples/prompt-caching-demo.md

# Xem code mẫu
cat examples/system-message-implementation.tsx
```

## Áp dụng vào dự án của bạn

1. Tách thông tin tĩnh vào system prompt
2. Đưa thông tin động vào user message
3. Dùng thẻ `<system-reminder>` để đánh dấu
4. Kiểm tra không có timestamp trong system prompt
