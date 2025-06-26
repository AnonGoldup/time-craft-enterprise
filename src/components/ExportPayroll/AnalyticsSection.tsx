
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WeeklyStats {
  readonly totalEmployees: number;
  readonly submitted: number;
  readonly pending: number;
  readonly notSubmitted: number;
  readonly regularHours: number;
  readonly overtimeHours: number;
  readonly totalEntries: number;
  readonly estimatedPayroll: number;
}

interface ProjectData {
  readonly code: string;
  readonly name: string;
  readonly employees: number;
  readonly approved: number;
  readonly pending: number;
  readonly rejected: number;
  readonly hours: number;
}

interface AnalyticsSectionProps {
  weeklyStats: WeeklyStats;
  projectData: readonly ProjectData[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({
  weeklyStats,
  projectData
}) => {
  const totalHours = projectData.reduce((sum, project) => sum + project.hours, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Hours Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Regular Hours</span>
              <span className="font-medium">{weeklyStats.regularHours.toLocaleString()}h</span>
            </div>
            <Progress value={93.3} className="h-3" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Overtime Hours</span>
              <span className="font-medium">{weeklyStats.overtimeHours.toLocaleString()}h</span>
            </div>
            <Progress value={6.7} className="h-3" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Hours Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{totalHours.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Project Hours</div>
            <div className="mt-4 text-sm">
              Across {projectData.length} active projects
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
