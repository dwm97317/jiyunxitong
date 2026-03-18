import { Outlet, Link, useLocation } from 'react-router-dom';

const screens = [
  { path: '/', name: '首页 (Home)' },
  { path: '/wallet', name: '钱包 (Wallet)' },
  { path: '/address', name: '地址簿 (Address Book)' },
  { path: '/auth', name: '实名认证 (Auth)' },
  { path: '/email', name: '绑定邮箱 (Bind Email)' },
  { path: '/settings', name: '偏好设置 (Settings)' },
  { path: '/invite', name: '邀请好友 (Invite)' },
  { path: '/invite-record', name: '邀请记录 (Invite Record)' },
  { path: '/commission', name: '佣金明细 (Commission Details)' },
  { path: '/customer-service', name: '在线客服 (Customer Service)' },
  { path: '/messages', name: '站内信 (Messages)' },
  { path: '/feedback', name: '功能反馈 (Feedback)' },
  { path: '/welfare', name: '福利 (Welfare)' },
  { path: '/invite-steps', name: '三步邀请 (Invite Steps)' },
  { path: '/help-pay', name: '帮我付 (Help Pay)' },
  { path: '/apply-proxy-pay', name: '申请代付 (Apply Proxy Pay)' },
  { path: '/my-distribution', name: '我的分销 (My Distribution)' },
  { path: '/group-leader', name: '团长中心 (Group Leader Center)' },
  { path: '/apply-group-leader', name: '申请团长 (Apply Group Leader)' },
  { path: '/my-team', name: '我的团队 (My Team)' },
  { path: '/rebate-orders', name: '返佣订单 (Rebate Orders)' },
  { path: '/initiate-group-buy', name: '发起拼团 (Initiate Group Buy)' },
  { path: '/standard-express', name: '标快件 (Standard Express)' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#E5E7EB] flex justify-center items-start p-0 md:p-8 gap-8 font-sans text-gray-900">
      {/* Sidebar Navigation (Desktop) */}
      <div className="hidden md:block w-[320px] shrink-0">
        <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <h2 className="text-xl font-bold text-[#1E293B] mb-6">Screens</h2>
          <div className="flex flex-col gap-2">
            {screens.map((screen) => {
              const isActive = location.pathname === screen.path;
              return (
                <Link
                  key={screen.path}
                  to={screen.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {screen.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-x-hidden md:rounded-[2.5rem] md:border-[8px] border-gray-800 md:min-h-[800px]">
        <Outlet />
      </div>
    </div>
  );
}
