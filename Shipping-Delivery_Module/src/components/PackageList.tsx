import { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Circle, Search, Scan, Copy, MapPin, Truck } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

export default function PackageList({ onNavigate, onModuleChange }: { onNavigate: (screen: string) => void; onModuleChange?: (module: string, screen?: string) => void }) {
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '未入库', '已入库', '未打包', '未付款', '未发货', '已发货'];

  return (
    <div className="bg-[#F5F5F5] min-h-full pb-20 font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => onNavigate('home')} />
        <h1 className="text-[17px] font-medium">我的快递</h1>
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-full px-2.5 py-1">
          <MoreHorizontal className="w-4 h-4 text-black" />
          <div className="w-[1px] h-3.5 bg-gray-300"></div>
          <Circle className="w-4 h-4 text-black" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-2">
        <div className="bg-[#F5F5F5] rounded-full flex items-center px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="输入快递单号" 
            className="bg-transparent flex-1 outline-none text-[14px] placeholder-gray-400"
          />
          <Scan className="w-5 h-5 text-gray-400 ml-2 cursor-pointer" onClick={() => onNavigate('scanner')} />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-2 border-b border-gray-100 flex overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <div 
            key={tab}
            className={`whitespace-nowrap px-3.5 py-3 text-[14px] relative cursor-pointer ${activeTab === tab ? 'text-[#3B5998] font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#3B5998] rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Package Cards */}
      <div className="p-3 space-y-3">
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm cursor-pointer" onClick={() => onNavigate('orderDetail')}>
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center text-gray-500 text-[13px]">
              运单号：SF1437829133905 <Copy className="w-3.5 h-3.5 ml-1.5" />
            </div>
            <div className="w-10 h-10 rounded-full border border-[#3B5998] text-[#3B5998] flex items-center justify-center text-[10px] font-medium leading-tight text-center relative">
              <div className="absolute top-1 right-1 flex space-x-0.5">
                <div className="w-0.5 h-0.5 bg-[#3B5998] rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-[#3B5998] rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-[#3B5998] rounded-full"></div>
              </div>
              <span className="mt-1">集运件</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-5 px-2">
            <div className="text-center w-20">
              <div className="text-[18px] font-bold text-gray-800">南昌市</div>
              <div className="text-[13px] text-gray-500 mt-1">娇亭</div>
            </div>
            <div className="flex flex-col items-center flex-1 mx-2">
              <div className="text-[#3B5998] text-[12px] mb-1">已发货</div>
              <div className="w-16 h-[1px] bg-[#3B5998] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#3B5998] transform rotate-45"></div>
              </div>
            </div>
            <div className="text-center w-20">
              <div className="text-[18px] font-bold text-gray-800">北京市</div>
              <div className="text-[13px] text-gray-500 mt-1">寇旭</div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] rounded-lg p-2.5 flex items-center text-[12px] text-gray-600 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#3B5998] mr-1.5" />
            签收时间：2022-03-17 13:39
          </div>

          <div className="flex justify-end gap-2.5">
            <button className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] text-gray-600">取消申请</button>
            <button className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] text-gray-600">修改申请</button>
            <button className="px-4 py-1.5 bg-[#3B5998] text-white rounded-full text-[13px]">查看物流</button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm cursor-pointer" onClick={() => onNavigate('orderDetail')}>
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center text-gray-500 text-[13px]">
              运单号：SF1437829133905 <Copy className="w-3.5 h-3.5 ml-1.5" />
            </div>
            <div className="w-10 h-10 rounded-full border border-[#F28C28] text-[#F28C28] flex items-center justify-center text-[10px] font-medium leading-tight text-center relative">
              <div className="absolute top-1 right-1 flex space-x-0.5">
                <div className="w-0.5 h-0.5 bg-[#F28C28] rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-[#F28C28] rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-[#F28C28] rounded-full"></div>
              </div>
              <span className="mt-1">个人件</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-5 px-2">
            <div className="text-center w-20">
              <div className="text-[18px] font-bold text-gray-800">南昌市</div>
              <div className="text-[13px] text-gray-500 mt-1">娇亭</div>
            </div>
            <div className="flex flex-col items-center flex-1 mx-2">
              <div className="text-[#3B5998] text-[12px] mb-1">未打包</div>
              <div className="w-16 h-[1px] bg-[#3B5998] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#3B5998] transform rotate-45"></div>
              </div>
            </div>
            <div className="text-center w-20">
              <div className="text-[18px] font-bold text-gray-800">北京市</div>
              <div className="text-[13px] text-gray-500 mt-1">寇旭</div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] rounded-lg p-2.5 flex items-center text-[12px] text-gray-600 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#3B5998] mr-1.5" />
            签收时间：2022-03-17 13:39
          </div>

          <div className="flex justify-end gap-2.5">
            <button className="px-4 py-1.5 bg-[#3B5998] text-white rounded-full text-[13px]">查看详情</button>
          </div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white rounded-xl p-4 shadow-sm cursor-pointer" onClick={() => onNavigate('orderDetail')}>
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center text-gray-500 text-[13px]">
              运单号：SF1437829133905 <Copy className="w-3.5 h-3.5 ml-1.5" />
            </div>
            <div className="w-10 h-10 rounded-full border border-[#3B5998] text-[#3B5998] flex items-center justify-center text-[10px] font-medium leading-tight text-center relative">
              <div className="absolute top-1 right-1 flex space-x-0.5">
                <div className="w-0.5 h-0.5 bg-[#3B5998] rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-[#3B5998] rounded-full"></div>
                <div className="w-0.5 h-0.5 bg-[#3B5998] rounded-full"></div>
              </div>
              <span className="mt-1">集运件</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-5 px-2">
            <div className="text-center w-20">
              <div className="text-[18px] font-bold text-gray-800">南昌市</div>
              <div className="text-[13px] text-gray-500 mt-1">娇亭</div>
            </div>
            <div className="flex flex-col items-center flex-1 mx-2">
              <div className="text-[#3B5998] text-[12px] mb-1">未入库</div>
              <div className="w-16 h-[1px] bg-[#3B5998] relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-[#3B5998] transform rotate-45"></div>
              </div>
            </div>
            <div className="text-center w-20">
              <div className="text-[18px] font-bold text-gray-800">北京市</div>
              <div className="text-[13px] text-gray-500 mt-1">寇旭</div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] rounded-lg p-2.5 flex items-center text-[12px] text-gray-600 mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#3B5998] mr-1.5" />
            签收时间：2022-03-17 13:39
          </div>

          <div className="flex justify-end gap-2.5">
            <button className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] text-gray-600">取消申请</button>
            <button className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] text-gray-600">修改申请</button>
            <button className="px-4 py-1.5 bg-[#3B5998] text-white rounded-full text-[13px]">查看物流</button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <div className="fixed bottom-12 left-0 bg-[#E8F0FE] text-[#3B5998] rounded-r-full py-2 px-3 flex items-center shadow-sm cursor-pointer">
        <Truck className="w-5 h-5 mr-1" />
        <div className="flex flex-col text-[10px] font-medium leading-tight">
          <span>入仓</span>
          <span>申请打包</span>
        </div>
      </div>

      <BottomNavBar activeTab="search" onModuleChange={onModuleChange} />
    </div>
  );
}
