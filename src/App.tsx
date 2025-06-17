
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ColorThemeProvider } from "@/contexts/ThemeContext";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Suspense, useEffect } from "react";
import { LoadingState } from "@/components/ui/loading";
import { AppRoutes } from "@/components/App/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

// Unity Theme Initializer Component
const UnityThemeInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Apply Unity theme class to body
    document.body.classList.add('theme-unity');
    
    // Set Unity theme as default in ColorThemeProvider
    const savedTheme = localStorage.getItem('color-theme');
    if (!savedTheme) {
      localStorage.setItem('color-theme', 'unity');
    }
  }, []);

  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ColorThemeProvider>
          <UnityThemeInitializer>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Suspense fallback={<LoadingState message="Loading application..." />}>
                    <AppRoutes />
                  </Suspense>
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </UnityThemeInitializer>
        </ColorThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
