
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarNavigationGroup } from './SidebarNavigation/SidebarNavigationGroup';
import { SidebarUserProfile } from './SidebarNavigation/SidebarUserProfile';
import { SidebarFooter } from './SidebarNavigation/SidebarFooter';
import { navigationItems, timesheetModule, projectManagementModule, administratorModule } from './SidebarNavigation/navigationData';

export const RefactoredSidebar: React.FC = () => {
  const { hasRole } = useAuth();
  
  const filteredNavigationItems = navigationItems.filter(item => hasRole(item.roles));
  const filteredTimesheetModule = timesheetModule.filter(item => hasRole(item.roles));
  const filteredProjectModule = projectManagementModule.filter(item => hasRole(item.roles));
  const filteredAdminModule = administratorModule.filter(item => hasRole(item.roles));

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-[calc(100vh-73px)]">
      <div className="p-6">
        <SidebarUserProfile />

        <nav className="space-y-4">
          <SidebarNavigationGroup items={filteredNavigationItems} />
          
          <SidebarNavigationGroup 
            title="Timesheet Module" 
            items={filteredTimesheetModule} 
          />
          
          <SidebarNavigationGroup 
            title="Project Management Module" 
            items={filteredProjectModule} 
          />
          
          <SidebarNavigationGroup 
            title="Administrator Module" 
            items={filteredAdminModule} 
          />
        </nav>
      </div>

      <SidebarFooter />
    </div>
  );
};
