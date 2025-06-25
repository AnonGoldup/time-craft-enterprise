import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Database, Package, Users, Clock, CheckCircle2, AlertTriangle, Activity, XCircle, Download, BarChart3, PieChart, RefreshCw, Settings, Building, DollarSign, Timer, Zap, Eye, Layers, TrendingUp, AlertCircle, FileSpreadsheet, Send } from 'lucide-react';

// Mock data
const systemStatus = {
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
    rateLimit: {
      used: 23,
      limit: 100
    }
  }
};
const projectData = [{
  code: '21-0066',
  name: 'Edmonton EXPO SOLAR IPD',
  employees: 24,
  approved: 24,
  pending: 0,
  rejected: 0,
  hours: 968
}, {
  code: '22-0006',
  name: 'AltaPro Service Department',
  employees: 18,
  approved: 15,
  pending: 3,
  rejected: 0,
  hours: 704
}, {
  code: '24-0052',
  name: 'Grant MacEwan School',
  employees: 32,
  approved: 28,
  pending: 3,
  rejected: 1,
  hours: 1328
}, {
  code: '21-0029',
  name: 'Edmonton EXPO IPD',
  employees: 15,
  approved: 15,
  pending: 0,
  rejected: 0,
  hours: 600
}, {
  code: '23-0045',
  name: 'Calgary Tower Retrofit',
  employees: 22,
  approved: 18,
  pending: 4,
  rejected: 0,
  hours: 872
}, {
  code: '25-0012',
  name: 'Red Deer Hospital Wing',
  employees: 45,
  approved: 45,
  pending: 0,
  rejected: 0,
  hours: 1920
}, {
  code: '24-0078',
  name: 'Lethbridge Solar Farm',
  employees: 28,
  approved: 22,
  pending: 5,
  rejected: 1,
  hours: 1096
}, {
  code: '22-0089',
  name: 'Fort Mac Emergency',
  employees: 12,
  approved: 8,
  pending: 4,
  rejected: 0,
  hours: 528
}];
const weeklyStats = {
  totalEmployees: 160,
  submitted: 145,
  pending: 12,
  notSubmitted: 3,
  regularHours: 5832.5,
  overtimeHours: 423.25,
  totalEntries: 1205,
  estimatedPayroll: 287543.50
};
const lateSubmissions = [{
  id: 'JSMITH',
  name: 'John Smith',
  daysLate: 1
}, {
  id: 'MJONES',
  name: 'Mary Jones',
  daysLate: 2
}, {
  id: 'BWILSON',
  name: 'Bob Wilson',
  daysLate: 4
}];
export default function AltaProTimesheetDashboard() {
  const [selectedWeek, setSelectedWeek] = useState('2025-06-21');
  const [exportFormat, setExportFormat] = useState('sage300');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);
  const [systemAlerts, setSystemAlerts] = useState([]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate system alerts
  useEffect(() => {
    const alerts = [];
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
  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };
  const submissionRate = useMemo(() => {
    return (weeklyStats.submitted / weeklyStats.totalEmployees * 100).toFixed(1);
  }, []);
  const totalHours = useMemo(() => {
    return projectData.reduce((sum, project) => sum + project.hours, 0);
  }, []);
  return <div className="min-h-screen bg-gradient-to-br from-grey-100 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6 bg-gray-100 px-[8px] py-[8px]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center">
              <Building className="w-8 h-8 mr-3 text-blue-600" />
              Export Payroll
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Timesheet Management & Payroll Export Center
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {currentTime.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* System Alerts */}
        {systemAlerts.length > 0 && <div className="space-y-2">
            {systemAlerts.map((alert, index) => <Alert key={index} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>)}
          </div>}

        {/* System Status Cards */}
        <div className="grid grid-cols-3 gap-4">
          {/* SQL Database Status */}
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
                <Progress value={systemStatus.sql.activeConnections / systemStatus.sql.maxConnections * 100} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* SAGE API Status */}
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

          {/* Weekly Summary */}
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
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Project Approval Status</CardTitle>
                    <CardDescription>Track approval progress across all active projects</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {projectData.length} Projects
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {projectData.map(project => {
                  const isFullyApproved = project.pending === 0 && project.rejected === 0;
                  const approvalRate = project.approved / project.employees * 100;
                  return <Card key={project.code} className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${isFullyApproved ? 'border-green-500 bg-green-50' : project.rejected > 0 ? 'border-red-500 bg-red-50' : 'border-orange-500 bg-orange-50'}`} onClick={() => setSelectedProject(project)}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-bold text-sm">{project.code}</h3>
                              <p className="text-xs text-gray-600 line-clamp-2" title={project.name}>
                                {project.name}
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-medium">{approvalRate.toFixed(0)}%</span>
                                {isFullyApproved ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : project.rejected > 0 ? <XCircle className="w-4 h-4 text-red-600" /> : <AlertCircle className="w-4 h-4 text-orange-600" />}
                              </div>
                              
                              <Progress value={approvalRate} className={`h-2 ${isFullyApproved ? 'bg-green-200' : project.rejected > 0 ? 'bg-red-200' : 'bg-orange-200'}`} />
                              
                              <div className="grid grid-cols-3 gap-1 text-xs">
                                <div className="text-center">
                                  <div className="font-medium text-green-600">{project.approved}</div>
                                  <div className="text-gray-500">Approved</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-orange-600">{project.pending}</div>
                                  <div className="text-gray-500">Pending</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium text-red-600">{project.rejected}</div>
                                  <div className="text-gray-500">Rejected</div>
                                </div>
                              </div>
                              
                              <div className="text-center pt-1 border-t">
                                <div className="text-xs text-gray-500">Total Hours</div>
                                <div className="font-bold text-blue-600">{project.hours.toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>;
                })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Configuration</CardTitle>
                    <CardDescription>Configure and execute payroll exports</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Week Ending Date</label>
                        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2025-06-21">June 21, 2025</SelectItem>
                            <SelectItem value="2025-06-14">June 14, 2025</SelectItem>
                            <SelectItem value="2025-06-07">June 7, 2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Export Format</label>
                        <Select value={exportFormat} onValueChange={value => setExportFormat(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sage300">
                              <div className="flex flex-col">
                                <span className="font-medium">SAGE 300 CSV Format</span>
                                <span className="text-xs text-gray-500">Standard payroll import format</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="sage300custom">
                              <div className="flex flex-col">
                                <span className="font-medium">SAGE 300 CSV (Custom)</span>
                                <span className="text-xs text-gray-500">With additional project fields</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="excel">
                              <div className="flex flex-col">
                                <span className="font-medium">Excel Detailed Format</span>
                                <span className="text-xs text-gray-500">Human-readable with all columns</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {/* Format Preview */}
                        <div className="mt-3 p-3 bg-gray-50 rounded border">
                          <div className="text-xs font-medium text-gray-700 mb-2">Format Preview:</div>
                          <div className="text-xs font-mono text-gray-600">
                            {exportFormat === 'sage300' && <div className="space-y-1">
                                <div className="text-green-700 font-medium">SAGE 300 Standard CSV:</div>
                                <div>"EMP001","21-0066","","001-040-043",1,1,8.00,,,06212025</div>
                                <div className="text-gray-500 text-xs mt-1">
                                  Format: "EmployeeID","ProjectCode","Extra","CostCode",UnionID,PayID,Hours,,,MMDDYYYY
                                </div>
                                <div className="text-gray-500 text-xs">
                                  Note: Extra field is blank when "Default" is selected
                                </div>
                              </div>}
                            {exportFormat === 'sage300custom' && <div className="space-y-1">
                                <div className="text-blue-700 font-medium">SAGE 300 Custom CSV:</div>
                                <div>"EMP001","21-0066","","001-040-043",1,1,8.00,"Edmonton EXPO","Direct Labor",06212025</div>
                                <div className="text-gray-500 text-xs mt-1">
                                  Format: "EmployeeID","ProjectCode","Extra","CostCode",UnionID,PayID,Hours,"ProjectName","CostDesc",MMDDYYYY
                                </div>
                                <div className="text-gray-500 text-xs">
                                  Note: Extra field is blank when "Default" is selected
                                </div>
                              </div>}
                            {exportFormat === 'excel' && <div className="space-y-1">
                                <div className="text-purple-700 font-medium">Excel Detailed Format:</div>
                                <div className="grid grid-cols-1 gap-1">
                                  <div>Employee ID | Name | Date | Project | Description | Cost Code | Hours | Type</div>
                                  <div>EMP001 | John Smith | 2025-06-21 | 21-0066 | Edmonton EXPO | 001-040-043 | 8.00 | Regular</div>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">
                                  Full spreadsheet with headers and human-readable format
                                </div>
                                <div className="text-gray-500 text-xs">
                                  Note: Extra column shows "(Default)" when no specific extra is selected
                                </div>
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Export
                      </Button>
                      <Button onClick={handleExport} disabled={isExporting} className="flex-1">
                        {isExporting ? <>
                            <Timer className="w-4 h-4 mr-2 animate-spin" />
                            Exporting...
                          </> : <>
                            <Download className="w-4 h-4 mr-2" />
                            Export to SAGE
                          </>}
                      </Button>
                    </div>
                    
                    {isExporting && <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Processing entries...</span>
                          <span>{exportProgress}%</span>
                        </div>
                        <Progress value={exportProgress} />
                      </div>}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                {/* Export Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Export Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Entries:</span>
                      <span className="font-medium">{weeklyStats.totalEntries.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Regular Hours:</span>
                      <span className="font-medium">{weeklyStats.regularHours.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Overtime Hours:</span>
                      <span className="font-medium">{weeklyStats.overtimeHours.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Estimated Amount:</span>
                        <span className="text-green-600">${weeklyStats.estimatedPayroll.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Late Submissions */}
                {lateSubmissions.length > 0 && <Card className="border-orange-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-600 flex items-center">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Late Submissions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-32">
                        <div className="space-y-2">
                          {lateSubmissions.map(emp => <div key={emp.id} className="p-2 bg-orange-50 rounded border border-orange-200">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{emp.name}</span>
                                <Badge variant="outline" className="text-orange-600">
                                  {emp.daysLate} days late
                                </Badge>
                              </div>
                            </div>)}
                        </div>
                      </ScrollArea>
                      <Button variant="outline" className="w-full mt-3" size="sm">
                        <Send className="w-3 h-3 mr-2" />
                        Send Reminders
                      </Button>
                    </CardContent>
                  </Card>}
              </div>
            </div>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Management</CardTitle>
                <CardDescription>Monitor employee timesheet submission status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-green-600">{weeklyStats.submitted}</div>
                    <div className="text-sm text-gray-600">Submitted</div>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-lg">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-orange-600">{weeklyStats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                    <div className="text-2xl font-bold text-red-600">{weeklyStats.notSubmitted}</div>
                    <div className="text-sm text-gray-600">Not Submitted</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hours Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Regular Hours</span>
                      <span className="font-medium">{weeklyStats.regularHours.toLocaleString()}h</span>
                    </div>
                    <Progress value={93.3} className="h-3" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overtime Hours</span>
                      <span className="font-medium">{weeklyStats.overtimeHours.toLocaleString()}h</span>
                    </div>
                    <Progress value={6.7} className="h-3" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Project Hours Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{totalHours.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Project Hours</div>
                    <div className="mt-4 text-sm">
                      Across {projectData.length} active projects
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Detail Modal */}
        <Dialog open={!!selectedProject} onOpenChange={open => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedProject?.code} - {selectedProject?.name}
              </DialogTitle>
              <DialogDescription>
                Detailed project information and approval status
              </DialogDescription>
            </DialogHeader>
            {selectedProject && <div className="space-y-4">
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
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                  <Button>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export Project
                  </Button>
                </div>
              </div>}
          </DialogContent>
        </Dialog>
      </div>
    </div>;
}