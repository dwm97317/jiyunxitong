import React, { useState } from 'react';
import PriceTimeTable from './PriceTimeTable';
import FreightCalculator from './FreightCalculator';

export default function Phase6Test() {
  const [activeScreen, setActiveScreen] = useState('TABLE'); // 'TABLE' | 'CALCULATOR'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 font-sans">
      
      <div className="mb-4 flex gap-2">
        <button 
          onClick={() => setActiveScreen('TABLE')}
          className={`px-4 py-2 rounded text-sm shadow ${activeScreen === 'TABLE' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Bảng Giá Thời Gian
        </button>
        <button 
          onClick={() => setActiveScreen('CALCULATOR')}
          className={`px-4 py-2 rounded text-sm shadow ${activeScreen === 'CALCULATOR' ? 'bg-blue-600 text-white' : 'bg-white'}`}
        >
          Công Cụ Tính Phí
        </button>
      </div>

      {/* Mobile Frame */}
      <div className="w-[375px] h-[712px] bg-[#F4F5F7] rounded-[2rem] shadow-2xl relative border-[6px] border-gray-800 overflow-hidden">
        
        {activeScreen === 'TABLE' && <PriceTimeTable onBack={() => alert("Back")} />}
        
        {activeScreen === 'CALCULATOR' && <FreightCalculator onBack={() => setActiveScreen('TABLE')} />}

      </div>
    </div>
  );
}