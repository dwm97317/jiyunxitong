import { ChevronLeft, MoreHorizontal, Circle, ChevronRight, Plus, CheckCircle2 } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

const TopBar = ({ title }: { title: string }) => {
    
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-12">
      <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => onBack?.()} />
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-100">
        <MoreHorizontal className="w-4 h-4" />
        <div className="w-[1px] h-3 bg-current opacity-30"></div>
        <Circle className="w-4 h-4" />
      </div>
    </div>
  );
};

interface StandardExpressProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function StandardExpress({ onBack, onNavigate, onModuleChange }: StandardExpressProps) {
    
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col relative pb-24">
      <div className="bg-white sticky top-0 z-10">
        <TopBar title="标快件" />
      </div>

      <div className="p-4 flex-1 space-y-4">
        <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <div className="flex items-center">
              <span className="text-gray-700 text-sm mr-2">快递单号</span>
              <span className="text-[10px] text-blue-500 border border-blue-500 rounded-full px-1.5 py-0.5">必填</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请预报国内单号</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b border-gray-50">
            <div className="flex items-center">
              <span className="text-gray-700 text-sm mr-2">货物名称</span>
              <span className="text-[10px] text-blue-500 border border-blue-500 rounded-full px-1.5 py-0.5">当前为食品专线</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>请完善货物名称</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          <div className="py-4 flex justify-center items-center text-gray-900 font-medium">
            添加 <Plus className="w-5 h-5 ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center mb-4">
            <span className="text-gray-700 text-sm mr-4">保价</span>
            <span className="text-xs text-gray-400">未保价物品最高赔付2倍运费，建议足额报价</span>
          </div>
          
          <div className="flex space-x-3 mb-5">
            <div className="flex-1 bg-gray-50 rounded-lg p-3 flex items-center justify-between border border-gray-100">
              <span className="text-sm text-gray-700">价值1-350元</span>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-1">¥5</span>
                <CheckCircle2 className="w-4 h-4 text-gray-300" />
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-3 flex items-center justify-between border border-gray-100">
              <span className="text-sm text-gray-700">自定义物品价值</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-700 text-sm">是否需要拍照</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <Circle className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-600">是</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Circle className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-600">否</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-2xl p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              券
            </div>
            <span className="text-sm text-gray-800">邀请好友一起来领券！</span>
          </div>
          <button 
            onClick={() => navigate('/invite')}
            className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-xs font-medium"
          >
            立即邀请
          </button>
        </div>

        <div className="flex items-center space-x-2 px-1">
          <Circle className="w-4 h-4 text-gray-300" />
          <span className="text-xs text-gray-400">我已阅读并同意遵守 <span className="text-gray-600">《极光转运服务条款》</span></span>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 p-4 flex items-center justify-between pb-8">
        <div>
          <div className="text-sm text-gray-900 mb-0.5">预估 <span className="text-blue-600 font-medium text-lg">--</span></div>
          <div className="text-[10px] text-gray-400">最终费用以仓库称重后开单为准</div>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium text-sm shadow-md shadow-blue-600/20">
          立即下单
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
