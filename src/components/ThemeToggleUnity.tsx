
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useColorTheme } from '@/contexts/ThemeContext';

export const ThemeToggleUnity: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { currentTheme } = useColorTheme();

  // Only show toggle if current theme supports dark mode
  if (!currentTheme.supportsDarkMode) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Unity dark mode</span>
    </Button>
  );
};

