
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Download } from 'lucide-react';

const EmployeeLog = () => {
  const logEntries = [
    { id: 1, employee: 'John Smith', action: 'Clock In', timestamp: '2024-01-15 08:00:00', project: 'Office Building A', status: 'Success' },
    { id: 2, employee: 'Jane Doe', action: 'Break Start', timestamp: '2024-01-15 10:15:00', project: 'Warehouse B', status: 'Success' },
    { id: 3, employee: 'Mike Johnson', action: 'Clock Out', timestamp: '2024-01-15 17:00:00', project: 'Residential Complex', status: 'Success' },
    { id: 4, employee: 'Sarah Wilson', action: 'Time Correction', timestamp: '2024-01-15 11:30:00', project: 'Commercial Plaza', status: 'Pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-slate-600 dark:text-slate-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employee Log</h1>
          <p className="text-gray-600 dark:text-gray-400">Track employee activity and time entries</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Activity Log</CardTitle>
          <CardDescription>Monitor employee time tracking and project activities</CardDescription>
          <div className="flex gap-3 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-10" placeholder="Search employee activities..." />
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">Project</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {logEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 font-medium">{entry.employee}</td>
                    <td className="py-3 px-4">{entry.action}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{entry.timestamp}</td>
                    <td className="py-3 px-4">{entry.project}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(entry.status)}>
                        {entry.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeLog;
