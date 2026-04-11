/**
 * Zalo Configuration
 * 
 * Cấu hình cho Zalo Official Account integration
 * Lấy credentials từ: https://oa.zalo.me/
 * 
 * Hướng dẫn: xem docs/ZALO-OA-SETUP.md
 */

module.exports = {
  // Zalo OA Credentials - LẤY TỪ ZALO OA PORTAL
  oaId: process.env.ZALO_OA_ID || 'your_oa_id_here',
  accessToken: process.env.ZALO_ACCESS_TOKEN || 'your_access_token_here',
  secretKey: process.env.ZALO_SECRET_KEY || 'your_secret_key_here',
  webhookVerifyToken: process.env.ZALO_WEBHOOK_VERIFY_TOKEN || 'your_verify_token_here',
  
  // API Configuration
  api: {
    baseUrl: process.env.ZALO_API_BASE_URL || 'https://openapi.zalo.me',
    version: process.env.ZALO_API_VERSION || 'v2',
    // Endpoints
    sendMessage: '/v2.0/oa/message',
    getUserInfo: '/v2.0/oa/getprofile',
    getFollowers: '/v2.0/oa/getfollowers',
  },
  
  // Mini App Configuration
  miniApp: {
    appId: process.env.ZALO_MINI_APP_ID || 'your_mini_app_id_here',
    appSecret: process.env.ZALO_MINI_APP_SECRET || 'your_mini_app_secret_here',
  },
  
  // Message Templates - TẠO TRÊN ZALO OA PORTAL
  // Xem docs/ZALO-MESSAGE-TEMPLATES.md để biết chi tiết
  templates: {
    // Template IDs từ Zalo OA Portal - thay thế bằng ID thực tế
    orderReceivedTh: process.env.ZALO_TEMPLATE_RECEIVED_TH || 'TEMPLATE_ID_001',
    inTransitToVn: process.env.ZALO_TEMPLATE_IN_TRANSIT || 'TEMPLATE_ID_002',
    arrivedQuangTri: process.env.ZALO_TEMPLATE_ARRIVED_QT || 'TEMPLATE_ID_003',
    deliveredViettelPost: process.env.ZALO_TEMPLATE_DELIVERED || 'TEMPLATE_ID_004',
  },
  
  // Template parameter mappings
  templateParams: {
    orderReceivedTh: ['order_id', 'date', 'image_url'],
    inTransitToVn: ['order_id', 'date'],
    arrivedQuangTri: ['order_id', 'amount', 'date'],
    deliveredViettelPost: ['order_id', 'tracking_code', 'date'],
  },
  
  // Rate Limiting
  rateLimit: {
    maxMessagesPerMinute: 100,
    retryAttempts: 3,
    retryDelayMs: 60000, // 1 minute
  },
};