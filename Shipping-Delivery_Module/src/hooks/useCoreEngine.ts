import { useMemo, useCallback } from 'react';
import {
  WeightCalculationInput,
  WeightCalculationResult,
  CategorySuggestion,
  PricingTier,
  CoreEngineResult,
} from '../types/coreEngine.types';
import {
  calculateChargeableWeight,
  suggestCategory,
  getPricingTiers,
  validateWeightInput,
  validateProductName,
} from '../utils/coreEngine';

interface UseCoreEngineReturn {
  calculateWeight: (input: WeightCalculationInput) => CoreEngineResult<WeightCalculationResult>;
  suggestCategory: (productName: string) => CoreEngineResult<CategorySuggestion[]>;
  getPricingTiers: () => PricingTier[];
  validateWeightInput: (input: WeightCalculationInput) => CoreEngineResult<boolean>;
  validateProductName: (name: string) => CoreEngineResult<boolean>;
}

/**
 * React hook for Core Engine functionality
 */
export function useCoreEngine(): UseCoreEngineReturn {
  // Memoize pricing tiers (never changes)
  const tiers = useMemo(() => getPricingTiers(), []);

  // Memoize functions to prevent unnecessary recalculations
  const calculateWeight = useCallback((input: WeightCalculationInput) => {
    return calculateChargeableWeight(input);
  }, []);

  const suggestCategoryCallback = useCallback((productName: string) => {
    return suggestCategory(productName);
  }, []);

  const validateWeightInputCallback = useCallback((input: WeightCalculationInput) => {
    return validateWeightInput(input);
  }, []);

  const validateProductNameCallback = useCallback((name: string) => {
    return validateProductName(name);
  }, []);

  return {
    calculateWeight,
    suggestCategory: suggestCategoryCallback,
    getPricingTiers: () => tiers,
    validateWeightInput: validateWeightInputCallback,
    validateProductName: validateProductNameCallback,
  };
}
