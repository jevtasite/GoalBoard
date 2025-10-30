const CardIndicators = ({ yellowCards, redCards }) => {
  if (yellowCards === 0 && redCards === 0) return null;

  return (
    <div className="flex gap-2 mt-4">
      {yellowCards > 0 && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-yellow-400 text-black font-body font-medium text-lg">
          📒 {yellowCards}
        </div>
      )}
      {redCards > 0 && (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-broadcastRed text-white font-body font-medium text-lg">
          📕 {redCards}
        </div>
      )}
    </div>
  );
};

export default CardIndicators;
