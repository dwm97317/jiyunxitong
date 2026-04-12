/**
 * Buying Service Fee Service
 * Tính phí mua hộ tự động dựa trên bậc thang giá trị đơn hàng
 */

export interface FeeTier {
  minAmount: number; // Baht
  maxAmount: number; // Baht
  feePercent: number; // %
  description: string;
}

export interface FeeCalculationResult {
  totalAmount: number; // Baht
  feePercent: number; // %
  feeAmount: number; // CNY
  finalPrice: number; // CNY (totalAmount + fee)
  tier: FeeTier;
}

/**
 * Bảng phí mua hộ bậc thang
 * Dựa trên tổng giá trị đơn hàng (Baht)
 */
export const BUYING_SERVICE_FEES: FeeTier[] = [
  {
    minAmount: 0,
    maxAmount: 1000,
    feePercent: 4,
    description: '0-1,000 Baht: 4%',
  },
  {
    minAmount: 1000,
    maxAmount: 5000,
    feePercent: 3,
    description: '1,000-5,000 Baht: 3%',
  },
  {
    minAmount: 5000,
    maxAmount: 10000,
    feePercent: 2.5,
    description: '5,000-10,000 Baht: 2.5%',
  },
  {
    minAmount: 10000,
    maxAmount: Infinity,
    feePercent: 2,
    description: '> 10,000 Baht: 2%',
  },
];

/**
 * Tìm bậc phí phù hợp dựa trên tổng tiền
 */
export function findFeeTier(totalAmountBaht: number): FeeTier {
  const tier = BUYING_SERVICE_FEES.find(
    (t) => totalAmountBaht >= t.minAmount && totalAmountBaht < t.maxAmount
  );

  if (!tier) {
    // Fallback: Sử dụng bậc cuối cùng
    return BUYING_SERVICE_FEES[BUYING_SERVICE_FEES.length - 1];
  }

  return tier;
}

/**
 * Tính phí mua hộ
 * @param totalAmountBaht - Tổng giá trị đơn hàng (Baht)
 * @param exchangeRate - Tỷ giá CNY/THB (mặc định: 5.2)
 * @returns Kết quả tính phí
 */
export function calculateBuyingServiceFee(
  totalAmountBaht: number,
  exchangeRate: number = 5.2
): FeeCalculationResult {
  // Validate input
  if (totalAmountBaht <= 0) {
    throw new Error('Tổng tiền phải lớn hơn 0');
  }

  if (exchangeRate <= 0) {
    throw new Error('Tỷ giá phải lớn hơn 0');
  }

  // Tìm bậc phí
  const tier = findFeeTier(totalAmountBaht);

  // Tính phí (Baht)
  const feeBaht = totalAmountBaht * (tier.feePercent / 100);

  // Chuyển đổi sang CNY
  const feeCNY = feeBaht / exchangeRate;
  const totalCNY = totalAmountBaht / exchangeRate + feeCNY;

  return {
    totalAmount: totalAmountBaht,
    feePercent: tier.feePercent,
    feeAmount: Math.round(feeCNY * 100) / 100,
    finalPrice: Math.round(totalCNY * 100) / 100,
    tier,
  };
}

/**
 * Tính phí cho nhiều sản phẩm
 */
export function calculateBulkBuyingServiceFee(
  items: Array<{ name: string; priceBaht: number; quantity: number }>,
  exchangeRate: number = 5.2
): {
  items: Array<{
    name: string;
    priceBaht: number;
    quantity: number;
    subtotal: number;
  }>;
  totalAmount: number;
  feeResult: FeeCalculationResult;
} {
  // Tính tổng tiền
  const items_with_subtotal = items.map((item) => ({
    ...item,
    subtotal: item.priceBaht * item.quantity,
  }));

  const totalAmount = items_with_subtotal.reduce((sum, item) => sum + item.subtotal, 0);

  // Tính phí
  const feeResult = calculateBuyingServiceFee(totalAmount, exchangeRate);

  return {
    items: items_with_subtotal,
    totalAmount,
    feeResult,
  };
}

/**
 * Lấy danh sách tất cả bậc phí
 */
export function getAllFeeTiers(): FeeTier[] {
  return BUYING_SERVICE_FEES;
}

/**
 * Định dạng tiền tệ
 */
export function formatCurrency(amount: number, currency: 'CNY' | 'THB' = 'CNY'): string {
  const symbol = currency === 'CNY' ? '¥' : '฿';
  return `${symbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Tính giá bán lẻ (cost + fee + margin)
 */
export function calculateRetailPrice(
  costBaht: number,
  marginPercent: number = 10,
  exchangeRate: number = 5.2
): {
  costCNY: number;
  feeCNY: number;
  marginCNY: number;
  retailPrice: number;
} {
  const feeResult = calculateBuyingServiceFee(costBaht, exchangeRate);
  const costCNY = costBaht / exchangeRate;
  const feeCNY = feeResult.feeAmount;
  const totalCost = costCNY + feeCNY;
  const marginCNY = totalCost * (marginPercent / 100);
  const retailPrice = totalCost + marginCNY;

  return {
    costCNY: Math.round(costCNY * 100) / 100,
    feeCNY,
    marginCNY: Math.round(marginCNY * 100) / 100,
    retailPrice: Math.round(retailPrice * 100) / 100,
  };
}
