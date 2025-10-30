import { useMatch } from './MatchContext';
import { useTranslation } from './TranslationContext';
import PeriodSelector from './PeriodSelector';
import LanguageSelector from './LanguageSelector';
import { Play, Pause, RotateCcw, Maximize, Monitor, RefreshCw } from 'lucide-react';

const MatchControls = ({ setPresentationMode, showResetConfirmModal, setShowResetConfirmModal, showNextMatchModal, setShowNextMatchModal }) => {
  const { matchState, toggleTimer, zoomLevel, setZoomLevel } = useMatch();
  const { t } = useTranslation();
  const { timer } = matchState;

  const handleResetTimer = () => {
    setShowResetConfirmModal(true);
  };

  const formatTime = (mins, secs) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="bg-steelBlue/30 rounded-xl p-4 md:p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-heading text-2xl text-electricMint uppercase tracking-wider flex-1 text-center">
          {t('matchControls')}
        </h3>
        <LanguageSelector />
      </div>

      <div className="font-mono text-4xl md:text-5xl text-electricMint text-center font-bold py-4">
        {formatTime(timer.minutes, timer.seconds)}
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className="relative flex-1 px-4 py-3 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy font-body font-semibold rounded-lg transition-all button-press shadow-lg flex items-center justify-center gap-2"
          title="Start/Pause timer (Space)"
        >
          {timer.isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              {t('pause')}
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              {t('start')}
            </>
          )}
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded text-white">
            Space
          </span>
        </button>

        <button
          onClick={handleResetTimer}
          className="relative px-4 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press flex items-center justify-center gap-2"
          title="Reset timer (R)"
        >
          <RotateCcw className="w-4 h-4" />
          {t('reset')}
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
            R
          </span>
        </button>
      </div>

      <PeriodSelector />

      {/* Zoom Control */}
      <div className="bg-broadcastNavy/30 rounded-lg p-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          <label className="font-body text-sm text-electricMint font-semibold">
            {t('scoreboardSize')}
          </label>
          <span className="font-mono text-electricMint text-sm font-bold">
            {zoomLevel}%
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="150"
          step="5"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-steelBlue rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-slateGray">50%</span>
          <span className="text-xs text-slateGray">150%</span>
        </div>
      </div>

      <button
        onClick={() => setShowNextMatchModal(true)}
        className="relative w-full px-4 py-3 bg-goalGreen hover:bg-goalGreen/80 text-white font-body font-semibold rounded-lg transition-all button-press shadow-lg mt-2 flex items-center justify-center gap-2"
        title="Next match (N)"
      >
        <RefreshCw className="w-4 h-4" />
        {t('nextMatch')}
        <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
          N
        </span>
      </button>

      <div className="flex gap-3">
        <button
          onClick={toggleFullscreen}
          className="relative flex-1 px-4 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press flex items-center justify-center gap-2"
          title="Toggle fullscreen (F)"
        >
          <Maximize className="w-4 h-4" />
          {t('fullscreen')}
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
            F
          </span>
        </button>

        <button
          onClick={() => setPresentationMode(true)}
          className="relative flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white font-body font-semibold rounded-lg transition-all button-press shadow-lg flex items-center justify-center gap-2"
          title="Projector mode (Tab)"
        >
          <Monitor className="w-4 h-4" />
          {t('projector')}
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
            Tab
          </span>
        </button>
      </div>
    </div>
  );
};

export default MatchControls;
