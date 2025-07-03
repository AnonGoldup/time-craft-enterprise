
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, CheckCircle2, RefreshCw, Eye, ChevronDown, ChevronUp, Download,
  FileText, BarChart3, Building, Activity, TrendingUp, AlertTriangle
} from 'lucide-react';

// Import new components
import { TimesheetSubmission, ProjectGroup } from '@/components/ManagerApproval/types';
import { dashboardData } from '@/components/ManagerApproval/dashboardData';
import { OverviewCards } from '@/components/ManagerApproval/OverviewCards';
import { ProjectSelectButton } from '@/components/ManagerApproval/ProjectSelectButton';
import { SubmissionCard } from '@/components/ManagerApproval/SubmissionCard';
import { ProjectMetricsCard } from '@/components/ManagerApproval/ProjectMetricsCard';
import { WeeklyChart } from '@/components/ManagerApproval/WeeklyChart';

export default function AltaProManagerDashboard() {
  const [submissions, setSubmissions] = useState<TimesheetSubmission[]>([...dashboardData.recentSubmissions]);
  const [selectedSubmissions, setSelectedSubmissions] = useState(new Set<number>());
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('approvals');
  const [sortBy, setSortBy] = useState('project');
  const [expandedProjects, setExpandedProjects] = useState(new Set(['21-0066', '24-0052', '22-0006']));

  const handleToggleProject = useCallback((projectCode: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectCode)) {
        newSet.delete(projectCode);
      } else {
        newSet.add(projectCode);
      }
      return newSet;
    });
  }, []);

  const handleSelectSubmission = useCallback((submissionId: number) => {
    setSelectedSubmissions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAllInProject = useCallback((projectCode: string) => {
    const projectSubmissions = groupedSubmissions[projectCode]?.submissions || [];
    const projectSubmissionIds = projectSubmissions.map(sub => sub.id);
    const allSelected = projectSubmissionIds.every(id => selectedSubmissions.has(id));

    setSelectedSubmissions(prev => {
      const newSet = new Set(prev);
      if (allSelected) {
        projectSubmissionIds.forEach(id => newSet.delete(id));
      } else {
        projectSubmissionIds.forEach(id => newSet.add(id));
      }
      return newSet;
    });
  }, [selectedSubmissions]);

  const handleSelectAll = useCallback(() => {
    const pendingIds = submissions.filter(s => s.status === 'Pending').map(s => s.id);
    if (selectedSubmissions.size === pendingIds.length) {
      setSelectedSubmissions(new Set());
    } else {
      setSelectedSubmissions(new Set(pendingIds));
    }
  }, [submissions, selectedSubmissions.size]);

  const handleBulkApprove = useCallback(async () => {
    if (selectedSubmissions.size === 0) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmissions(prev => prev.map(sub => 
      selectedSubmissions.has(sub.id) ? { ...sub, status: 'Approved' as const } : sub
    ));
    setSelectedSubmissions(new Set());
    setIsLoading(false);
  }, [selectedSubmissions]);

  const handleApprove = useCallback(async (submissionId: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, status: 'Approved' as const } : sub
    ));
    setIsLoading(false);
  }, []);

  const handleReject = useCallback(async (submissionId: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, status: 'Rejected' as const } : sub
    ));
    setIsLoading(false);
  }, []);

  const pendingSubmissions = submissions.filter(s => s.status === 'Pending');

  // Group submissions by project
  const groupedSubmissions = useMemo(() => {
    const pending = submissions.filter(s => s.status === 'Pending');
    return pending.reduce((groups: Record<string, ProjectGroup>, submission) => {
      const project = submission.projectCode;
      if (!groups[project]) {
        groups[project] = {
          projectCode: project,
          projectDescription: submission.projectDescription,
          submissions: []
        };
      }
      groups[project].submissions = [...groups[project].submissions, submission];
      return groups;
    }, {});
  }, [submissions]);

  return (
    <div className="p-4 bg-neutral-200">
      <div className="w-full mx-auto space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AltaPro Timesheet Manager</h1>
            <p className="text-sm text-gray-600">Enterprise timesheet approval and analytics dashboard</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <OverviewCards 
          pendingSubmissions={pendingSubmissions.length}
          totalHours={dashboardData.overview.totalHours}
          activeProjects={dashboardData.overview.activeProjects}
        />

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full h-10">
            <TabsTrigger value="approvals" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Approvals ({pendingSubmissions.length})</span>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <span>Pending Timesheet Submissions</span>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {pendingSubmissions.length} Pending
                    </Badge>
                  </CardTitle>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Grouped by:</span>
                      <Button variant="default" size="sm" className="cursor-default">
                        <Building className="w-4 h-4 mr-1" />
                        Project
                      </Button>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedSubmissions.size === pendingSubmissions.length && pendingSubmissions.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">
                        Select All ({selectedSubmissions.size}/{pendingSubmissions.length})
                      </span>
                    </div>
                    
                    <Button
                      onClick={handleBulkApprove}
                      disabled={selectedSubmissions.size === 0 || isLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Approve Selected ({selectedSubmissions.size})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {Object.entries(groupedSubmissions).map(([projectCode, group]) => {
                  const isExpanded = expandedProjects.has(projectCode);
                  return (
                    <div key={projectCode} className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-900">{group.projectCode}</h3>
                            <p className="text-sm text-blue-700">{group.projectDescription}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-blue-700 border-blue-300">
                              {group.submissions.length} {group.submissions.length === 1 ? 'employee' : 'employees'}
                            </Badge>
                            <Badge variant="outline" className="text-blue-700 border-blue-300">
                              {group.submissions.reduce((sum, sub) => sum + sub.totalHours, 0)}h total
                            </Badge>
                            
                            <ProjectSelectButton
                              group={group}
                              projectCode={projectCode}
                              selectedSubmissions={selectedSubmissions}
                              onSelectAllInProject={handleSelectAllInProject}
                            />
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleProject(projectCode)}
                              className="text-blue-700 hover:bg-blue-100"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-1" />
                                  Collapse
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-1" />
                                  Expand
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="grid gap-4 pl-4">
                          {group.submissions.map(submission => (
                            <SubmissionCard
                              key={submission.id}
                              submission={submission}
                              onApprove={handleApprove}
                              onReject={handleReject}
                              isSelected={selectedSubmissions.has(submission.id)}
                              onSelect={() => handleSelectSubmission(submission.id)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {pendingSubmissions.length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending timesheet submissions to review.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Weekly Hours Trend</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <WeeklyChart data={dashboardData.weeklyTrends.hoursData} type="hours" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Efficiency Trend</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <WeeklyChart data={dashboardData.weeklyTrends.efficiencyTrend} type="efficiency" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Daily Cost Trend</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <WeeklyChart data={dashboardData.weeklyTrends.costTrend} type="costs" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {dashboardData.projectMetrics.map(project => (
                <ProjectMetricsCard key={project.code} project={project} />
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">87%</p>
                    <p className="text-sm text-gray-600">Overall Team Efficiency</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Top Performer:</span>
                      <span className="font-medium">Sarah Johnson (95%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Most Improved:</span>
                      <span className="font-medium">Mike Wilson (+12%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Needs Attention:</span>
                      <span className="font-medium text-yellow-600">2 employees</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Weekly Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-2">
                  <Alert className="border-green-200 bg-green-50 py-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Great News!</strong> Team efficiency is up 5% from last week.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-blue-200 bg-blue-50 py-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Notice:</strong> Project 21-0066 approaching budget limit (67% used).
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-yellow-200 bg-yellow-50 py-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Action Required:</strong> 3 timesheets have anomalies requiring review.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-lg font-medium">Processing approval...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
