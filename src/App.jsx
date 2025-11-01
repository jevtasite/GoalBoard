import { useState, useEffect } from 'react';
import { MatchProvider, useMatch } from './contexts/MatchContext';
import { AnimationProvider } from './contexts/AnimationContext';
import { TranslationProvider, useTranslation } from './contexts/TranslationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import ScoreboardDisplay from './components/display/ScoreboardDisplay';
import ControlPanel from './components/controls/ControlPanel';
import NextMatchModal from './components/modals/NextMatchModal';
import LanguageSelector from './components/selectors/LanguageSelector';
import ThemeSelector from './components/selectors/ThemeSelector';
import DeveloperCredit from './components/misc/DeveloperCredit';
import { Monitor } from 'lucide-react';

function AppContent() {
  const [showNextMatchModal, setShowNextMatchModal] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [showSetTimeModal, setShowSetTimeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');
  const [customSeconds, setCustomSeconds] = useState('');
  const [isControlPanelVisible, setIsControlPanelVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [shouldApplyPadding, setShouldApplyPadding] = useState(true);
  const { resetTimer, setTimerTime, matchState } = useMatch();
  const { isMobileDevice, isPortrait, isPhone, isPhoneLandscape } = useDeviceDetection();
  const { t, language, setLanguage } = useTranslation();
  useKeyboardShortcuts(setShowNextMatchModal, setPresentationMode, setShowResetConfirmModal);

  const isTimerRunning = matchState.timer.isRunning;

  const confirmResetTimer = () => {
    resetTimer();
    setShowResetConfirmModal(false);
  };

  const handleSetTime = () => {
    const mins = parseInt(customMinutes) || 0;
    const secs = parseInt(customSeconds) || 0;
    setTimerTime(mins, secs);
    setShowSetTimeModal(false);
    setCustomMinutes('');
    setCustomSeconds('');
  };

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    setShowLanguageModal(false);
  };

  const languages = [
    { code: 'en', name: 'English', flagCode: 'gb' },
    { code: 'sr', name: 'Srpski', flagCode: 'rs' },
    { code: 'es', name: 'Español', flagCode: 'es' },
    { code: 'pt', name: 'Português', flagCode: 'pt' }
  ];

  // Initialize states based on device type on mount
  useEffect(() => {
    if (isMobileDevice) {
      setIsControlPanelVisible(false);
      setShouldApplyPadding(false);
    }
  }, [isMobileDevice]);

  // Handle control panel animation when presentation mode changes
  useEffect(() => {
    if (!isMobileDevice) {
      if (presentationMode) {
        // Entering presentation mode - remove padding immediately so content moves with panel
        setShouldApplyPadding(false);
        setIsAnimatingOut(true);
        const timer = setTimeout(() => {
          setIsControlPanelVisible(false);
          setIsAnimatingOut(false);
        }, 300); // Match animation duration
        return () => clearTimeout(timer);
      } else {
        // Exiting presentation mode - show and slide up
        setShouldApplyPadding(true); // Apply padding immediately
        setIsControlPanelVisible(true);
        setIsAnimatingOut(false); // Reset animation state to prevent race condition
      }
    }
  }, [presentationMode, isMobileDevice]);

  return (
    <div className="min-h-screen bg-broadcastNavy overflow-hidden relative">
      {/* Scoreboard - full screen on desktop, adjusts on mobile */}
      <div className={isMobileDevice ? 'flex flex-col' : 'h-screen'}>
        <ScoreboardDisplay
          presentationMode={presentationMode}
          isMobileDevice={isMobileDevice}
          isPortrait={isPortrait}
          isPhone={isPhone}
          isPhoneLandscape={isPhoneLandscape}
          setShowResetConfirmModal={setShowResetConfirmModal}
          setShowSetTimeModal={setShowSetTimeModal}
          shouldApplyPadding={shouldApplyPadding}
        />

        {/* Language Selector for mobile devices - hide when timer is running */}
        <div className={`transition-opacity duration-300 ${isMobileDevice && !presentationMode && !isTimerRunning ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          {isMobileDevice && !presentationMode && (
            <LanguageSelector isMobile={true} setShowLanguageModal={setShowLanguageModal} />
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
      </div>

      {/* Control panel slides up from bottom on desktop - absolutely positioned */}
      {!isMobileDevice && isControlPanelVisible && (
        <div className={`fixed bottom-0 left-0 right-0 z-40 ${isAnimatingOut ? 'slide-down' : 'slide-up'}`}>
          <ControlPanel
            setPresentationMode={setPresentationMode}
            showResetConfirmModal={showResetConfirmModal}
            setShowResetConfirmModal={setShowResetConfirmModal}
            showNextMatchModal={showNextMatchModal}
            setShowNextMatchModal={setShowNextMatchModal}
            setShowSetTimeModal={setShowSetTimeModal}
            setShowLanguageModal={setShowLanguageModal}
          />
        </div>
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

      {/* Set Time Modal - always accessible even in Projector Mode */}
      {showSetTimeModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setShowSetTimeModal(false);
            setCustomMinutes('');
            setCustomSeconds('');
          }}
        >
          <div
            className="bg-broadcastNavy rounded-2xl p-6 md:p-8 max-w-md w-full modal-animate shadow-2xl border-2 border-steelBlue"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-3xl text-electricMint mb-4 uppercase tracking-wide">
              {t('setTimer')}
            </h2>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-body text-white mb-2">
                  {t('minutes')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(e.target.value)}
                  className="w-full px-4 py-3 bg-steelBlue text-electricMint font-mono text-2xl rounded-lg border-2 border-steelBlue focus:border-electricMint focus:outline-none text-center"
                  placeholder="00"
                  autoFocus
                />
              </div>
              <div className="flex items-end pb-3">
                <span className="text-electricMint font-mono text-3xl">:</span>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-body text-white mb-2">
                  {t('seconds')}
                </label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={customSeconds}
                  onChange={(e) => setCustomSeconds(e.target.value)}
                  className="w-full px-4 py-3 bg-steelBlue text-electricMint font-mono text-2xl rounded-lg border-2 border-steelBlue focus:border-electricMint focus:outline-none text-center"
                  placeholder="00"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSetTimeModal(false);
                  setCustomMinutes('');
                  setCustomSeconds('');
                }}
                className="flex-1 px-6 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleSetTime}
                className="flex-1 px-6 py-3 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy font-body font-semibold rounded-lg transition-all button-press shadow-lg"
              >
                {t('setTime')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection Modal - always accessible even in Projector Mode */}
      {showLanguageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="bg-broadcastNavy rounded-2xl p-6 md:p-8 max-w-md w-full modal-animate shadow-2xl border-2 border-steelBlue"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-3xl text-electricMint mb-4 uppercase tracking-wide">
              {t('selectLanguage')}
            </h2>

            <div className="flex flex-col gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full px-6 py-4 font-body transition-colors text-left flex items-center gap-4 rounded-lg ${
                    lang.code === language
                      ? 'bg-electricMint text-broadcastNavy font-semibold'
                      : 'bg-steelBlue text-white hover:bg-steelBlue/80'
                  }`}
                >
                  <span className={`fi fi-${lang.flagCode} text-2xl`}></span>
                  <span className="text-lg">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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
