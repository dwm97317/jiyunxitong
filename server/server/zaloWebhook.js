/**
 * Zalo Webhook Handler
 * Handles webhook events from Zalo OA platform
 * 
 * Endpoints:
 * - GET /api/zalo/webhook - Verify webhook (Zalo calls this to verify ownership)
 * - POST /api/zalo/webhook - Receive webhook events (follow, unfollow, message)
 */

import crypto from 'crypto';
import { ZaloUserRepository, OrderRepository } from '../db/models.js';

/**
 * Webhook handler factory with database integration
 * @param {Object} config - Zalo configuration
 * @param {Object} db - Database instance
 * @returns {Object} Webhook handlers
 */
export function createZaloWebhookHandler(config, db = null) {
  const { secret_key, webhook_verify_token } = config;
  
  return {
    /**
     * GET /api/zalo/webhook - Verify webhook
     * Zalo calls this to verify that you own the webhook URL
     */
    verify: (req, res) => {
      const { verify_token } = req.query;
      
      console.log('[Zalo Webhook] Verify request received, token:', verify_token);
      
      if (verify_token === webhook_verify_token) {
        return res.json({ success: true });
      }
      
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid verify_token' 
      });
    },
    
    /**
     * POST /api/zalo/webhook - Handle webhook events
     */
    handleEvent: (req, res) => {
      const signature = req.headers['x-zalo-signature'];
      const rawBody = JSON.stringify(req.body);
      
      // Verify signature (skip in development if no secret key)
      if (secret_key && !verifySignature(signature, rawBody, secret_key)) {
        console.warn('[Zalo Webhook] Invalid signature');
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid signature' 
        });
      }
      
      const event = req.body;
      const eventType = event?.event_name || event?.event;
      
      console.log('[Zalo Webhook] Event received:', eventType);
      
      let result;
      try {
        switch (eventType) {
          case 'follow':
            result = handleFollowEvent(event, db);
            break;
          case 'unfollow':
            result = handleUnfollowEvent(event, db);
            break;
          case 'message':
            result = handleMessageEvent(event, db);
            break;
          default:
            console.log('[Zalo Webhook] Unknown event type:', eventType);
            result = { success: true, message: 'Event received' };
        }
      } catch (error) {
        console.error('[Zalo Webhook] Error processing event:', error);
        return res.status(500).json({ 
          success: false, 
          error: 'Internal server error' 
        });
      }
      
      return res.json(result);
    }
  };
}

/**
 * Verify webhook signature from Zalo
 * @param {string} signature - Signature from X-Zalo-Signature header
 * @param {string} body - Raw request body
 * @param {string} secretKey - Zalo secret key
 * @returns {boolean}
 */
