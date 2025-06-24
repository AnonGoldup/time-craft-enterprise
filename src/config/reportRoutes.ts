
import { UserRole } from '@/contexts/AuthContext';
import type { RouteConfig } from './types';

// Report pages
import HoursBreakdown from '@/pages/reports/HoursBreakdown';

export const reportRoutes: RouteConfig[] = [
  {
    path: '/reports/hours-breakdown',
    component: HoursBreakdown,
    requiredRoles: [UserRole.ADMIN]
  }
];
