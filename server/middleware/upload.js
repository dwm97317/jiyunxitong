/**
 * Upload Middleware for Video and File Attachments
 * 
 * Handles file uploads for ticket attachments (unboxing videos, images, etc.)
 */

import multer from 'multer';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if not exists
const uploadsDir = join(__dirname, '..', '..', 'uploads', 'tickets');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory:', uploadsDir);
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-random-originalname
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = file.originalname.split('.').pop();
    const uniqueName = `${timestamp}-${random}.${ext}`;
    cb(null, uniqueName);
  }
});

// File filter - only allow videos and images
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Chỉ cho phép upload video (MP4, MOV, AVI, WebM) và hình ảnh (JPEG, PNG, GIF, WebP)'), false);
  }
};

// Create multer instance
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
    files: 5 // Max 5 files per request
  }
});

/**
 * Middleware to validate video upload within 6 hours of delivery
 */
export function validateVideoUpload(db) {
  return (req, res, next) => {
    const { orderId } = req.params;
    
    try {
      // Get order from database
      const { OrderRepository } = require('../db/models.js');
      const order = OrderRepository.findById(db, orderId);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Order not found'
        });
      }

      // Check if order is delivered
      if (order.status !== 'DELIVERED_VIETTELPOST') {
        return res.status(400).json({
          success: false,
          error: 'Chỉ có thể upload video khui hàng sau khi đơn hàng đã được giao'
        });
      }

      // Check if within 6 hours of delivery
      const deliveredAt = new Date(order.updated_at);
      const now = new Date();
      const hoursDiff = (now - deliveredAt) / (1000 * 60 * 60);

      if (hoursDiff > 6) {
        return res.status(400).json({
          success: false,
          error: `Đã quá 6 giờ kể từ khi nhận hàng. Vui lòng liên hệ hỗ trợ.`
        });
      }

      // Validation passed
      next();

    } catch (error) {
      console.error('Video upload validation error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  };
}

export default upload;
