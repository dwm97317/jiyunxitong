import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight, CheckCircle2, Store } from 'lucide-react';

export default function StandardService() {
  const [insuranceMode, setInsuranceMode] = useState<'NONE' | 'STANDARD' | 'CUSTOM'>('NONE');
  const [customValue, setCustomValue] = useState<string>('');
  const [needPhoto, setNeedPhoto] = useState<'YES' | 'NO' | null>(null);
  const [agreed, setAgreed] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10 font-sans">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm">
        <button className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">标快件</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-32">
        
        {/* CARD ĐỊA CHỈ TRỐNG (Cố định LUÔN HIỆN 2 DÒNG) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-5">
           {/* Dòng 1: Thu nhận */}
           <div className="flex items-center justify-between border-b border-gray-50 pb-4 cursor-pointer group">
              <div className="flex items-center">
                 <div className="bg-blue-50 text-blue-500 w-9 h-9 rounded-full flex items-center justify-center font-bold text-[15px] mr-3">收</div>
                 <div>
                   <div className="text-gray-900 font-bold text-[16px] mb-0.5">收件人信息</div>
                   <div className="text-gray-400 text-[13px]">请填写收件人信息</div>
                 </div>
              </div>
              <span className="text-gray-400 text-[13px] group-hover:text-blue-500 transition-colors">地址簿</span>
           </div>
           
           {/* Dòng 2: Điểm tự lấy */}
           <div className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                 <div className="bg-yellow-50 text-yellow-500 w-9 h-9 rounded-lg flex items-center justify-center mr-3"><Store size={20} /></div>
                 <div>
                   <div className="text-gray-900 font-bold text-[16px] mb-0.5">线下网点自提</div>
                   <div className="text-gray-400 text-[13px]">请选择提货网点</div>
                 </div>
              </div>
              <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-100 font-medium">官方推荐</span>
           </div>
        </div>

        {/* CARD INPUT TRỐNG */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-5">
           <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <div className="text-gray-800 text-[15px] flex items-center">
                快递单号 <span className="text-blue-500 text-[10px] border border-blue-200 px-1 py-[1px] rounded ml-1.5">必填</span>
              </div>
              <div className="text-gray-400 text-[14px] flex items-center cursor-pointer hover:text-gray-600">请预报国内单号 <ChevronRight size={16} className="ml-1"/></div>
           </div>
           <div className="flex justify-between items-center">
              <div className="text-gray-800 text-[15px] flex items-center">
                货物名称 <span className="text-blue-500 text-[10px] border border-blue-200 px-1 py-[1px] rounded ml-1.5">必填</span>
              </div>
              <div className="text-gray-400 text-[14px] flex items-center cursor-pointer hover:text-gray-600">请完善货物名称 <ChevronRight size={16} className="ml-1"/></div>
           </div>
        </div>

        {/* CARD BẢO HIỂM TRỐNG */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-800 text-[15px] font-medium">保价</div>
            <div className="text-[12px] text-gray-400">未保价物品最高赔付2倍运费，建议足额报价</div>
          </div>

          <div className="flex gap-3 mb-4">
            <button 
              onClick={() => setInsuranceMode('STANDARD')} 
              className={`flex-1 rounded-xl py-2.5 flex items-center justify-center text-[13px] transition-all border ${insuranceMode === 'STANDARD' ? 'bg-blue-50 border-blue-500 text-gray-900 font-bold' : 'bg-[#F8F9FA] border-transparent text-gray-500 hover:bg-gray-100'}`}
            >
              价值1-350元 <span className={`ml-1 font-bold ${insuranceMode === 'STANDARD' ? 'text-gray-900' : 'text-gray-400'}`}>¥5</span>
              {insuranceMode === 'STANDARD' && <CheckCircle2 size={14} className="ml-1.5 fill-current text-blue-500 bg-white rounded-full" />}
            </button>
            <button 
              onClick={() => setInsuranceMode('CUSTOM')} 
              className={`flex-1 rounded-xl py-2.5 flex items-center justify-center text-[13px] transition-all border ${insuranceMode === 'CUSTOM' ? 'bg-blue-50 border-blue-500 text-gray-900 font-bold' : 'bg-[#F8F9FA] border-transparent text-gray-500 hover:bg-gray-100'}`}
            >
              自定义物品价值 <ChevronRight size={14} className="ml-0.5" />
            </button>
          </div>

          {insuranceMode === 'CUSTOM' && (
            <div className="flex items-center justify-between py-3 border-t border-gray-50 animate-[fade-in_0.2s_ease-in]">
              <span className="text-gray-700 text-[14px]">自定义物品价值</span>
              <div className="flex items-center">
                <input type="number" placeholder="金额" value={customValue} onChange={(e) => setCustomValue(e.target.value)} className="text-right outline-none text-gray-900 font-bold text-[15px] w-24 mr-1 bg-transparent" />
                <span className="text-gray-900 font-bold text-[15px]">元</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between py-3 border-t border-gray-50">
             <span className="text-gray-500 text-[14px]">是否需要拍照</span>
             <div className="flex gap-8 mr-2">
                <label className="flex items-center text-[14px] text-gray-600 cursor-pointer" onClick={() => setNeedPhoto('YES')}>
                  <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mr-2 transition-colors ${needPhoto === 'YES' ? 'border-blue-500' : 'border-gray-300'}`}>
                    {needPhoto === 'YES' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div> 是
                </label>
                <label className="flex items-center text-[14px] text-gray-600 cursor-pointer" onClick={() => setNeedPhoto('NO')}>
                  <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center mr-2 transition-colors ${needPhoto === 'NO' ? 'border-blue-500' : 'border-gray-300'}`}>
                    {needPhoto === 'NO' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div> 否
                </label>
             </div>
          </div>
        </div>

        {/* COUPON KHUYẾN MÃI */}
        <div className="bg-gradient-to-r from-[#FFF8E7] to-[#FFFBF5] rounded-xl p-3 flex justify-between items-center border border-[#FFE8CC]">
           <div className="flex items-center text-[#D97706] font-medium text-[13px]">
             <div className="w-6 h-6 bg-gradient-to-br from-[#FFC875] to-[#FFA733] rounded-full flex items-center justify-center mr-2 text-white text-xs shadow-inner">¥</div>
             邀请好友一起来领券！
           </div>
           <button className="bg-gradient-to-r from-[#FFB347] to-[#FF902E] text-white px-4 py-1.5 rounded-full text-[12px] font-medium shadow-sm">立即邀请</button>
        </div>

        {/* CHECKBOX ĐIỀU KHOẢN */}
        <div className="flex items-center px-1 pt-1 pb-6 cursor-pointer" onClick={() => setAgreed(!agreed)}>
           <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 transition-colors ${agreed ? 'bg-blue-600 border-none' : 'border-[1.5px] border-gray-300 bg-white'}`}>
              {agreed && <CheckCircle2 size={16} className="text-white" />}
           </div>
           <span className="text-[12px] text-gray-400">我已阅读并同意遵守 <span className="text-gray-800 font-bold">《极光转运服务条款》</span></span>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-white px-5 py-3 absolute bottom-0 left-0 right-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-between">
        <div>
           <div className="text-[15px] text-gray-800 font-medium">预估 <span className="text-blue-600 font-bold text-xl ml-1">--</span></div>
           <div className="text-[11px] text-gray-400 mt-0.5">最终费用以仓库称重后开单为准</div>
        </div>
        <button className={`px-9 py-3 rounded-full text-[16px] font-medium transition-all ${agreed ? 'bg-blue-600 text-white shadow-md shadow-blue-200 active:scale-95' : 'bg-blue-400 text-white opacity-80 cursor-not-allowed'}`}>
          立即下单
        </button>
      </div>
    </div>
  );
}