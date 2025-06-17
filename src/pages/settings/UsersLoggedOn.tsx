
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, RefreshCw } from 'lucide-react';

const UsersLoggedOn = () => {
  const activeUsers = [
    { id: 1, name: 'John Smith', role: 'Manager', department: 'Construction', loginTime: '08:30:00', status: 'Active' },
    { id: 2, name: 'Jane Doe', role: 'Supervisor', department: 'Engineering', loginTime: '09:15:00', status: 'Active' },
    { id: 3, name: 'Mike Johnson', role: 'Foreman', department: 'Construction', loginTime: '07:45:00', status: 'Idle' },
    { id: 4, name: 'Sarah Wilson', role: 'Employee', department: 'Administration', loginTime: '08:00:00', status: 'Active' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Idle': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users Logged On</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor currently active users in the system</p>
          </div>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{activeUsers.filter(u => u.status === 'Active').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{activeUsers.filter(u => u.status === 'Idle').length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Idle Users</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{activeUsers.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Online</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Currently Logged In Users</CardTitle>
          <CardDescription>Real-time view of active system users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Login Time</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 font-medium">{user.name}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">{user.department}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{user.loginTime}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
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

export default UsersLoggedOn;
