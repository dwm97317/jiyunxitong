/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Circle } from 'lucide-react';
import { motion } from 'motion/react';

const PredeclareView: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Input Fields Section */}
      <section className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">快递单号</span>
            <span className="bg-blue-50 text-[#4A90E2] text-[10px] px-1.5 py-0.5 rounded border border-blue-100">必填</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <span className="text-sm">请预报国内单号</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">货物名称</span>
            <span className="bg-blue-50 text-[#4A90E2] text-[10px] px-1.5 py-0.5 rounded border border-blue-100">必填</span>
          </div>
          <div className="flex items-center gap-1 text-gray-300">
            <span className="text-sm">请完善货物名称</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium">保价</h3>
          <p className="text-[11px] text-gray-400">未保价物品最高赔付2倍运费，建议足额报价</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-blue-200 relative">
            <div className="text-[11px] text-gray-500 mb-1">价值1-350元</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">¥5</span>
              <div className="w-4 h-4 bg-[#4A90E2] rounded-full flex items-center justify-center">
                <Circle className="w-2 h-2 fill-white text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-[11px] text-gray-500">自定义物品价值</span>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-[#FFF5EB] rounded-2xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center shadow-lg shadow-orange-100">
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">?</span>
            </div>
          </div>
          <span className="text-sm font-medium text-[#8B4513]">邀请好友一起来领券！</span>
        </div>
        <button className="bg-[#FFE4CC] text-[#FF6B00] text-[11px] font-bold px-4 py-2 rounded-full">
          立即邀请
        </button>
      </section>

      {/* Agreement */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
        <p className="text-xs text-gray-400">
          我已阅读并同意遵守 <span className="text-[#333] font-medium">《极光转运服务条款》</span>
        </p>
      </div>
    </div>
  );
};

export default PredeclareView;
