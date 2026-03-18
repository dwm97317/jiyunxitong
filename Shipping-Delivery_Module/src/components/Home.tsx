import { 
  ChevronRight, ShieldCheck, UserCheck, Mail, CreditCard, 
  PackageSearch, PackageX, MessageSquare, FileText, AlertCircle, 
  Settings, MapPin, Package, Headphones,
  Copy, Edit3, Crown, Shield, Wallet, User
} from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface HomeProps {
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function Home({ onNavigate, onModuleChange }: HomeProps) {
    
  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-500 pt-12 pb-24 px-4 rounded-b-[2rem] relative">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-white p-0.5">
              <img src="https://picsum.photos/seed/avatar/100/100" alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="text-white">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">梦想家Hyuk</span>
                <span className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-0.5 rounded-full font-bold">VIP0</span>
              </div>
              <div className="text-blue-100 text-xs mt-1">ID: 596669</div>
            </div>
          </div>
          <button className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
            <Edit3 size={14} />
            <span>修改</span>
          </button>
        </div>
      </div>

      {/* Main Content Overlapping Header */}
      <div className="px-4 -mt-20 relative z-10 space-y-4">
        
        {/* Invite Banner */}
        <div onClick={() => onNavigate?.('invite')} style={{cursor: 'pointer'}} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-3 flex items-center justify-between text-white shadow-lg block">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center">
              <Crown size={18} className="text-yellow-900" />
            </div>
            <div>
              <div className="text-sm font-bold text-yellow-500">邀请好友一起来领券~</div>
              <div className="text-xs text-gray-400">邀请好友副文案区域</div>
            </div>
          </div>
          <div className="flex items-center text-xs text-yellow-500">
            立即邀请 <ChevronRight size={14} />
          </div>
        </div>

        {/* Stats & Distribution Center */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between text-center mb-4">
            <div>
              <div className="text-xs text-gray-500">我的余额</div>
              <div className="font-bold text-gray-900 mt-1"><span className="text-xs">¥</span>569</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">累计推荐收益</div>
              <div className="font-bold text-gray-900 mt-1"><span className="text-xs">¥</span>89</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">优惠券</div>
              <div className="font-bold text-gray-900 mt-1">5</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">积分</div>
              <div className="font-bold text-gray-900 mt-1">55</div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 relative pt-6 mt-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
              分销中心
            </div>
            <div className="flex justify-between text-center">
              <div onClick={() => onNavigate?.('myDistribution')} className="flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                  <User size={20} />
                </div>
                <span className="text-xs text-gray-700">我的分销</span>
              </div>
              <div onClick={() => onNavigate?.('rebateOrders')} className="flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                  <FileText size={20} />
                </div>
                <span className="text-xs text-gray-700">分销订单</span>
              </div>
              <div onClick={() => onNavigate?.('commission')} className="flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                  <FileText size={20} />
                </div>
                <span className="text-xs text-gray-700">提现明细</span>
              </div>
              <div onClick={() => onNavigate?.('myTeam')} className="flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                  <UserCheck size={20} />
                </div>
                <span className="text-xs text-gray-700">我的团队</span>
              </div>
              <div onClick={() => onNavigate?.('wallet')} className="flex flex-col items-center space-y-2 cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-500">
                  <Wallet size={20} />
                </div>
                <span className="text-xs text-gray-700">我的提现</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Main Actions */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex justify-around text-center">
          <div className="flex flex-col items-center space-y-2">
            <Package size={28} className="text-gray-700" strokeWidth={1.5} />
            <span className="text-xs text-gray-700">我的快递</span>
          </div>
          <div onClick={() => onNavigate?.('address')} className="flex flex-col items-center space-y-2 cursor-pointer">
            <MapPin size={28} className="text-blue-500" strokeWidth={1.5} />
            <span className="text-xs text-gray-700">地址簿</span>
          </div>
          <div onClick={() => onNavigate?.('wallet')} className="flex flex-col items-center space-y-2 cursor-pointer">
            <Wallet size={28} className="text-gray-700" strokeWidth={1.5} />
            <span className="text-xs text-gray-700">我的钱包</span>
          </div>
          <div onClick={() => onNavigate?.('customerService')} className="flex flex-col items-center space-y-2 cursor-pointer">
            <Headphones size={28} className="text-gray-700" strokeWidth={1.5} />
            <span className="text-xs text-gray-700">我的客服</span>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <MenuItem icon={<ShieldCheck size={20} className="text-gray-600" />} title="在线理赔" onNavigate={onNavigate} />
          <MenuItem icon={<UserCheck size={20} className="text-gray-600" />} title="实名认证" to="auth" onNavigate={onNavigate} />
          <MenuItem icon={<Mail size={20} className="text-gray-600" />} title="绑定邮箱" to="email" onNavigate={onNavigate} />
          <MenuItem icon={<CreditCard size={20} className="text-gray-600" />} title="申请代付" to="applyProxyPay" onNavigate={onNavigate} hasBorder={false} />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <MenuItem icon={<PackageSearch size={20} className="text-gray-600" />} title="包裹认领" onNavigate={onNavigate} />
          <MenuItem icon={<PackageX size={20} className="text-gray-600" />} title="包裹拦截" onNavigate={onNavigate} hasBorder={false} />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <MenuItem icon={<MessageSquare size={20} className="text-gray-600" />} title="站内信" to="messages" onNavigate={onNavigate} />
          <MenuItem icon={<FileText size={20} className="text-gray-600" />} title="协议说明" onNavigate={onNavigate} />
          <MenuItem icon={<AlertCircle size={20} className="text-gray-600" />} title="功能反馈" to="feedback" onNavigate={onNavigate} hasBorder={false} />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <MenuItem icon={<Settings size={20} className="text-gray-600" />} title="偏好设置" to="settings" onNavigate={onNavigate} hasBorder={false} />
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}

function MenuItem({ icon, title, to, hasBorder = true, onNavigate }: { 
  icon: React.ReactNode, 
  title: string, 
  to?: string, 
  hasBorder?: boolean,
  onNavigate?: (screen: string) => void 
}) {
  return (
    <div 
      onClick={() => to && onNavigate?.(to)}
      className={`flex items-center justify-between p-4 bg-white active:bg-gray-50 ${to ? 'cursor-pointer' : ''} ${hasBorder ? 'border-b border-gray-100' : ''}`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span className="text-sm text-gray-800">{title}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </div>
  );
}
