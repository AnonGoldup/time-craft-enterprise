
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { User, Building2, Mail, Calendar, Badge, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ open, onOpenChange }) => {
  const { user } = useAuth();

  // Mock additional user data - in a real app this would come from an API
  const userProfile = {
    fullName: user?.fullName || 'John Doe',
    dateOfBirth: '1985-03-15',
    employeeId: user?.employeeId || 'JD001',
    jobTitle: 'Senior Electrician',
    company: 'AltaPro Electric',
    position: 'Senior Electrician',
    type: 'Full Time',
    email: user?.email || 'john.doe@company.com',
    otherEmail: 'john.doe.personal@gmail.com'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            Profile Information
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Full Name</label>
                  <p className="text-slate-900 dark:text-white font-medium">{userProfile.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Date of Birth</label>
                  <p className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    {new Date(userProfile.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Employee ID</label>
                  <p className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                    <Badge className="h-4 w-4 text-slate-500" />
                    {userProfile.employeeId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Job Title</label>
                  <p className="text-slate-900 dark:text-white font-medium">{userProfile.jobTitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Information */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Employment Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Company</label>
                  <p className="text-slate-900 dark:text-white font-medium">{userProfile.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Position</label>
                  <p className="text-slate-900 dark:text-white font-medium">{userProfile.position}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Type</label>
                  <p className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-500" />
                    {userProfile.type}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email Address</label>
                  <p className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    {userProfile.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Other Email Address</label>
                  <p className="text-slate-900 dark:text-white font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4 text-slate-500" />
                    {userProfile.otherEmail}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
