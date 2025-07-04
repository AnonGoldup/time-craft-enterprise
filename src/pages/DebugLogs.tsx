import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bug, 
  Activity, 
  Users, 
  Database, 
  RefreshCw, 
  Download,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  source: string;
  details?: any;
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  route: string;
  timestamp: string;
  ip: string;
}

interface SystemMetric {
  name: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
}

const DebugLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        level: 'error',
        message: 'Failed to connect to database pool',
        source: 'TimesheetService',
        details: { error: 'Connection timeout', attempts: 3 }
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'warn',
        message: 'User session about to expire',
        source: 'AuthService',
        details: { userId: 'EMP001', remainingTime: '2 minutes' }
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        level: 'info',
        message: 'Timesheet submitted successfully',
        source: 'TimesheetController',
        details: { employeeId: 'EMP001', entryCount: 5 }
      }
    ];

    const mockUserActivity: UserActivity[] = [
      {
        id: '1',
        userId: 'EMP001',
        userName: 'Admin User',
        action: 'LOGIN',
        route: '/login',
        timestamp: new Date().toISOString(),
        ip: '192.168.1.157'
      },
      {
        id: '2',
        userId: 'EMP001',
        userName: 'Admin User',
        action: 'VIEW_PAGE',
        route: '/timesheet',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        ip: '192.168.1.157'
      }
    ];

    const mockSystemMetrics: SystemMetric[] = [
      { name: 'Database Connections', value: '8/20', status: 'healthy', lastUpdated: new Date().toISOString() },
      { name: 'Memory Usage', value: '2.1 GB', status: 'warning', lastUpdated: new Date().toISOString() },
      { name: 'CPU Usage', value: '45%', status: 'healthy', lastUpdated: new Date().toISOString() },
      { name: 'Active Sessions', value: 12, status: 'healthy', lastUpdated: new Date().toISOString() },
      { name: 'Error Rate', value: '0.2%', status: 'healthy', lastUpdated: new Date().toISOString() }
    ];

    setLogs(mockLogs);
    setUserActivity(mockUserActivity);
    setSystemMetrics(mockSystemMetrics);
  }, []);

  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info': return <Info className="h-4 w-4 text-info" />;
      case 'debug': return <Bug className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLogBadgeVariant = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'destructive';
      case 'warn': return 'secondary';
      case 'info': return 'default';
      case 'debug': return 'outline';
    }
  };

  const getMetricStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
    }
  };

  const handleRefresh = () => {
    // In real implementation, this would fetch fresh data
    console.log('Refreshing debug data...');
  };

  const handleExport = () => {
    // In real implementation, this would export logs
    console.log('Exporting logs...');
  };

  return (
    <div className="space-y-6 p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Bug className="h-8 w-8" />
            Debug & Logging
          </h1>
          <p className="text-muted-foreground">System monitoring and debugging tools for administrators</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* System Metrics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {systemMetrics.map((metric) => (
              <div key={metric.name} className="text-center">
                <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.name}</div>
                <div className={`text-xs ${getMetricStatusColor(metric.status)} capitalize`}>
                  {metric.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="logs" className="gap-2">
            <Bug className="h-4 w-4" />
            System Logs
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Users className="h-4 w-4" />
            User Activity
          </TabsTrigger>
          <TabsTrigger value="database" className="gap-2">
            <Database className="h-4 w-4" />
            Database
          </TabsTrigger>
        </TabsList>

        {/* System Logs Tab */}
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getLogIcon(log.level)}
                          <Badge variant={getLogBadgeVariant(log.level)}>
                            {log.level.toUpperCase()}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {log.source}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-foreground">{log.message}</p>
                        {log.details && (
                          <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                            {JSON.stringify(log.details, null, 2)}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {userActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{activity.userName}</span>
                          <Badge variant="outline">{activity.action}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.route} • {activity.ip}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Database Tab */}
        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Connection Status</h3>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-foreground">Connected</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      192.168.1.10\SQLEXPRESS
                    </p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Active Connections</h3>
                    <div className="text-2xl font-bold text-foreground">8/20</div>
                    <p className="text-sm text-muted-foreground">Connection pool usage</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Recent Queries</h3>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted rounded-lg">
                      <code className="text-sm">SELECT * FROM TimesheetEntries WHERE EmployeeID = 'EMP001'</code>
                      <div className="text-xs text-muted-foreground mt-1">Executed 2s ago • 45ms</div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <code className="text-sm">UPDATE Projects SET Status = 'Active' WHERE ProjectID = 1</code>
                      <div className="text-xs text-muted-foreground mt-1">Executed 1m ago • 12ms</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DebugLogs;