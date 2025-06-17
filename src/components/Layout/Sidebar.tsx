
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, CheckCircle, BarChart3, Users, Calendar, FileText, Settings, Home, ClipboardList, History, FolderOpen, UserCheck, Download, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  }
];

const timesheetModule = [
  {
    label: 'Timesheets',
    icon: Clock,
    path: '/time-entry',
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
  }
];

const projectManagementModule = [
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

const administratorModule = [
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
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    roles: ['admin']
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, hasRole } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Timesheets', 'Reports']);
  
  const filteredTimesheetModule = timesheetModule.filter(item => hasRole(item.roles));
  const filteredProjectModule = projectManagementModule.filter(item => hasRole(item.roles));
  const filteredAdminModule = administratorModule.filter(item => hasRole(item.roles));
  
  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label) 
        : [...prev, label]
    );
  };

  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(sub => location.pathname === sub.path);
  };

  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const isSubmenuItemActive = hasSubmenu && isSubmenuActive(item.submenu);
    
    if (hasSubmenu) {
      return (
        <div key={item.path}>
          <button
            onClick={() => toggleExpanded(item.label)}
            className={cn(
              "flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
              isActive || isSubmenuItemActive
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded ? "rotate-180" : "")} />
          </button>
          <Collapsible open={isExpanded}>
            <CollapsibleContent>
              <div className="ml-6 mt-1 space-y-1">
                {item.submenu.map((subItem: any) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 text-sm",
                      location.pathname === subItem.path
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
                    )}
                  >
                    <span className="font-medium">{subItem.label}</span>
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      );
    }
    
    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
          isActive
            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700"
        )}
      >
        <item.icon className="h-5 w-5" />
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 h-[calc(100vh-73px)]">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">{user?.fullName?.charAt(0)}</span>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white font-medium">{user?.fullName}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{user?.role}</p>
            </div>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">{user?.department}</div>
        </div>

        <nav className="space-y-4">
          {/* Dashboard */}
          <div className="space-y-2">
            {navigationItems.filter(item => hasRole(item.roles)).map(renderMenuItem)}
          </div>

          {/* Timesheet Module */}
          {filteredTimesheetModule.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-1">
                Timesheet Module
              </div>
              {filteredTimesheetModule.map(renderMenuItem)}
            </div>
          )}

          {/* Project Management Module */}
          {filteredProjectModule.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-1">
                Project Management Module
              </div>
              {filteredProjectModule.map(renderMenuItem)}
            </div>
          )}

          {/* Administrator Module */}
          {filteredAdminModule.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-400 dark:text-gray-500 px-3 py-1">
                Administrator Module
              </div>
              {filteredAdminModule.map(renderMenuItem)}
            </div>
          )}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-slate-700">
        <div className="text-xs text-gray-400 dark:text-gray-500">
          v1.0.0
        </div>
      </div>
    </div>
  );
};
