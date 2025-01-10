import React from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";

interface CountdownProps {
  count: number;
}

export const Countdown: React.FC<CountdownProps> = ({ count }) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
      <div className="text-6xl font-bold text-white">
        {count === 0 ? t.go : count}
      </div>
    </div>
  );
};
