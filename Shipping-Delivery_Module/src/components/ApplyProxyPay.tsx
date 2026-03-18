import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface ApplyProxyPayProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function ApplyProxyPay({ onBack, onNavigate, onModuleChange }: ApplyProxyPayProps) {
  
  const orders = [
    { id: 'SF1437829133905', type: '个人件', weight: '65kg', items: '文件*2', amount: '256' },
    { id: 'SF1437829133905', type: '个人件', weight: '65kg', items: '文件*2', amount: '256' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white text-gray-900 pt-12 pb-4 px-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <button onClick={() => onBack?.()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">申请代付</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Card Header */}
            <div className="flex justify-between items-center p-4 bg-orange-50/50 border-b border-orange-100/50">
              <div className="flex items-center gap-2 text-[#2B5AED] font-bold italic text-lg">
                <span className="text-2xl">JG</span> 极光转运
              </div>
              <span className="text-sm text-orange-500">国际出口经济快递</span>
            </div>
            
            {/* Card Body */}
            <div className="p-4 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">运单号</span>
                <span className="text-gray-900">{order.id}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">货物信息</span>
                <span className="text-gray-900">{order.type}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">计费重量</span>
                <span className="text-gray-900">{order.weight}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">物品信息</span>
                <span className="text-gray-900">{order.items}</span>
              </div>
              
              <div className="h-px bg-gray-100 my-1"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">合计</span>
                <span className="text-lg font-bold text-red-500">¥ {order.amount}</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 pt-0 flex justify-end">
              <button className="bg-[#2B5AED] text-white px-6 py-2 rounded-full text-sm font-medium">
                申请代付
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
