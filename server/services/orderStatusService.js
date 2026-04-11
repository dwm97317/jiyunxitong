/**
 * Order Status Service
 * 
 * Handles order status updates and triggers notifications
 */

import { OrderRepository, OrderStatusHistoryRepository } from '../db/models.js';

// Statuses that should trigger notifications
const NOTIFICATION_STATUSES = [
  'RECEIVED_TH',
  'IN_TRANSIT_TO_VN', 
  'ARRIVED_QT',
  'DELIVERED_VIETTELPOST'
];

/**
 * Create order status service
 * @param {Object} db - Database instance
 * @param {Object} notificationService - Notification service instance
 * @returns {Object} Order status service methods
 */
export function createOrderStatusService(db, notificationService) {
  return {
    /**
     * Update order status and trigger notification if needed
     * @param {string} orderId - Order ID
     * @param {string} newStatus - New status value
     * @param {Object} options - Additional options
     * @param {string} options.updatedBy - Who updated the status
     * @param {string} options.notes - Update notes
     * @param {boolean} options.skipNotification - Skip notification trigger
     * @returns {Promise<Object>} Update result
     */
    async updateOrderStatus(orderId, newStatus, options = {}) {
      const { 
        updatedBy = 'system', 
        notes = null,
        skipNotification = false 
      } = options;

      console.log(`📝 Updating order ${orderId} status to: ${newStatus}`);

      try {
        // Get current order
        const order = OrderRepository.findById(db, orderId);
        if (!order) {
          throw new Error(`Order ${orderId} not found`);
        }

        const oldStatus = order.status;

        // Update status in database
        OrderRepository.updateStatus(db, orderId, newStatus);

        // Record status change history
        OrderStatusHistoryRepository.record(db, {
          order_id: orderId,
          old_status: oldStatus,
          new_status: newStatus,
          updated_by: updatedBy,
          notes: notes
        });

        console.log(`✅ Order ${orderId} status updated: ${oldStatus} → ${newStatus}`);

        // Trigger notification if status change warrants it
        if (!skipNotification && NOTIFICATION_STATUSES.includes(newStatus)) {
          console.log(`🔔 Triggering notification for order ${orderId}`);
          
          // Send notification asynchronously (non-blocking)
          this._triggerNotificationAsync(orderId, newStatus, order);
        }

        return {
          success: true,
          order_id: orderId,
          old_status: oldStatus,
          new_status: newStatus,
          notification_triggered: !skipNotification && NOTIFICATION_STATUSES.includes(newStatus)
        };

      } catch (error) {
        console.error(`❌ Failed to update order status:`, error);
        throw error;
      }
    },

    /**
     * Get order by ID
     * @param {string} orderId
     * @returns {Object} Order data
     */
    getOrder(orderId) {
      return OrderRepository.findById(db, orderId);
    },

    /**
     * Get order by tracking number
     * @param {string} trackingNumber
     * @returns {Object} Order data
     */
    getOrderByTracking(trackingNumber) {
      return OrderRepository.findByTrackingNumber(db, trackingNumber);
    },

    /**
     * Get status history for order
     * @param {string} orderId
     * @returns {Array} Status history
     */
    getStatusHistory(orderId) {
      return OrderStatusHistoryRepository.findByOrderId(db, orderId);
    },

    /**
     * Internal: Trigger notification asynchronously
     * @private
     */
    async _triggerNotificationAsync(orderId, status, order) {
      try {
        if (!notificationService) {
          console.warn('⚠️  Notification service not available');
          return;
        }

        // Fire and forget - don't block the response
        notificationService.sendZaloNotification(orderId, status, order)
          .then(result => {
            if (result.success) {
              console.log(`✅ Notification sent for order ${orderId}`);
            } else {
              console.warn(`⚠️  Notification failed for order ${orderId}:`, result.reason || result.error);
            }
          })
          .catch(error => {
            console.error(`❌ Notification error for order ${orderId}:`, error);
          });

      } catch (error) {
        console.error('Failed to trigger notification:', error);
      }
    },

    /**
     * Check if status should trigger notification
     * @param {string} status
     * @returns {boolean}
     */
    shouldTriggerNotification(status) {
      return NOTIFICATION_STATUSES.includes(status);
    }
  };
}

export default createOrderStatusService;
