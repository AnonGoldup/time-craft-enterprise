
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GrandTotalSummaryProps {
  totalST: number;
  totalOT: number;
  totalLost: number;
}

const GrandTotalSummary: React.FC<GrandTotalSummaryProps> = ({
  totalST,
  totalOT,
  totalLost
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grand Total Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalST}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Total ST Hours</div>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{totalOT}</div>
            <div className="text-sm text-orange-600 dark:text-orange-400">Total OT Hours</div>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{totalLost}</div>
            <div className="text-sm text-red-600 dark:text-red-400">Total Lost Hours</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrandTotalSummary;
