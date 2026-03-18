/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const RulesView: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 min-h-[80vh]">
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-center">极光转运服务条款</h2>
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">1. 服务范围</h3>
            <p>本服务条款适用于极光转运提供的所有国际物流及相关增值服务。通过使用我们的服务，即表示您已阅读、理解并同意受本条款约束。</p>
          </section>
          
          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">2. 禁运物品</h3>
            <p>严禁邮寄任何法律法规禁止的物品，包括但不限于：易燃易爆品、毒品、武器、违禁出版物、活体动物等。如发现违禁品，我们将依法处理并配合相关部门调查。</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">3. 计费规则</h3>
            <p>运费根据包裹的实际重量或体积重量（取其大者）计算。体积重量计算公式为：长(cm) x 宽(cm) x 高(cm) / 6000。最终费用以仓库称重结果为准。</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">4. 仓储服务</h3>
            <p>我们提供30天的免费仓储期。超过30天将按每个包裹每天1元的标准收取仓储费。超过90天未处理的包裹将视为弃件，我们将有权自行处理。</p>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-[#333]">5. 赔付标准</h3>
            <p>未购买保价的包裹，如发生丢失或损毁，赔付金额最高不超过运费的2倍。建议高价值物品购买全额保价服务。</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesView;
