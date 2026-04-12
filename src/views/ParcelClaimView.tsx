/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { parcels } from '../constants';

const ParcelClaimView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('homepage.searchPlaceholder')}
          className="w-full bg-white rounded-xl py-3 pl-12 pr-4 text-sm outline-none shadow-sm"
        />
      </div>

      {/* Parcel List */}
      {parcels.map((parcel) => (
        <section key={parcel.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t('plaza.orderNo')}：</span>
              <span className="font-medium">{parcel.trackingNo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t('parcelClaim.parcelInfo')}：</span>
              <span className="text-[#FF6B00]">{parcel.info}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t('plazaDetails.startTime')}：</span>
              <span className="text-gray-600">{parcel.time}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {parcel.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="parcel"
                className="w-1/3 aspect-square object-cover rounded-lg"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>

          <div className="flex justify-end">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-[#4A90E2] text-white text-sm font-medium px-8 py-2 rounded-full"
            >
              {t('homepage.functions.claim')}
            </motion.button>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ParcelClaimView;
