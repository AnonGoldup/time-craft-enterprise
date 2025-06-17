
import { lazy } from "react";

// Lazy load pages for better performance
const Index = lazy(() => import("../pages/Index"));
const Log = lazy(() => import("../pages/Log"));
const TimeEntryStandard = lazy(() => import("../pages/TimeEntryStandard"));
const TimeEntryTimeInOut = lazy(() => import("../pages/TimeEntryTimeInOut"));
const ManagerApproval = lazy(() => import("../pages/ManagerApproval"));
const DailyReporting = lazy(() => import("../pages/DailyReporting"));
const Reports = lazy(() => import("../pages/Reports"));
const TeamManagement = lazy(() => import("../pages/TeamManagement"));
const Calendar = lazy(() => import("../pages/Calendar"));
const Documents = lazy(() => import("../pages/Documents"));
const Settings = lazy(() => import("../pages/Settings"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));
const EditDailyReport = lazy(() => import("../pages/EditDailyReport"));
const CompanySettings = lazy(() => import("../pages/CompanySettings"));
const ExportPayrollData = lazy(() => import("../pages/ExportPayrollData"));

// Company Settings sub-pages
const CompanySetup = lazy(() => import("../pages/settings/CompanySetup"));
const AddDivision = lazy(() => import("../pages/settings/AddDivision"));
const AddOccupancyType = lazy(() => import("../pages/settings/AddOccupancyType"));
const AddProject = lazy(() => import("../pages/settings/AddProject"));
const AddSystem = lazy(() => import("../pages/settings/AddSystem"));
const AddPhase = lazy(() => import("../pages/settings/AddPhase"));
const AddUser = lazy(() => import("../pages/settings/AddUser"));
const UserLog = lazy(() => import("../pages/settings/UserLog"));
const UsersLoggedOn = lazy(() => import("../pages/settings/UsersLoggedOn"));
const AddEmployee = lazy(() => import("../pages/settings/AddEmployee"));
const EmployeeLog = lazy(() => import("../pages/settings/EmployeeLog"));

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  requiredRoles?: string[];
}

export const mainRoutes: RouteConfig[] = [
  { path: "/", component: Index },
  { path: "/log", component: Log },
  { path: "/time-entry/standard", component: TimeEntryStandard },
  { path: "/time-entry/time-in-out", component: TimeEntryTimeInOut },
  { path: "/manager-approval", component: ManagerApproval, requiredRoles: ['admin'] },
  { path: "/daily-reporting", component: DailyReporting, requiredRoles: ['admin'] },
  { path: "/daily-reporting/edit/:id", component: EditDailyReport, requiredRoles: ['admin'] },
  { path: "/reports", component: Reports, requiredRoles: ['admin'] },
  { path: "/team", component: TeamManagement, requiredRoles: ['admin'] },
  { path: "/projects", component: Projects },
  { path: "/projects/:projectId", component: ProjectDetail },
  { path: "/calendar", component: Calendar },
  { path: "/documents", component: Documents },
  { path: "/settings", component: Settings, requiredRoles: ['admin'] },
  { path: "/company-settings", component: CompanySettings, requiredRoles: ['admin'] },
  { path: "/export-payroll", component: ExportPayrollData, requiredRoles: ['admin'] }
];

export const settingsRoutes: RouteConfig[] = [
  { path: "/settings/company-setup", component: CompanySetup, requiredRoles: ['admin'] },
  { path: "/settings/add-division", component: AddDivision, requiredRoles: ['admin'] },
  { path: "/settings/add-occupancy-type", component: AddOccupancyType, requiredRoles: ['admin'] },
  { path: "/settings/add-project", component: AddProject, requiredRoles: ['admin'] },
  { path: "/settings/add-system", component: AddSystem, requiredRoles: ['admin'] },
  { path: "/settings/add-phase", component: AddPhase, requiredRoles: ['admin'] },
  { path: "/settings/add-user", component: AddUser, requiredRoles: ['admin'] },
  { path: "/settings/user-log", component: UserLog, requiredRoles: ['admin'] },
  { path: "/settings/users-logged-on", component: UsersLoggedOn, requiredRoles: ['admin'] },
  { path: "/settings/add-employee", component: AddEmployee, requiredRoles: ['admin'] },
  { path: "/settings/employee-log", component: EmployeeLog, requiredRoles: ['admin'] }
];

export const catchAllRoute: RouteConfig = {
  path: "*",
  component: NotFound
};
