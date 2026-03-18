/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlazaItem } from '../types';
import { apiClient } from './apiClient';
import { plazaItems as mockPlazaItems } from '../constants';

/**
 * Service xử lý dữ liệu cho Chợ Gom hàng (Consolidation Shipping Plaza)
 * Cung cấp các phương thức lấy danh sách và chi tiết đơn gom.
 */
export const plazaService = {
    /**
     * Lấy toàn bộ danh sách các nhóm gom hàng đang hoạt động
     */
    async getAll(): Promise<PlazaItem[]> {
        try {
            // return await apiClient.get<PlazaItem[]>('/plaza');

            // Hiện tại giả lập kết nối mạng với dữ liệu từ constants.ts
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockPlazaItems);
                }, 800);
            });
        } catch (error) {
            console.error('Lỗi khi tải danh sách chợ gom:', error);
            return mockPlazaItems;
        }
    },

    /**
     * Truy vấn chi tiết một nhóm gom hàng theo ID
     * @param id ID của nhóm gom hàng
     */
    async getById(id: string): Promise<PlazaItem | undefined> {
        try {
            // return await apiClient.get<PlazaItem>(`/plaza/${id}`);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockPlazaItems.find(item => item.id === id));
                }, 400);
            });
        } catch (error) {
            return mockPlazaItems.find(item => item.id === id);
        }
    },

    /**
     * Gửi yêu cầu tham gia gom hàng (Pre-declare parcel)
     */
    async predeclare(data: any): Promise<any> {
        return await apiClient.post('/predeclare', data);
    }
};
