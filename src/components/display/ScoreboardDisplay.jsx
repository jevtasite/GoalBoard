import { useMatch } from '../../contexts/MatchContext';
import { useAnimations } from '../../contexts/AnimationContext';
import TeamSection from './TeamSection';
import CenterDisplay from './CenterDisplay';
import ScanLineOverlay from './ScanLineOverlay';
import ScoreboardBars from './ScoreboardBars';

const ScoreboardDisplay = ({ presentationMode = false, isMobileDevice = false, isPortrait = false, isPhone = false, isPhoneLandscape = false, setShowResetConfirmModal }) => {
  const { matchState, zoomLevel } = useMatch();
  const { animations } = useAnimations();

  // Use column layout if: mobile device AND portrait orientation
  const useColumnLayout = isMobileDevice && isPortrait;

  // All devices get full screen height (control panel overlays on desktop)
  const heightClass = 'h-screen';

  return (
    <div className={`${heightClass} gradient-background relative flex items-center justify-center ${isPhoneLandscape ? 'px-3' : 'px-6 md:px-8 lg:px-10 xl:px-12'} transition-all duration-300 overflow-hidden`}>
      <ScanLineOverlay />
      <ScoreboardBars active={false} team={null} />

      <div
        className={`flex ${useColumnLayout ? 'flex-col' : 'flex-col md:flex-row'} items-center justify-center ${isPhoneLandscape ? 'gap-3' : 'gap-4 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16'} z-30 w-full max-h-full ${isPhoneLandscape ? 'py-2' : 'py-4'}`}
        style={{
          transform: isMobileDevice ? 'scale(1)' : `scale(${zoomLevel / 100})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out'
        }}
      >
        <div className={`${useColumnLayout ? 'w-full' : 'w-full md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem]'} flex-shrink-0`}>
          <TeamSection
            team="teamA"
            side="left"
            teamData={matchState.teamA}
            isMobileDevice={isMobileDevice}
            isPhone={isPhone}
            isPhoneLandscape={isPhoneLandscape}
          />
        </div>

        <div className={`${useColumnLayout ? 'w-full' : 'w-full md:w-auto md:min-w-[16rem] lg:min-w-[20rem] xl:min-w-[24rem]'} flex-shrink-0`}>
          <CenterDisplay isMobileDevice={isMobileDevice} isPhone={isPhone} isPhoneLandscape={isPhoneLandscape} setShowResetConfirmModal={setShowResetConfirmModal} />
        </div>

        <div className={`${useColumnLayout ? 'w-full' : 'w-full md:w-72 lg:w-80 xl:w-96 2xl:w-[28rem]'} flex-shrink-0`}>
          <TeamSection
            team="teamB"
            side="right"
            teamData={matchState.teamB}
            isMobileDevice={isMobileDevice}
            isPhone={isPhone}
            isPhoneLandscape={isPhoneLandscape}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreboardDisplay;
