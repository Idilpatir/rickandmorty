import { ReactNode } from "react";
// Define the types for the context value
export interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  
  export interface DarkModeProviderProps {
    children: ReactNode;
  }
  