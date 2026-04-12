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

export default function InitiateGroupBuy() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-white sticky top-0 z-10">
        <TopBar title="发起拼团" />
      </div>

      <div className="p-4 flex-1 space-y-4">
        <div className="bg-white rounded-2xl px-4 py-1 shadow-sm">
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm">开团时间</span>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请选择</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm">截止时间</span>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请选择</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm">拼团人数</span>
            <input type="text" placeholder="请输入拼团人数" className="flex-1 text-right text-sm outline-none text-gray-900 placeholder-gray-300" />
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm">拼团重量</span>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请选择</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="flex items-center justify-between py-4">
            <span className="text-gray-700 text-sm">拼团类型</span>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请选择</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-gray-900 mb-2">收货地址</h2>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm w-20">姓名</span>
            <input type="text" placeholder="请输入姓名" className="flex-1 text-right text-sm outline-none text-gray-900 placeholder-gray-300" />
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <span className="text-gray-700 text-sm w-20">电话</span>
            <input type="tel" placeholder="请输入电话号码" className="flex-1 text-right text-sm outline-none text-gray-900 placeholder-gray-300" />
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
          发起拼团
        </button>
      </div>
    </div>
  );
}
