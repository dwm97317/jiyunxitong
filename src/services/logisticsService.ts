/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiClient } from './apiClient';

/**
 * Cấu trúc dữ liệu chi tiết chi phí vận chuyển (Cost Breakdown)
 */
export interface CostDetails {
    weight: string;        // Trọng lượng hàng hóa (KG)
    shippingFee: number;   // Cước phí vận chuyển cơ bản
    oversizeFee: number;   // Phí hàng quá khổ
    overweightFee: number; // Phí hàng quá tải
    surcharges: {          // Các khoản phụ phí đặc thù
        food: number;        // Phụ phí thực phẩm
        textile: number;     // Phụ phí hàng dệt may
        wood: number;        // Phụ phí đồ gỗ
    };
    customsFee: number;    // Phí khai báo hải quan
    materialFee: number;   // Phí vật liệu đóng gói
    vasFee: number;        // Phí dịch vụ giá trị gia tăng (VAS)
    insuranceFee: number;  // Phí bảo hiểm đơn hàng
    total: number;         // Tổng số tiền cuối cùng (VND)
}

/**
 * Dịch vụ xử lý các phép tính logistics và thanh toán
 * Service cung cấp dữ liệu giả lập (Mock) phục vụ phát triển giao diện.
 */
export const logisticsService = {
    /**
     * Truy xuất bảng kê chi phí cho một dịch vụ cụ thể
     * @param serviceId ID của dịch vụ vận tải (standard | fast | special)
     */
    async getCosts(serviceId: string): Promise<CostDetails> {
        // Giả lập độ trễ mạng để kiểm tra giao diện Loading
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    weight: '21.0 KG',
                    shippingFee: 500,
                    oversizeFee: 180,
                    overweightFee: 180,
                    surcharges: {
                        food: 50,
                        textile: 50,
                        wood: 60,
                    },
                    customsFee: 50,
                    materialFee: 50,
                    vasFee: 50,
                    insuranceFee: 5,
                    total: 693.08 // Sử dụng giá trị chính xác từ thiết kế mockup
                });
            }, 300);
        });
    },

    /**
     * Xử lý lệnh thanh toán cho đơn hàng
     * @param orderId ID của đơn hàng cần thanh toán
     */
    async processPayment(orderId: string): Promise<boolean> {
        const response = await apiClient.post('/payment', { orderId });
        return !!response;
    }
};
