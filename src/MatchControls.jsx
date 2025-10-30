import { useState } from 'react';
import { useMatch } from './MatchContext';
import PeriodSelector from './PeriodSelector';
import NextMatchModal from './NextMatchModal';

const MatchControls = ({ setPresentationMode, showResetConfirmModal, setShowResetConfirmModal }) => {
  const { matchState, toggleTimer, zoomLevel, setZoomLevel } = useMatch();
  const [showNextMatchModal, setShowNextMatchModal] = useState(false);
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
      <h3 className="font-heading text-2xl text-electricMint uppercase tracking-wider text-center">
        Match Controls
      </h3>

      <div className="font-mono text-4xl md:text-5xl text-electricMint text-center font-bold py-4">
        {formatTime(timer.minutes, timer.seconds)}
      </div>

      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className="relative flex-1 px-4 py-3 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy font-body font-semibold rounded-lg transition-all button-press shadow-lg"
          title="Start/Pause timer (Space)"
        >
          {timer.isRunning ? '⏸ Pause' : '▶ Start'}
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded text-white">
            Space
          </span>
        </button>

        <button
          onClick={handleResetTimer}
          className="relative px-4 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press"
          title="Reset timer (R)"
        >
          ⟲ Reset
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
            Scoreboard Size
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
        className="relative w-full px-4 py-3 bg-goalGreen hover:bg-goalGreen/80 text-white font-body font-semibold rounded-lg transition-all button-press shadow-lg mt-2"
        title="Next match (N)"
      >
        🔄 Next Match
        <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
          N
        </span>
      </button>

      <div className="flex gap-3">
        <button
          onClick={toggleFullscreen}
          className="relative flex-1 px-4 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press"
          title="Toggle fullscreen (F)"
        >
          ⛶ Fullscreen
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
            F
          </span>
        </button>

        <button
          onClick={() => setPresentationMode(true)}
          className="relative flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white font-body font-semibold rounded-lg transition-all button-press shadow-lg"
          title="Projector mode (Tab)"
        >
          📽️ Projector
          <span className="absolute top-1 right-1 text-[10px] bg-black/30 px-1 rounded">
            Tab
          </span>
        </button>
      </div>

      <NextMatchModal
        isOpen={showNextMatchModal}
        onClose={() => setShowNextMatchModal(false)}
      />
    </div>
  );
};

export default MatchControls;
