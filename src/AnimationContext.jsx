import { createContext, useContext, useState, useRef } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animations, setAnimations] = useState({
    goalCelebration: { active: false, team: null },
    redCardEffect: { active: false, team: null },
    scoreChange: { active: false, team: null },
  });

  // Store timeout refs to clear them if needed
  const timeoutRefs = useRef({
    goalCelebration: null,
    scoreChange: null,
    redCardEffect: null,
  });

  const triggerGoalCelebration = (team) => {
    // Clear any existing timeouts for this team's animations
    if (timeoutRefs.current.goalCelebration) {
      clearTimeout(timeoutRefs.current.goalCelebration);
    }
    if (timeoutRefs.current.scoreChange) {
      clearTimeout(timeoutRefs.current.scoreChange);
    }

    // Immediately set animations active
    setAnimations(prev => ({
      ...prev,
      goalCelebration: { active: true, team },
      scoreChange: { active: true, team },
    }));

    // Clear score change animation first
    timeoutRefs.current.scoreChange = setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        scoreChange: { active: false, team: null },
      }));
      timeoutRefs.current.scoreChange = null;
    }, 400);

    // Clear goal celebration animation
    timeoutRefs.current.goalCelebration = setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        goalCelebration: { active: false, team: null },
      }));
      timeoutRefs.current.goalCelebration = null;
    }, 1300); // Duration of full celebration
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
    }, 400);
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
