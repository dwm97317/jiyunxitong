/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, MoreHorizontal, Circle, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ViewType } from '../types';

interface HeaderProps {
  view: ViewType;
  onBack: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ view, onBack, title }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const langs = ['zh', 'en', 'vi'];
    const currentShort = i18n.language.split('-')[0];
    const currentIndex = langs.indexOf(currentShort);
    const nextIndex = (currentIndex + 1) % langs.length;
    i18n.changeLanguage(langs[nextIndex]);
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-20 shadow-sm">
      <div className="flex items-center">
        <button
          className={`p-1 transition-all ${view === 'home' ? 'w-0 opacity-0 pointer-events-none' : 'w-8 opacity-100'}`}
          onClick={onBack}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold truncate max-w-[200px]">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg border border-gray-100"
        >
          <Languages className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-bold text-gray-600 uppercase">
            {i18n.language.startsWith('zh') ? 'EN' : i18n.language.startsWith('en') ? 'VN' : '中文'}
          </span>
        </motion.button>

        <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-full px-2 py-1">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
          <div className="w-[1px] h-4 bg-gray-300 mx-0.5" />
          <Circle className="w-4 h-4 fill-black" />
        </div>
      </div>
    </header>
  );
};

export default Header;
