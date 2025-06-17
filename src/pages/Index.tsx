
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, TrendingUp, Plus, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimeEntryTypeSelector from '@/components/TimeEntry/TimeEntryTypeSelector';
import EnhancedTimeEntryForm from '@/components/EnhancedTimeEntryForm';
import TimeEntryForm from '@/components/TimeEntryForm';

const Index = () => {
  const [timeEntryType, setTimeEntryType] = useState<'standard' | 'time-in-out' | 'enhanced'>('enhanced');

  const quickStats = [
    {
      title: "Hours This Week",
      value: "40.5",
      description: "2.5 hours overtime",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: "8",
      description: "3 due this week",
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Team Members",
      value: "24",
      description: "All present today",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Productivity",
      value: "94%",
      description: "+5% from last week",
      icon: TrendingUp,
      color: "text-orange-600"
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

  const renderTimeEntryForm = () => {
    switch (timeEntryType) {
      case 'enhanced':
        return <EnhancedTimeEntryForm />;
      case 'standard':
        return <TimeEntryForm />;
      case 'time-in-out':
        return (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Time In/Out Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400">This feature is currently under development.</p>
          </div>
        );
      default:
        return <EnhancedTimeEntryForm />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your overview for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Clock In
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-slate-700 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Time Entry Section */}
      <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Time Entry</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Track your time and manage your work hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TimeEntryTypeSelector
            selectedType={timeEntryType}
            onTypeChange={setTimeEntryType}
          />
          {renderTimeEntryForm()}
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900 dark:text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your latest time entries and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{activity.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.time}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.duration}</p>
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
        <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
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
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/time-entry/time-in-out">
                  <Clock className="h-4 w-4 mr-2" />
                  Time In/Out
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
      <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Weekly Summary</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your time distribution for this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">40.5h</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">95%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Efficiency</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
