import { ChevronLeft, MoreHorizontal, Circle } from 'lucide-react';

export default function OrderDetail({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-[#F5F5F5] min-h-full pb-10 font-sans">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
        <h1 className="text-[17px] font-medium">极光转运</h1>
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-full px-2.5 py-1">
          <MoreHorizontal className="w-4 h-4 text-black" />
          <div className="w-[1px] h-3.5 bg-gray-300"></div>
          <Circle className="w-4 h-4 text-black" />
        </div>
      </div>

      <div className="p-3">
        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm relative">
          
          {/* Top Banner */}
          <div className="bg-[#FFF8F2] px-4 py-3.5 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center text-[#3B5998] font-bold text-[18px] italic">
              <span className="mr-1.5 text-[20px]">JG</span> 极光转运
            </div>
            <div className="text-[#E87A3E] text-[14px]">国际出口经济快递</div>
          </div>

          {/* Recipient Info */}
          <div className="px-4 py-5 flex items-start relative">
            <div className="w-8 h-8 bg-[#FFF1E6] text-[#E87A3E] rounded-full flex items-center justify-center text-[13px] font-medium mr-3 shrink-0">
              收
            </div>
            <div>
              <div className="flex items-baseline mb-1.5">
                <span className="text-[17px] font-bold mr-4 text-gray-800">何宇</span>
                <span className="text-[17px] font-bold text-gray-800">18713596669</span>
              </div>
              <div className="text-gray-500 text-[13px]">北京市朝阳区将府家园109号楼1601室</div>
            </div>
          </div>

          {/* Divider with cutouts */}
          <div className="relative h-4 flex items-center">
            <div className="absolute left-0 w-3 h-3 bg-[#F5F5F5] rounded-full -translate-x-1/2"></div>
            <div className="w-full border-t border-dashed border-gray-200 mx-3"></div>
            <div className="absolute right-0 w-3 h-3 bg-[#F5F5F5] rounded-full translate-x-1/2"></div>
          </div>

          {/* Order Info */}
          <div className="px-4 py-4 space-y-3.5 text-[14px]">
            <div className="flex justify-between">
              <span className="text-gray-500">订单编号：</span>
              <span className="text-gray-800">1234567890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">运单号：</span>
              <span className="text-gray-800">SF1437829133905</span>
            </div>
          </div>

          {/* Divider with cutouts */}
          <div className="relative h-4 flex items-center">
            <div className="absolute left-0 w-3 h-3 bg-[#F5F5F5] rounded-full -translate-x-1/2"></div>
            <div className="w-full border-t border-dashed border-gray-200 mx-3"></div>
            <div className="absolute right-0 w-3 h-3 bg-[#F5F5F5] rounded-full translate-x-1/2"></div>
          </div>

          {/* Goods Info */}
          <div className="px-4 py-4 space-y-3.5 text-[14px]">
            <div className="flex justify-between">
              <span className="text-gray-500">货物信息：</span>
              <span className="text-gray-800">化妆品</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">货物体积：</span>
              <span className="text-gray-800">21kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">货物重量：</span>
              <span className="text-gray-800">18kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">货物件数：</span>
              <span className="text-gray-800">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">到达网点：</span>
              <span className="text-gray-800">大宁营业厅</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">申报价值：</span>
              <span className="text-gray-800">¥ 2000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">保价金额：</span>
              <span className="text-gray-800">¥ 2000</span>
            </div>
          </div>

          {/* Divider with cutouts */}
          <div className="relative h-4 flex items-center">
            <div className="absolute left-0 w-3 h-3 bg-[#F5F5F5] rounded-full -translate-x-1/2"></div>
            <div className="w-full border-t border-dashed border-gray-200 mx-3"></div>
            <div className="absolute right-0 w-3 h-3 bg-[#F5F5F5] rounded-full translate-x-1/2"></div>
          </div>

          {/* Billing Info */}
          <div className="px-4 py-4 space-y-3.5 text-[14px] rounded-b-xl">
            <div className="flex justify-between">
              <span className="text-gray-500">开单时间：</span>
              <span className="text-gray-800">2020/02/15 18:47:48</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">费用明细：</span>
              <span className="text-[#3B5998] cursor-pointer">立即查看</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-500">总消费金额：</span>
              <span className="text-[#FF4D4F] font-bold text-[18px]">¥ 256</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
