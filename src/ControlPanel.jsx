import TeamControls from './TeamControls';
import MatchControls from './MatchControls';

const ControlPanel = ({ setPresentationMode, showResetConfirmModal, setShowResetConfirmModal }) => {
  return (
    <div className="h-[50vh] md:h-[40vh] lg:h-[35vh] gradient-control-panel p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-y-auto">
      <TeamControls team="teamA" />
      <MatchControls setPresentationMode={setPresentationMode} showResetConfirmModal={showResetConfirmModal} setShowResetConfirmModal={setShowResetConfirmModal} />
      <TeamControls team="teamB" />
    </div>
  );
};

export default ControlPanel;
