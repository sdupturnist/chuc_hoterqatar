// themes/themeContext.js

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeLayout, setThemeLayout] = useState('chocolates');

  

  return (
    <ThemeContext.Provider value={{ themeLayout, setThemeLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
