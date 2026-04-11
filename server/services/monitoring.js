/**
 * Monitoring Service
 * 
 * Tracks notification delivery rates, failures, and analytics
 */

import { NotificationLogRepository } from '../db/models.js';

/**
 * Create monitoring service
 * @param {Object} db - Database instance
 * @returns {Object} Monitoring methods
 */
export function createMonitoringService(db) {
  return {
    /**
     * Get notification statistics
     * @returns {Object} Stats including total, success, failed, delivery rate
     */
    getNotificationStats() {
      return NotificationLogRepository.getStats(db);
    },

    /**
     * Get failed notifications
     * @param {number} days - Number of days to look back
     * @returns {Array} Failed notification logs
     */
    getFailedNotifications(days = 7) {
      return NotificationLogRepository.findFailed(db, days);
    },

    /**
     * Get analytics data for dashboard
     * @param {Object} options - Query options
     * @param {number} options.days - Number of days for analytics
     * @returns {Object} Analytics data
     */
    getAnalytics(options = {}) {
      const { days = 30 } = options;

      // Get overall stats
      const stats = this.getNotificationStats();

      // Get notifications by status
      const stmt = db.prepare(`
        SELECT status, COUNT(*) as count 
        FROM notification_logs 
        WHERE created_at >= datetime('now', '-' || ? || ' days')
        GROUP BY status
        ORDER BY count DESC
      `);
      const byStatus = stmt.all(days);

      // Get notifications by result
      const resultStmt = db.prepare(`
        SELECT result, COUNT(*) as count 
        FROM notification_logs 
        WHERE created_at >= datetime('now', '-' || ? || ' days')
        GROUP BY result
        ORDER BY count DESC
      `);
      const byResult = resultStmt.all(days);

      // Get daily notification count for chart
      const dailyStmt = db.prepare(`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM notification_logs
        WHERE created_at >= datetime('now', '-' || ? || ' days')
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `);
      const dailyCounts = dailyStmt.all(days);

      // Get top failed orders
      const failedOrdersStmt = db.prepare(`
        SELECT order_id, status, error_message, COUNT(*) as failure_count
        FROM notification_logs
        WHERE result = 'failed'
        AND created_at >= datetime('now', '-' || ? || ' days')
        GROUP BY order_id
        ORDER BY failure_count DESC
        LIMIT 10
      `);
      const topFailedOrders = failedOrdersStmt.all(days);

      return {
        period: `${days} days`,
        overall: stats,
        byStatus,
        byResult,
        dailyCounts,
        topFailedOrders,
        generated_at: new Date().toISOString()
      };
    },

    /**
     * Check for alert conditions
     * @returns {Object} Alert status
     */
    checkAlerts() {
      const stats = this.getNotificationStats();
      const alerts = [];

      // Alert if delivery rate drops below 90%
      if (stats.total > 10 && parseFloat(stats.deliveryRate) < 90) {
        alerts.push({
          type: 'WARNING',
          message: `Delivery rate dropped to ${stats.deliveryRate}%`,
          severity: 'high'
        });
      }

      // Alert if failure count is high in last 24 hours
      const recentFailed = NotificationLogRepository.findFailed(db, 1);
      if (recentFailed.length > 20) {
        alerts.push({
          type: 'CRITICAL',
          message: `${recentFailed.length} notifications failed in last 24 hours`,
          severity: 'critical'
        });
      }

      return {
        hasAlerts: alerts.length > 0,
        alerts,
        checked_at: new Date().toISOString()
      };
    }
  };
}

export default createMonitoringService;
