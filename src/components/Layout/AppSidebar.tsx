
import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { AppSidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { AppSidebarFooter } from './SidebarFooter';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border-border bg-sidebar">
      {isMobile && (
        <div className="flex justify-end items-center p-4 border-b border-sidebar-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenMobile(false)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
      )}
      <AppSidebarHeader />
      <SidebarNavigation />
      <AppSidebarFooter />
    </Sidebar>
  );
};
