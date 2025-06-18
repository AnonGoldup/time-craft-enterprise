
import React from 'react';
import { SidebarHeader } from '@/components/ui/sidebar';

export const AppSidebarHeader: React.FC = () => {
  return (
    <SidebarHeader className="sticky top-0 z-10 p-4 border-b border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden">
          <img 
            src="/lovable-uploads/fafab221-cf6d-41b5-bc79-9b71d4fa2cb0.png" 
            alt="AltaPro Logo" 
            className="w-full h-full object-cover"
          />
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
