
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Welcome back! Here's your overview for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 h-10 px-4">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
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
                <div className={`p-3 rounded-xl bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="xl:col-span-2 bg-card border-border">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-foreground">Recent Activity</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your latest time entries and activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.project}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.time}</p>
                  <p className="text-xs text-muted-foreground">{activity.duration}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-6 h-10">
              View Last Month's Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl text-foreground">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white h-11">
              <Link to="/time-entry/standard">
                <Clock className="h-4 w-4 mr-3" />
                Standard Hours
              </Link>
            </Button>
            <Button asChild className="w-full justify-start bg-green-600 hover:bg-green-700 text-white h-11">
              <Link to="/time-entry/time-in-out">
                <Clock className="h-4 w-4 mr-3" />
                Time In/Out
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start h-11">
              <Link to="/log">
                <History className="h-4 w-4 mr-3" />
                View Time Log
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start h-11">
              <FileText className="h-4 w-4 mr-3" />
              Submit Report
            </Button>
            <Button variant="outline" className="w-full justify-start h-11">
              <Users className="h-4 w-4 mr-3" />
              View Team
            </Button>
            <Button variant="outline" className="w-full justify-start h-11">
              <Calendar className="h-4 w-4 mr-3" />
              Schedule Meeting
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
