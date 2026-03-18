/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star } from 'lucide-react';
import { PlazaItem } from '../types';

interface PlazaDetailsViewProps {
  item: PlazaItem;
}

const PlazaDetailsView: React.FC<PlazaDetailsViewProps> = ({ item }) => {
  return (
    <div className="space-y-4 pb-32">
      <section className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-[#FFF5EB] px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4A90E2] rounded-lg flex items-center justify-center text-white font-bold italic">JG</div>
            <span className="text-[#4A90E2] font-bold italic">极光转运</span>
          </div>
          <span className="text-[#FF9533] text-sm">{item.transport === 'air' ? '空运' : '海运'}</span>
        </div>
        
        <div className="p-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 relative">
              <img src={item.avatar || item.logo} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 right-0 bg-[#FF9533] text-[8px] text-white px-0.5 rounded-tl-sm">团</div>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg">{item.name}</h4>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex gap-4">
              <span className="text-gray-400 w-20 flex-shrink-0">收货地址：</span>
              <span className="text-gray-800">新加坡淡马锡大道9号达成大楼433433</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-400 w-20 flex-shrink-0">开团时间：</span>
              <span className="text-gray-800">2021-12-04至2022-01-22</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-400 w-20 flex-shrink-0">开团人数：</span>
              <span className="text-gray-800">5人</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-400 w-20 flex-shrink-0">起送重量：</span>
              <span className="text-gray-800">60KG</span>
            </div>
            <div className="flex gap-4">
              <span className="text-gray-400 w-20 flex-shrink-0">团长备注：</span>
              <span className="text-gray-800">快来和我一起拼团吧</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-100 pt-4 space-y-4">
            <h5 className="text-sm font-medium">成员信息：</h5>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full overflow-hidden border border-gray-100">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <button className="w-full text-center text-[#4A90E2] text-sm font-medium py-2">查看全部</button>
          </div>

          <div className="border-t border-dashed border-gray-100 pt-4 space-y-4">
            <h5 className="text-sm font-medium">集运信息：</h5>
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                 <img src="https://picsum.photos/seed/map/300/300" alt="Map" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-4">
                  <span className="text-gray-400">{item.transport === 'air' ? '时效：' : '船后：'}</span>
                  <span className="text-[#4A90E2]">{item.transport === 'air' ? '10-12天' : '18-28天'}</span>
                  <span className="text-gray-400 ml-2">申报：</span>
                  <span className="text-[#4A90E2]">包税</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-400">接受：</span>
                  <span className="text-gray-800">普货、带电、带磁、敏感货</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h6 className="font-bold text-sm">开团规则</h6>
              <p className="text-xs text-gray-500 leading-relaxed">拼团由团长开启，会员都可提交申请成为团长。</p>
            </div>
            <div className="space-y-2">
              <h6 className="font-bold text-sm">参团规则</h6>
              <p className="text-xs text-gray-500 leading-relaxed">1.会员需成为拼团团长的成员，才能参与拼团；<br/>2.参与拼团并成功添加包裹，才算拼团成功。</p>
            </div>
            <div className="space-y-2">
              <h6 className="font-bold text-sm">拼团成功</h6>
              <p className="text-xs text-gray-500 leading-relaxed">1.当满足拼团的包裹上限，拼团会自动进行锁团，无法再添加团成员，但可以找团长进行协商；<br/>2.团长有权提前锁团；<br/>3.拼团成功由团长提交申请邮寄。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlazaDetailsView;
