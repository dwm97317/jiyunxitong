import { useState } from 'react';
import { ChevronLeft, ScanLine, Search, Copy, MapPin, Truck } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface CheckExpressProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function CheckExpress({ onBack, onNavigate, onModuleChange }: CheckExpressProps) {
  const [searchQuery, setSearchQuery] = useState('SF1437829133905');
  const [activeTab, setActiveTab] = useState('全部');

  const tabs = ['全部', '未入库', '已入库', '未打包', '未付款', '未发货', '已发货'];

  const waybills = [
    {
      id: 'SF1437829133905',
      type: '集运件',
      fromCity: '南昌市',
      fromName: '娇亭',
      toCity: '北京市',
      toName: '寇旭',
      status: '已发货',
      time: '2022-03-17 13:39',
      actions: ['取消申请', '修改申请', '查看物流'],
      primaryAction: '查看物流'
    },
    {
      id: 'SF1437829133905',
      type: '个人件',
      fromCity: '南昌市',
      fromName: '娇亭',
      toCity: '北京市',
      toName: '寇旭',
      status: '未打包',
      time: '2022-03-17 13:39',
      actions: ['查看详情'],
      primaryAction: '查看详情'
    },
    {
      id: 'SF1437829133905',
      type: '集运件',
      fromCity: '南昌市',
      fromName: '娇亭',
      toCity: '北京市',
      toName: '寇旭',
      status: '未入库',
      time: '2022-03-17 13:39',
      actions: [],
      primaryAction: ''
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#f5f6f8]">
      {/* Status Bar */}
      <div className="h-11 w-full flex justify-between items-center px-6 bg-white">
        <span className="text-[14px] font-medium">9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-[2px] h-3">
            <div className="w-[3px] h-1.5 rounded-sm bg-black"></div>
            <div className="w-[3px] h-2 rounded-sm bg-black"></div>
            <div className="w-[3px] h-2.5 rounded-sm bg-black"></div>
            <div className="w-[3px] h-3 rounded-sm bg-black"></div>
          </div>
          <svg className="w-4 h-4 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" />
          </svg>
          <div className="w-6 h-3 rounded-[4px] border border-opacity-30 border-black relative flex items-center p-[1px]">
            <div className="h-full w-[80%] rounded-[2px] bg-black"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white pb-0 px-4 flex-shrink-0">
        <div className="flex justify-between items-center mb-3 pt-2">
          <button className="p-1 -ml-1" onClick={onBack}>
            <ChevronLeft size={24} className="text-[#333]" />
          </button>
          <h1 className="text-[17px] font-medium text-[#333]">查快递</h1>
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2.5 py-1">
             <div className="flex gap-1">
               <div className="w-1 h-1 bg-[#333] rounded-full"></div>
               <div className="w-1 h-1 bg-[#333] rounded-full"></div>
               <div className="w-1 h-1 bg-[#333] rounded-full"></div>
            </div>
            <div className="w-[1px] h-3 bg-gray-200 mx-1"></div>
            <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#333] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#333] rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-[#f5f6f8] rounded-full flex items-center px-3 py-2 mb-3">
          <Search size={16} className="text-[#999] mr-2" />
          <input
            type="text"
            placeholder="输入快递单号"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 outline-none text-[14px] text-[#333] placeholder-[#999]"
          />
          <button className="p-1">
            <ScanLine size={18} className="text-[#999]" />
          </button>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-5 pb-0 border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap text-[14px] relative pb-2 px-1 ${
                activeTab === tab ? 'text-[#3b72ff] font-medium' : 'text-[#666]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#3b72ff] rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-3 overflow-y-auto pb-20">{searchQuery ? (
          <div className="space-y-3">
            {waybills.map((bill, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm relative">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2 text-[#666] text-[12px]">
                    <span>运单号: {bill.id}</span>
                    <button><Copy size={12} className="text-[#999]" /></button>
                  </div>
                  <div className={`absolute right-0 top-0 text-[10px] px-2 py-1 rounded-bl-xl rounded-tr-xl border-b border-l ${
                    bill.type === '集运件' ? 'text-[#3b72ff] border-[#3b72ff]/20 bg-[#3b72ff]/5' : 'text-[#ff8a00] border-[#ff8a00]/20 bg-[#ff8a00]/5'
                  }`}>
                    {bill.type}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-5 px-1">
                  <div className="text-center w-20">
                    <div className="text-[18px] font-bold text-[#333] mb-1">{bill.fromCity}</div>
                    <div className="text-[12px] text-[#999]">{bill.fromName}</div>
                  </div>
                  <div className="flex flex-col items-center justify-center flex-1 px-2">
                    <div className="text-[#3b72ff] text-[12px] mb-1">{bill.status}</div>
                    <div className="w-full h-[1px] bg-[#3b72ff] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#3b72ff] transform rotate-45"></div>
                    </div>
                  </div>
                  <div className="text-center w-20">
                    <div className="text-[18px] font-bold text-[#333] mb-1">{bill.toCity}</div>
                    <div className="text-[12px] text-[#999]">{bill.toName}</div>
                  </div>
                </div>

                <div className="bg-[#f8f9fa] rounded-lg p-2.5 flex items-center gap-2 mb-4">
                  <MapPin size={12} className="text-[#3b72ff]" fill="currentColor" />
                  <span className="text-[12px] text-[#666]">签收时间: {bill.time}</span>
                </div>

                {bill.actions.length > 0 && (
                  <div className="flex justify-end gap-2.5">
                    {bill.actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action === '查看物流' && onNavigate('logistics')}
                        className={`px-4 py-1.5 rounded-full text-[13px] ${
                          action === bill.primaryAction
                            ? 'bg-[#3b72ff] text-white font-medium'
                            : 'bg-white border border-[#e5e5e5] text-[#666]'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 mt-10">
            <div className="w-40 h-32 relative mb-2 flex items-center justify-center">
               <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 40 L40 30 L80 45 L110 25 L100 60 L60 75 L20 60 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M40 30 L60 75" stroke="#cbd5e1" strokeWidth="2"/>
                  <path d="M80 45 L20 60" stroke="#cbd5e1" strokeWidth="2"/>
                  <circle cx="50" cy="25" r="12" fill="#93c5fd" />
                  <path d="M50 37 L45 25 L55 25 Z" fill="#93c5fd" />
                  <circle cx="50" cy="22" r="4" fill="white" />
                  <path d="M85 65 L95 55 L105 65 L95 75 Z" stroke="#fca5a5" strokeWidth="3" fill="none" />
                  <path d="M15 50 Q 25 40 35 50 T 55 50" stroke="#94a3b8" strokeWidth="2" fill="none" />
               </svg>
            </div>
            <p className="text-[#999] text-[13px]">最多展示三个月运单</p>
          </div>
        )}
      </div>

      {activeTab === '全部' && (
        <div className="fixed left-0 top-2/3 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] rounded-r-full py-2 pl-2 pr-3 flex items-center gap-1.5 border border-gray-100 z-30">
          <div className="bg-[#3b72ff] rounded-full p-1.5">
            <Truck size={14} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#3b72ff] font-bold leading-tight">入仓</span>
            <span className="text-[9px] text-[#666] leading-tight">申请打包</span>
          </div>
        </div>
      )}

      <BottomNavBar activeTab="search" onModuleChange={onModuleChange} />
    </div>
  );
}
