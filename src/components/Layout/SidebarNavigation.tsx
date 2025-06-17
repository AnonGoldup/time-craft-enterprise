
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarContent } from '@/components/ui/sidebar';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { SidebarNavigationGroup } from './SidebarNavigation/SidebarNavigationGroup';
import { navigationItems, timesheetModule, projectManagementModule, administratorModule } from './SidebarNavigation/navigationData';

export const SidebarNavigation: React.FC = () => {
  const { hasRole } = useAuth();

  const filteredNavigationItems = navigationItems.filter(item => hasRole(item.roles));
  const filteredTimesheetModule = timesheetModule.filter(item => hasRole(item.roles));
  const filteredProjectModule = projectManagementModule.filter(item => hasRole(item.roles));
  const filteredAdminModule = administratorModule.filter(item => hasRole(item.roles));

  useKeyboardNavigation({ enabled: true });

  return (
    <SidebarContent className="bg-sidebar">
      <SidebarNavigationGroup items={filteredNavigationItems} />
      <SidebarNavigationGroup title="Timesheet Module" items={filteredTimesheetModule} />
      <SidebarNavigationGroup title="Project Management Module" items={filteredProjectModule} />
      <SidebarNavigationGroup title="Administrator Module" items={filteredAdminModule} />
    </SidebarContent>
  );
};
