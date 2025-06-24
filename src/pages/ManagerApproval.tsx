
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckSquare, Clock, Filter, Search, Check, X, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ManagerApproval = () => {
  const [filter, setFilter] = useState('pending');

  const pendingApprovals = [
    {
      id: 1,
      employee: "John Doe",
      date: "2024-01-15",
      hours: 8.5,
      project: "Office Complex - Phase 2",
      costCode: "Electrical Installation",
      status: "Pending",
      overtime: 0.5,
      submitted: "2 hours ago"
    },
    {
      id: 2,
      employee: "Jane Smith",
      date: "2024-01-15", 
      hours: 7.0,
      project: "Residential Development",
      costCode: "Panel Wiring",
      status: "Pending",
      overtime: 0,
      submitted: "3 hours ago"
    },
    {
      id: 3,
      employee: "Mike Johnson",
      date: "2024-01-14",
      hours: 9.0,
      project: "Commercial Building",
      costCode: "Final Inspection",
      status: "Pending",
      overtime: 1.0,
      submitted: "1 day ago"
    }
  ];

  const summaryStats = [
    { label: "Pending", value: "12", color: "text-orange-600" },
    { label: "Approved Today", value: "8", color: "text-green-600" },
    { label: "Total Hours", value: "94.5", color: "text-blue-600" },
    { label: "Overtime Hours", value: "6.5", color: "text-purple-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Manager Approval</h1>
          <p className="text-sm text-muted-foreground">Review and approve timesheet entries</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
            <CheckSquare className="h-4 w-4 mr-2" />
            Approve All
          </Button>
        </div>
      </div>

      {/* Compact Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-sm transition-shadow border-border">
            <CardContent className="p-3 text-center">
              <div className="space-y-1">
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compact Search */}
      <Card>
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search entries..."
              className="pl-10 h-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Compact Approval List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Pending Approvals</CardTitle>
          <CardDescription className="text-xs">Review timesheet entries requiring approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {pendingApprovals.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs font-medium">
                      {entry.employee.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{entry.employee}</p>
                      <Badge className={`text-xs ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <span>{entry.date}</span>
                      <span>{entry.hours}h {entry.overtime > 0 && `(+${entry.overtime}h OT)`}</span>
                      <span className="truncate">{entry.project}</span>
                      <span className="text-xs text-muted-foreground">{entry.submitted}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{entry.costCode}</p>
                  </div>
                </div>
                <div className="flex gap-1 ml-3">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-green-600 hover:text-green-700">
                    <Check className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                    <X className="h-3 w-3" />
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

export default ManagerApproval;
