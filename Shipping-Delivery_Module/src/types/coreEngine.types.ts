// Weight Calculation Types
export interface WeightCalculationInput {
  actualWeight: number;
  length: number;
  width: number;
  height: number;
}

export interface WeightCalculationResult {
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  tier: PricingTier;
  isVolumetricHeavier: boolean;
}

// Category Classification Types
export interface CategorySuggestion {
  category: string;
  confidence: number;
  matchedKeywords: string[];
}

export interface CategoryKeywordFilter {
  category: string;
  keywords: string[];
  priority: number;
}

// Pricing Tier Types
export interface PricingTier {
  tier: number;
  minWeight: number;
  maxWeight: number;
  basePrice: number;
  description: string;
}

// Generic Result Type
export interface CoreEngineResult<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    field?: string;
  };
}

// Error Codes
export enum CoreEngineErrorCode {
  INVALID_WEIGHT = 'INVALID_WEIGHT',
  INVALID_DIMENSION = 'INVALID_DIMENSION',
  WEIGHT_EXCEEDS_LIMIT = 'WEIGHT_EXCEEDS_LIMIT',
  INVALID_PRODUCT_NAME = 'INVALID_PRODUCT_NAME',
  INVALID_INPUT = 'INVALID_INPUT',
}
