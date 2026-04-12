/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { claims } from '../constants';
import { ViewType } from '../types';

interface ClaimsViewProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setView: (view: ViewType) => void;
  setSelectedClaimId: (id: string) => void;
}

const ClaimsView: React.FC<ClaimsViewProps> = ({ activeTab, setActiveTab, setView, setSelectedClaimId }) => {
  return (
    <div className="space-y-4 -mx-4 -mt-4">
      {/* Tabs */}
      <div className="bg-white flex justify-around border-b border-gray-100 relative">
        {[
          { id: 'available', label: '可申请' },
          { id: 'processing', label: '处理中' },
          { id: 'completed', label: '已完成' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-4 text-sm font-medium relative transition-colors ${
              activeTab === tab.id ? 'text-[#333]' : 'text-gray-400'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#4A90E2] rounded-full"
              />
            )}
          </button>
        ))}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setView('claimRules')}
            className="text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full"
          >
            理赔规则
          </button>
          <button 
            onClick={() => setView('claimTerms')}
            className="text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full"
          >
            服务条款
          </button>
        </div>
      </div>

      {/* Claims List */}
      <div className="px-4 space-y-4 pb-20">
        {claims.map((claim) => (
          <section 
            key={claim.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
            onClick={() => {
              setSelectedClaimId(claim.id);
              setView('claimTracking');
            }}
          >
            <div className="bg-[#FFF9F5] px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-[#4A90E2] rounded flex items-center justify-center text-white font-bold text-xs italic">
                   JG
                 </div>
                 <span className="text-sm font-bold text-[#4A90E2]">极光转运</span>
              </div>
              <span className="text-xs text-[#FF9E5E]">{claim.type}</span>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">运单号</span>
                <span className="text-gray-600">{claim.trackingNo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">国际单号</span>
                <span className="text-gray-600">{claim.intlNo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">货物信息</span>
                <span className="text-gray-600">{claim.cargoInfo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">货物状态</span>
                <span className="text-gray-600">{claim.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">物品信息</span>
                <span className="text-gray-600">{claim.itemInfo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">保价</span>
                <span className="text-gray-600">{claim.insurance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">创建时间</span>
                <span className="text-gray-600">{claim.time}</span>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setView('claimDetails');
                  }}
                  className="bg-[#4A90E2] text-white text-sm font-medium px-6 py-2 rounded-full shadow-md shadow-blue-100"
                >
                  申请代付
                </motion.button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default ClaimsView;
