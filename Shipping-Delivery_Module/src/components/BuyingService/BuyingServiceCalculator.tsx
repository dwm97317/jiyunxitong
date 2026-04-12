import React, { useState, useMemo } from 'react';
import { ChevronLeft, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import {
  calculateBuyingServiceFee,
  calculateBulkBuyingServiceFee,
  calculateRetailPrice,
  formatCurrency,
  getAllFeeTiers,
} from '../../services/buyingServiceFeeService';
import { getExchangeRate } from '../../services/exchangeRateService';

interface OrderItem {
  id: string;
  name: string;
  priceBaht: number;
  quantity: number;
}

export default function BuyingServiceCalculator() {
  const [items, setItems] = useState<OrderItem[]>([
    { id: '1', name: 'iPhone 15 Pro Max', priceBaht: 45999, quantity: 1 },
  ]);
  const [exchangeRate, setExchangeRate] = useState<number>(5.2);
  const [marginPercent, setMarginPercent] = useState<number>(10);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemPrice, setNewItemPrice] = useState<string>('');
  const [newItemQty, setNewItemQty] = useState<string>('1');

  // Tính toán
  const calculation = useMemo(() => {
    if (items.length === 0) {
      return null;
    }

    return calculateBulkBuyingServiceFee(items, exchangeRate);
  }, [items, exchangeRate]);

  const retailPrices = useMemo(() => {
    if (!calculation) return [];

    return calculation.items.map((item) => ({
      ...item,
      retailPrice: calculateRetailPrice(item.subtotal, marginPercent, exchangeRate),
    }));
  }, [calculation, marginPercent, exchangeRate]);

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemPrice.trim()) {
      alert('Vui lòng nhập tên và giá sản phẩm');
      return;
    }

    const price = parseFloat(newItemPrice);
    const qty = parseInt(newItemQty) || 1;

    if (price <= 0 || qty <= 0) {
      alert('Giá và số lượng phải lớn hơn 0');
      return;
    }

    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: newItemName,
      priceBaht: price,
      quantity: qty,
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemPrice('');
    setNewItemQty('1');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof OrderItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'priceBaht' || field === 'quantity' ? parseFloat(value) || 0 : value,
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10">
      {/* Header */}
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-10 shadow-sm">
        <button className="p-1">
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">购物代理计算器</h1>
        <button className="p-1">
          <MoreHorizontal size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
        {/* Exchange Rate */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-800 font-medium">汇率 (CNY/THB)</span>
            <div className="flex items-center bg-[#F8F9FA] rounded-lg border border-gray-100 p-1">
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 5.2)}
                className="w-20 text-center outline-none text-[15px] font-bold bg-transparent"
                step="0.1"
              />
              <span className="text-gray-600 text-[13px] ml-1">฿/¥</span>
            </div>
          </div>
          <div className="text-[12px] text-gray-500">当前: 1 CNY = {exchangeRate} THB</div>
        </div>

        {/* Margin */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-800 font-medium">利润率 (%)</span>
            <div className="flex items-center bg-[#F8F9FA] rounded-lg border border-gray-100 p-1">
              <input
                type="number"
                value={marginPercent}
                onChange={(e) => setMarginPercent(parseFloat(e.target.value) || 0)}
                className="w-20 text-center outline-none text-[15px] font-bold bg-transparent"
                step="1"
              />
              <span className="text-gray-600 text-[13px] ml-1">%</span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-gray-800 font-medium mb-3">商品列表</div>

          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2 p-3 bg-[#F8F9FA] rounded-lg">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                    className="w-full text-[13px] font-medium text-gray-800 bg-transparent outline-none mb-1"
                  />
                  <div className="flex gap-2 text-[12px]">
                    <input
                      type="number"
                      value={item.priceBaht}
                      onChange={(e) => handleUpdateItem(item.id, 'priceBaht', e.target.value)}
                      className="w-20 px-2 py-1 bg-white border border-gray-200 rounded outline-none"
                      placeholder="价格"
                    />
                    <span className="text-gray-500">฿</span>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                      className="w-16 px-2 py-1 bg-white border border-gray-200 rounded outline-none"
                      placeholder="数量"
                    />
                    <span className="text-gray-500">件</span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Add Item */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="商品名称"
              className="w-full px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg outline-none"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                placeholder="价格 (฿)"
                className="flex-1 px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg outline-none"
              />
              <input
                type="number"
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
                placeholder="数量"
                className="w-20 px-3 py-2 text-[13px] bg-white border border-gray-200 rounded-lg outline-none"
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Fee Tiers */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-gray-800 font-medium mb-3">费用等级</div>
          <div className="space-y-2">
            {getAllFeeTiers().map((tier, idx) => (
              <div key={idx} className="flex items-center justify-between text-[12px] p-2 bg-[#F8F9FA] rounded">
                <span className="text-gray-600">{tier.description}</span>
                <span className="text-blue-600 font-medium">{tier.feePercent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        {calculation && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 shadow-sm border border-blue-100">
            <div className="text-gray-800 font-bold mb-4 text-[15px]">计算结果</div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-[13px]">商品总价</span>
                <span className="text-gray-900 font-bold">{formatCurrency(calculation.totalAmount, 'THB')}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-[13px]">
                  代理费 ({calculation.feeResult.feePercent}%)
                </span>
                <span className="text-gray-900 font-bold">{formatCurrency(calculation.feeResult.feeAmount)}</span>
              </div>

              <div className="border-t border-blue-200 pt-3 flex justify-between items-center">
                <span className="text-gray-800 font-medium text-[14px]">成本总计</span>
                <span className="text-blue-600 font-bold text-[16px]">
                  {formatCurrency(calculation.feeResult.finalPrice)}
                </span>
              </div>

              {retailPrices.length > 0 && (
                <div className="border-t border-blue-200 pt-3">
                  <div className="text-gray-800 font-medium text-[13px] mb-2">零售价格 (含{marginPercent}%利润)</div>
                  <div className="space-y-1">
                    {retailPrices.map((item) => (
                      <div key={item.name} className="flex justify-between text-[12px]">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="text-green-600 font-bold">
                          {formatCurrency(item.retailPrice.retailPrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white px-5 py-3 absolute bottom-0 w-full z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] border-t border-gray-100">
        <button className="w-full bg-blue-600 text-white px-8 py-3.5 rounded-full text-[15px] font-medium shadow-md shadow-blue-200 active:scale-95 transition-all">
          确认订单
        </button>
      </div>
    </div>
  );
}
