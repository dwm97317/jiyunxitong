import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import CenterModal from '../../components/CenterModal';

interface CustomGoodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, qty: number) => void;
}

const CustomGoodsModal: React.FC<CustomGoodsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateName = (value: string): boolean => {
    return value.trim().length > 0 && value.trim().length <= 100;
  };

  const validateQuantity = (value: number): boolean => {
    return value > 0 && value <= 9999 && Number.isInteger(value);
  };

  const handleNameChange = (value: string) => {
    // Only allow letters, numbers, spaces, and Chinese characters
    value = value.replace(/[^\w\s\u4E00-\u9FFF]/g, '');
    setName(value);
    if (errors.name) {
      setErrors({ ...errors, name: '' });
    }
  };

  const handleQuantityChange = (value: number) => {
    if (value > 0 && value <= 9999) {
      setQuantity(value);
      if (errors.quantity) {
        setErrors({ ...errors, quantity: '' });
      }
    }
  };

  const handleConfirm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!validateName(name)) {
      newErrors.name = '物品名称不能为空，最多100个字符';
    }
    if (!validateQuantity(quantity)) {
      newErrors.quantity = '数量必须为1-9999之间的整数';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onConfirm(name, quantity);
      // Reset form
      setName('');
      setQuantity(1);
      setErrors({});
    }
  };

  return (
    <CenterModal isOpen={isOpen} onClose={onClose} title="自定义">
      <div className="space-y-4">
        {/* Ô nhập tên */}
        <div>
          <div className="bg-[#F8F9FA] rounded-lg p-3 mb-1">
            <input 
              type="text" 
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="请输入物品名称" 
              maxLength={100}
              className={`w-full bg-transparent outline-none text-[15px] text-gray-800 placeholder-gray-400 ${errors.name ? 'text-red-500' : ''}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs px-3">{errors.name}</p>}
        </div>

        {/* Số lượng */}
        <div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-gray-700 text-[15px]">物品数量</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => handleQuantityChange(Math.max(1, quantity - 1))} className="px-3 py-1.5 bg-[#F8F9FA] text-gray-500 hover:bg-gray-100 active:bg-gray-200"><Minus size={16} /></button>
              <span className="px-5 py-1.5 text-sm font-medium border-x border-gray-200 min-w-[3rem] text-center">{quantity} 件</span>
              <button onClick={() => handleQuantityChange(quantity + 1)} className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 active:bg-blue-100"><Plus size={16} /></button>
            </div>
          </div>
          {errors.quantity && <p className="text-red-500 text-xs px-3 mt-1">{errors.quantity}</p>}
        </div>

        {/* Nút hoàn thành */}
        <button 
          onClick={handleConfirm} 
          disabled={!name.trim() || quantity < 1}
          className={`w-full rounded-full py-3.5 mt-6 font-medium text-[15px] transition-all shadow-md ${name.trim() && quantity > 0 ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-blue-300 text-white opacity-80 cursor-not-allowed'}`}
        >
          完成
        </button>
      </div>
    </CenterModal>
  );
};

export default CustomGoodsModal;