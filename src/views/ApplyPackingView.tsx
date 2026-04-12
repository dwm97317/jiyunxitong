/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ApplyPackingViewProps {
  selectedParcels: string[];
  onToggleParcel: (id: string) => void;
}

const ApplyPackingView: React.FC<ApplyPackingViewProps> = ({ selectedParcels, onToggleParcel }) => {
  const { t } = useTranslation();

  const parcels = [
    { id: '1', tracking: 'SF1437829133905', from: 'Nanchang', sender: 'Jiao Heng', to: 'Beijing', recipient: 'Kou Xu', time: '2022-03-17 13:39', status: t('applyPacking.unpackaged') },
    { id: '2', tracking: 'SF1437829133905', from: 'Nanchang', sender: 'Jiao Heng', to: 'Beijing', recipient: 'Kou Xu', time: '2022-03-17 13:39', status: t('applyPacking.unpackaged') },
    { id: '3', tracking: 'SF1437829133905', from: 'Nanchang', sender: 'Jiao Heng', to: 'Beijing', recipient: 'Kou Xu', time: '2022-03-17 13:39', status: t('applyPacking.unpackaged') },
  ];

  return (
    <div className="space-y-4 pb-32">
      {parcels.map((parcel) => (
        <section key={parcel.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleParcel(parcel.id)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedParcels.includes(parcel.id) ? 'bg-[#4A90E2] border-[#4A90E2]' : 'border-gray-300'
                  }`}
              >
                {selectedParcels.includes(parcel.id) && <div className="w-2 h-2 bg-white rounded-full" />}
              </button>
              <span className="text-xs text-gray-400">{t('plaza.orderNo')}：{parcel.tracking}</span>
              <Copy className="w-3 h-3 text-gray-400 cursor-pointer" />
            </div>
            <div className="w-8 h-8 bg-[#FFF5EB] rounded-full flex items-center justify-center border border-[#FFE0C2]">
              <span className="text-[8px] text-[#FF9533] leading-tight text-center">Ind.<br />item</span>
            </div>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="text-center">
              <h4 className="text-lg font-bold">{parcel.from}</h4>
              <p className="text-xs text-gray-400">{parcel.sender}</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="relative w-16 h-[1px] bg-[#4A90E2]">
                <div className="absolute -right-1 -top-[3px] w-1.5 h-1.5 border-t border-r border-[#4A90E2] rotate-45" />
              </div>
              <span className="text-[10px] text-[#4A90E2]">{parcel.status}</span>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-bold">{parcel.to}</h4>
              <p className="text-xs text-gray-400">{parcel.recipient}</p>
            </div>
          </div>

          <div className="bg-[#F9F9F9] rounded-lg p-2 flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4A90E2] rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            <span className="text-xs text-gray-500">{t('applyPacking.receivedTime')}：{parcel.time}</span>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#4A90E2] text-white text-xs font-medium px-4 py-2 rounded-full">
              {t('logistics.details')}
            </button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ApplyPackingView;
