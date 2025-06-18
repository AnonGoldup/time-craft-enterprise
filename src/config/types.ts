
import React from 'react';
import { UserRole } from '@/contexts/AuthContext';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  requiredRoles?: UserRole[];
}
