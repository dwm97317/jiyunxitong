import React, { useState } from 'react';
import OfflineBranches from './OfflineBranches';
import MailingStandards from './MailingStandards';
import ProhibitedItems from './ProhibitedItems';
import ServiceAgreement from './ServiceAgreement';
import BranchSelection from './BranchSelection'; // Import file mới

type PolicyScreenType = 'BRANCHES' | 'SELECT_BRANCH' | 'STANDARDS' | 'PROHIBITED' | 'AGREEMENT';

export default function Phase78Test() {
  const [activeScreen, setActiveScreen] = useState<PolicyScreenType>('BRANCHES'); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 font-sans">
      <div className="mb-6 flex flex-col items-center gap-3 max-w-lg">
        <p className="text-sm text-gray-500 font-medium bg-white px-4 py-1.5 rounded-full shadow-sm">
          Phase 7 & 8: Bấm để đổi màn hình
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => setActiveScreen('BRANCHES')} className={`px-4 py-2 rounded-full text-[13px] shadow-sm transition-all font-bold border ${activeScreen === 'BRANCHES' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>线下网点 (Điểm Thu)</button>
          
          {/* NÚT MỚI THÊM ĐỂ MỞ MÀN HÌNH BẠN YÊU CẦU */}
          <button onClick={() => setActiveScreen('SELECT_BRANCH')} className={`px-4 py-2 rounded-full text-[13px] shadow-sm transition-all font-bold border ${activeScreen === 'SELECT_BRANCH' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>选择网点 (Chọn Điểm)</button>
          
          <button onClick={() => setActiveScreen('STANDARDS')} className={`px-4 py-2 rounded-full text-[13px] shadow-sm transition-all font-bold border ${activeScreen === 'STANDARDS' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>收寄标准 (Tiêu chuẩn)</button>
          <button onClick={() => setActiveScreen('PROHIBITED')} className={`px-4 py-2 rounded-full text-[13px] shadow-sm transition-all font-bold border ${activeScreen === 'PROHIBITED' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>违禁物品 (Hàng cấm)</button>
          <button onClick={() => setActiveScreen('AGREEMENT')} className={`px-4 py-2 rounded-full text-[13px] shadow-sm transition-all font-bold border ${activeScreen === 'AGREEMENT' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}>协议 (Thỏa thuận)</button>
        </div>
      </div>

      <div className="w-[375px] h-[712px] bg-[#F4F5F7] rounded-[2.5rem] shadow-2xl relative border-[8px] border-gray-900 overflow-hidden">
        {activeScreen === 'BRANCHES' && <OfflineBranches />}
        
        {/* RENDER MÀN HÌNH MỚI */}
        {activeScreen === 'SELECT_BRANCH' && <BranchSelection />}
        
        {activeScreen === 'STANDARDS' && <MailingStandards />}
        {activeScreen === 'PROHIBITED' && <ProhibitedItems />}
        {activeScreen === 'AGREEMENT' && <ServiceAgreement />}
      </div>
    </div>
  );
}