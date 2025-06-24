
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, LogOut, Info } from 'lucide-react';
import { AvatarInitials } from '@/components/ui/avatar-initials';
import { useAuth } from '@/contexts/AuthContext';

interface TimesheetLayoutProps {
  children: React.ReactNode;
  showManagerAlert?: boolean;
  onToggleManagerMode?: () => void;
}

export const TimesheetLayout: React.FC<TimesheetLayoutProps> = ({
  children,
  showManagerAlert = false,
  onToggleManagerMode
}) => {
  const { user } = useAuth();
  const [managerModeEnabled, setManagerModeEnabled] = useState(false);
  
  const handleToggleManagerMode = () => {
    setManagerModeEnabled(!managerModeEnabled);
    onToggleManagerMode?.();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="w-full mx-auto px-2 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Manager Mode Alert */}
          {showManagerAlert && (
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <div className="flex items-center space-x-3">
                    <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-blue-900 text-sm sm:text-base">Manager Entry Mode</div>
                      <div className="text-xs sm:text-sm text-blue-700">
                        You are entering time on behalf of team members. Entries will be marked as "Manager Entry by {user?.employeeId}"
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleToggleManagerMode} 
                    className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm" 
                    size="sm"
                  >
                    {managerModeEnabled ? 'Disable Manager Mode' : 'Enable Manager Mode'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {children}
        </div>
      </main>
    </div>
  );
};
