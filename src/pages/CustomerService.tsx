import { ChevronLeft, MoreHorizontal, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomerService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col relative pb-safe">
      {/* Header & Gradient Background */}
      <div className="bg-gradient-to-b from-[#2B5AED] to-[#8CA8F9] text-white pt-12 pb-32 px-4 relative shrink-0">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-medium">极光转运在线客服</span>
          <button className="p-1 border border-white/30 rounded-full bg-white/10">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="px-4 -mt-24 relative z-10 flex-1 flex flex-col gap-4 overflow-y-auto pb-24">
        <div className="text-center text-xs text-white/80 mb-2">05-15 12:30</div>
        
        {/* Bot Message */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xl">🤖</div>
          </div>
          <div className="bg-white rounded-2xl rounded-tl-none p-4 text-sm text-gray-800 shadow-sm leading-relaxed">
            Hi，晚上好~小极很高兴为您服务，遇到问题欢迎随时联系小极为您效劳哦~
          </div>
        </div>

        {/* Quick Questions Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-2">
          <div className="flex border-b border-gray-100">
            {['热点', '寄件', '查件', '售后'].map((tab, i) => (
              <button key={i} className={`flex-1 py-3 text-sm font-medium ${i === 0 ? 'text-[#2B5AED] border-b-2 border-[#2B5AED]' : 'text-gray-500'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4 flex flex-col gap-4">
            {['全国城市-疫情影响公告', '价格查询', '查询货物能否收寄', '我需要运单或者订单催单'].map((q, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-gray-800">{q}</span>
                <ChevronLeft size={16} className="text-gray-400 rotate-180" />
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-1 pb-4">
            <div className="w-4 h-1.5 bg-[#2B5AED] rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-blue-200 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Quick Actions Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-2">
           <div className="flex border-b border-gray-100">
            <button className="px-6 py-3 text-sm font-medium text-[#2B5AED] border-b-2 border-[#2B5AED]">寄件查询</button>
            <button className="px-6 py-3 text-sm font-medium text-gray-500 bg-gray-50">收寄影响</button>
          </div>
          <div className="p-6 flex justify-between items-center">
            {[
              { icon: '📦', label: '服务查询' },
              { icon: '❕', label: '投诉建议' },
              { icon: '¥', label: '在线理赔' },
              { icon: '📦', label: '我要寄件' },
              { icon: '🔍', label: '我要查件' },
            ].map((action, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-xl">
                  {action.icon}
                </div>
                <span className="text-xs text-gray-500">{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 md:absolute bg-white border-t border-gray-100 p-4 pb-safe flex items-center gap-3 z-20">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 flex items-center justify-between">
          <input type="text" placeholder="请输入消息..." className="bg-transparent outline-none text-sm w-full text-gray-800" />
          <Smile size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}
