import React from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl z-50 animate-[slide-up_0.3s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h2 className="text-lg font-medium text-gray-800">{title}</h2>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="px-5 pb-6 pt-2 max-h-[80vh] overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;