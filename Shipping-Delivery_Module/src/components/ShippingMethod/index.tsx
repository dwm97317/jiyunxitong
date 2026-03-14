import React, { useState } from 'react';
import SelectMethodModal from './SelectMethodModal';
import ExpressDetailsModal from './ExpressDetailsModal';
import FreightDetailsModal from './FreightDetailsModal';
import type { ShippingMethodType } from '../../types';

type SavedData = {
  type: ShippingMethodType;
  trackingNo: string;
  [key: string]: unknown;
} | null;

export default function Phase2Test() {
  // 0 = Đóng, 1 = Chọn phương thức, 2 = Form Express, 3 = Form Freight
  const [step, setStep] = useState<number>(0);

  // Phương thức được chọn ở step 1
  const [selectedMethod, setSelectedMethod] =
    useState<ShippingMethodType>('EXPRESS');

  // Dữ liệu xác nhận cuối cùng
  const [savedData, setSavedData] = useState<SavedData>(null);

  const handleNextStep = () => {
    if (selectedMethod === 'EXPRESS') {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleConfirmData = (data: Exclude<SavedData, null>) => {
    setSavedData(data);
    setStep(0);
    alert(`Lưu thành công!\nPhương thức: ${data.type}\nMã: ${data.trackingNo}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-8 font-sans">
      <div className="mb-6 text-center text-gray-600">
        <p className="mb-1 font-medium">Luồng tương tác Phase 2:</p>
        <p className="text-sm">
          Bấm nút → Chọn Express hoặc Logistics → Điền Form → Xác nhận
        </p>
      </div>

      <div className="relative flex h-[712px] w-[375px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border-[6px] border-gray-800 bg-[#F4F5F7] shadow-2xl">
        <button
          onClick={() => setStep(1)}
          className="rounded-full border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
        >
          {savedData
            ? `Đã chọn: ${savedData.type === 'EXPRESS' ? '快递' : '物流'}`
            : 'Click để chọn Phương Thức'}
        </button>

        <SelectMethodModal
          isOpen={step === 1}
          onClose={() => setStep(0)}
          method={selectedMethod}
          setMethod={setSelectedMethod}
          onNext={handleNextStep}
        />

        <ExpressDetailsModal
          isOpen={step === 2}
          onClose={() => setStep(0)}
          onConfirm={handleConfirmData}
        />

        <FreightDetailsModal
          isOpen={step === 3}
          onClose={() => setStep(0)}
          onConfirm={handleConfirmData}
        />
      </div>
    </div>
  );
}