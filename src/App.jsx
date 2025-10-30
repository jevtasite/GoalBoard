import { useState } from 'react';
import { MatchProvider, useMatch } from './MatchContext';
import { AnimationProvider } from './AnimationContext';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import ScoreboardDisplay from './ScoreboardDisplay';
import ControlPanel from './ControlPanel';

function AppContent() {
  const [showNextMatchModal, setShowNextMatchModal] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const { resetTimer } = useMatch();
  useKeyboardShortcuts(setShowNextMatchModal, setPresentationMode, setShowResetConfirmModal);

  const confirmResetTimer = () => {
    resetTimer();
    setShowResetConfirmModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-broadcastNavy overflow-hidden">
      <ScoreboardDisplay presentationMode={presentationMode} />

      {!presentationMode && <ControlPanel setPresentationMode={setPresentationMode} showResetConfirmModal={showResetConfirmModal} setShowResetConfirmModal={setShowResetConfirmModal} />}

      {/* Projector Mode Indicator - visible on hover */}
      {presentationMode && (
        <div className="fixed bottom-4 right-4 z-50 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-electricMint/20 backdrop-blur-sm border-2 border-electricMint px-4 py-2 rounded-lg">
            <p className="font-body text-electricMint text-sm font-semibold">
              📽️ Projector Mode (Press <kbd className="px-2 py-1 bg-electricMint/30 rounded">Tab</kbd> to toggle controls)
            </p>
          </div>
          {/* Hover trigger area */}
          <div className="absolute inset-0 scale-150" />
        </div>
      )}

      {/* Reset Timer Confirmation Modal - always accessible even in Projector Mode */}
      {showResetConfirmModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowResetConfirmModal(false)}
        >
          <div
            className="bg-broadcastNavy rounded-2xl p-6 md:p-8 max-w-md w-full modal-animate shadow-2xl border-2 border-steelBlue"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-3xl text-electricMint mb-4 uppercase tracking-wide">
              Reset Timer?
            </h2>

            <p className="font-body text-white mb-6">
              Are you sure you want to reset the timer to 00:00?
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 px-6 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body rounded-lg transition-all button-press"
              >
                Cancel
              </button>
              <button
                onClick={confirmResetTimer}
                className="flex-1 px-6 py-3 bg-broadcastRed hover:bg-broadcastRed/80 text-white font-body font-semibold rounded-lg transition-all button-press"
              >
                Reset Timer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <MatchProvider>
      <AnimationProvider>
        <AppContent />
      </AnimationProvider>
    </MatchProvider>
  );
}

export default App;
