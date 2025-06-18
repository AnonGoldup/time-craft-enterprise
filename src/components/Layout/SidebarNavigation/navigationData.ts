import { Clock, CheckCircle, BarChart3, Users, Calendar, FileText, Settings, Home, ClipboardList, History, FolderOpen, Download } from 'lucide-react';
import type { MenuItem } from './types';

export const navigationItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/',
    roles: ['employee', 'admin']
  }
];

export const timesheetModule: MenuItem[] = [
  {
    label: 'Timesheets',
    icon: Clock,
    path: '/time-entry',
    roles: ['employee', 'admin'],
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
    roles: ['employee', 'admin']
  },
  {
    label: 'Calendar',
    icon: Calendar,
    path: '/calendar',
    roles: ['employee', 'admin']
  },
  {
    label: 'Documents',
    icon: FileText,
    path: '/documents',
    roles: ['employee', 'admin']
  }
];

export const projectManagementModule: MenuItem[] = [
  {
    label: 'Projects',
    icon: FolderOpen,
    path: '/projects',
    roles: ['employee', 'admin']
  },
  {
    label: 'Daily Reporting',
    icon: ClipboardList,
    path: '/daily-reporting',
    roles: ['employee', 'admin']
  }
];

export const administratorModule: MenuItem[] = [
  {
    label: 'Manager Approval',
    icon: CheckCircle,
    path: '/manager-approval',
    roles: ['admin']
  },
  {
    label: 'Team Management',
    icon: Users,
    path: '/team',
    roles: ['admin']
  },
  {
    label: 'Export Payroll',
    icon: Download,
    path: '/export-payroll',
    roles: ['admin']
  },
  {
    label: 'Reports',
    icon: BarChart3,
    path: '/reports',
    roles: ['admin'],
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
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    roles: ['admin']
  }
];
