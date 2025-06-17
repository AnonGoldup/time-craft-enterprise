
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileText, Search, Download } from 'lucide-react';

const UserLog = () => {
  const logEntries = [
    { id: 1, user: 'John Smith', action: 'Login', timestamp: '2024-01-15 08:30:00', ip: '192.168.1.100' },
    { id: 2, user: 'Jane Doe', action: 'Updated Profile', timestamp: '2024-01-15 09:15:00', ip: '192.168.1.101' },
    { id: 3, user: 'Mike Johnson', action: 'Logout', timestamp: '2024-01-15 10:00:00', ip: '192.168.1.102' },
    { id: 4, user: 'Sarah Wilson', action: 'Password Change', timestamp: '2024-01-15 11:30:00', ip: '192.168.1.103' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Log</h1>
          <p className="text-gray-600 dark:text-gray-400">View user activity and audit trails</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Activity Log</CardTitle>
          <CardDescription>Monitor and track user actions in the system</CardDescription>
          <div className="flex gap-3 pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-10" placeholder="Search user activities..." />
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
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Action</th>
                  <th className="text-left py-3 px-4">Timestamp</th>
                  <th className="text-left py-3 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logEntries.map((entry) => (
                  <tr key={entry.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 font-medium">{entry.user}</td>
                    <td className="py-3 px-4">{entry.action}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{entry.timestamp}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{entry.ip}</td>
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

export default UserLog;
