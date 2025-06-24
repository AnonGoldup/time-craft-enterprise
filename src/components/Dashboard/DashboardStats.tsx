
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, Building2, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardStats: React.FC = () => {
  const { hasRole, UserRole } = useAuth();

  const quickStats = [
    {
      title: "Today's Hours",
      value: "6.5h",
      description: "1.5h remaining",
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      trend: "+0.5h vs yesterday"
    },
    {
      title: "This Week",
      value: "32.5h",
      description: "7.5h to target",
      icon: Calendar,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      trend: "On track"
    },
    {
      title: "Active Projects",
      value: "3",
      description: "2 due this week",
      icon: Building2,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      trend: "1 new assigned"
    },
    {
      title: hasRole([UserRole.ADMIN]) ? "Team Hours" : "Monthly Total",
      value: hasRole([UserRole.ADMIN]) ? "284h" : "142h",
      description: hasRole([UserRole.ADMIN]) ? "8 team members" : "8h over target",
      icon: hasRole([UserRole.ADMIN]) ? Users : TrendingUp,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      trend: hasRole([UserRole.ADMIN]) ? "+12% vs last week" : "+5.6% vs last month"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
      {quickStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-sm transition-shadow border-border">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {stat.trend}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
