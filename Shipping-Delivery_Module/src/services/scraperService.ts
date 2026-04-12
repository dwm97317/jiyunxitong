/**
 * Web Scraper Service
 * Tích hợp Shopee, Lazada, BigC, Makro để lấy thông tin sản phẩm
 */

export type PlatformType = 'shopee' | 'lazada' | 'bigc' | 'makro';

export interface ProductData {
  name: string;
  price: number; // Baht
  image: string;
  url: string;
  platform: PlatformType;
  description?: string;
  rating?: number;
  reviews?: number;
  stock?: number;
  seller?: string;
}

export interface ScraperResult {
  success: boolean;
  data?: ProductData;
  error?: string;
}

/**
 * Phát hiện platform từ URL
 */
export function detectPlatform(url: string): PlatformType | null {
  const urlLower = url.toLowerCase();

  if (urlLower.includes('shopee')) return 'shopee';
  if (urlLower.includes('lazada')) return 'lazada';
  if (urlLower.includes('bigc')) return 'bigc';
  if (urlLower.includes('makro')) return 'makro';

  return null;
}

/**
 * Validate URL
 */
export function isValidProductUrl(url: string): boolean {
  try {
    new URL(url);
    return detectPlatform(url) !== null;
  } catch {
    return false;
  }
}

/**
 * Scrape sản phẩm từ Shopee
 * Mô phỏng - trong thực tế cần backend API
 */
async function scrapeShopee(url: string): Promise<ProductData> {
  // Mô phỏng dữ liệu Shopee
  // Trong thực tế, gọi backend API:
  // const response = await fetch(`/api/scrape/shopee?url=${encodeURIComponent(url)}`);
  // const data = await response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'iPhone 15 Pro Max 256GB',
        price: 45999,
        image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
        url,
        platform: 'shopee',
        description: 'Điện thoại thông minh cao cấp',
        rating: 4.8,
        reviews: 1250,
        stock: 50,
        seller: 'Official Store',
      });
    }, 500);
  });
}

/**
 * Scrape sản phẩm từ Lazada
 * Mô phỏng - trong thực tế cần backend API
 */
async function scrapeLazada(url: string): Promise<ProductData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Samsung Galaxy S24 Ultra 512GB',
        price: 39999,
        image: 'https://via.placeholder.com/300x300?text=Samsung+S24',
        url,
        platform: 'lazada',
        description: 'Điện thoại flagship Samsung',
        rating: 4.7,
        reviews: 890,
        stock: 30,
        seller: 'Samsung Official',
      });
    }, 500);
  });
}

/**
 * Scrape sản phẩm từ BigC
 * Mô phỏng - trong thực tế cần backend API
 */
async function scrapeBigC(url: string): Promise<ProductData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Nước Rửa Chén Sunlight 800ml',
        price: 89,
        image: 'https://via.placeholder.com/300x300?text=Sunlight',
        url,
        platform: 'bigc',
        description: 'Nước rửa chén hiệu quả',
        rating: 4.5,
        reviews: 450,
        stock: 200,
        seller: 'BigC',
      });
    }, 500);
  });
}

/**
 * Scrape sản phẩm từ Makro
 * Mô phỏng - trong thực tế cần backend API
 */
async function scrapeMakro(url: string): Promise<ProductData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Dầu Ăn Aroy-D 5L',
        price: 299,
        image: 'https://via.placeholder.com/300x300?text=Aroy-D',
        url,
        platform: 'makro',
        description: 'Dầu ăn chất lượng cao',
        rating: 4.6,
        reviews: 320,
        stock: 150,
        seller: 'Makro',
      });
    }, 500);
  });
}

/**
 * Scrape sản phẩm từ URL
 */
export async function scrapeProduct(url: string): Promise<ScraperResult> {
  try {
    // Validate URL
    if (!isValidProductUrl(url)) {
      return {
        success: false,
        error: 'URL không hợp lệ hoặc platform không được hỗ trợ',
      };
    }

    // Phát hiện platform
    const platform = detectPlatform(url);

    if (!platform) {
      return {
        success: false,
        error: 'Platform không được hỗ trợ',
      };
    }

    // Scrape dựa trên platform
    let productData: ProductData;

    switch (platform) {
      case 'shopee':
        productData = await scrapeShopee(url);
        break;
      case 'lazada':
        productData = await scrapeLazada(url);
        break;
      case 'bigc':
        productData = await scrapeBigC(url);
        break;
      case 'makro':
        productData = await scrapeMakro(url);
        break;
      default:
        return {
          success: false,
          error: 'Platform không được hỗ trợ',
        };
    }

    return {
      success: true,
      data: productData,
    };
  } catch (error) {
    return {
      success: false,
      error: `Lỗi scrape: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Scrape nhiều sản phẩm
 */
export async function scrapeMultipleProducts(urls: string[]): Promise<ScraperResult[]> {
  return Promise.all(urls.map((url) => scrapeProduct(url)));
}

/**
 * Định dạng giá tiền
 */
export function formatPrice(price: number, currency: 'THB' | 'CNY' = 'THB'): string {
  const symbol = currency === 'THB' ? '฿' : '¥';
  return `${symbol} ${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

/**
 * Lấy danh sách platform được hỗ trợ
 */
export function getSupportedPlatforms(): PlatformType[] {
  return ['shopee', 'lazada', 'bigc', 'makro'];
}

/**
 * Kiểm tra xem URL có phải là sản phẩm hợp lệ không
 */
export async function validateProductUrl(url: string): Promise<boolean> {
  const result = await scrapeProduct(url);
  return result.success;
}
