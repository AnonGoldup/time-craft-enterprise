
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOpenChange }) => {
  const { user } = useAuth();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Profile Information</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header with Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user?.fullName?.split(' ').map(n => n[0]).join('') || 'JD'}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user?.fullName || 'John Doe'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {user?.role === 'employee' ? 'Construction Worker' : 
                 user?.role === 'manager' ? 'Project Manager' :
                 user?.role === 'supervisor' ? 'Site Supervisor' :
                 user?.role === 'foreman' ? 'Foreman' : 'Administrator'}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                    <p className="text-gray-900 dark:text-white">{user?.fullName || 'John Doe'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                    <p className="text-gray-900 dark:text-white">March 5, 1990</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</label>
                    <p className="text-gray-900 dark:text-white">{user?.employeeId || 'EMP001'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Job Title</label>
                    <p className="text-gray-900 dark:text-white">
                      {user?.role === 'employee' ? 'Construction Worker' : 
                       user?.role === 'manager' ? 'Project Manager' :
                       user?.role === 'supervisor' ? 'Site Supervisor' :
                       user?.role === 'foreman' ? 'Foreman' : 'Administrator'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</label>
                    <p className="text-gray-900 dark:text-white">AltaPro Electric</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</label>
                    <p className="text-gray-900 dark:text-white">{user?.department || 'Construction'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</label>
                    <p className="text-gray-900 dark:text-white">Full-Time</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                    <p className="text-gray-900 dark:text-white">{user?.email || 'john.doe@company.com'}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Other Email Address</label>
                    <p className="text-gray-900 dark:text-white">john.personal@email.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
