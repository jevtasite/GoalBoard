import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';
import NameEditor from './NameEditor';
import ScoreButtons from './ScoreButtons';
import StatControl from './StatControl';

const TeamControls = ({ team }) => {
  const { matchState, updateCards, updateStats } = useMatch();
  const { triggerRedCard } = useAnimations();
  const teamData = matchState[team];

  const handleRedCardIncrement = () => {
    updateCards(team, 'redCards', 1);
    triggerRedCard(team);
  };

  return (
    <div className="bg-steelBlue/30 rounded-xl p-4 md:p-6 flex flex-col gap-4">
      <h3 className="font-heading text-2xl text-electricMint uppercase tracking-wider">
        {teamData.name} Controls
      </h3>

      <NameEditor team={team} currentName={teamData.name} />

      <ScoreButtons team={team} currentScore={teamData.score} />

      <div className="space-y-2">
        <StatControl
          label="Yellow Cards"
          value={teamData.yellowCards}
          icon="📒"
          onIncrement={() => updateCards(team, 'yellowCards', 1)}
          onDecrement={() => updateCards(team, 'yellowCards', -1)}
        />

        <StatControl
          label="Red Cards"
          value={teamData.redCards}
          icon="📕"
          onIncrement={handleRedCardIncrement}
          onDecrement={() => updateCards(team, 'redCards', -1)}
        />

        <StatControl
          label="Fouls"
          value={teamData.fouls}
          onIncrement={() => updateStats(team, 'fouls', 1)}
          onDecrement={() => updateStats(team, 'fouls', -1)}
        />

        <StatControl
          label="Corners"
          value={teamData.corners}
          onIncrement={() => updateStats(team, 'corners', 1)}
          onDecrement={() => updateStats(team, 'corners', -1)}
        />
      </div>
    </div>
  );
};

export default TeamControls;
