
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Building, 
  Clock, 
  AlertTriangle, 
  RefreshCw, 
  Settings,
  BarChart3,
  Download,
  Users,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

// Import the new focused components
import { SystemStatusCards } from '@/components/ExportPayroll/SystemStatusCards';
import { ProjectGrid } from '@/components/ExportPayroll/ProjectGrid';
import { ExportConfiguration, EXPORT_FORMATS, type ExportFormat } from '@/components/ExportPayroll/ExportConfiguration';
import { LateSubmissionsCard } from '@/components/ExportPayroll/LateSubmissionsCard';
import { EmployeesSummary } from '@/components/ExportPayroll/EmployeesSummary';
import { AnalyticsSection } from '@/components/ExportPayroll/AnalyticsSection';

// Types for better type safety
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

interface ProjectData {
  readonly code: string;
  readonly name: string;
  readonly employees: number;
  readonly approved: number;
  readonly pending: number;
  readonly rejected: number;
  readonly hours: number;
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

interface LateSubmission {
  readonly id: string;
  readonly name: string;
  readonly daysLate: number;
}

interface SystemAlert {
  readonly type: 'warning' | 'info' | 'error';
  readonly message: string;
}

// Mock data with proper typing
const systemStatus: SystemStatus = {
  sql: {
    connected: true,
    latency: 23,
    server: '192.168.1.10\\SQLEXPRESS',
    database: 'TimesheetDB',
    activeConnections: 4,
    maxConnections: 10
  },
  sage: {
    connected: true,
    latency: 156,
    apiVersion: '2.3.1',
    rateLimit: { used: 23, limit: 100 }
  }
};

const projectData: readonly ProjectData[] = [
  { code: '21-0066', name: 'Edmonton EXPO SOLAR IPD', employees: 24, approved: 24, pending: 0, rejected: 0, hours: 968 },
  { code: '22-0006', name: 'AltaPro Service Department', employees: 18, approved: 15, pending: 3, rejected: 0, hours: 704 },
  { code: '24-0052', name: 'Grant MacEwan School', employees: 32, approved: 28, pending: 3, rejected: 1, hours: 1328 },
  { code: '21-0029', name: 'Edmonton EXPO IPD', employees: 15, approved: 15, pending: 0, rejected: 0, hours: 600 },
  { code: '23-0045', name: 'Calgary Tower Retrofit', employees: 22, approved: 18, pending: 4, rejected: 0, hours: 872 },
  { code: '25-0012', name: 'Red Deer Hospital Wing', employees: 45, approved: 45, pending: 0, rejected: 0, hours: 1920 },
  { code: '24-0078', name: 'Lethbridge Solar Farm', employees: 28, approved: 22, pending: 5, rejected: 1, hours: 1096 },
  { code: '22-0089', name: 'Fort Mac Emergency', employees: 12, approved: 8, pending: 4, rejected: 0, hours: 528 }
] as const;

const weeklyStats: WeeklyStats = {
  totalEmployees: 160,
  submitted: 145,
  pending: 12,
  notSubmitted: 3,
  regularHours: 5832.5,
  overtimeHours: 423.25,
  totalEntries: 1205,
  estimatedPayroll: 287543.50
};

const lateSubmissions: readonly LateSubmission[] = [
  { id: 'JSMITH', name: 'John Smith', daysLate: 1 },
  { id: 'MJONES', name: 'Mary Jones', daysLate: 2 },
  { id: 'BWILSON', name: 'Bob Wilson', daysLate: 4 }
] as const;

export default function AltaProTimesheetDashboard() {
  const { toast } = useToast();
  
  // State with proper typing
  const [selectedWeek, setSelectedWeek] = useState<string>('2025-06-21');
  const [exportFormat, setExportFormat] = useState<ExportFormat>(EXPORT_FORMATS.SAGE300);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([]);

  // Update time every second with cleanup
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate system alerts
  useEffect(() => {
    const alerts: SystemAlert[] = [];
    
    if (lateSubmissions.length > 0) {
      alerts.push({
        type: 'warning',
        message: `${lateSubmissions.length} late submissions require attention`
      });
    }
    
    const pendingProjects = projectData.filter(p => p.pending > 0).length;
    if (pendingProjects > 0) {
      alerts.push({
        type: 'info',
        message: `${pendingProjects} projects have pending approvals`
      });
    }
    
    setSystemAlerts(alerts);
  }, []);

  // Memoized calculations
  const submissionRate = useMemo(() => {
    return ((weeklyStats.submitted / weeklyStats.totalEmployees) * 100).toFixed(1);
  }, []);

  // Event handlers
  const handleExport = useCallback(async () => {
    try {
      setIsExporting(true);
      setExportProgress(0);

      // Simulate export progress
      const interval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsExporting(false);
            toast({
              title: "Export Complete",
              description: `Successfully exported ${weeklyStats.totalEntries} timesheet entries to ${exportFormat.toUpperCase()}.`,
            });
            return 100;
          }
          return prev + 10;
        });
      }, 300);
    } catch (error) {
      setIsExporting(false);
      setExportProgress(0);
      toast({
        title: "Export Failed",
        description: "An error occurred during export. Please try again.",
        variant: "destructive",
      });
    }
  }, [exportFormat, toast]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated successfully.",
      });
    }, 1500);
  }, [toast]);

  const handleProjectSelect = useCallback((project: ProjectData) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
              <Building className="w-8 h-8 mr-3 text-blue-600" />
              AltaPro Timesheet System
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Enterprise Timesheet Management & Payroll Export Center
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <time dateTime={currentTime.toISOString()}>
                {currentTime.toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              disabled={refreshing}
              aria-label="Refresh dashboard data"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" aria-label="Open settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </header>

        {/* System Alerts */}
        {systemAlerts.length > 0 && (
          <section aria-labelledby="alerts-heading">
            <h2 id="alerts-heading" className="sr-only">System Alerts</h2>
            <div className="space-y-2">
              {systemAlerts.map((alert, index) => (
                <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          </section>
        )}

        {/* System Status Cards */}
        <section aria-labelledby="status-heading">
          <h2 id="status-heading" className="sr-only">System Status</h2>
          <SystemStatusCards 
            systemStatus={systemStatus}
            weeklyStats={weeklyStats}
            submissionRate={submissionRate}
          />
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects" className="flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Employees
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Project Approval Status</h2>
                  <p className="text-gray-600">Track approval progress across all active projects</p>
                </div>
                <div className="text-lg px-3 py-1 bg-gray-100 rounded">
                  {projectData.length} Projects
                </div>
              </div>
              <ProjectGrid 
                projectData={projectData}
                onProjectSelect={handleProjectSelect}
              />
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <div className="space-y-6">
              <ExportConfiguration
                selectedWeek={selectedWeek}
                exportFormat={exportFormat}
                isExporting={isExporting}
                exportProgress={exportProgress}
                weeklyStats={weeklyStats}
                onWeekChange={setSelectedWeek}
                onFormatChange={setExportFormat}
                onExport={handleExport}
              />
              <LateSubmissionsCard lateSubmissions={lateSubmissions} />
            </div>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees">
            <EmployeesSummary weeklyStats={weeklyStats} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AnalyticsSection 
              weeklyStats={weeklyStats}
              projectData={projectData}
            />
          </TabsContent>
        </Tabs>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && handleCloseModal()}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedProject?.code} - {selectedProject?.name}
              </DialogTitle>
              <DialogDescription>
                Detailed project information and approval status
              </DialogDescription>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-lg font-bold">{selectedProject.employees}</div>
                    <div className="text-xs text-gray-600">Total</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">{selectedProject.approved}</div>
                    <div className="text-xs text-gray-600">Approved</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded">
                    <div className="text-lg font-bold text-orange-600">{selectedProject.pending}</div>
                    <div className="text-xs text-gray-600">Pending</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded">
                    <div className="text-lg font-bold text-red-600">{selectedProject.rejected}</div>
                    <div className="text-xs text-gray-600">Rejected</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Project Hours:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {selectedProject.hours.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCloseModal}>
                    Close
                  </Button>
                  <Button>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export Project
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
