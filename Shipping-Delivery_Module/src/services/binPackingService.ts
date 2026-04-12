/**
 * Bin Packing Service
 * Thuật toán gom hàng thông minh để tối ưu hóa chi phí vận chuyển
 */

export interface Parcel {
  id: string;
  customerId: string;
  weight: number; // kg
  volume: number; // cm³
  name: string;
  createdAt: number;
}

export interface Bale {
  id: string;
  parcels: Parcel[];
  totalWeight: number;
  totalVolume: number;
  createdAt: number;
  estimatedCost: number;
}

export interface BinPackingConfig {
  maxWeight: number; // kg
  maxVolume: number; // cm³
  sameCustomerOnly: boolean; // Chỉ gom hàng của cùng khách
}

const DEFAULT_CONFIG: BinPackingConfig = {
  maxWeight: 500, // kg
  maxVolume: 1000000, // cm³ (1m³)
  sameCustomerOnly: true,
};

/**
 * First Fit Decreasing Algorithm
 * Sắp xếp hàng theo trọng lượng giảm dần, sau đó gom vào bale
 */
export function suggestGrouping(parcels: Parcel[], config: Partial<BinPackingConfig> = {}): Bale[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  if (parcels.length === 0) {
    return [];
  }

  // Sắp xếp theo trọng lượng giảm dần
  const sorted = [...parcels].sort((a, b) => b.weight - a.weight);

  const bales: Bale[] = [];

  for (const parcel of sorted) {
    let placed = false;

    // Tìm bale phù hợp
    for (const bale of bales) {
      const canFit =
        bale.totalWeight + parcel.weight <= finalConfig.maxWeight &&
        bale.totalVolume + parcel.volume <= finalConfig.maxVolume;

      const sameCustomer = !finalConfig.sameCustomerOnly || bale.parcels[0].customerId === parcel.customerId;

      if (canFit && sameCustomer) {
        bale.parcels.push(parcel);
        bale.totalWeight += parcel.weight;
        bale.totalVolume += parcel.volume;
        bale.estimatedCost = calculateBaleCost(bale);
        placed = true;
        break;
      }
    }

    // Tạo bale mới nếu không tìm được
    if (!placed) {
      const newBale: Bale = {
        id: `BALE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        parcels: [parcel],
        totalWeight: parcel.weight,
        totalVolume: parcel.volume,
        createdAt: Date.now(),
        estimatedCost: calculateBaleCost({
          id: '',
          parcels: [parcel],
          totalWeight: parcel.weight,
          totalVolume: parcel.volume,
          createdAt: Date.now(),
          estimatedCost: 0,
        }),
      };

      bales.push(newBale);
    }
  }

  return bales;
}

/**
 * Best Fit Decreasing Algorithm
 * Tìm bale có chỗ trống ít nhất để gom hàng
 */
export function suggestGroupingBestFit(parcels: Parcel[], config: Partial<BinPackingConfig> = {}): Bale[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  if (parcels.length === 0) {
    return [];
  }

  // Sắp xếp theo trọng lượng giảm dần
  const sorted = [...parcels].sort((a, b) => b.weight - a.weight);

  const bales: Bale[] = [];

  for (const parcel of sorted) {
    let bestBale: Bale | null = null;
    let minWaste = Infinity;

    // Tìm bale có chỗ trống ít nhất
    for (const bale of bales) {
      const canFit =
        bale.totalWeight + parcel.weight <= finalConfig.maxWeight &&
        bale.totalVolume + parcel.volume <= finalConfig.maxVolume;

      const sameCustomer = !finalConfig.sameCustomerOnly || bale.parcels[0].customerId === parcel.customerId;

      if (canFit && sameCustomer) {
        const waste = finalConfig.maxWeight - (bale.totalWeight + parcel.weight);

        if (waste < minWaste) {
          minWaste = waste;
          bestBale = bale;
        }
      }
    }

    // Gom vào bale tốt nhất
    if (bestBale) {
      bestBale.parcels.push(parcel);
      bestBale.totalWeight += parcel.weight;
      bestBale.totalVolume += parcel.volume;
      bestBale.estimatedCost = calculateBaleCost(bestBale);
    } else {
      // Tạo bale mới
      const newBale: Bale = {
        id: `BALE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        parcels: [parcel],
        totalWeight: parcel.weight,
        totalVolume: parcel.volume,
        createdAt: Date.now(),
        estimatedCost: calculateBaleCost({
          id: '',
          parcels: [parcel],
          totalWeight: parcel.weight,
          totalVolume: parcel.volume,
          createdAt: Date.now(),
          estimatedCost: 0,
        }),
      };

      bales.push(newBale);
    }
  }

  return bales;
}

