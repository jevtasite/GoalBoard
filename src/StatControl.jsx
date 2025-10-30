const StatControl = ({ label, value, icon, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center justify-between py-2">
      <label className="font-body text-sm text-slateGray flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          className="w-8 h-8 bg-steelBlue hover:bg-steelBlue/80 text-white rounded-md flex items-center justify-center font-bold text-lg button-press transition-all"
        >
          -
        </button>
        <span className="font-mono text-lg text-white min-w-[2rem] text-center">
          {value}
        </span>
        <button
          onClick={onIncrement}
          className="w-8 h-8 bg-steelBlue hover:bg-steelBlue/80 text-white rounded-md flex items-center justify-center font-bold text-lg button-press transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default StatControl;
