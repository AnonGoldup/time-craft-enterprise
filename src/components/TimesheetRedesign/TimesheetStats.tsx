import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Calendar, 
  Briefcase, 
  FileText,
  TrendingUp,
  Target
} from 'lucide-react';

interface TimesheetStatsProps {
  totalHours: number;
  entriesCount: number;
  projectsCount: number;
  selectedDate: string;
}

export const TimesheetStats: React.FC<TimesheetStatsProps> = ({
  totalHours,
  entriesCount,
  projectsCount,
  selectedDate,
}) => {
  const targetHours = 8; // Standard work day
  const progressPercentage = Math.min((totalHours / targetHours) * 100, 100);
  
  const getStatusColor = () => {
    if (totalHours < 6) return 'text-red-500';
    if (totalHours < 8) return 'text-orange-500';
    if (totalHours <= 10) return 'text-green-500';
    return 'text-orange-500'; // Overtime
  };

  const getStatusText = () => {
    if (totalHours < 6) return 'Under Time';
    if (totalHours < 8) return 'Partial Day';
    if (totalHours <= 8) return 'Full Day';
    return 'Overtime';
  };

  const stats = [
    {
      label: 'Total Hours',
      value: totalHours.toFixed(1),
      unit: 'hrs',
      icon: Clock,
      color: getStatusColor(),
      subtitle: getStatusText()
    },
    {
      label: 'Time Entries',
      value: entriesCount.toString(),
      unit: 'entries',
      icon: FileText,
      color: 'text-blue-500',
      subtitle: 'Today'
    },
    {
      label: 'Projects',
      value: projectsCount.toString(),
      unit: 'active',
      icon: Briefcase,
      color: 'text-purple-500',
      subtitle: 'Working on'
    },
    {
      label: 'Progress',
      value: progressPercentage.toFixed(0),
      unit: '%',
      icon: Target,
      color: progressPercentage >= 100 ? 'text-green-500' : 'text-orange-500',
      subtitle: `of ${targetHours}h target`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.subtitle}
                </p>
              </div>
              
              <div className={`p-2 rounded-lg bg-muted/50`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>

            {/* Progress bar for hours */}
            {stat.label === 'Progress' && (
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      progressPercentage >= 100 ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>

          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-muted/20 to-transparent rounded-bl-full" />
        </Card>
      ))}
    </div>
  );
};