function verifySignature(signature, body, secretKey) {
  if (!signature || !body || !secretKey) {
    return false;
  }
  
  const hmac = crypto.createHmac('sha256', secretKey);
  const digest = hmac.update(body).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

/**
 * Extract user info from follow event payload
 * @param {Object} payload - Event payload from Zalo
 * @returns {Object} User info
 */
function extractUserInfoFromFollow(payload) {
  return {
    zalo_id: payload?.user?.id || payload?.userId,
    phone: payload?.user?.phone || null,
    display_name: payload?.user?.displayName || payload?.user?.name || 'Unknown',
    is_followed: true,
    last_interaction: new Date().toISOString()
  };
}

/**
 * Handle follow event
 * @param {Object} payload - Event payload
 * @param {Object} db - Database instance
 * @returns {Object} Response
 */
function handleFollowEvent(payload, db) {
  const userInfo = extractUserInfoFromFollow(payload);
  console.log('[Zalo Webhook] New follower:', userInfo);
  
  // Save user to database
  if (db) {
    try {
      ZaloUserRepository.save(db, userInfo);
      console.log('[Zalo Webhook] User saved to database');
    } catch (error) {
      console.error('[Zalo Webhook] Failed to save user:', error);
    }
  }
  
  return {
    success: true,
    message: 'User followed',
    user: userInfo
  };
}

/**
 * Handle unfollow event
 * @param {Object} payload - Event payload
 * @param {Object} db - Database instance
 * @returns {Object} Response
 */
function handleUnfollowEvent(payload, db) {
  const zalo_id = payload?.user?.id || payload?.userId;
  console.log('[Zalo Webhook] User unfollowed:', zalo_id);
  
  // Update user in database
  if (db && zalo_id) {
    try {
      ZaloUserRepository.updateFollowStatus(db, zalo_id, false);
      console.log('[Zalo Webhook] User follow status updated');
    } catch (error) {
      console.error('[Zalo Webhook] Failed to update user:', error);
    }
  }
  
  return {
    success: true,
    message: 'User unfollowed',
    zalo_id
  };
}

/**
 * Handle message event
 * @param {Object} payload - Event payload
 * @param {Object} db - Database instance
 * @returns {Object} Response
 */
function handleMessageEvent(payload, db) {
  const message = payload?.message || {};
  const user_id = message?.sender?.id || payload?.userId;
  const content = message?.text || '';
  
  console.log('[Zalo Webhook] Message received from', user_id, ':', content);
  
  // Parse command from message
  const command = parseCommand(content);
  
  let response;
  switch (command.type) {
    case 'track':
      response = handleTrackCommand(command.trackingCode, db);
      break;
    case 'help':
      response = createHelpMessage();
      break;
    default:
      response = createDefaultResponse();
  }
  
  return {
    success: true,
    message: 'Message processed',
    response
  };
}

/**
 * Parse command from message content
 * @param {string} content - Message content
 * @returns {Object} Parsed command
 */
function parseCommand(content) {
  const trimmed = content?.trim().toLowerCase() || '';
  
  if (trimmed === 'help') {
    return { type: 'help' };
  }
  
  // Match "track <code>" or "tra cuu <code>" or "tim <code>"
  const trackMatch = content.match(/(?:track|tra\s*cuu|tim)\s+(\w+)/i);
  if (trackMatch) {
    return { type: 'track', trackingCode: trackMatch[1] };
  }
  
  return { type: 'unknown' };
}

/**
 * Handle track command - lookup order by tracking code
 * @param {string} trackingCode - Order tracking code
 * @param {Object} db - Database instance
 * @returns {Object} Order info response
 */
function handleTrackCommand(trackingCode, db) {
  // Query database for order
  if (db) {
    try {
      const order = OrderRepository.findByTrackingNumber(db, trackingCode);
      
      if (!order) {
        return {
          type: 'text',
          content: `❌ Không tìm thấy đơn hàng với mã: ${trackingCode}\n\nVui lòng kiểm tra lại mã hoặc truy cập Mini App.`
        };
      }
      
      return {
        type: 'text',
        content: `📦 Thông tin đơn hàng: ${trackingCode}\n\n` +
          `Trạng thái: ${order.status}\n` +
          `Người nhận: ${order.recipient_name || 'N/A'}\n` +
          `Cập nhật: ${new Date(order.updated_at).toLocaleString('vi-VN')}\n\n` +
          `Để xem chi tiết, vui lòng truy cập Mini App.`
      };
    } catch (error) {
      console.error('[Zalo Webhook] Error looking up order:', error);
    }
  }
  
  // Fallback demo response
  return {
    type: 'text',
    content: `📦 Thông tin đơn hàng: ${trackingCode}\n\nTìm thấy đơn hàng!\n\nĐể xem chi tiết, vui lòng truy cập Mini App.`
  };
}

/**
 * Create help message
 * @returns {Object} Help response
 */
function createHelpMessage() {
  return {
    type: 'text',
    content: `📖 Hướng dẫn sử dụng:\n\n` +
      `• "track <mã>" - Tra cứu đơn hàng\n` +
      `• "help" - Xem hướng dẫn này\n\n` +
      `Hoặc truy cập Mini App để xem danh sách đơn hàng của bạn.`
  };
}

/**
 * Create default response for unknown commands
 * @returns {Object} Default response
 */
function createDefaultResponse() {
  return {
    type: 'text',
    content: `Xin chào! 👋\n\n` +
      `Tôi có thể giúp bạn:\n` +
      `• "track <mã>" - Tra cứu đơn hàng\n` +
      `• "help" - Xem hướng dẫn\n\n` +
      `Hoặc truy cập Mini App để xem danh sách đơn hàng.`
  };
}

/**
 * Get Zalo webhook router
 * @param {Object} config - Zalo configuration
 * @param {Object} db - Database instance
 * @returns {Object} Express router
 */
export function getZaloWebhookRouter(config, db = null) {
  const handler = createZaloWebhookHandler(config, db);
  
  return {
    verify: handler.verify,
    handleEvent: handler.handleEvent
  };
}

export default { createZaloWebhookHandler, getZaloWebhookRouter };