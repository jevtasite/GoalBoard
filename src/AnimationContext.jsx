import { createContext, useContext, useState } from 'react';

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animations, setAnimations] = useState({
    goalCelebration: { active: false, team: null },
    redCardEffect: { active: false, team: null },
    scoreChange: { active: false, team: null },
  });

  const triggerGoalCelebration = (team) => {
    setAnimations(prev => ({
      ...prev,
      goalCelebration: { active: true, team },
      scoreChange: { active: true, team },
    }));

    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        goalCelebration: { active: false, team: null },
      }));
    }, 1300); // Duration of full celebration

    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        scoreChange: { active: false, team: null },
      }));
    }, 400);
  };

  const triggerRedCard = (team) => {
    setAnimations(prev => ({
      ...prev,
      redCardEffect: { active: true, team },
    }));

    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        redCardEffect: { active: false, team: null },
      }));
    }, 300);
  };

  const triggerScoreChange = (team) => {
    setAnimations(prev => ({
      ...prev,
      scoreChange: { active: true, team },
    }));

    setTimeout(() => {
      setAnimations(prev => ({
        ...prev,
        scoreChange: { active: false, team: null },
      }));
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
