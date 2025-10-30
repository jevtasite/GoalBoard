import { useState } from 'react';
import { useMatch } from './MatchContext';
import { useTranslation } from './TranslationContext';
import { Play, Pause, ChevronDown } from 'lucide-react';

const CenterDisplay = ({ isMobileDevice = false, isPhone = false, isPhoneLandscape = false }) => {
  const { matchState, toggleTimer, updatePeriod } = useMatch();
  const { t } = useTranslation();
  const { timer, period } = matchState;
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  const periods = [
    { key: 'firstHalf', label: t('firstHalf'), value: 'First Half' },
    { key: 'secondHalf', label: t('secondHalf'), value: 'Second Half' },
    { key: 'extraTime', label: t('extraTime'), value: 'Extra Time' }
  ];

  const formatTime = (mins, secs, ms) => {
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    const formattedMs = String(ms).padStart(2, '0');
    return { formattedMins, formattedSecs, formattedMs };
  };

  const { formattedMins, formattedSecs, formattedMs } = formatTime(timer.minutes, timer.seconds, timer.milliseconds);

  const handlePeriodChange = (periodValue) => {
    updatePeriod(periodValue);
    setShowPeriodSelector(false);
  };

  // Get current period translation
  const getCurrentPeriodLabel = () => {
    const periodMap = {
      'First Half': t('firstHalf'),
      'Second Half': t('secondHalf'),
      'Extra Time': t('extraTime')
    };
    return periodMap[period] || period;
  };

  return (
    <div className={`flex flex-col items-center justify-center ${isPhoneLandscape ? 'px-2' : 'px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12'}`}>
      <div className={`font-heading ${isPhoneLandscape ? 'text-2xl mb-1' : isPhone ? 'text-5xl mb-3' : 'text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-vs mb-2 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8'} text-slateGray`}>
        {t('vs')}
      </div>

      {/* Timer Display */}
      <div className={`flex items-baseline text-white ${isPhoneLandscape ? 'mb-1' : isPhone ? 'mb-3' : 'mb-2 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8'}`}>
        <span className={`font-mono ${isPhoneLandscape ? 'text-4xl' : isPhone ? 'text-5xl' : 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-timer'} font-bold leading-none tracking-wider`}>
          {formattedMins}:{formattedSecs}
        </span>
        <span className={`font-mono ${isPhoneLandscape ? 'text-2xl ml-1' : isPhone ? 'text-3xl ml-2' : 'text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-timer-ms ml-1 md:ml-2 lg:ml-3 xl:ml-4'} font-bold leading-none`}>
          .{formattedMs}
        </span>
      </div>

      {/* Mobile timer control button - only visible on mobile devices */}
      {isMobileDevice && (
        <button
          onClick={toggleTimer}
          className={`${isPhoneLandscape ? 'mb-1 px-4 py-2 text-sm' : isPhone ? 'mb-3 px-7 py-3 text-lg' : 'mb-2 md:mb-4 px-5 md:px-8 py-2 md:py-4 text-sm md:text-xl'} bg-electricMint hover:bg-electricMint/80 active:bg-electricMint/60 text-broadcastNavy font-body font-semibold rounded-lg transition-all shadow-lg flex items-center gap-1`}
        >
          {timer.isRunning ? (
            <>
              <Pause className={`${isPhoneLandscape ? 'w-4 h-4' : isPhone ? 'w-5 h-5' : 'w-4 h-4 md:w-6 md:h-6'}`} />
              {t('pause')}
            </>
          ) : (
            <>
              <Play className={`${isPhoneLandscape ? 'w-4 h-4' : isPhone ? 'w-5 h-5' : 'w-4 h-4 md:w-6 md:h-6'}`} />
              {t('start')}
            </>
          )}
        </button>
      )}

      {/* Period Display - tappable on mobile */}
      {isMobileDevice ? (
        <div className="relative">
          <button
            onClick={() => setShowPeriodSelector(!showPeriodSelector)}
            className={`font-heading ${isPhoneLandscape ? 'text-sm' : isPhone ? 'text-xl' : 'text-base md:text-3xl'} uppercase tracking-widest text-slateGray hover:text-electricMint transition-colors flex items-center gap-1 md:gap-2`}
          >
            {getCurrentPeriodLabel()}
            <ChevronDown className={`${isPhoneLandscape ? 'w-4 h-4' : isPhone ? 'w-5 h-5' : 'w-4 h-4 md:w-6 md:h-6'} transition-transform ${showPeriodSelector ? 'rotate-180' : ''}`} />
          </button>

          {showPeriodSelector && (
            <div className={`absolute ${isPhoneLandscape ? 'bottom-full mb-2' : 'top-full mt-2'} left-1/2 transform -translate-x-1/2 bg-steelBlue rounded-lg shadow-2xl border-2 border-electricMint/30 overflow-hidden z-50 ${isPhoneLandscape ? 'min-w-[140px]' : isPhone ? 'min-w-[200px]' : 'min-w-[160px] md:min-w-[250px]'}`}>
              {periods.map((p) => (
                <button
                  key={p.key}
                  onClick={() => handlePeriodChange(p.value)}
                  className={`w-full ${isPhoneLandscape ? 'px-3 py-1.5 text-xs' : isPhone ? 'px-5 py-3 text-base' : 'px-3 md:px-6 py-2 md:py-4 text-xs md:text-lg'} font-body transition-colors ${
                    period === p.value
                      ? 'bg-electricMint text-broadcastNavy font-semibold'
                      : 'text-white hover:bg-steelBlue/80'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="font-heading text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-period uppercase tracking-widest text-slateGray">
          {getCurrentPeriodLabel()}
        </div>
      )}
    </div>
  );
};

export default CenterDisplay;
