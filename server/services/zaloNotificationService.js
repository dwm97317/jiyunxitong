/**
 * Zalo Notification Service
 * 
 * Core service for sending notifications via Zalo OA
 * Handles message building, sending, retry logic, and logging
 */

import { createZaloApiClient } from './zaloApiClient.js';

// Monitored statuses that trigger notifications
const NOTIFICATION_STATUSES = [
  'RECEIVED_TH',
  'IN_TRANSIT_TO_VN',
  'ARRIVED_QT',
  'DELIVERED_VIETTELPOST'
];

// Template mapping for each status
const STATUS_TEMPLATE_MAP = {
  'RECEIVED_TH': 'orderReceivedTh',
  'IN_TRANSIT_TO_VN': 'inTransitToVn',
  'ARRIVED_QT': 'arrivedQuangTri',
  'DELIVERED_VIETTELPOST': 'deliveredViettelPost'
};

/**
 * Create notification service instance
 * @param {Object} db - Database instance
 * @param {Object} config - Zalo configuration
 * @returns {Object} Notification service methods
 */
export function createNotificationService(db, config) {
  const zaloClient = createZaloApiClient({
    baseUrl: config.api?.baseUrl || 'https://openapi.zalo.me',
    accessToken: config.accessToken,
    secretKey: config.secretKey,
    oaId: config.oaId
  });

  const templates = config.templates || {};
  const rateLimit = config.rateLimit || {
    maxMessagesPerMinute: 100,
    retryAttempts: 3,
    retryDelayMs: 60000
  };

  return {
    /**
     * Send Zalo notification for order status update
     * @param {string} orderId - Order ID
     * @param {string} status - Order status
     * @param {Object} orderData - Order data (optional, for template params)
     * @returns {Promise<Object>} Result of notification attempt
     */
    async sendZaloNotification(orderId, status, orderData = {}) {
      console.log(`📤 Sending notification for order ${orderId}, status: ${status}`);

      // Check if status should trigger notification
      if (!NOTIFICATION_STATUSES.includes(status)) {
        console.log(`ℹ️  Status ${status} does not trigger notification`);
        return { success: false, reason: 'status_not_monitored' };
      }

      try {
        // Get order from database if not provided
        const order = orderData.id ? orderData : await this._getOrderFromDb(orderId);
        if (!order) {
          throw new Error(`Order ${orderId} not found`);
        }

        // Get Zalo user by phone
        const zaloUser = await this._getZaloUser(order.customer_phone || order.recipient_phone);
        if (!zaloUser) {
          console.log(`⚠️  No Zalo user found for phone: ${order.customer_phone || order.recipient_phone}`);
          // Log as failed
          this._logNotification(orderId, status, null, null, 'failed', 'zalo_user_not_found');
          return { success: false, reason: 'zalo_user_not_found' };
        }

        // Check if user is following OA
        if (!zaloUser.is_followed) {
          console.log(`⚠️  User ${zaloUser.zalo_id} is not following OA`);
          this._logNotification(orderId, status, zaloUser.zalo_id, null, 'failed', 'user_not_following');
          return { success: false, reason: 'user_not_following', zaloUser };
        }

        // Build message template
        const templateKey = STATUS_TEMPLATE_MAP[status];
        const templateId = templates[templateKey];
        
        if (!templateId) {
          throw new Error(`Template not configured for status: ${status}`);
        }

        const templateData = this._buildTemplateParams(status, order);

        // Send notification with retry
        const result = await this._sendWithRetry(zaloUser.zalo_id, templateId, templateData, orderId, status);

        // Log success
        this._logNotification(orderId, status, zaloUser.zalo_id, templateKey, result.success ? 'success' : 'failed', result.error);

        return result;

      } catch (error) {
        console.error(`❌ Failed to send notification for order ${orderId}:`, error);
        this._logNotification(orderId, status, null, null, 'failed', error.message);
        return { success: false, error: error.message };
      }
    },

    /**
     * Get template ID and parameters by status
     * @param {string} status - Order status
     * @param {Object} order - Order data
     * @returns {Object} Template configuration
     */
    buildMessageByStatus(status, order) {
      const templateKey = STATUS_TEMPLATE_MAP[status];
      if (!templateKey) {
        throw new Error(`Unknown status: ${status}`);
      }

      const templateId = templates[templateKey];
      const templateData = this._buildTemplateParams(status, order);

      return { templateId, templateData, templateKey };
    },

    /**
     * Internal: Get order from database
     * @private
     */
    async _getOrderFromDb(orderId) {
      const { OrderRepository } = await import('../db/models.js');
      return OrderRepository.findById(db, orderId);
    },

    /**
     * Internal: Get Zalo user by phone
     * @private
     */
    async _getZaloUser(phone) {
      if (!phone) return null;
      const { ZaloUserRepository } = await import('../db/models.js');
      return ZaloUserRepository.findByPhone(db, phone);
    },

    /**
     * Internal: Build template parameters
     * @private
     */
    _buildTemplateParams(status, order) {
      const date = new Date().toLocaleDateString('vi-VN');

      switch (status) {
        case 'RECEIVED_TH':
          return {
            order_id: order.tracking_number || order.id,
            date: date,
            image_url: order.image_url || ''
          };

        case 'IN_TRANSIT_TO_VN':
          return {
            order_id: order.tracking_number || order.id,
            date: date
          };

        case 'ARRIVED_QT':
          return {
            order_id: order.tracking_number || order.id,
            amount: order.amount_due ? order.amount_due.toLocaleString('vi-VN') : '0',
            date: date
          };

        case 'DELIVERED_VIETTELPOST':
          return {
            order_id: order.tracking_number || order.id,
            tracking_code: order.viettelpost_tracking || order.tracking_number,
            date: date
          };

        default:
          return { order_id: order.tracking_number || order.id, date: date };
      }
    },

    /**
     * Internal: Send message with retry logic
     * @private
     */
    async _sendWithRetry(userId, templateId, templateData, orderId, status) {
      let lastError;
      
      for (let attempt = 1; attempt <= rateLimit.retryAttempts; attempt++) {
        try {
          console.log(`🔄 Attempt ${attempt}/${rateLimit.retryAttempts} for order ${orderId}`);
          
          const result = await zaloClient.sendMessage(userId, templateId, templateData);
          
          console.log(`✅ Notification sent successfully for order ${orderId}`);
          return { success: true, data: result, attempts: attempt };
          
        } catch (error) {
          lastError = error;
          console.warn(`⚠️  Attempt ${attempt} failed:`, error.message);
          
          if (attempt < rateLimit.retryAttempts) {
            // Wait before retry (exponential backoff)
            const delay = rateLimit.retryDelayMs * Math.pow(2, attempt - 1);
            console.log(`⏳ Waiting ${delay}ms before retry...`);
            await this._sleep(delay);
          }
        }
      }

      console.error(`❌ All ${rateLimit.retryAttempts} attempts failed for order ${orderId}`);
      return { success: false, error: lastError?.message || 'Unknown error', attempts: rateLimit.retryAttempts };
    },

    /**
     * Internal: Log notification attempt
     * @private
     */
    async _logNotification(orderId, status, zaloId, template, result, errorMessage) {
      try {
        const { NotificationLogRepository } = await import('../db/models.js');
        NotificationLogRepository.create(db, {
          order_id: orderId,
          status,
          zalo_id: zaloId,
          message_template: template,
          result,
          error_message: errorMessage,
          retry_count: 0
        });
      } catch (error) {
        console.error('Failed to log notification:', error);
      }
    },

    /**
     * Internal: Sleep helper
     * @private
     */
    _sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Check if status should trigger notification
     * @param {string} status
     * @returns {boolean}
     */
    shouldNotify(status) {
      return NOTIFICATION_STATUSES.includes(status);
    }
  };
}

export default createNotificationService;
