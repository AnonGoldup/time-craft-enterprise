
import React from 'react';

export const SidebarFooter: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
      <div className="text-xs text-sidebar-foreground/40">
        v1.0.0
      </div>
    </div>
  );
};
