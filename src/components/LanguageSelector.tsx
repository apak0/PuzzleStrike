import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2">
      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'tr')}
        className="bg-gray-800 text-white text-xs sm:text-sm border border-purple-500 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
};