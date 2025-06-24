
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Calendar, Building2, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Log = () => {
  const [activeTab, setActiveTab] = useState('today');

  const todayEntries = [
    {
      id: 1,
      project: "Office Complex - Phase 2",
      costCode: "Electrical Installation", 
      hours: 4.0,
      timeIn: "8:00 AM",
      timeOut: "12:00 PM",
      break: 0,
      status: "Approved",
      notes: "Completed main panel installation"
    },
    {
      id: 2,
      project: "Residential Development",
      costCode: "Panel Wiring",
      hours: 3.5,
      timeIn: "1:00 PM", 
      timeOut: "4:30 PM",
      break: 0,
      status: "Pending",
      notes: "Wired units 1-3"
    }
  ];

  const weekSummary = {
    totalHours: 32.5,
    regularHours: 30.0,
    overtimeHours: 2.5,
    projects: 3,
    daysWorked: 4
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Time Log</h1>
          <p className="text-sm text-muted-foreground">Track and manage your time entries</p>
        </div>
        <Button asChild size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Link to="/time-entry">
            <Plus className="h-4 w-4 mr-2" />
            Log Time
          </Link>
        </Button>
      </div>

      {/* Compact Week Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="hover:shadow-sm transition-shadow border-border">
          <CardContent className="p-3 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{weekSummary.totalHours}h</p>
              <p className="text-xs font-medium text-muted-foreground">Total Hours</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-sm transition-shadow border-border">
          <CardContent className="p-3 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{weekSummary.regularHours}h</p>
              <p className="text-xs font-medium text-muted-foreground">Regular</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-sm transition-shadow border-border">
          <CardContent className="p-3 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{weekSummary.overtimeHours}h</p>
              <p className="text-xs font-medium text-muted-foreground">Overtime</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-sm transition-shadow border-border">
          <CardContent className="p-3 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{weekSummary.projects}</p>
              <p className="text-xs font-medium text-muted-foreground">Projects</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-sm transition-shadow border-border">
          <CardContent className="p-3 text-center">
            <div className="space-y-1">
              <p className="text-xl font-bold text-foreground">{weekSummary.daysWorked}</p>
              <p className="text-xs font-medium text-muted-foreground">Days Worked</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compact Time Entries */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Today's Entries</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === 'today' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setActiveTab('today')}
                className="h-8"
              >
                Today
              </Button>
              <Button 
                variant={activeTab === 'week' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveTab('week')}
                className="h-8"
              >
                This Week
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todayEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{entry.project}</p>
                      <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.costCode}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{entry.timeIn} - {entry.timeOut}</span>
                      <span>{entry.hours} hours</span>
                      {entry.notes && <span className="truncate max-w-[200px]">{entry.notes}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 ml-3">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Log;
