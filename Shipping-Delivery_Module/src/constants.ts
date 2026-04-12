/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceOption, FeeItem, VasService, Parcel, Claim, PlazaItem } from './types';

export const services: ServiceOption[] = [
  { id: 'standard', name: '标船', time: '后天 17:00 前', price: 567.00, recommended: true },
  { id: 'fast', name: '快船', time: '后天 17:00 前', price: 567.00 },
  { id: 'special', name: '专线', time: '后天 17:00 前', price: 567.00 },
];

export const feeItems: FeeItem[] = [
  { label: '重量', value: '21KG' },
  { label: '计费', value: '¥ 500' },
  { label: '超长', value: '¥ 180' },
  { label: '超重', value: '¥ 180' },
];

export const surcharges: FeeItem[] = [
  { label: '食品', value: '¥ 50' },
  { label: '纺织品', value: '¥ 50' },
  { label: '木制品', value: '¥ 60' },
];

export const otherFees: FeeItem[] = [
  { label: '品名', value: '¥ 50' },
  { label: '报关费', value: '¥ 50' },
  { label: '材料费', value: '¥ 50' },
  { label: '增值服务', value: '¥ 50' },
  { label: '保险', value: '¥ 5' },
];

export const vasServices: VasService[] = [
  {
    id: 'consolidation',
    title: '合箱服务',
    price: 30,
    description: '为客户提供合箱服务，勾选后请留言需合箱单号'
  },
  {
    id: 'inventory',
    title: '货物清点',
    price: 12,
    description: '提供包裹内商品明细清单，若商品数量>5个，仅提供品牌数量'
  },
  {
    id: 'debris',
    title: '去除杂物',
    price: 2,
    description: '为电商下单的客户去除商家赠品或指定杂物（具体物品需留言），减轻包裹自身重量，释放体积'
  },
  {
    id: 'return',
    title: '退货服务',
    price: 25,
    description: '为客户提供未付款包裹直接退货服务，所产生运费费用用户自己承担（部分包裹不支持退货）'
  }
];

export const parcels: Parcel[] = [
  {
    id: '1',
    trackingNo: 'SF143782913****',
    info: '个人件',
    time: '2021/12/02 11:34:34',
    images: [
      'https://picsum.photos/seed/shoes1/200/200',
      'https://picsum.photos/seed/shoes2/200/200',
      'https://picsum.photos/seed/shoes3/200/200',
    ]
  },
  {
    id: '2',
    trackingNo: 'SF143782913****',
    info: '个人件',
    time: '2021/12/02 11:34:34',
    images: [
      'https://picsum.photos/seed/shoes1/200/200',
      'https://picsum.photos/seed/shoes2/200/200',
      'https://picsum.photos/seed/shoes3/200/200',
    ]
  }
];

export const claims: Claim[] = [
  {
    id: '1',
    trackingNo: 'SF1437829133905',
    intlNo: 'SF1437829133905',
    cargoInfo: '个人件',
    status: '运输中',
    itemInfo: '文件*2',
    insurance: '¥ 0',
    time: '2020/05/04 11:00',
    type: '国际出口经济快递'
  },
  {
    id: '2',
    trackingNo: 'SF1437829133905',
    intlNo: 'SF1437829133905',
    cargoInfo: '个人件',
    status: '运输中',
    itemInfo: '文件*2',
    insurance: '¥ 0',
    time: '2020/05/04 11:00',
    type: '国际出口经济快递'
  }
];

export const plazaItems: PlazaItem[] = [
  { id: '1', orderNo: '1234567890', date: '05/29', name: '团长昵称', type: '普货', location: 'West Covina,California US', zip: '91790', weight: '25kg', total: '120kg', transport: 'air', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: '2', orderNo: '1234567890', date: '05/29', name: '新泽西网点', type: '普货', location: 'West Covina,California US', zip: '91790', weight: '25kg', total: '120kg', transport: 'sea', isOfficial: true, logo: 'https://api.dicebear.com/7.x/initials/svg?seed=NJ' },
  { id: '3', orderNo: '1234567890', date: '05/29', name: '团长昵称', type: '敏感货', location: 'West Covina,California US', zip: '91790', weight: '25kg', total: '120kg', transport: 'air', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
  { id: '4', orderNo: '1234567890', date: '05/29', name: '团长昵称', type: '敏感货', location: 'West Covina,California US', zip: '91790', weight: '25kg', total: '120kg', transport: 'air', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka' },
];
