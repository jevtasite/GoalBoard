import { useAnimations } from './AnimationContext';
import CardIndicators from './CardIndicators';

const TeamSection = ({ team, side, teamData }) => {
  const { animations } = useAnimations();

  const isScoreAnimating = animations.scoreChange.active && animations.scoreChange.team === team;
  const isRedCardEffect = animations.redCardEffect.active && animations.redCardEffect.team === team;
  const isPulseActive = animations.goalCelebration.active && animations.goalCelebration.team === team;

  // Team-specific colors
  const teamColor = team === 'teamA' ? '#00FF87' : '#FF2D55';
  const glowColor = team === 'teamA' ? '#00FF87' : '#FF2D55';
  const glowColorRgba = team === 'teamA' ? '0, 255, 135' : '255, 45, 85';

  const scoreStyle = {
    textShadow: isPulseActive ? `
      0 0 20px rgba(${glowColorRgba}, 0.8),
      0 0 40px rgba(${glowColorRgba}, 0.6),
      0 0 60px rgba(${glowColorRgba}, 0.4),
      0 0 80px rgba(${glowColorRgba}, 0.2)
    ` : 'none',
    transition: 'text-shadow 0.8s ease-out'
  };

  return (
    <div
      className={`flex flex-col items-center relative ${isRedCardEffect ? 'red-card-shake' : ''}`}
    >
      <div
        className={`font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-team uppercase tracking-wider mb-3 md:mb-4 lg:mb-5 xl:mb-6 text-center min-h-[2.5rem] md:min-h-[3.5rem] lg:min-h-[4.5rem] xl:min-h-[5.5rem] 2xl:min-h-[6rem] flex items-center justify-center px-2`}
        style={{ color: teamColor }}
      >
        {teamData.name}
      </div>
      <div
        className={`font-display text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-score font-bold text-white leading-none ${isScoreAnimating ? 'score-animate' : ''} ${isPulseActive ? 'score-pulse-minimal' : ''}`}
        style={scoreStyle}
      >
        {teamData.score}
      </div>
      <CardIndicators
        yellowCards={teamData.yellowCards}
        redCards={teamData.redCards}
        fouls={teamData.fouls}
      />
    </div>
  );
};

export default TeamSection;
