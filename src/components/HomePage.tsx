import React from 'react';
import { Package, Search, Home as HomeIcon, Truck } from 'lucide-react';

interface HomePageProps {
  onNavigate: (screen: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const projects = [
    {
      id: 'packageList',
      name: '快递管理',
      description: '包裹列表与订单管理',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      path: '/express-delivery-system'
    },
    {
      id: 'checkExpress',
      name: '查快递',
      description: '快递查询与追踪',
      icon: Search,
      color: 'from-green-500 to-green-600',
      path: '/kjhjkkjhkj'
    },
    {
      id: 'warehouse',
      name: '仓库管理',
      description: '入库出库管理',
      icon: HomeIcon,
      color: 'from-purple-500 to-purple-600',
      path: '/dwm97317-iyunxitong'
    },
    {
      id: 'logistics',
      name: '物流追踪',
      description: '实时物流信息',
      icon: Truck,
      color: 'from-orange-500 to-orange-600',
      path: '/hjgghjghjhjg'
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 pt-8 pb-12 rounded-b-[32px] shadow-lg">
        <h1 className="text-3xl font-bold mb-2">极光转运</h1>
        <p className="text-indigo-100 text-sm">Aurora Express - 您的智能物流管家</p>
      </div>

      {/* Projects Grid */}
      <div className="px-6 -mt-6">
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <button
                key={project.id}
                onClick={() => onNavigate(project.id)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{project.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{project.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">今日数据</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">128</div>
              <div className="text-xs text-gray-500 mt-1">待处理</div>
            </div>
            <div className="text-center border-x border-gray-100">
              <div className="text-2xl font-bold text-green-600">456</div>
              <div className="text-xs text-gray-500 mt-1">已完成</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">32</div>
              <div className="text-xs text-gray-500 mt-1">运输中</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="px-6 mt-6 mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
            <div>
              <h4 className="text-sm font-medium text-amber-900 mb-1">系统公告</h4>
              <p className="text-xs text-amber-700 leading-relaxed">
                欢迎使用极光转运系统！点击上方卡片进入各个功能模块。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
