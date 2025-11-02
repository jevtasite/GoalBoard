import { useEffect, useState } from 'react';
import { Monitor, Play, Timer, Maximize, RectangleVertical } from 'lucide-react';
import ScanLineOverlay from '../display/ScanLineOverlay';
import ThemeSelector from '../selectors/ThemeSelector';
import DeveloperCredit from '../misc/DeveloperCredit';
import { setSEO } from '../../utils/seo';

const LandingScreen = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [skipNext, setSkipNext] = useState(() => {
    try { return localStorage.getItem('skipLanding') === '1'; } catch { return false; }
  });

  const startWithTransition = () => {
    setIsExiting(true);
    try {
      if (skipNext) {
        localStorage.setItem('skipLanding', '1');
      } else {
        localStorage.removeItem('skipLanding');
      }
    } catch {}
    setTimeout(() => onStart && onStart(), 300);
  };

  useEffect(() => {
    setSEO({
      title: 'GoalBoard - Football Scoreboard',
      description:
        'Professional digital scoreboard for football. Live score tracking, precision timer, cards, fouls, corners, projector mode, and themes.'
    });
  }, []);

  return (
    <div className={`min-h-screen gradient-background relative flex items-center justify-center overflow-hidden ${isExiting ? 'page-fade-out' : 'page-fade-in'}`}>
      <ScanLineOverlay />

      {/* Top controls: theme only (landing is English-only) */}
      <div className="absolute top-4 left-4 z-40">
        <ThemeSelector />
      </div>

      {/* Center card */}
      <div className="relative z-30 w-full max-w-4xl px-6">
        <div className="bg-broadcastNavy/70 backdrop-blur-md border-2 border-electricMint/30 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Monitor className="w-8 h-8 text-electricMint" />
            <h1 className="font-heading text-4xl md:text-5xl text-electricMint uppercase tracking-widest">GoalBoard</h1>
          </div>
          <p className="font-body text-white/90 text-base md:text-lg max-w-3xl mx-auto">
            Professional digital scoreboard for football. Live score tracking, precision timer, cards, fouls, corners, projector mode, and themes.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3">
            <button
              onClick={startWithTransition}
              className="px-6 md:px-8 py-3 md:py-4 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy font-body font-semibold rounded-lg transition-all button-press shadow-lg flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start
            </button>
            <label className="flex items-center gap-2 text-white/80 font-body cursor-pointer select-none text-sm md:text-base text-center break-words max-w-full">
              <input
                type="checkbox"
                checked={skipNext}
                onChange={(e) => {
                  const v = e.target.checked; setSkipNext(v);
                  try { v ? localStorage.setItem('skipLanding', '1') : localStorage.removeItem('skipLanding'); } catch {}
                }}
                className="w-4 h-4 accent-electricMint"
              />
              <span className="max-w-[32ch] sm:max-w-none leading-snug">Skip landing next time</span>
            </label>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <Feature icon={<Monitor className="w-4 h-4" />} label="Live Scores" />
            <Feature icon={<Timer className="w-4 h-4" />} label="Millisecond Timer" />
            <Feature icon={<RectangleVertical className="w-4 h-4" />} label="Cards & Fouls" />
            <Feature icon={<Maximize className="w-4 h-4" />} label="Projector Mode" />
          </div>
        </div>
      </div>

      {/* Footer credit */}
      <DeveloperCredit />
    </div>
  );
};

const Feature = ({ label, icon }) => (
  <div className="bg-steelBlue/40 border border-electricMint/20 rounded-lg px-3 py-2 text-white/90 font-body text-sm flex items-center gap-2">
    {icon}
    <span>{label}</span>
  </div>
);

export default LandingScreen;
