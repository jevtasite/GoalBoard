import { useState } from 'react';
import { MatchProvider, useMatch } from './MatchContext';
import { AnimationProvider } from './AnimationContext';
import { TranslationProvider, useTranslation } from './TranslationContext';
import { ThemeProvider } from './ThemeContext';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { useDeviceDetection } from './useDeviceDetection';
import ScoreboardDisplay from './ScoreboardDisplay';
import ControlPanel from './ControlPanel';
import NextMatchModal from './NextMatchModal';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import DeveloperCredit from './DeveloperCredit';
import { Monitor } from 'lucide-react';

function AppContent() {
  const [showNextMatchModal, setShowNextMatchModal] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const { resetTimer, matchState } = useMatch();
  const { isMobileDevice, isPortrait, isPhone, isPhoneLandscape } = useDeviceDetection();
  const { t } = useTranslation();
  useKeyboardShortcuts(setShowNextMatchModal, setPresentationMode, setShowResetConfirmModal);

  const isTimerRunning = matchState.timer.isRunning;

  const confirmResetTimer = () => {
    resetTimer();
    setShowResetConfirmModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-broadcastNavy overflow-hidden">
      <ScoreboardDisplay presentationMode={presentationMode} isMobileDevice={isMobileDevice} isPortrait={isPortrait} isPhone={isPhone} isPhoneLandscape={isPhoneLandscape} setShowResetConfirmModal={setShowResetConfirmModal} />

      {/* Language Selector for mobile devices - hide when timer is running */}
      <div className={`transition-opacity duration-300 ${isMobileDevice && !presentationMode && !isTimerRunning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {isMobileDevice && !presentationMode && (
          <LanguageSelector isMobile={true} />
        )}
      </div>

      {/* Theme Selector for mobile devices - hide when timer is running */}
      <div className={`transition-opacity duration-300 ${isMobileDevice && !presentationMode && !isTimerRunning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {isMobileDevice && !presentationMode && (
          <ThemeSelector isMobile={true} />
        )}
      </div>

      {/* Developer Credit - hide on mobile when timer is running */}
      <div className={`transition-opacity duration-300 ${!presentationMode && !(isMobileDevice && isTimerRunning) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {!presentationMode && (
          <DeveloperCredit isMobileDevice={isMobileDevice} />
        )}
      </div>

      {/* Hide control panel on mobile devices (phones and tablets), show on desktops */}
      {!presentationMode && !isMobileDevice && (
        <ControlPanel setPresentationMode={setPresentationMode} showResetConfirmModal={showResetConfirmModal} setShowResetConfirmModal={setShowResetConfirmModal} showNextMatchModal={showNextMatchModal} setShowNextMatchModal={setShowNextMatchModal} />
      )}

      {/* Projector Mode Indicator - visible on hover */}
      {presentationMode && (
        <div className="fixed bottom-4 right-4 z-50 group">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-electricMint/20 backdrop-blur-sm border-2 border-electricMint px-4 py-2 rounded-lg">
            <p className="font-body text-electricMint text-sm font-semibold flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              {t('projectorMode')} <kbd className="px-2 py-1 bg-electricMint/30 rounded">Tab</kbd> {t('toToggleControls')}
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
              {t('resetTimerTitle')}
            </h2>

            <p className="font-body text-white mb-6">
              {t('resetTimerMessage')}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 px-6 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body rounded-lg transition-all button-press"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmResetTimer}
                className="flex-1 px-6 py-3 bg-broadcastRed hover:bg-broadcastRed/80 text-white font-body font-semibold rounded-lg transition-all button-press"
              >
                {t('reset')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Match Modal - always accessible even in Projector Mode */}
      <NextMatchModal
        isOpen={showNextMatchModal}
        onClose={() => setShowNextMatchModal(false)}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <MatchProvider>
          <AnimationProvider>
            <AppContent />
          </AnimationProvider>
        </MatchProvider>
      </TranslationProvider>
    </ThemeProvider>
  );
}

export default App;
