import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface PlaceholderScreenProps {
  title: string;
  description: string;
  onBack: () => void;
}

export default function PlaceholderScreen({ title, description, onBack }: PlaceholderScreenProps) {
  const { t } = useLanguage();
  
  return (
    <div className="p-6 text-center mt-20">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <button 
        onClick={onBack}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        {t.returnHome}
      </button>
    </div>
  );
}
