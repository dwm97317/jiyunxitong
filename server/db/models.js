/**
 * Database Models and Schema Initialization
 * 
 * Defines all database tables and provides helper functions
 * for Zalo notification system
 */

/**
 * Initialize all database tables
 * @param {Database} db - better-sqlite3 database instance
 */
export function initializeDatabase(db) {
  // Enable WAL mode for better concurrent read/write performance
  db.pragma('journal_mode = WAL');
  
  // Create tables
  createZaloUsersTable(db);
  createNotificationLogsTable(db);
  createOrdersTable(db);
  createOrderStatusHistoryTable(db);
  createInsuranceTable(db);
  createWalletsTable(db);
  createWalletTransactionsTable(db);
  createInvoicesTable(db);
  createTicketsTable(db);
  createTicketAttachmentsTable(db);
  createPackageTrackingTable(db);
  createCustomerAnalyticsTable(db);
  
  console.log('✅ Database tables initialized successfully');
}

/**
 * Create zalo_users table
 */
function createZaloUsersTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS zalo_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      zalo_id TEXT UNIQUE NOT NULL,
      phone TEXT,
      display_name TEXT,
      is_followed INTEGER DEFAULT 1,
      last_interaction TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_zalo_users_phone ON zalo_users(phone);
    CREATE INDEX IF NOT EXISTS idx_zalo_users_zalo_id ON zalo_users(zalo_id);
  `);
  
  console.log('✅ zalo_users table created');
}

/**
 * Create notification_logs table
 */
function createNotificationLogsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS notification_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      status TEXT NOT NULL,
      zalo_id TEXT,
      message_template TEXT,
      result TEXT,
      error_message TEXT,
      retry_count INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_notification_logs_order_id ON notification_logs(order_id);
    CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);
    CREATE INDEX IF NOT EXISTS idx_notification_logs_created_at ON notification_logs(created_at);
  `);
  
  console.log('✅ notification_logs table created');
}

/**
 * Create orders table
 */
function createOrdersTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      tracking_number TEXT UNIQUE NOT NULL,
      customer_name TEXT,
      customer_phone TEXT,
      recipient_name TEXT,
      recipient_phone TEXT,
      recipient_address TEXT,
      status TEXT DEFAULT 'PENDING',
      cargo_info TEXT,
      weight TEXT,
      volume TEXT,
      declared_value REAL,
      insured_amount REAL,
      amount_due REAL DEFAULT 0,
      transport_type TEXT,
      branch TEXT,
      order_date TEXT,
      updated_at TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_orders_tracking_number ON orders(tracking_number);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
  `);
  
  console.log('✅ orders table created');
}

/**
 * Create order_status_history table
 */
function createOrderStatusHistoryTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_status_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      old_status TEXT,
      new_status TEXT NOT NULL,
      updated_by TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);
    CREATE INDEX IF NOT EXISTS idx_order_status_history_created_at ON order_status_history(created_at);
  `);
  
  console.log('✅ order_status_history table created');
}

/**
 * Create insurance table
 */
function createInsuranceTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS insurance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      is_insured INTEGER DEFAULT 0,
      insurance_rate REAL DEFAULT 0.05,
      declared_value REAL DEFAULT 0,
      insurance_fee REAL DEFAULT 0,
      coverage_amount REAL DEFAULT 0,
      claim_status TEXT DEFAULT 'none',
      claim_amount REAL DEFAULT 0,
      claim_notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_insurance_order_id ON insurance(order_id);
    CREATE INDEX IF NOT EXISTS idx_insurance_claim_status ON insurance(claim_status);
  `);
  
  console.log('✅ insurance table created');
}

/**
 * Create wallets table
 */
function createWalletsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT UNIQUE NOT NULL,
      user_type TEXT DEFAULT 'customer',
      balance REAL DEFAULT 0,
      currency TEXT DEFAULT 'VND',
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
    
    CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
  `);
  
  console.log('✅ wallets table created');
}

/**
 * Create wallet_transactions table
 */
function createWalletTransactionsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS wallet_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      wallet_id INTEGER NOT NULL,
      user_id TEXT NOT NULL,
      transaction_type TEXT NOT NULL,
      amount REAL NOT NULL,
      balance_before REAL NOT NULL,
      balance_after REAL NOT NULL,
      description TEXT,
      reference_id TEXT,
      reference_type TEXT,
      status TEXT DEFAULT 'completed',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (wallet_id) REFERENCES wallets(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
    CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);
    CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions(created_at);
  `);
  
  console.log('✅ wallet_transactions table created');
}

/**
 * Create invoices table
 */
function createInvoicesTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS invoices (
      id TEXT PRIMARY KEY,
      invoice_number TEXT UNIQUE NOT NULL,
      order_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      invoice_date TEXT NOT NULL,
      due_date TEXT NOT NULL,
      subtotal REAL DEFAULT 0,
      insurance_fee REAL DEFAULT 0,
      shipping_fee REAL DEFAULT 0,
      tax_amount REAL DEFAULT 0,
      discount_amount REAL DEFAULT 0,
      total_amount REAL NOT NULL,
      paid_amount REAL DEFAULT 0,
      balance_due REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      payment_method TEXT,
      pdf_url TEXT,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      paid_at TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
    CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
  `);
  
  console.log('✅ invoices table created');
}

/**
 * Create tickets table (for customer service/complaints)
 */
function createTicketsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      ticket_number TEXT UNIQUE NOT NULL,
      order_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      ticket_type TEXT NOT NULL,
      subject TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT DEFAULT 'medium',
      status TEXT DEFAULT 'open',
      assigned_to TEXT,
      resolution TEXT,
      resolved_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_tickets_order_id ON tickets(order_id);
    CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
    CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
    CREATE INDEX IF NOT EXISTS idx_tickets_type ON tickets(ticket_type);
  `);
  
  console.log('✅ tickets table created');
}

/**
 * Create ticket_attachments table (for video uploads)
 */
function createTicketAttachmentsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ticket_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ticket_id TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      file_url TEXT,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (ticket_id) REFERENCES tickets(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_ticket_attachments_ticket_id ON ticket_attachments(ticket_id);
  `);
  
  console.log('✅ ticket_attachments table created');
}

/**
 * Create package_tracking table (for real-time location)
 */
function createPackageTrackingTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS package_tracking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT UNIQUE NOT NULL,
      current_status TEXT NOT NULL,
      current_location TEXT,
      latitude REAL,
      longitude REAL,
      estimated_arrival TEXT,
      last_checkpoint TEXT,
      next_checkpoint TEXT,
      distance_remaining_km REAL,
      tracking_history TEXT,
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_package_tracking_order_id ON package_tracking(order_id);
    CREATE INDEX IF NOT EXISTS idx_package_tracking_status ON package_tracking(current_status);
  `);
  
  console.log('✅ package_tracking table created');
}

/**
 * Create customer_analytics table (for dashboard statistics)
 */
function createCustomerAnalyticsTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS customer_analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      month TEXT NOT NULL,
      year INTEGER NOT NULL,
      total_spent REAL DEFAULT 0,
      total_orders INTEGER DEFAULT 0,
      total_weight_kg REAL DEFAULT 0,
      avg_weight_kg REAL DEFAULT 0,
      damaged_items INTEGER DEFAULT 0,
      lost_items INTEGER DEFAULT 0,
      on_time_deliveries INTEGER DEFAULT 0,
      late_deliveries INTEGER DEFAULT 0,
      damage_rate REAL DEFAULT 0,
      loss_rate REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, month, year)
    );
    
    CREATE INDEX IF NOT EXISTS idx_customer_analytics_user_id ON customer_analytics(user_id);
    CREATE INDEX IF NOT EXISTS idx_customer_analytics_month ON customer_analytics(month, year);
  `);
  
  console.log('✅ customer_analytics table created');
}

// ============================================
// ZaloUser Repository
// ============================================

