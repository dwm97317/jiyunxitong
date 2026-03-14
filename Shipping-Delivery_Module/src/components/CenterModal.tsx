import React from 'react';
import { X } from 'lucide-react';
import { BaseModalProps } from '../types';

interface CenterModalProps extends BaseModalProps {
  title: string;
  children: React.ReactNode;
}

export const CenterModal: React.FC<CenterModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-2xl z-50 animate-[fade-in_0.2s_ease-out] overflow-hidden shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h2 className="text-[17px] font-medium text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <div className="px-5 pb-6 pt-4">
          {children}
        </div>
      </div>
    </>
  );
};

export default CenterModal;