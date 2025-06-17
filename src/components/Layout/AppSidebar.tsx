
import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { AppSidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { AppSidebarFooter } from './SidebarFooter';

export const AppSidebar: React.FC = () => {
  return (
    <Sidebar className="border-border bg-sidebar">
      <AppSidebarHeader />
      <SidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
};
