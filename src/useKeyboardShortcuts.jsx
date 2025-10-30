import { useEffect } from 'react';
import { useMatch } from './MatchContext';
import { useAnimations } from './AnimationContext';

export const useKeyboardShortcuts = (setShowNextMatchModal) => {
  const {
    updateScore,
    updateCards,
    toggleTimer,
    resetTimer,
  } = useMatch();

  const { triggerGoalCelebration, triggerRedCard, triggerScoreChange } = useAnimations();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      const key = e.key.toLowerCase();

      switch (key) {
        // Team A Score
        case 'q':
          updateScore('teamA', -1);
          triggerScoreChange('teamA');
          break;
        case 'w':
          updateScore('teamA', 1);
          triggerGoalCelebration('teamA');
          break;

        // Team B Score
        case 'o':
          updateScore('teamB', -1);
          triggerScoreChange('teamB');
          break;
        case 'p':
          updateScore('teamB', 1);
          triggerGoalCelebration('teamB');
          break;

        // Timer
        case ' ':
          e.preventDefault();
          toggleTimer();
          break;
        case 'r':
          resetTimer();
          break;

        // Team A Cards
        case 'y':
          updateCards('teamA', 'yellowCards', 1);
          break;
        case 'u':
          updateCards('teamA', 'redCards', 1);
          triggerRedCard('teamA');
          break;

        // Team B Cards
        case 'i':
          updateCards('teamB', 'yellowCards', 1);
          break;
        case 'k':
          updateCards('teamB', 'redCards', 1);
          triggerRedCard('teamB');
          break;

        // Utility
        case 'f':
          toggleFullscreen();
          break;
        case 'n':
          setShowNextMatchModal(true);
          break;
        case 'escape':
          setShowNextMatchModal(false);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [updateScore, updateCards, toggleTimer, resetTimer, triggerGoalCelebration, triggerRedCard, triggerScoreChange, setShowNextMatchModal]);
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Error attempting to enable fullscreen:', err);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
