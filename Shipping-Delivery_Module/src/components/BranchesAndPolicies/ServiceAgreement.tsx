import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

export default function ServiceAgreement({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white absolute inset-0 z-30 font-sans">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">极光转运</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 pb-28 bg-white">
        <h2 className="text-center text-[20px] font-black text-gray-900 mb-8 tracking-widest">快件服务协议</h2>
        
        <div className="space-y-4 text-[14px] text-gray-800 leading-loose text-justify font-medium">
           <p>1、托运人应准确填写本单，如实告知承运人所托运货物的名称、性质、重量、数量、价值等必要情况；托运人应对所托运货物按照行业标准妥善包装，使其适合运输。</p>
           <p>2、对于国家规定限制运输的物品，托运人应在交寄前完成或委托承运人完成有关规定的手续，并附有效凭证。</p>
           <p>3、托运人不得托运或在所托运货物中夹带禁止运输的物品；因违背此约定造成承运人的一切损失托运人须双倍赔偿。</p>
           <p>4、对已接受委托，后发现属于承运人不能安全、合法运送的物品（包括但不限于危险品、违禁品），承运人保留拒绝运送的权利，并由托运人承担违约责任。</p>
           <p>5、委托承运人货物重量计算单位为千克，不足1千克按照1千克计算。若体积重量大于实际重量，按体积重量计算。</p>
           <p>6、收货人在收到提货通知后最迟应在三日内提货。到货后三个月无人提货且承运人无法退回货物的，承运人对该货物有权处置，在处置所得中优先扣除相关费用。</p>
           <p>7、托运人或收货人不得无故拒付任何服务费用；收货人拒绝支付费用的，托运人承担支付与托运物品有关费用的连带责任。托运人或收货人无故不支付费用的，承运人可以对承运货物行使处置权、留置权及其他补偿性权利，由此而产生的后果由托运人或收货人承担。</p>
           <p>8、承运人建议托运人办理货物保价运输，声明保价并支付相应保价费。托运人声明保价并支付保价费，发生货物丢损，承运人按如下规则赔偿：货物全部灭失，按货物保价声明价值赔偿；货物部分毁损或灭失，按声明价值和损失比例赔偿，最高不超过声明价值。声明价值高于实际价值的，按实际价值赔偿。</p>
           <p>9、未办理保价而发生货物丢损，承运人对货物依照实际损失最高按100（美金）/包裹赔偿（需客户自行联系美国本土派送公司）。按以上方式计算得出的赔偿额超过货物实际价值的部分无效。</p>
           <p>10、货运时效一般按照承运人的公布时效。时效不影响其他费用的结算和不可抗力免责权。</p>
           <p>11、承运人对如下损失不承担责任：<br/>
              A.因不可抗力（包括但不限于自然灾害、政府行为、战争等社会异常事件）造成货物损坏、短缺、灭失、污染、变质或迟延交付；<br/>
              B.因货物本身的自然性质、质量瑕疵或缺陷、合理损耗等造成的损失；<br/>
              C.托运人自行包装或容器不良，但从外部无法发现；<br/>
              D.托运人自行包装，到达时外包装完好而内件缺少或损坏；<br/>
              E.承运人包装的非新品运输，外包装完好而内件缺少或损坏；<br/>
              F.由于托运人故意或过失导致损失；<br/>
              G.承运过程中发生的一切间接损失（包括但不限于对所托运货物的收益、利润、实际用途、特殊商业价值）。
           </p>
           <p>12、凡因本单或与本单有关的争议，当事人可以通过协商或调解解决，协商或调解不成，任何一方均向承运人总部所在地人民法院提起诉讼。</p>
           <p>13、当托运人现场发货因需求发生变化而填写纸质运单，且填写内容与网单不符时，双方确认以运单填写内容为准。</p>
           <p>14、本单于托运人和承运人双方签章之时起生效。</p>
        </div>

        <div className="text-center text-gray-400 text-[12px] mt-8 pb-4">
          极光转运物流集散中心
        </div>
      </div>

      <div className="bg-white px-5 py-3 absolute bottom-0 left-0 right-0 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center justify-center">
        <button 
          onClick={onBack}
          className="w-full py-3.5 rounded-full text-[16px] font-bold bg-blue-600 text-white shadow-md shadow-blue-200 active:scale-[0.98] transition-all"
        >
          我知道了
        </button>
      </div>
    </div>
  );
}