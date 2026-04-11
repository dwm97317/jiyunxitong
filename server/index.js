/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createZaloWebhookHandler } from './zaloWebhook.js';
import dotenv from 'dotenv';
import { initializeDatabase, NotificationLogRepository, OrderRepository, OrderStatusHistoryRepository } from './db/models.js';
import { createMiniAppRoutes } from './routes/miniAppRoutes.js';
import { createNotificationService } from './services/zaloNotificationService.js';
import { createOrderStatusService } from './services/orderStatusService.js';
import { createMonitoringService } from './services/monitoring.js';
import { createTicketService } from './services/ticketService.js';
import { createTrackingService } from './services/trackingService.js';
import { createAnalyticsService } from './services/analyticsService.js';
import { upload, validateVideoUpload } from './middleware/upload.js';
import zaloConfig from './config/zalo.js';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const envPath = join(__dirname, '..', '.env.local');
dotenv.config({ path: envPath });

const app = express();
const port = process.env.PORT || 3001;

// Validate required environment variables
const requiredEnvVars = [
  'ZALO_OA_ID',
  'ZALO_ACCESS_TOKEN', 
  'ZALO_SECRET_KEY',
  'ZALO_WEBHOOK_VERIFY_TOKEN'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.warn('⚠️  Warning: Missing environment variables:', missingEnvVars.join(', '));
  console.warn('⚠️  Some features may not work correctly. Please update .env.local file.');
} else {
  console.log('✅ Zalo credentials loaded successfully');
}

// Initialize database (use file-based for persistence in production)
const dbPath = process.env.NODE_ENV === 'production' 
  ? join(__dirname, '..', 'data', 'app.db')
  : ':memory:';
const db = new Database(dbPath);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database with Mock Data
initializeDatabase(db);

// Create existing tables (backward compatibility)
db.exec(`
  CREATE TABLE IF NOT EXISTS plaza_items (
    id TEXT PRIMARY KEY,
    orderNo TEXT,
    date TEXT,
    name TEXT,
    type TEXT,
    location TEXT,
    zip TEXT,
    weight TEXT,
    total TEXT,
    transport TEXT,
    avatar TEXT,
    logo TEXT,
    isOfficial INTEGER
  );

  CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    trackingNo TEXT,
    intlNo TEXT,
    cargoInfo TEXT,
    status TEXT,
    itemInfo TEXT,
    insurance TEXT,
    time TEXT,
    type TEXT
  );
`);

