import { createContext, useContext, useState, useEffect } from "react";
import { themes, applyTheme } from "../utils/themes";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem("goalboard-theme");
    return saved || "dark";
  });

  useEffect(() => {
    const theme = themes[currentTheme];
    if (theme) {
      applyTheme(theme);
      localStorage.setItem("goalboard-theme", currentTheme);
    }
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
