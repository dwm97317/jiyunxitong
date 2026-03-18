/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Claim } from '../types';

interface ClaimTrackingViewProps {
  claim: Claim;
}

const ClaimTrackingView: React.FC<ClaimTrackingViewProps> = ({ claim }) => {
  const { t } = useTranslation();

  const steps = [
    { label: t('claimTracking.steps.apply'), active: true },
    { label: t('claimTracking.steps.review'), active: true },
    { label: t('claimTracking.steps.process'), active: true },
    { label: t('claimTracking.steps.complete'), active: claim.status === 'completed' },
  ];

  return (
    <div className="space-y-4">
      {/* Customer Service Card */}
      <section className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-100">
              <img
                src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix"
                alt="Bot"
                className="w-10 h-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="text-base font-bold">{t('claimTracking.employeeId')}：9527</h3>
              <p className="text-xs text-gray-400">{t('claimTracking.phone')}：010-80908803</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-[#4A90E2] text-white text-sm font-medium px-4 py-2 rounded-full shadow-md shadow-blue-100"
          >
            {t('claimTracking.contactSupport')}
          </motion.button>
        </div>

        <div className="bg-[#EBF3FF] rounded-xl p-3">
          <p className="text-[11px] text-[#4A90E2] leading-relaxed">
            {t('claimTracking.supportHint')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex justify-between items-start pt-2 px-2">
          {steps.map((step, idx, arr) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1 relative">
              <div className={`w-5 h-5 rounded-full border-4 flex items-center justify-center z-10 ${step.active ? 'border-blue-100 bg-[#4A90E2]' : 'border-gray-100 bg-white'
                }`}>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className={`text-[10px] whitespace-nowrap ${step.active ? 'text-[#4A90E2] font-medium' : 'text-gray-400'}`}>
                {step.label}
              </span>
              {idx < arr.length - 1 && (
                <div className="absolute top-2.5 left-[60%] w-[80%] h-[1px] bg-gray-100" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Claim Progress Timeline */}
      <section className="bg-white rounded-2xl p-5 shadow-sm space-y-6">
        <h3 className="text-base font-bold">{t('claimTracking.progress')}</h3>

        <div className="space-y-8 relative pl-8">
          {/* Timeline Line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-[1px] border-l border-dashed border-gray-200" />

          {claim.status === 'completed' ? (
            <>
              {/* Latest Status: Completed */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-7 h-7 bg-[#E8F5E9] rounded-full flex items-center justify-center z-10 border-4 border-white">
                  <div className="w-3 h-3 bg-[#4CAF50] rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#4CAF50]">{t('claimTracking.steps.complete')}</h4>
                  <p className="text-sm text-gray-400">2022-04-02 14:38</p>
                </div>
              </div>
              {/* Previous Statuses */}
              <div className="relative">
                <div className="absolute -left-6.5 top-1.5 w-4 h-4 bg-white rounded-full border border-gray-200 flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 bg-gray-200 rotate-45" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">2022-04-02 14:38</p>
                  <h4 className="text-sm font-medium text-gray-500">{t('claimTracking.steps.process')}</h4>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Latest Status: Processing */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-7 h-7 bg-[#EBF3FF] rounded-full flex items-center justify-center z-10 border-4 border-white">
                  <div className="w-4 h-4 bg-[#4A90E2] rounded-full flex items-center justify-center gap-0.5">
                    <div className="w-0.5 h-0.5 bg-white rounded-full" />
                    <div className="w-0.5 h-0.5 bg-white rounded-full" />
                    <div className="w-0.5 h-0.5 bg-white rounded-full" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#4A90E2]">{t('claimTracking.steps.process')}</h4>
                  <p className="text-sm text-gray-400">2022-04-02 14:38</p>
                </div>
              </div>
            </>
          )}

          {/* Shared History */}
          {[
            { status: t('claimTracking.timeline.verifying'), time: '2022-04-02 09:53' },
            { status: t('claimTracking.timeline.submitted'), time: '2022-04-02 09:53' },
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-6.5 top-1.5 w-4 h-4 bg-white rounded-full border border-gray-200 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 bg-gray-200 rotate-45" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-400">{item.time}</p>
                <h4 className="text-sm font-medium text-gray-500">{item.status}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ClaimTrackingView;
