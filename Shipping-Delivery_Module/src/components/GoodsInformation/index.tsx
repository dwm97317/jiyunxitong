import React, { useState } from 'react';
import GoodsDetails from './GoodsDetails';
import GoodsNameSelection from './GoodsNameSelection';
import CustomGoodsModal from './CustomGoodsModal';
import { ViewModeType } from '../../types';

export default function Phase3Test() {
  const [viewMode, setViewMode] = useState<ViewModeType>('DETAILS_NORMAL'); 
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  
  // Dữ liệu Tên Hàng (Rỗng mặc định để test giao diện trống ở Ảnh 1)
  const [globalGoodsName, setGlobalGoodsName] = useState<string>('');

  // Xử lý khi người dùng chọn/nhập xong
  const handleSelectGoods = (name: string) => {
    setGlobalGoodsName(name); 
    setViewMode('DETAILS_NORMAL'); 
    setIsCustomModalOpen(false); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 font-sans">
      
      <div className="mb-4 text-center text-gray-600 text-sm">
        <p>1. Bấm vào thanh tìm kiếm ở màn hình chính để mở danh sách.</p>
        <p>2. Chọn món hàng hoặc bấm [+] để nhập tên tùy chỉnh.</p>
      </div>

      <div className="w-[375px] h-[712px] bg-[#F4F5F7] rounded-[2rem] shadow-2xl relative border-[6px] border-gray-800 overflow-hidden">
        
        {/* Lớp 1: Màn hình Chi Tiết (Luôn nằm dưới) */}
        <GoodsDetails 
          selectedGoodsName={globalGoodsName} 
          onClearGoods={() => setGlobalGoodsName('')} 
          onOpenSelection={() => setViewMode('SELECTION')} 
          // isOversizeView={false} // Bỏ qua oversize view vì ảnh mới ko có
        />
        
        {/* Lớp 2: Màn hình Chọn Hàng Hóa trượt lên */}
        {viewMode === 'SELECTION' && (
          <div className="absolute inset-0 z-20 animate-[slide-up_0.2s_ease-out]">
            <GoodsNameSelection 
              onBack={() => setViewMode('DETAILS_NORMAL')} 
              onOpenCustom={() => setIsCustomModalOpen(true)} 
              onConfirm={handleSelectGoods} 
            />
          </div>
        )}
        
        {/* Lớp 3: Popup Tùy chỉnh ở giữa màn hình */}
        <CustomGoodsModal 
          isOpen={isCustomModalOpen} 
          onClose={() => setIsCustomModalOpen(false)} 
          onConfirm={handleSelectGoods} 
        />
        
      </div>
    </div>
  );
}