export const ZaloUserRepository = {
  /**
   * Save or update Zalo user
   * @param {Database} db
   * @param {Object} userData - { zalo_id, phone, display_name, is_followed }
   */
  save(db, userData) {
    const stmt = db.prepare(`
      INSERT INTO zalo_users (zalo_id, phone, display_name, is_followed, last_interaction, updated_at)
      VALUES (@zalo_id, @phone, @display_name, @is_followed, datetime('now'), datetime('now'))
      ON CONFLICT(zalo_id) DO UPDATE SET
        phone = excluded.phone,
        display_name = excluded.display_name,
        is_followed = excluded.is_followed,
        last_interaction = datetime('now'),
        updated_at = datetime('now')
    `);
    
    return stmt.run({
      zalo_id: userData.zalo_id,
      phone: userData.phone || null,
      display_name: userData.display_name || 'Unknown',
      is_followed: userData.is_followed !== false ? 1 : 0
    });
  },
  
  /**
   * Find user by Zalo ID
   * @param {Database} db
   * @param {string} zaloId
   */
  findByZaloId(db, zaloId) {
    const stmt = db.prepare('SELECT * FROM zalo_users WHERE zalo_id = ?');
    return stmt.get(zaloId);
  },
  
  /**
   * Find user by phone number
   * @param {Database} db
   * @param {string} phone
   */
  findByPhone(db, phone) {
    const stmt = db.prepare('SELECT * FROM zalo_users WHERE phone = ?');
    return stmt.get(phone);
  },
  
  /**
   * Update follow status
   * @param {Database} db
   * @param {string} zaloId
   * @param {boolean} isFollowed
   */
  updateFollowStatus(db, zaloId, isFollowed) {
    const stmt = db.prepare(`
      UPDATE zalo_users 
      SET is_followed = ?, last_interaction = datetime('now'), updated_at = datetime('now')
      WHERE zalo_id = ?
    `);
    return stmt.run(isFollowed ? 1 : 0, zaloId);
  }
};

// ============================================
// NotificationLog Repository
// ============================================

export const NotificationLogRepository = {
  /**
   * Create notification log entry
   * @param {Database} db
   * @param {Object} logData
   */
  create(db, logData) {
    const stmt = db.prepare(`
      INSERT INTO notification_logs (order_id, status, zalo_id, message_template, result, error_message, retry_count)
      VALUES (@order_id, @status, @zalo_id, @message_template, @result, @error_message, @retry_count)
    `);
    
    return stmt.run({
      order_id: logData.order_id,
      status: logData.status,
      zalo_id: logData.zalo_id || null,
      message_template: logData.message_template || null,
      result: logData.result || 'pending',
      error_message: logData.error_message || null,
      retry_count: logData.retry_count || 0
    });
  },
  
  /**
   * Get logs by order ID
   * @param {Database} db
   * @param {string} orderId
   */
  findByOrderId(db, orderId) {
    const stmt = db.prepare('SELECT * FROM notification_logs WHERE order_id = ? ORDER BY created_at DESC');
    return stmt.all(orderId);
  },
  
  /**
   * Get failed notifications
   * @param {Database} db
   * @param {number} days - Number of days to look back
   */
  findFailed(db, days = 7) {
    const stmt = db.prepare(`
      SELECT * FROM notification_logs 
      WHERE result = 'failed' 
      AND created_at >= datetime('now', '-' || ? || ' days')
      ORDER BY created_at DESC
    `);
    return stmt.all(days);
  },
  
  /**
   * Get notification statistics
   * @param {Database} db
   */
  getStats(db) {
    const stats = {};
    
    // Total notifications
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM notification_logs');
    stats.total = totalStmt.get().count;
    
    // Success count
    const successStmt = db.prepare("SELECT COUNT(*) as count FROM notification_logs WHERE result = 'success'");
    stats.success = successStmt.get().count;
    
    // Failed count
    const failedStmt = db.prepare("SELECT COUNT(*) as count FROM notification_logs WHERE result = 'failed'");
    stats.failed = failedStmt.get().count;
    
    // Delivery rate
    stats.deliveryRate = stats.total > 0 
      ? ((stats.success / stats.total) * 100).toFixed(2) 
      : 0;
    
    return stats;
  }
};

// ============================================
// Order Repository
// ============================================

