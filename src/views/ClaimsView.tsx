/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { claimService } from '../services/claimService';
import { ViewType, Claim } from '../types';

interface ClaimsViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setView: (view: ViewType) => void;
  setSelectedClaimId: (id: string) => void;
}

const ClaimsView: React.FC<ClaimsViewProps> = ({ activeTab, setActiveTab, setView, setSelectedClaimId }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      try {
        const data = await claimService.getAll();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch claims:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 text-[#4A90E2] animate-spin" />
        <p className="text-gray-400 text-sm">{t('common.loading') || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 -mx-4 -mt-4">
      {/* Tabs */}
      <div className="bg-white flex justify-around border-b border-gray-100 relative">
        {[
          { id: 'available', label: t('claims.tabs.available') },
          { id: 'processing', label: t('claims.tabs.processing') },
          { id: 'completed', label: t('claims.tabs.completed') },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 text-sm font-medium relative transition-colors ${activeTab === tab.id ? 'text-[#333]' : 'text-gray-400'
              }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#4A90E2] rounded-full"
              />
            )}
          </button>
        ))}
        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => setView('insuranceRules')}
            className="text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full"
          >
            {t('insuranceRules.title')}
          </button>
        </div>
      </div>

      {/* Claims List */}
      <div className="px-4 space-y-4 pb-20">
        {items.map((claim) => (
          <section
            key={claim.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
            onClick={() => {
              setSelectedClaimId(claim.id);
              setView('claimTracking');
            }}
          >
            <div className="bg-[#FFF9F5] px-4 py-3 flex justify-between items-center border-b border-[#FFF1E5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#4A90E2] rounded flex items-center justify-center text-white font-bold text-lg italic shadow-sm">
                  <span className="translate-y-[1px]">JG</span>
                </div>
                <span className="text-sm font-bold text-[#4A90E2]">{t('homepage.title')}</span>
              </div>
              <span className="text-xs text-[#E6A23C] font-medium">{t('logistics.services.fast')}</span>
            </div>

            <div className="p-4 space-y-2.5">
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('plaza.orderNo')}</span>
                <span className="text-gray-600 font-medium text-right">{claim.trackingNo}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('claims.intlNo')}</span>
                <span className="text-gray-600 font-medium text-right">{claim.intlNo}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('predeclare.itemName')}</span>
                <span className="text-gray-600 text-right">{claim.cargoInfo}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('common.status')}</span>
                <span className="text-gray-600 text-right">{claim.status}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('homepage.functions.vas')}</span>
                <span className="text-gray-600 text-right">{claim.itemInfo}</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('claims.insurance')}</span>
                <span className="text-gray-600 text-right">{t('common.currency')}0</span>
              </div>
              <div className="grid grid-cols-[80px_1fr] text-[13px]">
                <span className="text-gray-400">{t('common.time')}</span>
                <span className="text-gray-400 text-right">{claim.time}</span>
              </div>

              <div className="flex justify-end pt-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setView('claimDetails');
                  }}
                  className="bg-[#4169E1] text-white text-[13px] font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-100"
                >
                  {t('common.applyOnBehalf')}
                </motion.button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ClaimsView;
