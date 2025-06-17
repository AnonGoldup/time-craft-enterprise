
import React from 'react';
import { SidebarHeader } from '@/components/ui/sidebar';
import { Clock } from 'lucide-react';

export const AppSidebarHeader: React.FC = () => {
  return (
    <SidebarHeader className="p-4 border-b border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
          <Clock className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            AltaTimesheet
          </h1>
          <p className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            Time Management System
          </p>
        </div>
      </div>
    </SidebarHeader>
  );
};
