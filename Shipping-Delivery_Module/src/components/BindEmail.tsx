import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface BindEmailProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function BindEmail({ onBack, onNavigate, onModuleChange }: BindEmailProps) {
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => onBack?.()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">绑定邮箱</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Input */}
      <div className="p-4 bg-white">
        <div className="bg-gray-100 rounded-lg p-3">
          <input 
            type="email" 
            placeholder="请输入邮箱地址" 
            className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
            autoFocus
          />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
