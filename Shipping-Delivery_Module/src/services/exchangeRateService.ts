/**
 * Exchange Rate Service
 * Tích hợp API tỷ giá hối đoái và tính toán giá với margin lợi nhuận
 */

interface ExchangeRateData {
  rate: number; // CNY to THB
  timestamp: number;
  source: string;
}

interface ExchangeRateConfig {
  margin: number; // Lợi nhuận %, default 2%
  cacheTTL: number; // Cache time to live in milliseconds
}

// Cache để lưu tỷ giá
let cachedRate: ExchangeRateData | null = null;
let cacheExpiry: number = 0;

const DEFAULT_CONFIG: ExchangeRateConfig = {
  margin: 2,
  cacheTTL: 3600000, // 1 giờ
};

/**
 * Lấy tỷ giá hối đoái từ API hoặc cache
 * Mặc định: 1 CNY = 5.2 THB (giá tham khảo)
 */
export async function getExchangeRate(config: Partial<ExchangeRateConfig> = {}): Promise<ExchangeRateData> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Kiểm tra cache
  if (cachedRate && Date.now() < cacheExpiry) {
    console.log('📊 Sử dụng tỷ giá từ cache');
    return cachedRate;
  }

  try {
    // Gọi API (mô phỏng - thay thế bằng API thực)
    const rate = await fetchExchangeRateFromAPI();

    cachedRate = {
      rate,
      timestamp: Date.now(),
      source: 'openexchangerates.org',
    };

    cacheExpiry = Date.now() + finalConfig.cacheTTL;

    console.log(`📊 Cập nhật tỷ giá: 1 CNY = ${rate} THB`);
    return cachedRate;
  } catch (error) {
    console.error('❌ Lỗi lấy tỷ giá:', error);

    // Fallback: Sử dụng tỷ giá mặc định
    const defaultRate: ExchangeRateData = {
      rate: 5.2,
      timestamp: Date.now(),
      source: 'default',
    };

    cachedRate = defaultRate;
    cacheExpiry = Date.now() + finalConfig.cacheTTL;

    return defaultRate;
  }
}

/**
 * Lấy tỷ giá từ API (mô phỏng)
 * Trong thực tế, thay thế bằng gọi API thực như Open Exchange Rates
 */
async function fetchExchangeRateFromAPI(): Promise<number> {
  // Mô phỏng API call
  // Trong thực tế:
  // const response = await fetch(`https://openexchangerates.org/api/latest?app_id=${API_KEY}&symbols=THB`);
  // const data = await response.json();
  // return data.rates.THB;

  return new Promise((resolve) => {
    setTimeout(() => {
      // Tỷ giá tham khảo: 1 CNY = 5.2 THB
      resolve(5.2);
    }, 100);
  });
}

/**
 * Tính giá bán dựa trên giá gốc (Baht) + margin
 */
export function calculateSellingPrice(
  priceInBaht: number,
  exchangeRate: ExchangeRateData,
  margin?: number
): number {
  const finalMargin = margin ?? DEFAULT_CONFIG.margin;

  // Chuyển đổi từ Baht sang CNY
  const priceInCNY = priceInBaht / exchangeRate.rate;

  // Áp dụng margin lợi nhuận
  const sellingPrice = priceInCNY * (1 + finalMargin / 100);

  return Math.round(sellingPrice * 100) / 100; // Làm tròn 2 chữ số thập phân
}

/**
 * Tính lợi nhuận từ giá gốc và giá bán
 */
export function calculateProfit(
  priceInBaht: number,
  sellingPrice: number,
  exchangeRate: ExchangeRateData
): number {
  const costInCNY = priceInBaht / exchangeRate.rate;
  const profit = sellingPrice - costInCNY;

  return Math.round(profit * 100) / 100;
}

/**
 * Tính margin % từ giá gốc và giá bán
 */
export function calculateMarginPercent(
  priceInBaht: number,
  sellingPrice: number,
  exchangeRate: ExchangeRateData
): number {
  const costInCNY = priceInBaht / exchangeRate.rate;
  const margin = ((sellingPrice - costInCNY) / costInCNY) * 100;

  return Math.round(margin * 100) / 100;
}

/**
 * Lấy tỷ giá hiện tại từ cache (không gọi API)
 */
export function getCachedRate(): ExchangeRateData | null {
  if (cachedRate && Date.now() < cacheExpiry) {
    return cachedRate;
  }
  return null;
}

/**
 * Xóa cache tỷ giá
 */
export function clearRateCache(): void {
  cachedRate = null;
  cacheExpiry = 0;
  console.log('🗑️ Đã xóa cache tỷ giá');
}

/**
 * Kiểm tra cache còn hiệu lực không
 */
export function isCacheValid(): boolean {
  return cachedRate !== null && Date.now() < cacheExpiry;
}

/**
 * Lấy thời gian còn lại của cache (ms)
 */
export function getCacheRemainingTime(): number {
  if (!isCacheValid()) {
    return 0;
  }
  return Math.max(0, cacheExpiry - Date.now());
}
