const StatControl = ({ label, value, icon, onIncrement, onDecrement, decrementKey, incrementKey }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <label className="font-body text-sm text-slateGray flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          className="relative w-8 h-8 bg-steelBlue hover:bg-steelBlue/80 text-white rounded-md flex items-center justify-center font-bold text-lg button-press transition-all"
        >
          -
          {decrementKey && (
            <span className="absolute -top-1 -right-1 text-[8px] bg-black/40 px-1 rounded text-white">
              {decrementKey}
            </span>
          )}
        </button>
        <span className="font-mono text-lg text-white min-w-[2rem] text-center">
          {value}
        </span>
        <button
          onClick={onIncrement}
          className="relative w-8 h-8 bg-steelBlue hover:bg-steelBlue/80 text-white rounded-md flex items-center justify-center font-bold text-lg button-press transition-all"
        >
          +
          {incrementKey && (
            <span className="absolute -top-1 -right-1 text-[8px] bg-black/40 px-1 rounded text-white">
              {incrementKey}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default StatControl;
