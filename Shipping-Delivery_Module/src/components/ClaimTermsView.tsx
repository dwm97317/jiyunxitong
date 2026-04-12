/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const ClaimTermsView: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 min-h-[80vh]">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center">理赔规则及说明</h2>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">1. 理赔申请时效</h3>
            <p>包裹签收之日起7个自然日内可发起理赔申请。逾期将不再受理。对于未签收包裹，可在预计到达时间超过15个工作日后发起查询及理赔。</p>
          </section>
          
          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">2. 理赔所需凭证</h3>
            <p>申请理赔时需提供：商品购买价值凭证（发票或订单截图）、外包装破损照片、内件破损照片、面单照片等。凭证不全可能导致理赔失败。</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">3. 免责条款</h3>
            <p>以下情况不予理赔：不可抗力因素造成的损失；易碎品、液体类物品的破损；海关查验导致的延误或没收；收件人信息错误导致的投递失败等。</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">4. 处理周期</h3>
            <p>理赔申请提交后，我们将在3-5个工作日内完成初步审核。复杂案件可能需要更长时间与派送公司核实。理赔款项将在最终确认后7个工作日内退回至您的账户余额。</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ClaimTermsView;
