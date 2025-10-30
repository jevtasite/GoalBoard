import { useMatch } from './MatchContext';

const PeriodSelector = () => {
  const { matchState, updatePeriod } = useMatch();

  const periods = [
    'First Half',
    'Half Time',
    'Second Half',
    'Extra Time',
    'Full Time'
  ];

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
          <option key={period} value={period}>
            {period}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PeriodSelector;
