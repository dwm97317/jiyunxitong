/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceOption {
  id: string;
  name: string;
  time: string;
  price: number;
  recommended?: boolean;
}

export interface FeeItem {
  label: string;
  value: string;
}

export interface VasService {
  id: string;
  title: string;
  price: number;
  description: string;
}

export interface Parcel {
  id: string;
  trackingNo: string;
  info: string;
  time: string;
  images: string[];
}

export interface Claim {
  id: string;
  trackingNo: string;
  intlNo: string;
  cargoInfo: string;
  status: string;
  itemInfo: string;
  insurance: string;
  time: string;
  type: string;
}

export interface PlazaItem {
  id: string;
  orderNo: string;
  date: string;
  name: string;
  type: string;
  location: string;
  zip: string;
  weight: string;
  total: string;
  transport: 'air' | 'sea';
  avatar?: string;
  logo?: string;
  isOfficial?: boolean;
}

export type ViewType =
  | 'home'
  | 'details'
  | 'empty'
  | 'rules'
  | 'claim'
  | 'predeclare'
  | 'claims'
  | 'vas'
  | 'claimDetails'
  | 'claimTracking'
  | 'claimRules'
  | 'claimTerms'
  | 'applyPacking'
  | 'plaza'
  | 'plazaDetails'
  | 'parcelManagement'
  | 'insuranceRules'
  | 'claimRulesDetail'
  | 'paymentSuccess'
  | 'claimSuccess';
