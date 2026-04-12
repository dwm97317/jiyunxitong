import {
  WeightCalculationInput,
  WeightCalculationResult,
  CategorySuggestion,
  PricingTier,
  CoreEngineResult,
  CoreEngineErrorCode,
} from '../types/coreEngine.types';
import {
  PRICING_TIERS,
  DEFAULT_CATEGORY_KEYWORDS,
  ERROR_MESSAGES,
  MAX_WEIGHT_LIMIT,
  VOLUMETRIC_DIVISOR,
} from '../constants/pricingTiers';

/**
 * Validate weight calculation input
 */
export function validateWeightInput(input: WeightCalculationInput): CoreEngineResult<boolean> {
  if (!input) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.INVALID_INPUT,
        message: ERROR_MESSAGES.INVALID_INPUT,
      },
    };
  }

  if (input.actualWeight <= 0) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.INVALID_WEIGHT,
        message: ERROR_MESSAGES.INVALID_WEIGHT,
        field: 'actualWeight',
      },
    };
  }

  if (input.length <= 0 || input.width <= 0 || input.height <= 0) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.INVALID_DIMENSION,
        message: ERROR_MESSAGES.INVALID_DIMENSION,
        field: 'dimensions',
      },
    };
  }

  return { success: true, data: true };
}

/**
 * Calculate chargeable weight (MAX of actual vs volumetric)
 */
export function calculateChargeableWeight(
  input: WeightCalculationInput
): CoreEngineResult<WeightCalculationResult> {
  // Validate input
  const validation = validateWeightInput(input);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // Calculate volumetric weight
  const volumetricWeight = (input.length * input.width * input.height) / VOLUMETRIC_DIVISOR;

  // Determine chargeable weight (MAX of actual and volumetric)
  const chargeableWeight = Math.max(input.actualWeight, volumetricWeight);

  // Check weight limit
  if (chargeableWeight > MAX_WEIGHT_LIMIT) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.WEIGHT_EXCEEDS_LIMIT,
        message: ERROR_MESSAGES.WEIGHT_EXCEEDS_LIMIT,
        field: 'chargeableWeight',
      },
    };
  }

  // Determine pricing tier
  const tierResult = determinePricingTier(chargeableWeight);
  if (!tierResult.success) {
    return {
      success: false,
      error: tierResult.error,
    };
  }

  return {
    success: true,
    data: {
      actualWeight: input.actualWeight,
      volumetricWeight: parseFloat(volumetricWeight.toFixed(2)),
      chargeableWeight: parseFloat(chargeableWeight.toFixed(2)),
      tier: tierResult.data!,
      isVolumetricHeavier: volumetricWeight > input.actualWeight,
    },
  };
}

/**
 * Determine pricing tier based on weight
 */
export function determinePricingTier(weight: number): CoreEngineResult<PricingTier> {
  if (weight < 0) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.INVALID_WEIGHT,
        message: ERROR_MESSAGES.INVALID_WEIGHT,
      },
    };
  }

  if (weight > MAX_WEIGHT_LIMIT) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.WEIGHT_EXCEEDS_LIMIT,
        message: ERROR_MESSAGES.WEIGHT_EXCEEDS_LIMIT,
      },
    };
  }

  // Find the appropriate tier
  for (const tier of PRICING_TIERS) {
    if (weight >= tier.minWeight && weight <= tier.maxWeight) {
      return { success: true, data: tier };
    }
  }

  // Fallback to last tier if weight is at boundary
  return { success: true, data: PRICING_TIERS[PRICING_TIERS.length - 1] };
}

/**
 * Validate product name
 */
export function validateProductName(name: string): CoreEngineResult<boolean> {
  if (!name || name.trim().length === 0) {
    return {
      success: false,
      error: {
        code: CoreEngineErrorCode.INVALID_PRODUCT_NAME,
        message: ERROR_MESSAGES.INVALID_PRODUCT_NAME,
        field: 'productName',
      },
    };
  }

  return { success: true, data: true };
}

/**
 * Suggest categories based on product name
 */
export function suggestCategory(productName: string): CoreEngineResult<CategorySuggestion[]> {
  // Validate input
  const validation = validateProductName(productName);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error,
    };
  }

  const normalizedName = productName.toLowerCase().trim();
  const suggestions: CategorySuggestion[] = [];

  // Check each category
  for (const categoryFilter of DEFAULT_CATEGORY_KEYWORDS) {
    if (categoryFilter.keywords.length === 0) {
      // Skip "Khác" category for now
      continue;
    }

    let matchCount = 0;
    const matchedKeywords: string[] = [];

    // Count keyword matches
    for (const keyword of categoryFilter.keywords) {
      if (normalizedName.includes(keyword.toLowerCase())) {
        matchCount++;
        matchedKeywords.push(keyword);
      }
    }

    // Calculate confidence
    if (matchCount > 0) {
      const confidence = matchCount / categoryFilter.keywords.length;
      suggestions.push({
        category: categoryFilter.category,
        confidence: parseFloat(confidence.toFixed(2)),
        matchedKeywords,
      });
    }
  }

  // Sort by confidence (descending)
  suggestions.sort((a, b) => b.confidence - a.confidence);

  // If no suggestions, add "Khác"
  if (suggestions.length === 0) {
    suggestions.push({
      category: 'Khác',
      confidence: 0,
      matchedKeywords: [],
    });
  }

  // Return top 3 suggestions
  return {
    success: true,
    data: suggestions.slice(0, 3),
  };
}

/**
 * Get all pricing tiers
 */
export function getPricingTiers(): PricingTier[] {
  return PRICING_TIERS;
}

/**
 * Get error message by code
 */
export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] || ERROR_MESSAGES.INVALID_INPUT;
}
