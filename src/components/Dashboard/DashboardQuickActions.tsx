
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Building2, FileText, CheckSquare, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const DashboardQuickActions: React.FC = () => {
  const { hasRole, UserRole } = useAuth();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild size="sm" className="w-full justify-start h-9 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
          <Link to="/log">
            <Clock className="h-4 w-4 mr-2" />
            Clock In/Out
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
          <Link to="/projects">
            <Building2 className="h-4 w-4 mr-2" />
            Projects
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
          <Link to="/daily-reporting">
            <FileText className="h-4 w-4 mr-2" />
            Daily Reports
          </Link>
        </Button>
        
        {hasRole([UserRole.ADMIN]) && (
          <>
            <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
              <Link to="/manager-approval">
                <CheckSquare className="h-4 w-4 mr-2" />
                Approvals
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
              <Link to="/team">
                <Users className="h-4 w-4 mr-2" />
                Team
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
              <Link to="/reports">
                <BarChart3 className="h-4 w-4 mr-2" />
                Reports
              </Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardQuickActions;
