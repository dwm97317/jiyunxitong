# 快速启动指南 / Hướng dẫn Khởi động Nhanh

## 🚀 5分钟快速开始 / Bắt đầu trong 5 phút

### 步骤 1: 安装依赖 / Bước 1: Cài đặt Dependencies
```bash
cd Shipping-Delivery_Module
npm install
```

### 步骤 2: 启动开发服务器 / Bước 2: Khởi động Dev Server
```bash
npm run dev
```

### 步骤 3: 打开浏览器 / Bước 3: Mở Trình duyệt
访问 / Truy cập: **http://localhost:5173/**

---

## 📱 功能导航 / Điều hướng Chức năng

### 首页模块 / Module Trang chủ (4 mục menu)

1. **首页模块 / Trang chủ**
   - 查询快递 / Tra cứu vận đơn
   - 扫码功能 / Quét mã
   - 快速导航 / Điều hướng nhanh

2. **包裹列表 / Danh sách đơn**
   - 查看所有订单 / Xem tất cả đơn hàng
   - 订单详情 / Chi tiết đơn hàng
   - 扫码取件 / Quét mã lấy hàng

3. **快递查询 / Tra cứu vận đơn**
   - 7个状态筛选 / 7 bộ lọc trạng thái
   - 物流追踪 / Theo dõi vận chuyển
   - 详细信息 / Thông tin chi tiết

4. **仓库管理 / Quản lý kho**
   - 个人件 / Hàng cá nhân
   - 集运件 / Hàng tập vận
   - 整柜直达 / Container trực tiếp

### 寄件物流模块 / Module Logistics Gửi hàng (7 Phase)

5. **Phase 1: 收件流程**
   - 填写收件人信息 / Điền thông tin người nhận
   - 选择货物名称 / Chọn tên hàng hóa

6. **Phase 2: 物流方式**
   - 选择快递/物流 / Chọn Express/Logistics
   - 一票一件/多件 / Một hoặc nhiều kiện

7. **Phase 3: 货物详情**
   - 货物信息 / Thông tin hàng
   - 超大件处理 / Xử lý hàng quá khổ

8. **Phase 4: 批量寄件**
   - 添加多个收件人 / Thêm nhiều người nhận
   - 选择网点 / Chọn điểm giao dịch

9. **Phase 5: 特殊服务**
   - 保价服务 / Bảo hiểm
   - 网点自提 / Tự lấy tại điểm
   - 大票直达 / Vận đơn lớn

10. **Phase 6: 价格时效**
    - 查看价格表 / Xem bảng giá
    - 运费计算器 / Máy tính cước phí

11. **Phase 7-8: 规则政策**
    - 违禁物品 / Hàng cấm
    - 服务协议 / Thỏa thuận dịch vụ

---

## 🎮 交互说明 / Hướng dẫn Tương tác

### 如何切换页面 / Cách Chuyển trang
1. 点击左侧菜单项 / Click mục menu bên trái
2. 页面自动切换 / Trang tự động chuyển
3. 使用返回按钮返回 / Dùng nút quay lại

### 如何使用表单 / Cách Sử dụng Form
1. 填写必填字段 / Điền các trường bắt buộc
2. 点击保存/提交 / Click lưu/gửi
3. 查看确认信息 / Xem thông tin xác nhận

### 如何切换语言 / Cách Chuyển đổi Ngôn ngữ
1. 在首页模块中 / Trong module trang chủ
2. 点击右上角语言按钮 / Click nút ngôn ngữ góc phải
3. 选择语言 / Chọn ngôn ngữ

---

## 🛠️ 常用命令 / Lệnh Thường dùng

```bash
# 开发模式 / Chế độ Development
npm run dev

# 构建生产版本 / Build Production
npm run build

# 预览生产版本 / Preview Production
npm run preview

# 代码检查 / Kiểm tra Code
npm run lint
```

---

## 📸 截图预览 / Xem trước Ảnh chụp

### 侧边栏菜单 / Menu Sidebar
- 11个菜单项 / 11 mục menu
- 双语显示 / Hiển thị song ngữ
- 激活状态高亮 / Trạng thái active được highlight

### 首页模块 / Module Trang chủ
- 移动端模拟器外观 / Giao diện giả lập mobile
- 状态栏和 Home Indicator / Status bar và Home Indicator
- 流畅的页面切换 / Chuyển trang mượt mà

### 寄件物流模块 / Module Logistics
- 桌面端展示 / Hiển thị desktop
- 多个 Phase 切换 / Chuyển đổi nhiều Phase
- 丰富的交互组件 / Nhiều component tương tác

---

## ❓ 常见问题 / Câu hỏi Thường gặp

### Q: 如何添加新页面? / Làm sao thêm trang mới?
A: 在 `src/components/` 创建新组件,然后在 `App.tsx` 的 `menuItems` 数组中添加菜单项。
Tạo component mới trong `src/components/`, sau đó thêm mục menu vào mảng `menuItems` trong `App.tsx`.

### Q: 如何修改样式? / Làm sao sửa style?
A: 使用 Tailwind CSS 类名直接在组件中修改,或在 `index.css` 中添加自定义样式。
Dùng class Tailwind CSS trực tiếp trong component, hoặc thêm style tùy chỉnh trong `index.css`.

### Q: 如何添加新语言? / Làm sao thêm ngôn ngữ mới?
A: 在 `src/i18n/translations.ts` 中添加新的语言对象。
Thêm object ngôn ngữ mới trong `src/i18n/translations.ts`.

---

## 🐛 遇到问题? / Gặp vấn đề?

### 端口被占用 / Port bị chiếm
```bash
# 使用其他端口 / Dùng port khác
npm run dev -- --port 3000
```

### 依赖安装失败 / Cài đặt dependencies thất bại
```bash
# 清除缓存重新安装 / Xóa cache và cài lại
rm -rf node_modules package-lock.json
npm install
```

### 页面不显示 / Trang không hiển thị
1. 检查浏览器控制台错误 / Kiểm tra lỗi console
2. 确认组件导入正确 / Xác nhận import component đúng
3. 检查 TypeScript 类型错误 / Kiểm tra lỗi type TypeScript

---

## 📚 更多文档 / Tài liệu Thêm

- [完整整合报告 / Báo cáo Tích hợp](./INTEGRATION-COMPLETE.md)
- [导航机制指南 / Hướng dẫn Cơ chế Điều hướng](../NAVIGATION-MECHANISM-GUIDE.md)
- [转换状态分析 / Phân tích Trạng thái Chuyển đổi](../SHIPPING-MODULE-CONVERSION-STATUS.md)

---

**祝你使用愉快! / Chúc bạn sử dụng vui vẻ!** 🎉
