
import React, { Suspense } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingState } from '@/components/ui/loading';
import { useLocation } from 'react-router-dom';

interface AppLayoutProps {
  children: React.ReactNode;
}

// Route mapping for breadcrumb generation
const routeLabels: Record<string, string> = {
  '/': 'Dashboard',
  '/log': 'Time Log',
  '/time-entry': 'Time Entry',
  '/time-entry/standard': 'Standard Hours',
  '/time-entry/time-in-out': 'Time In/Out',
  '/manager-approval': 'Manager Approval',
  '/daily-reporting': 'Daily Reporting',
  '/reports': 'Reports',
  '/reports/hours-breakdown': 'Hours Breakdown',
  '/team': 'Team Management',
  '/projects': 'Projects',
  '/calendar': 'Calendar',
  '/documents': 'Documents',
  '/settings': 'Settings',
  '/company-settings': 'Company Settings',
  '/export-payroll': 'Export Payroll',
  '/settings/company-setup': 'Company Setup',
  '/settings/add-division': 'Add Division',
  '/settings/add-occupancy-type': 'Add Occupancy Type',
  '/settings/add-project': 'Add Project',
  '/settings/add-system': 'Add System',
  '/settings/add-phase': 'Add Phase',
  '/settings/add-user': 'Add User',
  '/settings/user-log': 'User Log',
  '/settings/users-logged-on': 'Users Logged On',
  '/settings/add-employee': 'Add Employee',
  '/settings/employee-log': 'Employee Log'
};

const getBreadcrumbItems = (pathname: string) => {
  // Handle root path
  if (pathname === '/') {
    return [{
      label: 'Dashboard',
      current: true
    }];
  }

  const items = [];
  const pathSegments = pathname.split('/').filter(Boolean);
  
  // Build cumulative paths
  for (let i = 0; i < pathSegments.length; i++) {
    const currentPath = '/' + pathSegments.slice(0, i + 1).join('/');
    const isLast = i === pathSegments.length - 1;
    
    // Get label from route mapping or convert path segment
    const label = routeLabels[currentPath] || 
      pathSegments[i].split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');

    // Only add valid routes that exist in our mapping
    if (routeLabels[currentPath] || isLast) {
      items.push({
        label,
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    }
  }

  return items;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);
  
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background theme-unity">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <TopBar />
            <main className="flex-1 p-6 bg-background">
              <div className="max-w-7xl mx-auto space-y-4">
                <Breadcrumb items={breadcrumbItems} className="mb-6" />
                <Suspense fallback={<LoadingState message="Loading page..." />}>
                  <ErrorBoundary>
                    <div className="unity-fade-in">
                      {children}
                    </div>
                  </ErrorBoundary>
                </Suspense>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
};
