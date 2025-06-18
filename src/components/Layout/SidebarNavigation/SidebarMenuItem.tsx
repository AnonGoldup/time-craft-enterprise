
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import type { SidebarMenuItemProps } from './types';

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ item }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  
  const isActive = location.pathname === item.path;
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const isSubmenuItemActive = hasSubmenu && item.submenu.some(sub => location.pathname === sub.path);
  
  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  if (hasSubmenu) {
    return (
      <div key={item.path}>
        <button
          onClick={toggleExpanded}
          className={cn(
            "flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
            isActive || isSubmenuItemActive
              ? "bg-accent/60 text-accent-foreground border border-accent/10 px-2 py-1.5"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded ? "rotate-180" : "")} />
        </button>
        <Collapsible open={isExpanded}>
          <CollapsibleContent>
            <div className="ml-6 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 text-sm",
                    location.pathname === subItem.path
                      ? "bg-accent/60 text-accent-foreground border border-accent/10 px-2 py-1.5"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <span className="font-medium">{subItem.label}</span>
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  }
  
  return (
    <Link
      key={item.path}
      to={item.path}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
        isActive
          ? "bg-accent/60 text-accent-foreground border border-accent/10 px-2 py-1.5"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </Link>
  );
};
