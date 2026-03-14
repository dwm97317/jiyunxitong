# Danh sách các trang đã tích hợp / Integrated Pages List

Dự án đã được tích hợp thành công từ 5 dự án con thành 1 dự án thống nhất.

## URL chính / Main URL
- **Development**: http://localhost:3000
- **Command**: `npm run dev`

## Tổng quan / Overview
Tổng cộng có **16 màn hình/trang** được tích hợp từ các dự án:
- hjgghjghjhjg
- kjhjkkjhkj  
- klmklnkjlkjl
- dwm97317iyunxitong
- dwm97317-iyunxitong

---

## Danh sách 16 trang / List of 16 Pages

### 1. Trang chủ / Home Page
- **Screen**: `home`
- **Component**: `HomePage`
- **Nguồn**: Dự án gốc
- **Mô tả**: Trang chủ với các tính năng chính và chuyển đổi ngôn ngữ

### 2. Danh sách đơn hàng / Package List
- **Screen**: `packageList`
- **Component**: `PackageList`
- **Nguồn**: hjgghjghjhjg, dwm97317-iyunxitong
- **Mô tả**: Danh sách các đơn hàng với trạng thái

### 3. Chi tiết đơn hàng / Order Detail
- **Screen**: `orderDetail`
- **Component**: `OrderDetail`
- **Nguồn**: hjgghjghjhjg, dwm97317-iyunxitong
- **Mô tả**: Thông tin chi tiết đơn hàng

### 4. Quét mã / Scanner
- **Screen**: `scanner`
- **Component**: `Scanner`
- **Nguồn**: hjgghjghjhjg, dwm97317-iyunxitong
- **Mô tả**: Quét mã vạch/QR code

### 5. Tra cứu đơn hàng / Check Express
- **Screen**: `checkExpress`
- **Component**: `CheckExpress`
- **Nguồn**: kjhjkkjhkj
- **Mô tả**: Tra cứu thông tin đơn hàng theo mã vận đơn

### 6. Theo dõi vận chuyển / Logistics Tracking
- **Screen**: `logistics`
- **Component**: `LogisticsTracking`
- **Nguồn**: dwm97317iyunxitong
- **Mô tả**: Theo dõi chi tiết lộ trình vận chuyển với bản đồ

### 7. Quản lý kho - Tab Cá nhân / Warehouse - Personal Tab
- **Screen**: `warehouse` (activeTab: 0)
- **Component**: `WarehouseManagement`
- **Nguồn**: klmklnkjlkjl
- **Mô tả**: Quản lý kho hàng cá nhân - Gửi hàng, quét mã

### 8. Quản lý kho - Tab Tập vận / Warehouse - Consolidation Tab
- **Screen**: `warehouse` (activeTab: 1)
- **Component**: `WarehouseManagement`
- **Nguồn**: klmklnkjlkjl
- **Mô tả**: Quản lý kho tập vận - Gửi hàng nhóm

### 9. Quản lý kho - Tab Container / Warehouse - Container Tab
- **Screen**: `warehouse` (activeTab: 2)
- **Component**: `WarehouseManagement`
- **Nguồn**: klmklnkjlkjl
- **Mô tả**: Quản lý container - Gửi hàng số lượng lớn

### 10-16. Các tab tra cứu / Check Express Tabs
Trong màn hình CheckExpress có 7 tabs lọc:
- **Tab 10**: 全部 (Tất cả)
- **Tab 11**: 未入库 (Chưa nhập kho)
- **Tab 12**: 已入库 (Đã nhập kho)
- **Tab 13**: 未打包 (Chưa đóng gói)
- **Tab 14**: 未付款 (Chưa thanh toán)
- **Tab 15**: 未发货 (Chưa gửi hàng)
- **Tab 16**: 已发货 (Đã gửi hàng)

---

## Luồng điều hướng / Navigation Flow

```
HomePage (home)
├── PackageList (packageList)
│   ├── OrderDetail (orderDetail)
│   └── Scanner (scanner)
├── CheckExpress (checkExpress)
│   └── LogisticsTracking (logistics)
└── WarehouseManagement (warehouse)
    ├── Tab 0: 个人件
    ├── Tab 1: 集运件
    └── Tab 2: 整柜直达
```

---

## Tính năng chính / Main Features

### Từ hjgghjghjhjg & dwm97317-iyunxitong:
- ✅ Quản lý danh sách đơn hàng
- ✅ Xem chi tiết đơn hàng
- ✅ Quét mã vạch/QR

### Từ kjhjkkjhkj:
- ✅ Tra cứu đơn hàng theo mã vận đơn
- ✅ Lọc đơn hàng theo trạng thái (7 tabs)
- ✅ Hiển thị thông tin chi tiết vận đơn

### Từ klmklnkjlkjl:
- ✅ Quản lý kho với 3 loại hình (Cá nhân, Tập vận, Container)
- ✅ Banner quảng cáo động theo tab
- ✅ Thông báo và hỗ trợ khách hàng

### Từ dwm97317iyunxitong:
- ✅ Theo dõi vận chuyển với bản đồ
- ✅ Timeline chi tiết lộ trình
- ✅ Thông tin nhiều mã vận đơn

---

## Hỗ trợ đa ngôn ngữ / Multi-language Support
- 🇨🇳 Tiếng Trung (Chinese)
- 🇺🇸 Tiếng Anh (English)
- 🇻🇳 Tiếng Việt (Vietnamese)

---

## Công nghệ / Technology Stack
- React 19
- TypeScript
- Tailwind CSS 4
- Vite 6
- Lucide Icons

---

## Ghi chú / Notes
- Tất cả các tính năng từ 5 dự án con đã được tích hợp hoàn chỉnh
- Không còn sử dụng PlaceholderScreen
- Tất cả các màn hình đều hoạt động độc lập và có thể điều hướng qua lại
- Responsive design cho mobile (375x812px)
