
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, CheckCircle, BarChart3, Users, Calendar, FileText, Settings, Home, ClipboardList, History, FolderOpen, UserCheck, Download, Timer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarFooter } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

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

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const { user, hasRole } = useAuth();
  
  const filteredTimesheetModule = timesheetModule.filter(item => hasRole(item.roles));
  const filteredProjectModule = projectManagementModule.filter(item => hasRole(item.roles));
  const filteredAdminModule = administratorModule.filter(item => hasRole(item.roles));
  
  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(sub => location.pathname === sub.path);
  };

  // Enhanced keyboard navigation
  useKeyboardNavigation({
    enabled: true,
  });

  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.path;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuItemActive = hasSubmenu && isSubmenuActive(item.submenu);
    
    if (hasSubmenu) {
      return (
        <Collapsible key={item.path} defaultOpen={isActive || isSubmenuItemActive}>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton 
                isActive={isActive || isSubmenuItemActive} 
                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors"
                aria-expanded={isActive || isSubmenuItemActive}
                aria-label={`${item.label} menu`}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.submenu.map((subItem: any) => (
                  <SidebarMenuSubItem key={subItem.path}>
                    <SidebarMenuSubButton 
                      asChild 
                      isActive={location.pathname === subItem.path}
                      className="focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors"
                    >
                      <Link 
                        to={subItem.path}
                        aria-label={subItem.label}
                      >
                        <span>{subItem.label}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }
    
    return (
      <SidebarMenuItem key={item.path}>
        <SidebarMenuButton 
          asChild 
          isActive={isActive} 
          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors"
        >
          <Link 
            to={item.path}
            aria-label={item.label}
          >
            <item.icon className="h-4 w-4" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="border-border bg-sidebar">
      <SidebarHeader className="p-6 bg-sidebar border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold" aria-label={`${user?.fullName} avatar`}>
              {user?.fullName?.charAt(0)}
            </span>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sidebar-foreground font-medium">{user?.fullName}</p>
            <p className="text-sidebar-foreground/70 text-sm capitalize">{user?.role}</p>
          </div>
        </div>
        <div className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          {user?.department}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-sidebar">
        {/* Dashboard */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.filter(item => hasRole(item.roles)).map(renderMenuItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Timesheet Module */}
        {filteredTimesheetModule.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium px-2">
              Timesheet Module
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredTimesheetModule.map(renderMenuItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Project Management Module */}
        {filteredProjectModule.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium px-2">
              Project Management Module
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredProjectModule.map(renderMenuItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Administrator Module */}
        {filteredAdminModule.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium px-2">
              Administrator Module
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredAdminModule.map(renderMenuItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border bg-sidebar">
        <div className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
