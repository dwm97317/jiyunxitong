import React from 'react';
import { Plane, Truck, CheckCircle2 } from 'lucide-react';
import BottomSheet from '../../components/BottomSheet';
import { ShippingMethodType } from '../../types';

interface SelectMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  method: ShippingMethodType;
  setMethod: (method: ShippingMethodType) => void;
}

const SelectMethodModal: React.FC<SelectMethodModalProps> = ({ isOpen, onClose, onNext, method, setMethod }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="请选择物流方式" subtitle="提供全链路可视化信息跟踪服务">
      <div className="space-y-4 mt-2">
        {/* Lựa chọn Express */}
        <div 
          onClick={() => setMethod('EXPRESS')}
          className={`p-4 rounded-xl flex items-center justify-between cursor-pointer border-2 transition-colors ${method === 'EXPRESS' ? 'border-blue-500 bg-white shadow-sm' : 'border-gray-100 bg-white hover:border-blue-200'}`}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-colors ${method === 'EXPRESS' ? 'bg-blue-600 text-white' : 'bg-[#F4F5F7] text-gray-400'}`}>
              <Plane size={24} className={method === 'EXPRESS' ? 'fill-current' : ''} />
            </div>
            <div>
              <div className={`font-medium text-[16px] mb-0.5 ${method === 'EXPRESS' ? 'text-gray-900' : 'text-gray-700'}`}>快递</div>
              <div className="text-[13px] text-gray-400">适用顺丰、中通、韵达、圆通等快递寄件</div>
            </div>
          </div>
          {method === 'EXPRESS' ? <CheckCircle2 size={22} className="text-blue-600" /> : <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-300" />}
        </div>

        {/* Lựa chọn Freight */}
        <div 
          onClick={() => setMethod('FREIGHT')}
          className={`p-4 rounded-xl flex items-center justify-between cursor-pointer border-2 transition-colors ${method === 'FREIGHT' ? 'border-blue-500 bg-white shadow-sm' : 'border-gray-100 bg-white hover:border-blue-200'}`}
        >
          <div className="flex items-center">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-colors ${method === 'FREIGHT' ? 'bg-blue-600 text-white' : 'bg-[#F4F5F7] text-gray-400'}`}>
              <Truck size={24} className={method === 'FREIGHT' ? 'fill-current' : ''} />
            </div>
            <div>
              <div className={`font-medium text-[16px] mb-0.5 ${method === 'FREIGHT' ? 'text-gray-900' : 'text-gray-700'}`}>物流</div>
              <div className="text-[13px] text-gray-400">适用物流卡车进行货物托运</div>
            </div>
          </div>
          {method === 'FREIGHT' ? <CheckCircle2 size={22} className="text-blue-600" /> : <div className="w-[22px] h-[22px] rounded-full border-2 border-gray-300" />}
        </div>

        {/* Nút Next */}
        <button 
          onClick={onNext} 
          className="w-full bg-blue-600 text-white py-3.5 rounded-full mt-6 font-medium text-[16px] active:bg-blue-700 transition-colors shadow-md shadow-blue-200"
        >
          下一步
        </button>
      </div>
    </BottomSheet>
  );
};

export default SelectMethodModal;