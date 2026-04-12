/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

const InsuranceRulesView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-8 pb-32">
            <h2 className="text-xl font-bold text-center">{t('insuranceRules.title')}</h2>

            <div className="space-y-6">
                {/* Section 1 */}
                <section className="space-y-3">
                    <h3 className="text-sm font-bold leading-relaxed">
                        {t('insuranceRules.item1.title')}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 leading-relaxed pl-1">
                        <p>{t('insuranceRules.item1.overInsurance')}</p>
                        <p>{t('insuranceRules.item1.underInsurance')}</p>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="space-y-3">
                    <h3 className="text-sm font-bold">{t('insuranceRules.item2.title')}</h3>
                    <div className="space-y-2 text-sm text-gray-600 leading-relaxed pl-1">
                        <p>{t('insuranceRules.item2.fee1')}</p>
                        <p className="whitespace-pre-line">{t('insuranceRules.item2.fee2')}</p>
                        <p>{t('insuranceRules.item2.fee3')}</p>
                    </div>
                </section>

                {/* Section 3 */}
                <section className="space-y-3">
                    <h3 className="text-sm font-bold">{t('insuranceRules.item3.title')}</h3>
                    <div className="space-y-2 text-sm text-gray-600 leading-relaxed pl-1">
                        <p className="whitespace-pre-line">{t('insuranceRules.item3.content')}</p>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="space-y-3">
                    <h3 className="text-sm font-bold">{t('insuranceRules.item4.title')}</h3>
                    <div className="space-y-2 text-sm text-gray-600 leading-relaxed pl-1 text-[13px]">
                        <p>{t('insuranceRules.item4.content')}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default InsuranceRulesView;
