import { createContext, useContext, useState, useEffect } from "react";

const MatchContext = createContext();

export const MatchProvider = ({ children }) => {
  // Load zoom from localStorage or default to 150 (max)
  const [zoomLevel, setZoomLevel] = useState(() => {
    const savedZoom = localStorage.getItem("scoreboardZoom");
    return savedZoom ? parseInt(savedZoom, 10) : 100;
  });

  const [matchState, setMatchState] = useState({
    teamA: {
      name: "Team A",
      score: 0,
      yellowCards: 0,
      redCards: 0,
      fouls: 0,
      corners: 0,
    },
    teamB: {
      name: "Team B",
      score: 0,
      yellowCards: 0,
      redCards: 0,
      fouls: 0,
      corners: 0,
    },
    timer: {
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    },
    period: "First Half",
  });

  // Save zoom to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("scoreboardZoom", zoomLevel.toString());
  }, [zoomLevel]);

  // Timer logic - Update every 10ms for millisecond precision
  useEffect(() => {
    let interval;
    if (matchState.timer.isRunning) {
      interval = setInterval(() => {
        const now = Date.now();
        const totalElapsed =
          now - matchState.timer.startTime + matchState.timer.elapsedTime;
        const minutes = Math.floor(totalElapsed / 60000);
        const seconds = Math.floor((totalElapsed % 60000) / 1000);
        const milliseconds = Math.floor((totalElapsed % 1000) / 10); // Show centiseconds (0-99)

        setMatchState((prev) => ({
          ...prev,
          timer: {
            ...prev.timer,
            minutes,
            seconds,
            milliseconds,
          },
        }));
      }, 10); // Update every 10ms for smooth millisecond display
    }
    return () => clearInterval(interval);
  }, [matchState.timer.isRunning, matchState.timer.startTime]);

  // Action functions
  const updateScore = (team, increment) => {
    setMatchState((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        score: Math.max(0, prev[team].score + increment),
      },
    }));
  };

  const updateCards = (team, cardType, increment) => {
    setMatchState((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [cardType]: Math.max(0, prev[team][cardType] + increment),
      },
    }));
  };

  const updateStats = (team, statType, increment) => {
    setMatchState((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [statType]: Math.max(0, prev[team][statType] + increment),
      },
    }));
  };

  const toggleTimer = () => {
    setMatchState((prev) => {
      if (prev.timer.isRunning) {
        // Pause
        return {
          ...prev,
          timer: {
            ...prev.timer,
            isRunning: false,
            elapsedTime:
              prev.timer.elapsedTime + (Date.now() - prev.timer.startTime),
          },
        };
      } else {
        // Start
        return {
          ...prev,
          timer: {
            ...prev.timer,
            isRunning: true,
            startTime: Date.now(),
          },
        };
      }
    });
  };

  const resetTimer = () => {
    setMatchState((prev) => ({
      ...prev,
      timer: {
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
      },
    }));
  };

  const updatePeriod = (newPeriod) => {
    setMatchState((prev) => ({
      ...prev,
      period: newPeriod,
    }));
  };

  const updateTeamName = (team, newName) => {
    setMatchState((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        name: newName,
      },
    }));
  };

  const resetMatch = (keepNames = false) => {
    setMatchState((prev) => ({
      teamA: {
        name: keepNames ? prev.teamA.name : "Team A",
        score: 0,
        yellowCards: 0,
        redCards: 0,
        fouls: 0,
        corners: 0,
      },
      teamB: {
        name: keepNames ? prev.teamB.name : "Team B",
        score: 0,
        yellowCards: 0,
        redCards: 0,
        fouls: 0,
        corners: 0,
      },
      timer: {
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        isRunning: false,
        startTime: null,
        elapsedTime: 0,
      },
      period: "First Half",
    }));
  };

  const value = {
    matchState,
    zoomLevel,
    setZoomLevel,
    updateScore,
    updateCards,
    updateStats,
    toggleTimer,
    resetTimer,
    updatePeriod,
    updateTeamName,
    resetMatch,
  };

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within MatchProvider");
  }
  return context;
};
