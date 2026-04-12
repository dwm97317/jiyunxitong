# 故障排除指南 / Hướng dẫn Khắc phục Sự cố

## 🔧 常见问题解决 / Giải quyết Vấn đề Thường gặp

### 问题 1: 页面只显示文本,没有渲染组件
### Vấn đề 1: Trang chỉ hiển thị text, không render component

**症状 / Triệu chứng:**
- 浏览器显示纯文本而不是 UI 组件
- Trình duyệt hiển thị text thuần thay vì UI component

**原因 / Nguyên nhân:**
- `main.jsx` 导入了错误的文件扩展名
- `main.jsx` import sai extension file

**解决方案 / Giải pháp:**
```javascript
// ❌ 错误 / Sai
import App from './App.jsx'

// ✅ 正确 / Đúng
import App from './App.tsx'
```

**已修复 / Đã sửa:** ✅ 此问题已在最新版本中修复
Vấn đề này đã được sửa trong phiên bản mới nhất

---

### 问题 2: 组件导入错误
### Vấn đề 2: Lỗi Import Component

**症状 / Triệu chứng:**
- 控制台显示 "Cannot find module" 错误
- Console hiển thị lỗi "Cannot find module"

**检查步骤 / Các bước Kiểm tra:**

1. **确认文件存在 / Xác nhận file tồn tại:**
```bash
ls Shipping-Delivery_Module/src/components/
```

2. **检查导入路径 / Kiểm tra đường dẫn import:**
```typescript
// 确保路径正确 / Đảm bảo đường dẫn đúng
import HomePage from './components/HomePage';  // ✅
import HomePage from './components/HomePage.tsx';  // ✅
```

3. **检查文件扩展名 / Kiểm tra extension file:**
- TypeScript 文件应该是 `.tsx` 或 `.ts`
- File TypeScript nên là `.tsx` hoặc `.ts`

---

### 问题 3: 开发服务器无法启动
### Vấn đề 3: Dev Server không khởi động

**症状 / Triệu chứng:**
- `npm run dev` 命令失败
- Lệnh `npm run dev` thất bại

**解决方案 / Giải pháp:**

1. **清除依赖并重新安装 / Xóa dependencies và cài lại:**
```bash
cd Shipping-Delivery_Module
rm -rf node_modules package-lock.json
npm install
```

2. **检查端口占用 / Kiểm tra port bị chiếm:**
```bash
# 使用其他端口 / Dùng port khác
npm run dev -- --port 3000
```

3. **检查 Node.js 版本 / Kiểm tra phiên bản Node.js:**
```bash
node --version  # 应该 >= 18.0.0 / Nên >= 18.0.0
```

---

### 问题 4: 页面空白但没有错误
### Vấn đề 4: Trang trắng nhưng không có lỗi

**检查步骤 / Các bước Kiểm tra:**

1. **打开浏览器开发者工具 / Mở DevTools trình duyệt:**
   - 按 F12 或右键 → 检查
   - Nhấn F12 hoặc chuột phải → Inspect

2. **查看 Console 标签 / Xem tab Console:**
   - 检查是否有 JavaScript 错误
   - Kiểm tra có lỗi JavaScript không

3. **查看 Network 标签 / Xem tab Network:**
   - 确认所有资源都成功加载
   - Xác nhận tất cả resources đã load thành công

4. **检查 React 组件 / Kiểm tra React component:**
```typescript
// 在 App.tsx 中添加调试信息
console.log('App component loaded');
console.log('Active module:', activeModule);
console.log('Current screen:', currentScreen);
```

---

### 问题 5: 样式不显示
### Vấn đề 5: Style không hiển thị

**症状 / Triệu chứng:**
- 组件显示但没有样式
- Component hiển thị nhưng không có style

**解决方案 / Giải pháp:**

1. **确认 Tailwind CSS 已配置 / Xác nhận Tailwind CSS đã cấu hình:**
```bash
# 检查是否安装 / Kiểm tra đã cài
npm list tailwindcss
```

2. **检查 index.css 导入 / Kiểm tra import index.css:**
```javascript
// main.jsx 中应该有 / Trong main.jsx nên có
import './index.css'
```

