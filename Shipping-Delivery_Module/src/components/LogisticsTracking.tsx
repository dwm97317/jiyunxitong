import { ChevronLeft, Truck, Package, CheckCircle2, Circle } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface LogisticsTrackingProps {
  onBack: () => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function LogisticsTracking({ onBack, onModuleChange }: LogisticsTrackingProps) {
  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://picsum.photos/seed/map/800/1200" className="w-full h-full object-cover opacity-20 grayscale" alt="map" />
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <path d="M 150 400 L 220 280 L 280 320 L 320 200" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="150" cy="400" r="12" fill="#3B82F6" stroke="white" strokeWidth="4" />
          <circle cx="150" cy="400" r="4" fill="white" />
        </svg>
      </div>

      <div className="z-10 bg-white/90 backdrop-blur-md">
        <div className="h-11 w-full flex justify-between items-center px-6">
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
        <div className="flex items-center justify-between px-4 py-2">
          <button onClick={onBack}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-medium">运单详情</h1>
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2.5 py-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
            <div className="w-[1px] h-3 bg-gray-200 mx-1"></div>
            <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-black flex items-center justify-center">
              <div className="w-1 h-1 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-10 px-4 mt-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-50">
            <span className="text-[13px] text-gray-500">一票多件</span>
            <div className="w-8 h-8 rounded-full border border-orange-400 flex items-center justify-center text-orange-400 text-[8px] transform rotate-12 font-medium text-center leading-tight">
              个人件
            </div>
          </div>
          
          <div className="px-4 py-5 flex justify-between items-center border-b border-gray-50">
            <div>
              <div className="text-[22px] font-bold mb-1">运送中</div>
              <div className="text-[13px] text-gray-500">预计4月2日22:00前送达</div>
            </div>
            <div className="flex items-center space-x-3 text-[15px] font-medium">
              <span>南昌市</span>
              <div className="w-10 h-[1.5px] bg-blue-600 relative">
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-blue-600 rotate-45"></div>
              </div>
              <span>北京市</span>
            </div>
          </div>
          
          <div className="p-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
              <div className="flex items-center text-[14px]">
                <div className="w-5 h-5 bg-black text-white rounded text-[10px] flex items-center justify-center mr-2 font-bold">SF</div>
                运单号: SF1437829133905
              </div>
              <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-600 text-white" />
            </div>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center text-[14px]">
                <div className="w-5 h-5 bg-[#351C15] text-[#FFB500] rounded text-[10px] flex items-center justify-center mr-2 font-bold">UPS</div>
                运单号: SF1437829133905
              </div>
              <Circle className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-20 h-[45%] flex flex-col">
        <div className="flex justify-center pt-3 pb-4">
          <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="px-5 pb-4 font-medium text-[17px]">物流详情</div>
        
        <div className="flex-1 overflow-y-auto px-5">
          <div className="relative pl-6 border-l border-gray-200 ml-3 space-y-7">
            <div className="relative">
              <div className="absolute -left-[33px] bg-blue-600 rounded-full p-1.5 border-4 border-white">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="text-blue-600 font-medium text-[16px] mb-1.5">运送中</div>
              <div className="text-[14px] text-gray-800 mb-1">2022-04-02 14:38</div>
              <div className="text-[14px] text-gray-800">快件已发车</div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[29px] w-2.5 h-2.5 bg-gray-300 rounded-full border-[3px] border-white box-content"></div>
              <div className="text-[14px] text-gray-500 mb-1">2022-04-02 14:38</div>
              <div className="text-[14px] text-gray-500 leading-relaxed">快件在【北京顺航中转场】完成分拣，准备发往【北京朝阳小红门营业点】</div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[29px] w-2.5 h-2.5 bg-gray-300 rounded-full border-[3px] border-white box-content"></div>
              <div className="text-[14px] text-gray-500 mb-1">2022-04-02 09:53</div>
              <div className="text-[14px] text-gray-500">快件到达【北京顺航中转场】</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] w-2.5 h-2.5 bg-gray-300 rounded-full border-[3px] border-white box-content"></div>
              <div className="text-[14px] text-gray-500 mb-1">2022-04-01 01:17</div>
              <div className="text-[14px] text-gray-500">快件到达【北京顺航中转场】</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[29px] w-2.5 h-2.5 bg-gray-300 rounded-full border-[3px] border-white box-content"></div>
              <div className="text-[14px] text-gray-500 mb-1">2022-03-31 21:22</div>
              <div className="text-[14px] text-gray-500 leading-relaxed">快件在【南昌昌北中转场】完成分拣，准备发往【北京顺航中转场】</div>
            </div>

            <div className="relative">
              <div className="absolute -left-[33px] bg-gray-200 rounded-full p-1.5 border-4 border-white">
                <Package className="w-4 h-4 text-gray-500" />
              </div>
              <div className="text-gray-800 font-medium text-[17px] mb-2">已揽收</div>
              <div className="text-[14px] text-gray-500 mb-1">2022-03-31 17:16</div>
              <div className="text-[14px] text-gray-500">已收取快件</div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavBar activeTab="search" onModuleChange={onModuleChange} />
    </div>
  );
}
