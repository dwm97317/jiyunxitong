import { useState } from 'react';

interface QueryInputProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
}

export default function QueryInput({ onNavigate, onBack }: QueryInputProps) {
  const [inputValue, setInputValue] = useState('TRK-88294');

  const suggestions = [
    {
      id: 1,
      trackingNumber: 'TRK-882944012',
      description: '电子产品订单',
      status: '运输中',
      statusColor: 'primary'
    },
    {
      id: 2,
      trackingNumber: 'TRK-882945678',
      description: '服装包裹',
      status: '已签收',
      statusColor: 'green'
    },
    {
      id: 3,
      trackingNumber: 'TRK-882933445',
      description: '图书订单',
      status: '待取件',
      statusColor: 'orange'
    },
    {
      id: 4,
      trackingNumber: 'TRK-882911223',
      description: '食品包裹',
      status: '派送中',
      statusColor: 'blue'
    }
  ];

  const getStatusColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'text-blue-600',
      green: 'text-green-600',
      orange: 'text-orange-600',
      blue: 'text-blue-400'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      {/* Top Nav */}
      <div className="flex items-center bg-white dark:bg-slate-900 px-4 py-3 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-start cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center text-slate-900 dark:text-white">查询</h2>
        <button className="flex size-10 items-center justify-end cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">qr_code_scanner</span>
        </button>
      </div>

      {/* Search Input Area */}
      <div className="bg-white dark:bg-slate-900 px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl border-2 border-blue-600 px-3 py-2.5">
            <span className="material-symbols-outlined text-slate-400 mr-2">search</span>
            <div className="flex-1 flex items-center text-base font-medium text-slate-900 dark:text-white">
              {inputValue}
              <span className="inline-block w-0.5 h-5 bg-blue-600 ml-1 animate-pulse"></span>
            </div>
            <button 
              onClick={() => setInputValue('')}
              className="material-symbols-outlined text-slate-400 ml-2 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              cancel
            </button>
          </div>
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            查询
          </button>
        </div>

        <div className="flex justify-between items-center mt-4 px-1">
          <button className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
            <span className="material-symbols-outlined text-lg">delete_sweep</span>
            清空输入
          </button>
          <button className="text-sm text-blue-600 font-medium bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
            粘贴剪贴板
          </button>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="mt-4 px-4 pb-24 flex-1 overflow-y-auto">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 ml-1 uppercase tracking-wider">相关运单</h3>
        <div className="flex flex-col gap-2">
          {suggestions.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onNavigate?.('queryResults')}
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                  TRK-8829
                  <span className={`${getStatusColor(item.statusColor)}`}>
                    {item.trackingNumber.substring(8)}
                  </span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {item.description} · <span className={getStatusColor(item.statusColor)}>{item.status}</span>
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 pb-8 pt-2">
        <div className="flex justify-around items-center px-2">
          <a 
            onClick={() => onNavigate?.('home')}
            className="flex flex-col items-center gap-1 flex-1 py-1 cursor-pointer hover:text-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400">home</span>
            <span className="text-[10px] font-medium text-slate-400">首页</span>
          </a>
          <a 
            onClick={() => onNavigate?.('packageList')}
            className="flex flex-col items-center gap-1 flex-1 py-1 cursor-pointer text-blue-600"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>package_2</span>
            <span className="text-[10px] font-bold text-blue-600">包裹</span>
          </a>
          <a 
            onClick={() => onNavigate?.('addPackage')}
            className="flex flex-col items-center gap-1 flex-1 py-1 cursor-pointer -mt-6"
          >
            <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg shadow-blue-600/30 border-4 border-white dark:border-slate-900 hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-2xl">add</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 mt-1">添加</span>
          </a>
          <a 
            onClick={() => onNavigate?.('warehouse')}
            className="flex flex-col items-center gap-1 flex-1 py-1 cursor-pointer hover:text-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400">warehouse</span>
            <span className="text-[10px] font-medium text-slate-400">仓库</span>
          </a>
          <a 
            onClick={() => onNavigate?.('profile')}
            className="flex flex-col items-center gap-1 flex-1 py-1 cursor-pointer hover:text-blue-600 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400">person</span>
            <span className="text-[10px] font-medium text-slate-400">我的</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
