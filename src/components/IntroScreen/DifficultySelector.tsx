import React from 'react';
import { Button } from '../UI/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelect
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const difficulties = [
    { key: 'easy', label: t.easy },
    { key: 'medium', label: t.medium },
    { key: 'hard', label: t.hard }
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-xl sm:text-2xl text-center mb-4 text-purple-300 font-bold">
        {t.selectDifficulty}
      </h2>
      <div className="flex flex-col gap-3">
        {difficulties.map(({ key, label }) => (
          <Button
            key={key}
            variant={selectedDifficulty === key ? 'secondary' : 'primary'}
            size="md"
            onClick={() => onSelect(key)}
            className={`w-full ${
              selectedDifficulty !== key ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : ''
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};