export const OrderRepository = {
  /**
   * Find order by ID
   * @param {Database} db
   * @param {string} orderId
   */
  findById(db, orderId) {
    const stmt = db.prepare('SELECT * FROM orders WHERE id = ?');
    return stmt.get(orderId);
  },
  
  /**
   * Find order by tracking number
   * @param {Database} db
   * @param {string} trackingNumber
   */
  findByTrackingNumber(db, trackingNumber) {
    const stmt = db.prepare('SELECT * FROM orders WHERE tracking_number = ?');
    return stmt.get(trackingNumber);
  },
  
  /**
   * Find orders by phone number
   * @param {Database} db
   * @param {string} phone
   */
  findByPhone(db, phone) {
    const stmt = db.prepare(`
      SELECT * FROM orders 
      WHERE customer_phone = ? OR recipient_phone = ?
      ORDER BY updated_at DESC
    `);
    return stmt.all(phone, phone);
  },
  
  /**
   * Update order status
   * @param {Database} db
   * @param {string} orderId
   * @param {string} newStatus
   */
  updateStatus(db, orderId, newStatus) {
    const stmt = db.prepare(`
      UPDATE orders 
      SET status = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    return stmt.run(newStatus, orderId);
  },
  
  /**
   * Insert or update order
   * @param {Database} db
   * @param {Object} orderData
   */
  save(db, orderData) {
    const stmt = db.prepare(`
      INSERT INTO orders (
        id, tracking_number, customer_name, customer_phone,
        recipient_name, recipient_phone, recipient_address,
        status, cargo_info, weight, volume, declared_value,
        insured_amount, amount_due, transport_type, branch, order_date
      )
      VALUES (
        @id, @tracking_number, @customer_name, @customer_phone,
        @recipient_name, @recipient_phone, @recipient_address,
        @status, @cargo_info, @weight, @volume, @declared_value,
        @insured_amount, @amount_due, @transport_type, @branch, @order_date
      )
      ON CONFLICT(id) DO UPDATE SET
        tracking_number = excluded.tracking_number,
        status = excluded.status,
        updated_at = datetime('now')
    `);
    
    return stmt.run({
      id: orderData.id,
      tracking_number: orderData.tracking_number,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      recipient_name: orderData.recipient_name,
      recipient_phone: orderData.recipient_phone,
      recipient_address: orderData.recipient_address,
      status: orderData.status || 'PENDING',
      cargo_info: orderData.cargo_info,
      weight: orderData.weight,
      volume: orderData.volume,
      declared_value: orderData.declared_value,
      insured_amount: orderData.insured_amount,
      amount_due: orderData.amount_due || 0,
      transport_type: orderData.transport_type,
      branch: orderData.branch,
      order_date: orderData.order_date || new Date().toISOString()
    });
  }
};

// ============================================
// OrderStatusHistory Repository
// ============================================

export const OrderStatusHistoryRepository = {
  /**
   * Record status change
   * @param {Database} db
   * @param {Object} historyData
   */
  record(db, historyData) {
    const stmt = db.prepare(`
      INSERT INTO order_status_history (order_id, old_status, new_status, updated_by, notes)
      VALUES (@order_id, @old_status, @new_status, @updated_by, @notes)
    `);
    
    return stmt.run({
      order_id: historyData.order_id,
      old_status: historyData.old_status || null,
      new_status: historyData.new_status,
      updated_by: historyData.updated_by || 'system',
      notes: historyData.notes || null
    });
  },
  
  /**
   * Get status history for order
   * @param {Database} db
   * @param {string} orderId
   */
  findByOrderId(db, orderId) {
    const stmt = db.prepare(`
      SELECT * FROM order_status_history 
      WHERE order_id = ? 
      ORDER BY created_at DESC
    `);
    return stmt.all(orderId);
  }
};

// ============================================
// Insurance Repository
// ============================================

export const InsuranceRepository = {
  /**
   * Create or update insurance for order
   * @param {Database} db
   * @param {Object} insuranceData
   */
  save(db, insuranceData) {
    const stmt = db.prepare(`
      INSERT INTO insurance (order_id, is_insured, insurance_rate, declared_value, insurance_fee, coverage_amount)
      VALUES (@order_id, @is_insured, @insurance_rate, @declared_value, @insurance_fee, @coverage_amount)
      ON CONFLICT(order_id) DO UPDATE SET
        is_insured = excluded.is_insured,
        insurance_rate = excluded.insurance_rate,
        declared_value = excluded.declared_value,
        insurance_fee = excluded.insurance_fee,
        coverage_amount = excluded.coverage_amount
    `);
    
    return stmt.run({
      order_id: insuranceData.order_id,
      is_insured: insuranceData.is_insured ? 1 : 0,
      insurance_rate: insuranceData.insurance_rate || 0.05,
      declared_value: insuranceData.declared_value || 0,
      insurance_fee: insuranceData.insurance_fee || 0,
      coverage_amount: insuranceData.coverage_amount || 0
    });
  },
  
  /**
   * Get insurance by order ID
   * @param {Database} db
   * @param {string} orderId
   */
  findByOrderId(db, orderId) {
    const stmt = db.prepare('SELECT * FROM insurance WHERE order_id = ?');
    return stmt.get(orderId);
  },
  
  /**
   * Calculate insurance fee
   * @param {number} declaredValue
   * @param {number} rate - Default 5%
   * @returns {number} Insurance fee
   */
  calculateFee(declaredValue, rate = 0.05) {
    return Math.round(declaredValue * rate);
  }
};

// ============================================
// Wallet Repository
// ============================================

export const WalletRepository = {
  /**
   * Get or create wallet for user
   * @param {Database} db
   * @param {string} userId
   */
  getOrCreate(db, userId) {
    const wallet = this.findById(db, userId);
    
    if (!wallet) {
      const stmt = db.prepare(`
        INSERT INTO wallets (user_id, balance, currency, status)
        VALUES (?, 0, 'VND', 'active')
      `);
      const result = stmt.run(userId);
      return this.findById(db, userId);
    }
    
    return wallet;
  },
  
  /**
   * Find wallet by user ID
   * @param {Database} db
   * @param {string} userId
   */
  findById(db, userId) {
    const stmt = db.prepare('SELECT * FROM wallets WHERE user_id = ?');
    return stmt.get(userId);
  },
  
  /**
   * Update wallet balance
   * @param {Database} db
   * @param {string} userId
   * @param {number} newBalance
   */
  updateBalance(db, userId, newBalance) {
    const stmt = db.prepare(`
      UPDATE wallets 
      SET balance = ?, updated_at = datetime('now')
      WHERE user_id = ?
    `);
    return stmt.run(newBalance, userId);
  }
};

// ============================================
// WalletTransaction Repository
// ============================================

export const WalletTransactionRepository = {
  /**
   * Record a wallet transaction
   * @param {Database} db
   * @param {Object} transactionData
   */
  create(db, transactionData) {
    const stmt = db.prepare(`
      INSERT INTO wallet_transactions 
      (wallet_id, user_id, transaction_type, amount, balance_before, balance_after, description, reference_id, reference_type, status)
      VALUES (@wallet_id, @user_id, @transaction_type, @amount, @balance_before, @balance_after, @description, @reference_id, @reference_type, @status)
    `);
    
    return stmt.run({
      wallet_id: transactionData.wallet_id,
      user_id: transactionData.user_id,
      transaction_type: transactionData.transaction_type,
      amount: transactionData.amount,
      balance_before: transactionData.balance_before,
      balance_after: transactionData.balance_after,
      description: transactionData.description,
      reference_id: transactionData.reference_id || null,
      reference_type: transactionData.reference_type || null,
      status: transactionData.status || 'completed'
    });
  },
  
  /**
   * Get transactions by user ID
   * @param {Database} db
   * @param {string} userId
   * @param {Object} options - Pagination options
   */
  findByUserId(db, userId, options = {}) {
    const { limit = 50, offset = 0, type = null } = options;
    
    let query = 'SELECT * FROM wallet_transactions WHERE user_id = ?';
    const params = [userId];
    
    if (type) {
      query += ' AND transaction_type = ?';
      params.push(type);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const stmt = db.prepare(query);
    return stmt.all(...params);
  },
  
  /**
   * Get transaction by ID
   * @param {Database} db
   * @param {number} transactionId
   */
  findById(db, transactionId) {
    const stmt = db.prepare('SELECT * FROM wallet_transactions WHERE id = ?');
    return stmt.get(transactionId);
  }
};

// ============================================
// Invoice Repository
// ============================================

export const InvoiceRepository = {
  /**
   * Create invoice
   * @param {Database} db
   * @param {Object} invoiceData
   */
  create(db, invoiceData) {
    const stmt = db.prepare(`
      INSERT INTO invoices 
      (id, invoice_number, order_id, user_id, invoice_date, due_date, 
       subtotal, insurance_fee, shipping_fee, tax_amount, discount_amount, 
       total_amount, paid_amount, balance_due, status, notes)
      VALUES (@id, @invoice_number, @order_id, @user_id, @invoice_date, @due_date,
              @subtotal, @insurance_fee, @shipping_fee, @tax_amount, @discount_amount,
              @total_amount, @paid_amount, @balance_due, @status, @notes)
    `);
    
    return stmt.run({
      id: invoiceData.id,
      invoice_number: invoiceData.invoice_number,
      order_id: invoiceData.order_id,
      user_id: invoiceData.user_id,
      invoice_date: invoiceData.invoice_date,
      due_date: invoiceData.due_date,
      subtotal: invoiceData.subtotal || 0,
      insurance_fee: invoiceData.insurance_fee || 0,
      shipping_fee: invoiceData.shipping_fee || 0,
      tax_amount: invoiceData.tax_amount || 0,
      discount_amount: invoiceData.discount_amount || 0,
      total_amount: invoiceData.total_amount,
      paid_amount: invoiceData.paid_amount || 0,
      balance_due: invoiceData.balance_due || invoiceData.total_amount,
      status: invoiceData.status || 'pending',
      notes: invoiceData.notes || null
    });
  },
  
  /**
   * Find invoice by ID
   * @param {Database} db
   * @param {string} invoiceId
   */
  findById(db, invoiceId) {
    const stmt = db.prepare('SELECT * FROM invoices WHERE id = ?');
    return stmt.get(invoiceId);
  },
  
  /**
   * Find invoice by invoice number
   * @param {Database} db
   * @param {string} invoiceNumber
   */
  findByInvoiceNumber(db, invoiceNumber) {
    const stmt = db.prepare('SELECT * FROM invoices WHERE invoice_number = ?');
    return stmt.get(invoiceNumber);
  },
  
  /**
   * Find invoices by order ID
   * @param {Database} db
   * @param {string} orderId
   */
  findByOrderId(db, orderId) {
    const stmt = db.prepare('SELECT * FROM invoices WHERE order_id = ?');
    return stmt.all(orderId);
  },
  
  /**
   * Find invoices by user ID
   * @param {Database} db
   * @param {string} userId
   * @param {Object} options
   */
  findByUserId(db, userId, options = {}) {
    const { limit = 50, offset = 0, status = null } = options;
    
    let query = 'SELECT * FROM invoices WHERE user_id = ?';
    const params = [userId];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const stmt = db.prepare(query);
    return stmt.all(...params);
  },
  
  /**
   * Update invoice status
   * @param {Database} db
   * @param {string} invoiceId
   * @param {string} status
   */
  updateStatus(db, invoiceId, status) {
    const stmt = db.prepare(`
      UPDATE invoices SET status = ? WHERE id = ?
    `);
    return stmt.run(status, invoiceId);
  },
  
  /**
   * Mark invoice as paid
   * @param {Database} db
   * @param {string} invoiceId
   * @param {string} paymentMethod
   */
  markAsPaid(db, invoiceId, paymentMethod) {
    const stmt = db.prepare(`
      UPDATE invoices 
      SET status = 'paid', paid_amount = total_amount, balance_due = 0, 
          payment_method = ?, paid_at = datetime('now')
      WHERE id = ?
    `);
    return stmt.run(paymentMethod, invoiceId);
  },
  
  /**
   * Generate unique invoice number
   * @returns {string}
   */
  generateInvoiceNumber() {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `INV-${timestamp}-${random}`;
  }
};
