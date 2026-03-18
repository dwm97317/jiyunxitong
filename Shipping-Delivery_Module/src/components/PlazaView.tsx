/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, Plane, Ship } from 'lucide-react';
import { plazaItems } from '../constants';
import { ViewType } from '../types';

interface PlazaViewProps {
  onSelectItem: (id: string) => void;
  setView: (view: ViewType) => void;
}

const PlazaView: React.FC<PlazaViewProps> = ({ onSelectItem, setView }) => {
  return (
    <div className="space-y-4 pb-32">
      {plazaItems.map((item) => (
        <section 
          key={item.id} 
          onClick={() => {
            onSelectItem(item.id);
            setView('plazaDetails');
          }} 
          className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
        >
          <div className="bg-[#F5F7FA] px-4 py-2 flex justify-between items-center text-xs text-gray-500">
            <span>订单号：{item.orderNo}</span>
            <span>预计发货：{item.date}</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img src={item.avatar || item.logo} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  {item.avatar && (
                    <div className="absolute bottom-0 right-0 bg-[#FF9533] text-[8px] text-white px-0.5 rounded-tl-sm">团</div>
                  )}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base">{item.name}</h4>
                    {item.isOfficial && (
                      <span className="bg-[#FFF5EB] text-[#FF9533] text-[10px] px-1.5 py-0.5 rounded border border-[#FFE0C2]">官方</span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded text-white ${item.type === '敏感货' ? 'bg-[#FF6B6B]' : 'bg-[#4A90E2]'}`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3 h-3 ${s <= 3 ? 'fill-[#FFD700] text-[#FFD700]' : 'fill-gray-100 text-gray-100'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                {item.transport === 'air' ? (
                  <Plane className="w-8 h-8 text-[#4A90E2] rotate-[-15deg]" />
                ) : (
                  <Ship className="w-8 h-8 text-[#4A90E2]" />
                )}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-xs text-gray-400">{item.location}</p>
                <p className="text-xs text-gray-400">Zip Code {item.zip}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4A90E2] rounded-full" style={{ width: '35%' }} />
              </div>
              <div className="flex justify-end text-xs">
                <span className="text-[#4A90E2] font-bold">{item.weight}</span>
                <span className="text-gray-300">/{item.total}</span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default PlazaView;
