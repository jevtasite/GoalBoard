import { useState } from 'react';
import { Monitor, Play, X } from 'lucide-react';
import ScanLineOverlay from '../display/ScanLineOverlay';
import ThemeSelector from '../selectors/ThemeSelector';
import LanguageSelector from '../selectors/LanguageSelector';
import DeveloperCredit from '../misc/DeveloperCredit';
import { useTranslation } from '../../contexts/TranslationContext';

const LandingScreen = ({ onStart }) => {
  const { t, language, setLanguage } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flagCode: 'gb' },
    { code: 'sr', name: 'Srpski', flagCode: 'rs' },
    { code: 'es', name: 'Spanish', flagCode: 'es' },
    { code: 'pt', name: 'Portuguese', flagCode: 'pt' }
  ];

  const startWithTransition = () => {
    setIsExiting(true);
    setTimeout(() => onStart && onStart(), 300);
  };

  return (
    <div className={`min-h-screen gradient-background relative flex items-center justify-center overflow-hidden ${isExiting ? 'page-fade-out' : 'page-fade-in'}`}>
      <ScanLineOverlay />

      {/* Top controls: theme + language */}
      <div className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between">
        <div>
          <ThemeSelector />
        </div>
        <div>
          <LanguageSelector setShowLanguageModal={setShowLanguageModal} />
        </div>
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
              onClick={startWithTransition}
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

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="bg-broadcastNavy rounded-2xl p-6 md:p-8 max-w-md w-full modal-animate shadow-2xl border-2 border-steelBlue"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-3xl text-electricMint uppercase tracking-wide">
                {t('selectLanguage')}
              </h2>
              <button onClick={() => setShowLanguageModal(false)} className="p-1 rounded hover:bg-steelBlue/60">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setShowLanguageModal(false); }}
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
};

const Feature = ({ label }) => (
  <div className="bg-steelBlue/40 border border-electricMint/20 rounded-lg px-3 py-2 text-white/90 font-body text-sm">
    {label}
  </div>
);

export default LandingScreen;
