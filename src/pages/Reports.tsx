
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, FileText, Download, Calendar, Clock, Users, TrendingUp, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Reports = () => {
  const reportCategories = [
    {
      title: "Time Reports",
      description: "Employee time tracking and analysis",
      reports: [
        { name: "Hours Breakdown", path: "/reports/hours-breakdown", icon: Clock, status: "Available" },
        { name: "Weekly Summary", path: "/reports/weekly-summary", icon: Calendar, status: "Available" },
        { name: "Overtime Analysis", path: "/reports/overtime", icon: TrendingUp, status: "Available" }
      ]
    },
    {
      title: "Project Reports", 
      description: "Project progress and resource allocation",
      reports: [
        { name: "Project Progress", path: "/reports/project-progress", icon: BarChart3, status: "Available" },
        { name: "Resource Allocation", path: "/reports/resources", icon: Users, status: "Available" },
        { name: "Budget Analysis", path: "/reports/budget", icon: TrendingUp, status: "Coming Soon" }
      ]
    },
    {
      title: "Team Reports",
      description: "Team performance and productivity metrics", 
      reports: [
        { name: "Team Performance", path: "/reports/team-performance", icon: Users, status: "Available" },
        { name: "Productivity Trends", path: "/reports/productivity", icon: TrendingUp, status: "Available" },
        { name: "Attendance Summary", path: "/reports/attendance", icon: Calendar, status: "Available" }
      ]
    }
  ];

  const quickStats = [
    { label: "Total Reports", value: "24", trend: "+3 this month" },
    { label: "Last Generated", value: "2 hours ago", trend: "Hours Breakdown" },
    { label: "Most Popular", value: "Weekly Summary", trend: "156 downloads" },
    { label: "Scheduled Reports", value: "8", trend: "3 running today" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Coming Soon': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Generate and analyze business reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Compact Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-sm transition-shadow border-border">
            <CardContent className="p-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{stat.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compact Report Categories */}
      <div className="space-y-4">
        {reportCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{category.title}</CardTitle>
              <CardDescription className="text-xs">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {category.reports.map((report, reportIndex) => (
                  <div key={reportIndex} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <report.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground">{report.name}</p>
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {report.status === 'Available' ? (
                        <>
                          <Button asChild variant="outline" size="sm" className="h-8">
                            <Link to={report.path}>
                              <FileText className="h-3 w-3" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            <Download className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm" disabled className="h-8">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
