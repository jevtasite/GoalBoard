const CardIndicators = ({ yellowCards, redCards, fouls }) => {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex gap-2 md:gap-3 mt-4 justify-center flex-wrap">
      {fouls > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-lg bg-electricMint/10 text-electricMint font-body font-semibold text-base md:text-xl border border-electricMint/30">
          ❌ {fouls}
        </div>
      )}
      {yellowCards > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-lg bg-yellow-400 text-black font-body font-semibold text-base md:text-xl shadow-lg">
          📒 {yellowCards}
        </div>
      )}
      {redCards > 0 && (
        <div className="inline-flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-lg bg-broadcastRed text-white font-body font-semibold text-base md:text-xl shadow-lg">
          📕 {redCards}
        </div>
      )}
    </div>
  );
};

export default CardIndicators;
