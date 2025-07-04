
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Bell, User, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileModal } from '@/components/Profile/ProfileModal';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  return (
    <>
      <div className="bg-card border-b border-border px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/87cab972-8ea0-4cf1-b931-cb547406f0ee.png" 
                alt="AltaTimesheet Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            {!isMobile && <h1 className="text-xl font-bold text-foreground">AltaTimesheet</h1>}
          </div>

          {/* Search Bar - Hidden on mobile */}
          {!isMobile && (
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects, employees..."
                  className="pl-10 bg-muted/50 border-input text-foreground placeholder-muted-foreground focus:border-ring"
                />
              </div>
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!isMobile && (
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Bell className="h-5 w-5" />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:bg-accent p-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  {!isMobile && <span className="hidden sm:block">{user?.fullName}</span>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border text-popover-foreground">
                <DropdownMenuItem onClick={handleProfileClick} className="hover:bg-accent hover:text-accent-foreground">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent hover:text-accent-foreground">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={logout} className="hover:bg-destructive/10 text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />
    </>
  );
};
