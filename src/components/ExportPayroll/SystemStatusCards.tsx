
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Database, Package, Activity, Zap, PieChart } from 'lucide-react';

interface SystemStatus {
  readonly sql: {
    readonly connected: boolean;
    readonly latency: number;
    readonly server: string;
    readonly database: string;
    readonly activeConnections: number;
    readonly maxConnections: number;
  };
  readonly sage: {
    readonly connected: boolean;
    readonly latency: number;
    readonly apiVersion: string;
    readonly rateLimit: {
      readonly used: number;
      readonly limit: number;
    };
  };
}

interface WeeklyStats {
  readonly totalEmployees: number;
  readonly submitted: number;
  readonly pending: number;
  readonly notSubmitted: number;
  readonly regularHours: number;
  readonly overtimeHours: number;
  readonly totalEntries: number;
  readonly estimatedPayroll: number;
}

interface SystemStatusCardsProps {
  systemStatus: SystemStatus;
  weeklyStats: WeeklyStats;
  submissionRate: string;
}

export const SystemStatusCards: React.FC<SystemStatusCardsProps> = ({
  systemStatus,
  weeklyStats,
  submissionRate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Database className="w-5 h-5 mr-2 text-green-600" />
            SQL Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge variant="default" className="bg-green-500">
                <Activity className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Latency:</span>
              <span className="text-sm font-medium">{systemStatus.sql.latency}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Connections:</span>
              <span className="text-sm font-medium">
                {systemStatus.sql.activeConnections}/{systemStatus.sql.maxConnections}
              </span>
            </div>
            <Progress 
              value={(systemStatus.sql.activeConnections / systemStatus.sql.maxConnections) * 100} 
              className="h-2 mt-2"
              aria-label={`Database connection usage: ${systemStatus.sql.activeConnections} of ${systemStatus.sql.maxConnections}`}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Package className="w-5 h-5 mr-2 text-blue-600" />
            SAGE 300 API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <Badge variant="default" className="bg-blue-500">
                <Zap className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version:</span>
              <span className="text-sm font-medium">v{systemStatus.sage.apiVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Rate Limit:</span>
              <span className="text-sm font-medium">
                {systemStatus.sage.rateLimit.used}/{systemStatus.sage.rateLimit.limit}
              </span>
            </div>
            <Progress value={systemStatus.sage.rateLimit.used / systemStatus.sage.rateLimit.limit * 100} className="h-2 mt-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-600" />
            Weekly Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Submitted:</span>
              <span className="text-sm font-medium text-green-600">
                {weeklyStats.submitted}/{weeklyStats.totalEmployees}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completion:</span>
              <span className="text-sm font-medium">{submissionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Hours:</span>
              <span className="text-sm font-medium">
                {(weeklyStats.regularHours + weeklyStats.overtimeHours).toLocaleString()}
              </span>
            </div>
            <Progress value={parseFloat(submissionRate)} className="h-2 mt-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
