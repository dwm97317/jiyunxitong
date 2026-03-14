import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight, CheckCircle2 } from 'lucide-react';
import { InsuranceModeType } from '../../types';

export default function InsuranceService() {
  const [insuranceMode, setInsuranceMode] = useState<InsuranceModeType>('STANDARD');
  const [customValue, setCustomValue] = useState<string>('');
  const [needPhoto, setNeedPhoto] = useState<boolean>(true);

  // Giả lập logic tính tổng tiền: Cước cơ bản (120) + Phí bảo hiểm
  const basePrice = 120;
  let insuranceFee = 0;
  
  if (insuranceMode === 'STANDARD') {
    insuranceFee = 5;
  } else if (insuranceMode === 'CUSTOM' && customValue) {
    // Ví dụ: Phí bảo hiểm = 1% giá trị khai báo, tối thiểu 10 tệ
    insuranceFee = Math.max(10, Math.floor(Number(customValue) * 0.01));
  }
  const totalPrice = basePrice + insuranceFee;

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button className="p-1"><ChevronLeft size={24} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-medium text-gray-800">标快件</h1>
        <button className="p-1"><MoreHorizontal size={24} className="text-gray-800" /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 pb-24">
        {/* Box Bảo Hiểm */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50">
          <div className="flex justify-between items-center mb-4">
            <div className="font-medium text-gray-800">保价</div>
            <div className="text-[11px] text-gray-500">未保价物品最高赔付2倍运费，建议足额报价</div>
          </div>

          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setInsuranceMode('STANDARD')}
              className={`flex-1 border rounded-lg py-2.5 flex items-center justify-center text-[13px] transition-all ${insuranceMode === 'STANDARD' ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium shadow-sm' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
            >
              价值1-350元 
              {insuranceMode === 'STANDARD' && <span className="ml-1.5 font-bold flex items-center">¥5 <CheckCircle2 size={14} className="ml-1" /></span>}
            </button>
            <button 
              onClick={() => { setInsuranceMode('CUSTOM'); setCustomValue('5000'); }}
              className={`flex-1 border rounded-lg py-2.5 flex items-center justify-center text-[13px] transition-all ${insuranceMode === 'CUSTOM' ? 'border-blue-600 bg-blue-50 text-blue-600 font-medium shadow-sm' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50'}`}
            >
              自定义物品价值 <ChevronRight size={14} className="ml-0.5" />
            </button>
          </div>

          {/* Form nhập Custom Value */}
          {insuranceMode === 'CUSTOM' && (
            <div className="flex items-center justify-between py-3 border-t border-gray-100 animate-[fade-in_0.2s_ease-in]">
              <span className="text-gray-700 text-[14px]">自定义物品价值</span>
              <div className="flex items-center border-b border-blue-400 focus-within:border-blue-600 pb-1 transition-colors">
                <input 
                  type="number" 
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="请输入金额" 
                  className="text-right outline-none text-blue-600 text-[16px] w-24 mr-1 placeholder-gray-300 font-bold bg-transparent"
                />
                <span className="text-gray-800 text-[14px]">元</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
             <span className="text-gray-700 text-[14px]">是否需要拍照</span>
             <div className="flex gap-4">
                <label className="flex items-center text-sm text-gray-700 cursor-pointer group" onClick={() => setNeedPhoto(true)}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-1.5 transition-colors ${needPhoto ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                    {needPhoto && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                  </div> 是
                </label>
                <label className="flex items-center text-sm text-gray-700 cursor-pointer group" onClick={() => setNeedPhoto(false)}>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-1.5 transition-colors ${!needPhoto ? 'border-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                    {!needPhoto && <div className="w-2 h-2 rounded-full bg-blue-600"></div>}
                  </div> 否
                </label>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100 flex items-center justify-between">
        <div>
           <div className="text-[13px] text-gray-500">预估 <span className="text-red-500 text-xl font-bold ml-1 transition-all">¥ {totalPrice}</span></div>
           <div className="text-[11px] text-gray-400 mt-0.5">含保价费 ¥{insuranceFee}</div>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full text-[15px] font-medium shadow-md shadow-blue-200 active:scale-95 transition-all">
          立即下单
        </button>
      </div>
    </div>
  );
}