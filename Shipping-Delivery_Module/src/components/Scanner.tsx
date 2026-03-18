import { ChevronLeft, MoreHorizontal, Circle, Image as ImageIcon, Zap } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

export default function Scanner({ onBack, onModuleChange }: { onBack: () => void; onModuleChange?: (module: string, screen?: string) => void }) {
  return (
    <div className="bg-[#333333] min-h-full flex flex-col text-white font-sans">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
        <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
          <MoreHorizontal className="w-4 h-4" />
          <div className="w-[1px] h-3.5 bg-white/40"></div>
          <Circle className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        {/* Scanner Frame */}
        <div className="relative w-[280px] h-[280px] mb-8">
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white"></div>
          
          {/* Inner area */}
          <div className="w-full h-full bg-[#F5F5F5] relative overflow-hidden">
             {/* Scanning line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2 text-[14px] text-gray-300">
          <p>二维码/条形码 放入框内，自动扫描</p>
          <p>扫一扫查快递、取快递</p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="pb-16 flex justify-center gap-16">
        <div className="w-12 h-12 rounded-full bg-[#444444] flex items-center justify-center cursor-pointer">
          <ImageIcon className="w-6 h-6 text-white" />
        </div>
        <div className="w-12 h-12 rounded-full bg-[#444444] flex items-center justify-center cursor-pointer">
          <Zap className="w-6 h-6 text-white" />
        </div>
      </div>

      <BottomNavBar activeTab="search" onModuleChange={onModuleChange} />
    </div>
  );
}
