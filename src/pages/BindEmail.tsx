import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BindEmail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
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
    </div>
  );
}
