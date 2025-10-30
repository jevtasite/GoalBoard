import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';
import { useTranslation } from './TranslationContext';
import NameEditor from './NameEditor';
import ScoreButtons from './ScoreButtons';
import StatControl from './StatControl';
import { SquareX } from 'lucide-react';

const TeamControls = ({ team }) => {
  const { matchState, updateCards, updateStats } = useMatch();
  const { triggerRedCard } = useAnimations();
  const { t } = useTranslation();
  const teamData = matchState[team];

  const handleRedCardIncrement = () => {
    updateCards(team, 'redCards', 1);
    triggerRedCard(team);
  };

  return (
    <div className="bg-steelBlue/30 rounded-xl p-4 md:p-6 flex flex-col gap-4">
      <h3 className="font-heading text-2xl text-electricMint uppercase tracking-wider">
        {teamData.name} {t('controls')}
      </h3>

      <NameEditor team={team} currentName={teamData.name} />

      <ScoreButtons team={team} currentScore={teamData.score} />

      <div className="space-y-2">
        <StatControl
          label={t('yellowCards')}
          value={teamData.yellowCards}
          icon={<SquareX className="w-4 h-4 text-yellow-400" />}
          onIncrement={() => updateCards(team, 'yellowCards', 1)}
          onDecrement={() => updateCards(team, 'yellowCards', -1)}
        />

        <StatControl
          label={t('redCards')}
          value={teamData.redCards}
          icon={<SquareX className="w-4 h-4 text-broadcastRed" />}
          onIncrement={handleRedCardIncrement}
          onDecrement={() => updateCards(team, 'redCards', -1)}
        />

        <StatControl
          label={t('fouls')}
          value={teamData.fouls}
          onIncrement={() => updateStats(team, 'fouls', 1)}
          onDecrement={() => updateStats(team, 'fouls', -1)}
          incrementKey={team === 'teamA' ? 'A' : 'L'}
          decrementKey={team === 'teamA' ? 'S' : ';'}
        />

        <StatControl
          label={t('corners')}
          value={teamData.corners}
          onIncrement={() => updateStats(team, 'corners', 1)}
          onDecrement={() => updateStats(team, 'corners', -1)}
        />
      </div>
    </div>
  );
};

export default TeamControls;
