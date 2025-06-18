
import { UserRole } from '@/contexts/AuthContext';
import type { RouteConfig } from './types';

// Settings pages
import Settings from '@/pages/Settings';
import CompanySetup from '@/pages/settings/CompanySetup';
import AddDivision from '@/pages/settings/AddDivision';
import AddOccupancyType from '@/pages/settings/AddOccupancyType';
import AddProject from '@/pages/settings/AddProject';
import AddSystem from '@/pages/settings/AddSystem';
import AddPhase from '@/pages/settings/AddPhase';
import AddUser from '@/pages/settings/AddUser';
import UserLog from '@/pages/settings/UserLog';
import UsersLoggedOn from '@/pages/settings/UsersLoggedOn';
import AddEmployee from '@/pages/settings/AddEmployee';
import EmployeeLog from '@/pages/settings/EmployeeLog';

export const settingsRoutes: RouteConfig[] = [
  {
    path: '/settings',
    component: Settings,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/company-setup',
    component: CompanySetup,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-division',
    component: AddDivision,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-occupancy-type',
    component: AddOccupancyType,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-project',
    component: AddProject,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-system',
    component: AddSystem,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-phase',
    component: AddPhase,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-user',
    component: AddUser,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/user-log',
    component: UserLog,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/users-logged-on',
    component: UsersLoggedOn,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/add-employee',
    component: AddEmployee,
    requiredRoles: [UserRole.ADMIN]
  },
  {
    path: '/settings/employee-log',
    component: EmployeeLog,
    requiredRoles: [UserRole.ADMIN]
  }
];
