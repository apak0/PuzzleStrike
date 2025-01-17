import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';
import { Button } from '../UI/Button';
import { HelpCircle, X } from 'lucide-react';

export const TouchInstructions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  if (!('ontouchstart' in window)) {
    return null;
  }

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>

      {isVisible && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-6 rounded-lg border-2 border-purple-500/50 max-w-sm w-full space-y-4 relative">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <h3 className="text-xl font-bold text-purple-400">{t.touchControls}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• {t.touchSwipeLeftRight}</li>
              <li>• {t.touchSwipeDown}</li>
              <li>• {t.touchTap}</li>
              <li>• {t.touchSwipeDownFast}</li>
            </ul>
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsVisible(false)}
              className="w-full mt-6"
            >
              {t.gotIt}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
