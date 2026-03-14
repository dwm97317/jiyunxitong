/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Box, ChevronRight } from 'lucide-react';
import { ServiceOption, ViewType } from '../types';
import { services, feeItems, surcharges, otherFees } from '../constants';

interface LogisticsDetailsViewProps {
  selectedService: string;
  setSelectedService: (id: string) => void;
  setView: (view: ViewType) => void;
}

const LogisticsDetailsView: React.FC<LogisticsDetailsViewProps> = ({ 
  selectedService, 
  setSelectedService, 
  setView 
}) => {
  return (
    <>
      {/* Service Type Section */}
      <section className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-bold">服务类型</h2>
            <span className="text-xs text-gray-400">您当前选中线路为海运方案</span>
          </div>
          <span className="text-sm text-gray-400">2件</span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {services.map((service) => (
            <motion.button
              key={service.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedService(service.id)}
              className={`relative flex-shrink-0 w-32 p-3 rounded-xl border-2 transition-all ${
                selectedService === service.id
                  ? 'bg-[#FFF9E6] border-[#FFD700]'
                  : 'bg-[#F9F9F9] border-transparent'
              }`}
            >
              {service.recommended && (
                <div className="absolute top-0 right-0 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-tr-lg rounded-bl-lg">
                  荐
                </div>
              )}
              <div className="text-sm font-medium text-gray-500 mb-1 text-left">{service.name}</div>
              <div className="text-[10px] text-gray-400 mb-2 text-left">{service.time}</div>
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold ${selectedService === service.id ? 'text-[#FF6B00]' : 'text-black'}`}>
                  ¥ {service.price.toFixed(2)}
                </span>
                <Box className={`w-5 h-5 ${selectedService === service.id ? 'text-[#FFD700]' : 'text-gray-200'}`} />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Fee Details Section */}
      <section className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <h2 className="text-base font-bold border-b border-gray-100 pb-3">费用明细</h2>
        
        <div className="space-y-3">
          {feeItems.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}

          <div className="bg-[#F9F9F9] rounded-xl p-3 space-y-2">
            <div className="text-sm text-gray-400 mb-1">附加费</div>
            {surcharges.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {otherFees.map((item, idx) => (
            <div 
              key={idx} 
              className={`flex justify-between text-sm ${(item.label === '保险' || item.label === '增值服务') ? 'cursor-pointer hover:bg-gray-50 p-1 -m-1 rounded' : ''}`}
              onClick={() => {
                if (item.label === '保险') setView('rules');
                if (item.label === '增值服务') setView('vas');
              }}
            >
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-sm font-medium">合计</span>
          <span className="text-lg font-bold text-[#FF6B00]">¥ 693.08</span>
        </div>
      </section>

      {/* Coupon Section */}
      <section className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
        <span className="text-sm font-medium">优惠券</span>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <span>无可用</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </section>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setView('applyPacking')}
        className="w-full bg-white rounded-2xl p-4 shadow-sm text-center text-sm font-medium text-[#4A90E2]"
      >
        申请打包
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setView('claim')}
        className="w-full bg-white rounded-2xl p-4 shadow-sm text-center text-sm font-medium text-[#4A90E2]"
      >
        去认领包裹
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setView('claims')}
        className="w-full bg-white rounded-2xl p-4 shadow-sm text-center text-sm font-medium text-[#4A90E2]"
      >
        在线理赔
      </motion.button>
    </>
  );
};

export default LogisticsDetailsView;
