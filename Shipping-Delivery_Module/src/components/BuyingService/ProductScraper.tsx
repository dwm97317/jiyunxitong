import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Search, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { scrapeProduct, getSupportedPlatforms, formatPrice } from '../../services/scraperService';
import type { ProductData, ScraperResult } from '../../services/scraperService';

export default function ProductScraper() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ScraperResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const handleScrape = async () => {
    if (!url.trim()) {
      alert('请输入商品链接');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const scraperResult = await scrapeProduct(url);
      setResult(scraperResult);

      if (scraperResult.success && scraperResult.data) {
        setSelectedProduct(scraperResult.data);
      }
    } catch (error) {
      setResult({
        success: false,
        error: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      alert(`已添加: ${selectedProduct.name}\n价格: ${formatPrice(selectedProduct.price)}`);
      setUrl('');
      setResult(null);
      setSelectedProduct(null);
    }
  };

  const platforms = getSupportedPlatforms();

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button className="p-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">商品爬虫</h1>
        <button className="p-1">
          <MoreHorizontal size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Supported Platforms */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-gray-800 font-medium mb-3 text-[13px]">支持的平台</div>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <div
                key={platform}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[12px] font-medium border border-blue-100"
              >
                {platform.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* URL Input */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-gray-800 font-medium mb-3">输入商品链接</div>

          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleScrape()}
                placeholder="粘贴 Shopee/Lazada/BigC/Makro 链接..."
                className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-blue-400 transition-colors"
              />
            </div>
            <button
              onClick={handleScrape}
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium text-[13px]"
            >
              {loading ? <Loader size={16} className="animate-spin" /> : '搜索'}
            </button>
          </div>

          <div className="text-[11px] text-gray-500">
            💡 提示: 复制商品链接并粘贴到上方输入框，系统将自动获取商品信息
          </div>
        </div>

        {/* Error Message */}
        {result && !result.success && (
          <div className="bg-red-50 rounded-xl p-4 border border-red-100 flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-800 font-medium text-[13px]">错误</div>
              <div className="text-red-700 text-[12px] mt-1">{result.error}</div>
            </div>
          </div>
        )}

        {/* Product Result */}
        {selectedProduct && (
          <div className="bg-white rounded-xl p-4 shadow-sm border-2 border-green-100">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-[#F8F9FA] rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-gray-900 font-bold text-[14px] mb-1">{selectedProduct.name}</div>
                    <div className="text-[11px] text-gray-500">
                      平台: <span className="font-medium text-blue-600">{selectedProduct.platform.toUpperCase()}</span>
                    </div>
                  </div>
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-[12px]">价格</span>
                    <span className="text-green-600 font-bold text-[15px]">
                      {formatPrice(selectedProduct.price, 'THB')}
                    </span>
                  </div>

                  {selectedProduct.rating && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-[12px]">评分</span>
                      <span className="text-yellow-500 font-medium text-[12px]">
                        ⭐ {selectedProduct.rating} ({selectedProduct.reviews} 评价)
                      </span>
                    </div>
                  )}

                  {selectedProduct.stock !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-[12px]">库存</span>
                      <span className={`font-medium text-[12px] ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedProduct.stock > 0 ? `${selectedProduct.stock} 件` : '缺货'}
                      </span>
                    </div>
                  )}

                  {selectedProduct.seller && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-[12px]">卖家</span>
                      <span className="text-gray-800 font-medium text-[12px]">{selectedProduct.seller}</span>
                    </div>
                  )}
                </div>

                {selectedProduct.description && (
                  <div className="text-[11px] text-gray-500 line-clamp-2 mb-3">
                    {selectedProduct.description}
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-[13px]"
                >
                  添加到购物车
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex gap-3 items-center">
            <Loader size={20} className="text-blue-600 animate-spin" />
            <div>
              <div className="text-blue-800 font-medium text-[13px]">正在获取商品信息...</div>
              <div className="text-blue-700 text-[12px] mt-1">请稍候</div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!result && !loading && (
          <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
            <div className="text-indigo-900 font-medium text-[13px] mb-2">📖 使用说明</div>
            <div className="text-indigo-800 text-[12px] space-y-1">
              <div>1. 在 Shopee、Lazada、BigC 或 Makro 上找到商品</div>
              <div>2. 复制商品链接</div>
              <div>3. 粘贴到上方输入框</div>
              <div>4. 点击"搜索"按钮</div>
              <div>5. 系统将自动获取商品信息并显示价格</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      {selectedProduct && (
        <div className="bg-white px-5 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setUrl('');
                setResult(null);
                setSelectedProduct(null);
              }}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-800 rounded-full font-medium text-[15px] hover:bg-gray-50 transition-colors"
            >
              继续搜索
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-full font-medium text-[15px] shadow-md shadow-green-200 active:scale-95 transition-all"
            >
              添加到购物车
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
