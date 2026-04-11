/**
 * Zalo Message Templates Configuration
 * 
 * This file contains template configurations for 4 order statuses.
 * Template IDs will be assigned by Zalo OA portal after creation.
 * 
 * IMPORTANT: After creating templates on Zalo OA portal, update the template_id fields below.
 */

const ZALO_TEMPLATES = {
  /**
   * Template 1: order_received_th
   * Trigger: When order is received at Thailand warehouse
   * Includes: order_id, date, image_url
   */
  order_received_th: {
    template_id: 'YOUR_TEMPLATE_ID_HERE', // TODO: Update after creating on Zalo OA portal
    name: 'order_received_th',
    description: 'Đơn hàng nhận tại Thái Lan',
    language: 'vi',
    params: [
      { name: 'order_id', type: 'text', label: 'Mã đơn hàng' },
      { name: 'date', type: 'text', label: 'Ngày' },
      { name: 'image_url', type: 'text', label: 'Link ảnh' }
    ],
    template_content: `🛍️ Đơn hàng #{order_id} đã nhận tại Thái Lan

📅 Ngày: {date}
📦 Trạng thái: Đã nhận hàng

Xem ảnh: {image_url}`
  },

  /**
   * Template 2: in_transit_to_vn
   * Trigger: When order is in transit to Vietnam
   * Includes: order_id, date
   */
  in_transit_to_vn: {
    template_id: 'YOUR_TEMPLATE_ID_HERE', // TODO: Update after creating on Zalo OA portal
    name: 'in_transit_to_vn',
    description: 'Đang vận chuyển về Việt Nam',
    language: 'vi',
    params: [
      { name: 'order_id', type: 'text', label: 'Mã đơn hàng' },
      { name: 'date', type: 'text', label: 'Ngày' }
    ],
    template_content: `🚚 Đơn hàng #{order_id} đang trên đường về Việt Nam

📅 Ngày: {date}
📦 Trạng thái: Đang vận chuyển

Cảm ơn bạn đã tin tưởng chúng tôi!`
  },

  /**
   * Template 3: arrived_quang_tri
   * Trigger: When order arrives at Quang Tri warehouse
   * Includes: order_id, amount, date
   */
  arrived_quang_tri: {
    template_id: 'YOUR_TEMPLATE_ID_HERE', // TODO: Update after creating on Zalo OA portal
    name: 'arrived_quang_tri',
    description: 'Về đến kho Quảng Trị',
    language: 'vi',
    params: [
      { name: 'order_id', type: 'text', label: 'Mã đơn hàng' },
      { name: 'amount', type: 'text', label: 'Số tiền' },
      { name: 'date', type: 'text', label: 'Ngày' }
    ],
    template_content: `🏠 Đơn hàng #{order_id} đã về đến kho Quảng Trị

💰 Số tiền cần thanh toán: {amount} VND
📅 Ngày: {date}

Vui lòng thanh toán để tiếp tục giao hàng.`
  },

  /**
   * Template 4: delivered_viettelpost
   * Trigger: When order is delivered to ViettelPost/VNPost
   * Includes: order_id, tracking_code, date
   */
  delivered_viettelpost: {
    template_id: 'YOUR_TEMPLATE_ID_HERE', // TODO: Update after creating on Zalo OA portal
    name: 'delivered_viettelpost',
    description: 'Đã bàn giao ViettelPost/VNPost',
    language: 'vi',
    params: [
      { name: 'order_id', type: 'text', label: 'Mã đơn hàng' },
      { name: 'tracking_code', type: 'text', label: 'Mã Tracking' },
      { name: 'date', type: 'text', label: 'Ngày' }
    ],
    template_content: `✅ Đơn hàng #{order_id} đã bàn giao cho ViettelPost/VNPost

📦 Mã Tracking: {tracking_code}
📅 Ngày: {date}

Theo dõi đơn hàng: [Link]`
  }
};

/**
 * Get template by order status
 * @param {string} status - Order status (RECEIVED_TH, IN_TRANSIT_TO_VN, ARRIVED_QT, DELIVERED_VIETTELPOST)
 * @returns {object} Template configuration
 */
function getTemplateByStatus(status) {
  const statusToTemplate = {
    'RECEIVED_TH': 'order_received_th',
    'IN_TRANSIT_TO_VN': 'in_transit_to_vn',
    'ARRIVED_QT': 'arrived_quang_tri',
    'DELIVERED_VIETTELPOST': 'delivered_viettelpost'
  };

  const templateName = statusToTemplate[status];
  if (!templateName) {
    throw new Error(`Unknown status: ${status}`);
  }

  return ZALO_TEMPLATES[templateName];
}

/**
 * Build message parameters for template
 * @param {string} status - Order status
 * @param {object} orderData - Order data (order_id, date, image_url, amount_due, tracking_code)
 * @returns {object} Parameters for Zalo API
 */
function buildTemplateParams(status, orderData) {
  const template = getTemplateByStatus(status);
  
  const params = {};
  
  switch (status) {
    case 'RECEIVED_TH':
      params.order_id = orderData.order_id || '';
      params.date = orderData.date || new Date().toLocaleDateString('vi-VN');
      params.image_url = orderData.image_url || '';
      break;
      
    case 'IN_TRANSIT_TO_VN':
      params.order_id = orderData.order_id || '';
      params.date = orderData.date || new Date().toLocaleDateString('vi-VN');
      break;
      
    case 'ARRIVED_QT':
      params.order_id = orderData.order_id || '';
      params.amount = orderData.amount_due ? orderData.amount_due.toLocaleString('vi-VN') : '0';
      params.date = orderData.date || new Date().toLocaleDateString('vi-VN');
      break;
      
    case 'DELIVERED_VIETTELPOST':
      params.order_id = orderData.order_id || '';
      params.tracking_code = orderData.tracking_code || '';
      params.date = orderData.date || new Date().toLocaleDateString('vi-VN');
      break;
  }
  
  return {
    template_id: template.template_id,
    template_data: params
  };
}

module.exports = {
  ZALO_TEMPLATES,
  getTemplateByStatus,
  buildTemplateParams
};