import { useState, useCallback } from 'react';
import {
  calculateBuyingServiceFee,
  calculateBulkBuyingServiceFee,
  calculateRetailPrice,
  FeeCalculationResult,
} from '../services/buyingServiceFeeService';
import { getExchangeRate, ExchangeRateData } from '../services/exchangeRateService';
import { scrapeProduct, ScraperResult } from '../services/scraperService';

export function useBuyingService() {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy tỷ giá
  const fetchExchangeRate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const rate = await getExchangeRate();
      setExchangeRate(rate);
      return rate;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch exchange rate';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Tính phí mua hộ
  const calculateFee = useCallback(
    (totalBaht: number, rate?: number): FeeCalculationResult => {
      const finalRate = rate || exchangeRate?.rate || 5.2;
      return calculateBuyingServiceFee(totalBaht, finalRate);
    },
    [exchangeRate]
  );

  // Tính phí cho nhiều sản phẩm
  const calculateBulkFee = useCallback(
    (items: Array<{ name: string; priceBaht: number; quantity: number }>, rate?: number) => {
      const finalRate = rate || exchangeRate?.rate || 5.2;
      return calculateBulkBuyingServiceFee(items, finalRate);
    },
    [exchangeRate]
  );

  // Tính giá bán lẻ
  const calculateRetail = useCallback(
    (costBaht: number, margin: number = 10, rate?: number) => {
      const finalRate = rate || exchangeRate?.rate || 5.2;
      return calculateRetailPrice(costBaht, margin, finalRate);
    },
    [exchangeRate]
  );

  return {
    exchangeRate,
    loading,
    error,
    fetchExchangeRate,
    calculateFee,
    calculateBulkFee,
    calculateRetail,
  };
}

export function useProductScraper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrape = useCallback(async (url: string): Promise<ScraperResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = await scrapeProduct(url);

      if (!result.success) {
        setError(result.error || 'Unknown error');
      }

      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to scrape product';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    scrape,
  };
}
