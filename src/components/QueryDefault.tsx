import { useState } from 'react';

interface QueryDefaultProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
}

export default function QueryDefault({ onNavigate, onBack }: QueryDefaultProps) {
  const [searchInput, setSearchInput] = useState('');

  const historyItems = [
    {
      id: 1,
      trackingNumber: 'TRK-882944012',
      status: '运输中',
      statusColor: 'primary',
      time: '2小时前'
    },
    {
      id: 2,
      trackingNumber: 'TRK-77102394',
      status: '已签收',
      statusColor: 'emerald',
      time: '昨天'
    },
    {
      id: 3,
      trackingNumber: 'TRK-99021145',
      status: '待取件',
      statusColor: 'orange',
      time: '3天前'
    }
  ];

  const quickAccessItems = [
    { icon: 'qr_code_scanner', label: '扫码查询' },
    { icon: 'photo_camera', label: '拍照查询' },
    { icon: 'mic', label: '语音查询' },
    { icon: 'history', label: '历史记录' }
  ];

  const getStatusBgColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-blue-100 text-blue-600',
      emerald: 'bg-emerald-100 text-emerald-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back_ios</span>
        </button>
        <h1 className="text-[16px] font-bold text-slate-900 dark:text-white">查询</h1>
        <button className="flex items-center justify-center size-10 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-white">scan_delete</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Search Area */}
        <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate?.('queryInput')}>
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input 
            className="flex-1 border-none focus:ring-0 bg-transparent text-[14px] placeholder:text-slate-400 p-0 dark:bg-slate-800 dark:text-white"
            placeholder="请输入运单号或手机号"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate?.('queryInput');
            }}
          />
          <button 
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium text-[14px] hover:bg-blue-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate?.('queryInput');
            }}
          >
            查询
          </button>
        </div>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          {quickAccessItems.map((item, index) => (
            <button 
              key={index}
              className="bg-white dark:bg-slate-800 rounded-lg p-3 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="size-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">{item.icon}</span>
              </div>
              <span className="text-[12px] text-slate-700 dark:text-slate-300 text-center">{item.label}</span>
            </button>
          ))}
        </div>

        {/* History Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-bold text-slate-900 dark:text-white">最近查询</h2>
            <button className="text-[12px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              清除
            </button>
          </div>

          {/* History List */}
          <div className="space-y-3">
            {historyItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-medium text-slate-900 dark:text-white">{item.trackingNumber}</span>
                    <span className={`text-[12px] ${getStatusBgColor(item.statusColor)} px-2 py-0.5 rounded`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="text-[12px] text-slate-400">{item.time}</span>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-[12px] text-slate-400">
          支持查询近3个月内的运单信息
        </p>
      </main>

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 pb-5 pt-2 flex justify-around items-end">
        <a 
          onClick={() => onNavigate?.('home')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600">home</span>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-600">首页</span>
        </a>
        <a 
          onClick={() => onNavigate?.('packageList')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600">package_2</span>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-600">包裹</span>
        </a>
        <div className="relative -top-4">
          <button className="bg-blue-600 size-14 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/40 border-4 border-white dark:border-slate-900 hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined text-white text-[32px]">add</span>
          </button>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">添加</span>
        </div>
        <a 
          onClick={() => onNavigate?.('warehouse')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600">warehouse</span>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-600">仓库</span>
        </a>
        <a 
          onClick={() => onNavigate?.('profile')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600">person</span>
          <span className="text-[10px] text-slate-400 group-hover:text-blue-600">我的</span>
        </a>
      </nav>
    </div>
  );
}
