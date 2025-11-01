import { SquareX } from 'lucide-react';
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
        <div className="inline-flex items-center gap-1 md:gap-2 lg:gap-2.5 xl:gap-3 px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 md:py-2 lg:py-2.5 xl:py-3 2xl:py-3.5 rounded-lg bg-yellow-400 text-black font-body font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl shadow-lg">
          <SquareX className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
          {yellowCards}
        </div>
      )}
      {redCards > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-2 lg:gap-2.5 xl:gap-3 px-3 md:px-4 lg:px-5 xl:px-6 2xl:px-7 py-1 md:py-2 lg:py-2.5 xl:py-3 2xl:py-3.5 rounded-lg bg-red-600 text-white font-body font-semibold text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl shadow-lg">
          <SquareX className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
          {redCards}
        </div>
      )}
    </div>
  );
};

export default CardIndicators;
