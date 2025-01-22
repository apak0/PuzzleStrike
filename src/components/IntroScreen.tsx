import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import { LanguageSelector } from './LanguageSelector';

interface IntroScreenProps {
  onStart: (difficulty: string) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('medium');
  const { language } = useLanguage();
  const t = translations[language];

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <LanguageSelector />
      
      <div className="text-center mb-12">
        <Gamepad2 className="w-32 h-32 mx-auto mb-8 text-purple-500" />
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mb-2">
          {t.title}
        </h1>
        
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-2xl text-center mb-4 text-purple-300 font-bold">{t.selectDifficulty}</h2>
        <div className="flex flex-col gap-3">
          {[
            { key: 'easy', label: t.easy },
            { key: 'medium', label: t.medium },
            { key: 'hard', label: t.hard }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedDifficulty(key)}
              className={`px-8 py-3 rounded-lg text-2xl font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedDifficulty === key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="px-12 py-4 text-2xl font-bold rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white
          hover:from-blue-400 hover:via-indigo-400 hover:to-violet-400 transform hover:scale-105 transition-all duration-300
          shadow-lg shadow-indigo-500/50"
      >
        {t.go}
      </button>
    </div>
  );
}