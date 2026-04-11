/**
 * Zalo Authentication Middleware
 * 
 * Verifies Zalo session tokens and validates user authorization
 */

import { ZaloUserRepository } from '../db/models.js';

/**
 * Middleware to verify Zalo user authentication
 * Checks if zalo_id is provided and valid
 */
export function verifyZaloAuth(req, res, next) {
  const zaloId = req.query.zalo_id || req.body.zalo_id || req.headers['x-zalo-user-id'];
  
  if (!zaloId) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Zalo ID is required'
    });
  }
  
  // Attach zalo_id to request for downstream use
  req.zaloId = zaloId;
  next();
}

/**
 * Middleware to verify user owns the order
 * Ensures user can only access their own orders
 */
export function verifyOrderOwnership(db) {
  return async (req, res, next) => {
    const { zaloId } = req;
    const orderId = req.params.orderId;
    
    try {
      // Get Zalo user
      const zaloUser = ZaloUserRepository.findByZaloId(db, zaloId);
      if (!zaloUser || !zaloUser.phone) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
          message: 'User phone number not linked'
        });
      }
      
      // Get order
      const { OrderRepository } = await import('../db/models.js');
      const order = OrderRepository.findById(db, orderId);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Not Found',
          message: 'Order not found'
        });
      }
      
      // Verify ownership (customer or recipient phone must match)
      if (order.customer_phone !== zaloUser.phone && order.recipient_phone !== zaloUser.phone) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
          message: 'You do not have permission to access this order'
        });
      }
      
      // Attach user and order to request
      req.zaloUser = zaloUser;
      req.order = order;
      next();
      
    } catch (error) {
      console.error('[ZaloAuth] Error verifying ownership:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  };
}

/**
 * Rate limiting middleware (simple in-memory implementation)
 * For production, use Redis-based rate limiter
 */
export function rateLimit(maxRequests = 100, windowMs = 60000) {
  const requests = new Map();
  
  return (req, res, next) => {
    const clientId = req.zaloId || req.ip;
    const now = Date.now();
    
    if (!requests.has(clientId)) {
      requests.set(clientId, []);
    }
    
    const userRequests = requests.get(clientId);
    
    // Remove old requests outside window
    const recentRequests = userRequests.filter(time => now - time < windowMs);
    
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.'
      });
    }
    
    recentRequests.push(now);
    requests.set(clientId, recentRequests);
    
    next();
  };
}

export default { verifyZaloAuth, verifyOrderOwnership, rateLimit };
