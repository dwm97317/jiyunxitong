/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronLeft, MoreHorizontal, Circle } from 'lucide-react';
import { ViewType } from '../types';

interface HeaderProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ view, setView, title }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-10">
      <button className="p-1" onClick={() => setView('details')}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="flex items-center gap-2 bg-[#F5F5F5] rounded-full px-2 py-1">
        <MoreHorizontal className="w-5 h-5" />
        <div className="w-[1px] h-4 bg-gray-300" />
        <Circle className="w-4 h-4 fill-black" />
      </div>
    </header>
  );
};

export default Header;
