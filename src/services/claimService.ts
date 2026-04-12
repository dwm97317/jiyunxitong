/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Claim } from '../types';
import { apiClient } from './apiClient';
import { claims as mockClaims } from '../constants';

/**
 * Service to handle after-sales claims and tracking
 */
export const claimService = {
    /**
     * Fetch all claims for the current user
     */
    async getAll(): Promise<Claim[]> {
        try {
            // return await apiClient.get<Claim[]>('/claims');

            // FOR NOW: Simulating API call
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockClaims);
                }, 800);
            });
        } catch (error) {
            return mockClaims;
        }
    },

    /**
     * Fetch a single claim detail with tracking history
     */
    async getDetail(id: string): Promise<Claim | undefined> {
        try {
            // return await apiClient.get<Claim>(`/claims/${id}`);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(mockClaims.find(c => c.id === id));
                }, 500);
            });
        } catch (error) {
            return mockClaims.find(c => c.id === id);
        }
    },

    /**
     * Submit a new claim manually
     */
    async submitClaim(data: any): Promise<any> {
        try {
            // return await apiClient.post('/claims/manual', data);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('Submitting new claim:', data);
                    resolve({ success: true, claimId: 'CLM' + Math.random().toString().slice(2, 12) });
                }, 1200);
            });
        } catch (error) {
            throw error;
        }
    }
};
