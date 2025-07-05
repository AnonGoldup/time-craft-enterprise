
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
      groups[project] = {
        ...groups[project],
        submissions: [...groups[project].submissions, submission]
      };
      return groups;
    }, {});
  }, [submissions]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">Manager Dashboard</h1>
            <p className="text-muted-foreground">Enterprise timesheet approval and analytics platform</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
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
          <TabsList className="grid grid-cols-4 w-full bg-muted/50 border">
            <TabsTrigger value="approvals" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Approvals</span>
              <Badge variant="secondary" className="ml-1">{pendingSubmissions.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6 mt-6">
            <Card className="border-0 shadow-lg bg-card">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-xl">Pending Submissions</span>
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                      {pendingSubmissions.length} Pending
                    </Badge>
                  </CardTitle>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Grouped by:</span>
                      <Badge variant="secondary" className="gap-1">
                        <Building className="w-3 h-3" />
                        Project
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedSubmissions.size === pendingSubmissions.length && pendingSubmissions.length > 0}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-input accent-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        Select All ({selectedSubmissions.size}/{pendingSubmissions.length})
                      </span>
                    </div>
                    
                    <Button
                      onClick={handleBulkApprove}
                      disabled={selectedSubmissions.size === 0 || isLoading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve Selected ({selectedSubmissions.size})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                {Object.entries(groupedSubmissions).map(([projectCode, group]) => {
                  const isExpanded = expandedProjects.has(projectCode);
                  return (
                    <div key={projectCode} className="space-y-4">
                      <div className="relative overflow-hidden rounded-xl border bg-muted/50">
                        <div className="absolute inset-y-0 left-0 w-1 bg-primary"></div>
                        <div className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground">{group.projectCode}</h3>
                              <p className="text-muted-foreground">{group.projectDescription}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <Badge variant="outline" className="bg-muted/50">
                                {group.submissions.length} {group.submissions.length === 1 ? 'employee' : 'employees'}
                              </Badge>
                              <Badge variant="outline" className="bg-muted/50">
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
                                className="hover:bg-accent gap-1"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" />
                                    <span className="hidden sm:inline">Collapse</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" />
                                    <span className="hidden sm:inline">Expand</span>
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && (
                        <div className="grid gap-4 pl-6">
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
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground">No pending timesheet submissions to review.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Weekly Hours Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart data={dashboardData.weeklyTrends.hoursData} type="hours" />
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Efficiency Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart data={dashboardData.weeklyTrends.efficiencyTrend} type="efficiency" />
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Daily Cost Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart data={dashboardData.weeklyTrends.costTrend} type="costs" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {dashboardData.projectMetrics.map(project => (
                <ProjectMetricsCard key={project.code} project={project} />
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">87%</p>
                    <p className="text-sm text-muted-foreground">Overall Team Efficiency</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Top Performer:</span>
                      <span className="font-medium">Sarah Johnson (95%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Most Improved:</span>
                      <span className="font-medium">Mike Wilson (+12%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Needs Attention:</span>
                      <span className="font-medium text-muted-foreground">2 employees</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Weekly Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-border bg-muted/30">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <AlertDescription className="text-foreground">
                      <strong>Great News!</strong> Team efficiency is up 5% from last week.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-border bg-muted/30">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <AlertDescription className="text-foreground">
                      <strong>Notice:</strong> Project 21-0066 approaching budget limit (67% used).
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-border bg-muted/30">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <AlertDescription className="text-foreground">
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span className="text-lg font-medium text-foreground">Processing approval...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
