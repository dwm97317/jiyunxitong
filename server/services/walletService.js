/**
 * Wallet Service
 * 
 * Handles e-wallet operations: deposits, withdrawals, payments, and balance management
 */

import { WalletRepository, WalletTransactionRepository } from '../db/models.js';

/**
 * Create wallet service
 * @param {Object} db - Database instance
 * @returns {Object} Wallet service methods
 */
export function createWalletService(db) {
  return {
    /**
     * Get or create wallet for user
     * @param {string} userId
     * @returns {Object} Wallet data
     */
    getOrCreateWallet(userId) {
      return WalletRepository.getOrCreate(db, userId);
    },

    /**
     * Get wallet balance
     * @param {string} userId
     * @returns {Object} Wallet data with balance
     */
    getWallet(userId) {
      const wallet = WalletRepository.findById(db, userId);
      
      if (!wallet) {
        return this.getOrCreateWallet(userId);
      }
      
      return wallet;
    },

    /**
     * Deposit money to wallet
     * @param {string} userId
     * @param {number} amount
     * @param {string} description
     * @param {string} referenceId - Payment gateway reference
     * @returns {Object} Transaction result
     */
    deposit(userId, amount, description = 'Nạp tiền', referenceId = null) {
      try {
        if (amount <= 0) {
          throw new Error('Số tiền nạp phải lớn hơn 0');
        }

        // Get or create wallet
        const wallet = this.getOrCreateWallet(userId);
        const balanceBefore = wallet.balance;
        const balanceAfter = balanceBefore + amount;

        // Update wallet balance
        WalletRepository.updateBalance(db, userId, balanceAfter);

        // Record transaction
        WalletTransactionRepository.create(db, {
          wallet_id: wallet.id,
          user_id: userId,
          transaction_type: 'deposit',
          amount: amount,
          balance_before: balanceBefore,
          balance_after: balanceAfter,
          description: description,
          reference_id: referenceId,
          reference_type: 'payment_gateway'
        });

        console.log(`💰 Deposit: ${userId} +${amount.toLocaleString()} VND (Balance: ${balanceAfter.toLocaleString()} VND)`);

        return {
          success: true,
          message: `Nạp tiền thành công: ${amount.toLocaleString()} VND`,
          data: {
            wallet_id: wallet.id,
            balance: balanceAfter,
            transaction_amount: amount
          }
        };

      } catch (error) {
        console.error('Deposit failed:', error);
        throw error;
      }
    },

    /**
     * Withdraw money from wallet
     * @param {string} userId
     * @param {number} amount
     * @param {string} description
     * @param {string} referenceId
     * @returns {Object} Transaction result
     */
    withdraw(userId, amount, description = 'Rút tiền', referenceId = null) {
      try {
        const wallet = this.getWallet(userId);
        
        if (amount <= 0) {
          throw new Error('Số tiền rút phải lớn hơn 0');
        }

        if (wallet.balance < amount) {
          throw new Error(`Số dư không đủ. Hiện có: ${wallet.balance.toLocaleString()} VND`);
        }

        const balanceBefore = wallet.balance;
        const balanceAfter = balanceBefore - amount;

        // Update wallet balance
        WalletRepository.updateBalance(db, userId, balanceAfter);

        // Record transaction
        WalletTransactionRepository.create(db, {
          wallet_id: wallet.id,
          user_id: userId,
          transaction_type: 'withdrawal',
          amount: amount,
          balance_before: balanceBefore,
          balance_after: balanceAfter,
          description: description,
          reference_id: referenceId,
          reference_type: 'bank_transfer'
        });

        console.log(`💸 Withdrawal: ${userId} -${amount.toLocaleString()} VND (Balance: ${balanceAfter.toLocaleString()} VND)`);

        return {
          success: true,
          message: `Rút tiền thành công: ${amount.toLocaleString()} VND`,
          data: {
            wallet_id: wallet.id,
            balance: balanceAfter,
            transaction_amount: amount
          }
        };

      } catch (error) {
        console.error('Withdrawal failed:', error);
        throw error;
      }
    },

    /**
     * Pay for order using wallet balance
     * @param {string} userId
     * @param {number} amount
     * @param {string} orderId
     * @returns {Object} Payment result
     */
    payForOrder(userId, amount, orderId) {
      try {
        const wallet = this.getWallet(userId);
        
        if (amount <= 0) {
          throw new Error('Số tiền thanh toán phải lớn hơn 0');
        }

        if (wallet.balance < amount) {
          throw new Error(`Số dư không đủ. Cần: ${amount.toLocaleString()} VND, Hiện có: ${wallet.balance.toLocaleString()} VND`);
        }

        const balanceBefore = wallet.balance;
        const balanceAfter = balanceBefore - amount;

        // Update wallet balance
        WalletRepository.updateBalance(db, userId, balanceAfter);

        // Record transaction
        WalletTransactionRepository.create(db, {
          wallet_id: wallet.id,
          user_id: userId,
          transaction_type: 'payment',
          amount: amount,
          balance_before: balanceBefore,
          balance_after: balanceAfter,
          description: `Thanh toán đơn hàng ${orderId}`,
          reference_id: orderId,
          reference_type: 'order'
        });

        console.log(`💳 Payment: ${userId} paid ${amount.toLocaleString()} VND for order ${orderId}`);

        return {
          success: true,
          message: 'Thanh toán thành công',
          data: {
            wallet_id: wallet.id,
            balance: balanceAfter,
            amount_paid: amount,
            order_id: orderId
          }
        };

      } catch (error) {
        console.error('Payment failed:', error);
        throw error;
      }
    },

    /**
     * Get transaction history
     * @param {string} userId
     * @param {Object} options
     * @returns {Array} Transactions
     */
    getTransactionHistory(userId, options = {}) {
      return WalletTransactionRepository.findByUserId(db, userId, options);
    },

    /**
     * Get single transaction
     * @param {number} transactionId
     * @returns {Object} Transaction data
     */
    getTransaction(transactionId) {
      return WalletTransactionRepository.findById(db, transactionId);
    }
  };
}

export default createWalletService;
