import React, { createContext, useState, useContext, useEffect } from 'react';
import { DarkModeContextType, DarkModeProviderProps } from '../types/Darktype';

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const storedDarkMode = localStorage.getItem('isDarkMode') === 'true';
  const [isDarkMode, setIsDarkMode] = useState<boolean>(storedDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', String(isDarkMode));
    console.log(localStorage.getItem('isDarkMode'));  // Prints the value of 'isDarkMode'
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
