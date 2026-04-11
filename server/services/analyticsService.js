/**
 * Customer Analytics Service
 * 
 * Provides dashboard statistics and chart data for customers
 */

import { OrderRepository } from '../db/models.js';

/**
 * Create analytics service
 * @param {Object} db - Database instance
 * @returns {Object} Analytics service methods
 */
export function createAnalyticsService(db) {
  return {
    /**
     * Get complete dashboard data for user
     * @param {string} userId
     * @param {Object} options
     * @returns {Object} Dashboard data
     */
    getDashboardData(userId, options = {}) {
      try {
        const { months = 12 } = options;

        return {
          summary: this.getSummary(userId),
          spending: this.getSpendingData(userId, months),
          orders: this.getOrderStats(userId, months),
          performance: this.getPerformanceMetrics(userId),
          recent_activity: this.getRecentActivity(userId)
        };

      } catch (error) {
        console.error('Failed to get dashboard data:', error);
        throw error;
      }
    },

    /**
     * Get user summary statistics
     * @param {string} userId
     * @returns {Object} Summary data
     */
    getSummary(userId) {
      try {
        // Total orders
        const orderStmt = db.prepare('SELECT COUNT(*) as count FROM orders WHERE customer_phone = ?');
        const totalOrders = orderStmt.get(userId)?.count || 0;

        // Total spent
        const spentStmt = db.prepare(`
          SELECT COALESCE(SUM(total_amount), 0) as total 
          FROM invoices 
          WHERE user_id = ?
        `);
        const totalSpent = spentStmt.get(userId)?.total || 0;

        // Average weight
        const weightStmt = db.prepare(`
          SELECT AVG(CAST(REPLACE(weight, 'kg', '') AS REAL)) as avg_weight 
          FROM orders 
          WHERE customer_phone = ? AND weight IS NOT NULL
        `);
        const avgWeight = weightStmt.get(userId)?.avg_weight || 0;

        // Active tickets
        const ticketStmt = db.prepare(`
          SELECT COUNT(*) as count FROM tickets 
          WHERE user_id = ? AND status IN ('open', 'in_progress')
        `);
        const activeTickets = ticketStmt.get(userId)?.count || 0;

        // Wallet balance
        const walletStmt = db.prepare('SELECT balance FROM wallets WHERE user_id = ?');
        const walletBalance = walletStmt.get(userId)?.balance || 0;

        return {
          total_orders: totalOrders,
          total_spent: totalSpent,
          avg_weight_kg: parseFloat(avgWeight.toFixed(2)),
          active_tickets: activeTickets,
          wallet_balance: walletBalance
        };

      } catch (error) {
        console.error('Failed to get summary:', error);
        return {
          total_orders: 0,
          total_spent: 0,
          avg_weight_kg: 0,
          active_tickets: 0,
          wallet_balance: 0
        };
      }
    },

    /**
     * Get spending data for chart
     * @param {string} userId
     * @param {number} months - Number of months to retrieve
     * @returns {Object} Chart data
     */
    getSpendingData(userId, months = 12) {
      try {
        const stmt = db.prepare(`
          SELECT 
            strftime('%Y-%m', invoice_date) as month,
            SUM(total_amount) as amount,
            COUNT(*) as order_count
          FROM invoices
          WHERE user_id = ?
          AND invoice_date >= date('now', '-' || ? || ' months')
          GROUP BY strftime('%Y-%m', invoice_date)
          ORDER BY month ASC
        `);

        const data = stmt.all(userId, months);

        // Format for chart
        const labels = data.map(d => d.month);
        const amounts = data.map(d => d.amount);
        const counts = data.map(d => d.order_count);

        return {
          labels,
          datasets: [
            {
              label: 'Chi phí (VND)',
              data: amounts,
              borderColor: '#3B5998',
              backgroundColor: 'rgba(59, 89, 152, 0.1)',
              tension: 0.4
            },
            {
              label: 'Số đơn hàng',
              data: counts,
              borderColor: '#52c41a',
              backgroundColor: 'rgba(82, 196, 26, 0.1)',
              tension: 0.4,
              yAxisID: 'y1'
            }
          ]
        };

      } catch (error) {
        console.error('Failed to get spending data:', error);
        return { labels: [], datasets: [] };
      }
    },

    /**
     * Get order statistics
     * @param {string} userId
     * @param {number} months
     * @returns {Object} Order statistics
     */
    getOrderStats(userId, months = 12) {
      try {
        // Orders by status
        const statusStmt = db.prepare(`
          SELECT status, COUNT(*) as count
          FROM orders
          WHERE customer_phone = ?
          AND created_at >= date('now', '-' || ? || ' months')
          GROUP BY status
        `);
        const byStatus = statusStmt.all(userId, months);

        // Orders by month
        const monthStmt = db.prepare(`
          SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as count
          FROM orders
          WHERE customer_phone = ?
          AND created_at >= date('now', '-' || ? || ' months')
          GROUP BY month
          ORDER BY month ASC
        `);
        const byMonth = monthStmt.all(userId, months);

        // Total weight by month
        const weightStmt = db.prepare(`
          SELECT 
            strftime('%Y-%m', created_at) as month,
            SUM(CAST(REPLACE(weight, 'kg', '') AS REAL)) as total_weight
          FROM orders
          WHERE customer_phone = ?
          AND weight IS NOT NULL
          AND created_at >= date('now', '-' || ? || ' months')
          GROUP BY month
          ORDER BY month ASC
        `);
        const weightByMonth = weightStmt.all(userId, months);

        return {
          by_status: byStatus,
          by_month: byMonth,
          weight_by_month: weightByMonth
        };

      } catch (error) {
        console.error('Failed to get order stats:', error);
        return {
          by_status: [],
          by_month: [],
          weight_by_month: []
        };
      }
    },

    /**
     * Get delivery performance metrics
     * @param {string} userId
     * @returns {Object} Performance metrics
     */
    getPerformanceMetrics(userId) {
      try {
        const totalOrdersStmt = db.prepare(`
          SELECT COUNT(*) as count FROM orders WHERE customer_phone = ?
        `);
        const totalOrders = totalOrdersStmt.get(userId)?.count || 0;

        if (totalOrders === 0) {
          return {
            damage_rate: 0,
            loss_rate: 0,
            on_time_rate: 0,
            total_orders: 0
          };
        }

        // Damage/loss from tickets
        const damageStmt = db.prepare(`
          SELECT COUNT(*) as count FROM tickets 
          WHERE user_id = ? AND ticket_type IN ('damage', 'loss')
        `);
        const damageCount = damageStmt.get(userId)?.count || 0;

        // Calculate rates
        const damageRate = ((damageCount / totalOrders) * 100).toFixed(2);
        const lossRate = 0; // Would need more detailed tracking

        // On-time delivery rate (estimate based on status)
        const onTimeStmt = db.prepare(`
          SELECT COUNT(*) as count FROM orders 
          WHERE customer_phone = ? AND status IN ('DELIVERED_VIETTELPOST')
        `);
        const deliveredCount = onTimeStmt.get(userId)?.count || 0;
        const onTimeRate = ((deliveredCount / totalOrders) * 100).toFixed(2);

        return {
          total_orders: totalOrders,
          damage_rate: parseFloat(damageRate),
          loss_rate: parseFloat(lossRate),
          on_time_rate: parseFloat(onTimeRate)
        };

      } catch (error) {
        console.error('Failed to get performance metrics:', error);
        return {
          damage_rate: 0,
          loss_rate: 0,
          on_time_rate: 0,
          total_orders: 0
        };
      }
    },

    /**
     * Get recent activity
     * @param {string} userId
     * @returns {Array} Recent activities
     */
    getRecentActivity(userId) {
      try {
        const activities = [];

        // Recent orders
        const ordersStmt = db.prepare(`
          SELECT id, tracking_number, status, created_at 
          FROM orders 
          WHERE customer_phone = ? 
          ORDER BY created_at DESC 
          LIMIT 5
        `);
        const recentOrders = ordersStmt.all(userId);
        
        recentOrders.forEach(order => {
          activities.push({
            type: 'order',
            action: `Đơn hàng ${order.tracking_number}`,
            status: order.status,
            timestamp: order.created_at
          });
        });

        // Recent tickets
        const ticketsStmt = db.prepare(`
          SELECT ticket_number, status, created_at 
          FROM tickets 
          WHERE user_id = ? 
          ORDER BY created_at DESC 
          LIMIT 3
        `);
        const recentTickets = ticketsStmt.all(userId);
        
        recentTickets.forEach(ticket => {
          activities.push({
            type: 'ticket',
            action: `Khiếu nại ${ticket.ticket_number}`,
            status: ticket.status,
            timestamp: ticket.created_at
          });
        });

        // Sort by timestamp
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return activities.slice(0, 10);

      } catch (error) {
        console.error('Failed to get recent activity:', error);
        return [];
      }
    }
  };
}

export default createAnalyticsService;
