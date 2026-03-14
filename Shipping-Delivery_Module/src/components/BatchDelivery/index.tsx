import React, { useState } from 'react';
import BatchMain from './BatchMain';
import AddRecipient from './AddRecipient';
import AddBranch from './AddBranch';

export default function Phase4Test() {
  const [currentScreen, setCurrentScreen] = useState<'MAIN' | 'ADD_RECIPIENT' | 'ADD_BRANCH'>('MAIN'); 
  
  // State lưu trữ dữ liệu để thay đổi UI của BatchMain
  const [recipientsCount, setRecipientsCount] = useState<number>(0);
  const [selectedBranch, setSelectedBranch] = useState<{ name: string, address: string } | null>(null);

  // Xử lý khi chọn người nhận xong
  const handleConfirmRecipients = (count: number) => {
    setRecipientsCount(count);
    setCurrentScreen('MAIN'); // Đóng màn hình
  };

  // Xử lý khi chọn chi nhánh xong
  const handleConfirmBranch = (branch: { name: string, address: string }) => {
    setSelectedBranch(branch);
    setCurrentScreen('MAIN'); // Đóng màn hình
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 font-sans">
      
      <div className="mb-4 text-center text-gray-600 text-sm">
        <p>1. Bấm "添加" để thêm Người nhận (Giả lập chọn 1 người).</p>
        <p>2. Bấm "添加" để thêm Điểm giao dịch (Giao diện sẽ thay đổi thành Ảnh 2).</p>
      </div>

      <div className="w-[375px] h-[712px] bg-[#F4F5F7] rounded-[2rem] shadow-2xl relative border-[6px] border-gray-800 overflow-hidden flex flex-col">
        
        {/* Lớp nền: Màn hình chính */}
        <BatchMain 
          onNavigate={(screen) => setCurrentScreen(screen)} 
          recipientCount={recipientsCount}
          selectedBranch={selectedBranch}
        />

        {/* Lớp phủ 1: Chọn người nhận */}
        {currentScreen === 'ADD_RECIPIENT' && (
          <div className="absolute inset-0 z-20 animate-[slide-up_0.2s_ease-out]">
            <AddRecipient 
              onBack={() => setCurrentScreen('MAIN')} 
              onConfirm={handleConfirmRecipients}
            />
          </div>
        )}

        {/* Lớp phủ 2: Chọn chi nhánh lưới */}
        {currentScreen === 'ADD_BRANCH' && (
          <div className="absolute inset-0 z-20 animate-[slide-up_0.2s_ease-out]">
            <AddBranch 
              onBack={() => setCurrentScreen('MAIN')} 
              onConfirm={handleConfirmBranch}
            />
          </div>
        )}

      </div>
    </div>
  );
}