
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const TodaysSchedule: React.FC = () => {
  const todaysSchedule = [
    {
      time: "8:00 AM",
      project: "Office Complex - Phase 2",
      task: "Electrical installation",
      status: "in-progress",
      hours: "4.0h"
    },
    {
      time: "1:00 PM", 
      project: "Residential Development",
      task: "Panel wiring",
      status: "scheduled",
      hours: "3.5h"
    },
    {
      time: "5:00 PM",
      project: "Commercial Building", 
      task: "Final inspection",
      status: "scheduled",
      hours: "1.0h"
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
    <Card className="xl:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="h-4 w-4" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {todaysSchedule.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="text-center min-w-[60px]">
                <div className="text-xs font-medium text-foreground">{item.time}</div>
                <div className="text-xs text-muted-foreground">{item.hours}</div>
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{item.project}</p>
                <p className="text-xs text-muted-foreground">{item.task}</p>
              </div>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
              {item.status.replace('-', ' ')}
            </span>
          </div>
        ))}
        <Button asChild variant="outline" size="sm" className="w-full mt-3">
          <Link to="/calendar">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TodaysSchedule;
