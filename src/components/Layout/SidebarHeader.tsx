
import React from 'react';
import { SidebarHeader } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

export const AppSidebarHeader: React.FC = () => {
  const { user } = useAuth();

  return (
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
  );
};
