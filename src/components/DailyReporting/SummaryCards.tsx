
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Clock } from 'lucide-react';
import { DailyReport } from './types';

interface SummaryCardsProps {
  reports: DailyReport[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ reports }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-3xl font-bold">{reports.length}</div>
          <p className="text-sm text-muted-foreground">
            +2 from last week
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-3xl font-bold">
            {Math.max(...reports.map(r => r.totalWorkers))}
          </div>
          <p className="text-sm text-muted-foreground">
            Peak workers today
          </p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
            <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-3xl font-bold">
            {reports.reduce((sum, r) => sum + r.totalHours, 0).toFixed(1)}
          </div>
          <p className="text-sm text-muted-foreground">
            This period
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
