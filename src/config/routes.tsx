
import React from 'react';
import { UserRole } from '@/contexts/AuthContext';

// Main pages
import Index from '@/pages/Index';
import Log from '@/pages/Log';
import TimeEntry from '@/pages/TimeEntry';
import TimeEntryStandard from '@/pages/TimeEntryStandard';
import TimeEntryTimeInOut from '@/pages/TimeEntryTimeInOut';
import ManagerApproval from '@/pages/ManagerApproval';
import DailyReporting from '@/pages/DailyReporting';
import EditDailyReport from '@/pages/EditDailyReport';
import Reports from '@/pages/Reports';
import TeamManagement from '@/pages/TeamManagement';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import Calendar from '@/pages/Calendar';
import Documents from '@/pages/Documents';
import Settings from '@/pages/Settings';
import CompanySettings from '@/pages/CompanySettings';
import ExportPayrollData from '@/pages/ExportPayrollData';

// Settings pages
import CompanySetup from '@/pages/settings/CompanySetup';
import AddDivision from '@/pages/settings/AddDivision';
import AddOccupancyType from '@/pages/settings/AddOccupancyType';
import AddProject from '@/pages/settings/AddProject';
import AddSystem from '@/pages/settings/AddSystem';
import AddPhase from '@/pages/settings/AddPhase';
import AddUser from '@/pages/settings/AddUser';
import UserLog from '@/pages/settings/UserLog';
import UsersLoggedOn from '@/pages/settings/UsersLoggedOn';
import AddEmployee from '@/pages/settings/AddEmployee';
import EmployeeLog from '@/pages/settings/EmployeeLog';

// Report pages
import HoursBreakdown from '@/pages/reports/HoursBreakdown';

// Error pages
import NotFound from '@/pages/NotFound';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  requiredRoles?: UserRole[];
}

export const mainRoutes: RouteConfig[] = [
  {
    path: '/',
    component: Index,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/log',
    component: Log,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/time-entry',
    component: TimeEntry,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/time-entry/standard',
    component: TimeEntryStandard,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/time-entry/time-in-out',
    component: TimeEntryTimeInOut,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/manager-approval',
    component: ManagerApproval,
    requiredRoles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/daily-reporting',
    component: DailyReporting,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/daily-reporting/edit/:id',
    component: EditDailyReport,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/reports',
    component: Reports,
    requiredRoles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/reports/hours-breakdown',
    component: HoursBreakdown,
    requiredRoles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/team',
    component: TeamManagement,
    requiredRoles: [UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/projects',
    component: Projects,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/projects/:id',
    component: ProjectDetail,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/calendar',
    component: Calendar,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/documents',
    component: Documents,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/company-settings',
    component: CompanySettings,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/export-payroll',
    component: ExportPayrollData,
    requiredRoles: [UserRole.ADMIN]
  }
];

export const settingsRoutes: RouteConfig[] = [
  {
    path: '/settings',
    component: Settings,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/company-setup',
    component: CompanySetup,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-division',
    component: AddDivision,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-occupancy-type',
    component: AddOccupancyType,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-project',
    component: AddProject,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-system',
    component: AddSystem,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-phase',
    component: AddPhase,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-user',
    component: AddUser,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/user-log',
    component: UserLog,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/users-logged-on',
    component: UsersLoggedOn,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-employee',
    component: AddEmployee,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/employee-log',
    component: EmployeeLog,
    requiredRoles: [UserRole.ADMIN]
  }
];

export const catchAllRoute: RouteConfig = {
  path: '*',
  component: NotFound
};
