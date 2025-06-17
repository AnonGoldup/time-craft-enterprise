import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AppLayout } from "@/components/Layout/AppLayoutEnhanced";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { Suspense, lazy } from "react";
import { LoadingState } from "@/components/ui/loading";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Log = lazy(() => import("./pages/Log"));
const TimeEntryStandard = lazy(() => import("./pages/TimeEntryStandard"));
const TimeEntryTimeInOut = lazy(() => import("./pages/TimeEntryTimeInOut"));
const ManagerApproval = lazy(() => import("./pages/ManagerApproval"));
const DailyReporting = lazy(() => import("./pages/DailyReporting"));
const Reports = lazy(() => import("./pages/Reports"));
const TeamManagement = lazy(() => import("./pages/TeamManagement"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Documents = lazy(() => import("./pages/Documents"));
const Settings = lazy(() => import("./pages/Settings"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EditDailyReport = lazy(() => import("./pages/EditDailyReport"));
const CompanySettings = lazy(() => import("./pages/CompanySettings"));
const ExportPayrollData = lazy(() => import("./pages/ExportPayrollData"));

// Company Settings sub-pages
const CompanySetup = lazy(() => import("./pages/settings/CompanySetup"));
const AddDivision = lazy(() => import("./pages/settings/AddDivision"));
const AddOccupancyType = lazy(() => import("./pages/settings/AddOccupancyType"));
const AddProject = lazy(() => import("./pages/settings/AddProject"));
const AddSystem = lazy(() => import("./pages/settings/AddSystem"));
const AddPhase = lazy(() => import("./pages/settings/AddPhase"));
const AddUser = lazy(() => import("./pages/settings/AddUser"));
const UserLog = lazy(() => import("./pages/settings/UserLog"));
const UsersLoggedOn = lazy(() => import("./pages/settings/UsersLoggedOn"));
const AddEmployee = lazy(() => import("./pages/settings/AddEmployee"));
const EmployeeLog = lazy(() => import("./pages/settings/EmployeeLog"));

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
                  <Route path="/daily-reporting/edit/:id" element={
                    <ProtectedRoute requiredRoles={['manager', 'admin', 'supervisor', 'foreman']}>
                      <AppLayout>
                        <EditDailyReport />
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
                  <Route path="/projects" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <Projects />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/projects/:projectId" element={
                    <ProtectedRoute>
                      <AppLayout>
                        <ProjectDetail />
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
                  <Route path="/company-settings" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <CompanySettings />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* Company Settings Sub-pages */}
                  <Route path="/settings/company-setup" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <CompanySetup />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-division" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddDivision />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-occupancy-type" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddOccupancyType />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-project" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddProject />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-system" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddSystem />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-phase" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddPhase />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-user" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddUser />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/user-log" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <UserLog />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/users-logged-on" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <UsersLoggedOn />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/add-employee" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <AddEmployee />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/employee-log" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <EmployeeLog />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="/export-payroll" element={
                    <ProtectedRoute requiredRoles={['admin']}>
                      <AppLayout>
                        <ExportPayrollData />
                      </AppLayout>
                    </ProtectedRoute>
                  } />
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
