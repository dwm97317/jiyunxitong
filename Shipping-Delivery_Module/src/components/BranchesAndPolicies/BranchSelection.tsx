import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Globe } from 'lucide-react';

export default function BranchSelection({ onBack }: { onBack?: () => void }) {
  const [selectedId, setSelectedId] = useState<number>(1);

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-20 font-sans">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm border-b border-gray-50">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">选择线下网点</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        
        {/* CARD 1: MÀU XANH DƯƠNG (Có Tên chi nhánh) */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-transparent">
          <div 
            onClick={() => setSelectedId(1)}
            className="bg-[#4B8BFF] px-4 py-3 flex justify-between items-center cursor-pointer text-white"
          >
            <div className="flex items-center text-[15px] font-medium tracking-wide">
              <Globe size={18} className="mr-2 opacity-90" /> 我绑定的网点
            </div>
            <div className="flex items-center justify-center w-5 h-5 rounded-full border-[1.5px] border-white">
              {selectedId === 1 && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
            </div>
          </div>
          <div className="p-4 space-y-4">
             <div className="flex items-center">
                <div className="w-5 flex justify-center mr-2"><div className="w-3 h-3 border-[1.5px] border-gray-400 rounded-[3px]"></div></div>
                <span className="text-gray-600 text-[14px] w-20">网点名称</span>
                <span className="text-gray-900 text-[14px] flex-1 text-right font-medium">江西南昌网点</span>
             </div>
             <div className="flex items-start">
                <div className="w-5 flex justify-center mr-2 mt-1"><div className="w-3.5 h-3.5 border-[1.5px] border-gray-400 relative"><div className="absolute inset-0 m-auto w-1 h-1 bg-gray-400"></div></div></div>
                <span className="text-gray-600 text-[14px] w-20">网点地址</span>
                <span className="text-gray-900 text-[14px] flex-1 text-right leading-snug">江西省-南昌市-中节能国际中心3号楼，XXXX室，XXX柜台</span>
             </div>
             <div className="mt-2">
                <input type="text" placeholder="请输入电话号码" className="w-full bg-[#F4F5F7] px-4 py-3 rounded-xl text-[14px] outline-none placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all" />
             </div>
          </div>
        </div>

        {/* CARD 2: MÀU TÍM (KHÔNG CÓ Tên chi nhánh, giống hệt ảnh) */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-transparent">
          <div 
            onClick={() => setSelectedId(2)}
            className="bg-[#8B5CF6] px-4 py-3 flex justify-between items-center cursor-pointer text-white"
          >
            <div className="flex items-center text-[15px] font-medium tracking-wide">
              <Globe size={18} className="mr-2 opacity-90" /> 河北秦皇岛网点
            </div>
            <div className="flex items-center justify-center w-5 h-5 rounded-full border-[1.5px] border-white">
              {selectedId === 2 && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
            </div>
          </div>
          <div className="p-4 space-y-4">
             <div className="flex items-start">
                <div className="w-5 flex justify-center mr-2 mt-1"><div className="w-3.5 h-3.5 border-[1.5px] border-gray-400 relative"><div className="absolute inset-0 m-auto w-1 h-1 bg-gray-400"></div></div></div>
                <span className="text-gray-600 text-[14px] w-20">网点地址</span>
                <span className="text-gray-900 text-[14px] flex-1 text-right leading-snug">江西省-南昌市-中节能国际中心3号楼，XXXX室，XXX柜台</span>
             </div>
             <div className="mt-2">
                <input type="text" placeholder="请输入电话号码" className="w-full bg-[#F4F5F7] px-4 py-3 rounded-xl text-[14px] outline-none placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all" />
             </div>
          </div>
        </div>

      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 left-0 right-0 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <button onClick={onBack} className="w-full py-3.5 rounded-full text-white font-medium text-[16px] bg-[#4B8BFF] shadow-md shadow-blue-200 active:scale-[0.98] transition-all">
          确定
        </button>
      </div>
    </div>
  );
}