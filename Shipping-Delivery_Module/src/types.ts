export type ShippingMethodType = 'EXPRESS' | 'FREIGHT';
export type PackageType = 'SINGLE' | 'MULTIPLE';
export type ViewModeType = 'DETAILS_NORMAL' | 'DETAILS_OVERSIZE' | 'SELECTION';
export type InsuranceModeType = 'STANDARD' | 'CUSTOM';
export type TabType = 'AIR' | 'SEA';
export type ModalStateType = 'WEIGHT' | 'VOLUME' | 'RULES' | '';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}