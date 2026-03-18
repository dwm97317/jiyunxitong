import { ChevronLeft, MoreHorizontal, Search } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface InviteRecordProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function InviteRecord({ onBack, onNavigate, onModuleChange }: InviteRecordProps) {
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => onBack?.()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">邀请记录</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="p-4 bg-white">
        <div className="bg-gray-100 rounded-lg p-2.5 flex items-center space-x-2">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索姓名、电话、地址" 
            className="bg-transparent flex-1 text-sm outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* List */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-base font-bold text-gray-900 mb-2">
            何宇 187****6669
          </div>
          <div className="text-sm text-gray-600 mb-4">
            北京市朝阳区将府家园109号楼1601
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="text-xs text-gray-400">
              2022/05/25 23:55 提交
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-1.5 rounded-full border border-gray-300 text-sm text-gray-600 active:bg-gray-50">
                删除
              </button>
              <button className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm active:bg-blue-700">
                去下单
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
