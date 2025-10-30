import { useMatch } from './MatchContext';

const CenterDisplay = () => {
  const { matchState } = useMatch();
  const { timer, period } = matchState;

  const isLowTime = timer.minutes < 5 && (period === 'First Half' || period === 'Second Half');
  const timerColor = isLowTime ? 'text-electricMint' : 'text-white';

  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8">
      <div className="font-heading text-3xl md:text-4xl text-slateGray mb-2 md:mb-4">
        VS
      </div>
      <div className={`font-mono text-5xl md:text-timer font-bold ${timerColor} leading-none tracking-wider mb-2 md:mb-4`}>
        {formatTime(timer.minutes, timer.seconds)}
      </div>
      <div className="font-heading text-lg md:text-period uppercase tracking-widest text-slateGray">
        {period}
      </div>
    </div>
  );
};

export default CenterDisplay;
