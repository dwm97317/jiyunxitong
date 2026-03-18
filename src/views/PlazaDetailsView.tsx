/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MapPin, Calendar, Users, Info, Box, ShieldCheck, Ship, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PlazaItem } from '../types';

/**
 * Giao diện Chi tiết Nhóm Gom hàng (Consolidation Group Details)
 * Hiển thị thông tin trưởng nhóm, địa chỉ, các quy tắc và thông tin vận hành.
 */
interface PlazaDetailsViewProps {
  item: PlazaItem; // Thông tin chi tiết của nhóm gom hàng được chọn
}

const PlazaDetailsView: React.FC<PlazaDetailsViewProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)] space-y-4 font-sans text-[#333]">
      <section className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.02)] border border-gray-50 flex-1 flex flex-col">

        {/* HEADER: Tên thương hiệu và biểu tượng phương thức vận chuyển */}
        <div className="bg-gradient-to-r from-[#FFF5EB] to-[#FFF9F4] px-6 py-5 flex justify-between items-center border-b border-orange-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#4A90E2] rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-blue-500/20 transform -rotate-12">
              JG
            </div>
            <span className="text-[#4A90E2] font-black text-base">{t('homepage.title')}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-orange-100 shadow-sm">
            {item.transport === 'air' ? <Plane className="w-4 h-4 text-[#FF9533]" /> : <Ship className="w-4 h-4 text-[#FF9533]" />}
            <span className="text-[#FF9533] text-xs font-black uppercase tracking-wider">
              {item.transport === 'air' ? t('common.air') : t('common.sea')}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* THÔNG TIN TRƯỞNG NHÓM (Leader Info) */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-20 h-20 rounded-[2rem] overflow-hidden bg-gray-50 p-1 ring-4 ring-orange-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img
                  src={item.avatar || item.logo}
                  alt="Leader Avatar"
                  className="w-full h-full object-cover rounded-[1.75rem]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FF9533] text-[9px] font-black text-white px-3 py-1 rounded-xl shadow-lg border-2 border-white">
                团
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-2xl text-gray-800 tracking-tight">{item.name}</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-gray-100 text-gray-200'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* DỮ LIỆU NHÓM GOM HÀNG (Grid Details) */}
          <div className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 grid grid-cols-1 gap-5 shadow-inner">
            <div className="flex gap-4 items-start">
              <MapPin className="w-4 h-4 text-[#4A90E2] mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-gray-300 tracking-widest leading-none">{t('plazaDetails.address')}</span>
                <p className="text-sm font-bold text-gray-700 leading-tight">Singapore Temasek Blvd 9, Suntec Tower 433433</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-gray-300 tracking-widest leading-none flex items-center gap-1.5">
                  <Calendar className="w-2.5 h-2.5" /> {t('plazaDetails.startTime')}
                </span>
                <p className="text-sm font-bold text-gray-700">2024-10-24</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-gray-300 tracking-widest leading-none flex items-center gap-1.5">
                  <Users className="w-2.5 h-2.5" /> {t('plazaDetails.memberCount')}
                </span>
                <p className="text-sm font-bold text-gray-700">5 {t('homepage.stats.unitParcel')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-gray-300 tracking-widest leading-none flex items-center gap-1.5">
                  <Box className="w-2.5 h-2.5" /> {t('plazaDetails.minWeight')}
                </span>
                <p className="text-sm font-bold text-[#FF6B00]">60KG</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-black text-gray-300 tracking-widest leading-none flex items-center gap-1.5">
                  <Info className="w-2.5 h-2.5" /> {t('plazaDetails.remark')}
                </span>
                <p className="text-xs text-gray-500 font-medium line-clamp-2">{t('plazaDetails.rules.groupDesc')}</p>
              </div>
            </div>
          </div>

          {/* THÔNG TIN THÀNH VIÊN HIỆN TẠI (Members Section) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 space-y-5">
            <h5 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
              {t('plazaDetails.membersInfo')}
              <span className="ml-auto text-[#4A90E2] text-[10px] font-bold cursor-pointer hover:underline" onClick={() => { }}>{t('common.seeAll')}</span>
            </h5>
            <div className="flex -space-x-3 overflow-hidden p-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-gray-50 flex-shrink-0 relative"
                >
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.id}${i}`} alt="Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
              <div className="w-12 h-12 rounded-full ring-4 ring-white shadow-md bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold leading-none z-10 flex-shrink-0">
                +8
              </div>
            </div>
          </div>

          {/* DỊCH VỤ VẬN TẢI (Logistics Support) */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 space-y-6">
            <h5 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#4A90E2]" />
              {t('plazaDetails.logisticsInfo')}
            </h5>
            <div className="flex gap-6 items-center">
              <div className="w-28 h-28 bg-[#FAFAFA] rounded-2xl overflow-hidden ring-1 ring-gray-100 shadow-inner flex-shrink-0 relative group">
                <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${item.transport}&backgroundColor=F9FAFB`} alt="Logistics Icon" className="w-full h-full p-4" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent group-hover:opacity-0 transition-opacity" />
              </div>
              <div className="space-y-4 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-300 uppercase">{t('plazaDetails.period')}</span>
                  <p className="text-sm font-bold text-[#4A90E2]">{item.transport === 'air' ? '10-12 Days' : '18-28 Days'}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-300 uppercase">{t('plazaDetails.customs')}</span>
                  <p className="text-sm font-bold text-[#FF6B00]">{t('plazaDetails.taxIncluded')}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-gray-300 uppercase">{t('plazaDetails.accept')}</span>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{t('plazaDetails.acceptItems')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* QUY TẮC CÔNG KHAI (Public Rules) */}
          <div className="grid grid-cols-1 gap-6 pt-4 pb-12">
            {[
              { title: 'group', desc: 'groupDesc' },
              { title: 'join', desc: 'joinDesc' },
              { title: 'success', desc: 'successDesc' }
            ].map((rule) => (
              <div key={rule.title} className="space-y-3 bg-[#F9FAFB]/50 p-6 rounded-3xl border border-gray-100/50">
                <h6 className="font-black text-gray-800 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-[#FF9533] rounded-full" />
                  {t(`plazaDetails.rules.${rule.title}`)}
                </h6>
                <p className="text-sm text-gray-500 leading-relaxed font-medium whitespace-pre-line">
                  {t(`plazaDetails.rules.${rule.desc}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER ACTION: CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-2xl border-t border-gray-100/50 z-50">
        <motion.button
          whileTap={{ scale: 0.94 }}
          className="w-full h-15 py-4 bg-gradient-to-r from-[#FF9533] to-[#FFB062] rounded-2xl shadow-[0_12px_24px_rgba(255,149,51,0.25)] text-white font-black text-base tracking-wide flex items-center justify-center transition-all hover:brightness-105 active:shadow-inner"
        >
          {t('plaza.joinGroup')}
        </motion.button>
      </div>
    </div>
  );
};

export default PlazaDetailsView;
