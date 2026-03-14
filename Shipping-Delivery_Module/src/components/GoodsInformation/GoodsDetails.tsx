import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Camera, XCircle, ChevronRight, Search } from 'lucide-react';

interface GoodsDetailsProps {
  onOpenSelection: () => void;
  selectedGoodsName: string;
  onClearGoods: () => void;
}

const GoodsDetails: React.FC<GoodsDetailsProps> = ({ onOpenSelection, selectedGoodsName, onClearGoods }) => {
  const [weight, setWeight] = useState<number>(1);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const tags = ['去掉快递包装', '保留全部包装', '去掉产品包装', '防潮直放', '尽快出库', '贵重物品', '取出收据', '保留快递包装', '易碎物品'];

  const toggleTag = (tag: string) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-medium text-gray-800">货物详情</h1>
        <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        
        {/* Khối Tên Hàng Hóa */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <div className="text-gray-800 font-medium flex items-center">
              货物名称 <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded ml-1.5 font-normal border border-blue-100">必填</span>
            </div>
            <div className="text-blue-500 text-[13px] flex items-center cursor-pointer">收寄标准 <ChevronRight size={14} /></div>
          </div>

          {/* Thay đổi giao diện dựa theo state */}
          {selectedGoodsName ? (
            // Trạng thái đã chọn (Ảnh 4)
            <div className="flex items-center">
               <div className="border border-blue-500 rounded-full pl-3 pr-1 py-1 flex items-center bg-blue-50 text-blue-600 text-[14px]">
                 {selectedGoodsName}
                 <button onClick={onClearGoods} className="ml-1 text-blue-600 p-0.5 rounded-full hover:bg-blue-100">
                    <XCircle size={16} className="fill-current text-white" />
                 </button>
               </div>
            </div>
          ) : (
            // Trạng thái trống (Ảnh 1)
            <div 
              className="bg-[#F8F9FA] rounded-lg p-2.5 flex items-center cursor-pointer border border-transparent hover:border-blue-200 transition-colors" 
              onClick={onOpenSelection}
            >
               <Search size={18} className="text-gray-400 mr-2" />
               <span className="text-gray-400 text-[14px]">请输入您的货物名称</span>
            </div>
          )}
        </div>

        {/* Khối Trọng Lượng */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
          <span className="text-gray-800 font-medium">预估重量</span>
          <div className="flex items-center bg-[#F8F9FA] rounded-lg border border-gray-100 p-0.5">
            <button onClick={() => setWeight(Math.max(1, weight - 1))} className="w-8 h-7 flex items-center justify-center text-gray-500">-</button>
            <span className="w-12 text-center text-[15px] font-medium border-x border-gray-200">{weight} kg</span>
            <button onClick={() => setWeight(weight + 1)} className="w-8 h-7 flex items-center justify-center text-gray-800">+</button>
          </div>
        </div>

        {/* Khối Hình ảnh và Lời nhắn */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-800 font-medium">货物照片和留言</span>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
          
          <div className="flex gap-3 mb-4">
             <div className="w-[84px] h-[84px] bg-[#F8F9FA] border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mb-1">
                  <Camera size={18} className="text-blue-500" />
                </div>
                <span className="text-[11px] text-gray-500">上传图片</span>
             </div>
             <div className="flex-1 bg-[#F8F9FA] rounded-lg p-3 relative">
                <textarea placeholder="留个言吧，方便快递小哥上门取件~" className="w-full h-full bg-transparent outline-none resize-none text-[13px] text-gray-800 placeholder-gray-400"></textarea>
                <span className="absolute bottom-2 right-2 text-[10px] text-gray-400">0/40</span>
             </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => {
               const isActive = activeTags.includes(tag);
               return (
                 <button 
                   key={i} 
                   onClick={() => toggleTag(tag)} 
                   className={`px-3 py-1.5 rounded-full text-[12px] transition-colors border ${isActive ? 'bg-blue-50 text-blue-600 border-blue-200 font-medium' : 'bg-[#F8F9FA] text-gray-600 border-transparent hover:border-gray-200'}`}
                 >
                   {tag}
                 </button>
               );
            })}
          </div>
        </div>

      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <button 
          onClick={() => alert('Đã lưu thông tin chi tiết hàng hóa!')} 
          disabled={!selectedGoodsName}
          className={`w-full py-3.5 rounded-full text-white font-medium text-[16px] transition-all ${selectedGoodsName ? 'bg-blue-600 shadow-md shadow-blue-200 active:scale-[0.98]' : 'bg-blue-300 opacity-80 cursor-not-allowed'}`}
        >
          确定
        </button>
      </div>
    </div>
  );
};

export default GoodsDetails;