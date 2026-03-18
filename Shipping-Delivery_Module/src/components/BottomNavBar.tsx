import { Send, Search, Gift, User } from 'lucide-react';

interface BottomNavBarProps {
  activeTab?: 'send' | 'search' | 'welfare' | 'profile';
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function BottomNavBar({ activeTab = 'profile', onNavigate, onModuleChange }: BottomNavBarProps) {
  
  const handleSendClick = () => {
    // 跳转到寄件物流模块的 Phase 4 / Chuyển đến Phase 4 của module gửi hàng
    if (onModuleChange) {
      onModuleChange('shipping', 'phase4');
    }
  };

  const handleSearchClick = () => {
    // 跳转到首页模块的快递查询 / Chuyển đến tra cứu vận đơn của module trang chủ
    if (onModuleChange) {
      onModuleChange('homepage', 'checkExpress');
    }
  };

  const handleWelfareClick = () => {
    // 跳转到用户中心的福利页面 / Chuyển đến page phúc lợi của trung tâm người dùng
    if (onNavigate) {
      onNavigate('welfare');
    } else if (onModuleChange) {
      onModuleChange('usercenter', 'welfare');
    }
  };

  const handleProfileClick = () => {
    // 跳转到用户中心主页 / Chuyển đến trang chủ trung tâm người dùng
    if (onNavigate) {
      onNavigate('home');
    } else if (onModuleChange) {
      onModuleChange('usercenter', 'home');
    }
  };

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around py-2 pb-safe z-50">
      <TabItem 
        icon={<Send size={24} />} 
        title="寄快递" 
        active={activeTab === 'send'}
        onClick={handleSendClick}
      />
      <TabItem 
        icon={<Search size={24} />} 
        title="查快递" 
        active={activeTab === 'search'}
        onClick={handleSearchClick}
      />
      <TabItem 
        icon={<Gift size={24} />} 
        title="福利" 
        badge="领券"
        active={activeTab === 'welfare'}
        onClick={handleWelfareClick}
      />
      <TabItem 
        icon={<User size={24} />} 
        title="我的" 
        active={activeTab === 'profile'}
        onClick={handleProfileClick}
      />
    </div>
  );
}

function TabItem({ 
  icon, 
  title, 
  active, 
  badge,
  onClick 
}: { 
  icon: React.ReactNode, 
  title: string, 
  active?: boolean, 
  badge?: string,
  onClick?: () => void
}) {
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center space-y-1 relative cursor-pointer ${active ? 'text-blue-600' : 'text-gray-400'}`}
    >
      {badge && (
        <div className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">
          {badge}
        </div>
      )}
      {icon}
      <span className="text-[10px]">{title}</span>
    </div>
  );
}
