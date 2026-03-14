/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';

interface PackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  shippingMethod: 'sea' | 'air';
  setShippingMethod: (method: 'sea' | 'air') => void;
  onSubmit: () => void;
}

const PackingModal: React.FC<PackingModalProps> = ({ 
  isOpen, 
  onClose, 
  shippingMethod, 
  setShippingMethod, 
  onSubmit 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 px-6 pt-8 pb-10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold">填写打包信息</h2>
              <button onClick={onClose} className="p-1">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-8">
              {/* VAS */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">增值服务</span>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-gray-800">退货服务 标准加固...</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">运送方式</span>
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setShippingMethod('sea')}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === 'sea' ? 'border-[#4A90E2] bg-[#4A90E2]' : 'border-gray-300'}`}>
                      {shippingMethod === 'sea' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-500">海运</span>
                  </button>
                  <button 
                    onClick={() => setShippingMethod('air')}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${shippingMethod === 'air' ? 'border-[#4A90E2] bg-[#4A90E2]' : 'border-gray-300'}`}>
                      {shippingMethod === 'air' && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="text-sm text-gray-500">空运</span>
                  </button>
                </div>
              </div>

              {/* Available Parcels */}
              <div className="space-y-4">
                <h3 className="text-sm text-gray-500">可用包裹</h3>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
                  {[
                    'https://picsum.photos/seed/shoes1/300/300',
                    'https://picsum.photos/seed/shoes2/300/300',
                    'https://picsum.photos/seed/shoes3/300/300',
                  ].map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden shadow-sm">
                      <img src={img} alt="Parcel" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onSubmit}
                className="w-full bg-[#4A90E2] text-white font-bold py-4 rounded-full shadow-lg shadow-blue-100 mt-4"
              >
                提交打包
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PackingModal;
