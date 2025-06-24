
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { TopBar } from './TopBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background theme-unity">
        <AppSidebar />
        <SidebarInset>
          <TopBar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
            <div className="max-w-7xl mx-auto">
              <div className="unity-fade-in space-y-4 sm:space-y-6 lg:space-y-8">
                {children}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
