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
    : 'h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh]';

  return (
    <div className={`${heightClass} gradient-background relative flex items-center justify-center px-6 md:px-8 lg:px-10 xl:px-12 transition-all duration-300 overflow-hidden`}>
      <ScanLineOverlay />
      <ScoreboardBars active={animations.goalCelebration.active} team={animations.goalCelebration.team} />

      <div
        className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 z-30 w-full"
        style={{
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className="w-full md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem] flex-shrink-0">
          <TeamSection
            team="teamA"
            side="left"
            teamData={matchState.teamA}
          />
        </div>

        <div className="w-full md:w-auto md:min-w-[16rem] lg:min-w-[20rem] xl:min-w-[24rem] flex-shrink-0">
          <CenterDisplay />
        </div>

        <div className="w-full md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem] flex-shrink-0">
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
