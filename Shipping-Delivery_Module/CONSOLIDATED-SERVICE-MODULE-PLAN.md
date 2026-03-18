# 集运服务模块整合计划 / Kế hoạch Tích hợp Module Dịch vụ Tập vận

## 📋 发现 / Phát hiện

feature/service-logistic 分支包含完整的集运服务模块,共 12 个页面组件。
Nhánh feature/service-logistic chứa module dịch vụ tập vận hoàn chỉnh với 12 component trang.

## 📦 已复制的组件 / Các Component Đã sao chép

### 集运服务模块组件 / Component Module Dịch vụ Tập vận

1. ✅ **ApplyPackingView.tsx** - 申请打包 / Đăng ký đóng gói
2. ✅ **PlazaView.tsx** - 集运广场 / Quảng trường tập vận
3. ✅ **PlazaDetailsView.tsx** - 集运详情 / Chi tiết tập vận
4. ✅ **LogisticsDetailsView.tsx** - 物流方案 / Phương án logistics
5. ✅ **ClaimTrackingView.tsx** - 理赔轨迹 / Theo dõi bồi thường
6. ✅ **PredeclareView.tsx** - 包裹预报 / Báo trước gói hàng
7. ✅ **VasView.tsx** - 增值服务 / Dịch vụ giá trị gia tăng
8. ✅ **ClaimsView.tsx** - 在线理赔 / Bồi thường trực tuyến
9. ✅ **ClaimDetailsView.tsx** - 理赔详情 / Chi tiết bồi thường
10. ✅ **ParcelClaimView.tsx** - 包裹认领 / Nhận diện gói hàng

## 🎯 下一步操作 / Bước tiếp theo

### 1. 更新 App.tsx / Cập nhật App.tsx

需要添加新的模块类型和屏幕类型:
Cần thêm loại module và loại màn hình mới:

```typescript
type ModuleType = 'shipping' | 'homepage' | 'consolidated';  // 添加 consolidated
type ConsolidatedScreen = 
  | 'details'        // 物流方案
  | 'plaza'          // 集运广场
  | 'plazaDetails'   // 集运详情
  | 'applyPacking'   // 申请打包
  | 'claim'          // 包裹认领
  | 'predeclare'     // 包裹预报
  | 'vas'            // 增值服务
  | 'claims'         // 在线理赔
  | 'claimDetails'   // 理赔详情
  | 'claimTracking'; // 理赔轨迹
```

### 2. 添加菜单项 / Thêm Menu Items

```typescript
// Consolidated Service Module
{ id: 'logistics', module: 'consolidated', screen: 'details', name: '物流方案 / Phương án logistics', desc: '选择物流服务 / Chọn dịch vụ logistics' },
{ id: 'plaza', module: 'consolidated', screen: 'plaza', name: '集运广场 / Quảng trường tập vận', desc: '集运服务市场 / Thị trường dịch vụ tập vận' },
{ id: 'parcelClaim', module: 'consolidated', screen: 'claim', name: '包裹认领 / Nhận diện gói', desc: '认领包裹 / Nhận diện gói hàng' },
{ id: 'predeclare', module: 'consolidated', screen: 'predeclare', name: '包裹预报 / Báo trước gói', desc: '预报包裹信息 / Báo trước thông tin gói' },
{ id: 'vas', module: 'consolidated', screen: 'vas', name: '增值服务 / Dịch vụ VAS', desc: '额外服务选项 / Tùy chọn dịch vụ thêm' },
{ id: 'claims', module: 'consolidated', screen: 'claims', name: '在线理赔 / Bồi thường online', desc: '理赔申请 / Đăng ký bồi thường' },
```

### 3. 导入组件 / Import Components

```typescript
// Consolidated Service Module Components
import ApplyPackingView from './components/ApplyPackingView';
import PlazaView from './components/PlazaView';
import PlazaDetailsView from './components/PlazaDetailsView';
import LogisticsDetailsView from './components/LogisticsDetailsView';
import ClaimTrackingView from './components/ClaimTrackingView';
import PredeclareView from './components/PredeclareView';
import VasView from './components/VasView';
import ClaimsView from './components/ClaimsView';
import ClaimDetailsView from './components/ClaimDetailsView';
import ParcelClaimView from './components/ParcelClaimView';
```

