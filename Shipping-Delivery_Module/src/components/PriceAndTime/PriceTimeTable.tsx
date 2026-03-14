import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, HelpCircle } from 'lucide-react';
import { TabType } from '../../types';

export default function PriceTimeTable({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<TabType>('AIR');

  return (
    <div className="flex flex-col h-full bg-[#F4F5F7] absolute inset-0 z-10 font-sans">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">价格时效</h1>
        <div className="flex items-center gap-3 text-gray-800">
           <MoreHorizontal size={22} />
           <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white flex justify-center border-b border-gray-100 sticky top-[52px] z-20 shadow-sm">
        <div className="flex w-48 relative">
          <button className={`flex-1 py-3 text-[15px] transition-colors ${tab === 'AIR' ? 'text-blue-600 font-bold' : 'text-gray-500 font-medium'}`} onClick={() => setTab('AIR')}>空运</button>
          <button className={`flex-1 py-3 text-[15px] transition-colors ${tab === 'SEA' ? 'text-blue-600 font-bold' : 'text-gray-500 font-medium'}`} onClick={() => setTab('SEA')}>海运</button>
          <div className={`absolute bottom-0 w-1/2 h-[3px] bg-blue-600 rounded-t-md transition-transform duration-300 ${tab === 'SEA' ? 'translate-x-full' : 'translate-x-0'}`}></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-2 py-4 pb-12">
        
        {/* === BẢNG GIÁ CHI TIẾT DÙNG TABLE === */}
        <table className="w-full text-center border-collapse text-[10px] text-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200">
          <tbody>
            
            {tab === 'AIR' && (
              <>
                {/* AIR BLOCK 1 */}
                <tr className="bg-[#4B8BFF] text-white font-bold text-[12px]">
                  <td className="p-2 border border-white/20 w-[15%]">路线</td>
                  <td className="p-2 border border-white/20 w-[28%] leading-tight">空派<br/>标快</td>
                  <td className="p-2 border border-white/20 w-[28%] leading-tight">空派<br/>特快</td>
                  <td className="p-2 border border-white/20 leading-tight">空派<br/>专线</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2">申报</td>
                  <td colSpan={3} className="border border-gray-200 p-2 bg-[#F8F9FA] font-medium">包税</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">收寄<br/>品类</td>
                  <td className="border border-gray-200 p-2 font-medium">普货</td>
                  <td className="border border-gray-200 p-2 font-medium">普货</td>
                  <td className="border border-gray-200 p-2 font-medium leading-tight">普货<br/>带电<br/>敏感货</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">参考<br/>时效</td>
                  <td className="border border-gray-200 p-2">10</td>
                  <td className="border border-gray-200 p-2">7</td>
                  <td className="border border-gray-200 p-2">10</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">计费<br/>标准</td>
                  <td className="border border-gray-200 p-2 leading-tight"><div className="font-bold text-[11px] mb-0.5">¥ 80/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;25KG</span></td>
                  <td className="border border-gray-200 p-2 leading-tight"><div className="font-bold text-[11px] mb-0.5">¥ 85/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;25KG</span></td>
                  <td className="border border-gray-200 p-2 leading-tight"><div className="font-bold text-[11px] mb-0.5">¥ 85/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;25KG</span></td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">重量<br/>限制</td>
                  <td colSpan={3} className="border border-gray-200 p-2 leading-relaxed">
                    单件实重&lt;22KG<br/>超出加180元/件<br/><span className="text-[#FF5A5F] font-bold">拒收单件实重&gt;40KG</span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">尺寸<br/>限制</td>
                  <td colSpan={3} className="border border-gray-200 p-2 leading-relaxed">
                    单边&lt;120cm<br/>外围长≤265cm<br/>超出加180元/件
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">其他<br/>限制</td>
                  <td colSpan={3} className="border border-gray-200 p-2">单票品名限10个</td>
                </tr>

                {/* AIR BLOCK 2 */}
                <tr className="bg-[#4B8BFF] text-white font-bold text-[12px]">
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px]">路线</td>
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px]">标快<br/>转递</td>
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px]">特快<br/>转递</td>
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px]">集运</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2">申报</td>
                  <td colSpan={3} className="border border-gray-200 p-2 bg-[#F8F9FA] font-medium">不包税</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">收寄<br/>品类</td>
                  <td className="border border-gray-200 p-2 font-medium leading-tight">普货<br/>带电<br/>敏感货</td>
                  <td className="border border-gray-200 p-2 font-medium">普货</td>
                  <td className="border border-gray-200 p-2 font-medium leading-tight">普货<br/>带电<br/>敏感货</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">参考<br/>时效</td>
                  <td className="border border-gray-200 p-2">10</td>
                  <td className="border border-gray-200 p-2">2-4</td>
                  <td className="border border-gray-200 p-2">20-23</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">计费<br/>标准</td>
                  <td className="border border-gray-200 p-2 leading-tight">
                     首重+续重<br/><span className="text-[#FF5A5F] font-bold">¥202</span> + <span className="text-[#FF5A5F] font-bold">¥39</span>+燃油<br/><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px] mt-1 inline-block">&gt;21KG</span>
                  </td>
                  <td className="border border-gray-200 p-2 leading-tight">
                     首重+续重<br/><span className="text-[#FF5A5F] font-bold">¥228</span> + <span className="text-[#FF5A5F] font-bold">¥43</span>+燃油<br/><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px] mt-1 inline-block">&gt;21KG</span>
                  </td>
                  <td className="border border-gray-200 p-2 leading-tight">
                    <div className="font-bold text-[11px] mb-0.5">¥ 100/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;0.5KG</span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">重量<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    单件&lt;31KG<br/>单件31-50KG+ ¥50/件<br/>50-68KG加200元/件<br/><span className="text-[#FF5A5F] font-bold">拒收单件实重&gt;68KG</span>
                  </td>
                  <td className="border border-gray-200 bg-[#F8F9FA]"></td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">尺寸<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    单边&lt;120cm第二边&lt;76cm<br/>超出以上尺寸且&lt;大型包裹<br/>则+超长费用900x当月燃油费/件
                  </td>
                  <td className="border border-gray-200 bg-[#F8F9FA]"></td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">其他<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2">21KG以下0.5KG为计费标准</td>
                  <td className="border border-gray-200 p-2">不限</td>
                </tr>
              </>
            )}

            {tab === 'SEA' && (
              <>
                {/* SEA BLOCK 1 */}
                <tr className="bg-[#4B8BFF] text-white font-bold text-[12px]">
                  <td className="p-2 border border-white/20 w-[15%]">路线</td>
                  <td className="p-2 border border-white/20 w-[42%] leading-tight">直邮<br/>标船</td>
                  <td className="p-2 border border-white/20 leading-tight">直邮<br/>快船</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2">申报</td>
                  <td colSpan={2} className="border border-gray-200 p-2 bg-[#F8F9FA] font-medium">包税</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">收寄<br/>品类</td>
                  <td colSpan={2} className="border border-gray-200 p-2 font-medium">普货</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">参考<br/>时效</td>
                  <td className="border border-gray-200 p-2">船后35-55抵达</td>
                  <td className="border border-gray-200 p-2">船后12-14抵达</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">计费<br/>标准</td>
                  <td className="border border-gray-200 p-2 leading-tight">
                    <div className="flex justify-center gap-3 mb-1 font-bold text-[11px]"><span>¥ 25/KG</span><span>¥ 19/KG</span></div>
                    <div className="flex justify-center gap-3"><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;21KG</span><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;100KG</span></div>
                  </td>
                  <td className="border border-gray-200 p-2 leading-tight">
                    <div className="flex justify-center gap-3 mb-1 font-bold text-[11px]"><span>¥ 34/KG</span><span>¥ 28/KG</span></div>
                    <div className="flex justify-center gap-3"><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;21KG</span><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;100KG</span></div>
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">重量<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    单件实重&lt;22KG<br/>超出22KG 加超重费180元<br/><span className="text-[#FF5A5F] font-bold">拒收单件实重&gt;40KG</span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">尺寸<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    单边&lt;120cm 第二边长&lt;75cm<br/>外围长&lt;265cm<br/>超出加180元/件<br/><span className="text-[#FF5A5F] font-bold">拒收单边&gt;170cm 外围长&gt;300cm</span>
                  </td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">其他<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2">单票品名限10个以内</td>
                </tr>

                {/* SEA BLOCK 2 */}
                <tr className="bg-[#4B8BFF] text-white font-bold text-[12px]">
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px]">路线</td>
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px] w-[30%]">直邮<br/>专线</td>
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px] w-[27%]">集运</td>
                  <td className="p-2 border border-white/20 leading-tight border-t-[8px]">大票<br/>直达</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2">申报</td>
                  <td colSpan={3} className="border border-gray-200 p-2 bg-[#F8F9FA] font-medium">包税</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">收寄<br/>品类</td>
                  <td className="border border-gray-200 p-2 font-medium leading-tight">普货<br/>带电<br/>敏感货</td>
                  <td className="border border-gray-200 p-2 font-medium leading-tight">普货<br/>带电<br/>敏感货</td>
                  <td className="border border-gray-200 p-2 font-medium">普货</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">参考<br/>时效</td>
                  <td colSpan={2} className="border border-gray-200 p-2">船后16-20抵达</td>
                  <td className="border border-gray-200 p-2">船后32-35抵达</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">计费<br/>标准</td>
                  <td className="border border-gray-200 p-2 leading-tight"><div className="font-bold text-[11px] mb-0.5">¥ 38/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;21KG</span></td>
                  <td className="border border-gray-200 p-2 leading-tight"><div className="font-bold text-[11px] mb-0.5">¥ 39/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;0.5KG</span></td>
                  <td className="border border-gray-200 p-2 leading-tight"><div className="font-bold text-[11px] mb-0.5">¥ 28/KG</div><span className="bg-[#FF5A5F] text-white px-1.5 py-[1px] rounded text-[9px]">&gt;150KG</span></td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">重量<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    30kg&gt;单件重量&gt;10kg<br/>大货单件不足12kg按12kg收费<br/>22kg≤计费重量≤67kg需加收<br/>30（美金）/件<br/>21kg按超大货计费
                  </td>
                  <td className="border border-gray-200 p-2 leading-relaxed">不足150kg<br/>按150kg计费</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">尺寸<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    122cm≤长(L)≤275cm<br/>或第二边(W)&gt;76cm需加收<br/>30（美金）/件<br/>单边周长 (宽+高)*2+最长边<br/>&gt;310cm<br/>加收800元/件（超310cm的另询）
                  </td>
                  <td className="border border-gray-200 p-2 leading-relaxed">高度&lt;2.5m<br/>宽度&lt;2.25m</td>
                </tr>
                <tr>
                  <td className="bg-[#F0F5FF] text-[#4B8BFF] font-bold border border-gray-200 p-2 leading-tight">其他<br/>限制</td>
                  <td colSpan={2} className="border border-gray-200 p-2 leading-relaxed">
                    包裹为不规则包装(如圆柱形/圆形等)<br/>需加收200元/件<br/>食品类不接受纯肉类
                  </td>
                  <td className="border border-gray-200 p-2 leading-relaxed">包裹不能为原木<br/>原木家具/香薰<br/>+800/票</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        {/* === BẢNG SURCHARGE PHỤ PHÍ === */}
        <div className="mt-8 mb-4">
           <div className="text-center font-bold text-[#4B8BFF] text-[18px] tracking-[0.2em] relative mb-2">
             <span className="absolute w-full left-0 top-1/2 -translate-y-1/2 text-gray-100 text-3xl font-black -z-10 tracking-[0.4em] uppercase">SURCHARGE</span>
             附加费
           </div>
           
           <table className="w-full text-center border-collapse text-[10px] text-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200">
             <tbody>
               {tab === 'AIR' ? (
                 <>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2 w-[22%]">空派<br/>标快</td>
                     <td rowSpan={2} className="border border-gray-200 p-2 leading-relaxed text-left pl-6">纺织品、皮革、鞋包等+ ¥1/KG<br/>内衣、玻璃制品、木制品+¥2/KG<br/>单票品名超5个+¥50/个</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">空派<br/>特快</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">空派<br/>专线</td>
                     <td className="border border-gray-200 p-2 leading-relaxed text-left pl-6">偏远地区+¥30/件<br/>非FBA+ ¥1/KG</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">标快<br/>转递</td>
                     <td rowSpan={2} className="border border-gray-200 p-2 leading-relaxed text-left pl-6">磁检费+¥ 400/票<br/>配雾/酒精+¥ 600/票<br/>纺织品、皮革鞋服包+¥1/KG<br/>内衣、玻璃制品、木制品+¥2/KG<br/>单票品名超5个+¥50/个<br/>偏远地区+¥30/件<br/>非FBA+ ¥1/KG</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">特快<br/>转递</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">集运</td>
                     <td className="border border-gray-200 p-2 leading-relaxed text-left pl-6">口罩+¥ 5/KG<br/>眼影+¥ 5/KG<br/>国内品牌（安踏/李宁/鸿星尔克等）+ ¥ 5/KG<br/>偏远费+¥ 6/KG 最低消费 ¥ 220<br/>私人地址/住宅费+¥ 39/票</td>
                   </tr>
                 </>
               ) : (
                 <>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2 w-[22%]">直邮<br/>标船</td>
                     <td rowSpan={2} className="border border-gray-200 p-2 leading-relaxed text-center">纺织品/FDA+ ¥ 1/KG<br/>内衣/泳衣类/玻璃制品/太阳能产品/矿机+ ¥ 2/KG<br/>非亚马逊地址 ¥1/KG<br/>单票品名超5个+ ¥ 50/个</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">直邮<br/>快船</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">直邮<br/>专线</td>
                     <td rowSpan={2} className="border border-gray-200 p-2 leading-relaxed text-center">液体粉末+ ¥ 2元/KG(拒收白色类及纯粉末)<br/>茶叶+ ¥ 3/KG<br/>电子烟（带油）+ ¥ 5/KG<br/>卡派+ ¥ 5/KG</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">集运</td>
                   </tr>
                   <tr>
                     <td className="bg-[#4B8BFF] text-white font-medium border border-white/20 p-2">大票<br/>直达</td>
                     <td className="border border-gray-200 p-2 leading-relaxed text-center">非FBA地址+ ¥ 1/KG<br/>塑料制品等+ ¥ 1/KG<br/>竹制品（需熏蒸）、纸制品、玻璃制品等+ ¥ 2/KG<br/>纺织类、箱包类、鞋类等+ ¥ 2/KG<br/>服装类、内衣、袜子等+ ¥ 3/KG<br/>卧室家具用具、餐具、汽配等+ ¥ 3/KG</td>
                   </tr>
                 </>
               )}
             </tbody>
           </table>
        </div>

        {/* LƯU Ý BÊN DƯỚI CÙNG */}
        <div className="bg-[#F8F9FA] rounded-xl p-3 text-[10.5px] text-gray-500 leading-relaxed">
          <div className="font-bold text-gray-700 text-[13px] mb-1.5">温馨提示</div>
          <div>1. 所有报价单位为人民币 (RMB)；</div>
          <div>2. 两者取最大重量计费是指：实际重量与体积重量取较大值计费；体积重计算公式为：长×宽×高(cm)÷5000(空运)/6000(海运)；</div>
          <div>3. 参考时效为工作日，仅提供参考，不作为理赔时承诺。疫情期间会有部分包裹存在延误情况。</div>
        </div>

      </div>
    </div>
  );
}