import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, CheckCircle2, Copy } from 'lucide-react';

interface AddRecipientProps {
  onBack: () => void;
  onConfirm: (count: number) => void;
}

const AddRecipient: React.FC<AddRecipientProps> = ({ onBack, onConfirm }) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Dữ liệu giả lập dựa theo ảnh
  const recipients = [
    { id: 1, name: '何宇', phone: '187****6669', address: '北京市朝阳区将府家园109号楼1601' },
    { id: 2, name: '何宇', phone: '187****6669', address: '北京市朝阳区将府家园109号楼1601' },
  ];

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-20">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-medium text-gray-800">添加收件人</h1>
        <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 pb-24">
        {recipients.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm relative overflow-hidden transition-colors">
              <div className="flex justify-between items-start mb-1">
                <div className="text-[16px] font-bold text-gray-900">{item.name} <span className="ml-1.5">{item.phone}</span></div>
                <button className="text-gray-500 text-[13px] hover:text-blue-600">编辑</button>
              </div>
              <div className="text-[13px] text-gray-500 mb-4">{item.address}</div>
              
              <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                 <div 
                   onClick={() => toggleSelect(item.id)}
                   className="flex items-center cursor-pointer p-1 -ml-1"
                 >
                   <div className={`w-[20px] h-[20px] rounded-full border-[1.5px] flex items-center justify-center transition-colors ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'}`}>
                     {isSelected && <CheckCircle2 size={16} className="text-white" />}
                   </div>
                 </div>
                 <button className="text-gray-500 hover:text-gray-700 flex items-center text-[13px] gap-1">
                   <Copy size={14} /> 复制
                 </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white px-4 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100 flex gap-3">
        <button className="w-1/3 py-3.5 rounded-full text-gray-700 bg-white border border-gray-200 font-medium text-[15px] active:bg-gray-50">
          创建新地址
        </button>
        <button 
          onClick={() => onConfirm(selectedIds.length)}
          className={`flex-1 py-3.5 rounded-full text-white font-medium text-[16px] transition-all shadow-md ${selectedIds.length > 0 ? 'bg-blue-600 shadow-blue-200 active:scale-[0.98]' : 'bg-blue-400 opacity-80'}`}
        >
          已选 {selectedIds.length} 条
        </button>
      </div>
    </div>
  );
};

export default AddRecipient;