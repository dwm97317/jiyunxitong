/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ViewType } from '../types';

interface FooterProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  selectedParcelsCount: number;
  onSelectAllParcels: () => void;
  onShowPackingModal: () => void;
  parcelTab?: 'predeclare' | 'claim' | 'apply';
}

const Footer: React.FC<FooterProps> = ({
  view,
  setView,
  selectedParcelsCount,
  onSelectAllParcels,
  onShowPackingModal,
  parcelTab
}) => {
  const { t } = useTranslation();

  if (view === 'home' || view === 'claimSuccess' || view === 'details' || view === 'empty') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
      {view === 'plazaDetails' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('details')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('plaza.joinGroup')}
        </motion.button>
      ) : view === 'applyPacking' ? (
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onSelectAllParcels}
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedParcelsCount === 3 ? 'bg-[#4A90E2] border-[#4A90E2]' : 'border-gray-300'
                }`}
            >
              {selectedParcelsCount === 3 && <div className="w-2 h-2 bg-white rounded-full" />}
            </button>
            <span className="text-sm text-gray-500">
              {t('footer.selectAll')}, {t('footer.selected')} <span className="text-[#4A90E2]">{selectedParcelsCount}</span> {t('common.kg')}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShowPackingModal}
            className="px-12 bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
          >
            {t('common.next')}
          </motion.button>
        </div>
      ) : view === 'predeclare' ? (
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-500">{t('logistics.estTime')}</span>
              <span className="text-lg font-bold text-[#4A90E2]">--</span>
            </div>
            <p className="text-[10px] text-gray-400">最终费用以仓库称重后开单为准</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="bg-[#4A90E2] text-white font-bold px-10 py-3 rounded-full shadow-lg shadow-blue-100"
          >
            {t('common.submit')}
          </motion.button>
        </div>
      ) : view === 'vas' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('details')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('common.confirm')}
        </motion.button>
      ) : view === 'claimDetails' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('claimSuccess')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('common.submit')}
        </motion.button>
      ) : view === 'insuranceRules' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('claims')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('footer.gotIt')}
        </motion.button>
      ) : view === 'claimTracking' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('claims')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('footer.back')}
        </motion.button>
      ) : view === 'claimRules' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('claims')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('footer.gotIt')}
        </motion.button>
      ) : view === 'claimTerms' ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setView('claims')}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {t('footer.gotIt')}
        </motion.button>
      ) : view === 'parcelManagement' ? (
        parcelTab === 'apply' ? (
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <button
                onClick={onSelectAllParcels}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedParcelsCount === 3 ? 'bg-[#4A90E2] border-[#4A90E2]' : 'border-gray-300'
                  }`}
              >
                {selectedParcelsCount === 3 && <div className="w-2 h-2 bg-white rounded-full" />}
              </button>
              <span className="text-sm text-gray-500">
                {t('footer.selectAll')}, {t('footer.selected')} <span className="text-[#4A90E2]">{selectedParcelsCount}</span> {t('common.kg')}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onShowPackingModal}
              className="px-8 bg-[#4A90E2] text-white font-bold py-3 rounded-full shadow-lg shadow-blue-100 flex-1"
            >
              {t('common.next')}
            </motion.button>
          </div>
        ) : parcelTab === 'predeclare' ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-gray-500">{t('logistics.estTime')}</span>
                <span className="text-lg font-bold text-[#4A90E2]">--</span>
              </div>
              <p className="text-[10px] text-gray-400">最终费用以仓库称重后开单为准</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="bg-[#4A90E2] text-white font-bold px-10 py-3 rounded-full shadow-lg shadow-blue-100"
            >
              {t('common.submit')}
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView('home')}
            className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
          >
            {t('footer.back')}
          </motion.button>
        )
      ) : (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (view === 'rules' || view === 'claim' || view === 'claims') {
              setView('details');
            } else if (view === 'details') {
              setView('predeclare');
            } else {
              setView('details');
            }
          }}
          className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100"
        >
          {view === 'rules' ? t('footer.gotIt') : (view === 'claim' || view === 'claims' ? t('footer.back') : (view === 'details' ? t('footer.confirm') : t('footer.joinPlaza')))}
        </motion.button>
      )}
    </div >
  );
};

export default Footer;
