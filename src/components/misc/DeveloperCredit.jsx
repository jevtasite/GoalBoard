import { useState } from 'react';
import { Code, X } from 'lucide-react';

const DeveloperCredit = ({ isMobileDevice = false }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 group">
      <div className="relative">
        <a
          href="https://dev-look.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-steelBlue/80 hover:bg-steelBlue backdrop-blur-sm border border-electricMint/30 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Code className="w-4 h-4 text-electricMint" />
          <span className="font-body text-sm text-white font-medium">
            Developed by <span className="text-electricMint font-semibold">DevLook</span>
          </span>
        </a>

        {/* Hide button - only visible on mobile */}
        {isMobileDevice && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-steelBlue hover:bg-broadcastRed border border-electricMint/30 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95"
            aria-label="Hide developer credit"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DeveloperCredit;
