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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="rounded-2xl shadow-2xl w-full max-w-md modal-animate"
            style={{
              backgroundColor: 'var(--color-background)',
              border: '2px solid var(--color-steel)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6" style={{ borderBottom: '1px solid var(--color-steel)' }}>
              <div className="flex items-center gap-3">
                <Palette className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                <h3 className="font-heading text-2xl md:text-3xl uppercase tracking-wide" style={{ color: 'var(--color-primary)' }}>
                  {t('customize')}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg transition-colors"
                style={{ color: 'var(--color-slate)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex" style={{ borderBottom: '1px solid var(--color-steel)' }}>
              <button
                onClick={() => setActiveTab('theme')}
                className="flex-1 px-4 py-3 font-body font-semibold transition-all"
                style={{
                  color: activeTab === 'theme' ? 'var(--color-primary)' : 'var(--color-slate)',
                  borderBottom: activeTab === 'theme' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                {t('colorTheme')}
              </button>
              <button
                onClick={() => setActiveTab('background')}
                className="flex-1 px-4 py-3 font-body font-semibold transition-all"
                style={{
                  color: activeTab === 'background' ? 'var(--color-primary)' : 'var(--color-slate)',
                  borderBottom: activeTab === 'background' ? '2px solid var(--color-primary)' : 'none'
                }}
              >
                {t('background')}
              </button>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6">
              {activeTab === 'theme' && (
                <div className="grid grid-cols-2 gap-3">
                  {themeList.map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => handleThemeSelect(theme.key)}
                      className="relative p-4 rounded-lg transition-all"
                      style={{
                        backgroundColor: theme.key === currentTheme ? 'rgba(var(--color-primary-rgb), 0.2)' : 'var(--color-steel)',
                        border: theme.key === currentTheme ? '2px solid var(--color-primary)' : '2px solid transparent',
                        boxShadow: theme.key === currentTheme ? '0 0 15px rgba(var(--color-primary-rgb), 0.2)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (theme.key !== currentTheme) {
                          e.currentTarget.style.borderColor = 'rgba(var(--color-primary-rgb), 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (theme.key !== currentTheme) {
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
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
                      <div className="text-sm font-body font-semibold text-left" style={{ color: 'var(--color-slate)' }}>
                        {theme.name}
                      </div>
                      {theme.key === currentTheme && (
                        <div className="absolute top-2 right-2 rounded-full p-0.5" style={{ backgroundColor: 'var(--color-primary)' }}>
                          <Check className="w-3 h-3" style={{ color: 'var(--color-background)' }} />
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
                        className="relative p-4 rounded-lg transition-all"
                        style={{
                          backgroundColor: style.key === backgroundStyle ? 'rgba(var(--color-primary-rgb), 0.2)' : 'var(--color-steel)',
                          border: style.key === backgroundStyle ? '2px solid var(--color-primary)' : '2px solid transparent',
                          boxShadow: style.key === backgroundStyle ? '0 0 15px rgba(var(--color-primary-rgb), 0.2)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (style.key !== backgroundStyle) {
                            e.currentTarget.style.borderColor = 'rgba(var(--color-primary-rgb), 0.5)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (style.key !== backgroundStyle) {
                            e.currentTarget.style.borderColor = 'transparent';
                          }
                        }}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Icon className="w-8 h-8" style={{ color: 'var(--color-slate)' }} />
                        </div>
                        <div className="text-sm font-body font-semibold text-center" style={{ color: 'var(--color-slate)' }}>
                          {t(style.translationKey)}
                        </div>
                        {style.key === backgroundStyle && (
                          <div className="absolute top-2 right-2 rounded-full p-0.5" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <Check className="w-3 h-3" style={{ color: 'var(--color-background)' }} />
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
