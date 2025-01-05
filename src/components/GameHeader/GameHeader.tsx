import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ScoreDisplay } from '../Score/ScoreDisplay';
import { ControlButton } from '../GameControls/ControlButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

interface GameHeaderProps {
  score: number;
  onRefresh: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, onRefresh }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="w-full mb-2 sm:mb-8 px-4">
      <div className="flex items-center justify-between gap-4">
        <ScoreDisplay score={score} />
        <ControlButton
          icon={RefreshCw}
          onClick={onRefresh}
          label={t.refresh}
          className="scale-90 sm:scale-100"
        />
      </div>
    </div>
  );
};