
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            View and analyze your time tracking data.
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border enhanced-card">
          <CardHeader className="bg-primary rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-primary-foreground">
              <BarChart3 className="h-5 w-5" />
              Time Summary
            </CardTitle>
            <CardDescription className="text-primary-foreground/90">Weekly overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">42.5h</div>
            <p className="text-sm text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border enhanced-card">
          <CardHeader className="bg-primary rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-primary-foreground">
              <FileText className="h-5 w-5" />
              Projects
            </CardTitle>
            <CardDescription className="text-primary-foreground/90">Active projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
            <p className="text-sm text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border enhanced-card">
          <CardHeader className="bg-primary rounded-t-xl">
            <CardTitle className="text-primary-foreground">Efficiency</CardTitle>
            <CardDescription className="text-primary-foreground/90">This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">94%</div>
            <p className="text-sm text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
