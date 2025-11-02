import { useTranslation } from '../../contexts/TranslationContext';
import { Languages } from 'lucide-react';

const LanguageSelector = ({ isMobile = false, setShowLanguageModal }) => {
  const { language } = useTranslation();

  const languages = [
  { code: 'en', name: 'English', flagCode: 'gb' },
  { code: 'sr', name: 'Srpski', flagCode: 'rs' },
  { code: 'es', name: 'Español', flagCode: 'es' },
  { code: 'pt', name: 'Português', flagCode: 'pt' }
];

  const currentLanguage = languages.find(lang => lang.code === language);

  if (isMobile) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowLanguageModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-steelBlue/90 hover:bg-steelBlue text-white font-body font-semibold rounded-lg transition-all shadow-lg backdrop-blur-sm border border-electricMint/30"
        >
          <span className={`fi fi-${currentLanguage.flagCode} text-lg`}></span>
          <Languages className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowLanguageModal(true)}
        className="flex items-center gap-2 px-3 py-2 bg-steelBlue hover:bg-steelBlue/80 text-white font-body font-semibold rounded-lg transition-all button-press"
      >
        <span className={`fi fi-${currentLanguage.flagCode} text-lg`}></span>
        <Languages className="w-4 h-4" />
      </button>
    </div>
  );
};

export default LanguageSelector;
