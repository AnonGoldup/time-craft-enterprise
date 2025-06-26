
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, FileText, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const quickActions = [
    {
      title: 'New Time Entry',
      description: 'Create timesheet entries',
      icon: Clock,
      link: '/time-entry/multi',
      color: 'text-blue-600'
    },
    {
      title: 'Review Timesheets',
      description: 'View and edit your entries',
      icon: Calendar,
      link: '/timesheets/review',
      color: 'text-green-600'
    },
    {
      title: 'Weekly Summary',
      description: 'Submit weekly timesheet',
      icon: FileText,
      link: '/timesheets/summary',
      color: 'text-purple-600'
    },
    {
      title: 'Team Overview',
      description: 'Manager approval view',
      icon: Users,
      link: '/manager/approvals',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Timesheet Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your timesheet overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5</div>
            <p className="text-xs text-muted-foreground">hours logged</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">draft entries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">weeks pending approval</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Hours</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">year to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={action.link}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${action.color}`} />
                    {action.title}
                  </CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full">
                    Go to {action.title} →
                  </Button>
                </CardContent>
              </Link>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest timesheet actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Created 8 hour entry</p>
                <p className="text-sm text-muted-foreground">Project 21-0075 - Today</p>
              </div>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Submitted weekly timesheet</p>
                <p className="text-sm text-muted-foreground">Week ending June 15 - 2 days ago</p>
              </div>
              <Badge>Submitted</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Timesheet approved</p>
                <p className="text-sm text-muted-foreground">Week ending June 8 - 5 days ago</p>
              </div>
              <Badge variant="success">Approved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
