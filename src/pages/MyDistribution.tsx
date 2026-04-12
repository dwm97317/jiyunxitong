import { ChevronLeft, MoreHorizontal, Circle, Wallet, Banknote, RefreshCcw, Users, QrCode, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between px-4 pb-3 pt-12 text-white">
      <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
      <h1 className="text-lg font-medium">{title}</h1>
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-700/50">
        <MoreHorizontal className="w-4 h-4" />
        <div className="w-[1px] h-3 bg-current opacity-30"></div>
        <Circle className="w-4 h-4" />
      </div>
    </div>
  );
};

const MenuItem = ({ icon, title, to }: { icon: React.ReactNode; title: string; to?: string }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => to && navigate(to)}
      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 cursor-pointer active:bg-gray-50"
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-gray-800 text-sm">{title}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  );
};

export default function MyDistribution() {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="bg-blue-600 pb-20">
        <TopBar title="我的分销" />
      </div>

      <div className="px-4 -mt-16 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-gray-900 mb-4">收益明细</h2>
          <div className="flex justify-between text-center mb-6">
            <div className="flex-1 border-r border-gray-100">
              <div className="text-2xl font-semibold text-blue-600">256.88</div>
              <div className="text-xs text-gray-400 mt-1">今日收益（元）</div>
            </div>
            <div className="flex-1">
              <div className="text-2xl font-semibold text-gray-900">256.88</div>
              <div className="text-xs text-gray-400 mt-1">本周收益（元）</div>
            </div>
          </div>
          
          <div className="space-y-3 text-sm border-t border-gray-50 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">累计收益：</span>
              <span className="font-medium text-gray-900">¥ 256.88</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">新增会员：</span>
              <span className="font-medium text-gray-900">5人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">会员总数：</span>
              <span className="font-medium text-gray-900">12人</span>
            </div>
          </div>

          <div className="flex justify-between text-sm border-t border-gray-50 mt-4 pt-4">
            <span className="text-gray-500">账户余额：</span>
            <span className="font-medium text-blue-600">¥ 256.88</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-medium text-gray-900 mb-2">佣金服务</h2>
          <div className="space-y-1">
            <MenuItem 
              icon={<Wallet className="w-5 h-5 text-gray-600" />} 
              title="佣金明细" 
              to="/commission"
            />
            <MenuItem 
              icon={<Banknote className="w-5 h-5 text-gray-600" />} 
              title="我要提现" 
            />
            <MenuItem 
              icon={<RefreshCcw className="w-5 h-5 text-gray-600" />} 
              title="返佣订单" 
              to="/rebate-orders"
            />
            <MenuItem 
              icon={<Users className="w-5 h-5 text-gray-600" />} 
              title="我的团队" 
              to="/my-team"
            />
            <MenuItem 
              icon={<QrCode className="w-5 h-5 text-gray-600" />} 
              title="我的二维码" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
