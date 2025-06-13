
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Clock, 
  CheckCircle, 
  BarChart3, 
  Users, 
  Calendar, 
  FileText,
  Settings,
  Home
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Time Entry',
    icon: Clock,
    path: '/time-entry',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Manager Approval',
    icon: CheckCircle,
    path: '/manager-approval',
    roles: ['manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Reports',
    icon: BarChart3,
    path: '/reports',
    roles: ['manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Team Management',
    icon: Users,
    path: '/team',
    roles: ['manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Calendar',
    icon: Calendar,
    path: '/calendar',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Documents',
    icon: FileText,
    path: '/documents',
    roles: ['employee', 'manager', 'admin', 'supervisor', 'foreman']
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    roles: ['admin']
  }
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, hasRole } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    hasRole(item.roles)
  );

  return (
    <div className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 h-[calc(100vh-73px)]">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">{user?.fullName?.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-medium">{user?.fullName}</p>
              <p className="text-gray-400 text-sm capitalize">{user?.role}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500">{user?.department}</div>
        </div>

        <nav className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
          <h3 className="text-white font-medium text-sm mb-1">Quick Stats</h3>
          <p className="text-gray-400 text-xs">This week: 40.5 hours</p>
          <p className="text-gray-400 text-xs">Overtime: 2.5 hours</p>
        </div>
      </div>
    </div>
  );
};
