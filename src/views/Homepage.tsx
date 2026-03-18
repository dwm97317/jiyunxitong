/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
    Package,
    Search,
    ClipboardList,
    MapPin,
    ShieldCheck,
    PlusCircle,
    PackagePlus,
    ArrowRight,
    TrendingUp,
    Clock,
    ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ViewType } from '../types';

interface HomepageProps {
    setView: (view: ViewType) => void;
    setParcelTab: (tab: 'predeclare' | 'claim' | 'apply') => void;
}

const Homepage: React.FC<HomepageProps> = ({ setView, setParcelTab }) => {
    const { t } = useTranslation();

    const mainFunctions = [
        { id: 'predeclare', title: t('homepage.functions.predeclare'), subtitle: t('homepage.functions.predeclareSub'), icon: PackagePlus, color: '#4A90E2', bg: '#EDF5FF' },
        { id: 'claim', title: t('homepage.functions.claim'), subtitle: t('homepage.functions.claimSub'), icon: PlusCircle, color: '#F5A623', bg: '#FFF8ED' },
        { id: 'plaza', title: t('homepage.functions.plaza'), subtitle: t('homepage.functions.plazaSub'), icon: MapPin, color: '#7ED321', bg: '#F4FAF0' },
        { id: 'claims', title: t('homepage.functions.claims'), subtitle: t('homepage.functions.claimsSub'), icon: ShieldCheck, color: '#D0021B', bg: '#FEF2F2' },
        { id: 'applyPacking', title: t('homepage.functions.applyPacking'), subtitle: t('homepage.functions.applyPackingSub'), icon: Package, color: '#9013FE', bg: '#F8F2FF' },
        { id: 'vas', title: t('homepage.functions.vas'), subtitle: t('homepage.functions.vasSub'), icon: ClipboardList, color: '#50E3C2', bg: '#F2FEFA' },
    ];

    const stats = [
        { label: t('homepage.stats.inTransit'), value: '3', unit: t('homepage.stats.unitOrder') },
        { label: t('homepage.stats.pending'), value: '12', unit: t('homepage.stats.unitParcel') },
        { label: t('homepage.stats.balance'), value: '256.40', unit: t('homepage.stats.unitCurrency') },
    ];

    return (
        <div className="space-y-6 pb-20">
            {/* Welcome Header with Robot Mascot */}
            <section className="flex items-center justify-between px-1 pt-2">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        {t('common.hello', { defaultValue: 'Hello!' })}
                    </h1>
                    <p className="text-xs text-gray-400 font-medium">{t('homepage.welcomeSub', { defaultValue: 'Welcome to Aurora Logistics' })}</p>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-1 bg-blue-100 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity animate-pulse" />
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative overflow-hidden ring-4 ring-white">
                        <img
                            src="/src/assets/robot.png"
                            alt="Assistant"
                            className="w-12 h-12 grayscale-[0.2] transition-transform group-hover:scale-110"
                        />
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#FFD100] transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder={t('homepage.searchPlaceholder')}
                    className="block w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl shadow-sm focus:ring-2 focus:ring-[#FFD100]/20 focus:border-[#FFD100] transition-all text-sm outline-none"
                />
                <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#FFD100] hover:bg-[#FFC000] text-black font-semibold rounded-xl text-sm transition-colors shadow-sm">
                    {t('homepage.searchBtn')}
                </button>
            </div>

            {/* Hero / Quick Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-3 gap-3"
            >
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
                        <span className="text-[10px] text-gray-500 font-medium mb-1">{stat.label}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-800">{stat.value}</span>
                            <span className="text-[10px] text-gray-400">{stat.unit}</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Main Grid Functions */}
            <div className="grid grid-cols-2 gap-4">
                {mainFunctions.map((fn, idx) => (
                    <motion.button
                        key={fn.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            if (fn.id === 'predeclare' || fn.id === 'claim' || fn.id === 'applyPacking') {
                                setParcelTab(fn.id === 'applyPacking' ? 'apply' : fn.id as any);
                                setView('parcelManagement');
                            } else {
                                setView(fn.id as ViewType);
                            }
                        }}
                        className="flex flex-col items-start p-5 bg-white rounded-3xl shadow-sm border border-gray-50 hover:border-[#FFD100]/30 transition-all text-left group"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                            style={{ backgroundColor: fn.bg }}
                        >
                            <fn.icon className="w-6 h-6" style={{ color: fn.color }} />
                        </div>
                        <h3 className="text-base font-bold text-gray-800 mb-1">{fn.title}</h3>
                        <p className="text-[10px] text-gray-400 font-medium">{fn.subtitle}</p>
                    </motion.button>
                ))}
            </div>

            {/* Promotion / Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4A90E2] to-[#357ABD] p-6 text-white"
            >
                <div className="relative z-10 flex flex-col h-full">
                    <div className="bg-white/20 self-start px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2">
                        {t('homepage.promotion.tag')}
                    </div>
                    <h2 className="text-xl font-bold mb-2">{t('homepage.promotion.title')}</h2>
                    <p className="text-sm text-white/80 mb-4 max-w-[200px]">{t('homepage.promotion.desc')}</p>
                    <button className="flex items-center gap-2 bg-white text-[#4A90E2] px-4 py-2 rounded-xl text-xs font-bold w-fit hover:bg-gray-100 transition-colors">
                        {t('homepage.promotion.btn')} <ArrowRight className="w-3 h-3" />
                    </button>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 rotate-12">
                    <TrendingUp className="w-40 h-40" />
                </div>
            </motion.div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#FFD100]" /> {t('homepage.recentOrders')}
                </h3>
                <button className="text-sm text-gray-400 font-medium flex items-center">
                    {t('common.seeAll')} <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Simple List for Recent Activity */}
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-800">JD928374982{i}</div>
                                <div className="text-[10px] text-gray-400">{t('homepage.orderStatus.estimated')}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-[#FFD100]">{t('homepage.orderStatus.inTransit')}</div>
                            <div className="text-[10px] text-gray-300">2024-10-24</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