/**
 * Tính chi phí vận chuyển cho một bale
 * Dựa trên trọng lượng
 */
export function calculateBaleCost(bale: Bale): number {
  // Bảng giá tham khảo (CNY)
  if (bale.totalWeight <= 3) return 15;
  if (bale.totalWeight <= 10) return 25;
  if (bale.totalWeight <= 50) return 45;
  if (bale.totalWeight <= 500) return 120;
  return 500;
}

/**
 * Tính tổng chi phí vận chuyển
 */
export function calculateTotalCost(bales: Bale[]): number {
  return bales.reduce((sum, bale) => sum + bale.estimatedCost, 0);
}

/**
 * Tính hiệu suất gom hàng (%)
 * Càng cao càng tốt (ít bale hơn)
 */
export function calculatePackingEfficiency(parcels: Parcel[], bales: Bale[]): number {
  if (bales.length === 0) return 0;

  const totalWeight = parcels.reduce((sum, p) => sum + p.weight, 0);
  const totalCapacity = bales.length * 500; // Max weight per bale

  return Math.round((totalWeight / totalCapacity) * 100);
}

/**
 * So sánh chi phí giữa hai phương pháp gom hàng
 */
export function comparePackingMethods(parcels: Parcel[], config: Partial<BinPackingConfig> = {}) {
  const ffd = suggestGrouping(parcels, config);
  const bfd = suggestGroupingBestFit(parcels, config);

  const ffdCost = calculateTotalCost(ffd);
  const bfdCost = calculateTotalCost(bfd);

  return {
    ffd: {
      bales: ffd.length,
      cost: ffdCost,
      efficiency: calculatePackingEfficiency(parcels, ffd),
    },
    bfd: {
      bales: bfd.length,
      cost: bfdCost,
      efficiency: calculatePackingEfficiency(parcels, bfd),
    },
    savings: ffdCost - bfdCost,
    recommendation: bfdCost < ffdCost ? 'Best Fit Decreasing' : 'First Fit Decreasing',
  };
}

/**
 * Lấy thống kê gom hàng
 */
export function getPackingStatistics(bales: Bale[]) {
  if (bales.length === 0) {
    return {
      totalBales: 0,
      totalParcels: 0,
      totalWeight: 0,
      totalVolume: 0,
      totalCost: 0,
      avgWeightPerBale: 0,
      avgParcelsPerBale: 0,
    };
  }

  const totalParcels = bales.reduce((sum, b) => sum + b.parcels.length, 0);
  const totalWeight = bales.reduce((sum, b) => sum + b.totalWeight, 0);
  const totalVolume = bales.reduce((sum, b) => sum + b.totalVolume, 0);
  const totalCost = calculateTotalCost(bales);

  return {
    totalBales: bales.length,
    totalParcels,
    totalWeight,
    totalVolume,
    totalCost,
    avgWeightPerBale: Math.round((totalWeight / bales.length) * 100) / 100,
    avgParcelsPerBale: Math.round((totalParcels / bales.length) * 100) / 100,
  };
}

/**
 * Xuất bale thành JSON
 */
export function exportBales(bales: Bale[]): string {
  return JSON.stringify(bales, null, 2);
}

/**
 * Nhập bale từ JSON
 */
export function importBales(json: string): Bale[] {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Lỗi nhập bale:', error);
    return [];
  }
}
