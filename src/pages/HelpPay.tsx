import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HelpPay() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col relative pb-safe">
      {/* Header & Gradient Background */}
      <div className="bg-gradient-to-b from-[#2B5AED] to-[#8CA8F9] text-white pt-12 pb-32 px-4 relative shrink-0">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-medium">帮我付</span>
          <button className="p-1 border border-white/30 rounded-full bg-white/10">
            <MoreHorizontal size={20} />
          </button>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold mb-2 flex items-center justify-center gap-1">
            <span className="text-2xl font-normal">¥</span>500
          </div>
          <p className="text-sm text-white/80">申请代付-集运订单</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 -mt-20 relative z-10 flex-1">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">用户ID查找帮付人</h3>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <input 
              type="text" 
              placeholder="输入对方ID，找帮付好友" 
              className="w-full bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
            />
          </div>

          <button className="w-full bg-[#4A85F6] text-white rounded-full py-4 font-medium text-lg shadow-md shadow-blue-500/20">
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
