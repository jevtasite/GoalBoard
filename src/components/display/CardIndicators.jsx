import { RectangleVertical } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

const CardIndicators = ({ yellowCards, redCards, fouls }) => {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex gap-2 md:gap-3 lg:gap-4 xl:gap-5 2xl:gap-6 mt-4 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-8 justify-center flex-wrap">
      {fouls > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-2 lg:gap-2.5 xl:gap-3 px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 md:py-2 lg:py-2.5 xl:py-3 2xl:py-3.5 rounded-lg bg-electricMint/10 text-electricMint font-body font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl border border-electricMint/30">
          {t('fouls')}: {fouls}
        </div>
      )}
      {yellowCards > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-1.5 lg:gap-2">
          <RectangleVertical className="w-6 h-8 md:w-8 md:h-10 lg:w-10 lg:h-12 xl:w-12 xl:h-16 2xl:w-14 2xl:h-20 fill-yellow-400 stroke-yellow-400 drop-shadow-lg" />
          <span className="text-white font-body font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {yellowCards}
          </span>
        </div>
      )}
      {redCards > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-1.5 lg:gap-2">
          <RectangleVertical className="w-6 h-8 md:w-8 md:h-10 lg:w-10 lg:h-12 xl:w-12 xl:h-16 2xl:w-14 2xl:h-20 fill-red-600 stroke-red-600 drop-shadow-lg" />
          <span className="text-white font-body font-bold text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {redCards}
          </span>
        </div>
      )}
    </div>
  );
};

export default CardIndicators;
