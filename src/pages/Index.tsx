
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, TrendingUp, Calendar, History, Building2, BarChart3, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user, hasRole, UserRole } = useAuth();

  const quickStats = [
    {
      title: "Hours This Week",
      value: "32.5",
      description: "7.5 hours remaining",
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Active Projects",
      value: "5",
      description: "2 due this week",
      icon: Building2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Pending Approvals",
      value: hasRole([UserRole.MANAGER, UserRole.ADMIN]) ? "12" : "2",
      description: hasRole([UserRole.MANAGER, UserRole.ADMIN]) ? "Team submissions" : "Your submissions",
      icon: CheckSquare,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      title: "This Month",
      value: "142h",
      description: "8h over target",
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Time Entry Submitted",
      project: "Office Complex - Phase 2",
      time: "2 hours ago",
      status: "pending",
      hours: "8.0h"
    },
    {
      id: 2,
      action: "Daily Report Filed",
      project: "Residential Development",
      time: "Yesterday",
      status: "approved",
      hours: "7.5h"
    },
    {
      id: 3,
      action: "Project Updated",
      project: "Commercial Building",
      time: "2 days ago",
      status: "in-progress",
      hours: "6.0h"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'pending': return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      case 'in-progress': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Here's your timesheet overview for today, {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex items-center gap-2">
            <Link to="/calendar">
              <Calendar className="h-4 w-4" />
              Calendar
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-all duration-200 border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest submissions and project updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.project}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.hours}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full mt-6">
              <Link to="/log">
                <History className="h-4 w-4 mr-2" />
                View Full Time Log
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Fast access to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Link to="/log">
                <Clock className="h-4 w-4 mr-3" />
                Time Log Entry
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start h-12">
              <Link to="/projects">
                <Building2 className="h-4 w-4 mr-3" />
                View Projects
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start h-12">
              <Link to="/daily-reporting">
                <FileText className="h-4 w-4 mr-3" />
                Daily Reports
              </Link>
            </Button>
            
            {hasRole([UserRole.MANAGER, UserRole.ADMIN]) && (
              <>
                <Button asChild variant="outline" className="w-full justify-start h-12">
                  <Link to="/manager-approval">
                    <CheckSquare className="h-4 w-4 mr-3" />
                    Approvals
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-start h-12">
                  <Link to="/team">
                    <Users className="h-4 w-4 mr-3" />
                    Team Management
                  </Link>
                </Button>
              </>
            )}
            
            {hasRole([UserRole.ADMIN]) && (
              <Button asChild variant="outline" className="w-full justify-start h-12">
                <Link to="/reports">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Reports & Analytics
                </Link>
              </Button>
            )}
            
            <Button asChild variant="outline" className="w-full justify-start h-12">
              <Link to="/calendar">
                <Calendar className="h-4 w-4 mr-3" />
                View Calendar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-blue-900 dark:text-blue-100">Today's Summary</CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-200">
            Quick overview of your current day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">8:00 AM</div>
              <div className="text-sm text-blue-700 dark:text-blue-200">Start Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">6.5h</div>
              <div className="text-sm text-blue-700 dark:text-blue-200">Hours Logged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">2</div>
              <div className="text-sm text-blue-700 dark:text-blue-200">Active Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
