import { useState } from 'react';
import { useMatch } from './MatchContext';
import { Play, Pause, ChevronDown } from 'lucide-react';

const CenterDisplay = ({ isMobileDevice = false, isPhone = false }) => {
  const { matchState, toggleTimer, updatePeriod } = useMatch();
  const { timer, period } = matchState;
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);

  const periods = ['First Half', 'Second Half', 'Extra Time'];

  const isLowTime = timer.minutes < 5 && (period === 'First Half' || period === 'Second Half');
  const timerColor = isLowTime ? 'text-electricMint' : 'text-white';

  const formatTime = (mins, secs, ms) => {
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    const formattedMs = String(ms).padStart(2, '0');
    return { formattedMins, formattedSecs, formattedMs };
  };

  const { formattedMins, formattedSecs, formattedMs } = formatTime(timer.minutes, timer.seconds, timer.milliseconds);

  const handlePeriodChange = (newPeriod) => {
    updatePeriod(newPeriod);
    setShowPeriodSelector(false);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className={`font-heading ${isPhone ? 'text-5xl mb-3' : 'text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-vs mb-2 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8'} text-slateGray`}>
        VS
      </div>

      {/* Timer Display */}
      <div className={`flex items-baseline ${timerColor} ${isPhone ? 'mb-3' : 'mb-2 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8'}`}>
        <span className={`font-mono ${isPhone ? 'text-5xl' : 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-timer'} font-bold leading-none tracking-wider`}>
          {formattedMins}:{formattedSecs}
        </span>
        <span className={`font-mono ${isPhone ? 'text-3xl ml-2' : 'text-2xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-timer-ms ml-1 md:ml-2 lg:ml-3 xl:ml-4'} font-bold leading-none`}>
          .{formattedMs}
        </span>
      </div>

      {/* Mobile timer control button - only visible on mobile devices */}
      {isMobileDevice && (
        <button
          onClick={toggleTimer}
          className={`${isPhone ? 'mb-3 px-7 py-3 text-lg' : 'mb-2 md:mb-4 px-5 md:px-8 py-2 md:py-4 text-sm md:text-xl'} bg-electricMint hover:bg-electricMint/80 active:bg-electricMint/60 text-broadcastNavy font-body font-semibold rounded-lg transition-all shadow-lg flex items-center gap-2`}
        >
          {timer.isRunning ? (
            <>
              <Pause className={`${isPhone ? 'w-5 h-5' : 'w-4 h-4 md:w-6 md:h-6'}`} />
              Pause
            </>
          ) : (
            <>
              <Play className={`${isPhone ? 'w-5 h-5' : 'w-4 h-4 md:w-6 md:h-6'}`} />
              Start
            </>
          )}
        </button>
      )}

      {/* Period Display - tappable on mobile */}
      {isMobileDevice ? (
        <div className="relative">
          <button
            onClick={() => setShowPeriodSelector(!showPeriodSelector)}
            className={`font-heading ${isPhone ? 'text-xl' : 'text-base md:text-3xl'} uppercase tracking-widest text-slateGray hover:text-electricMint transition-colors flex items-center gap-1 md:gap-2`}
          >
            {period}
            <ChevronDown className={`${isPhone ? 'w-5 h-5' : 'w-4 h-4 md:w-6 md:h-6'} transition-transform ${showPeriodSelector ? 'rotate-180' : ''}`} />
          </button>

          {showPeriodSelector && (
            <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-steelBlue rounded-lg shadow-2xl border-2 border-electricMint/30 overflow-hidden z-50 ${isPhone ? 'min-w-[200px]' : 'min-w-[160px] md:min-w-[250px]'}`}>
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePeriodChange(p)}
                  className={`w-full ${isPhone ? 'px-5 py-3 text-base' : 'px-3 md:px-6 py-2 md:py-4 text-xs md:text-lg'} font-body transition-colors ${
                    p === period
                      ? 'bg-electricMint text-broadcastNavy font-semibold'
                      : 'text-white hover:bg-steelBlue/80'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="font-heading text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-period uppercase tracking-widest text-slateGray">
          {period}
        </div>
      )}
    </div>
  );
};

export default CenterDisplay;
