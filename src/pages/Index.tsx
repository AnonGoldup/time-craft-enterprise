import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, TrendingUp, Calendar, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const quickStats = [
    {
      title: "Hours This Week",
      value: "40.5",
      description: "2.5 hours overtime",
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Active Projects",
      value: "8",
      description: "3 due this week",
      icon: FileText,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Team Members",
      value: "24",
      description: "All present today",
      icon: Users,
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Productivity",
      value: "94%",
      description: "+5% from last week",
      icon: TrendingUp,
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Clock in",
      project: "Office Building Construction",
      time: "8:00 AM",
      duration: "8h 30m"
    },
    {
      id: 2,
      action: "Break",
      project: "Office Building Construction",
      time: "12:00 PM",
      duration: "30m"
    },
    {
      id: 3,
      action: "Task completed",
      project: "Residential Complex",
      time: "2:30 PM",
      duration: "2h 15m"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your overview for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your latest time entries and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{activity.time}</p>
                    <p className="text-xs text-muted-foreground">{activity.duration}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/time-entry/standard">
                  <Clock className="h-4 w-4 mr-2" />
                  Standard Hours
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                <Link to="/time-entry/time-in-out">
                  <Clock className="h-4 w-4 mr-2" />
                  Time In/Out
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/log">
                  <History className="h-4 w-4 mr-2" />
                  View Time Log
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Submit Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                View Team
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Weekly Summary</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your time distribution for this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">40.5h</p>
              <p className="text-sm text-muted-foreground">Total Hours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">95%</p>
              <p className="text-sm text-muted-foreground">Efficiency</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
