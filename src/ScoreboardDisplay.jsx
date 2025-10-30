import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';
import TeamSection from './TeamSection';
import CenterDisplay from './CenterDisplay';
import ScanLineOverlay from './ScanLineOverlay';
import ScoreboardBars from './ScoreboardBars';

const ScoreboardDisplay = ({ presentationMode = false }) => {
  const { matchState, zoomLevel } = useMatch();
  const { animations } = useAnimations();

  const heightClass = presentationMode
    ? 'h-screen'
    : 'h-[50vh] md:h-[60vh] lg:h-[65vh]';

  return (
    <div className={`${heightClass} gradient-background relative flex items-center justify-center px-6 md:px-12 lg:px-xl transition-all duration-300`}>
      <ScanLineOverlay />
      <ScoreboardBars active={animations.goalCelebration.active} team={animations.goalCelebration.team} />

      <div
        className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 z-30 w-full px-4"
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
          <TeamSection
            team="teamA"
            side="left"
            teamData={matchState.teamA}
          />
        </div>

        <div className="w-full md:w-auto flex-shrink-0">
          <CenterDisplay />
        </div>

        <div className="w-full md:w-80 lg:w-96 flex-shrink-0">
          <TeamSection
            team="teamB"
            side="right"
            teamData={matchState.teamB}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreboardDisplay;
