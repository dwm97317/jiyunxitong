import { ChevronLeft, MoreHorizontal, Circle, PackageCheck, Lock, ChevronRight } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

const TopBar = ({ title }: { title: string }) => {
    
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-12 text-white">
      <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => onBack?.()} />
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-700/50">
        <MoreHorizontal className="w-4 h-4" />
        <div className="w-[1px] h-3 bg-current opacity-30"></div>
        <Circle className="w-4 h-4" />
      </div>
    </div>
  );
};

const GroupOrderCard = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm text-sm">
    <div className="space-y-2.5 mb-4">
      <div className="flex justify-between">
        <span className="text-gray-500">订单号</span>
        <span className="text-gray-900">SF1437829133905</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">预计发货时间</span>
        <span className="text-gray-900">2022/05/29</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">运送方式</span>
        <span className="text-gray-900">空运</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">地址</span>
        <span className="text-gray-900">West Covina,California US</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">邮编</span>
        <span className="text-gray-900">Zip Code 91790</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-500">货物类型</span>
        <span className="text-gray-900">敏感货</span>
      </div>
    </div>
    
    <div className="border-t border-gray-50 pt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-4">
          <div className="w-1/4 h-full bg-blue-600 rounded-full"></div>
        </div>
        <div className="text-xs">
          <span className="text-blue-600 font-medium">25kg</span>
          <span className="text-gray-400">/120kg</span>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-medium">
          管理拼团
        </button>
      </div>
    </div>
  </div>
);

interface GroupLeaderCenterProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function GroupLeaderCenter({ onBack, onNavigate, onModuleChange }: GroupLeaderCenterProps) {
    
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="bg-blue-600 pb-20">
        <TopBar title="团长中心" />
      </div>

      <div className="px-4 -mt-16 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-gray-900 mb-4">团长功能</h2>
          <div className="flex space-x-3">
            <div 
              onClick={() => navigate('/initiate-group-buy')}
              className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer active:bg-gray-100"
            >
              <div className="bg-blue-100/50 p-2 rounded-full">
                <PackageCheck className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">发起拼团</div>
                <div className="text-xs text-gray-400 flex items-center mt-0.5">
                  立即发起 <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer active:bg-gray-100">
              <div className="bg-blue-100/50 p-2 rounded-full">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">提前锁团</div>
                <div className="text-xs text-gray-400 flex items-center mt-0.5">
                  立即锁团 <ChevronRight className="w-3 h-3 ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-medium text-gray-900 mb-3 px-1">我的拼团</h2>
          <div className="space-y-3">
            <GroupOrderCard />
            <GroupOrderCard />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
