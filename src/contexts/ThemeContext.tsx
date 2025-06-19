import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ColorTheme {
  id: string;
  name: string;
  fontFamily?: string;
  supportsDarkMode?: boolean;
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
    id: 'default',
    name: 'DEFAULT',
    fontFamily: 'General Sans',
    supportsDarkMode: true,
    colors: {
      primary: '210 40% 15%', // neutral dark blue #0f172a
      primaryForeground: '0 0% 100%', // white
      secondary: '210 40% 98%', // very light gray
      secondaryForeground: '0 0% 0%', // black
      accent: '210 40% 95%', // light gray
      accentForeground: '0 0% 0%', // black
      background: '0 0% 100%', // white
      foreground: '0 0% 0%', // black
      card: '0 0% 100%', // white
      cardForeground: '0 0% 0%', // black
      border: '210 20% 90%', // light gray
      input: '210 20% 95%', // very light gray
      ring: '210 40% 15%', // neutral dark blue
      muted: '210 20% 95%', // very light gray
      mutedForeground: '0 0% 40%' // dark gray
    }
  },
  {
    id: 'unity',
    name: 'UNITY',
    fontFamily: 'General Sans',
    supportsDarkMode: true,
    colors: {
      primary: '22 89% 57%', // #fa8029 orange
      primaryForeground: '0 0% 100%', // white
      secondary: '214 12% 92%', // light gray #f7f7f7
      secondaryForeground: '210 6% 13%', // dark #1f2124
      accent: '22 89% 57%', // #fa8029 orange
      accentForeground: '0 0% 100%', // white
      background: '0 0% 100%', // white
      foreground: '210 6% 13%', // dark #1f2124
      card: '0 0% 100%', // white
      cardForeground: '210 6% 13%', // dark #1f2124
      border: '214 12% 92%', // light gray #f7f7f7
      input: '214 12% 92%', // light gray #f7f7f7
      ring: '22 89% 57%', // #fa8029 orange
      muted: '214 12% 92%', // light gray #f7f7f7
      mutedForeground: '210 6% 45%' // medium gray
    }
  },
  {
    id: 'belize-hole',
    name: 'BLUE SKY',
    colors: {
      primary: '218 41% 43%', // #53628c buttons
      primaryForeground: '0 0% 98%',
      secondary: '0 0% 90%', // #e6e6e6 form background
      secondaryForeground: '230 66% 34%', // #253464 text color
      accent: '221 32% 56%', // #7383b0 accent
      accentForeground: '0 0% 100%',
      background: '0 0% 100%', // #ffffff background
      foreground: '230 66% 34%', // #253464 text color
      card: '0 0% 100%', // #ffffff
      cardForeground: '230 66% 34%', // #253464 text color
      border: '0 0% 90%', // #e6e6e6
      input: '0 0% 90%', // #e6e6e6 form background
      ring: '218 41% 43%', // #53628c buttons
      muted: '0 0% 90%', // #e6e6e6
      mutedForeground: '230 66% 34%' // #253464 text color
    }
  },
  {
    id: 'dark-emerald',
    name: 'DARK EMERALD',
    colors: {
      primary: '142 71% 45%', // emerald green
      primaryForeground: '0 0% 100%', // white
      secondary: '220 13% 18%', // dark gray for secondary elements
      secondaryForeground: '0 0% 95%', // light text
      accent: '142 71% 45%', // emerald green
      accentForeground: '0 0% 100%', // white
      background: '222 13% 11%', // very dark background
      foreground: '0 0% 95%', // light text
      card: '220 13% 15%', // dark card background
      cardForeground: '0 0% 95%', // light text
      border: '220 13% 20%', // dark borders
      input: '220 13% 18%', // dark input background
      ring: '142 71% 45%', // emerald green focus ring
      muted: '220 13% 18%', // muted dark background
      mutedForeground: '0 0% 60%' // muted light text
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
  // Default to Default theme
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(
    colorThemes.find(t => t.id === 'default') || colorThemes[0]
  );

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
    const body = document.body;
    
    // Apply Tailwind CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
    
    // Apply font family if specified
    if (theme.fontFamily) {
      root.style.setProperty('--theme-font-family', theme.fontFamily);
    } else {
      root.style.removeProperty('--theme-font-family');
    }

    // Remove all existing theme classes and add new one
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add(`theme-${theme.id}`);

    // Apply additional theme-specific CSS variables for enhanced styling
    switch (theme.id) {
      case 'default':
        root.style.setProperty('--theme-primary-rgb', '15, 23, 42');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)');
        root.style.setProperty('--status-success', '120 60% 50%');
        root.style.setProperty('--status-warning', '43 74% 66%');
        root.style.setProperty('--status-info', '210 40% 60%');
        root.style.setProperty('--chart-1', '210 40% 50%');
        root.style.setProperty('--chart-2', '210 40% 40%');
        root.style.setProperty('--chart-3', '210 40% 30%');
        root.style.setProperty('--chart-4', '210 40% 60%');
        root.style.setProperty('--chart-5', '210 40% 70%');
        break;
      case 'unity':
        root.style.setProperty('--theme-primary-rgb', '250, 128, 41');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, #1f2124 0%, #fa8029 100%)');
        root.style.setProperty('--status-success', '120 60% 50%');
        root.style.setProperty('--status-warning', '43 74% 66%');
        root.style.setProperty('--status-info', '22 89% 57%');
        root.style.setProperty('--chart-1', '22 89% 57%');
        root.style.setProperty('--chart-2', '22 89% 47%');
        root.style.setProperty('--chart-3', '22 89% 37%');
        root.style.setProperty('--chart-4', '22 89% 67%');
        root.style.setProperty('--chart-5', '22 89% 77%');
        break;
      case 'belize-hole':
        root.style.setProperty('--theme-primary-rgb', '83, 98, 140');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, #53628c 0%, #7383b0 100%)');
        break;
      case 'dark-emerald':
        root.style.setProperty('--theme-primary-rgb', '46, 204, 113');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, #1c1c1e 0%, #2ecc71 100%)');
        // Apply dark mode sidebar colors for Dark Emerald
        root.style.setProperty('--sidebar-background', '220 13% 11%');
        root.style.setProperty('--sidebar-foreground', '0 0% 95%');
        root.style.setProperty('--sidebar-primary', '142 71% 45%');
        root.style.setProperty('--sidebar-primary-foreground', '0 0% 100%');
        root.style.setProperty('--sidebar-accent', '220 13% 18%');
        root.style.setProperty('--sidebar-accent-foreground', '0 0% 95%');
        root.style.setProperty('--sidebar-border', '220 13% 20%');
        root.style.setProperty('--sidebar-ring', '142 71% 45%');
        break;
      case 'amethyst':
        root.style.setProperty('--theme-primary-rgb', '155, 89, 182');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)');
        break;
      case 'alizarin':
        root.style.setProperty('--theme-primary-rgb', '231, 76, 60');
        root.style.setProperty('--theme-gradient', 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)');
        break;
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('color-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to Default theme if no saved theme
      setTheme('default');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes: colorThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};
