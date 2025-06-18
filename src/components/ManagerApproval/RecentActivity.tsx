
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  return (
    <Card className="bg-card border-border mt-6">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Approval Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-foreground font-medium">Emily Chen (EC004)</span>
            </div>
            <p className="text-muted-foreground text-sm">Approved • 6.0 hours</p>
            <p className="text-muted-foreground text-xs mt-2">Jun 08, 10:15 AM</p>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-foreground font-medium">David Wilson (DW005)</span>
            </div>
            <p className="text-muted-foreground text-sm">Rejected • 10.0 hours</p>
            <p className="text-muted-foreground text-xs mt-2">Jun 08, 9:30 AM</p>
          </div>

          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-foreground font-medium">Lisa Brown (LB006)</span>
            </div>
            <p className="text-muted-foreground text-sm">Approved • 8.0 hours</p>
            <p className="text-muted-foreground text-xs mt-2">Jun 07, 4:45 PM</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
