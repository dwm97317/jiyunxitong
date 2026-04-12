import { useState } from 'react';

interface HomeConsolidatedProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
}

export default function HomeConsolidated({ onNavigate, onBack }: HomeConsolidatedProps) {
  const [searchInput, setSearchInput] = useState('');

  const packages = [
    {
      id: 1,
      status: '待入库',
      statusColor: 'orange',
      consolidatedId: 'CON-556677889',
      title: '集运包裹 #001',
      from: '广州仓库',
      to: '温哥华',
      quantity: '5件',
      weight: '12.5kg',
      updateTime: '等待入库',
      detail: '已预报，等待商品到达仓库'
    },
    {
      id: 2,
      status: '打包中',
      statusColor: 'primary',
      consolidatedId: 'CON-334455667',
      title: '集运包裹 #002',
      from: '深圳仓库',
      to: '墨尔本',
      quantity: '8件',
      weight: '18.3kg',
      updateTime: '2小时前更新',
      detail: '仓库正在打包整理'
    },
    {
      id: 3,
      status: '已发货',
      statusColor: 'green',
      consolidatedId: 'CON-112233445',
      title: '集运包裹 #003',
      from: '上海仓库',
      to: '旧金山',
      quantity: '3件',
      weight: '8.7kg',
      updateTime: '已发货：2023年10月23日',
      detail: '航班号：CA985'
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

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto bg-slate-50 dark:bg-slate-900 shadow-2xl">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-4 pt-4 pb-2 bg-white dark:bg-slate-800">
        <button 
          onClick={onBack}
          className="flex items-center justify-center p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <h1 className="text-[16px] font-bold text-slate-900 dark:text-white">我的快递</h1>
        <div className="flex items-center gap-3">
          <button className="relative flex items-center justify-center p-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">qr_code_scanner</span>
          </button>
          <button className="relative flex items-center justify-center p-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500 border border-white dark:border-slate-800"></span>
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white dark:bg-slate-800">
        <div className="flex h-10 w-full items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-700 px-4">
          <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
          <input 
            className="w-full border-none bg-transparent p-0 text-sm focus:ring-0 placeholder:text-slate-400 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-500"
            placeholder="请输入运单号"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
        <div className="flex px-4 gap-8">
          <a 
            className={`flex flex-col items-center pt-3 pb-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer`}
          >
            <span className="text-sm font-medium">个人件</span>
          </a>
          <a 
            className={`flex flex-col items-center pt-3 pb-2 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 cursor-pointer`}
          >
            <span className="text-sm font-bold">集运件</span>
          </a>
          <a 
            className={`flex flex-col items-center pt-3 pb-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer`}
          >
            <span className="text-sm font-medium">整柜直达</span>
          </a>
        </div>
      </div>

      {/* Package List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {packages.map((pkg) => (
          <div 
            key={pkg.id}
            className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <span className="text-[12px] text-slate-400 dark:text-slate-500 font-medium">
                  {pkg.consolidatedId}
                </span>
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white">
                  {pkg.title}
                </h3>
              </div>
              <span className={`px-2 py-1 rounded text-[12px] font-bold ${getStatusBgColor(pkg.statusColor)}`}>
                {pkg.status}
              </span>
            </div>

            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                <span className="text-sm">{pkg.from} → {pkg.to}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                <p>包裹数量: {pkg.quantity}</p>
                <p>预估重量: {pkg.weight}</p>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">更新时间: {pkg.updateTime}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-2 rounded">
                详情: {pkg.detail}
              </p>
            </div>

            <button className="w-full py-2.5 bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              查看详情
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 pb-6 pt-2">
        <a 
          onClick={() => onNavigate?.('home')}
          className="flex flex-col items-center gap-1 text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-medium">首页</span>
        </a>
        <a 
          onClick={() => onNavigate?.('packageList')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">package_2</span>
          <span className="text-[10px] font-medium">包裹</span>
        </a>

        {/* Center Add Button */}
        <div className="-mt-10 flex flex-col items-center">
          <button 
            onClick={() => onNavigate?.('addPackage')}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined text-[32px]">add</span>
          </button>
          <span className="mt-1 text-[10px] font-medium text-slate-400">添加</span>
        </div>

        <a 
          onClick={() => onNavigate?.('warehouse')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">warehouse</span>
          <span className="text-[10px] font-medium">仓库</span>
        </a>
        <a 
          onClick={() => onNavigate?.('profile')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">我的</span>
        </a>
      </nav>
    </div>
  );
}
