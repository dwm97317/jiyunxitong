import React, { useState } from 'react';

const HomePersonal = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  const packages = [
    {
      id: 'TRK-882944012',
      title: '电子产品订单',
      status: '运输中',
      statusColor: 'amber',
      origin: '深圳',
      destination: '纽约',
      lastUpdate: '2小时前更新',
      detail: '已到达分拣中心',
      icon: 'local_shipping',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-primary'
    },
    {
      id: 'TRK-77102394',
      title: '时尚服装包裹',
      status: '已签收',
      statusColor: 'emerald',
      origin: '广州',
      destination: '伦敦',
      lastUpdate: '已送达：2023年10月24日',
      detail: '签收人：前台',
      icon: 'check_circle',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'TRK-99021145',
      title: '家居装饰用品',
      status: '待取件',
      statusColor: 'sky',
      origin: '深圳',
      destination: '巴黎',
      lastUpdate: '等待提取',
      detail: '4号航站楼仓库',
      icon: 'inventory_2',
      iconBg: 'bg-sky-500/10',
      iconColor: 'text-sky-500'
    }
  ];

  const tabs = [
    { id: 'personal', label: '个人件' },
    { id: 'consolidated', label: '集运件' },
    { id: 'container', label: '整柜直达' }
  ];

  const navItems = [
    { id: 'home', icon: 'home', label: '首页', active: true, filled: true },
    { id: 'packages', icon: 'package_2', label: '包裹' },
    { id: 'add', icon: 'add', label: '添加', isCenter: true },
    { id: 'warehouse', icon: 'warehouse', label: '仓库' },
    { id: 'profile', icon: 'person', label: '我的' }
  ];

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative pb-24 bg-[#F2F4F7] dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#F2F4F7] dark:bg-background-dark px-4 pt-4">
        <div className="flex items-center justify-between h-12">
          <button className="flex items-center">
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">menu</span>
          </button>
          <h1 className="text-[17px] font-bold">我的快递</h1>
          <div className="flex gap-4">
            <button className="flex items-center">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">qr_code_scanner</span>
            </button>
            <button className="flex items-center relative">
              <span className="material-symbols-outlined text-slate-700 dark:text-slate-300">notifications</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F2F4F7] dark:border-background-dark"></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-slate-400 text-[20px]">search</span>
            <input
              className="w-full h-11 pl-11 pr-4 bg-slate-200/60 dark:bg-slate-800 border-none rounded-full focus:ring-1 focus:ring-primary text-[15px] placeholder:text-slate-400"
              placeholder="请输入运单号"
              type="text"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mt-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-[15px] font-medium relative ${
                activeTab === tab.id
                  ? 'text-primary font-bold after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-[3px] after:bg-primary after:rounded-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 px-4 py-4 space-y-4">
        {/* Package Cards */}
        {packages.map(pkg => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-white dark:border-slate-800"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${pkg.iconBg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${pkg.iconColor} text-[22px]`}>{pkg.icon}</span>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 leading-tight">{pkg.id}</p>
                  <h3 className="text-[15px] font-bold mt-0.5">{pkg.title}</h3>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 text-[11px] font-bold rounded ${
                  pkg.statusColor === 'amber'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                    : pkg.statusColor === 'emerald'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'bg-sky-50 text-sky-500 dark:bg-sky-900/20 dark:text-sky-400'
                }`}
              >
                {pkg.status}
              </span>
            </div>

            <div className="flex items-center justify-between mt-5 mb-4">
              <div className="flex-1">
                <p className="text-[11px] text-slate-400 mb-0.5">始发地</p>
                <p className="text-[16px] font-bold">{pkg.origin}</p>
              </div>
              <div className="px-4">
                <span className="material-symbols-outlined text-slate-300">trending_flat</span>
              </div>
              <div className="flex-1 text-right">
                <p className="text-[11px] text-slate-400 mb-0.5">目的地</p>
                <p className="text-[16px] font-bold">{pkg.destination}</p>
              </div>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
              <div className="flex flex-col">
                <p className="text-[11px] text-slate-400">{pkg.lastUpdate}</p>
                <p className="text-[13px] font-medium text-slate-600 dark:text-slate-400 mt-0.5">{pkg.detail}</p>
              </div>
              <button className="h-11 bg-primary text-white text-[14px] font-bold px-6 rounded-lg">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-4 pb-8 pt-2 z-40">
        <div className="flex justify-between items-center relative">
          {navItems.map((item, index) => (
            item.isCenter ? (
              <div key={item.id} className="flex-1 flex justify-center -mt-10">
                <button className="w-[58px] h-[58px] bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center border-[4px] border-[#F2F4F7] dark:border-background-dark">
                  <span className="material-symbols-outlined text-white text-[32px]">{item.icon}</span>
                </button>
              </div>
            ) : (
              <a
                key={item.id}
                className={`flex flex-col items-center gap-1 flex-1 ${
                  item.active ? 'text-primary' : 'text-slate-400'
                }`}
                href="#"
              >
                <span className={`material-symbols-outlined text-[26px] ${item.filled ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] ${item.active ? 'font-bold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </a>
            )
          ))}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 text-[10px] font-medium text-slate-400">
            添加
          </span>
        </div>
      </nav>
    </div>
  );
};

export default HomePersonal;
