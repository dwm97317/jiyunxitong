import { ChevronLeft, MoreHorizontal, Calendar, Search, Send, Gift, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Welfare() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col relative pb-24">
      {/* Header & Blue Background */}
      <div className="bg-[#2B5AED] text-white pt-12 pb-32 px-4 relative rounded-b-[2rem]">
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1.5 text-sm">
            <Calendar size={16} /> 签到记录
          </button>
          <span className="text-lg font-medium absolute left-1/2 -translate-x-1/2">福利</span>
          <div className="flex items-center gap-2">
            <button className="bg-white text-[#2B5AED] rounded-full px-3 py-1.5 text-xs font-medium">
              补签 | 活动规则
            </button>
            <button className="p-1 border border-white/30 rounded-full bg-white/10">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" className="w-14 h-14 rounded-full border-2 border-white" />
            <div>
              <div className="text-xl font-bold mb-1">已连续签到 1 天</div>
              <div className="text-xs text-white/80">明日签到可获得 10金币</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-1 shadow-sm">
            <span className="bg-yellow-200 text-yellow-600 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">¥</span>
            416
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 -mt-24 relative z-10 flex flex-col gap-4">
        
        {/* Sign In Rewards */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">连续签到领好礼</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className={`rounded-xl p-2 flex flex-col items-center justify-center gap-1 ${day === 1 ? 'bg-[#2B5AED] text-white' : 'bg-gray-50 text-gray-500'}`}>
                <div className="text-xs">第{day}天</div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${day === 1 ? 'bg-yellow-400 text-white' : 'bg-yellow-100 text-yellow-500'}`}>¥</div>
                <div className="text-[10px]">10积分</div>
              </div>
            ))}
            <div className="col-span-2 bg-gray-50 rounded-xl p-2 flex items-center justify-between relative overflow-hidden">
              <div className="z-10">
                <div className="text-xs text-gray-500 mb-1">第7天</div>
                <div className="text-[10px] text-gray-400">神秘大礼包</div>
              </div>
              <div className="text-4xl absolute -right-2 -bottom-2 opacity-80">🎁</div>
            </div>
          </div>

          {/* Invite Task */}
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-orange-100 text-orange-500 text-xs font-bold px-1.5 py-0.5 rounded">签<br/>*1</div>
              <div>
                <div className="text-sm font-medium text-gray-900">邀3位好友签到得1张补签卡</div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border border-white flex items-center justify-center text-white text-xs">+</div>)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs">去使用</button>
              <button className="px-3 py-1.5 rounded-full bg-red-500 text-white text-xs">去邀请</button>
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">做任务赚积分</h3>
          <div className="flex flex-col gap-4">
            {[
              { icon: '✓', color: 'bg-blue-100 text-blue-500', title: '关注微信公众号', desc: '积分+20' },
              { icon: '3', color: 'bg-orange-100 text-orange-500', title: '累计签到3天', desc: '连续签到3天额外获得20积分' },
              { icon: '7', color: 'bg-green-100 text-green-500', title: '累计签到7天', desc: '连续签到7天额外获得50积分' },
            ].map((task, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${task.color}`}>{task.icon}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-xs text-gray-400">{task.desc}</div>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-full bg-red-500 text-white text-xs">去完成</button>
              </div>
            ))}
          </div>
        </div>

        {/* Exchange */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">积分换好礼</h3>
          <div className="flex flex-col gap-4">
            {[
              { pts: 20, val: 20, cost: 70 },
              { pts: 50, val: 50, cost: 120 },
              { pts: 80, val: 80, cost: 180 },
              { pts: 100, val: 100, cost: 220 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-lg">{item.pts}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.val}元优惠券</div>
                    <div className="text-xs text-gray-400">{item.cost}积分可兑换</div>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-full bg-red-500 text-white text-xs">领取</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 md:absolute bg-white border-t border-gray-100 flex justify-around items-center pb-safe pt-2 z-50">
        <button className="flex flex-col items-center p-2 text-gray-400">
          <Send size={24} />
          <span className="text-[10px] mt-1">寄快递</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400">
          <Search size={24} />
          <span className="text-[10px] mt-1">查快递</span>
        </button>
        <button className="flex flex-col items-center p-2 text-[#2B5AED] relative">
          <Gift size={24} />
          <span className="text-[10px] mt-1">福利</span>
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] px-1 rounded-full translate-x-1/2 -translate-y-1/4">领券</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-400">
          <User size={24} />
          <span className="text-[10px] mt-1">我的</span>
        </button>
      </div>
    </div>
  );
}
