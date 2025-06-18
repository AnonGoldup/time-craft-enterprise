
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AppLayout } from '@/components/Layout/AppLayoutEnhanced';
import { mainRoutes, settingsRoutes, reportRoutes, catchAllRoute } from '@/config/routes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main Routes */}
      {mainRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requiredRoles={route.requiredRoles}>
              <AppLayout>
                <route.component />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Settings Routes */}
      {settingsRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requiredRoles={route.requiredRoles}>
              <AppLayout>
                <route.component />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Report Routes */}
      {reportRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute requiredRoles={route.requiredRoles}>
              <AppLayout>
                <route.component />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      ))}

      {/* Catch-all Route */}
      <Route path={catchAllRoute.path} element={<catchAllRoute.component />} />
    </Routes>
  );
};
