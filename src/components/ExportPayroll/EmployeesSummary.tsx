
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Clock, XCircle } from 'lucide-react';

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

interface EmployeesSummaryProps {
  weeklyStats: WeeklyStats;
}

export const EmployeesSummary: React.FC<EmployeesSummaryProps> = ({
  weeklyStats
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Management</CardTitle>
        <CardDescription>Monitor employee timesheet submission status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-600">{weeklyStats.submitted}</div>
            <div className="text-sm text-gray-600">Submitted</div>
          </div>
          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-600">{weeklyStats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center p-6 bg-red-50 rounded-lg">
            <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-600">{weeklyStats.notSubmitted}</div>
            <div className="text-sm text-gray-600">Not Submitted</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
