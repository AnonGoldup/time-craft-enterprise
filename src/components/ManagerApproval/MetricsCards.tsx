
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, AlertTriangle, TrendingUp, CheckCircle } from 'lucide-react';

interface MetricsCardsProps {
  pendingCount: number;
  overdueCount: number;
  approvalRate: number;
  approvedToday: number;
  totalHours: number;
}

export const MetricsCards: React.FC<MetricsCardsProps> = ({
  pendingCount,
  overdueCount,
  approvalRate,
  approvedToday,
  totalHours
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">PENDING APPROVAL</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{pendingCount}</p>
              <p className="text-blue-600 dark:text-blue-400 text-xs mt-1">{totalHours} hours</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 dark:text-red-300 text-sm font-medium">OVERDUE (&gt;3 DAYS)</p>
              <p className="text-3xl font-bold text-red-900 dark:text-red-100">{overdueCount}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">APPROVAL RATE</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">{approvalRate}%</p>
              <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1 mt-2">
                <div className="bg-green-600 dark:bg-green-400 h-1 rounded-full" style={{ width: `${approvalRate}%` }}></div>
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 dark:text-purple-300 text-sm font-medium">APPROVED TODAY</p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{approvedToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
