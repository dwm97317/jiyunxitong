import React, { useState } from 'react';
import BottomSheet from '../../components/BottomSheet';

interface FreightDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

const FreightDetailsModal: React.FC<FreightDetailsModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [logisticsName, setLogisticsName] = useState<string>('');
  const [trackingNo, setTrackingNo] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateLogisticsName = (value: string): boolean => {
    return value.trim().length > 0 && value.trim().length <= 50;
  };

  const validateTrackingNo = (value: string): boolean => {
    return value.trim().length > 0 && value.trim().length <= 50;
  };

  // Handle logistics name input
  const handleLogisticsNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 50);
    setLogisticsName(value);
    if (errors.logisticsName) {
      setErrors({ ...errors, logisticsName: '' });
    }
  };

  // Handle tracking number input
  const handleTrackingNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 50);
    setTrackingNo(value);
    if (errors.trackingNo) {
      setErrors({ ...errors, trackingNo: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!validateLogisticsName(logisticsName)) {
      newErrors.logisticsName = '请输入有效的物流名称(1-50字符)';
    }

    if (!validateTrackingNo(trackingNo)) {
      newErrors.trackingNo = '请输入有效的物流单号(1-50字符)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      onConfirm({ 
        type: 'FREIGHT', 
        logisticsName, 
        trackingNo 
      });
      
      // Reset form sau khi gửi
      setLogisticsName('');
      setTrackingNo('');
      setErrors({});
    }
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="填写物流信息">
      <div className="space-y-0 text-[15px] px-1">
        
        {/* Row 1: Tên Logistics (Nhập text, không có mũi tên) */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <span className="text-gray-800 font-medium">物流名称</span>
          <div className="flex flex-col items-end flex-1 ml-4">
            <input 
              type="text" 
              value={logisticsName} 
              onChange={handleLogisticsNameChange}
              placeholder="请输入物流名称" 
              className={`text-right outline-none bg-transparent text-gray-900 placeholder-gray-400 w-full ${errors.logisticsName ? 'text-red-500' : ''}`}
              maxLength={50}
            />
            {errors.logisticsName && <p className="text-red-500 text-xs mt-1">{errors.logisticsName}</p>}
          </div>
        </div>

        {/* Row 2: Mã vận đơn Logistics (Nhập text) */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <span className="text-gray-800 font-medium">物流托运单号</span>
          <div className="flex flex-col items-end flex-1 ml-4">
            <input 
              type="text" 
              value={trackingNo} 
              onChange={handleTrackingNoChange}
              placeholder="请输入物流托运单号" 
              className={`text-right outline-none bg-transparent text-gray-900 placeholder-gray-400 w-full ${errors.trackingNo ? 'text-red-500' : ''}`}
              maxLength={50}
            />
            {errors.trackingNo && <p className="text-red-500 text-xs mt-1">{errors.trackingNo}</p>}
          </div>
        </div>

        {/* Nút Xác nhận */}
        <button 
          onClick={handleConfirm} 
          className="w-full bg-blue-600 text-white py-3.5 rounded-full mt-8 font-medium text-[16px] active:scale-[0.98] transition-all shadow-md shadow-blue-200"
        >
          确定
        </button>
      </div>
    </BottomSheet>
  );
};

export default FreightDetailsModal;