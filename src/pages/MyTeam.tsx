import { ChevronLeft, MoreHorizontal, Circle, Map, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

const TeamMemberCard = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <img src="https://i.pravatar.cc/150?img=32" alt="avatar" className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="text-sm font-medium text-gray-900">梦想家Hyuk</div>
          <div className="text-xs text-gray-500 mt-0.5">手机号：187****6669</div>
        </div>
      </div>
      <div className="text-xs text-gray-400">2022/06/07</div>
    </div>
    
    <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">累计收益：</span>
        <span className="text-blue-600 font-medium">¥ 200</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">支付单数：</span>
        <span className="text-gray-900">145单</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">交易金额：</span>
        <span className="text-gray-900">¥ 24342.22</span>
      </div>
    </div>
  </div>
);

export default function MyTeam() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [isEmpty] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-white sticky top-0 z-10">
        <TopBar title="我的团队" />
        <div className="flex px-4 border-b border-gray-100">
          <div 
            onClick={() => setActiveTab('all')}
            className={`flex-1 text-center py-3 text-sm font-medium relative cursor-pointer ${
              activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            全部客户
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
          <div 
            onClick={() => setActiveTab('today')}
            className={`flex-1 text-center py-3 text-sm relative cursor-pointer ${
              activeTab === 'today' ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}
          >
            今日新增
            {activeTab === 'today' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
          <div 
            onClick={() => setActiveTab('week')}
            className={`flex-1 text-center py-3 text-sm relative cursor-pointer ${
              activeTab === 'week' ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}
          >
            本周新增
            {activeTab === 'week' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 flex-1">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center pt-20">
            <div className="w-40 h-40 bg-gray-100 rounded-full mb-6 flex items-center justify-center relative">
              <Map className="w-16 h-16 text-blue-200" />
              <MapPin className="w-8 h-8 text-blue-400 absolute top-8" />
            </div>
            <p className="text-gray-500 text-sm mb-8">当前暂无客户，去邀请好友吧！</p>
            <button 
              onClick={() => navigate('/invite')}
              className="bg-blue-600 text-white px-12 py-3 rounded-full font-medium text-sm shadow-md shadow-blue-600/20"
            >
              邀请好友
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <TeamMemberCard />
            <TeamMemberCard />
            <TeamMemberCard />
          </div>
        )}
      </div>
    </div>
  );
}
