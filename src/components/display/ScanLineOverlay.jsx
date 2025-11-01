import { useTheme } from '../../contexts/ThemeContext';

const ScanLineOverlay = () => {
  const { backgroundStyle } = useTheme();

  // Get the current theme color from CSS variable
  const patternColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00FF87';

  const renderPattern = () => {
    switch (backgroundStyle) {
      case 'stadium':
        return (
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="stadium-grid" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="150" y2="0" stroke={patternColor} strokeWidth="1.5" />
                  <line x1="0" y1="50" x2="150" y2="50" stroke={patternColor} strokeWidth="1" opacity="0.5" />
                  <line x1="0" y1="75" x2="150" y2="75" stroke={patternColor} strokeWidth="2" />
                  <line x1="0" y1="100" x2="150" y2="100" stroke={patternColor} strokeWidth="1" opacity="0.5" />
                  <line x1="0" y1="150" x2="150" y2="150" stroke={patternColor} strokeWidth="1.5" />
                  <line x1="0" y1="0" x2="0" y2="150" stroke={patternColor} strokeWidth="1.5" />
                  <line x1="50" y1="0" x2="50" y2="150" stroke={patternColor} strokeWidth="1" opacity="0.5" />
                  <line x1="75" y1="0" x2="75" y2="150" stroke={patternColor} strokeWidth="2" />
                  <line x1="100" y1="0" x2="100" y2="150" stroke={patternColor} strokeWidth="1" opacity="0.5" />
                  <line x1="150" y1="0" x2="150" y2="150" stroke={patternColor} strokeWidth="1.5" />
                  <circle cx="75" cy="75" r="30" stroke={patternColor} strokeWidth="1.5" fill="none" opacity="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stadium-grid)" className="field-grid-animate" />
            </svg>
          </div>
        );

      case 'hexagons':
        return (
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hexagons" x="0" y="0" width="80" height="92" patternUnits="userSpaceOnUse">
                  <polygon points="40,0 80,23 80,69 40,92 0,69 0,23" fill="none" stroke={patternColor} strokeWidth="1.5" />
                  <polygon points="40,0 80,23 80,69 40,92 0,69 0,23" fill="none" stroke={patternColor} strokeWidth="1.5" transform="translate(80, 46)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hexagons)" />
            </svg>
          </div>
        );

      case 'dots':
        return (
          <div className="absolute inset-0 opacity-[0.05]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill={patternColor} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        );

      case 'diagonal':
        return (
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonal" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="60" y2="60" stroke={patternColor} strokeWidth="2" />
                  <line x1="0" y1="60" x2="60" y2="0" stroke={patternColor} strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonal)" />
            </svg>
          </div>
        );

      case 'circuit':
        return (
          <div className="absolute inset-0 opacity-[0.03]">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="3" fill={patternColor} />
                  <circle cx="90" cy="10" r="3" fill={patternColor} />
                  <circle cx="10" cy="90" r="3" fill={patternColor} />
                  <circle cx="90" cy="90" r="3" fill={patternColor} />
                  <line x1="10" y1="10" x2="90" y2="10" stroke={patternColor} strokeWidth="1.5" />
                  <line x1="10" y1="90" x2="90" y2="90" stroke={patternColor} strokeWidth="1.5" />
                  <line x1="10" y1="10" x2="10" y2="90" stroke={patternColor} strokeWidth="1.5" />
                  <line x1="90" y1="10" x2="90" y2="90" stroke={patternColor} strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        );

      case 'none':
        return null;

      default:
        return null;
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {renderPattern()}

      {/* Corner accent elements - broadcast frame */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-[3px] border-t-[3px] border-electricMint opacity-30" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-[3px] border-t-[3px] border-electricMint opacity-30" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-[3px] border-b-[3px] border-electricMint opacity-30" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-[3px] border-b-[3px] border-electricMint opacity-30" />
    </div>
  );
};

export default ScanLineOverlay;
