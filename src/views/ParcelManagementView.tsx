/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PackagePlus, PlusCircle, Package } from 'lucide-react';
import { ViewType } from '../types';

// Import sub-views
import PredeclareView from './PredeclareView';
import ParcelClaimView from './ParcelClaimView';
import ApplyPackingView from './ApplyPackingView';

interface ParcelManagementViewProps {
    selectedParcels: string[];
    onToggleParcel: (id: string) => void;
    initialTab?: 'predeclare' | 'claim' | 'apply';
    onTabChange?: (tab: 'predeclare' | 'claim' | 'apply') => void;
}

const ParcelManagementView: React.FC<ParcelManagementViewProps> = ({
    selectedParcels,
    onToggleParcel,
    initialTab = 'predeclare',
    onTabChange
}) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(initialTab);

    const handleTabChange = (tab: 'predeclare' | 'claim' | 'apply') => {
        setActiveTab(tab);
        onTabChange?.(tab);
    };

    const tabs = [
        { id: 'predeclare', label: t('homepage.functions.predeclare'), icon: PackagePlus },
        { id: 'claim', label: t('homepage.functions.claim'), icon: PlusCircle },
        { id: 'apply', label: t('homepage.functions.applyPacking'), icon: Package },
    ];

    return (
        <div className="space-y-4 -mx-4 -mt-4">
            {/* Tab Header */}
            <div className="bg-white flex justify-around border-b border-gray-100 sticky top-0 z-10">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id as any)}
                        className={`flex flex-col items-center py-3 px-2 flex-1 relative transition-colors ${activeTab === tab.id ? 'text-[#4A90E2]' : 'text-gray-400'
                            }`}
                    >
                        <tab.icon className={`w-5 h-5 mb-1 ${activeTab === tab.id ? 'stroke-[2.5px]' : 'stroke-[2px]'}`} />
                        <span className="text-xs font-medium">{tab.label}</span>
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeParcelTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A90E2]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="px-4 py-2">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'predeclare' && <PredeclareView />}
                        {activeTab === 'claim' && <ParcelClaimView />}
                        {activeTab === 'apply' && (
                            <ApplyPackingView
                                selectedParcels={selectedParcels}
                                onToggleParcel={onToggleParcel}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ParcelManagementView;
