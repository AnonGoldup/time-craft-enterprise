
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const SidebarUserProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold">{user?.fullName?.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sidebar-foreground font-medium">{user?.fullName}</p>
          <p className="text-sidebar-foreground/60 text-sm capitalize">{user?.role}</p>
        </div>
      </div>
      <div className="text-xs text-sidebar-foreground/40">{user?.department}</div>
    </div>
  );
};
