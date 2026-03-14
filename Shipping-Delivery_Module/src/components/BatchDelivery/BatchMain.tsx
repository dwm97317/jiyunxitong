import React from 'react';
import { ChevronLeft, MoreHorizontal, MapPin, Store, ChevronRight, CheckCircle2 } from 'lucide-react';

interface BatchMainProps {
  onNavigate: (screen: 'ADD_RECIPIENT' | 'ADD_BRANCH') => void;
  recipientCount: number;
  selectedBranch: { name: string; address: string } | null;
}

const BatchMain: React.FC<BatchMainProps> = ({ onNavigate, recipientCount, selectedBranch }) => {
  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10">
      
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm">
        <button className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-medium text-gray-800">批量寄件</h1>
        <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
      </div>

      {/* Content (Có padding-bottom để không bị Bottom Bar che mất chữ) */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-28">
        
        {/* Khối Button Thêm */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Nút Thêm Người Nhận */}
          <div className="p-4 flex items-center justify-between border-b border-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <MapPin size={20} className="text-blue-500" />
              </div>
              <div>
                <div className="text-[16px] font-bold text-gray-800">收件人信息</div>
                <div className="text-[13px] text-gray-400 mt-0.5">选择收件人</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('ADD_RECIPIENT')} 
              className="bg-blue-600 text-white text-[13px] px-5 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
            >
              添加
            </button>
          </div>

          {/* Nút Thêm Điểm Giao Dịch */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center mr-3">
                <Store size={20} className="text-yellow-400" />
              </div>
              <div>
                <div className="text-[16px] font-bold text-gray-800">线下网点自提</div>
                <div className="text-[13px] text-gray-400 mt-0.5">选择线下网点</div>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('ADD_BRANCH')} 
              className="bg-blue-600 text-white text-[13px] px-5 py-1.5 rounded-full font-medium active:scale-95 transition-transform"
            >
              添加
            </button>
          </div>
        </div>

        {/* Khối Thông tin mở rộng (Chỉ hiện khi đã chọn Điểm giao dịch) */}
        {selectedBranch && (
          <div className="mt-4 space-y-4 animate-[fade-in_0.3s_ease-out]">
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-start">
               <div className="bg-yellow-400 text-white p-1.5 rounded-full mr-3 mt-1 shadow-sm">
                 <Store size={16} />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-center mb-1.5">
                   <div className="font-bold text-[16px] text-gray-900 flex items-center">
                     {selectedBranch.name}
                     <span className="bg-red-50 text-red-500 text-[10px] px-1.5 py-0.5 rounded ml-2 font-normal">官方网点</span>
                   </div>
                   <div className="flex items-center text-[12px] text-gray-400 gap-3">
                     <button className="hover:text-gray-600">删除</button>
                     <button className="text-blue-500 hover:text-blue-600 font-medium">编辑</button>
                   </div>
                 </div>
                 <div className="text-[13px] text-gray-500 leading-snug pr-4 truncate">
                   {selectedBranch.address}
                 </div>
               </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm flex justify-between items-center cursor-pointer">
              <span className="text-[15px] text-gray-800 font-medium">货物信息</span>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div className="flex items-center px-1">
               <CheckCircle2 size={18} className="text-blue-600 fill-current text-white mr-2" />
               <span className="text-[13px] text-gray-600">
                 我已阅读并同意遵守 <span className="text-gray-900 font-medium">《极光转运服务条款》</span>
               </span>
            </div>
          </div>
        )}
      </div>

      {/* TẠI ĐÂY LÀ BOTTOM BAR (Thanh Đặt Hàng Phía Dưới Cùng) */}
      <div className="bg-white px-5 py-3 absolute bottom-0 left-0 right-0 z-30 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-between">
        <div>
           <div className="text-[14px] text-gray-600">
             预估时效 <span className="text-blue-600 font-bold ml-1">{selectedBranch ? '后天 17:00 前' : '--'}</span>
           </div>
           <div className="text-[11px] text-gray-400 mt-0.5">最终费用以仓库称重后开单为准</div>
        </div>
        <button 
          className="px-6 py-2.5 rounded-full text-[15px] font-medium bg-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
        >
          立即下单 ({recipientCount})
        </button>
      </div>

    </div>
  );
};

export default BatchMain;