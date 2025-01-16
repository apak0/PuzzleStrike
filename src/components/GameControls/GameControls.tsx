import React from "react";
import { ArrowLeft, ArrowRight, ArrowDown, RotateCw } from "lucide-react";
import { ControlButton } from "./ControlButton";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../translations";
import { useLongPress } from "../../hooks/useLongPress";

interface GameControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  hardDrop: () => void;
  rotate: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  moveLeft,
  moveRight,
  moveDown,
  hardDrop,
  rotate,
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const downButtonProps = useLongPress({
    onPress: moveDown,
    onLongPress: hardDrop,
    interval: 50,
  });

  return (
    <div className="fixed bottom-4 left-0 right-0 md:hidden">
      <div className="container mx-auto max-w-sm px-4">
        <div className="flex justify-between items-center gap-10">
          <ControlButton
            icon={ArrowDown}
            label={t.moveDown}
            {...downButtonProps}
            className="scale-90 bg-purple-600/20 border-purple-600/50 hover:bg-purple-600/30"
          />

          <ControlButton
            icon={RotateCw}
            onClick={rotate}
            label={t.rotate}
            className="scale-110"
          />

          <div className="flex gap-2">
            <ControlButton
              icon={ArrowLeft}
              onClick={moveLeft}
              label={t.moveLeft}
              className="scale-90"
            />
            <ControlButton
              icon={ArrowRight}
              onClick={moveRight}
              label={t.moveRight}
              className="scale-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
