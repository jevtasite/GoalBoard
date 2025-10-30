import { useState, useRef, useEffect } from 'react';
import { useTranslation } from './TranslationContext';
import { Languages, ChevronDown } from 'lucide-react';

const LanguageSelector = ({ isMobile = false }) => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: 'EN' },
    { code: 'sr', name: 'Srpski', flag: 'SR' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div ref={dropdownRef} className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-steelBlue/90 hover:bg-steelBlue text-white font-body font-semibold rounded-lg transition-all shadow-lg backdrop-blur-sm border border-electricMint/30"
        >
          <Languages className="w-5 h-5" />
          <span>{currentLanguage.flag}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-steelBlue rounded-lg shadow-2xl border-2 border-electricMint/30 overflow-hidden min-w-[160px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full px-4 py-3 font-body transition-colors text-left flex items-center gap-3 ${
                  lang.code === language
                    ? 'bg-electricMint text-broadcastNavy font-semibold'
                    : 'text-white hover:bg-steelBlue/80'
                }`}
              >
                <span className="font-bold text-sm">{lang.flag}</span>
                <span>{lang.name}</span>
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
        <Languages className="w-4 h-4" />
        <span>{currentLanguage.flag}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-steelBlue rounded-lg shadow-2xl border-2 border-electricMint/30 overflow-hidden min-w-[160px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={`w-full px-4 py-3 font-body transition-colors text-left flex items-center gap-3 ${
                lang.code === language
                  ? 'bg-electricMint text-broadcastNavy font-semibold'
                  : 'text-white hover:bg-steelBlue/80'
              }`}
            >
              <span className="font-bold text-sm">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
