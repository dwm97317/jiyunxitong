import React, { useState } from 'react';
import StandardService from './StandardService';
import ExpressService from './ExpressService';
import LargeFreightService from './LargeFreightService';

type SpecialScreenType = 'STANDARD' | 'EXPRESS' | 'FREIGHT';

export default function Phase5Test() {
  const [activeScreen, setActiveScreen] = useState<SpecialScreenType>('STANDARD'); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 font-sans">
      
      {/* Control Panel cho 7 màn hình */}
      <div className="mb-4 flex flex-col items-center gap-2 max-w-md">
        <p className="text-sm text-gray-600 font-medium">Bấm để chuyển đổi giữa các trạng thái dịch vụ:</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => setActiveScreen('STANDARD')} className={`px-4 py-2 rounded-full text-sm shadow-sm transition-all font-medium border ${activeScreen === 'STANDARD' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
            标快件 (Standard / Bảo hiểm / Tự lấy)
          </button>
          <button onClick={() => setActiveScreen('EXPRESS')} className={`px-4 py-2 rounded-full text-sm shadow-sm transition-all font-medium border ${activeScreen === 'EXPRESS' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
            特快件 (Express Banner)
          </button>
          <button onClick={() => setActiveScreen('FREIGHT')} className={`px-4 py-2 rounded-full text-sm shadow-sm transition-all font-medium border ${activeScreen === 'FREIGHT' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
            大票直达 (Freight Hộp Gỗ)
          </button>
        </div>
      </div>

      <div className="w-[375px] h-[712px] bg-[#F4F5F7] rounded-[2rem] shadow-2xl relative border-[6px] border-gray-800 overflow-hidden">
        {activeScreen === 'STANDARD' && <StandardService />}
        {activeScreen === 'EXPRESS' && <ExpressService />}
        {activeScreen === 'FREIGHT' && <LargeFreightService />}
      </div>
    </div>
  );
}