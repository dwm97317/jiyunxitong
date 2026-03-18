import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface WalletProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function Wallet({ onBack, onNavigate, onModuleChange }: WalletProps) {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 pt-12 pb-20 px-4 rounded-b-[2rem] relative text-white">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => onBack?.()} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-medium">钱包</span>
          <div className="flex space-x-2">
            <button className="p-1 bg-white/20 rounded-full">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-baseline justify-center space-x-1">
            <span className="text-2xl">¥</span>
            <span className="text-5xl font-bold">500</span>
          </div>
          <div className="text-blue-100 text-sm mt-2">我的余额 (元)</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 -mt-10 relative z-10 flex-1">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <WalletMenuItem title="账户明细" />
          <WalletMenuItem title="收益提现" value="可提现 ¥ 1.00" />
          <WalletMenuItem title="汇款账户" />
          <WalletMenuItem title="上传凭证" />
          <WalletMenuItem title="凭证记录" hasBorder={false} />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-4 bg-white border-t border-gray-100 pb-safe">
        <button className="w-full bg-blue-500 text-white rounded-full py-3.5 font-medium text-lg active:bg-blue-600 transition-colors">
          充值
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}

function WalletMenuItem({ title, value, hasBorder = true }: { title: string, value?: string, hasBorder?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 bg-white active:bg-gray-50 cursor-pointer ${hasBorder ? 'border-b border-gray-100' : ''}`}>
      <span className="text-sm text-gray-800">{title}</span>
      <div className="flex items-center space-x-2">
        {value && <span className="text-sm text-gray-500">{value}</span>}
        <ChevronLeft size={18} className="text-gray-400 rotate-180" />
      </div>
    </div>
  );
}
