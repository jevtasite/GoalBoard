import { useEffect } from 'react';
import { useMatch } from '../contexts/MatchContext';
import { useAnimations } from '../contexts/AnimationContext';

export const useKeyboardShortcuts = (setShowNextMatchModal, setPresentationMode, setShowResetConfirmModal) => {
  const {
    updateScore,
    updateCards,
    updateStats,
    toggleTimer,
    resetTimer,
  } = useMatch();

  const { triggerGoalCelebration, triggerRedCard } = useAnimations();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Handle Tab key for presentation mode toggle (works even in input fields)
      if (e.key === 'Tab') {
        e.preventDefault();
        setPresentationMode(prev => !prev);
        return;
      }

      // Ignore other shortcuts if typing in input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
      }

      const key = e.key.toLowerCase();

      switch (key) {
        // Team A Score
        case 'q':
          updateScore('teamA', -1);
          // No animation when removing a goal
          break;
        case 'w':
          updateScore('teamA', 1);
          triggerGoalCelebration('teamA');
          break;

        // Team B Score
        case 'o':
          updateScore('teamB', -1);
          // No animation when removing a goal
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
          if (setShowResetConfirmModal) {
            setShowResetConfirmModal(true);
          }
          break;

        // Team A Fouls
        case 'a':
          updateStats('teamA', 'fouls', 1);
          break;
        case 's':
          updateStats('teamA', 'fouls', -1);
          break;

        // Team B Fouls
        case 'l':
          updateStats('teamB', 'fouls', 1);
          break;
        case ';':
          updateStats('teamB', 'fouls', -1);
          break;

        // Utility
        case 'f':
          toggleFullscreen();
          break;
        case 'n':
          if (setShowNextMatchModal) {
            setShowNextMatchModal(true);
          }
          break;
        case 'escape':
          if (setShowNextMatchModal) {
            setShowNextMatchModal(false);
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [updateScore, updateCards, updateStats, toggleTimer, resetTimer, triggerGoalCelebration, triggerRedCard, setShowNextMatchModal, setPresentationMode, setShowResetConfirmModal]);
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
