import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

export default function ProhibitedItems({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-white absolute inset-0 z-20 font-sans">
      <div className="bg-white flex items-center justify-between px-4 py-3 sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <button onClick={onBack} className="p-1 -ml-1"><ChevronLeft size={26} className="text-gray-800" /></button>
        <h1 className="text-[17px] font-bold text-gray-900">极光转运</h1>
        <div className="flex items-center gap-3">
          <button><MoreHorizontal size={22} className="text-gray-800" /></button>
          <div className="w-5 h-5 border-2 border-gray-800 rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-gray-800 rounded-full"></div></div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 bg-white">
        <h2 className="text-center text-[20px] font-black text-gray-900 mb-8 tracking-widest">违禁物品</h2>
        
        <div className="space-y-6 text-[14px] text-gray-700 leading-relaxed text-justify">
           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">一、枪支（含仿制品、主要零部件）弹药</h3>
             <p>1.枪支：各类火器、射击运动枪、麻醉注射枪、气枪、发令枪、防暴枪、电击枪、消防灭火枪、催泪枪等。</p>
             <p>2.弹药：各类炸弹、子弹、照明弹、教练弹、烟幕弹、催泪弹、瓦斯弹、毒气弹、炮弹、手雷、地雷、火药等。</p>
           </section>
           
           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">二、管制器具</h3>
             <p>1.管制刀具：匕首、三棱刮刀、带有自锁装置的弹簧刀（跳刀）、弩、催泪器、电击器等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">三、爆炸物品</h3>
             <p>1.爆破器材：炸药、雷管、导火索、导爆索、爆破剂等。</p>
             <p>2.烟花爆竹：烟花、鞭炮、摔炮、拉炮、砸炮、彩药等。</p>
             <p>3.其他：黑火药、发烟药、起爆药、电点火头等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">四、压缩和液化气体及其容器</h3>
             <p>1.易燃气体：氢气、甲烷、乙烷、丁烷、天然气、液化石油气、乙烯、丙烯、乙炔、打火机等。</p>
             <p>2.有毒气体：一氧化碳、一氧化氮、氯气等。</p>
             <p>3.易爆或窒息、助燃气体：压缩氧气、氮气、氦气、氖气、气雾剂等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">五、易燃液体</h3>
             <p>1.如汽油、柴油、煤油、桐油、丙酮、乙醚、油漆、生漆、苯、酒精、松香油等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">六、易燃固体、自燃物质、遇水易燃物质</h3>
             <p>1.易燃固体：红磷、硫磺、铝粉、闪光粉、固体酒精、火柴、活性炭等。</p>
             <p>2.自燃物质：黄磷、白磷、硝化纤维（含胶片）、钛粉等。</p>
             <p>3.遇水易燃物质：金属钠、钾、锂、锌粉、镁粉、碳化钙（电石）、磷化铝、钠汞齐等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">七、氧化剂和过氧化物</h3>
             <p>1.如高锰酸钾、高氯酸钾、氧化氢、过氧化钠、过氧化钾、过氧化铅、氯酸盐、溴酸盐、硝酸盐、双氧水等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">八、毒害品</h3>
             <p>1.如砷、砒霜、汞化物、铊化物、氰化物、硒粉、苯酚、汞、剧毒农药等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">九、生化制品、传染性、感染性物质</h3>
             <p>1.如病菌、炭疽、寄生虫、排泄物、医疗废弃物、尸骨、动物器官、肢体、未经硝制的兽皮、未经药制的兽骨等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十、放射性物质</h3>
             <p>1.如铀、钴、镭、钚等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十一、腐蚀性物质</h3>
             <p>1.如硫酸、硝酸、盐酸、蓄电池、氢氧化钠、氢氧化钾等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十二、毒品及吸毒工具、非正当用途麻醉药品和精神药品、非正当用途的易制毒化学品</h3>
             <p>1.毒品、麻醉药品和精神药品：如鸦片（包括罂粟壳、花、苞、叶）、吗啡、海洛因、可卡因、大麻、甲基苯丙胺（冰毒）、氯胺酮、甲卡西酮、苯丙胺、安钠咖等。</p>
             <p>2.易制毒化学品：如胡椒醛、黄樟素、黄樟油、麻黄素、伪麻黄素、羟亚胺、邻酮、苯乙酸、溴代苯丙酮、醋酸酐、甲苯、丙酮等。</p>
             <p>3.吸毒工具：如冰壶等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十三、非法出版物、印刷品、音像制品等宣传品</h3>
             <p>1.如含有反动、煽动民族仇恨、破坏国家统一、破坏社会稳定、宣扬邪教、迷信、淫秽等内容的图书、刊物、图片、照片、音像制品等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十四、间谍专用器材</h3>
             <p>1.如暗藏式窃听器材、窃照器材、突发式收发报机、一次性密码本、密写工具、用于获取情报的电子监听和截收器材等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十五、非法伪造物品</h3>
             <p>1.如伪造或者变造的货币、证件、公章等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十六、侵犯知识产权和假冒伪劣物品</h3>
             <p>1.侵犯知识产权：如侵犯专利权、商标权、著作权的图书、音像制品等。</p>
             <p>2.假冒伪劣：如假冒伪劣的食品、药品、儿童用品、电子产品、化妆品、纺织品等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十七、濒危野生动植物及其制品</h3>
             <p>1.如象牙、虎骨、犀牛角及其制品等。</p>
           </section>

           <section>
             <h3 className="font-bold text-[15px] text-gray-900 mb-1.5">十八、其他物品</h3>
             <p>1.如买卖双方签订的合同中列明的认为具有商业价值的物品、货样或商业样本等。</p>
             <p>2.内容涉及国家秘密的文件资料及其他物品。</p>
             <p>3.《危险化学品目录》《民用爆炸物品品名表》《易制爆危险化学品名录》《易制毒化学品的分类和品种目录》《中华人民共和国禁止进出境物品表》载明的物品和《人间传染的病原微生物名录》等。</p>
           </section>

           <div className="bg-gray-100 p-4 rounded-xl mt-8 font-bold text-[13px] text-gray-800 border border-gray-200">
             若客户不听劝阻发生此行为，本公司有权做报警处理。如果不听劝阻或瞒报、夹带，被海关或公安部门等查扣，因此造成的货物遗失、赔偿，给本公司或第三方人员造成重大经济损失的货物所属的一切责任及费用，均由客户承担。
           </div>
        </div>
      </div>
    </div>
  );
}