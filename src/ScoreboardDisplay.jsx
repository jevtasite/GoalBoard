import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';
import TeamSection from './TeamSection';
import CenterDisplay from './CenterDisplay';
import ScanLineOverlay from './ScanLineOverlay';
import ScoreboardBars from './ScoreboardBars';

const ScoreboardDisplay = () => {
  const { matchState } = useMatch();
  const { animations } = useAnimations();

  return (
    <div className="h-[50vh] md:h-[60vh] lg:h-[65vh] gradient-background relative flex items-center justify-between px-6 md:px-12 lg:px-xl">
      <ScanLineOverlay />
      <ScoreboardBars active={animations.goalCelebration.active} />

      {animations.goalCelebration.active && (
        <div className="absolute inset-0 goal-celebration-flash" />
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center z-30">
        <TeamSection
          team="teamA"
          side="left"
          teamData={matchState.teamA}
        />

        <CenterDisplay />

        <TeamSection
          team="teamB"
          side="right"
          teamData={matchState.teamB}
        />
      </div>
    </div>
  );
};

export default ScoreboardDisplay;
