
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/Layout/AppLayout";
import Index from "./pages/Index";
import Log from "./pages/Log";
import TimeEntry from "./pages/TimeEntry";
import TimeEntryStandard from "./pages/TimeEntryStandard";
import TimeEntryTimeInOut from "./pages/TimeEntryTimeInOut";
import ManagerApproval from "./pages/ManagerApproval";
import DailyReporting from "./pages/DailyReporting";
import Reports from "./pages/Reports";
import TeamManagement from "./pages/TeamManagement";
import Calendar from "./pages/Calendar";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
