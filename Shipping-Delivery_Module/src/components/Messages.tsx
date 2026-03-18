import { ChevronLeft, MoreHorizontal, MessageCircle } from 'lucide-react';
import BottomNavBar from './BottomNavBar';

interface MessagesProps {
  onBack?: () => void;
  onNavigate?: (screen: string) => void;
  onModuleChange?: (module: string, screen?: string) => void;
}

export default function Messages({ onBack, onNavigate, onModuleChange }: MessagesProps) {
  
  const messages = [
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '昨天', unread: true },
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '昨天', unread: false },
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '星期一', unread: false },
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '星期六', unread: false },
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '星期六', unread: false },
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '03-02', unread: false },
    { title: '通知名称', content: '通知详情信息通知详情信息通知信息...', time: '03-02', unread: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-safe">
      {/* Header */}
      <div className="bg-white text-gray-900 pt-12 pb-4 px-4 sticky top-0 z-20 flex justify-between items-center">
        <button onClick={() => onBack?.()} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">站内信</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Message List */}
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {messages.map((msg, index) => (
            <div key={index} className="flex gap-4 p-4 border-b border-gray-50 last:border-0 items-start">
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-[#2B5AED]">
                  <MessageCircle size={24} fill="currentColor" className="text-[#2B5AED]" />
                </div>
                {msg.unread && (
                  <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-base font-medium text-gray-900 truncate">{msg.title}</h3>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab="profile" onNavigate={onNavigate} onModuleChange={onModuleChange} />
    </div>
  );
}
