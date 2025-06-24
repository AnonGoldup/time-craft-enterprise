
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
          <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 bg-background">
            <div className="w-full mx-auto">
              <div className="unity-fade-in space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">
                {children}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
