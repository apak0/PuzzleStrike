import React from 'react';
import { Button } from '../UI/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

interface GameOverOverlayProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ score, onRestart, onHome }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const handleRestart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRestart();
  };

  const handleHome = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onHome();
  };

  return (
    <div 
      className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 game-over-overlay"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-gray-900 p-8 rounded-lg border-2 border-purple-500/50 text-center space-y-6 max-w-sm mx-4">
        <h2 className="text-3xl font-bold text-red-500">{t.gameOver}</h2>
        <div className="space-y-2">
          <p className="text-gray-400">{t.finalScore}</p>
          <p className="text-4xl font-bold text-purple-400">{score}</p>
        </div>
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRestart}
            className="w-full"
          >
            {t.playAgain}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleHome}
            className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50"
          >
            {t.home}
          </Button>
        </div>
      </div>
    </div>
  );
};
