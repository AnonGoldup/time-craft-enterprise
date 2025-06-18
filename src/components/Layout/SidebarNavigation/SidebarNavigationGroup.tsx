
import React from 'react';
import { SidebarMenuItem } from './SidebarMenuItem';
import type { SidebarNavigationGroupProps } from './types';

export const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({ title, items }) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      {title && (
        <div className="text-xs font-medium text-sidebar-foreground/40 px-3 py-1">
          {title}
        </div>
      )}
      {items.map((item) => (
        <SidebarMenuItem key={item.path} item={item} />
      ))}
    </div>
  );
};
