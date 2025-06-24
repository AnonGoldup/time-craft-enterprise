
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Clock, Plus, CheckSquare } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const recentActivity = [
    {
      id: 1,
      action: "Time entry submitted",
      details: "Office Complex - 8.0 hours", 
      time: "2 hours ago",
      status: "pending",
      icon: Clock
    },
    {
      id: 2,
      action: "Project assignment",
      details: "New commercial project added",
      time: "Yesterday",
      status: "new", 
      icon: Plus
    },
    {
      id: 3,
      action: "Timesheet approved",
      details: "Week ending 12/15 - 40 hours",
      time: "2 days ago",
      status: "approved",
      icon: CheckSquare
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'in-progress': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'scheduled': return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
      case 'new': return 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <History className="h-4 w-4" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <activity.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
