import { useState } from 'react';
import { ChevronLeft, MoreHorizontal, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommissionDetails() {
  const navigate = useNavigate();
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('全部类型');
  const [selectedDate, setSelectedDate] = useState('近一个月');

  const records = [
    { type: '转出', time: '2021-06-23 11:53:43', amount: '-5724.00', isIncome: false },
    { type: '转出', time: '2021-06-23 11:53:43', amount: '-5724.00', isIncome: false },
    { type: '收益', time: '2021-06-23 11:53:43', amount: '+5724.00', isIncome: true },
    { type: '收益', time: '2021-06-23 11:53:43', amount: '+5724.00', isIncome: true },
    { type: '转出', time: '2021-06-23 11:53:43', amount: '-5724.00', isIncome: false },
    { type: '转出', time: '2021-06-23 11:53:43', amount: '-5724.00', isIncome: false },
    { type: '收益', time: '2021-06-23 11:53:43', amount: '+5724.00', isIncome: true },
    { type: '转出', time: '2021-06-23 11:53:43', amount: '-5724.00', isIncome: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative pb-safe">
      {/* Blue Background Header */}
      <div className="bg-[#2B5AED] text-white pt-12 pb-24 px-4 relative">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft size={24} />
          </button>
          <span className="text-lg font-medium">佣金明细</span>
          <button className="p-1 border border-white/30 rounded-full bg-white/10">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="px-4 -mt-20 relative z-10 flex-1 flex flex-col pb-6">
        {/* Summary Card */}
        <div className="bg-white rounded-xl shadow-sm mb-4">
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-[#2B5AED] mb-1">256.88</div>
              <div className="text-xs text-gray-500">总金额 (元)</div>
            </div>
            <div className="text-center flex-1">
              <div className="text-2xl font-bold text-gray-900 mb-1">256.88</div>
              <div className="text-xs text-gray-500">累计佣金 (元)</div>
            </div>
          </div>
          <div className="flex">
            <button 
              className="flex-1 py-3 flex items-center justify-center text-sm text-gray-700 border-r border-gray-50"
              onClick={() => setIsTypeModalOpen(true)}
            >
              {selectedType} <ChevronRight size={14} className="ml-1 text-gray-400" />
            </button>
            <button 
              className="flex-1 py-3 flex items-center justify-center text-sm text-gray-700"
              onClick={() => setIsDateModalOpen(true)}
            >
              {selectedDate} <ChevronRight size={14} className="ml-1 text-gray-400" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-xl shadow-sm flex-1 overflow-hidden">
          {records.map((record, index) => (
            <div key={index} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0">
              <div>
                <div className="text-base text-gray-900 mb-1">{record.type}</div>
                <div className="text-xs text-gray-400">{record.time}</div>
              </div>
              <div className={`text-base ${record.isIncome ? 'text-[#2B5AED]' : 'text-gray-500'}`}>
                {record.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Modal */}
      {isTypeModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsTypeModalOpen(false)}></div>
          <div className="bg-gray-100 rounded-t-2xl relative z-10 w-full max-w-md mx-auto pb-safe">
            <div className="bg-white rounded-t-2xl overflow-hidden">
              <button className="w-full py-4 text-center text-base text-gray-900 border-b border-gray-100 active:bg-gray-50" onClick={() => { setSelectedType('全部类型'); setIsTypeModalOpen(false); }}>全部类型</button>
              <button className="w-full py-4 text-center text-base text-gray-900 border-b border-gray-100 active:bg-gray-50" onClick={() => { setSelectedType('收益'); setIsTypeModalOpen(false); }}>收益</button>
              <button className="w-full py-4 text-center text-base text-gray-900 active:bg-gray-50" onClick={() => { setSelectedType('转出'); setIsTypeModalOpen(false); }}>转出</button>
            </div>
            <div className="mt-2 bg-white">
              <button className="w-full py-4 text-center text-base text-gray-900 active:bg-gray-50" onClick={() => setIsTypeModalOpen(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* Date Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsDateModalOpen(false)}></div>
          <div className="bg-white rounded-t-2xl relative z-10 w-full max-w-md mx-auto pb-safe">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <button className="text-gray-900 text-base" onClick={() => setIsDateModalOpen(false)}>取消</button>
              <button className="text-[#2B5AED] text-base" onClick={() => setIsDateModalOpen(false)}>确定</button>
            </div>
            <div className="py-6">
              {/* Simulated Picker */}
              <div className="h-48 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-1/2 left-0 w-full h-12 -mt-6 border-y border-gray-100 pointer-events-none"></div>
                <div className="space-y-3 text-center w-full">
                  <div className="text-xl text-gray-900 py-1">近一个月</div>
                  <div className="text-lg text-gray-400 py-1">2022年4月</div>
                  <div className="text-lg text-gray-300 py-1">2022年3月</div>
                  <div className="text-lg text-gray-200 py-1">2022年2月</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
