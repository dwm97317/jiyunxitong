import { useState } from 'react';

interface HomeDirectCabinetProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
}

export default function HomeDirectCabinet({ onNavigate, onBack }: HomeDirectCabinetProps) {
  const [activeTab, setActiveTab] = useState('cabinet');
  const [searchInput, setSearchInput] = useState('');

  const cabinets = [
    {
      id: 1,
      status: '装柜中',
      statusColor: 'orange',
      cabinetId: 'FCL-789012345',
      title: '整柜订单 #A001',
      from: '深圳港',
      to: '洛杉矶港',
      type: '40尺高柜 (40HQ)',
      estimatedDate: '2023年10月28日',
      updateTime: '3小时前更新',
      detail: '正在装柜，预计明日封柜'
    },
    {
      id: 2,
      status: '海运中',
      statusColor: 'blue',
      cabinetId: 'FCL-456789012',
      title: '整柜订单 #A002',
      from: '上海港',
      to: '纽约港',
      type: '20尺标准柜 (20GP)',
      estimatedDate: '2023年10月20日',
      updateTime: '1天前更新',
      detail: '船名：COSCO GLORY，航程约25天'
    },
    {
      id: 3,
      status: '已到港',
      statusColor: 'green',
      cabinetId: 'FCL-123456789',
      title: '整柜订单 #A003',
      from: '广州港',
      to: '悉尼港',
      type: '40尺标准柜 (40GP)',
      estimatedDate: '2023年10月24日',
      updateTime: '已到港：2023年10月24日',
      detail: '等待清关提柜'
    }
  ];

  const getStatusBgColor = (color: string) => {
    const colors: Record<string, string> = {
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    };
    return colors[color] || colors.orange;
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-900 overflow-x-hidden">
      {/* Top Nav */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="flex items-center justify-center p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-base font-bold text-slate-900 dark:text-slate-50">我的快递</h1>
        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined">qr_code_scanner</span>
          </button>
          <button className="relative flex items-center justify-center p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900">
        <div className="flex items-center w-full h-10 px-4 bg-slate-200 dark:bg-slate-800 rounded-full">
          <span className="material-symbols-outlined text-slate-500 text-xl">search</span>
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400"
            placeholder="请输入运单号"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 justify-around bg-slate-50 dark:bg-slate-900">
        <a 
          onClick={() => setActiveTab('personal')}
          className={`relative px-2 py-3 text-sm font-${activeTab === 'personal' ? 'bold' : 'medium'} ${
            activeTab === 'personal' 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-slate-500 dark:text-slate-400'
          } hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer`}
        >
          个人件
        </a>
        <a 
          onClick={() => setActiveTab('consolidated')}
          className={`relative px-2 py-3 text-sm font-${activeTab === 'consolidated' ? 'bold' : 'medium'} ${
            activeTab === 'consolidated' 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-slate-500 dark:text-slate-400'
          } hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer`}
        >
          集运件
        </a>
        <a 
          onClick={() => setActiveTab('cabinet')}
          className={`relative px-2 py-3 text-sm font-bold text-blue-600 dark:text-blue-400 cursor-pointer`}
        >
          整柜直达
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
        </a>
      </div>

      {/* Order List */}
      <main className="flex-1 p-4 space-y-4 pb-24 overflow-y-auto">
        {cabinets.map((cabinet) => (
          <div 
            key={cabinet.id}
            className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {cabinet.cabinetId}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {cabinet.title}
                </h3>
              </div>
              <span className={`px-2 py-1 text-xs font-bold rounded ${getStatusBgColor(cabinet.statusColor)}`}>
                {cabinet.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm">location_on</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {cabinet.from} → {cabinet.to}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs text-slate-500 dark:text-slate-400">
                <p>柜型: {cabinet.type}</p>
                <p>预计装柜: {cabinet.estimatedDate}</p>
                <p>更新时间: {cabinet.updateTime}</p>
                <p className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                  详情: {cabinet.detail}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-50 dark:border-slate-700">
              <button className="bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom NavBar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 pb-5 pt-2 flex items-center justify-around z-30">
        <a 
          onClick={() => onNavigate?.('home')}
          className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-medium">首页</span>
        </a>
        <a 
          onClick={() => onNavigate?.('packageList')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">package_2</span>
          <span className="text-[10px] font-medium">包裹</span>
        </a>

        {/* Center Add Button */}
        <div className="relative -top-6">
          <button 
            onClick={() => onNavigate?.('addPackage')}
            className="flex items-center justify-center w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-full shadow-lg shadow-blue-600/40 border-4 border-white dark:border-slate-900 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined text-white text-3xl">add</span>
          </button>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-400">添加</span>
        </div>

        <a 
          onClick={() => onNavigate?.('warehouse')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">warehouse</span>
          <span className="text-[10px] font-medium">仓库</span>
        </a>
        <a 
          onClick={() => onNavigate?.('profile')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">person</span>
          <span className="text-[10px] font-medium">我的</span>
        </a>
      </nav>
    </div>
  );
}
