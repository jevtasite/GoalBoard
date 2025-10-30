import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';

const ScoreButtons = ({ team, currentScore }) => {
  const { updateScore } = useMatch();
  const { triggerGoalCelebration } = useAnimations();

  const handleIncrement = () => {
    updateScore(team, 1);
    triggerGoalCelebration(team);
  };

  const handleDecrement = () => {
    if (currentScore > 0) {
      updateScore(team, -1);
      // No animation when removing a goal
    }
  };

  const shortcutInc = team === 'teamA' ? 'W' : 'P';
  const shortcutDec = team === 'teamA' ? 'Q' : 'O';

  return (
    <div className="flex items-center gap-4 my-4">
      <button
        onClick={handleDecrement}
        className="relative w-14 h-14 bg-broadcastRed hover:bg-broadcastRed/80 text-white rounded-xl flex items-center justify-center font-bold text-3xl button-press transition-all shadow-lg"
        title={`Decrease score (${shortcutDec})`}
      >
        <span>-</span>
        <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
          {shortcutDec}
        </span>
      </button>

      <div className="flex-1 text-center font-display text-5xl font-bold text-electricMint">
        {currentScore}
      </div>

      <button
        onClick={handleIncrement}
        className="relative w-14 h-14 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy rounded-xl flex items-center justify-center font-bold text-3xl button-press transition-all shadow-lg button-glow"
        title={`Increase score (${shortcutInc})`}
      >
        <span>+</span>
        <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded text-white">
          {shortcutInc}
        </span>
      </button>
    </div>
  );
};

export default ScoreButtons;
