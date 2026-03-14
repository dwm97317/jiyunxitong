import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import CenterModal from '../../components/CenterModal';

interface CustomGoodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, qty: number) => void;
}

const CustomGoodsModal: React.FC<CustomGoodsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const handleConfirm = () => {
    if (!name.trim()) {
      alert('Vui lòng nhập tên hàng hóa!');
      return;
    }
    onConfirm(name, quantity);
    // Reset form
    setName('');
    setQuantity(1);
  };

  return (
    <CenterModal isOpen={isOpen} onClose={onClose} title="自定义">
      <div className="space-y-4">
        {/* Ô nhập tên */}
        <div className="bg-[#F8F9FA] rounded-lg p-3">
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入物品名称" 
            className="w-full bg-transparent outline-none text-[15px] text-gray-800 placeholder-gray-400"
          />
        </div>

        {/* Số lượng */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-700 text-[15px]">物品数量</span>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 bg-[#F8F9FA] text-gray-500 hover:bg-gray-100 active:bg-gray-200"><Minus size={16} /></button>
            <span className="px-5 py-1.5 text-sm font-medium border-x border-gray-200 min-w-[3rem] text-center">{quantity} 件</span>
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 active:bg-blue-100"><Plus size={16} /></button>
          </div>
        </div>

        {/* Đơn giá */}
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-700 text-[15px]">物品单价</span>
          <input type="number" placeholder="请输入" className="text-right text-[15px] outline-none w-32 placeholder-gray-300 text-gray-800 bg-transparent" />
        </div>

        {/* Nút hoàn thành */}
        <button onClick={handleConfirm} className="w-full bg-blue-600 text-white rounded-full py-3.5 mt-6 font-medium text-[15px] active:bg-blue-700 transition-colors shadow-md shadow-blue-200">
          完成
        </button>
      </div>
    </CenterModal>
  );
};

export default CustomGoodsModal;