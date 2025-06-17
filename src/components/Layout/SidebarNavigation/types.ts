
export interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  roles: string[];
  submenu?: { label: string; path: string }[];
}

export interface SidebarNavigationGroupProps {
  title?: string;
  items: MenuItem[];
}

export interface SidebarMenuItemProps {
  item: MenuItem;
}
