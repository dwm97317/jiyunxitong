import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">实名认证</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Form */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          
          <div className="flex items-center p-4 border-b border-gray-100">
            <div className="w-24 flex items-center space-x-2">
              <span className="text-sm text-gray-800">姓名</span>
              <span className="text-[10px] text-blue-500 border border-blue-200 bg-blue-50 px-1 rounded">必填</span>
            </div>
            <input 
              type="text" 
              placeholder="请输入姓名" 
              className="flex-1 text-sm text-right outline-none placeholder-gray-400"
            />
          </div>

          <div className="flex items-center p-4 border-b border-gray-100">
            <div className="w-24 flex items-center space-x-2">
              <span className="text-sm text-gray-800">电话</span>
              <span className="text-[10px] text-blue-500 border border-blue-200 bg-blue-50 px-1 rounded">必填</span>
            </div>
            <input 
              type="tel" 
              placeholder="请填写电话号码" 
              className="flex-1 text-sm text-right outline-none placeholder-gray-400"
            />
          </div>

          <div className="flex items-center p-4 border-b border-gray-100">
            <div className="w-24 flex items-center space-x-2">
              <span className="text-sm text-gray-800">验证码</span>
              <span className="text-[10px] text-blue-500 border border-blue-200 bg-blue-50 px-1 rounded">必填</span>
            </div>
            <input 
              type="text" 
              placeholder="请输入验证码" 
              className="flex-1 text-sm text-right outline-none placeholder-gray-400 pr-4"
            />
            <div className="pl-4 border-l border-gray-200">
              <button className="text-sm text-blue-500 whitespace-nowrap">获取验证码</button>
            </div>
          </div>

          <div className="flex items-center p-4">
            <div className="w-24 flex items-center space-x-2">
              <span className="text-sm text-gray-800">收货地址</span>
              <span className="text-[10px] text-blue-500 border border-blue-200 bg-blue-50 px-1 rounded">必填</span>
            </div>
            <div className="flex-1 flex justify-end items-center space-x-1 text-gray-500">
              <span className="text-sm">已填写</span>
              <ChevronRight size={18} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
