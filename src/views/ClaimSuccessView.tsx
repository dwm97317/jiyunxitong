/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ViewType } from '../types';

interface ClaimSuccessViewProps {
    setView: (view: ViewType) => void;
}

const ClaimSuccessView: React.FC<ClaimSuccessViewProps> = ({ setView }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 px-6 text-center space-y-8">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center"
            >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
            </motion.div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">{t('claimSuccess.title')}</h2>
                <p className="text-gray-500 max-w-[280px]">
                    {t('claimSuccess.desc')}
                </p>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('claims')}
                className="bg-[#4A90E2] text-white font-bold px-12 py-4 rounded-full shadow-lg shadow-blue-100 mt-8"
            >
                {t('claimSuccess.btn')}
            </motion.button>
        </div>
    );
};

export default ClaimSuccessView;
