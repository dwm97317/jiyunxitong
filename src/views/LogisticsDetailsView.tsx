/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, Package, CheckCircle2, Sparkles, ReceiptText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { services } from '../constants';
import { ViewType } from '../types';
import { logisticsService, CostDetails } from '../services/logisticsService';

/**
 * Giao diện Chi tiết Thanh toán Logistics (Logistics Details & Payment Flow)
 * Cập nhật giao diện giống mockup hình ảnh được cung cấp.
 */
interface LogisticsDetailsViewProps {
  selectedService: string;                     // ID dịch vụ đang chọn
  setSelectedService: (id: string) => void;     // Hàm cập nhật dịch vụ
  setView: (view: ViewType) => void;            // Hàm điều hướng màn hình
}

const LogisticsDetailsView: React.FC<LogisticsDetailsViewProps> = ({
  selectedService,
  setSelectedService,
  setView
}) => {
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [costs, setCosts] = useState<CostDetails | null>(null);

  const handleConfirmSelection = async () => {
    const data = await logisticsService.getCosts(selectedService);
    setCosts(data);
    setIsConfirmed(true);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] -mx-4 -mt-4 bg-[#F2F3F5] px-4 py-4 space-y-3">

      {/* SECTION 1: Dịch vụ vận chuyển (Service Selection) */}
      <section className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2">
            <h2 className="text-[17px] font-bold text-gray-900">{t('logistics.method')}</h2>
            <span className="text-[12px] text-gray-400 font-medium">{t('logistics.routeInfo')}</span>
          </div>
          <span className="text-[13px] text-gray-500 font-medium">10{t('common.unitParcel', { defaultValue: '件' })}</span>
        </div>

        {/* Danh sách dịch vụ dạng Scroll Ngang */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {services.map((service) => (
            <motion.div
              key={service.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedService(service.id)}
              className={`flex-shrink-0 w-[115px] p-2.5 rounded-xl transition-all relative overflow-hidden flex flex-col justify-between h-[85px] ${selectedService === service.id
                ? 'bg-[#FFF5E6] border border-[#FFD5A1] ring-1 ring-[#FFD5A1]'
                : 'bg-[#F7F8FA]'
                }`}
            >
              {/* Badge "荐" (Recommended) */}
              {service.recommended && (
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#222] text-white text-[9px] w-[45px] h-[16px] flex items-center justify-center rotate-45 translate-x-[15px] translate-y-[-2px] scale-90">
                    {t('logistics.recommended', { defaultValue: '荐' })}
                  </div>
                </div>
              )}

              <div>
                <h3 className={`text-[12px] font-bold leading-none mb-1.5 ${selectedService === service.id ? 'text-[#8B5E3C]' : 'text-gray-500'}`}>
                  {service.id === 'standard' ? t('logistics.services.standard') : (service.id === 'fast' ? t('logistics.services.fast') : t('logistics.services.special'))}
                </h3>
                <p className={`text-[10px] whitespace-nowrap overflow-hidden text-ellipsis ${selectedService === service.id ? 'text-[#A67D5D]' : 'text-gray-400'}`}>
                  {t('logistics.estTime')}: {service.time}
                </p>
              </div>

              <div className="flex items-end justify-between">
                <p className={`text-[14px] font-bold leading-none ${selectedService === service.id ? 'text-[#FF6B00]' : 'text-gray-900'}`}>
                  {t('common.currency')}{service.price}
                </p>
                <div className={`p-1 rounded-md ${selectedService === service.id ? 'bg-[#FFECDC]' : 'bg-[#E5E7EB]'}`}>
                  <Package className={`w-3.5 h-3.5 ${selectedService === service.id ? 'text-[#FF8E00]' : 'text-gray-400'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION CHÍNH: Robot prompt hoặc Chi tiết phí */}
      <AnimatePresence mode="wait">
        {!isConfirmed ? (
          /* BƯỚC 1: ROBOT PROMPT (Trạng thái gợi ý plaza) */
          <motion.div
            key="robot-prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center -mt-10"
          >
            <div className="bg-[#2D2D2D] rounded-2xl p-8 flex flex-col items-center gap-5 shadow-xl w-56 h-48 justify-center">
              <div className="w-20 h-20 bg-[#444] rounded-full flex items-center justify-center relative shadow-inner overflow-hidden border border-[#555]">
                <img
                  src="/src/assets/robot.png"
                  alt="Assistant"
                  className="w-12 h-12 grayscale-[0.2] transition-transform group-hover:scale-110"
                />
              </div>
              <p className="text-white text-sm font-medium tracking-wide">
                {t('logistics.goToPlaza')}
              </p>
            </div>
          </motion.div>
        ) : (
          /* BƯỚC 2: CHI TIẾT PHÍ (Cost Details) */
          <motion.div
            key="costs-details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col space-y-3"
          >
            {/* Thẻ phí chi tiết */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-[17px] font-bold text-gray-900 border-b border-gray-50 pb-3 -mx-5 px-5">{t('logistics.details')}</h3>

              {/* Danh sách các đề mục phí */}
              <div className="space-y-4 pt-1">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[15px] font-medium text-gray-500">{t('logistics.costItems.weight')}</span>
                  <span className="text-[15px] font-medium text-gray-900">{costs?.weight}</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[15px] font-medium text-gray-500">{t('logistics.costItems.billing')}</span>
                  <span className="text-[15px] font-medium text-gray-900">{t('common.currency')}{costs?.shippingFee}</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[15px] font-medium text-gray-500">{t('logistics.costItems.oversize')}</span>
                  <span className="text-[15px] font-medium text-gray-900">{t('common.currency')}{costs?.oversizeFee}</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[15px] font-medium text-gray-500">{t('logistics.costItems.overweight')}</span>
                  <span className="text-[15px] font-medium text-gray-900">{t('common.currency')}{costs?.overweightFee}</span>
                </div>

                {/* Phụ phí lồng vào box xám */}
                <div className="space-y-1">
                  <h4 className="text-[15px] font-medium text-gray-500 px-1 mb-2">{t('logistics.surcharges')}</h4>
                  <div className="bg-[#F8F9FB] rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-gray-500">{t('logistics.costItems.food')}</span>
                      <span className="text-[14px] font-medium text-gray-900">{t('common.currency')}{costs?.surcharges.food}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-gray-500">{t('logistics.costItems.textile')}</span>
                      <span className="text-[14px] font-medium text-gray-900">{t('common.currency')}{costs?.surcharges.textile}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] text-gray-500">{t('logistics.costItems.wood')}</span>
                      <span className="text-[14px] font-medium text-gray-900">{t('common.currency')}{costs?.surcharges.wood}</span>
                    </div>
                  </div>
                </div>

                {/* Các phí còn lại */}
                {[
                  { label: t('logistics.costItems.itemName'), value: 50 },
                  { label: t('logistics.costItems.customs'), value: costs?.customsFee },
                  { label: t('logistics.costItems.materials'), value: costs?.materialFee },
                  { label: t('logistics.costItems.vas'), value: costs?.vasFee },
                  { label: t('logistics.costItems.insurance'), value: costs?.insuranceFee },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center px-1">
                    <span className="text-[15px] font-medium text-gray-500">{item.label}</span>
                    <span className="text-[15px] font-medium text-gray-900">{t('common.currency')}{item.value}</span>
                  </div>
                ))}

                {/* Tổng cộng highlight */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <span className="text-[15px] font-medium text-gray-500 uppercase tracking-wide">{t('logistics.costItems.total')}</span>
                  <span className="text-[18px] font-bold text-[#FF6B00]">{t('common.currency')} {costs?.total}</span>
                </div>
              </div>
            </div>

            {/* Thẻ Ưu đãi Coupon */}
            <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <span className="text-[16px] font-bold text-gray-800">{t('logistics.costItems.coupon')}</span>
              <div className="flex items-center gap-1 text-gray-400">
                <span className="text-[14px] font-medium">{t('logistics.costItems.noCoupon')}</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER CTA BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white shadow-[0_-8px_20px_rgba(0,0,0,0.03)] border-t border-gray-50/50 z-50">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (!isConfirmed) {
              handleConfirmSelection();
            } else {
              // Nếu footer ở trạng thái Image 2 (hộp robot đang hiện), nút này cũng có thể là Go to Plaza?
              // Nhưng thông thường ta Confirm xong rồi mới thanh toán.
              // Dựa trên yêu cầu conversation 4c8ab3a5: 
              // Robot hiện -> nút "Confirm Selection" -> nhấn xong Robot biến mất, phí hiện ra (Image 1) -> nút đổi thành "Confirm Payment"
              // Tuy nhiên Image 2 cho thấy nút là "Go to Plaza".
              // Tôi sẽ logic theo image và yêu cầu cũ: 
              // Trạng thái Robot (Image 2): Nút là "Go to Plaza" (hoặc Confirm Selection?)
              // Trạng thái Phí (Image 1): Nút là "Confirm"
              if (!isConfirmed) setView('plaza');
              else setView('paymentSuccess');
            }
          }}
          className={`w-full py-4 rounded-full font-bold text-[17px] shadow-lg transition-all ${!isConfirmed
            ? 'bg-[#4385F4] text-white shadow-blue-200'
            : 'bg-[#4385F4] text-white shadow-blue-200'
            }`}
        >
          {isConfirmed ? (t('common.confirm', { defaultValue: '确定' })) : (t('logistics.goToPlaza'))}
        </motion.button>
      </div>
    </div>
  );
};

export default LogisticsDetailsView;
