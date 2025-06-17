
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ProjectBudgetSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hours Budget */}
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Actual Hrs to Date</span>
                <span className="text-red-600 font-bold">175%</span>
              </div>
              <div className="bg-red-500 text-white text-center py-2 rounded font-bold">
                36.36K hrs
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Budget to Date</div>
                <div className="font-medium">20.73K hrs</div>
              </div>
              <div>
                <div className="text-muted-foreground">Remaining</div>
                <div className="font-medium text-red-600">-15627.21 hrs</div>
              </div>
            </div>
          </div>

          {/* Cost Budget */}
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Actual Costs</span>
                <span className="text-red-600 font-bold">121%</span>
              </div>
              <div className="bg-red-500 text-white text-center py-2 rounded font-bold">
                $4.05M
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Budget to Date</div>
                <div className="font-medium">$3.34M</div>
              </div>
              <div>
                <div className="text-muted-foreground">Remaining</div>
                <div className="font-medium text-red-600">-$715909</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
