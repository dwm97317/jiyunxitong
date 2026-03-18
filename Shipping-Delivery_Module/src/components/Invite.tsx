import { useState } from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface InviteProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function Invite({ onBack, onNavigate, onModuleChange }: InviteProps) {
    const [activeTab, setActiveTab] = useState<'proof' | 'record'>('proof');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-20">
        <button onClick={() => onBack?.()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">邀请好友</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Banner Section */}
      <div className="relative bg-[#FF6B00] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute top-4 right-4 text-yellow-300 font-bold text-4xl opacity-50 rotate-12">C</div>
        <div className="absolute top-12 right-12 text-yellow-300 font-bold text-5xl opacity-50 -rotate-12">B</div>
        
        <div className="relative pt-6 pb-12 px-4 z-10">
          <div className="inline-block bg-gradient-to-r from-yellow-200 to-yellow-400 text-orange-800 text-xs px-3 py-1 rounded-r-full font-bold mb-4 -ml-4">
            · 邀请好友活动
          </div>
          
          <div className="space-y-1 mb-6">
            <div className="text-4xl font-black text-white tracking-wider" style={{ WebkitTextStroke: '1.5px #4A1A00', textShadow: '2px 2px 0 #4A1A00' }}>
              邀请好友下单
            </div>
            <div className="text-4xl font-black text-white flex items-baseline tracking-wider" style={{ WebkitTextStroke: '1.5px #4A1A00', textShadow: '2px 2px 0 #4A1A00' }}>
              最高可得
              <span className="text-yellow-400 text-5xl mx-1 italic">666</span>
              元
            </div>
          </div>

          <div className="bg-[#FFF8D6] border-b-4 border-[#8CC63F] rounded-lg py-2 px-4 text-center text-orange-800 font-bold text-sm relative mx-4 shadow-lg">
            丰富现金+优惠券等你来领
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#FF9D00] rounded-full border-2 border-orange-800"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 -mt-6 relative z-10 space-y-4">
        
        {/* Friend Progress Card */}
        <div className="bg-[#FFFDF0] border border-yellow-200 rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <img src="https://picsum.photos/seed/friend/100/100" alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-bold text-gray-800">好友名称</div>
                <div className="text-xs text-gray-500 mt-1">好友再下单5次即可获得666元</div>
              </div>
            </div>
            <button className="w-14 h-14 rounded-full bg-gradient-to-b from-red-400 to-red-600 text-white text-sm font-bold shadow-lg border-2 border-red-200 flex items-center justify-center">
              去提醒
            </button>
          </div>
          <div className="h-3 bg-yellow-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 w-1/2 rounded-full"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm overflow-hidden">
          <button 
            className={`flex-1 py-4 text-sm font-medium ${activeTab === 'proof' ? 'text-orange-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('proof')}
          >
            打款晒单
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-medium ${activeTab === 'record' ? 'text-orange-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('record')}
          >
            邀请记录
          </button>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === 'proof' ? (
            <>
              <ProofItem name="丁**" amount="500" time="刚刚" />
              <ProofItem name="丁**" amount="500" time="1分钟前" />
              <ProofItem name="丁**" amount="500" time="1分钟前" />
              <ProofItem name="丁**" amount="500" time="1分钟前" />
            </>
          ) : (
            <>
              <RecordItem name="XXX" />
              <RecordItem name="XXX" />
            </>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 p-4 pb-safe z-50">
        <button className="w-full bg-[#FF5500] text-white rounded-lg py-3.5 font-bold text-lg border-2 border-[#1A1A1A] shadow-[0_4px_0_#1A1A1A] active:translate-y-1 active:shadow-none transition-all">
          继续邀请
        </button>
      </div>
    </div>
  );
}

function ProofItem({ name, amount, time }: { name: string, amount: string, time: string }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center space-x-3">
        <img src={`https://picsum.photos/seed/${name}/100/100`} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="text-sm text-gray-800">
            {name} 成功提现 <span className="text-orange-500">{amount}</span> 元
          </div>
          <div className="text-xs text-gray-400 mt-1">
            成功获得{amount}元，已到账
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );
}

function RecordItem({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center space-x-3">
        <img src={`https://picsum.photos/seed/${name}/100/100`} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="text-sm text-gray-800">
            您邀请了{name}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            该好友还未下单
          </div>
        </div>
      </div>
      <button className="text-sm text-orange-500 font-medium">
        立即提醒
      </button>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
