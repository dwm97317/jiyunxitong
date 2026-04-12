/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const ClaimTermsView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 min-h-[80vh]">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center">{t('claimTerms.title')}</h2>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('claimTerms.s1_title')}</h3>
            <p>{t('claimTerms.s1_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('claimTerms.s2_title')}</h3>
            <p>{t('claimTerms.s2_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('claimTerms.s3_title')}</h3>
            <p>{t('claimTerms.s3_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('claimTerms.s4_title')}</h3>
            <p>{t('claimTerms.s4_content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClaimTermsView;
