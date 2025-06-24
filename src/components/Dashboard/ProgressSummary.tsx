
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

const ProgressSummary: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2 text-base">
          <Target className="h-4 w-4" />
          Today's Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100">8:00 AM</div>
            <div className="text-xs text-blue-700 dark:text-blue-200">Start Time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100">6.5h</div>
            <div className="text-xs text-blue-700 dark:text-blue-200">Hours Logged</div>
            <div className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">81% of target</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100">2</div>
            <div className="text-xs text-blue-700 dark:text-blue-200">Projects Today</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-900 dark:text-blue-100">1.5h</div>
            <div className="text-xs text-blue-700 dark:text-blue-200">Remaining</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-0.5">On track</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;
