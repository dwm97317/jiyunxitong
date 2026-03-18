import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface InviteStepsProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function InviteSteps({ onBack, onNavigate, onModuleChange }: InviteStepsProps) {
  
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col relative pb-safe">
      {/* Header & Gradient Background */}
      <div className="bg-gradient-to-b from-[#2B5AED] to-[#8CA8F9] text-white pt-12 pb-32 px-4 relative shrink-0">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => onBack?.()} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <button className="p-1 border border-white/30 rounded-full bg-white/10">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold italic tracking-wider mb-2">简单三步邀请好友</h1>
          <p className="text-sm text-white/80">邀请好友填写收货地址</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 -mt-20 relative z-10 flex-1">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-px border-l border-dashed border-gray-300"></div>
            
            {/* Step 1 */}
            <div className="flex items-center gap-4 mb-8 relative z-10 bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#2B5AED] text-white flex items-center justify-center font-bold shrink-0">1</div>
              <div className="flex-1">
                <div className="text-base font-bold text-gray-900 mb-1">分享邀请页面</div>
                <div className="text-xs text-gray-500">发送邀请链接给收件人</div>
              </div>
              <div className="text-3xl">📄</div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 mb-8 relative z-10 bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#2B5AED] text-white flex items-center justify-center font-bold shrink-0">2</div>
              <div className="flex-1">
                <div className="text-base font-bold text-gray-900 mb-1">收件人填写地址</div>
                <div className="text-xs text-gray-500">通知寄件人下单</div>
              </div>
              <div className="text-3xl">🗺️</div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 mb-8 relative z-10 bg-gray-50 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#2B5AED] text-white flex items-center justify-center font-bold shrink-0">3</div>
              <div className="flex-1">
                <div className="text-base font-bold text-gray-900 mb-1">寄件人完成下单</div>
                <div className="text-xs text-gray-500">填写包裹信息完成下单</div>
              </div>
              <div className="text-3xl">🛍️</div>
            </div>
          </div>

          <button className="w-full bg-[#2B5AED] text-white rounded-full py-4 font-medium text-lg mb-4 shadow-md shadow-blue-500/30">
            邀请好友填写收件地址
          </button>
          
          <div className="text-center">
            <button className="text-[#2B5AED] text-sm font-medium">查看邀请记录</button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