// Seed data
const insertPlaza = db.prepare('INSERT INTO plaza_items (id, orderNo, date, name, type, location, zip, weight, total, transport, avatar, isOfficial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
insertPlaza.run('1', '1234567890', '05/29', '团长昵称', '普货', 'West Covina,California US', '91790', '25kg', '120kg', 'air', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', 0);
insertPlaza.run('2', '1234567891', '05/30', '新泽西网点', '普货', 'New Jersey, US', '07001', '50kg', '200kg', 'sea', 'https://api.dicebear.com/7.x/initials/svg?seed=NJ', 1);

// Routes
app.get('/api/plaza', (req, res) => {
    const items = db.prepare('SELECT * FROM plaza_items').all();
    res.json(items.map(item => ({ ...item, isOfficial: !!item.isOfficial })));
});

app.get('/api/claims', (req, res) => {
    const items = db.prepare('SELECT * FROM claims').all();
    res.json(items);
});

app.post('/api/predeclare', (req, res) => {
    console.log('Predeclare received:', req.body);
    res.status(201).json({ success: true, id: Math.random().toString(36).substr(2, 9) });
});

// Zalo Webhook Configuration
const zaloConfig = {
    oa_id: process.env.ZALO_OA_ID || 'demo_oa_id',
    access_token: process.env.ZALO_ACCESS_TOKEN || 'demo_access_token',
    secret_key: process.env.ZALO_SECRET_KEY || 'demo_secret_key',
    webhook_verify_token: process.env.ZALO_WEBHOOK_VERIFY_TOKEN || 'demo_verify_token'
};

const zaloWebhook = createZaloWebhookHandler(zaloConfig, db);

// Zalo Webhook Routes
// GET /api/zalo/webhook - Verify webhook (Zalo calls this to verify ownership)
// POST /api/zalo/webhook - Receive webhook events (follow, unfollow, message)
app.get('/api/zalo/webhook', zaloWebhook.verify);
app.post('/api/zalo/webhook', zaloWebhook.handleEvent);

// Health check endpoint for Zalo webhook
app.get('/api/zalo/status', (req, res) => {
    res.json({ 
        status: 'ok', 
        webhookConfigured: !!zaloConfig.webhook_verify_token,
        supportedEvents: ['follow', 'unfollow', 'message']
    });
});

// Monitoring endpoint
app.get('/api/admin/notification-stats', (req, res) => {
    const stats = monitoringService.getNotificationStats();
    res.json(stats);
});

// Additional monitoring endpoints
app.get('/api/admin/failed-notifications', (req, res) => {
    const { days = 7 } = req.query;
    const failed = monitoringService.getFailedNotifications(parseInt(days));
    res.json({ success: true, data: failed });
});

app.get('/api/admin/analytics', (req, res) => {
    const { days = 30 } = req.query;
    const analytics = monitoringService.getAnalytics({ days: parseInt(days) });
    res.json({ success: true, data: analytics });
});

app.get('/api/admin/alerts', (req, res) => {
    const alerts = monitoringService.checkAlerts();
    res.json(alerts);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Zalo webhook: http://localhost:${port}/api/zalo/webhook`);
    console.log(`Mini App API: http://localhost:${port}/api/miniapp`);
});

// Initialize services
const notificationService = createNotificationService(db, zaloConfig);
const orderStatusService = createOrderStatusService(db, notificationService);
const monitoringService = createMonitoringService(db);
const ticketService = createTicketService(db);
const trackingService = createTrackingService(db);
const analyticsService = createAnalyticsService(db);

// Create uploads directory
const uploadsDir = join(__dirname, 'uploads', 'tickets');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Mount Mini App routes
const miniAppRouter = createMiniAppRoutes(db, notificationService);
app.use('/api/miniapp', miniAppRouter);

console.log('✅ Mini App routes mounted');
console.log('✅ Notification service initialized');
console.log('✅ Order status service initialized');
console.log('✅ Monitoring service initialized');
console.log('✅ Ticket service initialized');
console.log('✅ Tracking service initialized');
console.log('✅ Analytics service initialized');

// ============================================
// Test Endpoints (Development Only)
// ============================================

/**
 * POST /api/test/trigger-notification
 * Test endpoint to manually trigger a notification
 */
app.post('/api/test/trigger-notification', async (req, res) => {
  const { orderId, status } = req.body;
  
  if (!orderId || !status) {
    return res.status(400).json({
      success: false,
      error: 'orderId and status are required'
    });
  }
  
  try {
    const result = await notificationService.sendZaloNotification(orderId, status);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/test/update-status
 * Test endpoint to update order status and trigger notification
 */
app.post('/api/test/update-status', async (req, res) => {
  const { orderId, newStatus, notes } = req.body;
  
  if (!orderId || !newStatus) {
    return res.status(400).json({
      success: false,
      error: 'orderId and newStatus are required'
    });
  }
  
  try {
    const result = await orderStatusService.updateOrderStatus(orderId, newStatus, { notes });
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/test/create-order
 * Test endpoint to create a sample order
 */
app.post('/api/test/create-order', (req, res) => {
  const orderData = req.body;
  
  if (!orderData.id || !orderData.tracking_number) {
    return res.status(400).json({
      success: false,
      error: 'id and tracking_number are required'
    });
  }
  
  try {
    OrderRepository.save(db, orderData);
    res.json({ success: true, message: 'Order created' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// Customer Service & Ticketing API
// ============================================

/**
 * POST /api/tickets
 * Create a new customer service ticket
 */
app.post('/api/tickets', (req, res) => {
  const { order_id, user_id, ticket_type, subject, description, priority } = req.body;
  
  if (!order_id || !user_id || !ticket_type || !subject || !description) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: order_id, user_id, ticket_type, subject, description'
    });
  }
  
  try {
    const result = ticketService.createTicket({
      order_id,
      user_id,
      ticket_type,
      subject,
      description,
      priority
    });
    res.json(result);
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/tickets
 * Get all tickets for a user
 */
app.get('/api/tickets', (req, res) => {
  const { user_id, status } = req.query;
  
  if (!user_id) {
    return res.status(400).json({
      success: false,
      error: 'user_id is required'
    });
  }
  
  try {
    const tickets = ticketService.getUserTickets(user_id, { status });
    res.json({ success: true, data: tickets });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/tickets/:id
 * Get ticket details by ID
 */
app.get('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  
  try {
    const ticket = ticketService.getTicket(id);
    res.json({ success: true, data: ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/tickets/:id/status
 * Update ticket status (admin only)
 */
app.put('/api/tickets/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, resolution } = req.body;
  
  if (!status) {
    return res.status(400).json({
      success: false,
      error: 'status is required'
    });
  }
  
  try {
    const result = ticketService.updateTicketStatus(id, status, resolution);
    res.json(result);
  } catch (error) {
    console.error('Update ticket status error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/tickets/:id/attachments
 * Upload video or image evidence to ticket
 */
app.post('/api/tickets/:id/attachments', upload.single('file'), (req, res) => {
  const { id } = req.params;
  
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded'
    });
  }
  
  try {
    const fileUrl = `/uploads/tickets/${req.file.filename}`;
    
    const result = ticketService.addAttachment(id, {
      file_name: req.file.originalname,
      file_type: req.file.mimetype,
      file_size: req.file.size,
      file_path: req.file.path,
      file_url: fileUrl,
      description: req.body.description
    });
    
    res.json(result);
  } catch (error) {
    console.error('Upload attachment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/orders/:orderId/unboxing-video
 * Upload unboxing video for delivered order (6-hour validation)
 */
app.post('/api/orders/:orderId/unboxing-video', upload.single('file'), (req, res) => {
  const { orderId } = req.params;
  
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No video file uploaded'
    });
  }
  
  try {
    // Validate 6-hour window
    const order = OrderRepository.findById(db, orderId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }
    
    if (order.status !== 'DELIVERED_VIETTELPOST') {
      return res.status(400).json({
        success: false,
        error: 'Chỉ có thể upload video khui hàng sau khi đơn hàng đã được giao'
      });
    }
    
    const deliveredAt = new Date(order.updated_at);
    const now = new Date();
    const hoursDiff = (now - deliveredAt) / (1000 * 60 * 60);
    
    if (hoursDiff > 6) {
      return res.status(400).json({
        success: false,
        error: 'Đã quá 6 giờ kể từ khi nhận hàng'
      });
    }
    
    // Create ticket with video
    const fileUrl = `/uploads/tickets/${req.file.filename}`;
    
    const ticketResult = ticketService.createTicket({
      order_id: orderId,
      user_id: order.customer_phone,
      ticket_type: 'damage',
      subject: `Video khui hàng - Đơn ${order.tracking_number}`,
      description: 'Video khui hàng được upload tự động',
      priority: 'medium'
    });
    
    // Add attachment
    ticketService.addAttachment(ticketResult.data.id, {
      file_name: req.file.originalname,
      file_type: req.file.mimetype,
      file_size: req.file.size,
      file_path: req.file.path,
      file_url: fileUrl,
      description: 'Video khui hàng'
    });
    
    res.json({
      success: true,
      message: 'Video đã được upload thành công',
      ticket_id: ticketResult.data.id,
      video_url: fileUrl
    });
    
  } catch (error) {
    console.error('Upload unboxing video error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// Package Tracking API
// ============================================

/**
 * GET /api/tracking/:orderId
 * Get real-time package location
 */
app.get('/api/tracking/:orderId', (req, res) => {
  const { orderId } = req.params;
  
  try {
    let tracking = trackingService.getTracking(orderId);
    
    if (!tracking) {
      // Initialize tracking if not exists
      tracking = trackingService.initializeTracking(orderId);
    }
    
    const eta = trackingService.getETA(orderId);
    
    res.json({
      success: true,
      data: {
        ...tracking,
        eta
      }
    });
  } catch (error) {
    console.error('Get tracking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/tracking/:orderId
 * Update package location (admin only)
 */
app.put('/api/tracking/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { current_status, current_location, latitude, longitude } = req.body;
  
  if (!current_status || !current_location) {
    return res.status(400).json({
      success: false,
      error: 'current_status and current_location are required'
    });
  }
  
  try {
    // Auto-calculate next checkpoint
    const nextCheckpoint = trackingService.getNextCheckpoint(current_status);
    
    const result = trackingService.updateLocation(orderId, {
      current_status,
      current_location,
      latitude: latitude || nextCheckpoint.latitude,
      longitude: longitude || nextCheckpoint.longitude,
      last_checkpoint: current_location,
      next_checkpoint: nextCheckpoint.name,
      distance_remaining_km: Math.max(0, nextCheckpoint.distance_from_start_km)
    });
    
    res.json({
      success: true,
      message: 'Location updated successfully',
      data: result
    });
  } catch (error) {
    console.error('Update tracking error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/tracking/:orderId/history
 * Get tracking history
 */
app.get('/api/tracking/:orderId/history', (req, res) => {
  const { orderId } = req.params;
  
  try {
    const history = trackingService.getTrackingHistory(orderId);
    res.json({ success: true, data: history });
  } catch (error) {
    console.error('Get tracking history error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============================================
// Customer Analytics Dashboard API
// ============================================

/**
 * GET /api/analytics/dashboard
 * Get complete dashboard data for customer
 */
app.get('/api/analytics/dashboard', (req, res) => {
  const { user_id, months = 12 } = req.query;
  
  if (!user_id) {
    return res.status(400).json({
      success: false,
      error: 'user_id is required'
    });
  }
  
  try {
    const dashboard = analyticsService.getDashboardData(user_id, { months: parseInt(months) });
    res.json({ success: true, data: dashboard });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/analytics/spending
 * Get spending chart data
 */
app.get('/api/analytics/spending', (req, res) => {
  const { user_id, months = 12 } = req.query;
  
  if (!user_id) {
    return res.status(400).json({
      success: false,
      error: 'user_id is required'
    });
  }
  
  try {
    const data = analyticsService.getSpendingData(user_id, parseInt(months));
    res.json({ success: true, data });
  } catch (error) {
    console.error('Get spending data error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/analytics/orders
 * Get order statistics
 */
app.get('/api/analytics/orders', (req, res) => {
  const { user_id, months = 12 } = req.query;
  
  if (!user_id) {
    return res.status(400).json({
      success: false,
      error: 'user_id is required'
    });
  }
  
  try {
    const data = analyticsService.getOrderStats(user_id, parseInt(months));
    res.json({ success: true, data });
  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/analytics/performance
 * Get delivery performance metrics
 */
app.get('/api/analytics/performance', (req, res) => {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({
      success: false,
      error: 'user_id is required'
    });
  }
  
  try {
    const data = analyticsService.getPerformanceMetrics(user_id);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Get performance error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));
