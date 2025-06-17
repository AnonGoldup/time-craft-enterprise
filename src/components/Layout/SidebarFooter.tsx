
import React from 'react';
import { SidebarFooter } from '@/components/ui/sidebar';

export const AppSidebarFooter: React.FC = () => {
  return (
    <SidebarFooter className="p-4 border-t border-sidebar-border bg-sidebar">
      <div className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
        AltaPro Electric Ltd. v1.0.0
      </div>
    </SidebarFooter>
  );
};
