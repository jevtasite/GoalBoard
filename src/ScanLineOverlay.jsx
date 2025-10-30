const ScanLineOverlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10">
      {/* Animated stadium field lines pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stadium-grid" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
              {/* Horizontal lines */}
              <line x1="0" y1="0" x2="150" y2="0" stroke="#00FF87" strokeWidth="1.5" />
              <line x1="0" y1="50" x2="150" y2="50" stroke="#00FF87" strokeWidth="1" opacity="0.5" />
              <line x1="0" y1="75" x2="150" y2="75" stroke="#00FF87" strokeWidth="2" />
              <line x1="0" y1="100" x2="150" y2="100" stroke="#00FF87" strokeWidth="1" opacity="0.5" />
              <line x1="0" y1="150" x2="150" y2="150" stroke="#00FF87" strokeWidth="1.5" />

              {/* Vertical lines */}
              <line x1="0" y1="0" x2="0" y2="150" stroke="#00FF87" strokeWidth="1.5" />
              <line x1="50" y1="0" x2="50" y2="150" stroke="#00FF87" strokeWidth="1" opacity="0.5" />
              <line x1="75" y1="0" x2="75" y2="150" stroke="#00FF87" strokeWidth="2" />
              <line x1="100" y1="0" x2="100" y2="150" stroke="#00FF87" strokeWidth="1" opacity="0.5" />
              <line x1="150" y1="0" x2="150" y2="150" stroke="#00FF87" strokeWidth="1.5" />

              {/* Center circle accent */}
              <circle cx="75" cy="75" r="30" stroke="#00FF87" strokeWidth="1.5" fill="none" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stadium-grid)" className="field-grid-animate" />
        </svg>
      </div>

      {/* Corner accent elements - broadcast frame */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-[3px] border-t-[3px] border-electricMint opacity-30" />
      <div className="absolute top-0 right-0 w-24 h-24 border-r-[3px] border-t-[3px] border-electricMint opacity-30" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-l-[3px] border-b-[3px] border-electricMint opacity-30" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-[3px] border-b-[3px] border-electricMint opacity-30" />
    </div>
  );
};

export default ScanLineOverlay;
