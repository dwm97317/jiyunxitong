/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { apiClient } from './apiClient';

/**
 * Service to handle user authentication and profile
 */
export const authService = {
    /**
     * Login user with username and password
     */
    async login(credentials: any): Promise<any> {
        try {
            // return await apiClient.post('/auth/login', credentials);

            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log('User logging in:', credentials);
                    resolve({
                        user: { id: 'usr-1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
                        token: 'mock-jwt-token'
                    });
                }, 1000);
            });
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get current user profile information
     */
    async getProfile(): Promise<any> {
        try {
            // return await apiClient.get('/auth/profile');

            return { id: 'usr-1', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Logout current user session
     */
    async logout(): Promise<void> {
        try {
            // await apiClient.post('/auth/logout', {});
            localStorage.removeItem('token');
            console.log('User logged out');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }
};
