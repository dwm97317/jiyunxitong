import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 flex justify-between items-center sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <span className="text-lg font-medium">偏好设置</span>
        <button className="p-1 border border-gray-200 rounded-full">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* List */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <ToggleItem title="包裹发出通知" initialChecked={false} />
          <ToggleItem title="收件变更通知" initialChecked={true} />
          <ToggleItem title="快递费用明细通知" initialChecked={true} />
          <ToggleItem title="包裹派送通知" initialChecked={true} />
          <ToggleItem title="包裹签收通知" initialChecked={true} hasBorder={false} />
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ title, initialChecked, hasBorder = true }: { title: string, initialChecked: boolean, hasBorder?: boolean }) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <div className={`flex items-center justify-between p-4 bg-white ${hasBorder ? 'border-b border-gray-100' : ''}`}>
      <span className="text-sm text-gray-800">{title}</span>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${checked ? 'bg-blue-500' : 'bg-gray-200'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
