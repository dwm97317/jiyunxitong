import React, { useState } from 'react';
import RecipientForm from './RecipientForm';
import GoodsNameModal from './GoodsNameModal';

export default function Phase1Test() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Lưu trạng thái Tên Hàng Hóa được chọn từ Modal
  const [selectedGoods, setSelectedGoods] = useState<string>('');
  const [goodsQuantity, setGoodsQuantity] = useState<number>(1);

  // Xử lý khi nhấn nút "Xác nhận / Hoàn thành" trong Modal Tên Hàng
  const handleConfirmGoods = (name: string, quantity: number) => {
    setSelectedGoods(name);
    setGoodsQuantity(quantity);
    setIsModalOpen(false); // Đóng modal
  };

  // Xử lý khi nhấn nút Lưu dưới cùng
  const handleSaveForm = () => {
    if (!selectedGoods) {
      alert('Vui lòng chọn Tên Hàng Hóa trước khi lưu!');
      setIsModalOpen(true);
      return;
    }
    alert(`Đã lưu thành công!\nHàng hóa: ${selectedGoods} (x${goodsQuantity})`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 font-sans">
      
      <div className="mb-4 text-center">
        <p className="text-gray-600 text-sm">Gõ thông tin vào Form, nút "Lưu" sẽ sáng lên.<br/>Click vào "货物名称" để mở Popup Tên Hàng.</p>
      </div>

      <div className="w-[375px] h-[712px] bg-[#F4F5F7] rounded-[2rem] shadow-2xl overflow-hidden relative border-[6px] border-gray-800">
        
        {/* Main Form */}
        <RecipientForm 
          selectedGoods={selectedGoods}
          goodsQuantity={goodsQuantity}
          onOpenGoodsModal={() => setIsModalOpen(true)} 
          onSubmit={handleSaveForm}
        />

        {/* Goods Modal */}
        <GoodsNameModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleConfirmGoods}
        />
        
      </div>
    </div>
  );
}