import { createContext, useContext, useState, useRef } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animations, setAnimations] = useState({
    redCardEffect: { active: false, team: null },
    scoreChange: { active: false, team: null },
  });

  // Store timeout refs to clear them if needed
  const timeoutRefs = useRef({
    scoreChange: null,
    redCardEffect: null,
  });

  const triggerGoalCelebration = (team) => {
    // Clear any existing timeouts for this team's animations
    if (timeoutRefs.current.scoreChange) {
      clearTimeout(timeoutRefs.current.scoreChange);
    }

    // Immediately set animations active (only simple score bounce)
    setAnimations(prev => ({
      ...prev,
      scoreChange: { active: true, team },
    }));

    // Clear score change animation (simple bounce)
    timeoutRefs.current.scoreChange = setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        scoreChange: { active: false, team: null },
      }));
      timeoutRefs.current.scoreChange = null;
    }, 300); // Shortened duration for simpler animation
  };

  const triggerRedCard = (team) => {
    // Clear any existing timeout
    if (timeoutRefs.current.redCardEffect) {
      clearTimeout(timeoutRefs.current.redCardEffect);
    }

    setAnimations(prev => ({
      ...prev,
      redCardEffect: { active: true, team },
    }));

    timeoutRefs.current.redCardEffect = setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        redCardEffect: { active: false, team: null },
      }));
      timeoutRefs.current.redCardEffect = null;
    }, 300);
  };

  const triggerScoreChange = (team) => {
    // Clear any existing timeout
    if (timeoutRefs.current.scoreChange) {
      clearTimeout(timeoutRefs.current.scoreChange);
    }

    setAnimations(prev => ({
      ...prev,
      scoreChange: { active: true, team },
    }));

    timeoutRefs.current.scoreChange = setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        scoreChange: { active: false, team: null },
      }));
      timeoutRefs.current.scoreChange = null;
    }, 300);
  };

  return (
    <AnimationContext.Provider value={{
      animations,
      triggerGoalCelebration,
      triggerRedCard,
      triggerScoreChange,
    }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimations must be used within AnimationProvider');
  }
  return context;
};
