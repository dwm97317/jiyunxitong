/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const RulesView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 min-h-[80vh]">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center">{t('rules.title')}</h2>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('rules.s1_title')}</h3>
            <p>{t('rules.s1_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('rules.s2_title')}</h3>
            <p>{t('rules.s2_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('rules.s3_title')}</h3>
            <p>{t('rules.s3_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('rules.s4_title')}</h3>
            <p>{t('rules.s4_content')}</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">{t('rules.s5_title')}</h3>
            <p>{t('rules.s5_content')}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesView;
