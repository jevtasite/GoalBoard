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
    <div className="flex flex-col items-center justify-center px-4 md:px-8">
      <div className="font-heading text-5xl md:text-6xl lg:text-vs text-slateGray mb-4 md:mb-6">
        VS
      </div>
      <div className={`flex items-baseline ${timerColor} mb-4 md:mb-6`}>
        <span className="font-mono text-6xl md:text-8xl lg:text-timer font-bold leading-none tracking-wider">
          {formattedMins}:{formattedSecs}
        </span>
        <span className="font-mono text-3xl md:text-5xl lg:text-timer-ms font-bold leading-none ml-1 md:ml-2">
          .{formattedMs}
        </span>
      </div>
      <div className="font-heading text-2xl md:text-3xl lg:text-period uppercase tracking-widest text-slateGray">
        {period}
      </div>
    </div>
  );
};

export default CenterDisplay;
