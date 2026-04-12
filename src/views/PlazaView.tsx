/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Star, Plane, Ship, Loader2, MapPin, Hash, Calendar, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { plazaService } from '../services/plazaService';
import { ViewType, PlazaItem } from '../types';

/**
 * Giao diện Chợ Gom hàng (Logistics Plaza)
 * Bao gồm bộ lọc nâng cao và danh sách các nhóm gom hàng.
 */
interface PlazaViewProps {
  onSelectItem: (id: string) => void;
  setView: (view: ViewType) => void;
}

const PlazaView: React.FC<PlazaViewProps> = ({ onSelectItem, setView }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<PlazaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'air' | 'sea'>('all');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await plazaService.getAll();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch plaza items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Lọc danh sách dựa trên tìm kiếm và phương thức vận tải
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.orderNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'all' || item.transport === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [items, searchQuery, activeFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-[#4A90E2] animate-spin" />
        <p className="text-gray-400 text-sm font-medium">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32">
      {/* THANH TÌM KIẾM (Search Header) */}
      <div className="relative group mx-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#4A90E2] transition-colors" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('homepage.searchPlaceholder')}
          className="block w-full pl-12 pr-4 py-4 bg-white border-none rounded-[1.5rem] shadow-sm focus:ring-2 focus:ring-[#4A90E2]/20 transition-all text-sm outline-none font-medium"
        />
      </div>

      {/* TẬP BỘ LỌC (Transport Filters) */}
      <div className="flex gap-2 mx-1">
        {[
          { id: 'all', label: 'Tất cả' },
          { id: 'air', label: t('common.air'), icon: Plane },
          { id: 'sea', label: t('common.sea'), icon: Ship },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveFilter(btn.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all border ${activeFilter === btn.id
                ? 'bg-[#4A90E2] border-[#4A90E2] text-white shadow-lg shadow-blue-200'
                : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
              }`}
          >
            {btn.icon && <btn.icon className="w-4 h-4" />}
            {btn.label}
          </button>
        ))}
      </div>

      {/* DANH SÁCH HIỂN THỊ (Items Grid) */}
      <div className="space-y-5 px-1">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.section
              layout
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                onSelectItem(item.id);
                setView('plazaDetails');
              }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.025)] border border-gray-50 hover:shadow-[0_10px_35px_rgba(0,0,0,0.06)] transition-all cursor-pointer active:scale-[0.98]"
            >
              <div className="bg-[#F9FAFB] px-5 py-3 flex justify-between items-center text-[10px] text-gray-400 font-black uppercase tracking-widest border-b border-gray-50">
                <span className="flex items-center gap-2">
                  <Hash className="w-3 h-3 text-[#4A90E2]" />
                  <span>{t('plaza.orderNo')}:</span>
                  <span className="text-gray-800">{item.orderNo}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-[#4A90E2]" />
                  <span>{t('plaza.estShip')}:</span>
                  <span className="text-gray-800">{item.date}</span>
                </span>
              </div>

              <div className="p-5 pt-4 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-[1.25rem] overflow-hidden bg-gray-50 ring-4 ring-blue-50/30">
                        <img
                          src={item.avatar || item.logo}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center rounded-lg border-2 border-white shadow-md text-[9px] font-black text-white ${item.isOfficial ? 'bg-[#4A90E2]' : 'bg-[#FF9533]'}`}>
                        {item.isOfficial ? '官' : '团'}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-gray-800 text-base leading-none tracking-tight">{item.name}</h4>
                        <span className={`text-[9px] px-2 py-0.5 rounded-lg font-black text-white tracking-widest shadow-sm ${item.type === '敏感货' ? 'bg-[#FF4D4D]' : 'bg-[#4A90E2]'}`}>
                          {item.type === '敏感货' ? t('plaza.sensitiveCargo') : t('plaza.generalCargo')}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`w-3.5 h-3.5 ${s <= 4 ? 'fill-[#FFD335] text-[#FFD335]' : 'fill-gray-100 text-gray-100'}`} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative w-14 h-14 flex items-center justify-center bg-gray-50 rounded-2xl border border-gray-100/50">
                    <div className="absolute inset-0 bg-blue-50 rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity" />
                    {item.transport === 'air' ? <Plane className="w-8 h-8 text-[#4A90E2] rotate-[-12deg]" /> : <Ship className="w-8 h-8 text-[#4A90E2]" />}
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-1">
                  <div className="w-1.5 h-1.5 bg-[#4A90E2] rounded-full" />
                  <p className="text-xs text-gray-500 font-black tracking-tight flex-1 truncate">{item.location}</p>
                  <span className="text-[10px] text-gray-300 font-bold uppercase">{t('plaza.zipCode')} {item.zip}</span>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Gom hàng</span>
                    <div className="flex items-baseline gap-1 text-[11px] font-black leading-none">
                      <span className="text-[#4A90E2] font-black text-sm">{item.weight}</span>
                      <span className="text-gray-300">/{item.total}</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-50/50 rounded-full overflow-hidden p-0.5 border border-gray-100 ring-1 ring-inset ring-gray-200/10">
                    <motion.div
                      layout
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(item.weight) / parseFloat(item.total)) * 100}%` }}
                      transition={{ duration: 1.2, ease: 'circOut' }}
                      className="h-full bg-gradient-to-r from-[#4A90E2] to-[#63A1FF] rounded-full shadow-[0_0_15px_rgba(74,144,226,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      {/* Hiển thị khi không có kết quả */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Filter className="w-8 h-8 text-gray-300" />
          </div>
          <div className="space-y-1">
            <h5 className="font-bold text-gray-400">Không tìm thấy nhóm phù hợp</h5>
            <p className="text-[10px] text-gray-300">Hãy thử đổi từ khóa hoặc bộ lọc khác</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlazaView;
