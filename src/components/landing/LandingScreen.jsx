import { useEffect, useState } from 'react';
import { Play, Timer, Maximize, RectangleVertical, Palette, Monitor, Languages } from 'lucide-react';
import ScanLineOverlay from '../display/ScanLineOverlay';
import { setSEO } from '../../utils/seo';
import { useTheme } from '../../contexts/ThemeContext';

const LandingScreen = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [skipNext, setSkipNext] = useState(() => {
    try { return localStorage.getItem('skipLanding') === '1'; } catch { return false; }
  });
  const { changeTheme } = useTheme();

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

  // Set theme to dark on mount for landing page
  useEffect(() => {
    changeTheme('dark');
  }, [changeTheme]);

  return (
    <div className={`min-h-screen gradient-background relative flex flex-col items-center justify-center p-4 ${isExiting ? 'page-fade-out' : 'page-fade-in'}`}>
      <ScanLineOverlay />

      {/* Center card */}
      <div className="relative z-30 w-full max-w-3xl">
        <div className="landing-card backdrop-blur-xl rounded-2xl shadow-xl p-5 md:p-10 text-center landing-card-entrance">
          {/* Hero Section */}
          <div className="mb-4">
            <div className="flex items-center justify-center mb-3">
              <img
                src="/logo/gb-logo-white.png"
                alt="GoalBoard Logo"
                className="w-14 h-14 md:w-20 md:h-20 object-contain landing-logo"
              />
            </div>
            <h1 className="font-heading text-3xl md:text-6xl landing-title uppercase tracking-widest mb-2">
              GoalBoard
            </h1>
            <p className="font-body text-sm md:text-lg max-w-xl mx-auto landing-description">
              Professional football scoreboard with live scores, precision timer, cards, and projector mode.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-2.5">
            <button
              onClick={startWithTransition}
              className="landing-button px-8 md:px-10 py-3 md:py-4 font-body font-bold text-base md:text-lg rounded-lg transition-all duration-300 button-press flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Launch Scoreboard
            </button>
            <label className="flex items-center gap-2 landing-checkbox-label font-body cursor-pointer select-none text-sm md:text-base transition-colors">
              <input
                type="checkbox"
                checked={skipNext}
                onChange={(e) => {
                  const v = e.target.checked; setSkipNext(v);
                  try { v ? localStorage.setItem('skipLanding', '1') : localStorage.removeItem('skipLanding'); } catch {}
                }}
                className="checkbox-mint"
              />
              <span>Skip this screen next time</span>
            </label>
          </div>

          {/* Features Grid */}
          <div className="mt-6 pt-4 landing-features-border">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Feature icon={<Timer className="w-4 h-4" />} label="Precision Timer" />
              <Feature icon={<RectangleVertical className="w-4 h-4" />} label="Cards & Fouls" />
              <Feature icon={<Maximize className="w-4 h-4" />} label="Projector Mode" />
              <Feature icon={<Palette className="w-4 h-4" />} label="Custom Themes" />
              <Feature icon={<Monitor className="w-4 h-4" />} label="Responsive" />
              <Feature icon={<Languages className="w-4 h-4" />} label="Multi-Language" />
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credit - Below card */}
      <div className="relative z-30 mt-6 flex justify-center">
        <a
          href="https://dev-look.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-steelBlue/60 hover:bg-steelBlue/80 backdrop-blur-sm border border-electricMint/30 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <span className="font-body text-xs md:text-sm text-white/80">
            <span className="text-electricMint font-semibold">&lt;/&gt;</span> DevLook
          </span>
        </a>
      </div>
    </div>
  );
};

const Feature = ({ label, icon }) => (
  <div className="landing-feature-card rounded-lg px-3 py-3 font-body text-sm transition-all duration-300">
    <div className="flex flex-col items-center justify-center gap-2 text-center">
      <div className="landing-feature-icon">
        {icon}
      </div>
      <span className="landing-feature-label font-semibold leading-tight">{label}</span>
    </div>
  </div>
);

export default LandingScreen;
