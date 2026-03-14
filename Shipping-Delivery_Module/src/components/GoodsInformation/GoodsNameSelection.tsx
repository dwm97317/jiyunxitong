import React, { useState } from 'react';
import { ChevronLeft, Search, CheckCircle2, Plus, MoreHorizontal } from 'lucide-react';

interface GoodsNameSelectionProps {
  onBack: () => void;
  onOpenCustom: () => void;
  onConfirm: (selectedItem: string) => void;
}

const GoodsNameSelection: React.FC<GoodsNameSelectionProps> = ({ onBack, onOpenCustom, onConfirm }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>('包包 (非国际品牌)');
  
  const categories = ['服饰', '配饰', '家居用品', '文具', '汽车用品', '电子产品', '电子周边', '文件', '家庭工具', '食品'];
  const items = ['包包 (非国际品牌)', '裤袜 (非国际品牌)', '裤袜 (非国际品牌)', '牛仔裤 (非国际品牌)', '裙子 (非国际品牌)'];
  const items2 = ['皮带', '项链', '耳钉', '耳环', '手镯'];

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-20">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-3 border-b border-gray-50 shadow-sm">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-medium text-gray-800">货物名称</h1>
        <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="bg-white px-4 py-2 flex items-center gap-3">
        <div className="bg-[#F8F9FA] rounded-full flex items-center px-4 py-2 flex-1">
          <Search size={18} className="text-gray-400 mr-2" />
          <input type="text" placeholder="请输入您的货物名称" className="bg-transparent border-none outline-none flex-1 text-[14px] text-gray-800" />
        </div>
        <button onClick={onBack} className="text-[15px] text-gray-600">取消</button>
      </div>

      {/* Layout chia 2 cột */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-[90px] bg-[#F8F9FA] overflow-y-auto hide-scrollbar">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveCategory(idx)} 
              className={`py-4 text-center text-[14px] relative cursor-pointer ${activeCategory === idx ? 'text-blue-600 bg-white font-medium' : 'text-gray-600'}`}
            >
              {activeCategory === idx && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-600 rounded-r-md"></div>}
              {cat}
            </div>
          ))}
        </div>
        
        {/* Danh sách */}
        <div className="flex-1 bg-white overflow-y-auto p-4 relative hide-scrollbar space-y-2">
          {/* Nhóm 1 */}
          <div className="bg-[#F8F9FA] rounded-xl p-2 space-y-1">
            {items.map((item, i) => {
              const isActive = selectedItem === item;
              return isActive ? (
                <div key={i} className="bg-white rounded-lg p-3 shadow-sm border border-transparent">
                  <div className="flex items-center mb-3">
                    <CheckCircle2 size={18} className="text-blue-600 mr-2 fill-current text-white" />
                    <span className="font-medium text-gray-900 text-[15px]">{item}</span>
                  </div>
                  <div className="pl-6 space-y-3">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-600">物品数量</span>
                      <div className="flex items-center border border-gray-200 rounded bg-white">
                        <button className="w-7 h-6 flex items-center justify-center text-gray-500">-</button>
                        <span className="w-8 text-center border-x border-gray-200 text-[13px]">1</span>
                        <button className="w-7 h-6 flex items-center justify-center text-gray-800">+</button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-600">物品单价</span>
                      <span className="text-gray-400">请输入</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} onClick={() => setSelectedItem(item)} className="flex items-center p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-[18px] h-[18px] rounded-full border border-gray-300 mr-2.5"></div>
                  <span className="text-gray-700 text-[15px]">{item}</span>
                </div>
              );
            })}
          </div>

          {/* Nhóm 2 */}
          <div className="bg-[#F8F9FA] rounded-xl p-2 space-y-1">
            {items2.map((item, i) => (
              <div key={i} onClick={() => setSelectedItem(item)} className="flex items-center p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-[18px] h-[18px] rounded-full border border-gray-300 mr-2.5"></div>
                <span className="text-gray-700 text-[15px]">{item}</span>
              </div>
            ))}
          </div>
          
          {/* Nút mở Popup Custom */}
          <button onClick={onOpenCustom} className="fixed bottom-24 right-6 w-14 h-14 bg-white border border-gray-100 rounded-full flex items-center justify-center text-blue-500 shadow-[0_4px_15px_rgba(0,0,0,0.1)] active:scale-95 z-30 transition-transform">
             <Plus size={28} />
          </button>
        </div>
      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 w-full z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <button onClick={() => onConfirm(selectedItem)} className="w-full bg-blue-600 text-white rounded-full py-3.5 font-medium text-[16px] active:bg-blue-700 transition-colors shadow-md shadow-blue-200">
          确定
        </button>
      </div>
    </div>
  );
};

export default GoodsNameSelection;