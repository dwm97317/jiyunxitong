/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Circle, ShieldCheck, UserPlus } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

const PredeclareView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-4 -mx-4 -mt-4 bg-[#F2F3F5] px-4 py-4 pb-28 min-h-[calc(100vh-140px)]">
      {/* Input Fields Section */}
      <section className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-50/50">
        <div className="flex items-center justify-between p-5 border-b border-gray-50 hover:bg-gray-50/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <div className="w-4 h-4 text-[#4A90E2] font-bold text-[10px]">#</div>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-gray-800">{t('predeclare.trackingNo')}</span>
              <span className="text-[11px] text-[#4A90E2] font-medium leading-none mt-0.5">{t('predeclare.required')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            <span className="text-[14px] text-gray-300 font-medium">{t('predeclare.trackingPlaceholder')}</span>
            <ChevronRight className="w-5 h-5 text-gray-200" />
          </div>
        </div>

        <div className="flex items-center justify-between p-5 hover:bg-gray-50/30 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
              <div className="w-4 h-4 text-[#FF9533] font-bold text-[10px]">!</div>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-gray-800">{t('predeclare.itemName')}</span>
              <span className="text-[11px] text-[#4A90E2] font-medium leading-none mt-0.5">{t('predeclare.required')}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            <span className="text-[14px] text-gray-300 font-medium">{t('predeclare.itemPlaceholder')}</span>
            <ChevronRight className="w-5 h-5 text-gray-200" />
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50/50 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#7ED321]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-[16px] font-bold text-gray-800">{t('predeclare.insurance')}</h3>
            <p className="text-[11px] text-gray-400 font-medium leading-tight max-w-[240px]">{t('predeclare.insuranceHint')}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-[#F9FBFF] rounded-2xl p-4 border border-[#4A90E2]/20 relative shadow-[0_4px_12px_rgba(74,144,226,0.05)]"
          >
            <div className="text-[11px] text-[#4A90E2] font-bold opacity-70 mb-2 uppercase tracking-wider">Value 1-350</div>
            <div className="flex items-center justify-between">
              <span className="text-[18px] font-black text-gray-900">{t('common.currency')}5</span>
              <div className="w-6 h-6 bg-[#4A90E2] rounded-full flex items-center justify-center shadow-md shadow-blue-100 ring-2 ring-blue-50">
                <Circle className="w-2.5 h-2.5 fill-white text-white" />
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 hover:border-blue-100 transition-colors shadow-sm"
          >
            <span className="text-[12px] font-bold text-gray-400 leading-tight pr-2">{t('predeclare.customValue')}</span>
            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promo Banner */}
      <motion.section
        whileHover={{ y: -2 }}
        className="bg-gradient-to-r from-[#FFF9F2] to-[#FFF1E6] rounded-[2rem] p-5 flex items-center justify-between shadow-sm border border-orange-50/50"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FF9533] to-[#FF6B00] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 order-last sm:order-first">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-0.5">
            <span className="text-[15px] font-bold text-[#8B4513] block leading-tight">{t('predeclare.inviteFriends')}</span>
            <span className="text-[11px] text-[#A67D5D] font-medium opacity-80">{t('predeclare.inviteBtn')} & Get Coupon</span>
          </div>
        </div>
        <button className="bg-white/80 backdrop-blur-sm text-[#FF6B00] text-[12px] font-black px-5 py-2.5 rounded-2xl shadow-sm border border-orange-100 hover:bg-[#FF6B00] hover:text-white transition-all transform active:scale-95">
          {t('predeclare.inviteBtn')}
        </button>
      </motion.section>

      {/* Agreement */}
      <div className="flex items-center gap-3 px-2 pt-2 group cursor-pointer">
        <div className="w-6 h-6 rounded-lg border-2 border-gray-200 flex items-center justify-center group-hover:border-[#4A90E2] transition-colors overflow-hidden">
          <div className="w-3 h-3 bg-[#4A90E2] rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-[12px] text-gray-400 font-medium leading-tight">
          {t('predeclare.agreed')} <span className="text-[#333] font-bold underline decoration-gray-200 underline-offset-4">{t('predeclare.serviceTerms')}</span>
        </p>
      </div>
    </div>
  );
};

export default PredeclareView;
