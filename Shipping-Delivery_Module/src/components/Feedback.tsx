import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface FeedbackProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function Feedback({ onBack, onNavigate, onModuleChange }: FeedbackProps) {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white text-gray-900 pt-12 pb-4 px-4 sticky top-0 z-20 flex justify-between items-center">
        <button onClick={() => onBack?.()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">功能反馈</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 bg-white mt-2">
        <div className="bg-gray-50 rounded-xl p-4 h-48">
          <textarea 
            className="w-full h-full bg-transparent resize-none outline-none text-sm text-gray-800 placeholder-gray-400"
            placeholder="请输入您要反馈的内容"
          ></textarea>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
