import { ChevronLeft, MoreHorizontal, Circle, Compass, Clock, User, FileText } from 'lucide-react';
import BottomNavBar from './BottomNavBar';
import { useState } from 'react';

const TopBar = ({ title }: { title: string }) => {
    
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-12">
      <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => onBack?.()} />
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100">
        <MoreHorizontal className="w-4 h-4" />
        <div className="w-[1px] h-3 bg-current opacity-30"></div>
        <Circle className="w-4 h-4" />
      </div>
    </div>
  );
};

const OrderCard = ({ status, statusColor }: { status: string, statusColor: string }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm text-sm">
    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-50">
      <span className="text-gray-900 font-medium">2022/06/07 22:33:22</span>
      <span className={`${statusColor} text-xs`}>{status}</span>
    </div>
    
    <div className="space-y-2.5 mb-4">
      <div className="flex items-center">
        <div className="w-5 flex justify-center mr-2"><Compass className="w-4 h-4 text-gray-400" /></div>
        <span className="text-gray-500 w-20">寄送线路：</span>
        <span className="text-gray-900 flex-1 text-right">环欧视频/化妆品包税专线</span>
      </div>
      <div className="flex items-center">
        <div className="w-5 flex justify-center mr-2"><Clock className="w-4 h-4 text-gray-400" /></div>
        <span className="text-gray-500 w-20">计费重量：</span>
        <span className="text-gray-900 flex-1 text-right">34KG</span>
      </div>
      <div className="flex items-center">
        <div className="w-5 flex justify-center mr-2"><User className="w-4 h-4 text-gray-400" /></div>
        <span className="text-gray-500 w-20">订单编号：</span>
        <span className="text-gray-900 flex-1 text-right">243455543333</span>
      </div>
      <div className="flex items-center">
        <div className="w-5 flex justify-center mr-2"><FileText className="w-4 h-4 text-gray-400" /></div>
        <span className="text-gray-500 w-20">订单金额：</span>
        <span className="text-gray-900 flex-1 text-right">¥ 333.00元</span>
      </div>
    </div>
    
    <div className="border-t border-gray-50 pt-3 flex justify-end items-center">
      <span className="text-gray-600 mr-2">预计收益：</span>
      <span className="text-red-500 font-medium text-base">¥ 200</span>
    </div>
  </div>
);

interface RebateOrdersProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function RebateOrders({ onBack, onNavigate, onModuleChange }: RebateOrdersProps) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-white sticky top-0 z-10">
        <TopBar title="返佣订单" />
        <div className="flex px-2 border-b border-gray-100">
          <div 
            onClick={() => setActiveTab('all')}
            className={`flex-1 text-center py-3 text-sm font-medium relative cursor-pointer ${
              activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            全部订单
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
          <div 
            onClick={() => setActiveTab('pending')}
            className={`flex-1 text-center py-3 text-sm relative cursor-pointer ${
              activeTab === 'pending' ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}
          >
            即将到账
            {activeTab === 'pending' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
          <div 
            onClick={() => setActiveTab('completed')}
            className={`flex-1 text-center py-3 text-sm relative cursor-pointer ${
              activeTab === 'completed' ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}
          >
            已到账
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
          <div 
            onClick={() => setActiveTab('invalid')}
            className={`flex-1 text-center py-3 text-sm relative cursor-pointer ${
              activeTab === 'invalid' ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}
          >
            无效订单
            {activeTab === 'invalid' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 space-y-3">
        <OrderCard status="即将到账" statusColor="text-blue-600" />
        <OrderCard status="交易成功" statusColor="text-green-500" />
        <OrderCard status="交易取消" statusColor="text-gray-400" />
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
