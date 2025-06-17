
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

const getBreadcrumbItems = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean);
  const items = [];
  
  if (paths.length === 0) {
    items.push({
      label: 'Dashboard',
      current: true
    });
  } else {
    paths.forEach((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const isLast = index === paths.length - 1;

      // Convert path to readable label
      const label = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      items.push({
        label,
        href: isLast ? undefined : href,
        current: isLast
      });
    });
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
