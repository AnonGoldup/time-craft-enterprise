
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const ProjectBudgetSection: React.FC = () => {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-border hover:shadow-md transition-all duration-200">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-foreground font-semibold">Budget</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hours Budget */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Actual Hrs to Date</span>
                <span className="text-destructive font-bold text-lg">175%</span>
              </div>
              <div className="bg-destructive text-destructive-foreground text-center py-3 rounded-lg font-bold text-xl shadow-sm">
                36.36K hrs
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Budget to Date</div>
                <div className="font-semibold text-foreground">20.73K hrs</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Remaining</div>
                <div className="font-semibold text-destructive">-15627.21 hrs</div>
              </div>
            </div>
          </div>

          {/* Cost Budget */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Actual Costs</span>
                <span className="text-destructive font-bold text-lg">121%</span>
              </div>
              <div className="bg-destructive text-destructive-foreground text-center py-3 rounded-lg font-bold text-xl shadow-sm">
                $4.05M
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="text-muted-foreground">Budget to Date</div>
                <div className="font-semibold text-foreground">$3.34M</div>
              </div>
              <div className="space-y-1">
                <div className="text-muted-foreground">Remaining</div>
                <div className="font-semibold text-destructive">-$715909</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
