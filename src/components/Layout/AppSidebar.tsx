
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, CheckCircle, BarChart3, Users, Calendar, FileText, Settings, Home, ClipboardList, ChevronRight, History } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, SidebarFooter } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const navigationItems = [{
  label: 'Dashboard',
  icon: Home,
  path: '/',
  roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Time Log',
  icon: History,
  path: '/log',
  roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Time Entry',
  icon: Clock,
  path: '/time-entry',
  roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman'],
  submenu: [{
    label: 'Standard Hours',
    path: '/time-entry/standard'
  }, {
    label: 'Time In/Out',
    path: '/time-entry/time-in-out'
  }]
}, {
  label: 'Manager Approval',
  icon: CheckCircle,
  path: '/manager-approval',
  roles: ['manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Daily Reporting',
  icon: ClipboardList,
  path: '/daily-reporting',
  roles: ['manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Reports',
  icon: BarChart3,
  path: '/reports',
  roles: ['manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Team Management',
  icon: Users,
  path: '/team',
  roles: ['manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Calendar',
  icon: Calendar,
  path: '/calendar',
  roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Documents',
  icon: FileText,
  path: '/documents',
  roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
}, {
  label: 'Settings',
  icon: Settings,
  path: '/settings',
  roles: ['admin']
}];

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const {
    user,
    hasRole
  } = useAuth();
  const filteredItems = navigationItems.filter(item => hasRole(item.roles));
  const isSubmenuActive = (submenu: any[]) => {
    return submenu.some(sub => location.pathname === sub.path);
  };
  return <Sidebar className="border-slate-200 dark:border-slate-800">
      <SidebarHeader className="p-6 bg-slate-600">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">{user?.fullName?.charAt(0)}</span>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-slate-900 dark:text-white font-medium">{user?.fullName}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm capitalize">{user?.role}</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500 group-data-[collapsible=icon]:hidden">
          {user?.department}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-slate-600">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 dark:text-slate-400">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map(item => {
              const isActive = location.pathname === item.path;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuItemActive = hasSubmenu && isSubmenuActive(item.submenu);
              if (hasSubmenu) {
                return <Collapsible key={item.path} defaultOpen={isActive || isSubmenuItemActive}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={isActive || isSubmenuItemActive} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            <ChevronRight className="h-4 w-4 ml-auto transition-transform group-data-[state=open]:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map(subItem => <SidebarMenuSubItem key={subItem.path}>
                                <SidebarMenuSubButton asChild isActive={location.pathname === subItem.path}>
                                  <Link to={subItem.path}>
                                    <span>{subItem.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>)}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>;
              }
              return <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                      <Link to={item.path}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>;
            })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-400 dark:text-slate-500 group-data-[collapsible=icon]:hidden">
          v1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>;
};
