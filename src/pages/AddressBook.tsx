import { ChevronLeft, MoreHorizontal, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddressBook() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">地址簿</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto">
        <AddressCard />
        <AddressCard />
      </div>

      {/* Bottom Bar */}
      <div className="p-4 bg-white border-t border-gray-100 flex space-x-3 pb-safe">
        <button className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-full py-3 font-medium active:bg-gray-50 transition-colors">
          创建新地址
        </button>
        <button className="flex-1 bg-blue-500 text-white rounded-full py-3 font-medium active:bg-blue-600 transition-colors">
          已选 0 条
        </button>
      </div>
    </div>
  );
}

function AddressCard() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="text-base font-bold text-gray-900">
          何宇 187****6669
        </div>
        <button className="text-sm text-gray-500">编辑</button>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        北京市朝阳区将府家园109号楼1601
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="w-5 h-5 rounded-full border border-gray-300"></div>
        <button className="flex items-center space-x-1 text-sm text-gray-500">
          <Copy size={16} />
          <span>复制</span>
        </button>
      </div>
    </div>
  );
}
