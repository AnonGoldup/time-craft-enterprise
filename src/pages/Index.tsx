import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, TrendingUp, Calendar, History, Building2, BarChart3, CheckSquare, Activity, Target, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, hasRole, UserRole } = useAuth();

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
    <div className="space-y-4">
      {/* Compact Welcome Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Link to="/log">
            <Plus className="h-4 w-4 mr-2" />
            Log Time
          </Link>
        </Button>
      </div>

      {/* Compact Quick Stats */}
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

      {/* Main Content Grid - More Compact */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Today's Schedule */}
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

        {/* Compact Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild size="sm" className="w-full justify-start h-9 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <Link to="/log">
                <Clock className="h-4 w-4 mr-2" />
                Clock In/Out
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
              <Link to="/projects">
                <Building2 className="h-4 w-4 mr-2" />
                Projects
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
              <Link to="/daily-reporting">
                <FileText className="h-4 w-4 mr-2" />
                Daily Reports
              </Link>
            </Button>
            
            {hasRole([UserRole.ADMIN]) && (
              <>
                <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
                  <Link to="/manager-approval">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Approvals
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
                  <Link to="/team">
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="sm" className="w-full justify-start h-9">
                  <Link to="/reports">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Reports
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Compact Recent Activity */}
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

      {/* Compact Progress Summary */}
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
    </div>
  );
};

export default Index;
