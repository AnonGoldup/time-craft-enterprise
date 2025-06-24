
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

  const getCurrentWeek = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${endOfWeek.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Title */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-foreground">AltaPro Timesheet</h1>
              </div>
              <div className="hidden md:block w-px h-6 bg-border"></div>
              <div className="hidden md:block text-sm text-muted-foreground">
                Week: {getCurrentWeek()}
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="w-5 h-5" />
              </Button>

              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-foreground">{user?.fullName}</div>
                  <div className="text-xs text-muted-foreground">{user?.employeeID}</div>
                </div>
                <AvatarInitials name={user?.fullName || 'User'} />
              </div>

              <div className="w-px h-6 bg-border"></div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-1">AltaPro Timesheet Entry</h2>
                <p className="text-slate-300 text-sm">Week: {getCurrentWeek()}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {user?.fullName}
                </Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                  {user?.employeeID}
                </Badge>
              </div>
            </div>
          </div>

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
                        You are entering time on behalf of team members. Entries will be marked as "Manager Entry by {user?.employeeID}"
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
