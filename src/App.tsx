
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AppLayoutEnhanced as AppLayout } from "@/components/Layout/AppLayoutEnhanced";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Suspense, lazy } from "react";
import { LoadingState } from "@/components/ui/loading";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Log = lazy(() => import("./pages/Log"));
const TimeEntry = lazy(() => import("./pages/TimeEntry"));
const TimeEntryStandard = lazy(() => import("./pages/TimeEntryStandard"));
const TimeEntryTimeInOut = lazy(() => import("./pages/TimeEntryTimeInOut"));
const ManagerApproval = lazy(() => import("./pages/ManagerApproval"));
const DailyReporting = lazy(() => import("./pages/DailyReporting"));
const Reports = lazy(() => import("./pages/Reports"));
const TeamManagement = lazy(() => import("./pages/TeamManagement"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Documents = lazy(() => import("./pages/Documents"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<LoadingState message="Loading application..." />}>
                <Routes>
                  <Route path="/" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Index />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/log" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Log />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/time-entry" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <TimeEntry />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/time-entry/standard" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <TimeEntryStandard />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/time-entry/time-in-out" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <TimeEntryTimeInOut />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/manager-approval" element={
                    <ProtectedRoute requiredRoles={['manager', 'admin', 'supervisor', 'foreman']}>
                      <AppLayout>
                        <ManagerApproval />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/daily-reporting" element={
                    <ProtectedRoute requiredRoles={['manager', 'admin', 'supervisor', 'foreman']}>
                      <AppLayout>
                        <DailyReporting />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute requiredRoles={['manager', 'admin', 'supervisor', 'foreman']}>
                      <AppLayout>
                        <Reports />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/team" element={
                    <ProtectedRoute requiredRoles={['manager', 'admin', 'supervisor', 'foreman']}>
                      <AppLayout>
                        <TeamManagement />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/calendar" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Calendar />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/documents" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Documents />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <Settings />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
