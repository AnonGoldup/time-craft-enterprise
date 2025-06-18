
import { UserRole } from '@/contexts/AuthContext';
import type { RouteConfig } from './types';

// Main pages
import Index from '@/pages/Index';
import Log from '@/pages/Log';
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
import CompanySettings from '@/pages/CompanySettings';
import ExportPayrollData from '@/pages/ExportPayrollData';

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
