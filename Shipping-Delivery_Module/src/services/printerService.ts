/**
 * Printer Service
 * Tích hợp máy in Xprinter 420B để in tem QR code
 */

export interface PrintLabel {
  customerId: string;
  goodsType: string;
  importDate: string;
  shelfLocation: string;
  qrCode: string;
  weight?: number;
  dimensions?: string;
}

export interface PrinterConfig {
  ip: string;
  port: number;
  timeout: number;
}

export interface PrintResult {
  success: boolean;
  message: string;
  timestamp: number;
}

const DEFAULT_CONFIG: PrinterConfig = {
  ip: '192.168.1.100',
  port: 9100,
  timeout: 5000,
};

/**
 * Tạo ESC/POS command để in tem
 */
function generateESCPOSCommands(label: PrintLabel): string {
  let commands = '';

  // Initialize printer
  commands += '\x1B\x40'; // ESC @

  // Set alignment to center
  commands += '\x1B\x61\x01'; // ESC a 1

  // Print header
  commands += '========\n';
  commands += '快递标签\n';
  commands += '========\n\n';

  // Set alignment to left
  commands += '\x1B\x61\x00'; // ESC a 0

  // Print label information
  commands += `客户ID: ${label.customerId}\n`;
  commands += `货物类型: ${label.goodsType}\n`;
  commands += `导入日期: ${label.importDate}\n`;
  commands += `货架位置: ${label.shelfLocation}\n`;

  if (label.weight) {
    commands += `重量: ${label.weight}kg\n`;
  }

  if (label.dimensions) {
    commands += `尺寸: ${label.dimensions}\n`;
  }

  commands += '\n';

  // Print QR code (mô phỏng - trong thực tế cần library QR code)
  commands += `QR: ${label.qrCode}\n`;

  // Print footer
  commands += '\n========\n';
  commands += new Date().toLocaleString('zh-CN');
  commands += '\n========\n\n';

  // Cut paper
  commands += '\x1B\x69'; // ESC i

  return commands;
}

/**
 * Kết nối đến máy in
 */
async function connectToPrinter(config: PrinterConfig): Promise<boolean> {
  try {
    // Mô phỏng kết nối
    // Trong thực tế, sử dụng socket hoặc USB connection
    console.log(`🖨️ Kết nối đến máy in: ${config.ip}:${config.port}`);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Kết nối thành công');
        resolve(true);
      }, 500);
    });
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error);
    return false;
  }
}

/**
 * Gửi lệnh in đến máy in
 */
async function sendPrintCommand(commands: string, config: PrinterConfig): Promise<boolean> {
  try {
    // Mô phỏng gửi lệnh
    // Trong thực tế, gửi qua socket hoặc USB
    console.log('📤 Gửi lệnh in...');
    console.log(commands);

    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Lệnh in đã gửi');
        resolve(true);
      }, 1000);
    });
  } catch (error) {
    console.error('❌ Lỗi gửi lệnh:', error);
    return false;
  }
}

/**
 * In tem QR code
 */
export async function printLabel(label: PrintLabel, config: Partial<PrinterConfig> = {}): Promise<PrintResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    // Kết nối đến máy in
    const connected = await connectToPrinter(finalConfig);

    if (!connected) {
      return {
        success: false,
        message: 'Không thể kết nối đến máy in',
        timestamp: Date.now(),
      };
    }

    // Tạo lệnh ESC/POS
    const commands = generateESCPOSCommands(label);

    // Gửi lệnh in
    const sent = await sendPrintCommand(commands, finalConfig);

    if (!sent) {
      return {
        success: false,
        message: 'Không thể gửi lệnh in',
        timestamp: Date.now(),
      };
    }

    return {
      success: true,
      message: `Tem QR code đã in thành công (ID: ${label.customerId})`,
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      success: false,
      message: `Lỗi in: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: Date.now(),
    };
  }
}

/**
 * In nhiều tem
 */
export async function printMultipleLabels(
  labels: PrintLabel[],
  config: Partial<PrinterConfig> = {}
): Promise<PrintResult[]> {
  return Promise.all(labels.map((label) => printLabel(label, config)));
}

/**
 * Kiểm tra kết nối máy in
 */
export async function testPrinterConnection(config: Partial<PrinterConfig> = {}): Promise<boolean> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  try {
    console.log(`🔍 Kiểm tra kết nối máy in: ${finalConfig.ip}:${finalConfig.port}`);

    const connected = await connectToPrinter(finalConfig);

    if (connected) {
      console.log('✅ Máy in sẵn sàng');
    } else {
      console.log('❌ Không thể kết nối đến máy in');
    }

    return connected;
  } catch (error) {
    console.error('❌ Lỗi kiểm tra:', error);
    return false;
  }
}

/**
 * Lấy cấu hình máy in mặc định
 */
export function getDefaultPrinterConfig(): PrinterConfig {
  return DEFAULT_CONFIG;
}

/**
 * Cập nhật cấu hình máy in
 */
export function updatePrinterConfig(config: Partial<PrinterConfig>): PrinterConfig {
  return { ...DEFAULT_CONFIG, ...config };
}
