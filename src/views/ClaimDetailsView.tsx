/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const ClaimDetailsView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
      {/* Claim Reason */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold">{t('claimDetails.reason')}</h3>
        <div className="relative">
          <textarea
            placeholder={t('claimDetails.reasonPlaceholder')}
            className="w-full bg-[#F5F5F5] rounded-xl p-4 text-sm min-h-[120px] outline-none resize-none"
            maxLength={100}
          />
          <span className="absolute bottom-4 right-4 text-xs text-gray-400">0/100</span>
        </div>
      </div>

      {/* Value Evidence */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold">{t('claimDetails.evidence')}</h3>
        <div className="w-24 h-24 bg-[#F5F5F5] rounded-xl flex items-center justify-center cursor-pointer">
          <div className="text-gray-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Claim Amount */}
      <div className="flex items-center justify-between py-4 border-b border-gray-50">
        <h3 className="text-sm font-bold">{t('claimDetails.amount')}</h3>
        <input
          type="text"
          placeholder={t('claimDetails.amountPlaceholder')}
          className="text-right text-sm outline-none placeholder:text-gray-300"
        />
      </div>

      {/* Loss Code Proof */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">{t('claimDetails.lossProof')}</h3>
          <input
            type="text"
            placeholder={t('claimDetails.lossProofPlaceholder')}
            className="text-right text-sm outline-none placeholder:text-gray-300"
          />
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {t('claimDetails.lossHint')}
        </p>
      </div>
    </div>
  );
};

export default ClaimDetailsView;
