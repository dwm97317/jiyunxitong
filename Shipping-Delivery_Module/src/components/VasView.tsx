/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { vasServices } from '../constants';

interface VasViewProps {
  selectedVas: string[];
  setSelectedVas: React.Dispatch<React.SetStateAction<string[]>>;
}

const VasView: React.FC<VasViewProps> = ({ selectedVas, setSelectedVas }) => {
  return (
    <div className="space-y-4 pb-20">
      {vasServices.map((service) => (
        <section 
          key={service.id} 
          className="bg-white rounded-2xl p-4 shadow-sm space-y-3 relative overflow-hidden"
          onClick={() => {
            setSelectedVas(prev => 
              prev.includes(service.id) 
                ? prev.filter(id => id !== service.id) 
                : [...prev, service.id]
            );
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">{service.title}</h3>
              <div className="bg-blue-50 px-3 py-1 rounded-full rounded-tr-none rounded-br-none -mr-4 pr-6">
                <span className="text-[#4A90E2] font-bold">¥ {service.price}</span>
              </div>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              selectedVas.includes(service.id) ? 'border-[#4A90E2] bg-[#4A90E2]' : 'border-gray-200'
            }`}>
              {selectedVas.includes(service.id) && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed pr-8">
            {service.description}
          </p>
        </section>
      ))}
    </div>
  );
};

export default VasView;
