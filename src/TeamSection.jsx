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
        className={`font-heading text-4xl md:text-6xl lg:text-team uppercase tracking-wider mb-4 md:mb-6 text-center min-h-[3rem] md:min-h-[4.5rem] lg:min-h-[6rem] flex items-center justify-center`}
        style={{ color: teamColor }}
      >
        {teamData.name}
      </div>
      <div
        className={`font-display text-8xl md:text-9xl lg:text-score font-bold text-white leading-none ${isScoreAnimating ? 'score-animate' : ''} ${isPulseActive ? 'score-pulse-minimal' : ''}`}
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
