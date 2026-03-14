import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Navigation, Phone, CheckCircle2 } from 'lucide-react';

export default function OfflineBranches({ onBack }: { onBack?: () => void }) {
  const [selectedId, setSelectedId] = useState<number>(1);
  const [boundId, setBoundId] = useState<number | null>(null);

  const branches = [
    {
      id: 1,
      headerTitle: '北京东城区前门街道网点',
      address: '前门街道草厂十条35号',
      phone: '010-67446882',
      business: '发货 快递派送 快递自提',
      isOfficial: true,
    },
    {
      id: 2,
      headerTitle: '北京百荣世贸商城网点',
      address: '北京市东城区永定门外街道甲101号',
      phone: '暂不支持',
      business: '发货 快递派送',
      isOfficial: false,
    },
    {
      id: 3,
      headerTitle: '背景丰台区玉泉网点',
      address: '北京市东城区永定门外街道甲101号',
      phone: '暂不支持',
      business: '发货 快递派送',
      isOfficial: false,
    }
  ];

  const handleBind = () => {
    if (boundId === selectedId) {
      setBoundId(null); // Unbind
    } else {
      setBoundId(selectedId); // Bind
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10 font-sans">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">线下网点</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {branches.map(branch => {
          const isSelected = selectedId === branch.id;
          const isBound = boundId === branch.id;

          // Xác định màu sắc Header dựa theo trạng thái Bind
          let headerBg = 'bg-white';
          let headerText = 'text-gray-900';
          let iconColor = 'bg-red-500 text-white';
          let iconText = '官';
          
          if (isBound) {
            headerBg = 'bg-[#333333]';
            headerText = 'text-white';
          } else if (branch.id === 2) {
            iconColor = 'bg-blue-500 text-white'; iconText = '代';
          } else if (branch.id === 3) {
            iconColor = 'bg-purple-500 text-white'; iconText = '服';
          }

          return (
            <div 
              key={branch.id} 
              onClick={() => setSelectedId(branch.id)}
              className="bg-white rounded-2xl shadow-sm overflow-hidden relative transition-all"
            >
              {/* Header của thẻ */}
              <div className={`flex items-center justify-between h-12 transition-colors ${isBound ? 'bg-[#FDF8E4]' : 'bg-[#F8F9FA]'}`}>
                <div className={`h-full ${headerBg} flex items-center px-4 rounded-br-2xl transition-colors`}>
                  <div className={`${iconColor} w-4 h-4 rounded-[3px] flex items-center justify-center text-[10px] font-bold mr-2`}>
                    {iconText}
                  </div>
                  <span className={`font-bold text-[15px] ${headerText}`}>{branch.headerTitle}</span>
                </div>
                <div className="pr-4">
                  {isBound ? (
                    <div className="bg-[#333333] w-6 h-6 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className={`w-[22px] h-[22px] rounded-full border-2 ${isSelected ? 'border-gray-800 border-[6px]' : 'border-gray-300'}`}></div>
                  )}
                </div>
              </div>

              {/* Nội dung của thẻ */}
              <div className="p-4 relative">
                {/* Watermark 官方点 (Điểm chính thức) */}
                {branch.isOfficial && (
                  <div className="absolute top-2 right-4 w-[50px] h-[50px] border-2 border-[#E8D5B5] rounded-full flex items-center justify-center transform -rotate-12 opacity-60">
                    <div className="border border-[#E8D5B5] w-[42px] h-[42px] rounded-full flex flex-col items-center justify-center text-[#E8D5B5]">
                      <div className="flex gap-0.5 mb-0.5">
                        <span className="text-[8px]">★</span><span className="text-[10px]">★</span><span className="text-[8px]">★</span>
                      </div>
                      <span className="text-[11px] font-bold tracking-widest">官方点</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2.5 text-[14px]">
                  <div className="flex">
                    <span className="text-gray-500 w-12 tracking-widest">地址：</span>
                    <span className="text-gray-800 font-medium flex-1 pr-12 leading-snug">{branch.address}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-12 tracking-widest">电话：</span>
                    <span className="text-gray-800 font-medium flex-1">{branch.phone}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 w-12 tracking-widest">业务：</span>
                    <span className="text-gray-600 font-medium flex-1">{branch.business}</span>
                  </div>
                </div>

                {/* Các nút hành động (Chỉ hiện nếu có hỗ trợ số điện thoại/hành động) */}
                {branch.phone !== '暂不支持' && (
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                    <button className="flex-1 flex items-center justify-center text-gray-900 font-bold text-[14px] hover:bg-gray-50 py-1 rounded-lg">
                      <Navigation size={16} className="mr-2 fill-current" /> 到这里去
                    </button>
                    <div className="w-[1px] h-4 bg-gray-200"></div>
                    <button className="flex-1 flex items-center justify-center text-gray-900 font-bold text-[14px] hover:bg-gray-50 py-1 rounded-lg">
                      <Phone size={16} className="mr-2 fill-current" /> 拨打电话
                    </button>
                  </div>
                )}
                {branch.phone === '暂不支持' && (
                  <div className="flex items-center justify-center pt-4 mt-4 border-t border-gray-100">
                    <button className="flex items-center justify-center text-gray-900 font-bold text-[14px] hover:bg-gray-50 py-1 rounded-lg w-full">
                      <Navigation size={16} className="mr-2 fill-current" /> 到这里去
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-white px-5 py-3 absolute bottom-0 left-0 right-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-center">
        <button 
          onClick={handleBind}
          className="w-full py-3.5 rounded-full text-[16px] font-bold bg-blue-600 text-white shadow-md shadow-blue-200 active:scale-[0.98] transition-all"
        >
          {boundId === selectedId ? '切换网点' : '绑定网点'}
        </button>
      </div>
    </div>
  );
}