3. **清除缓存 / Xóa cache:**
```bash
# 硬刷新浏览器 / Hard refresh trình duyệt
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

### 问题 6: 语言切换不工作
### Vấn đề 6: Chuyển đổi Ngôn ngữ không hoạt động

**检查步骤 / Các bước Kiểm tra:**

1. **确认 LanguageProvider 包裹了 App / Xác nhận LanguageProvider bao App:**
```typescript
// App.tsx
return (
  <LanguageProvider>
    {/* 你的组件 / Components của bạn */}
  </LanguageProvider>
);
```

2. **检查 localStorage / Kiểm tra localStorage:**
```javascript
// 在浏览器控制台 / Trong console trình duyệt
localStorage.getItem('language')
```

3. **清除 localStorage / Xóa localStorage:**
```javascript
localStorage.clear()
// 然后刷新页面 / Sau đó refresh trang
```

---

### 问题 7: 点击菜单没有反应
### Vấn đề 7: Click menu không phản ứng

**检查步骤 / Các bước Kiểm tra:**

1. **检查 state 更新 / Kiểm tra cập nhật state:**
```typescript
// 在 handleMenuClick 中添加日志
const handleMenuClick = (item: MenuItem) => {
  console.log('Menu clicked:', item);
  setActiveModule(item.module);
  // ...
};
```

2. **检查条件渲染 / Kiểm tra conditional rendering:**
```typescript
// 确保条件正确 / Đảm bảo điều kiện đúng
{activeModule === 'homepage' && <HomePage />}
{activeModule === 'shipping' && <Phase1Test />}
```

3. **检查组件导出 / Kiểm tra export component:**
```typescript
// 组件应该使用 default export / Component nên dùng default export
export default function HomePage() { }
```

---

## 🔍 调试技巧 / Kỹ thuật Debug

### 1. 使用 React DevTools
### 1. Sử dụng React DevTools

安装浏览器扩展:
Cài extension trình duyệt:
- Chrome: React Developer Tools
- Firefox: React Developer Tools

查看组件树和 state:
Xem cây component và state:
- Components 标签 / Tab Components
- Profiler 标签 / Tab Profiler

### 2. 添加调试日志
### 2. Thêm Debug Logs

```typescript
// 在关键位置添加日志 / Thêm logs ở vị trí quan trọng
useEffect(() => {
  console.log('Component mounted');
  console.log('Current state:', { activeModule, currentScreen });
}, [activeModule, currentScreen]);
```

### 3. 检查网络请求
### 3. Kiểm tra Network Requests

打开 Network 标签:
Mở tab Network:
1. 刷新页面 / Refresh trang
2. 查看所有请求 / Xem tất cả requests
3. 检查失败的请求 / Kiểm tra requests thất bại

---

## 📞 获取帮助 / Nhận Trợ giúp

如果以上方法都无法解决问题:
Nếu các phương pháp trên không giải quyết được:

1. **收集信息 / Thu thập Thông tin:**
   - 浏览器控制台的完整错误信息
   - Thông báo lỗi đầy đủ từ console trình duyệt
   - 开发服务器的输出
   - Output từ dev server
   - 你的操作步骤
   - Các bước thao tác của bạn

2. **检查文档 / Kiểm tra Tài liệu:**
   - [INTEGRATION-COMPLETE.md](./INTEGRATION-COMPLETE.md)
   - [QUICK-START.md](./QUICK-START.md)
   - [NAVIGATION-MECHANISM-GUIDE.md](../NAVIGATION-MECHANISM-GUIDE.md)

3. **重新开始 / Bắt đầu Lại:**
```bash
# 完全重置项目 / Reset hoàn toàn dự án
cd Shipping-Delivery_Module
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## ✅ 验证清单 / Checklist Xác minh

在报告问题之前,请确认:
Trước khi báo cáo vấn đề, hãy xác nhận:

- [ ] Node.js 版本 >= 18.0.0
- [ ] 依赖已正确安装 / Dependencies đã cài đúng
- [ ] 开发服务器正在运行 / Dev server đang chạy
- [ ] 浏览器控制台没有错误 / Console không có lỗi
- [ ] 已尝试硬刷新浏览器 / Đã thử hard refresh
- [ ] 已检查文件路径和导入 / Đã kiểm tra đường dẫn và import
- [ ] 已查看相关文档 / Đã xem tài liệu liên quan

---

**最后更新 / Cập nhật Cuối**: 2026-03-18
