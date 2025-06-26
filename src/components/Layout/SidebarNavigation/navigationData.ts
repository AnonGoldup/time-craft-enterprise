
import { UserRole } from '@/contexts/AuthContext';
import { Home, Calendar, FileText, Users, BarChart3, Settings, Building2, Download, Clock } from 'lucide-react';
import type { MenuItem } from './types';

export const navigationItems: MenuItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: Home,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  }
];

export const timesheetModule: MenuItem[] = [
  {
    path: '/timesheet',
    label: 'Timesheet',
    icon: Clock,
<<<<<<< HEAD
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
=======
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN],
    submenu: [
      {
        label: 'Standard Hours',
        path: '/time-entry/standard'
      },
      {
        label: 'Time In/Out',
        path: '/time-entry/time-in-out'
      },
      {
        label: 'Enhanced Entry',
        path: '/time-entry/enhanced'
      },
      {
        label: 'Modern Entry',
        path: '/time-entry/modern'
      }
    ]
>>>>>>> f0a0cdd (feat: Complete Phase 1 - Frontend UI Implementation)
  },
  {
    path: '/log',
    label: 'Time Log',
    icon: FileText,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/calendar',
    label: 'Calendar',
    icon: Calendar,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/documents',
    label: 'Documents',
    icon: FileText,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  }
];

export const projectManagementModule: MenuItem[] = [
  {
    path: '/projects',
    label: 'Projects',
    icon: Building2,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/daily-reporting',
    label: 'Daily Reporting',
    icon: FileText,
    roles: [UserRole.EMPLOYEE, UserRole.ADMIN]
  },
  {
    path: '/team',
    label: 'Team Management',
    icon: Users,
    roles: [UserRole.ADMIN]
  }
];

export const administratorModule: MenuItem[] = [
  {
    path: '/manager-approval',
    label: 'Manager Approval',
    icon: Users,
    roles: [UserRole.ADMIN]
  },
  {
    path: '/reports',
    label: 'Reports',
    icon: BarChart3,
    roles: [UserRole.ADMIN]
  },
  {
    path: '/company-settings',
    label: 'Company Settings',
    icon: Settings,
    roles: [UserRole.ADMIN]
  },
  {
    path: '/export-payroll',
    label: 'Export Payroll',
    icon: Download,
    roles: [UserRole.ADMIN]
  }
];
