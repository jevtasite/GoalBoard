import { useAnimations } from './AnimationContext';
import CardIndicators from './CardIndicators';

const TeamSection = ({ team, side, teamData }) => {
  const { animations } = useAnimations();

  const isScoreAnimating = animations.scoreChange.active && animations.scoreChange.team === team;
  const isRedCardEffect = animations.redCardEffect.active && animations.redCardEffect.team === team;
  const isPulseActive = animations.goalCelebration.active && animations.goalCelebration.team === team;

  return (
    <div
      className={`flex flex-col ${side === 'left' ? 'items-start' : 'items-end'} ${isRedCardEffect ? 'red-card-shake' : ''}`}
    >
      <div className="font-heading text-team uppercase tracking-wider text-electricMint mb-2 md:mb-4">
        {teamData.name}
      </div>
      <div
        className={`font-display text-score font-bold text-white leading-none ${isScoreAnimating ? 'score-animate' : ''} ${isPulseActive ? 'score-pulse' : ''}`}
      >
        {teamData.score}
      </div>
      <CardIndicators
        yellowCards={teamData.yellowCards}
        redCards={teamData.redCards}
      />
    </div>
  );
};

export default TeamSection;
