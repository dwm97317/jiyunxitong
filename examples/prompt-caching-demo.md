# Demo: Cập nhật trạng thái bằng System Message

## ❌ CÁCH SAI - Sửa System Prompt (Phá hủy cache)

### Lần 1 - System Prompt ban đầu:
```
Bạn là trợ lý lập trình.
Dự án: Hệ thống quản lý kho hàng
Tech Stack: React + TypeScript
Thời gian hiện tại: 9:00 AM, 11/03/2024
File đang mở: PackageList.tsx
```

### Lần 2 - Người dùng mở file khác (10:30 AM):
```
Bạn là trợ lý lập trình.
Dự án: Hệ thống quản lý kho hàng
Tech Stack: React + TypeScript
Thời gian hiện tại: 10:30 AM, 11/03/2024  ← THAY ĐỔI
File đang mở: OrderDetail.tsx              ← THAY ĐỔI
```

**Vấn đề:** System prompt thay đổi → Cache bị phá hủy → AI phải đọc lại toàn bộ → Tốn tiền & chậm

---

## ✅ CÁCH ĐÚNG - Dùng System Message (Giữ nguyên cache)

### Lần 1 - System Prompt (GIỮ NGUYÊN MÃI MÃI):
```
Bạn là trợ lý lập trình.
Dự án: Hệ thống quản lý kho hàng
Tech Stack: React + TypeScript
```

**Tin nhắn người dùng:**
```
<system-reminder>
Thời gian: 9:00 AM, 11/03/2024
File đang mở: PackageList.tsx
</system-reminder>

Hãy thêm tính năng tìm kiếm.
```

### Lần 2 - System Prompt (VẪN GIỮ NGUYÊN):
```
Bạn là trợ lý lập trình.
Dự án: Hệ thống quản lý kho hàng
Tech Stack: React + TypeScript
```

**Tin nhắn người dùng:**
```
<system-reminder>
Thời gian: 10:30 AM, 11/03/2024
File đang mở: OrderDetail.tsx
</system-reminder>

Hãy thêm validation cho form.
```

**Lợi ích:** System prompt không đổi → Cache còn nguyên → Nhanh & rẻ

---

## Ví dụ thực tế với code

### Cách triển khai trong ứng dụng:

```typescript
// ❌ CÁCH SAI
function buildSystemPrompt(currentTime: string, currentFile: string) {
  return `
    Bạn là trợ lý lập trình.
    Dự án: Hệ thống quản lý kho hàng
    Thời gian: ${currentTime}           // ← Thay đổi liên tục
    File: ${currentFile}                // ← Thay đổi liên tục
  `;
}

// Mỗi lần gọi API → System prompt khác nhau → Cache mất
```

```typescript
// ✅ CÁCH ĐÚNG
const STATIC_SYSTEM_PROMPT = `
  Bạn là trợ lý lập trình.
  Dự án: Hệ thống quản lý kho hàng
  Tech Stack: React + TypeScript
  
  Lưu ý: Thông tin về thời gian và file hiện tại 
  sẽ được cung cấp trong thẻ <system-reminder>.
`;

function buildUserMessage(userQuery: string, context: Context) {
  return `
    <system-reminder>
    Thời gian: ${context.currentTime}
    File đang mở: ${context.currentFile}
    Thay đổi gần đây: ${context.recentChanges}
    </system-reminder>
    
    ${userQuery}
  `;
}

// System prompt không đổi → Cache giữ nguyên
// Thông tin động gửi qua user message
```

---

## Các trường hợp áp dụng

### 1. Cập nhật thời gian
```typescript
// ❌ Sai: Sửa system prompt
systemPrompt = `Current time: ${new Date()}`

// ✅ Đúng: Gửi trong message
userMessage = `
  <system-reminder>Time: ${new Date()}</system-reminder>
  ${actualQuery}
`
```

### 2. File được mở/đóng
```typescript
// ❌ Sai: Cập nhật system prompt
systemPrompt = `Open files: ${openFiles.join(', ')}`

// ✅ Đúng: Gửi trong message
userMessage = `
  <system-reminder>
  Open files: ${openFiles.join(', ')}
  </system-reminder>
  ${actualQuery}
`
```

### 3. Thay đổi trong workspace
```typescript
// ❌ Sai: Rebuild system prompt
systemPrompt = `Modified files: ${modifiedFiles}`

// ✅ Đúng: Thông báo qua message
userMessage = `
  <system-reminder>
  Files changed since last message:
  - src/App.tsx (modified)
  - src/utils.ts (created)
  </system-reminder>
  ${actualQuery}
`
```

### 4. Chế độ làm việc
```typescript
// ❌ Sai: Thay đổi system prompt
if (planMode) {
  systemPrompt = "You are in planning mode. Only read, don't write."
}

// ✅ Đúng: Dùng tool hoặc message
userMessage = `
  <system-reminder>
  Mode: Planning (read-only)
  Available actions: explore, analyze, plan
  </system-reminder>
  ${actualQuery}
`
```

---

## So sánh chi phí

### Giả sử:
- System prompt: 10,000 tokens
- Lịch sử hội thoại: 50,000 tokens
- Chi phí: $0.01 per 1K tokens

### Kịch bản: 10 lần tương tác với thay đổi thời gian

**❌ Cách sai (sửa system prompt):**
```
Lần 1: 60,000 tokens × $0.01 = $0.60
Lần 2: 60,000 tokens × $0.01 = $0.60 (cache mất)
...
Lần 10: 60,000 tokens × $0.01 = $0.60

Tổng: $6.00
```

**✅ Cách đúng (system message):**
```
Lần 1: 60,000 tokens × $0.01 = $0.60
Lần 2: 100 tokens × $0.01 = $0.001 (cache hit!)
...
Lần 10: 100 tokens × $0.01 = $0.001

Tổng: $0.60 + $0.009 = ~$0.61
```

**Tiết kiệm: 90%!**

---

## Checklist khi thiết kế hệ thống

- [ ] System prompt chỉ chứa thông tin TĨNH (không bao giờ thay đổi)
- [ ] Thông tin động (thời gian, file, trạng thái) gửi qua user message
- [ ] Dùng thẻ `<system-reminder>` để đánh dấu thông tin hệ thống
- [ ] Không thêm timestamp vào system prompt
- [ ] Không thêm danh sách file động vào system prompt
- [ ] Giữ thứ tự công cụ (tools) cố định

---

## Kết luận

**Nguyên tắc vàng:** 
> System Prompt = Bất biến  
> User Message = Thay đổi

Mọi thông tin có thể thay đổi theo thời gian phải được gửi qua user message, 
không được đưa vào system prompt.
