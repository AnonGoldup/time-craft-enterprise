
import React from 'react';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar';
import { SidebarMenuItem } from './SidebarMenuItem';
import type { SidebarNavigationGroupProps } from './types';

export const SidebarNavigationGroup: React.FC<SidebarNavigationGroupProps> = ({ title, items }) => {
  if (items.length === 0) return null;

  return (
    <SidebarGroup>
      {title && (
        <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs font-medium px-2">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.path} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
