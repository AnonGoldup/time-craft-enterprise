
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Timer, Building } from 'lucide-react';

interface OverviewCardsProps {
  pendingSubmissions: number;
  totalHours: number;
  activeProjects: number;
}

export const OverviewCards: React.FC<OverviewCardsProps> = ({
  pendingSubmissions,
  totalHours,
  activeProjects
}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Pending Reviews</p>
              <p className="text-lg font-bold text-yellow-600">{pendingSubmissions}</p>
            </div>
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Total Hours</p>
              <p className="text-lg font-bold text-blue-600">{totalHours}</p>
            </div>
            <Timer className="w-5 h-5 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600">Active Projects</p>
              <p className="text-lg font-bold text-purple-600">{activeProjects}</p>
            </div>
            <Building className="w-5 h-5 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
