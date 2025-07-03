
import { lazy } from 'react';
import { UserRole } from '@/contexts/AuthContext';
import type { RouteConfig } from './types';

const TimesheetRedesign = lazy(() => import('@/pages/TimesheetRedesign'));

// Main pages
import Index from '@/pages/Index';
import Log from '@/pages/Log';
import Dashboard from '@/pages/Dashboard';
import Timesheet from '@/pages/Timesheet';
import EnhancedTimeEntry from '@/pages/EnhancedTimeEntry';
import ModernTimeEntry from '@/pages/ModernTimeEntry';
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
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/log',
    component: Log,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/timesheet',
    component: Timesheet,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/timesheet-redesign',
    component: TimesheetRedesign,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/time-entry/enhanced',
    component: EnhancedTimeEntry,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/time-entry/modern',
    component: ModernTimeEntry,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/manager-approval',
    component: ManagerApproval,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/daily-reporting',
    component: DailyReporting,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/daily-reporting/edit/:id',
    component: EditDailyReport,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/reports',
    component: Reports,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/team',
    component: TeamManagement,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/projects',
    component: Projects,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/projects/:id',
    component: ProjectDetail,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/calendar',
    component: Calendar,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/documents',
    component: Documents,
    requiredRoles: [UserRole.EMPLOYEE, UserRole.ADMIN]
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
