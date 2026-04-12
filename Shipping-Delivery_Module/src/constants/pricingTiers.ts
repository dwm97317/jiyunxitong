import { PricingTier, CategoryKeywordFilter } from '../types/coreEngine.types';

export const PRICING_TIERS: PricingTier[] = [
  {
    tier: 1,
    minWeight: 0,
    maxWeight: 3,
    basePrice: 15,
    description: '0-3kg',
  },
  {
    tier: 2,
    minWeight: 3,
    maxWeight: 10,
    basePrice: 25,
    description: '3-10kg',
  },
  {
    tier: 3,
    minWeight: 10,
    maxWeight: 50,
    basePrice: 45,
    description: '10-50kg',
  },
  {
    tier: 4,
    minWeight: 50,
    maxWeight: 500,
    basePrice: 120,
    description: '50-500kg',
  },
  {
    tier: 5,
    minWeight: 500,
    maxWeight: 2000,
    basePrice: 500,
    description: '500kg-2T',
  },
];

export const DEFAULT_CATEGORY_KEYWORDS: CategoryKeywordFilter[] = [
  {
    category: 'Điện Tử',
    keywords: ['điện thoại', 'laptop', 'máy tính', 'tablet', 'camera', 'tivi', 'loa', 'tai nghe', 'sạc'],
    priority: 10,
  },
  {
    category: 'Quần Áo',
    keywords: ['áo', 'quần', 'váy', 'giày', 'dép', 'tất', 'áo khoác', 'áo sơ mi', 'áo phông'],
    priority: 9,
  },
  {
    category: 'Sách',
    keywords: ['sách', 'truyện', 'tạp chí', 'báo', 'sách giáo khoa', 'tiểu thuyết'],
    priority: 8,
  },
  {
    category: 'Thực Phẩm',
    keywords: ['thực phẩm', 'đồ ăn', 'nước', 'trái cây', 'rau', 'thịt', 'cá', 'tôm', 'bánh'],
    priority: 7,
  },
  {
    category: 'Mỹ Phẩm',
    keywords: ['mỹ phẩm', 'kem', 'dầu gội', 'xà phòng', 'nước hoa', 'son', 'phấn', 'mascara'],
    priority: 6,
  },
  {
    category: 'Đồ Gia Dụng',
    keywords: ['nồi', 'chảo', 'bát', 'đũa', 'dao', 'thìa', 'tủ', 'bàn', 'ghế', 'giường'],
    priority: 5,
  },
  {
    category: 'Công Cụ',
    keywords: ['búa', 'cưa', 'khoan', 'vít', 'kìm', 'thước', 'cờ lê', 'tuốc nơ vít'],
    priority: 4,
  },
  {
    category: 'Khác',
    keywords: [],
    priority: 1,
  },
];

export const ERROR_MESSAGES: Record<string, string> = {
  INVALID_WEIGHT: 'Trọng lượng thực tế phải lớn hơn 0',
  INVALID_DIMENSION: 'Kích thước phải lớn hơn 0',
  WEIGHT_EXCEEDS_LIMIT: 'Trọng lượng vượt quá giới hạn cho phép (2000kg). Vui lòng liên hệ bộ phận hỗ trợ',
  INVALID_PRODUCT_NAME: 'Tên hàng hóa không được để trống',
  INVALID_INPUT: 'Dữ liệu đầu vào không hợp lệ',
};

export const MAX_WEIGHT_LIMIT = 2000; // kg
export const VOLUMETRIC_DIVISOR = 5000; // cm³ to kg conversion
