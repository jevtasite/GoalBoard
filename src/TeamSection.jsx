import { useState } from 'react';
import { useAnimations } from './AnimationContext';
import { useMatch } from './MatchContext';
import { useTheme } from './ThemeContext';
import CardIndicators from './CardIndicators';
import { Pencil, Check, X } from 'lucide-react';

const TeamSection = ({ team, side, teamData, isMobileDevice = false, isPhone = false, isPhoneLandscape = false }) => {
  const { animations } = useAnimations();
  const { updateScore, updateTeamName } = useMatch();
  const { triggerGoalCelebration } = useAnimations();
  const { currentTheme, themes } = useTheme();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(teamData.name);

  const isScoreAnimating = animations.scoreChange.active && animations.scoreChange.team === team;
  const isRedCardEffect = animations.redCardEffect.active && animations.redCardEffect.team === team;
  const isPulseActive = animations.goalCelebration.active && animations.goalCelebration.team === team;

  // Team-specific colors from theme
  const themeColors = themes[currentTheme].colors;
  const teamColor = themeColors.teamNameColor || themeColors.primary; // Both teams use teamNameColor for name
  const scoreGlowColor = team === 'teamA' ? themeColors.teamA : themeColors.teamB; // Score glow uses team colors

  // Convert hex to RGB for glow effect
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
  };
  const glowColorRgba = hexToRgb(scoreGlowColor);

  const scoreStyle = {
    textShadow: isPulseActive ? `
      0 0 20px rgba(${glowColorRgba}, 0.8),
      0 0 40px rgba(${glowColorRgba}, 0.6),
      0 0 60px rgba(${glowColorRgba}, 0.4),
      0 0 80px rgba(${glowColorRgba}, 0.2)
    ` : 'none',
    transition: 'text-shadow 0.8s ease-out'
  };

  const handleScoreIncrease = () => {
    updateScore(team, 1);
    triggerGoalCelebration(team);
  };

  const handleScoreDecrease = () => {
    updateScore(team, -1);
    // No animation when removing a goal
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateTeamName(team, tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setTempName(teamData.name);
    setIsEditingName(false);
  };

  return (
    <div
      className={`flex flex-col items-center relative ${isRedCardEffect ? 'red-card-shake' : ''}`}
    >
      {/* Team Name - clickable to edit on mobile */}
      {isMobileDevice && isEditingName ? (
        <div className="w-full flex items-center justify-center gap-2 mb-3 md:mb-4">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSaveName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveName();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            maxLength={20}
            className={`flex-1 ${isPhone ? 'max-w-[250px] text-2xl px-4 py-3' : 'max-w-[200px] md:max-w-[300px] text-lg md:text-3xl px-3 md:px-4 py-2 md:py-3'} bg-broadcastNavy border-2 border-electricMint text-electricMint font-heading text-center rounded-lg focus:outline-none focus:bg-broadcastNavy/90 uppercase`}
            autoFocus
          />
        </div>
      ) : (
        <div
          onClick={() => isMobileDevice && setIsEditingName(true)}
          className={`font-heading ${isPhoneLandscape ? 'text-xl mb-1 min-h-[1.75rem]' : isPhone ? 'text-3xl mb-3 min-h-[3rem]' : 'text-2xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-team mb-2 md:mb-4 lg:mb-5 xl:mb-6 min-h-[2rem] md:min-h-[4rem] lg:min-h-[4.5rem] xl:min-h-[5.5rem] 2xl:min-h-[6rem]'} uppercase tracking-wider text-center flex items-center justify-center px-2 ${isMobileDevice ? 'cursor-pointer active:opacity-70' : ''}`}
          style={{ color: teamColor }}
        >
          {teamData.name}
        </div>
      )}
      {/* Mobile touch controls - only visible on mobile devices */}
      {isMobileDevice ? (
        <div className={`w-full flex items-center justify-center ${isPhoneLandscape ? 'gap-3' : isPhone ? 'gap-5 mb-3' : 'gap-3 md:gap-6 mb-1 md:mb-4'}`}>
          <button
            onClick={handleScoreDecrease}
            className={`${isPhoneLandscape ? 'w-12 h-12 text-xl' : isPhone ? 'w-14 h-14 text-2xl' : 'w-10 h-10 md:w-16 md:h-16 text-xl md:text-3xl'} bg-steelBlue hover:bg-steelBlue/80 active:bg-steelBlue/60 text-white rounded-full flex items-center justify-center font-bold transition-all shadow-lg flex-shrink-0`}
          >
            -
          </button>
          <div
            className={`font-display ${isPhoneLandscape ? 'text-6xl' : isPhone ? 'text-7xl' : 'text-5xl md:text-9xl'} font-bold text-white leading-none ${isScoreAnimating ? 'score-animate' : ''} ${isPulseActive ? 'score-pulse-minimal' : ''}`}
            style={scoreStyle}
          >
            {teamData.score}
          </div>
          <button
            onClick={handleScoreIncrease}
            className={`${isPhoneLandscape ? 'w-12 h-12 text-xl' : isPhone ? 'w-14 h-14 text-2xl' : 'w-10 h-10 md:w-16 md:h-16 text-xl md:text-3xl'} bg-electricMint hover:bg-electricMint/80 active:bg-electricMint/60 text-broadcastNavy rounded-full flex items-center justify-center font-bold transition-all shadow-lg flex-shrink-0`}
          >
            +
          </button>
        </div>
      ) : (
        /* Desktop view - score only, no touch controls */
        <div
          className={`font-display text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-score font-bold text-white leading-none ${isScoreAnimating ? 'score-animate' : ''} ${isPulseActive ? 'score-pulse-minimal' : ''}`}
          style={scoreStyle}
        >
          {teamData.score}
        </div>
      )}
      <CardIndicators
        yellowCards={teamData.yellowCards}
        redCards={teamData.redCards}
        fouls={teamData.fouls}
      />
    </div>
  );
};

export default TeamSection;
