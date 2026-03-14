import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import BottomSheet from '../../components/BottomSheet';
import { BaseModalProps } from '../../types';

interface GoodsNameModalProps extends BaseModalProps {
  onConfirm: (name: string, quantity: number) => void;
}

const GoodsNameModal: React.FC<GoodsNameModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [goodsName, setGoodsName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const handleConfirm = () => {
    if (!goodsName.trim()) {
      alert('Vui lòng nhập tên hàng hóa!');
      return;
    }
    // Gửi dữ liệu về Component cha và đóng modal
    onConfirm(goodsName, quantity);
    
    // Reset form (tùy chọn)
    setGoodsName('');
    setQuantity(1);
    setPrice('');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="请完善货物名称">
      <div className="space-y-4">
        {/* Input Tên Hàng (Có liên kết state) */}
        <input 
          type="text" 
          value={goodsName}
          onChange={(e) => setGoodsName(e.target.value)}
          placeholder="请输入物品名称" 
          className="w-full bg-[#F8F9FA] rounded-xl px-4 py-3.5 outline-none text-[15px] text-gray-800 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all border border-transparent"
        />
        
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-700 text-[15px]">物品数量</span>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))} 
              className="px-3 py-1.5 bg-[#F8F9FA] text-gray-500 hover:bg-gray-100 active:bg-gray-200"
            >
              <Minus size={16} />
            </button>
            <span className="px-5 py-1.5 text-sm font-medium border-x border-gray-200 min-w-[3rem] text-center">
              {quantity} 件
            </span>
            <button 
              onClick={() => setQuantity(quantity + 1)} 
              className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 active:bg-blue-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-700 text-[15px]">物品单价</span>
          <input 
            type="number" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="请输入" 
            className="text-right text-[15px] outline-none w-32 placeholder-gray-300 text-gray-800 bg-transparent" 
          />
        </div>

        <button 
          onClick={handleConfirm} 
          className="w-full bg-blue-600 text-white rounded-full py-3.5 mt-6 font-medium text-[15px] shadow-md shadow-blue-200 active:bg-blue-700 transition-colors"
        >
          完成
        </button>
      </div>
    </BottomSheet>
  );
};

export default GoodsNameModal;