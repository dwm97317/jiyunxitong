interface QueryResultsProps {
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
}

export default function QueryResults({ onNavigate, onBack }: QueryResultsProps) {

  const timelineItems = [
    {
      id: 1,
      title: '已到达分拣中心',
      location: '深圳分拣中心',
      time: '2023-10-26 14:30',
      isLatest: true
    },
    {
      id: 2,
      title: '运输中',
      location: '深圳 → 香港',
      time: '2023-10-26 08:15',
      isLatest: false
    },
    {
      id: 3,
      title: '已揽收',
      location: '深圳福田区营业点',
      time: '2023-10-25 16:20',
      isLatest: false
    },
    {
      id: 4,
      title: '已下单',
      location: '订单创建成功',
      time: '2023-10-25 15:00',
      isLatest: false
    }
  ];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Top Navigation */}
      <header className="flex items-center bg-white dark:bg-slate-800 px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-slate-900 dark:text-white">查询结果</h1>
        <button className="flex size-10 items-center justify-center text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      {/* Fixed Search Bar Area */}
      <div className="bg-white dark:bg-slate-800 px-4 py-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 rounded-lg px-3 py-2">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium p-0 text-slate-900 dark:text-slate-100"
            readOnly
            type="text"
            value="TRK-882944012"
          />
          <button className="text-blue-600 dark:text-blue-400 text-sm font-bold px-2 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            重新查询
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Package Info Card */}
        <div className="m-4 p-5 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">TRK-882944012</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">电子产品订单</p>
            </div>
            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded">
              运输中
            </span>
          </div>
          <div className="space-y-2 border-t border-slate-50 dark:border-slate-700 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-blue-600 text-lg">location_on</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">深圳 → 纽约</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              <span>预计送达: 2023年10月30日</span>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="px-4 py-2">
          <h3 className="text-base font-bold mb-6 px-1 text-slate-900 dark:text-white">物流详情</h3>
          <div className="relative space-y-8 pl-4">
            {/* Vertical Line */}
            <div className="absolute left-6 top-2 bottom-2 w-px border-l-2 border-dashed border-slate-200 dark:border-slate-700"></div>

            {/* Timeline Items */}
            {timelineItems.map((item) => (
              <div key={item.id} className="relative flex gap-4">
                <div 
                  className={`absolute -left-2 z-10 ${
                    item.isLatest 
                      ? 'size-4 rounded-full bg-blue-600 ring-4 ring-blue-600/20' 
                      : 'size-2 rounded-full bg-slate-300 dark:bg-slate-600'
                  }`}
                ></div>
                <div className="flex flex-col gap-1 pl-6">
                  <p className={`text-sm font-${item.isLatest ? 'bold' : 'medium'} ${
                    item.isLatest 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.location}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-8 flex gap-3">
          <button className="flex-1 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-bold rounded-lg text-sm bg-white dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            联系客服
          </button>
          <button 
            onClick={() => onNavigate?.('orderDetail')}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
          >
            查看详情
          </button>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 pb-6 pt-2 flex justify-between items-center z-50">
        <a 
          onClick={() => onNavigate?.('home')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-medium">首页</span>
        </a>
        <a 
          onClick={() => onNavigate?.('packageList')}
          className="flex flex-col items-center gap-1 flex-1 text-blue-600 cursor-pointer"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>package_2</span>
          <span className="text-[10px] font-medium">包裹</span>
        </a>
        <a 
          onClick={() => onNavigate?.('addPackage')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 cursor-pointer"
        >
          <div className="size-10 bg-blue-600 rounded-full flex items-center justify-center text-white -mt-8 shadow-lg shadow-blue-600/40 hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined">add</span>
          </div>
          <span className="text-[10px] font-medium">添加</span>
        </a>
        <a 
          onClick={() => onNavigate?.('warehouse')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">warehouse</span>
          <span className="text-[10px] font-medium">仓库</span>
        </a>
        <a 
          onClick={() => onNavigate?.('profile')}
          className="flex flex-col items-center gap-1 flex-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium">我的</span>
        </a>
      </nav>
    </div>
  );
}
