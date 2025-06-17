
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarMenuButton, SidebarMenuItem as SidebarMenuItemUI, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { SidebarMenuItemProps } from './types';

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item }) => {
  const location = useLocation();
  
  const isActive = location.pathname === item.path;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isSubmenuItemActive = hasSubmenu && item.submenu.some(sub => location.pathname === sub.path);

  if (hasSubmenu) {
    return (
      <Collapsible key={item.path} defaultOpen={isActive || isSubmenuItemActive}>
        <SidebarMenuItemUI>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              isActive={isActive || isSubmenuItemActive}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors"
              aria-expanded={isActive || isSubmenuItemActive}
              aria-label={`${item.label} menu`}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.submenu.map((subItem) => (
                <SidebarMenuSubItem key={subItem.path}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={location.pathname === subItem.path}
                    className="focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors"
                  >
                    <Link to={subItem.path} aria-label={subItem.label}>
                      <span>{subItem.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItemUI>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItemUI key={item.path}>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:bg-sidebar-accent focus:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors"
      >
        <Link to={item.path} aria-label={item.label}>
          <item.icon className="h-4 w-4" aria-hidden="true" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItemUI>
  );
};
