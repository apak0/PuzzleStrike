import React from 'react';
import { Gamepad2 } from 'lucide-react';
import { Container } from '../Layout/Container';
import { Button } from '../UI/Button';
import { DifficultySelector } from './DifficultySelector';
import { LanguageSelector } from '../LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';

interface IntroScreenProps {
  onStart: (difficulty: string) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('medium');
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Container className="flex flex-col items-center justify-center min-h-screen py-8">
      <LanguageSelector />
      
      <div className="text-center mb-8 sm:mb-12">
        <Gamepad2 className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 text-purple-500" />
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mb-2">
          {t.title}
        </h1>
        
      </div>

      <DifficultySelector
        selectedDifficulty={selectedDifficulty}
        onSelect={setSelectedDifficulty}
      />

      <div className="mt-8 sm:mt-12">
        <Button
          variant="primary"
          size="lg"
          onClick={() => onStart(selectedDifficulty)}
        >
          {t.startGame}
        </Button>
      </div>
    </Container>
  );
};