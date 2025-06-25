
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { formatCurrency, getEfficiencyColor } from './utils';

interface ProjectMetricsCardProps {
  project: {
    code: string;
    name: string;
    totalHours: number;
    budgetHours: number;
    budgetUsed: number;
    efficiency: number;
    daysRemaining: number;
    status: string;
    cost: number;
  };
}

export const ProjectMetricsCard: React.FC<ProjectMetricsCardProps> = ({ project }) => {
  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'text-green-600';
      case 'Behind Schedule':
        return 'text-red-600';
      case 'Ahead of Schedule':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">{project.code}</h3>
            <p className="text-sm text-gray-600 mt-1">{project.name}</p>
          </div>
          <Badge className={getProjectStatusColor(project.status)} variant="outline">
            {project.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Budget Progress</span>
              <span>{project.budgetUsed}%</span>
            </div>
            <Progress value={project.budgetUsed} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Hours Used:</span>
              <span className="ml-2 font-medium">{project.totalHours}h</span>
            </div>
            <div>
              <span className="text-gray-600">Efficiency:</span>
              <span className={`ml-2 font-medium ${getEfficiencyColor(project.efficiency)}`}>
                {project.efficiency}%
              </span>
            </div>
            <div>
              <span className="text-gray-600">Days Left:</span>
              <span className="ml-2 font-medium">{project.daysRemaining}</span>
            </div>
            <div>
              <span className="text-gray-600">Cost:</span>
              <span className="ml-2 font-medium">{formatCurrency(project.cost)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
