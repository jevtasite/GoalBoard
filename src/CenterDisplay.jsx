import { useMatch } from './MatchContext';

const CenterDisplay = () => {
  const { matchState } = useMatch();
  const { timer, period } = matchState;

  const isLowTime = timer.minutes < 5 && (period === 'First Half' || period === 'Second Half');
  const timerColor = isLowTime ? 'text-electricMint' : 'text-white';

  const formatTime = (mins, secs, ms) => {
    const formattedMins = String(mins).padStart(2, '0');
    const formattedSecs = String(secs).padStart(2, '0');
    const formattedMs = String(ms).padStart(2, '0');
    return { formattedMins, formattedSecs, formattedMs };
  };

  const { formattedMins, formattedSecs, formattedMs } = formatTime(timer.minutes, timer.seconds, timer.milliseconds);

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-vs text-slateGray mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8">
        VS
      </div>
      <div className={`flex items-baseline ${timerColor} mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-8`}>
        <span className="font-mono text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-timer font-bold leading-none tracking-wider">
          {formattedMins}:{formattedSecs}
        </span>
        <span className="font-mono text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-timer-ms font-bold leading-none ml-1 md:ml-2 lg:ml-3 xl:ml-4">
          .{formattedMs}
        </span>
      </div>
      <div className="font-heading text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-period uppercase tracking-widest text-slateGray">
        {period}
      </div>
    </div>
  );
};

export default CenterDisplay;
