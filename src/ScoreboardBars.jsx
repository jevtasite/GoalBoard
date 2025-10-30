const ScoreboardBars = ({ active }) => {
  if (!active) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
      <div
        className="absolute w-full h-[2px] scoreboard-bar"
        style={{
          top: '20%',
          background: 'linear-gradient(90deg, transparent 0%, #00FF87 50%, transparent 100%)',
          animationDelay: '0ms'
        }}
      />
      <div
        className="absolute w-full h-[2px] scoreboard-bar"
        style={{
          top: '50%',
          background: 'linear-gradient(90deg, transparent 0%, #00FF87 50%, transparent 100%)',
          animationDelay: '100ms'
        }}
      />
      <div
        className="absolute w-full h-[2px] scoreboard-bar"
        style={{
          top: '80%',
          background: 'linear-gradient(90deg, transparent 0%, #00FF87 50%, transparent 100%)',
          animationDelay: '200ms'
        }}
      />
    </div>
  );
};

export default ScoreboardBars;