### 4. 添加渲染逻辑 / Thêm Logic Render

```typescript
{/* Consolidated Service Module */}
{activeModule === 'consolidated' && (
  <div className="flex items-center justify-center min-h-screen py-8">
    <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-gray-900">
      {/* Status Bar */}
      {/* ... */}
      
      <div className="h-full w-full pt-11 overflow-y-auto">
        {consolidatedScreen === 'details' && <LogisticsDetailsView />}
        {consolidatedScreen === 'plaza' && <PlazaView />}
        {consolidatedScreen === 'plazaDetails' && <PlazaDetailsView />}
        {consolidatedScreen === 'applyPacking' && <ApplyPackingView />}
        {consolidatedScreen === 'claim' && <ParcelClaimView />}
        {consolidatedScreen === 'predeclare' && <PredeclareView />}
        {consolidatedScreen === 'vas' && <VasView />}
        {consolidatedScreen === 'claims' && <ClaimsView />}
        {consolidatedScreen === 'claimDetails' && <ClaimDetailsView />}
        {consolidatedScreen === 'claimTracking' && <ClaimTrackingView />}
      </div>
    </div>
  </div>
)}
```

## 📊 完整模块统计 / Thống kê Module Hoàn chỉnh

### 已整合的模块 / Các Module Đã tích hợp

1. **寄件物流模块 / Module Logistics Gửi hàng**: 36 màn hình (7 Phase)
2. **首页查询模块 / Module Trang chủ**: 16 màn hình
3. **集运服务模块 / Module Dịch vụ Tập vận**: 12 màn hình ✅ 新增

**总计 / Tổng cộng**: 64 màn hình

### 未整合的模块 / Module Chưa tích hợp

4. **用户中心模块 / Module Trung tâm Người dùng**: 28 màn hình ⏳

**最终总计 / Tổng cộng Cuối cùng**: 92 màn hình

## 🎨 用户界面布局 / Layout Giao diện

```
┌─────────────────────────────────────────────────────────┐
│  侧边栏 (Sidebar)              │  主内容区 (Main)        │
│                               │                          │
│  首页模块 (4项)                │                          │
│  - 首页                        │                          │
│  - 包裹列表                    │  [移动端模拟器]           │
│  - 快递查询                    │                          │
│  - 仓库管理                    │  或                      │
│                               │                          │
│  寄件物流模块 (7项)            │  [桌面端展示]             │
│  - Phase 1-7                  │                          │
│                               │                          │
│  集运服务模块 (6项) ✅ 新增    │                          │
│  - 物流方案                    │                          │
│  - 集运广场                    │                          │
│  - 包裹认领                    │                          │
│  - 包裹预报                    │                          │
│  - 增值服务                    │                          │
│  - 在线理赔                    │                          │
└─────────────────────────────────────────────────────────┘
```

## 🔧 技术实现细节 / Chi tiết Triển khai Kỹ thuật

### State 管理 / Quản lý State

```typescript
const [activeModule, setActiveModule] = useState<ModuleType>('homepage');
const [activePhase, setActivePhase] = useState<ShippingPhase>(1);
const [currentScreen, setCurrentScreen] = useState<HomepageScreen>('home');
const [consolidatedScreen, setConsolidatedScreen] = useState<ConsolidatedScreen>('details');
```

### 导航处理 / Xử lý Điều hướng

```typescript
const handleMenuClick = (item: MenuItem) => {
  setActiveModule(item.module);
  
  if (item.phase) {
    setActivePhase(item.phase);
  }
  
  if (item.screen) {
    if (item.module === 'homepage') {
      setCurrentScreen(item.screen as HomepageScreen);
    } else if (item.module === 'consolidated') {
      setConsolidatedScreen(item.screen as ConsolidatedScreen);
    }
  }
};
```

## 📝 待办事项 / Danh sách Công việc

- [ ] 更新 App.tsx 添加集运服务模块
- [ ] 测试所有页面切换
- [ ] 检查组件依赖和导入
- [ ] 更新文档
- [ ] 创建集运服务模块使用指南

---

**创建时间 / Thời gian tạo**: 2026-03-18  
**状态 / Trạng thái**: 📋 计划中 / Đang lên kế hoạch
