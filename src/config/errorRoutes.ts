
import type { RouteConfig } from './types';

// Error pages
import NotFound from '@/pages/NotFound';

export const catchAllRoute: RouteConfig = {
  path: '*',
  component: NotFound
};
