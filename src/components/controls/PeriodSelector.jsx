import { useMatch } from '../../contexts/MatchContext';
import { useTranslation } from '../../contexts/TranslationContext';

const PeriodSelector = () => {
  const { matchState, updatePeriod } = useMatch();
  const { t } = useTranslation();

  const periods = [
    { key: 'firstHalf', label: t('firstHalf'), value: 'First Half' },
    { key: 'secondHalf', label: t('secondHalf'), value: 'Second Half' },
    { key: 'extraTime', label: t('extraTime'), value: 'Extra Time' }
  ];

  // Get current period display label
  const getCurrentPeriodLabel = () => {
    const periodMap = {
      'First Half': t('firstHalf'),
      'Second Half': t('secondHalf'),
      'Extra Time': t('extraTime')
    };
    return periodMap[matchState.period] || matchState.period;
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-body text-sm text-slateGray uppercase tracking-wide">
        Period
      </label>
      <select
        value={matchState.period}
        onChange={(e) => updatePeriod(e.target.value)}
        className="w-full px-4 py-3 bg-steelBlue text-white font-body rounded-lg border-2 border-steelBlue focus:border-electricMint focus:outline-none transition-all cursor-pointer"
      >
        {periods.map(period => (
          <option key={period.key} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PeriodSelector;
