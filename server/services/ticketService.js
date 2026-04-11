/**
 * Ticket Service
 * 
 * Handles customer service tickets, complaints, and video evidence uploads
 */

import { OrderRepository } from '../db/models.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Create ticket service
 * @param {Object} db - Database instance
 * @returns {Object} Ticket service methods
 */
export function createTicketService(db) {
  return {
    /**
     * Generate unique ticket number
     * @returns {string}
     */
    generateTicketNumber() {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `TKT-${timestamp}-${random}`;
    },

    /**
     * Create a new ticket
     * @param {Object} ticketData
     * @returns {Object} Created ticket
     */
    createTicket(ticketData) {
      try {
        const { order_id, user_id, ticket_type, subject, description, priority = 'medium' } = ticketData;

        // Verify order exists
        const order = OrderRepository.findById(db, order_id);
        if (!order) {
          throw new Error('Order not found');
        }

        const ticketNumber = this.generateTicketNumber();
        const ticketId = `ticket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const stmt = db.prepare(`
          INSERT INTO tickets (id, ticket_number, order_id, user_id, ticket_type, subject, description, priority, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'open')
        `);

        stmt.run(ticketId, ticketNumber, order_id, user_id, ticket_type, subject, description, priority);

        console.log(`🎫 Ticket created: ${ticketNumber} for order ${order_id}`);

        return {
          success: true,
          data: {
            id: ticketId,
            ticket_number: ticketNumber,
            order_id,
            user_id,
            ticket_type,
            subject,
            description,
            priority,
            status: 'open',
            created_at: new Date().toISOString()
          },
          message: 'Khiếu nại đã được tạo thành công. Chúng tôi sẽ xử lý trong 24 giờ.'
        };

      } catch (error) {
        console.error('Failed to create ticket:', error);
        throw error;
      }
    },

    /**
     * Get ticket by ID
     * @param {string} ticketId
     * @returns {Object} Ticket data with attachments
     */
    getTicket(ticketId) {
      try {
        const ticketStmt = db.prepare('SELECT * FROM tickets WHERE id = ?');
        const ticket = ticketStmt.get(ticketId);

        if (!ticket) {
          throw new Error('Ticket not found');
        }

        // Get attachments
        const attachmentsStmt = db.prepare('SELECT * FROM ticket_attachments WHERE ticket_id = ?');
        const attachments = attachmentsStmt.all(ticketId);

        return {
          ...ticket,
          attachments: attachments.map(att => ({
            id: att.id,
            file_name: att.file_name,
            file_type: att.file_type,
            file_size: att.file_size,
            file_url: att.file_url,
            description: att.description,
            created_at: att.created_at
          }))
        };

      } catch (error) {
        console.error('Failed to get ticket:', error);
        throw error;
      }
    },

    /**
     * Get all tickets for user
     * @param {string} userId
     * @param {Object} options
     * @returns {Array} Tickets
     */
    getUserTickets(userId, options = {}) {
      try {
        const { status = null, limit = 50, offset = 0 } = options;

        let query = 'SELECT * FROM tickets WHERE user_id = ?';
        const params = [userId];

        if (status) {
          query += ' AND status = ?';
          params.push(status);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const stmt = db.prepare(query);
        return stmt.all(...params);

      } catch (error) {
        console.error('Failed to get user tickets:', error);
        throw error;
      }
    },

    /**
     * Get tickets for order
     * @param {string} orderId
     * @returns {Array} Tickets
     */
    getOrderTickets(orderId) {
      try {
        const stmt = db.prepare('SELECT * FROM tickets WHERE order_id = ? ORDER BY created_at DESC');
        return stmt.all(orderId);
      } catch (error) {
        console.error('Failed to get order tickets:', error);
        throw error;
      }
    },

    /**
     * Add attachment to ticket
     * @param {string} ticketId
     * @param {Object} fileData
     * @returns {Object} Attachment data
     */
    addAttachment(ticketId, fileData) {
      try {
        // Verify ticket exists
        const ticket = this.getTicket(ticketId);
        if (!ticket) {
          throw new Error('Ticket not found');
        }

        const { file_name, file_type, file_size, file_path, file_url, description = null } = fileData;

        const stmt = db.prepare(`
          INSERT INTO ticket_attachments (ticket_id, file_name, file_type, file_size, file_path, file_url, description)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(ticketId, file_name, file_type, file_size, file_path, file_url, description);

        console.log(`📎 Attachment added to ticket ${ticketId}: ${file_name}`);

        return {
          success: true,
          data: {
            id: result.lastInsertRowid,
            ticket_id: ticketId,
            file_name,
            file_type,
            file_size,
            file_url,
            description,
            created_at: new Date().toISOString()
          }
        };

      } catch (error) {
        console.error('Failed to add attachment:', error);
        throw error;
      }
    },

    /**
     * Update ticket status
     * @param {string} ticketId
     * @param {string} status
     * @param {string} resolution
     * @returns {Object} Updated ticket
     */
    updateTicketStatus(ticketId, status, resolution = null) {
      try {
        const resolvedAt = status === 'resolved' ? new Date().toISOString() : null;

        const stmt = db.prepare(`
          UPDATE tickets 
          SET status = ?, resolution = ?, resolved_at = ?, updated_at = datetime('now')
          WHERE id = ?
        `);

        stmt.run(status, resolution, resolvedAt, ticketId);

        console.log(`✅ Ticket ${ticketId} status updated to: ${status}`);

        return {
          success: true,
          message: 'Ticket updated successfully',
          data: {
            id: ticketId,
            status,
            resolution,
            resolved_at: resolvedAt
          }
        };

      } catch (error) {
        console.error('Failed to update ticket:', error);
        throw error;
      }
    },

    /**
     * Get ticket statistics
     * @param {string} userId
     * @returns {Object} Statistics
     */
    getTicketStats(userId) {
      try {
        const stats = {};

        // Total tickets
        const totalStmt = db.prepare('SELECT COUNT(*) as count FROM tickets WHERE user_id = ?');
        stats.total = totalStmt.get(userId).count;

        // By status
        const statusStmt = db.prepare(`
          SELECT status, COUNT(*) as count 
          FROM tickets 
          WHERE user_id = ? 
          GROUP BY status
        `);
        stats.byStatus = statusStmt.all(userId);

        // By type
        const typeStmt = db.prepare(`
          SELECT ticket_type, COUNT(*) as count 
          FROM tickets 
          WHERE user_id = ? 
          GROUP BY ticket_type
        `);
        stats.byType = typeStmt.all(userId);

        return stats;

      } catch (error) {
        console.error('Failed to get ticket stats:', error);
        throw error;
      }
    }
  };
}

export default createTicketService;
