/**
 * Package Tracking Service
 * 
 * Handles real-time package location tracking with GPS coordinates
 * and checkpoint management for routes (e.g., Mukdahan → Quang Tri)
 */

import { OrderRepository } from '../db/models.js';

// Checkpoint definitions for Thailand-Vietnam route
const CHECKPOINTS = [
  { name: 'Warehouse Bangkok', latitude: 13.7563, longitude: 100.5018, distance_from_start_km: 0 },
  { name: 'Border Checkpoint Mukdahan', latitude: 16.5564, longitude: 104.7217, distance_from_start_km: 580 },
  { name: 'Thai-Lao Friendship Bridge', latitude: 17.8833, longitude: 102.7333, distance_from_start_km: 650 },
  { name: 'Vientiane Hub', latitude: 17.9757, longitude: 102.6331, distance_from_start_km: 680 },
  { name: 'Border Checkpoint Lao-Viet', latitude: 18.1000, longitude: 104.2000, distance_from_start_km: 850 },
  { name: 'Quang Tri Warehouse', latitude: 16.8167, longitude: 107.1000, distance_from_start_km: 1160 },
  { name: 'Local Delivery Hub', latitude: 16.8500, longitude: 107.1500, distance_from_start_km: 1165 }
];

const TOTAL_DISTANCE_KM = 1165;

/**
 * Create tracking service
 * @param {Object} db - Database instance
 * @returns {Object} Tracking service methods
 */
export function createTrackingService(db) {
  return {
    /**
     * Initialize tracking for order
     * @param {string} orderId
     * @param {string} initialStatus
     * @returns {Object} Tracking record
     */
    initializeTracking(orderId, initialStatus = 'RECEIVED_TH') {
      try {
        const order = OrderRepository.findById(db, orderId);
        if (!order) {
          throw new Error('Order not found');
        }

        const initialCheckpoint = CHECKPOINTS[0];
        const trackingHistory = JSON.stringify([
          {
            status: initialStatus,
            location: initialCheckpoint.name,
            latitude: initialCheckpoint.latitude,
            longitude: initialCheckpoint.longitude,
            timestamp: new Date().toISOString()
          }
        ]);

        const stmt = db.prepare(`
          INSERT OR REPLACE INTO package_tracking 
          (order_id, current_status, current_location, latitude, longitude, 
           last_checkpoint, next_checkpoint, distance_remaining_km, tracking_history)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(
          orderId,
          initialStatus,
          initialCheckpoint.name,
          initialCheckpoint.latitude,
          initialCheckpoint.longitude,
          initialCheckpoint.name,
          CHECKPOINTS[1].name,
          TOTAL_DISTANCE_KM,
          trackingHistory
        );

        console.log(`📍 Tracking initialized for order ${orderId}`);

        return this.getTracking(orderId);

      } catch (error) {
        console.error('Failed to initialize tracking:', error);
        throw error;
      }
    },

    /**
     * Update package location
     * @param {string} orderId
     * @param {Object} locationData
     * @returns {Object} Updated tracking
     */
    updateLocation(orderId, locationData) {
      try {
        const { 
          current_status, 
          current_location, 
          latitude, 
          longitude, 
          last_checkpoint,
          next_checkpoint,
          distance_remaining_km 
        } = locationData;

        // Get current tracking
        const currentTracking = this.getTracking(orderId);
        if (!currentTracking) {
          throw new Error('Tracking not found. Initialize first.');
        }

        // Update tracking history
        const history = JSON.parse(currentTracking.tracking_history || '[]');
        history.push({
          status: current_status,
          location: current_location,
          latitude,
          longitude,
          timestamp: new Date().toISOString()
        });

        const updatedHistory = JSON.stringify(history);

        // Update database
        const stmt = db.prepare(`
          UPDATE package_tracking 
          SET current_status = ?, current_location = ?, latitude = ?, longitude = ?,
              last_checkpoint = ?, next_checkpoint = ?, distance_remaining_km = ?,
              tracking_history = ?, updated_at = datetime('now')
          WHERE order_id = ?
        `);

        stmt.run(
          current_status,
          current_location,
          latitude,
          longitude,
          last_checkpoint,
          next_checkpoint,
          distance_remaining_km,
          updatedHistory,
          orderId
        );

        console.log(`📍 Location updated for order ${orderId}: ${current_location}`);

        return this.getTracking(orderId);

      } catch (error) {
        console.error('Failed to update location:', error);
        throw error;
      }
    },

    /**
     * Get tracking information for order
     * @param {string} orderId
     * @returns {Object} Tracking data
     */
    getTracking(orderId) {
      try {
        const stmt = db.prepare('SELECT * FROM package_tracking WHERE order_id = ?');
        const tracking = stmt.get(orderId);

        if (!tracking) {
          return null;
        }

        return {
          ...tracking,
          tracking_history: JSON.parse(tracking.tracking_history || '[]'),
          progress_percentage: ((TOTAL_DISTANCE_KM - tracking.distance_remaining_km) / TOTAL_DISTANCE_KM * 100).toFixed(1)
        };

      } catch (error) {
        console.error('Failed to get tracking:', error);
        throw error;
      }
    },

    /**
     * Auto-calculate next checkpoint based on status
     * @param {string} status
     * @returns {Object} Checkpoint info
     */
    getNextCheckpoint(status) {
      const statusCheckpointMap = {
        'RECEIVED_TH': CHECKPOINTS[0],
        'IN_TRANSIT_TO_VN': CHECKPOINTS[2],
        'ARRIVED_QT': CHECKPOINTS[5],
        'DELIVERED_VIETTELPOST': CHECKPOINTS[6]
      };

      return statusCheckpointMap[status] || CHECKPOINTS[0];
    },

    /**
     * Get estimated time of arrival
     * @param {string} orderId
     * @returns {Object} ETA information
     */
    getETA(orderId) {
      try {
        const tracking = this.getTracking(orderId);
        if (!tracking) {
          return null;
        }

        // Simple ETA calculation: assume average speed 60 km/h
        const averageSpeedKmh = 60;
        const hoursRemaining = tracking.distance_remaining_km / averageSpeedKmh;
        const estimatedArrival = new Date(Date.now() + hoursRemaining * 60 * 60 * 1000);

        return {
          distance_remaining_km: tracking.distance_remaining_km,
          estimated_hours: hoursRemaining.toFixed(1),
          estimated_arrival: estimatedArrival.toISOString(),
          progress_percentage: tracking.progress_percentage
        };

      } catch (error) {
        console.error('Failed to calculate ETA:', error);
        return null;
      }
    },

    /**
     * Get tracking history
     * @param {string} orderId
     * @returns {Array} History entries
     */
    getTrackingHistory(orderId) {
      const tracking = this.getTracking(orderId);
      return tracking ? tracking.tracking_history : [];
    }
  };
}

export default createTrackingService;
