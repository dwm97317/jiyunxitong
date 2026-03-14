import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-react';
import { WeightModal, VolumeModal, BillingRulesModal } from './CalculatorModals';
import { ModalStateType } from '../../types';

export default function FreightCalculator({ onBack }: { onBack: () => void }) {
  const [modalState, setModalState] = useState<ModalStateType>(''); 
  const [estWeight, setEstWeight] = useState<string>('');
  const [estVolume, setEstVolume] = useState<string>('');

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10 font-sans">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">运费测算</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        
        {/* CARD CHÍNH - HEADER XANH VÀ FORM */}
        <div className="bg-white rounded-2xl mx-3 mt-3 shadow-sm overflow-hidden">
           {/* Banner Điểm đến */}
           <div className="bg-blue-500 px-4 py-6 flex items-center justify-between text-white relative">
              <div className="flex-1 text-center font-bold text-[20px] tracking-widest">北京市</div>
              <div className="flex items-center w-16 relative">
                 <div className="w-full h-[1px] bg-white/50"></div>
                 <ChevronRight size={16} className="text-white/50 absolute right-0" />
              </div>
              <div className="flex-1 text-center font-bold text-[20px] tracking-widest">纽约市</div>
           </div>

           {/* Các ô Form */}
           <div className="px-4 py-2 space-y-1">
              <div onClick={() => setModalState('WEIGHT')} className="flex items-center justify-between py-4 border-b border-gray-50 cursor-pointer">
                <div className="text-gray-800 text-[15px] flex items-center">
                  预估重量 <span className="text-blue-500 text-[10px] border border-blue-200 px-1 py-[1px] rounded ml-1.5">必填</span>
                </div>
                <div className={`text-[14px] ${estWeight ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                  {estWeight ? `${estWeight} KG` : '输入包裹重量预付费 KG'}
                </div>
              </div>

              <div onClick={() => setModalState('VOLUME')} className="flex items-center justify-between py-4 border-b border-gray-50 cursor-pointer">
                <div className="text-gray-800 text-[15px]">预估体积重</div>
                <div className={`text-[14px] ${estVolume ? 'text-gray-900 font-bold' : 'text-gray-400'}`}>
                  {estVolume ? `${estVolume} cm` : '输入包长、宽、高预估体积重 KG'}
                </div>
              </div>

              <div className="flex items-center justify-between py-4 cursor-pointer">
                <div className="text-gray-800 text-[15px] flex items-center">
                  物品信息 <span className="text-blue-500 text-[10px] border border-blue-200 px-1 py-[1px] rounded ml-1.5">必填</span>
                </div>
                <div className="text-gray-400 text-[14px] flex items-center">
                  补充物品信息预估费用更准确 <ChevronRight size={16} className="ml-1"/>
                </div>
              </div>
           </div>
        </div>

        {/* NÚT TÍNH TOÁN */}
        <div className="px-3 mt-6">
           <button className={`w-full rounded-full py-3.5 font-bold text-[16px] transition-all shadow-md ${estWeight ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-blue-500 text-white opacity-90'}`}>
             立即试算
           </button>
        </div>

        {/* TEXT QUY TẮC BÊN DƯỚI */}
        <div className="px-6 mt-8">
           <div className="text-center font-bold text-gray-800 text-[16px] mb-5 tracking-widest">运费规则说明</div>
           
           <div className="space-y-4 text-[13px] text-gray-600 leading-loose">
             <div>
               <div className="font-bold text-gray-900 text-[14px] mb-1">体积重计算方式：</div>
               按照国际惯例，低密度的包裹，比较其实际重量，占用的空间通常较大，计算得出体积重量。体积重量和实际重量两者取最大者计费。
             </div>
             
             <div>
               <div className="font-bold text-gray-900 text-[14px] mb-1">计算公式：</div>
               空运：体积重量 (kg) = (长(cm) x 宽(cm) x 高(cm)) ÷5000<br/>
               海运：体积重量 (kg) = (长(cm) x 宽(cm) x 高(cm)) ÷6000<br/>
               注意：体积重量计算结果会自动进位到整数<br/>
               例如：计算结果为1.01kg，自动进位到2kg
             </div>
           </div>

           <button onClick={() => setModalState('RULES')} className="text-blue-600 underline text-[13px] mt-4 hover:text-blue-700">
             了解计费规则?
           </button>
        </div>
      </div>

      {/* Render Modals */}
      <WeightModal isOpen={modalState === 'WEIGHT'} onClose={() => setModalState('')} onConfirm={(w) => { setEstWeight(w); setModalState(''); }} />
      <VolumeModal isOpen={modalState === 'VOLUME'} onClose={() => setModalState('')} onConfirm={(v) => { setEstVolume(v); setModalState(''); }} />
      <BillingRulesModal isOpen={modalState === 'RULES'} onClose={() => setModalState('')} />
    </div>
  );
}