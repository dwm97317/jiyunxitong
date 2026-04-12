/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Base API configuration
const BASE_URL = '/api';

/**
 * Generic API client for the application
 */
export const apiClient = {
    /**
     * Performs a GET request
     */
    async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    },

    /**
     * Performs a POST request
     */
    async post<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error posting to ${endpoint}:`, error);
            throw error;
        }
    },

    /**
     * Performs a PUT request
     */
    async put<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating ${endpoint}:`, error);
            throw error;
        }
    },

    /**
     * Performs a DELETE request
     */
    async delete<T>(endpoint: string): Promise<T> {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error deleting ${endpoint}:`, error);
            throw error;
        }
    }
};
