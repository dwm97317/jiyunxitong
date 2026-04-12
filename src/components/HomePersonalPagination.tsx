import { useState } from 'react';

interface HomePersonalPaginationProps {
  onNavigate?: (screen: string) => void;
}

export default function HomePersonalPagination({ onNavigate }: HomePersonalPaginationProps) {
  const [activeTab, setActiveTab] = useState('personal');
  const [searchInput, setSearchInput] = useState('');

  const packages = [
    {
      id: 1,
      status: '派送中',
      statusColor: 'orange',
      trackingNumber: 'TRK-445566778',
      updateTime: '1小时前更新',
      icon: 'auto_stories',
      title: '图书文具包裹',
      from: '上海',
      to: '东京',
      statusDetail: '正在派送中'
    },
    {
      id: 2,
      status: '清关中',
      statusColor: 'primary',
      trackingNumber: 'TRK-223344556',
      updateTime: '3小时前更新',
      icon: 'fitness_center',
      title: '运动器材订单',
      from: '北京',
      to: '洛杉矶',
      statusDetail: '海关审核中'
    },
    {
      id: 3,
      status: '已入库',
      statusColor: 'green',
      trackingNumber: 'TRK-998877665',
      updateTime: '2023-10-25',
      icon: 'face_retouching_natural',
      title: '美妆护肤品',
      from: '杭州',
      to: '悉尼',
      statusDetail: '等待发货'
    }
  ];

  const getStatusBgColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    };
    return colors[color] || colors.primary;
  };

  const getStatusDetailColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'text-blue-600 dark:text-blue-400',
      orange: 'text-orange-600 dark:text-orange-400',
      green: 'text-green-600 dark:text-green-400'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="font-display bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-slate-50 dark:bg-slate-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">menu</span>
        </div>
        <h1 className="text-[16px] font-bold">我的快递</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">scan_delete</span>
          </button>
          <button className="relative flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-slate-50 dark:border-slate-900"></span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-2">
        <label className="relative flex items-center w-full h-11">
          <div className="absolute left-4 flex items-center justify-center text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            className="w-full h-full pl-11 pr-4 bg-slate-200 dark:bg-slate-800 border-none rounded-full text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-400/20 dark:text-white"
            placeholder="请输入运单号"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </label>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-2">
        <div className="flex items-center gap-8 border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('personal')}
            className={`relative pb-3 text-sm font-${activeTab === 'personal' ? 'bold' : 'medium'} ${
              activeTab === 'personal' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            个人件
            {activeTab === 'personal' && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 dark:bg-blue-400 rounded-full"></div>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('consolidated')}
            className={`pb-3 text-sm font-${activeTab === 'consolidated' ? 'bold' : 'medium'} ${
              activeTab === 'consolidated' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            集运件
          </button>
          <button 
            onClick={() => setActiveTab('cabinet')}
            className={`pb-3 text-sm font-${activeTab === 'cabinet' ? 'bold' : 'medium'} ${
              activeTab === 'cabinet' 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            整柜直达
          </button>
        </div>
      </div>

      {/* Package List */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col gap-1">
                <span className={`text-xs font-bold ${getStatusBgColor(pkg.statusColor)} px-2 py-0.5 rounded w-fit`}>
                  {pkg.status}
                </span>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {pkg.trackingNumber}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">{pkg.updateTime}</span>
            </div>

            <div className="flex items-center gap-4 py-3 border-y border-slate-50 dark:border-slate-700">
              <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
                  {pkg.icon}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {pkg.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <span>{pkg.from}</span>
                  <span className="material-symbols-outlined text-[12px]">trending_flat</span>
                  <span>{pkg.to}</span>
                </div>
              </div>
            </div>

            <div className={`mt-3 flex items-center gap-2 ${getStatusDetailColor(pkg.statusColor)}`}>
              <span className="material-symbols-outlined text-[18px]">
                {pkg.statusColor === 'orange' ? 'local_shipping' : pkg.statusColor === 'primary' ? 'gavel' : 'inventory_2'}
              </span>
              <span className="text-sm font-medium">{pkg.statusDetail}</span>
            </div>
          </div>
        ))}

        {/* Pagination Indicator */}
        <div className="flex justify-center items-center gap-1.5 py-4">
          <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          <div className="w-4 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
          <div className="size-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 pb-6 pt-2 flex items-center justify-between z-50">
        <a 
          onClick={() => onNavigate?.('home')}
          className="flex flex-col items-center gap-1 flex-1 text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-bold">首页</span>
        </a>
        <a 
          onClick={() => onNavigate?.('packageList')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">package_2</span>
          <span className="text-[10px] font-medium">包裹</span>
        </a>
        <div className="flex flex-col items-center flex-1 -translate-y-4">
          <button 
            onClick={() => onNavigate?.('addPackage')}
            className="size-14 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[32px]">add</span>
          </button>
          <span className="text-[10px] font-medium text-slate-400 mt-1 translate-y-3">添加</span>
        </div>
        <a 
          onClick={() => onNavigate?.('warehouse')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">warehouse</span>
          <span className="text-[10px] font-medium">仓库</span>
        </a>
        <a 
          onClick={() => onNavigate?.('profile')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">我的</span>
        </a>
      </nav>
    </div>
  );
}
