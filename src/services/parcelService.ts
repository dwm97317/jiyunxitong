/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Parcel } from '../types';
import { apiClient } from './apiClient';
import { parcels as mockParcels } from '../constants';

/**
 * Service to handle parcel data
 */
export const parcelService = {
    /**
     * Fetch all parcels for current user
     */
    async getAll(): Promise<Parcel[]> {
        try {
            // return await apiClient.get<Parcel[]>('/parcels');

            // FOR NOW: Simulating API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockParcels);
                }, 800);
            });
        } catch (error) {
            return mockParcels;
        }
    },

    /**
     * Post a new parcel claim
     */
    async claimParcel(data: any): Promise<any> {
        try {
            // return await apiClient.post('/claims/parcel', data);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Claiming parcel:', data);
                    resolve({ success: true });
                }, 1000);
            });
        } catch (error) {
            throw error;
        }
    },

    /**
     * Apply for packing multiple parcels
     */
    async applyPacking(parcelIds: string[], options: any): Promise<any> {
        try {
            // return await apiClient.post('/packing/apply', { parcelIds, ...options });

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Applying packing for:', parcelIds, options);
                    resolve({ success: true, trackingNo: 'SF' + Math.random().toString().slice(2, 12) });
                }, 1200);
            });
        } catch (error) {
            throw error;
        }
    }
};
