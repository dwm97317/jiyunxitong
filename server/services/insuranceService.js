/**
 * Insurance Service
 * 
 * Handles insurance calculation, purchase, and claims
 */

import { InsuranceRepository, OrderRepository } from '../db/models.js';

const INSURANCE_RATE = 0.05; // 5% flat rate

/**
 * Create insurance service
 * @param {Object} db - Database instance
 * @returns {Object} Insurance service methods
 */
export function createInsuranceService(db) {
  return {
    /**
     * Calculate insurance fee for declared value
     * @param {number} declaredValue
     * @returns {Object} Calculation result
     */
    calculateInsurance(declaredValue) {
      if (!declaredValue || declaredValue <= 0) {
        return {
          is_insured: false,
          declared_value: 0,
          insurance_rate: INSURANCE_RATE,
          insurance_fee: 0,
          coverage_amount: 0
        };
      }

      const insuranceFee = InsuranceRepository.calculateFee(declaredValue, INSURANCE_RATE);
      const coverageAmount = declaredValue; // 100% coverage

      return {
        is_insured: true,
        declared_value: declaredValue,
        insurance_rate: INSURANCE_RATE,
        insurance_fee: insuranceFee,
        coverage_amount: coverageAmount,
        coverage_percentage: '100%'
      };
    },

    /**
     * Purchase insurance for order
     * @param {string} orderId
     * @param {number} declaredValue
     * @returns {Object} Insurance record
     */
    purchaseInsurance(orderId, declaredValue) {
      try {
        // Verify order exists
        const order = OrderRepository.findById(db, orderId);
        if (!order) {
          throw new Error('Order not found');
        }

        // Calculate insurance
        const calculation = this.calculateInsurance(declaredValue);

        // Save insurance record
        const result = InsuranceRepository.save(db, {
          order_id: orderId,
          is_insured: true,
          insurance_rate: INSURANCE_RATE,
          declared_value: declaredValue,
          insurance_fee: calculation.insurance_fee,
          coverage_amount: calculation.coverage_amount
        });

        console.log(`✅ Insurance purchased for order ${orderId}: ${calculation.insurance_fee} VND`);

        return {
          success: true,
          data: calculation,
          message: `Bảo hiểm ${INSURANCE_RATE * 100}% đã được mua. Phí bảo hiểm: ${calculation.insurance_fee.toLocaleString()} VND`
        };

      } catch (error) {
        console.error('Failed to purchase insurance:', error);
        throw error;
      }
    },

    /**
     * Remove insurance from order
     * @param {string} orderId
     * @returns {Object} Result
     */
    removeInsurance(orderId) {
      try {
        const result = InsuranceRepository.save(db, {
          order_id: orderId,
          is_insured: false,
          insurance_rate: INSURANCE_RATE,
          declared_value: 0,
          insurance_fee: 0,
          coverage_amount: 0
        });

        console.log(`ℹ️  Insurance removed for order ${orderId}`);

        return {
          success: true,
          message: 'Đã hủy bảo hiểm'
        };

      } catch (error) {
        console.error('Failed to remove insurance:', error);
        throw error;
      }
    },

    /**
     * Get insurance for order
     * @param {string} orderId
     * @returns {Object|null} Insurance data
     */
    getInsurance(orderId) {
      return InsuranceRepository.findByOrderId(db, orderId);
    },

    /**
     * File insurance claim
     * @param {string} orderId
     * @param {Object} claimData
     * @returns {Object} Claim result
     */
    fileClaim(orderId, claimData) {
      try {
        const insurance = this.getInsurance(orderId);
        
        if (!insurance || !insurance.is_insured) {
          throw new Error('Order does not have active insurance');
        }

        if (insurance.claim_status !== 'none') {
          throw new Error('Claim already filed for this order');
        }

        const { amount, notes } = claimData;

        // Validate claim amount
        if (amount > insurance.coverage_amount) {
          throw new Error(`Claim amount exceeds coverage. Maximum: ${insurance.coverage_amount} VND`);
        }

        // Update insurance record
        const stmt = db.prepare(`
          UPDATE insurance 
          SET claim_status = 'pending', claim_amount = ?, claim_notes = ?
          WHERE order_id = ?
        `);
        stmt.run(amount, notes, orderId);

        console.log(`📋 Insurance claim filed for order ${orderId}: ${amount} VND`);

        return {
          success: true,
          message: 'Yêu cầu bồi thường đã được gửi. Chúng tôi sẽ xem xét trong 3-5 ngày làm việc.',
          data: {
            claim_status: 'pending',
            claim_amount: amount,
            coverage_amount: insurance.coverage_amount
          }
        };

      } catch (error) {
        console.error('Failed to file claim:', error);
        throw error;
      }
    }
  };
}

export default createInsuranceService;
