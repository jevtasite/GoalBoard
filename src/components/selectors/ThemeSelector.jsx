import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../contexts/TranslationContext';
import { Palette, Check, X, Grid3x3, Hexagon, Circle, Slash, Cpu, EyeOff } from 'lucide-react';

const ThemeSelector = ({ isMobile = false }) => {
  const { currentTheme, changeTheme, themes, backgroundStyle, changeBackgroundStyle } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('theme');

  const themeList = Object.entries(themes).map(([key, theme]) => ({
    key,
    name: theme.name,
    colors: theme.colors
  }));

  const backgroundStyles = [
    { key: 'stadium', translationKey: 'stadiumGrid', icon: Grid3x3 },
    { key: 'hexagons', translationKey: 'hexagons', icon: Hexagon },
    { key: 'dots', translationKey: 'dots', icon: Circle },
    { key: 'diagonal', translationKey: 'diagonal', icon: Slash },
    { key: 'circuit', translationKey: 'circuit', icon: Cpu },
    { key: 'none', translationKey: 'none', icon: EyeOff }
  ];

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
  };

  const handleBackgroundStyleSelect = (styleKey) => {
    changeBackgroundStyle(styleKey);
  };

  const buttonClasses = isMobile
    ? "flex items-center justify-center w-14 h-14 bg-steelBlue/90 hover:bg-steelBlue text-white rounded-lg transition-all shadow-lg backdrop-blur-sm border border-electricMint/30"
    : "flex items-center gap-2 px-4 py-3 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press";

  return (
    <>
      {/* Trigger Button */}
      {isMobile ? (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className={buttonClasses}
            title="Change theme"
          >
            <Palette className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={buttonClasses}
          title="Change theme"
        >
          <Palette className="w-5 h-5" />
        </button>
      )}

      {/* Modal Overlay - Rendered via Portal to avoid transform issues */}
      {isOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-steelBlue rounded-xl shadow-2xl border-2 border-electricMint/30 w-full max-w-md animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-electricMint/20">
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6 text-electricMint" />
                <h3 className="font-heading text-xl text-electricMint uppercase tracking-wider">
                  {t('customize')}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-electricMint/20 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-electricMint/20">
              <button
                onClick={() => setActiveTab('theme')}
                className={`flex-1 px-4 py-3 font-body font-semibold transition-all ${
                  activeTab === 'theme'
                    ? 'text-electricMint border-b-2 border-electricMint'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t('colorTheme')}
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className={`flex-1 px-4 py-3 font-body font-semibold transition-all ${
                  activeTab === 'background'
                    ? 'text-electricMint border-b-2 border-electricMint'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t('background')}
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              {activeTab === 'theme' && (
                <div className="grid grid-cols-2 gap-3">
                  {themeList.map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => handleThemeSelect(theme.key)}
                      className={`relative p-4 rounded-lg transition-all ${
                        theme.key === currentTheme
                          ? 'bg-electricMint/20 border-2 border-electricMint shadow-lg shadow-electricMint/20'
                          : 'bg-broadcastNavy/50 border-2 border-transparent hover:border-electricMint/50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-5 h-5 rounded-full border-2 border-white/30"
                          style={{ backgroundColor: theme.colors.teamA }}
                        ></div>
                        <div
                          className="w-5 h-5 rounded-full border-2 border-white/30"
                          style={{ backgroundColor: theme.colors.teamB }}
                        ></div>
                      </div>
                      <div className="text-sm font-body font-semibold text-white text-left">
                        {theme.name}
                      </div>
                      {theme.key === currentTheme && (
                        <div className="absolute top-2 right-2 bg-electricMint rounded-full p-0.5">
                          <Check className="w-3 h-3 text-broadcastNavy" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'background' && (
                <div className="grid grid-cols-2 gap-3">
                  {backgroundStyles.map((style) => {
                    const Icon = style.icon;
                    return (
                      <button
                        key={style.key}
                        onClick={() => handleBackgroundStyleSelect(style.key)}
                        className={`relative p-4 rounded-lg transition-all ${
                          style.key === backgroundStyle
                            ? 'bg-electricMint/20 border-2 border-electricMint shadow-lg shadow-electricMint/20'
                            : 'bg-broadcastNavy/50 border-2 border-transparent hover:border-electricMint/50 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-sm font-body font-semibold text-white text-center">
                          {t(style.translationKey)}
                        </div>
                        {style.key === backgroundStyle && (
                          <div className="absolute top-2 right-2 bg-electricMint rounded-full p-0.5">
                            <Check className="w-3 h-3 text-broadcastNavy" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ThemeSelector;
