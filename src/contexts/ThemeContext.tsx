
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ColorTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    border: string;
    input: string;
    ring: string;
    muted: string;
    mutedForeground: string;
  };
}

const colorThemes: ColorTheme[] = [
  {
    id: 'belize-hole',
    name: 'BELIZE HOLE',
    colors: {
      primary: '221 83% 53%',
      primaryForeground: '0 0% 98%',
      secondary: '210 40% 95%',
      secondaryForeground: '222.2 84% 4.9%',
      accent: '210 40% 90%',
      accentForeground: '222.2 84% 4.9%',
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '221 83% 53%',
      muted: '210 40% 95%',
      mutedForeground: '215.4 16.3% 46.9%'
    }
  },
  {
    id: 'dark-emerald',
    name: 'DARK EMERALD',
    colors: {
      primary: '142 71% 45%',
      primaryForeground: '0 0% 98%',
      secondary: '142 20% 90%',
      secondaryForeground: '142 71% 15%',
      accent: '142 30% 85%',
      accentForeground: '142 71% 15%',
      background: '0 0% 100%',
      foreground: '142 71% 15%',
      card: '0 0% 100%',
      cardForeground: '142 71% 15%',
      border: '142 20% 90%',
      input: '142 20% 90%',
      ring: '142 71% 45%',
      muted: '142 20% 95%',
      mutedForeground: '142 20% 40%'
    }
  },
  {
    id: 'amethyst',
    name: 'AMETHYST',
    colors: {
      primary: '271 81% 56%',
      primaryForeground: '0 0% 98%',
      secondary: '270 20% 90%',
      secondaryForeground: '271 81% 15%',
      accent: '270 30% 85%',
      accentForeground: '271 81% 15%',
      background: '0 0% 100%',
      foreground: '271 81% 15%',
      card: '0 0% 100%',
      cardForeground: '271 81% 15%',
      border: '270 20% 90%',
      input: '270 20% 90%',
      ring: '271 81% 56%',
      muted: '270 20% 95%',
      mutedForeground: '270 20% 40%'
    }
  },
  {
    id: 'alizarin',
    name: 'ALIZARIN',
    colors: {
      primary: '0 84% 60%',
      primaryForeground: '0 0% 98%',
      secondary: '0 20% 90%',
      secondaryForeground: '0 84% 15%',
      accent: '0 30% 85%',
      accentForeground: '0 84% 15%',
      background: '0 0% 100%',
      foreground: '0 84% 15%',
      card: '0 0% 100%',
      cardForeground: '0 84% 15%',
      border: '0 20% 90%',
      input: '0 20% 90%',
      ring: '0 84% 60%',
      muted: '0 20% 95%',
      mutedForeground: '0 20% 40%'
    }
  }
];

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (themeId: string) => void;
  themes: ColorTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useColorTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ColorThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(colorThemes[0]);

  const setTheme = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      applyTheme(theme);
      localStorage.setItem('color-theme', themeId);
    }
  };

  const applyTheme = (theme: ColorTheme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      applyTheme(currentTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: colorThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};
