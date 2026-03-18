import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';

// Shipping Delivery Module Components
import Phase1Test from './components/RecipientProcess';
import Phase2Test from './components/ShippingMethod';
import Phase3Test from './components/GoodsInformation';
import Phase4Test from './components/BatchDelivery';
import Phase5Test from './components/SpecialServices';
import Phase6Test from './components/PriceAndTime';
import Phase78Test from './components/BranchesAndPolicies';

// Homepage Module Components
import HomePage from './components/HomePage';
import OrderDetail from './components/OrderDetail';
import PackageList from './components/PackageList';
import Scanner from './components/Scanner';
import CheckExpress from './components/CheckExpress';
import LogisticsTracking from './components/LogisticsTracking';
import WarehouseManagement from './components/WarehouseManagement';

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

type ModuleType = 'shipping' | 'homepage' | 'consolidated';
type ShippingPhase = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type HomepageScreen = 'home' | 'orderDetail' | 'packageList' | 'scanner' | 'checkExpress' | 'logistics' | 'warehouse';
type ConsolidatedScreen = 'details' | 'plaza' | 'plazaDetails' | 'applyPacking' | 'claim' | 'predeclare' | 'vas' | 'claims' | 'claimDetails' | 'claimTracking';

interface MenuItem {
  id: string;
  module: ModuleType;
  name: string;
  desc: string;
  phase?: ShippingPhase;
  screen?: HomepageScreen | ConsolidatedScreen;
}

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('homepage');
  const [activePhase, setActivePhase] = useState<ShippingPhase>(1);
  const [currentScreen, setCurrentScreen] = useState<HomepageScreen>('home');
  const [consolidatedScreen, setConsolidatedScreen] = useState<ConsolidatedScreen>('details');

  // 统一菜单项 / Menu items thống nhất
  const menuItems: MenuItem[] = [
    // Homepage Module
    { id: 'home', module: 'homepage', screen: 'home', name: '首页模块 / Trang chủ', desc: '查询、扫码、快递详情 / Tra cứu, quét mã' },
    { id: 'packageList', module: 'homepage', screen: 'packageList', name: '包裹列表 / Danh sách đơn', desc: '订单管理 / Quản lý đơn hàng' },
    { id: 'checkExpress', module: 'homepage', screen: 'checkExpress', name: '快递查询 / Tra cứu vận đơn', desc: '7个状态筛选 / 7 trạng thái lọc' },
    { id: 'warehouse', module: 'homepage', screen: 'warehouse', name: '仓库管理 / Quản lý kho', desc: '个人/集运/整柜 / Cá nhân/Tập vận/Container' },
    
    // Shipping Delivery Module
    { id: 'phase1', module: 'shipping', phase: 1, name: 'Phase 1: 收件流程 / Quy trình nhận', desc: 'Form người nhận, popup tên hàng' },
    { id: 'phase2', module: 'shipping', phase: 2, name: 'Phase 2: 物流方式 / Phương thức', desc: 'Modal Logistics, Express' },
    { id: 'phase3', module: 'shipping', phase: 3, name: 'Phase 3: 货物详情 / Chi tiết hàng', desc: 'Chọn hàng, Hàng quá khổ' },
    { id: 'phase4', module: 'shipping', phase: 4, name: 'Phase 4: 批量寄件 / Gửi hàng loạt', desc: 'Thêm nhiều người nhận, điểm giao dịch' },
    { id: 'phase5', module: 'shipping', phase: 5, name: 'Phase 5: 特殊服务 / Dịch vụ đặc biệt', desc: 'Bảo hiểm, Tự lấy, Vận đơn lớn' },
    { id: 'phase6', module: 'shipping', phase: 6, name: 'Phase 6: 价格时效 / Giá & thời gian', desc: 'Bảng giá, Máy tính cước phí' },
    { id: 'phase7', module: 'shipping', phase: 7, name: 'Phase 7-8: 规则政策 / Quy định', desc: 'Hàng cấm, Tiêu chuẩn, Thỏa thuận' },
    
    // Consolidated Service Module
    { id: 'logistics', module: 'consolidated', screen: 'details', name: '物流方案 / Phương án logistics', desc: '选择物流服务 / Chọn dịch vụ logistics' },
    { id: 'plaza', module: 'consolidated', screen: 'plaza', name: '集运广场 / Quảng trường tập vận', desc: '集运服务市场 / Thị trường dịch vụ' },
    { id: 'parcelClaim', module: 'consolidated', screen: 'claim', name: '包裹认领 / Nhận diện gói', desc: '认领包裹 / Nhận diện gói hàng' },
    { id: 'predeclare', module: 'consolidated', screen: 'predeclare', name: '包裹预报 / Báo trước gói', desc: '预报包裹信息 / Báo trước thông tin' },
    { id: 'vas', module: 'consolidated', screen: 'vas', name: '增值服务 / Dịch vụ VAS', desc: '额外服务选项 / Tùy chọn dịch vụ thêm' },
    { id: 'claims', module: 'consolidated', screen: 'claims', name: '在线理赔 / Bồi thường online', desc: '理赔申请 / Đăng ký bồi thường' },
  ];

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

  // Homepage 模块的导航处理 / Xử lý điều hướng module Homepage
  const handleHomepageNavigate = (screen: string) => {
    setCurrentScreen(screen as HomepageScreen);
  };

  // Consolidated 模块的导航处理 / Xử lý điều hướng module Consolidated
  const handleConsolidatedNavigate = (screen: string) => {
    setConsolidatedScreen(screen as ConsolidatedScreen);
  };

  return (
    <LanguageProvider>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
        
        {/* 侧边栏菜单 / Sidebar Menu */}
        <div className="w-full md:w-80 bg-white shadow-xl z-50 flex flex-col h-auto md:h-screen sticky top-0">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">集运系统 / Hệ thống Logistics</h1>
            <p className="text-sm text-gray-500 mt-1">完整功能演示 / Demo đầy đủ chức năng</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = activeModule === item.module && 
                (item.phase ? activePhase === item.phase : 
                 item.module === 'homepage' ? item.screen === currentScreen :
                 item.module === 'consolidated' ? item.screen === consolidatedScreen : false);
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border ${
                    isActive
                      ? 'bg-blue-50 border-blue-500 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <div className={`font-semibold text-sm ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                    {item.name}
                  </div>
                  <div className={`text-xs mt-1 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 主内容区域 / Main Content Area */}
        <div className="flex-1 relative overflow-y-auto bg-gray-200">
          {/* Shipping Delivery Module */}
          {activeModule === 'shipping' && (
            <>
              {activePhase === 1 && <Phase1Test />}
              {activePhase === 2 && <Phase2Test />}
              {activePhase === 3 && <Phase3Test />}
              {activePhase === 4 && <Phase4Test />}
              {activePhase === 5 && <Phase5Test />}
              {activePhase === 6 && <Phase6Test />}
              {activePhase === 7 && <Phase78Test />}
            </>
          )}

          {/* Homepage Module */}
          {activeModule === 'homepage' && (
            <div className="flex items-center justify-center min-h-screen py-8">
              <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-gray-900">
                {/* Status Bar Mock */}
                <div className={`h-11 w-full flex justify-between items-center px-6 absolute top-0 left-0 z-50 ${currentScreen === 'scanner' ? 'text-white' : 'text-black'}`}>
                  <span className="text-[14px] font-medium">9:41</span>
                  <div className="flex items-center gap-1.5">
                    {/* Signal */}
                    <div className="flex items-end gap-[2px] h-3">
                      <div className={`w-[3px] h-1.5 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
                      <div className={`w-[3px] h-2 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
                      <div className={`w-[3px] h-2.5 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
                      <div className={`w-[3px] h-3 rounded-sm ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
                    </div>
                    {/* Wifi */}
                    <svg className={`w-4 h-4 ${currentScreen === 'scanner' ? 'text-white' : 'text-black'}`} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" />
                    </svg>
                    {/* Battery */}
                    <div className={`w-6 h-3 rounded-[4px] border border-opacity-30 ${currentScreen === 'scanner' ? 'border-white' : 'border-black'} relative flex items-center p-[1px]`}>
                      <div className={`h-full w-[80%] rounded-[2px] ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
                      <div className={`absolute right-[-3px] top-1/2 -translate-y-1/2 w-[2px] h-1 ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'} rounded-r-sm opacity-30`}></div>
                    </div>
                  </div>
                </div>

                <div className={`h-full w-full ${['checkExpress', 'warehouse', 'logistics'].includes(currentScreen) ? '' : 'pt-11'} overflow-y-auto overflow-x-hidden relative hide-scrollbar`}>
                  {currentScreen === 'home' && <HomePage onNavigate={handleHomepageNavigate} />}
                  {currentScreen === 'orderDetail' && <OrderDetail onBack={() => setCurrentScreen('packageList')} />}
                  {currentScreen === 'packageList' && <PackageList onNavigate={handleHomepageNavigate} />}
                  {currentScreen === 'scanner' && <Scanner onBack={() => setCurrentScreen('packageList')} />}
                  {currentScreen === 'checkExpress' && <CheckExpress onBack={() => setCurrentScreen('home')} onNavigate={handleHomepageNavigate} />}
                  {currentScreen === 'warehouse' && <WarehouseManagement onBack={() => setCurrentScreen('home')} />}
                  {currentScreen === 'logistics' && <LogisticsTracking onBack={() => setCurrentScreen('checkExpress')} />}
                </div>

                {/* Home Indicator Mock */}
                <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1.5 rounded-full z-50 ${currentScreen === 'scanner' ? 'bg-white' : 'bg-black'}`}></div>
              </div>
            </div>
          )}

          {/* Consolidated Service Module */}
          {activeModule === 'consolidated' && (
            <div className="flex items-center justify-center min-h-screen py-8">
              <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-gray-900">
                {/* Status Bar Mock */}
                <div className="h-11 w-full flex justify-between items-center px-6 absolute top-0 left-0 z-50 text-black">
                  <span className="text-[14px] font-medium">9:41</span>
                  <div className="flex items-center gap-1.5">
                    {/* Signal */}
                    <div className="flex items-end gap-[2px] h-3">
                      <div className="w-[3px] h-1.5 rounded-sm bg-black"></div>
                      <div className="w-[3px] h-2 rounded-sm bg-black"></div>
                      <div className="w-[3px] h-2.5 rounded-sm bg-black"></div>
                      <div className="w-[3px] h-3 rounded-sm bg-black"></div>
                    </div>
                    {/* Wifi */}
                    <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" />
                    </svg>
                    {/* Battery */}
                    <div className="w-6 h-3 rounded-[4px] border border-opacity-30 border-black relative flex items-center p-[1px]">
                      <div className="h-full w-[80%] rounded-[2px] bg-black"></div>
                      <div className="absolute right-[-3px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-black rounded-r-sm opacity-30"></div>
                    </div>
                  </div>
                </div>

                <div className="h-full w-full pt-11 overflow-y-auto overflow-x-hidden relative hide-scrollbar">
                  {consolidatedScreen === 'details' && <LogisticsDetailsView selectedService="standard" setSelectedService={() => {}} setView={handleConsolidatedNavigate} />}
                  {consolidatedScreen === 'plaza' && <PlazaView onSelectItem={() => {}} setView={handleConsolidatedNavigate} />}
                  {consolidatedScreen === 'plazaDetails' && <PlazaDetailsView item={{} as any} />}
                  {consolidatedScreen === 'applyPacking' && <ApplyPackingView selectedParcels={[]} onToggleParcel={() => {}} />}
                  {consolidatedScreen === 'claim' && <ParcelClaimView />}
                  {consolidatedScreen === 'predeclare' && <PredeclareView />}
                  {consolidatedScreen === 'vas' && <VasView selectedVas={[]} setSelectedVas={() => {}} />}
                  {consolidatedScreen === 'claims' && <ClaimsView activeTab="available" setActiveTab={() => {}} setView={handleConsolidatedNavigate} setSelectedClaimId={() => {}} />}
                  {consolidatedScreen === 'claimDetails' && <ClaimDetailsView />}
                  {consolidatedScreen === 'claimTracking' && <ClaimTrackingView claim={{} as any} />}
                </div>

                {/* Home Indicator Mock */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-1.5 rounded-full z-50 bg-black"></div>
              </div>
            </div>
          )}
        </div>

      </div>
    </LanguageProvider>
  );
};

export default App;
