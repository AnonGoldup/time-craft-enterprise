
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and analyze your time tracking data.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Time Summary
            </CardTitle>
            <CardDescription>Weekly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5h</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Projects
            </CardTitle>
            <CardDescription>Active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">+2% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
