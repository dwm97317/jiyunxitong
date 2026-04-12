/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ViewType } from '../types';

/**
 * Giao diện thông báo Thanh toán/Gửi yêu cầu thành công
 * Hiển thị xác nhận trực quan và các nút điều hướng nhanh
 */
interface PaymentSuccessViewProps {
    setView: (view: ViewType) => void; // Hàm chuyển đổi màn hình chính
}

const PaymentSuccessView: React.FC<PaymentSuccessViewProps> = ({ setView }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-8 text-center bg-[#FDFDFD]">
            {/* Hiệu ứng vòng tròn xanh xác nhận thành công */}
            <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1.1, rotate: 0 }}
                transition={{
                    type: 'spring',
                    damping: 12,
                    stiffness: 120,
                    delay: 0.1
                }}
                className="w-28 h-28 bg-[#4CAF50]/10 rounded-full flex items-center justify-center mb-10 shadow-sm relative"
            >
                <div className="absolute inset-0 bg-[#4CAF50]/5 rounded-full animate-ping" />
                <CheckCircle2 className="w-18 h-18 text-[#4CAF50] relative z-10" />
            </motion.div>

            {/* Thông điệp chính */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
            >
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    {t('common.confirm')}!
                </h2>
                <p className="text-gray-400 text-sm font-medium max-w-[260px] leading-relaxed">
                    Yêu cầu vận chuyển cao cấp của bạn đã được xử lý thành công trên hệ thống.
                </p>
            </motion.div>

            {/* Hành động điều hướng nhanh (Quick Actions) */}
            <div className="w-full mt-12 space-y-4">
                {/* Nút Theo dõi đơn hàng */}
                <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setView('parcelManagement')}
                    className="w-full h-15 py-4 bg-[#1A1A1A] rounded-2xl text-white font-black text-base shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3 active:brightness-95 transition-all"
                >
                    <Package className="w-5 h-5 text-gray-400" />
                    Theo dõi đơn hàng
                    <ArrowRight className="w-4 h-4 text-gray-500" />
                </motion.button>

                {/* Nút Quay về Trang chủ */}
                <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setView('home')}
                    className="w-full h-15 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-500 font-black text-base flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
                >
                    <Home className="w-5 h-5" />
                    Quay lại Trang chủ
                </motion.button>
            </div>

            {/* Phông nền trang trí nhẹ nhàng */}
            <div className="fixed bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none -z-10" />
        </div>
    );
};

export default PaymentSuccessView;
