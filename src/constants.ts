/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Parcel, Claim, PlazaItem } from './types';

export const services = [
  { id: 'standard', name: 'Standard Sea', time: '18-25 Days', price: 120, recommended: true },
  { id: 'fast', name: 'Fast Sea', time: '12-15 Days', price: 180 },
  { id: 'special', name: 'Special Line', time: '8-10 Days', price: 250 },
];

export const vasServices = [
  { id: 'consolidation', name: 'Consolidation', price: 10 },
  { id: 'inventory', name: 'Inventory Check', price: 20 },
  { id: 'debris', name: 'Remove Debris', price: 5 },
  { id: 'return', name: 'Return Service', price: 30 },
];

export const parcels: Parcel[] = [
  { id: '1', trackingNo: 'JD1234567890', info: 'Macbook Air M2 - Silver', time: '2024-10-20', images: ['https://picsum.photos/seed/pc1/200/200'] },
  { id: '2', trackingNo: 'JD9876543210', info: 'Nike Shield 5 - Black/White', time: '2024-10-21', images: ['https://picsum.photos/seed/shoe1/200/200'] },
  { id: '3', trackingNo: 'JD5555566666', info: 'T-Shirts (5pcs) - Cotton', time: '2024-10-22', images: ['https://picsum.photos/seed/shirt1/200/200'] },
];

export const claims: Claim[] = [
  {
    id: '1',
    trackingNo: 'JD1234567890',
    intlNo: 'CQ911223344',
    cargoInfo: 'Electronics',
    status: 'pending',
    itemInfo: 'Macbook Air M2',
    insurance: 'Included',
    time: '2024-10-18',
    type: 'Delay'
  },
  {
    id: '2',
    trackingNo: 'JD9876543210',
    intlNo: 'CQ911223355',
    cargoInfo: 'Apparel',
    status: 'completed',
    itemInfo: 'Nike Shield 5',
    insurance: 'Not Included',
    time: '2024-10-15',
    type: 'Damage'
  },
];

export const plazaItems: PlazaItem[] = [
  {
    id: '1',
    orderNo: 'JG-AIR-202410-001',
    date: '10/24',
    name: 'Cực Quang Official',
    type: '普货',
    location: 'West Covina, California US',
    zip: '91790',
    weight: '85kg',
    total: '120kg',
    transport: 'air',
    isOfficial: true,
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CQ'
  },
  {
    id: '2',
    orderNo: 'JG-SEA-202410-082',
    date: '10/29',
    name: 'Nhóm Sài Gòn - Cali',
    type: '普货',
    location: 'Los Angeles, California US',
    zip: '90001',
    weight: '320kg',
    total: '500kg',
    transport: 'sea',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SG'
  },
  {
    id: '3',
    orderNo: 'JG-AIR-202410-045',
    date: '11/02',
    name: 'Trưởng nhóm Hà Nội',
    type: '敏感货',
    location: 'Houston, Texas US',
    zip: '77001',
    weight: '45kg',
    total: '60kg',
    transport: 'air',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HN'
  },
  {
    id: '4',
    orderNo: 'JG-SEA-202410-099',
    date: '11/05',
    name: 'Gom hàng giá rẻ',
    type: '敏感货',
    location: 'New York, NY US',
    zip: '10001',
    weight: '150kg',
    total: '300kg',
    transport: 'sea',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cheap'
  },
];
