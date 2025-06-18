
import { Clock, CheckCircle, BarChart3, Users, Calendar, FileText, Settings, Home, ClipboardList, History, FolderOpen, UserCheck, Download, Timer } from 'lucide-react';
import type { MenuItem } from './types';

export const navigationItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  }
];

export const timesheetModule: MenuItem[] = [
  {
    label: 'Timesheets',
    icon: Clock,
    path: '/time-entry/standard',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman'],
    submenu: [
      {
        label: 'Standard Hours',
        path: '/time-entry/standard'
      },
      {
        label: 'Time In/Out',
        path: '/time-entry/time-in-out'
      }
    ]
  },
  {
    label: 'Time Log',
    icon: History,
    path: '/log',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Calendar',
    icon: Calendar,
    path: '/calendar',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Documents',
    icon: FileText,
    path: '/documents',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'User Settings',
    icon: Settings,
    path: '/settings',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  }
];

export const projectManagementModule: MenuItem[] = [
  {
    label: 'Projects',
    icon: FolderOpen,
    path: '/projects',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Daily Reporting',
    icon: ClipboardList,
    path: '/daily-reporting',
    roles: ['manager', 'admin', 'supervisor', 'foreman']
  }
];

export const administratorModule: MenuItem[] = [
  {
    label: 'Manager Approval',
    icon: CheckCircle,
    path: '/manager-approval',
    roles: ['manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Team Management',
    icon: Users,
    path: '/team',
    roles: ['manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'User Log',
    icon: UserCheck,
    path: '/user-log',
    roles: ['admin']
  },
  {
    label: 'Export Payroll',
    icon: Download,
    path: '/export-payroll',
    roles: ['admin']
  },
  {
    label: 'Time Settings',
    icon: Timer,
    path: '/time-settings',
    roles: ['admin']
  },
  {
    label: 'Reports',
    icon: BarChart3,
    path: '/reports',
    roles: ['manager', 'admin', 'supervisor', 'foreman'],
    submenu: [
      {
        label: 'Hours Breakdown-Excel',
        path: '/reports/hours-breakdown'
      },
      {
        label: 'Labor Percent Complete',
        path: '/reports/labor-percent'
      },
      {
        label: 'Audit Labor Hours',
        path: '/reports/audit-labor'
      },
      {
        label: 'Weekly Timesheets (Total)',
        path: '/reports/weekly-total'
      },
      {
        label: 'Weekly Timesheets (by Project)',
        path: '/reports/weekly-project'
      },
      {
        label: 'Employee Timecards',
        path: '/reports/employee-timecards'
      }
    ]
  },
  {
    label: 'Company Settings',
    icon: Settings,
    path: '/company-settings',
    roles: ['admin']
  }
];
