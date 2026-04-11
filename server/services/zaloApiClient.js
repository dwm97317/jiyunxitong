/**
 * Zalo API Client
 * 
 * HTTP client for interacting with Zalo Official Account API
 * Handles message sending, user profile retrieval, and token management
 */

import https from 'https';

class ZaloApiClient {
  constructor(config) {
    this.baseUrl = config.baseUrl || 'https://openapi.zalo.me';
    this.accessToken = config.accessToken;
    this.secretKey = config.secretKey;
    this.oaId = config.oaId;
  }

  /**
   * Send message to Zalo user using template
   * @param {string} userId - Zalo user ID
   * @param {string} templateId - Message template ID
   * @param {Object} templateData - Template parameters
   * @returns {Promise<Object>} API response
   */
  async sendMessage(userId, templateId, templateData) {
    const payload = {
      recipient: { user_id: userId },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_id: templateId,
            template_data: templateData
          }
        }
      }
    };

    return this._makeRequest('POST', '/v2.0/oa/message', payload);
  }

  /**
   * Get user profile information
   * @param {string} userId - Zalo user ID
   * @returns {Promise<Object>} User profile data
   */
  async getUserProfile(userId) {
    return this._makeRequest('GET', '/v2.0/oa/getprofile', null, { user_id: userId });
  }

  /**
   * Get list of followers
   * @param {number} offset - Pagination offset
   * @param {number} count - Number of results
   * @returns {Promise<Object>} Followers list
   */
  async getFollowers(offset = 0, count = 10) {
    return this._makeRequest('GET', '/v2.0/oa/getfollowers', null, { offset, count });
  }

  /**
   * Make HTTP request to Zalo API
   * @private
   * @param {string} method - HTTP method
   * @param {string} path - API path
   * @param {Object} body - Request body (for POST/PUT)
   * @param {Object} queryParams - Query parameters (for GET)
   * @returns {Promise<Object>} API response
   */
  async _makeRequest(method, path, body = null, queryParams = {}) {
    const url = new URL(`${this.baseUrl}${path}`);
    
    // Add access token and OA ID to query params
    url.searchParams.append('access_token', this.accessToken);
    url.searchParams.append('oa_id', this.oaId);
    
    // Add additional query params
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'JiyunXitong-Zalo-Integration/1.0'
      }
    };

    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            
            // Check for API errors
            if (parsedData.error) {
              reject(new Error(`Zalo API Error: ${parsedData.error.message || parsedData.error}`));
              return;
            }
            
            resolve(parsedData);
          } catch (error) {
            reject(new Error(`Failed to parse API response: ${error.message}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Request failed: ${error.message}`));
      });

      // Set timeout
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      // Send body if present
      if (body) {
        req.write(JSON.stringify(body));
      }

      req.end();
    });
  }
}

/**
 * Create Zalo API client instance
 * @param {Object} config - Configuration object
 * @param {string} config.baseUrl - Zalo API base URL
 * @param {string} config.accessToken - OAuth access token
 * @param {string} config.secretKey - Secret key for signature verification
 * @param {string} config.oaId - Official Account ID
 * @returns {ZaloApiClient}
 */
export function createZaloApiClient(config) {
  return new ZaloApiClient({
    baseUrl: config.baseUrl || 'https://openapi.zalo.me',
    accessToken: config.accessToken,
    secretKey: config.secretKey,
    oaId: config.oaId
  });
}

export default ZaloApiClient;
