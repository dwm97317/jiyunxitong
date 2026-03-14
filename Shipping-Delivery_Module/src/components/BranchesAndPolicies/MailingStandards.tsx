import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

export default function MailingStandards({ onBack }: { onBack?: () => void }) {
  // Dữ liệu lưới 1
  const commonItems = [
    { icon: '👕', name: '普通衣物' }, { icon: '🏀', name: '体育用品' }, { icon: '🍳', name: '厨房用品' }, { icon: '🧻', name: '塑料制品' }, { icon: '🚗', name: '汽车用品' },
    { icon: '🪑', name: '家具家装' }, { icon: '🔧', name: '铁制品' }, { icon: '💍', name: '饰品' }, { icon: '🎣', name: '垂钓用品' }, { icon: '🔌', name: '家用电器' }
  ];

  // Dữ liệu lưới 2
  const sensitiveItems = [
    { icon: '🎒', name: '品牌/仿牌' }, { icon: '💄', name: '化妆品' }, { icon: '💧', name: '液体' }, { icon: '🍚', name: '粉尘' }, { icon: '🔋', name: '电池' },
    { icon: '💊', name: '零食/药品' }, { icon: '🛡️', name: '防疫物资' }, { icon: '🪵', name: '竹制品' }, { icon: '🔪', name: '刀具' }, { icon: '📿', name: '宗教商品' },
    { icon: '🚬', name: '电子烟' }, { icon: '🧂', name: '调味料' }, { icon: '🪴', name: '植物' }, { icon: '🥛', name: '玻璃制品' }, { icon: '🌿', name: '中草药' }
  ];

  // Dữ liệu lưới dọc
  const moreSensitive = [
    { icon: '🥩', title: '肉质食品', desc: '腊肉、鸡爪等', bg: 'bg-[#FFEFEF]', textCol: 'text-red-500' },
    { icon: '🥛', title: '液体食品', desc: '牛奶、饮料等', bg: 'bg-[#F0F5FF]', textCol: 'text-blue-500' },
    { icon: '💅', title: '接触皮肤功能产品', desc: '美瞳、指甲油、樟脑丸、卫生球等', bg: 'bg-[#FFF0F5]', textCol: 'text-pink-500' },
    { icon: '🪵', title: '木制品', desc: '实木、原木、人造板材、木制配件', bg: 'bg-[#FDF4E5]', textCol: 'text-orange-700' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8F9FA] absolute inset-0 z-10 font-sans">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">收寄标准</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">
        
        {/* Block 1 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-900 text-[16px] mb-1">常见可寄物品</h2>
          <p className="text-gray-400 text-[12px] mb-4">以下统称普货</p>
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            {commonItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#FDF8E4]/50 rounded-full flex items-center justify-center text-[22px] mb-1.5 shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[11px] text-gray-600 whitespace-nowrap transform scale-90">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block 2 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-900 text-[16px] mb-1">下列敏感物品</h2>
          <p className="text-gray-400 text-[12px] mb-4">部分国家地区可寄送，不确定物品请咨询客服为您</p>
          <div className="grid grid-cols-5 gap-y-4 gap-x-2">
            {sensitiveItems.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#FFFDF5] rounded-full flex items-center justify-center text-[22px] mb-1.5 shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[11px] text-gray-600 whitespace-nowrap transform scale-90">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Block 3 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
           <h2 className="font-bold text-gray-900 text-[16px] mb-4">更多敏感物品</h2>
           <div className="space-y-5 mb-4">
              {moreSensitive.map((item, i) => (
                <div key={i} className="flex items-center">
                   <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[24px] mr-3 shadow-sm ${item.bg}`}>
                     {item.icon}
                   </div>
                   <div className="flex-1 border-b border-gray-50 pb-2">
                     <div className={`text-[14px] font-bold ${item.textCol}`}>{item.title}</div>
                     <div className="text-[12px] text-gray-400 mt-0.5">{item.desc}</div>
                   </div>
                </div>
              ))}
           </div>

           {/* Gray Text Box */}
           <div className="bg-[#F8F9FA] rounded-xl p-3.5 text-[11px] text-gray-500 leading-relaxed text-justify">
             光盘、CD、暖宝宝、发热贴、粘土、种子、喷雾、香水、额温枪、陶瓷制品、头盔、禅香、佛香、线香、一次性消耗品、荞麦枕头、羽毛、轮毂、易燃易爆、中文书、英汉字典、词汇、日本动漫及其它(除中国)国家卡通人物、文件照片、证书(等不是商品性物品)等
           </div>
        </div>
      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 left-0 right-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-center">
        <button className="w-full py-3.5 rounded-full text-[16px] font-bold bg-blue-600 text-white shadow-md shadow-blue-200 active:scale-[0.98] transition-all">
          了解禁运品
        </button>
      </div>
    </div>
  );
}