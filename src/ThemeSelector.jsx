import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Palette, ChevronDown } from 'lucide-react';

const ThemeSelector = ({ isMobile = false }) => {
  const { currentTheme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themeList = Object.entries(themes).map(([key, theme]) => ({
    key,
    name: theme.name,
    colors: theme.colors
  }));

  const currentThemeData = themes[currentTheme];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeSelect = (themeKey) => {
    changeTheme(themeKey);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div ref={dropdownRef} className="fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-steelBlue/90 hover:bg-steelBlue text-white font-body font-semibold rounded-lg transition-all shadow-lg backdrop-blur-sm border border-electricMint/30"
        >
          <Palette className="w-5 h-5" />
          <span>{currentThemeData.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-steelBlue rounded-lg shadow-2xl border-2 border-electricMint/30 overflow-hidden min-w-[180px]">
            {themeList.map((theme) => (
              <button
                key={theme.key}
                onClick={() => handleThemeSelect(theme.key)}
                className={`w-full px-4 py-3 font-body transition-colors text-left flex items-center gap-3 ${
                  theme.key === currentTheme
                    ? 'bg-electricMint text-broadcastNavy font-semibold'
                    : 'text-white hover:bg-steelBlue/80'
                }`}
              >
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.teamA }}></div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.teamB }}></div>
                </div>
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press"
      >
        <Palette className="w-4 h-4" />
        <span>{currentThemeData.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-steelBlue rounded-lg shadow-2xl border-2 border-electricMint/30 overflow-hidden min-w-[180px] z-50">
          {themeList.map((theme) => (
            <button
              key={theme.key}
              onClick={() => handleThemeSelect(theme.key)}
              className={`w-full px-4 py-3 font-body transition-colors text-left flex items-center gap-3 ${
                theme.key === currentTheme
                  ? 'bg-electricMint text-broadcastNavy font-semibold'
                  : 'text-white hover:bg-steelBlue/80'
              }`}
            >
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.teamA }}></div>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.teamB }}></div>
              </div>
              <span>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
