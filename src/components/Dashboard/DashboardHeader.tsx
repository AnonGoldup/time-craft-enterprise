
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
        <Link to="/timesheet">
          <Plus className="h-4 w-4 mr-2" />
          Timesheet
        </Link>
      </Button>
    </div>
  );
};

export default DashboardHeader;
