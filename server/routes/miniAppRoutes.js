/**
 * Mini App API Routes
 * 
 * Endpoints for Zalo Mini App to interact with orders
 */

import express from 'express';
import { verifyZaloAuth, verifyOrderOwnership, rateLimit } from '../middleware/zaloAuth.js';
import { ZaloUserRepository, OrderRepository, OrderStatusHistoryRepository, NotificationLogRepository } from '../db/models.js';

export function createMiniAppRoutes(db, notificationService) {
  const router = express.Router();
  
  // Apply rate limiting to all routes
  router.use(rateLimit(100, 60000)); // 100 requests per minute
  
  /**
   * GET /api/miniapp/orders
   * Get list of orders for authenticated user
   */
  router.get('/orders', verifyZaloAuth, (req, res) => {
    try {
      const { zaloId } = req;
      
      // Get Zalo user to find phone number
      const zaloUser = ZaloUserRepository.findByZaloId(db, zaloId);
      
      if (!zaloUser || !zaloUser.phone) {
        return res.status(404).json({
          success: false,
          error: 'User not found or phone not linked'
        });
      }
      
      // Get orders by phone
      const orders = OrderRepository.findByPhone(db, zaloUser.phone);
      
      // Format response
      const orderList = orders.map(order => ({
        id: order.id,
        tracking_number: order.tracking_number,
        status: order.status,
        recipient_name: order.recipient_name,
        updated_at: order.updated_at,
        amount_due: order.amount_due
      }));
      
      res.json({
        success: true,
        data: orderList,
        count: orderList.length
      });
      
    } catch (error) {
      console.error('[MiniApp] Error fetching orders:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
  
  /**
   * GET /api/miniapp/orders/:orderId
   * Get order detail with full information
   */
  router.get('/orders/:orderId', verifyZaloAuth, verifyOrderOwnership(db), (req, res) => {
    try {
      const { order } = req;
      
      // Get status history
      const statusHistory = OrderStatusHistoryRepository.findByOrderId(db, order.id);
      
      // Format response
      const orderDetail = {
        id: order.id,
        tracking_number: order.tracking_number,
        status: order.status,
        customer: {
          name: order.customer_name,
          phone: order.customer_phone
        },
        recipient: {
          name: order.recipient_name,
          phone: order.recipient_phone,
          address: order.recipient_address
        },
        cargo: {
          info: order.cargo_info,
          weight: order.weight,
          volume: order.volume,
          declared_value: order.declared_value,
          insured_amount: order.insured_amount
        },
        financial: {
          amount_due: order.amount_due,
          transport_type: order.transport_type,
          branch: order.branch
        },
        timeline: statusHistory,
        order_date: order.order_date,
        updated_at: order.updated_at
      };
      
      res.json({
        success: true,
        data: orderDetail
      });
      
    } catch (error) {
      console.error('[MiniApp] Error fetching order detail:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
  
  /**
   * POST /api/miniapp/orders/:orderId/resend-notification
   * Resend notification for specific order
   */
  router.post('/orders/:orderId/resend-notification', verifyZaloAuth, verifyOrderOwnership(db), async (req, res) => {
    try {
      const { order } = req;
      
      if (!notificationService) {
        return res.status(503).json({
          success: false,
          error: 'Service Unavailable',
          message: 'Notification service not configured'
        });
      }
      
      // Send notification
      const result = await notificationService.sendZaloNotification(
        order.id,
        order.status,
        order
      );
      
      if (result.success) {
        res.json({
          success: true,
          message: 'Notification sent successfully',
          data: result
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Failed to send notification',
          reason: result.reason || result.error
        });
      }
      
    } catch (error) {
      console.error('[MiniApp] Error resending notification:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
  
  /**
   * GET /api/miniapp/orders/:orderId/history
   * Get order status change history
   */
  router.get('/orders/:orderId/history', verifyZaloAuth, verifyOrderOwnership(db), (req, res) => {
    try {
      const { order } = req;
      
      const history = OrderStatusHistoryRepository.findByOrderId(db, order.id);
      
      res.json({
        success: true,
        data: history
      });
      
    } catch (error) {
      console.error('[MiniApp] Error fetching history:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
  
  /**
   * GET /api/miniapp/orders/:orderId/notifications
   * Get notification history for order
   */
  router.get('/orders/:orderId/notifications', verifyZaloAuth, verifyOrderOwnership(db), (req, res) => {
    try {
      const { order } = req;
      
      const notifications = NotificationLogRepository.findByOrderId(db, order.id);
      
      res.json({
        success: true,
        data: notifications
      });
      
    } catch (error) {
      console.error('[MiniApp] Error fetching notifications:', error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  });
  
  return router;
}

export default createMiniAppRoutes;
