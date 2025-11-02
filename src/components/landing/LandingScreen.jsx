import { Monitor, Play } from 'lucide-react';
import ScanLineOverlay from '../display/ScanLineOverlay';
import ThemeSelector from '../selectors/ThemeSelector';
import DeveloperCredit from '../misc/DeveloperCredit';
import { useTranslation } from '../../contexts/TranslationContext';

const LandingScreen = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen gradient-background relative flex items-center justify-center overflow-hidden">
      <ScanLineOverlay />

      {/* Top controls: theme + language */}
      <div className="absolute top-4 left-4 z-40">
        <ThemeSelector />
      </div>

      {/* Center card */}
      <div className="relative z-30 w-full max-w-3xl px-6">
        <div className="bg-broadcastNavy/70 backdrop-blur-md border-2 border-steelBlue rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Monitor className="w-8 h-8 text-electricMint" />
            <h1 className="font-heading text-4xl md:text-5xl text-electricMint uppercase tracking-widest">GoalBoard</h1>
          </div>
          <p className="font-body text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            Professional digital scoreboard for football. Live score tracking, precision timer, cards, fouls, corners, projector mode, and themes.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <button
              onClick={onStart}
              className="px-6 md:px-8 py-3 md:py-4 bg-electricMint hover:bg-electricMint/80 text-broadcastNavy font-body font-semibold rounded-lg transition-all button-press shadow-lg flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {t('start')}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <Feature label="Live Scores" />
            <Feature label="Millisecond Timer" />
            <Feature label="Cards & Fouls" />
            <Feature label="Projector Mode" />
          </div>
        </div>
      </div>

      {/* Footer credit */}
      <DeveloperCredit />
    </div>
  );
};

const Feature = ({ label }) => (
  <div className="bg-steelBlue/40 border border-electricMint/20 rounded-lg px-3 py-2 text-white/90 font-body text-sm">
    {label}
  </div>
);

export default LandingScreen;
