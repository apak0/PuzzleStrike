import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';
import { Button } from '../UI/Button';
import { ArrowLeftRight, Hand } from 'lucide-react';

interface ControlSelectProps {
  onSelect: (controlType: 'arrows' | 'touch') => void;
}

export const ControlSelect: React.FC<ControlSelectProps> = ({ onSelect }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 md:hidden">
      <div className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500/50 max-w-sm w-full space-y-6">
        <h3 className="text-2xl font-bold text-purple-400 text-center">
          {t.selectControls}
        </h3>
        <div className="space-y-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onSelect('arrows')}
            className="w-full flex items-center justify-center gap-3 py-6"
          >
            <ArrowLeftRight className="w-8 h-8" />
            <span className="text-lg">{t.arrowControls}</span>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => onSelect('touch')}
            className="w-full flex items-center justify-center gap-3 py-6"
          >
            <Hand className="w-8 h-8" />
            <span className="text-lg">{t.touchControls}</span>
          </Button>
        </div>
        <p className="text-gray-400 text-center text-sm">
          {t.controlsNote}
        </p>
      </div>
    </div>
  );
};
