import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <h2 className="text-3xl font-bold text-white">
      {t.score}: <span className="text-purple-500">{score}</span>
    </h2>
  );
};