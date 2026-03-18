import { ChevronLeft, MoreHorizontal, Circle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-12">
      <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100">
        <MoreHorizontal className="w-4 h-4" />
        <div className="w-[1px] h-3 bg-current opacity-30"></div>
        <Circle className="w-4 h-4" />
      </div>
    </div>
  );
};

export default function ApplyGroupLeader() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-white sticky top-0 z-10">
        <TopBar title="申请团长" />
      </div>

      <div className="p-4 flex-1">
        <div className="bg-white rounded-2xl px-4 py-1 shadow-sm">
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm">请选择绑定网点</span>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请选择</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm w-20">姓名</span>
            <input 
              type="text" 
              placeholder="请输入姓名" 
              className="flex-1 text-right text-sm outline-none text-gray-900 placeholder-gray-300" 
            />
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm w-20">电话</span>
            <input 
              type="tel" 
              placeholder="请输入电话号码" 
              className="flex-1 text-right text-sm outline-none text-gray-900 placeholder-gray-300" 
            />
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm w-20">验证码</span>
            <div className="flex-1 flex items-center justify-end space-x-3">
              <input 
                type="text" 
                placeholder="请输入验证码" 
                className="w-24 text-right text-sm outline-none text-gray-900 placeholder-gray-300" 
              />
              <div className="w-[1px] h-3 bg-gray-200"></div>
              <button className="text-blue-600 text-sm whitespace-nowrap">获取验证码</button>
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-gray-700 text-sm w-20">地址</span>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请填写</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pb-8">
        <button className="w-full bg-blue-600 text-white py-3.5 rounded-full font-medium text-base shadow-md shadow-blue-600/20">
          提交申请
        </button>
      </div>
    </div>
  );
}
