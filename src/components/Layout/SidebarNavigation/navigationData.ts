
import { UserRole } from '@/contexts/AuthContext';
import { Home, Clock, Calendar, FileText, Users, BarChart3, Settings, Building2, Download } from 'lucide-react';
import type { NavigationItem } from './types';

export const navigationItems: NavigationItem[] = [
  {
    path: '/',
    label: 'Dashboard',
    icon: Home,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/time-entry/standard',
    label: 'Timesheets',
    icon: Clock,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/log',
    label: 'Time Log',
    icon: FileText,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/calendar',
    label: 'Calendar',
    icon: Calendar,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/documents',
    label: 'Documents',
    icon: FileText,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  }
];

export const timesheetModule: NavigationItem[] = [
  {
    path: '/time-entry/standard',
    label: 'Standard Hours',
    icon: Clock,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/time-entry/time-in-out',
    label: 'Time In/Out',
    icon: Clock,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/manager-approval',
    label: 'Manager Approval',
    icon: Users,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  }
];

export const projectManagementModule: NavigationItem[] = [
  {
    path: '/projects',
    label: 'Projects',
    icon: Building2,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/daily-reporting',
    label: 'Daily Reporting',
    icon: FileText,
    roles: [UserRole.EMPLOYEE, UserRole.MANAGER, UserRole.ADMIN]
  },
  {
    path: '/team',
    label: 'Team Management',
    icon: Users,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
  }
];

export const administratorModule: NavigationItem[] = [
  {
    path: '/reports',
    label: 'Reports',
    icon: BarChart3,
    roles: [UserRole.MANAGER, UserRole.ADMIN]
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
