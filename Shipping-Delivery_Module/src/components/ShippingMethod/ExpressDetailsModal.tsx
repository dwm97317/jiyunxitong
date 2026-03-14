import React, { useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import BottomSheet from '../../components/BottomSheet';
import { PackageType } from '../../types';

interface ExpressDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const ExpressDetailsModal: React.FC<ExpressDetailsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [packageType, setPackageType] = useState<PackageType>('SINGLE');
  const [courierName, setCourierName] = useState<string>('顺丰快递');
  const [trackingNo, setTrackingNo] = useState<string>('SF1437829133905');
  const [packageCount, setPackageCount] = useState<string>('2');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateTrackingNo = (value: string): boolean => {
    return value.trim().length > 0 && value.trim().length <= 50;
  };

  const validatePackageCount = (value: string): boolean => {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && num <= 9999;
  };

  // Handle tracking number input
  const handleTrackingNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 50);
    setTrackingNo(value);
    if (errors.trackingNo) {
      setErrors({ ...errors, trackingNo: '' });
    }
  };

  // Handle package count input - only positive integers
  const handlePackageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value && parseInt(value) > 9999) {
      value = '9999';
    }
    setPackageCount(value);
    if (errors.packageCount) {
      setErrors({ ...errors, packageCount: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!validateTrackingNo(trackingNo)) {
      newErrors.trackingNo = '请输入有效的快递单号';
    }

    if (packageType === 'MULTIPLE' && !validatePackageCount(packageCount)) {
      newErrors.packageCount = '请输入1-9999之间的数字';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm({ type: 'EXPRESS', courierName, trackingNo, packageType, packageCount: packageType === 'SINGLE' ? 1 : packageCount });
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="填写快递信息">
      <div className="space-y-0 text-[15px] px-1">
        
        {/* Chọn tên hãng Express */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <span className="text-gray-700">快递名称</span>
          <div className="flex items-center text-gray-800 cursor-pointer font-medium">
            {courierName || '请选择快递名称'}
            <ChevronRight size={18} className="text-gray-400 ml-1" />
          </div>
        </div>

        {/* Mã vận đơn */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <span className="text-gray-700">快递单号</span>
          <div className="flex flex-col items-end">
            <input 
              type="text" 
              value={trackingNo} 
              onChange={handleTrackingNoChange}
              placeholder="请输入快递单号" 
              className={`text-right outline-none bg-transparent text-gray-800 placeholder-gray-300 flex-1 ml-4 font-medium ${errors.trackingNo ? 'text-red-500' : ''}`}
              maxLength={50}
            />
            {errors.trackingNo && <p className="text-red-500 text-xs mt-1">{errors.trackingNo}</p>}
          </div>
        </div>

        {/* Loại kiện hàng (1 kiện / Nhiều kiện) */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <span className="text-gray-700">快件件数</span>
          <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer group" onClick={() => setPackageType('SINGLE')}>
              <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center mr-2 transition-colors ${packageType === 'SINGLE' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {packageType === 'SINGLE' && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <span className={`text-[15px] ${packageType === 'SINGLE' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>一票一件</span>
            </label>
            <label className="flex items-center cursor-pointer group" onClick={() => setPackageType('MULTIPLE')}>
              <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center mr-2 transition-colors ${packageType === 'MULTIPLE' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'}`}>
                {packageType === 'MULTIPLE' && <CheckCircle2 size={14} className="text-white" />}
              </div>
              <span className={`text-[15px] ${packageType === 'MULTIPLE' ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>一票多件</span>
            </label>
          </div>
        </div>

        {/* Ô nhập số lượng (Chỉ hiện khi chọn nhiều kiện) */}
        {packageType === 'MULTIPLE' && (
          <div className="flex items-center justify-between py-4 border-b border-gray-100 animate-[fade-in_0.2s_ease-in]">
            <span className="text-gray-700">快件件数</span>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <input 
                  type="text" 
                  value={packageCount} 
                  onChange={handlePackageCountChange}
                  inputMode="numeric"
                  className={`text-right outline-none bg-transparent text-gray-900 font-medium w-16 mr-1 ${errors.packageCount ? 'text-red-500' : ''}`}
                  maxLength={4}
                />
                <span className="text-gray-900 font-medium">件</span>
              </div>
              {errors.packageCount && <p className="text-red-500 text-xs mt-1">{errors.packageCount}</p>}
            </div>
          </div>
        )}

        <button 
          onClick={handleConfirm} 
          className="w-full bg-blue-600 text-white py-3.5 rounded-full mt-8 font-medium text-[16px] active:bg-blue-700 transition-colors shadow-md shadow-blue-200"
        >
          确定
        </button>
      </div>
    </BottomSheet>
  );
};

export default ExpressDetailsModal;