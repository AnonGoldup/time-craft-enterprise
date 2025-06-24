
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Manager Mode Alert */}
          {showManagerAlert && (
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Info className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">Manager Entry Mode</div>
                      <div className="text-sm text-blue-700">
                        You are entering time on behalf of team members. Entries will be marked as "Manager Entry by {user?.employeeId}"
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleToggleManagerMode}
                    className="bg-blue-600 hover:bg-blue-700"
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
