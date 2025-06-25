
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Building, CheckCircle2, XCircle, Clock, AlertTriangle, Timer, Target, Hash, Activity, TrendingUp, Calendar, MapPin, Coffee, Wrench, Star, Award, Flag, BarChart3, FileText, Download, RefreshCw, Eye, MessageSquare, ChevronDown, ChevronUp, Zap } from 'lucide-react';

// Types for better TypeScript support
interface TimesheetSubmission {
  id: number;
  employeeName: string;
  employeeId: string;
  class: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  totalHours: number;
  overtimeHours: number;
  efficiency: number;
  projectCode: string;
  projectDescription: string;
  extraValue: string;
  extraDescription: string;
  costCode: string;
  costCodeDescription: string;
  projects: string[];
  anomalies: string[];
  notes: string;
  weekEnding: string;
  submitDate: string;
}

interface ProjectGroup {
  projectCode: string;
  projectDescription: string;
  submissions: TimesheetSubmission[];
}

// Mock data for the dashboard
const dashboardData = {
  overview: {
    pendingReviews: 5,
    totalHours: 412.5,
    avgEfficiency: 87,
    activeProjects: 15,
    weeklyBudget: 125000,
    actualCost: 98750
  },
  recentSubmissions: [{
    id: 1,
    employeeName: 'John Smith',
    employeeId: 'JSMITH',
    class: 'FMAN',
    status: 'Pending' as const,
    totalHours: 44.0,
    overtimeHours: 4.0,
    efficiency: 92,
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 1',
    extraDescription: 'Initial Setup and Planning',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    projects: ['21-0066', '22-0006'],
    anomalies: ['Overtime exceeded 2hrs on Tuesday'],
    notes: 'Weather delay required extended hours',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T09:15:00'
  }, {
    id: 2,
    employeeName: 'Sarah Johnson',
    employeeId: 'SJOHN',
    class: 'JMAN',
    status: 'Pending' as const,
    totalHours: 40.0,
    overtimeHours: 0,
    efficiency: 95,
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 2',
    extraDescription: 'Implementation Phase',
    costCode: '001-040-054',
    costCodeDescription: 'INDIRECT LAB-Employee Training',
    projects: ['21-0066'],
    anomalies: [],
    notes: 'Standard week, excellent performance',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T10:30:00'
  }, {
    id: 3,
    employeeName: 'Mike Wilson',
    employeeId: 'MWILS',
    class: 'AP3',
    status: 'Pending' as const,
    totalHours: 42.0,
    overtimeHours: 2.0,
    efficiency: 85,
    projectCode: '24-0052',
    projectDescription: 'Grant MacEwan School',
    extraValue: 'Default',
    extraDescription: 'Standard Work',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    projects: ['24-0052'],
    anomalies: [],
    notes: 'Training completion bonus hours',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-15T16:45:00'
  }, {
    id: 4,
    employeeName: 'Lisa Brown',
    employeeId: 'LBROW',
    class: 'JMAN',
    status: 'Pending' as const,
    totalHours: 40.0,
    overtimeHours: 0,
    efficiency: 88,
    projectCode: '24-0052',
    projectDescription: 'Grant MacEwan School',
    extraValue: 'Phase 1',
    extraDescription: 'Site Preparation',
    costCode: '001-500-501',
    costCodeDescription: 'GENEXP-Vehicle Travel',
    projects: ['24-0052'],
    anomalies: [],
    notes: 'Site preparation completed ahead of schedule',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T11:00:00'
  }, {
    id: 5,
    employeeName: 'Tom Davis',
    employeeId: 'TDAVI',
    class: 'AP2',
    status: 'Pending' as const,
    totalHours: 38.0,
    overtimeHours: 0,
    efficiency: 91,
    projectCode: '22-0006',
    projectDescription: 'AltaPro Service Department',
    extraValue: 'Default',
    extraDescription: 'Standard Service Work',
    costCode: '001-040-055',
    costCodeDescription: 'INDIRECT LAB-Safety Training',
    projects: ['22-0006'],
    anomalies: [],
    notes: 'Completed safety certification training',
    weekEnding: '2025-06-21',
    submitDate: '2025-06-22T08:45:00'
  }] as TimesheetSubmission[],
  projectMetrics: [{
    code: '21-0066',
    name: 'Edmonton EXPO SOLAR IPD',
    totalHours: 156.5,
    budgetHours: 2400,
    budgetUsed: 67,
    efficiency: 91,
    daysRemaining: 45,
    status: 'On Track',
    cost: 145000
  }, {
    code: '22-0006',
    name: 'AltaPro Service Department',
    totalHours: 98.0,
    budgetHours: 800,
    budgetUsed: 78,
    efficiency: 95,
    daysRemaining: 30,
    status: 'Behind Schedule',
    cost: 89500
  }, {
    code: '24-0052',
    name: 'Grant MacEwan School',
    totalHours: 67.5,
    budgetHours: 1200,
    budgetUsed: 23,
    efficiency: 88,
    daysRemaining: 90,
    status: 'Ahead of Schedule',
    cost: 67200
  }],
  weeklyTrends: {
    hoursData: [{
      day: 'Mon',
      standard: 320,
      overtime: 12
    }, {
      day: 'Tue',
      standard: 315,
      overtime: 18
    }, {
      day: 'Wed',
      standard: 310,
      overtime: 8
    }, {
      day: 'Thu',
      standard: 325,
      overtime: 15
    }, {
      day: 'Fri',
      standard: 305,
      overtime: 22
    }, {
      day: 'Sat',
      standard: 45,
      overtime: 8
    }],
    efficiencyTrend: [88, 91, 87, 93, 89, 92],
    costTrend: [18500, 19200, 17800, 20100, 18900, 4200]
  }
};

// Utility function to merge classNames
const cn = (...classes: (string | undefined | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount);
};
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Approved':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Rejected':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};
const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 90) return 'text-green-600';
  if (efficiency >= 75) return 'text-yellow-600';
  return 'text-red-600';
};

// Project Select Button Component
const ProjectSelectButton = ({
  group,
  projectCode,
  selectedSubmissions,
  onSelectAllInProject
}: {
  group: ProjectGroup;
  projectCode: string;
  selectedSubmissions: Set<number>;
  onSelectAllInProject: (projectCode: string) => void;
}) => {
  const projectSubmissionIds = group.submissions.map(sub => sub.id);
  const allSelected = projectSubmissionIds.every(id => selectedSubmissions.has(id));
  const someSelected = projectSubmissionIds.some(id => selectedSubmissions.has(id));
  return <Button variant="outline" size="sm" onClick={() => onSelectAllInProject(projectCode)} className={cn("text-blue-700 border-blue-300", allSelected ? "bg-blue-100" : someSelected ? "bg-blue-50" : "hover:bg-blue-50")}>
      <input type="checkbox" checked={allSelected} ref={el => {
      if (el) el.indeterminate = someSelected && !allSelected;
    }} readOnly className="mr-2" />
      {allSelected ? 'Deselect All' : 'Select All'}
    </Button>;
};

const SubmissionCard = ({
  submission,
  onApprove,
  onReject,
  isSelected,
  onSelect
}: {
  submission: TimesheetSubmission;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const isPending = submission.status === 'Pending';
  return <Card className={cn("transition-all duration-300 hover:shadow-lg", isPending ? 'border-yellow-200 bg-yellow-50/30' : 'border-gray-200', isSelected && 'ring-2 ring-blue-500 border-blue-300')}>
      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex items-center space-x-3 mb-2">
            {isPending && <input type="checkbox" checked={isSelected} onChange={onSelect} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />}
            <h3 className="text-base font-semibold text-gray-900">
              {submission.employeeName}
            </h3>
            <Badge className={getStatusColor(submission.status)}>
              {submission.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
              {submission.status === 'Approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
              {submission.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1" />}
              {submission.status}
            </Badge>
          </div>
          
          {/* Enhanced Employee Info */}
          <div className="bg-gray-50 p-3 rounded-lg mb-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium text-gray-700">Employee:</span>
                <span className="text-xs text-gray-900">{submission.employeeId} • {submission.class}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Building className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-gray-700">Project:</span>
                <span className="text-xs text-gray-900">{submission.projectCode}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-medium text-gray-700">Extra:</span>
                <span className="text-xs text-gray-900">{submission.extraValue}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Hash className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium text-gray-700">Cost Code:</span>
                <span className="text-xs text-gray-900">{submission.costCode}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Timer className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-900">Total Hours</span>
              </div>
              <p className="text-base font-bold text-blue-600">{submission.totalHours}h</p>
              {submission.overtimeHours > 0 && <p className="text-xs text-blue-700">+{submission.overtimeHours}h OT</p>}
            </div>
            
            <div className="bg-green-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Target className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium text-green-900">Efficiency</span>
              </div>
              <p className={`text-base font-bold ${getEfficiencyColor(submission.efficiency)}`}>
                {submission.efficiency}%
              </p>
            </div>
            
            <div className="bg-purple-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Calendar className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-900">Week Ending</span>
              </div>
              <p className="text-xs font-bold text-purple-600">{submission.weekEnding}</p>
            </div>
            
            <div className="bg-orange-50 p-2 rounded-lg">
              <div className="flex items-center space-x-1 mb-1">
                <Flag className="w-3 h-3 text-orange-600" />
                <span className="text-xs font-medium text-orange-900">Issues</span>
              </div>
              <p className="text-base font-bold text-orange-600">{submission.anomalies.length}</p>
            </div>
          </div>
        </div>

        {submission.anomalies.length > 0 && <Alert className="mb-3 border-amber-200 bg-amber-50">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <AlertDescription>
              <div className="font-semibold text-amber-900 mb-1">Attention Required</div>
              <ul className="text-amber-800 text-xs">
                {submission.anomalies.map((anomaly, index) => <li key={index}>• {anomaly}</li>)}
              </ul>
            </AlertDescription>
          </Alert>}

        {submission.notes && <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-center space-x-2 text-xs mb-1">
              <MessageSquare className="w-3 h-3 text-blue-600" />
              <span className="font-medium text-blue-800">Notes:</span>
            </div>
            <p className="text-xs text-blue-700 ml-5">{submission.notes}</p>
          </div>}

        {/* Action Buttons Section */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-500">
            <span>Submitted: {new Date(submission.submitDate).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isPending && <>
                <Button size="sm" variant="outline" onClick={() => onReject(submission.id)} className="text-red-600 border-red-200 hover:bg-red-50">
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button size="sm" onClick={() => onApprove(submission.id)} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </>}
            
            <Button size="sm" variant="ghost" onClick={() => setExpanded(!expanded)} className="text-gray-500">
              {expanded ? <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Less
                </> : <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  More
                </>}
            </Button>
          </div>
        </div>

        {expanded && <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Productivity Score:</span>
                    <span className={`font-medium ${getEfficiencyColor(submission.efficiency)}`}>
                      {submission.efficiency}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekly Hours:</span>
                    <span className="font-medium">{submission.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Overtime Ratio:</span>
                    <span className="font-medium">
                      {(submission.overtimeHours / submission.totalHours * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Submit Date:</span>
                    <span className="font-medium">
                      {new Date(submission.submitDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Time Entry Details</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {submission.projectCode} - {submission.extraValue}
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      Cost Code: {submission.costCode}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Regular: {submission.totalHours - submission.overtimeHours}h</span>
                      <span>OT: {submission.overtimeHours}h</span>
                    </div>
                  </div>
                  {submission.projects && submission.projects.length > 1 && <div className="text-xs text-gray-500">
                      * Multiple projects: {submission.projects.join(', ')}
                    </div>}
                </div>
              </div>
            </div>
          </div>}
      </CardContent>
    </Card>;
};

const ProjectMetricsCard = ({
  project
}: {
  project: any;
}) => {
  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'text-green-600';
      case 'Behind Schedule':
        return 'text-red-600';
      case 'Ahead of Schedule':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };
  return <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-900">{project.code}</h3>
            <p className="text-sm text-gray-600 mt-1">{project.name}</p>
          </div>
          <Badge className={getProjectStatusColor(project.status)} variant="outline">
            {project.status}
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Budget Progress</span>
              <span>{project.budgetUsed}%</span>
            </div>
            <Progress value={project.budgetUsed} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Hours Used:</span>
              <span className="ml-2 font-medium">{project.totalHours}h</span>
            </div>
            <div>
              <span className="text-gray-600">Efficiency:</span>
              <span className={`ml-2 font-medium ${getEfficiencyColor(project.efficiency)}`}>
                {project.efficiency}%
              </span>
            </div>
            <div>
              <span className="text-gray-600">Days Left:</span>
              <span className="ml-2 font-medium">{project.daysRemaining}</span>
            </div>
            <div>
              <span className="text-gray-600">Cost:</span>
              <span className="ml-2 font-medium">{formatCurrency(project.cost)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>;
};

const WeeklyChart = ({
  data,
  type
}: {
  data: any;
  type: string;
}) => {
  const maxValue = Math.max(...data.map((d: any) => type === 'hours' ? d.standard + d.overtime : type === 'efficiency' ? d : d));
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">
          {type === 'hours' ? 'Daily Hours' : type === 'efficiency' ? 'Efficiency Trend' : 'Daily Costs'}
        </h4>
        {type === 'hours' && <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Standard</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Overtime</span>
            </div>
          </div>}
      </div>
      
      <div className="flex items-end space-x-2 h-32">
        {(type === 'hours' ? dashboardData.weeklyTrends.hoursData : type === 'efficiency' ? dashboardData.weeklyTrends.efficiencyTrend.map((val, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
        value: val
      })) : dashboardData.weeklyTrends.costTrend.map((val, i) => ({
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
        value: val
      }))).map((item: any, index: number) => <div key={index} className="flex-1 flex flex-col items-center space-y-1">
            <div className="w-full flex flex-col items-center justify-end" style={{
          height: '100px'
        }}>
              {type === 'hours' ? <>
                  <div className="w-full bg-orange-500 rounded-t" style={{
              height: `${item.overtime / maxValue * 80}px`
            }} title={`Overtime: ${item.overtime}h`}></div>
                  <div className="w-full bg-blue-500 rounded-b" style={{
              height: `${item.standard / maxValue * 80}px`
            }} title={`Standard: ${item.standard}h`}></div>
                </> : <div className={`w-full rounded ${type === 'efficiency' ? 'bg-green-500' : 'bg-purple-500'}`} style={{
            height: `${item.value / maxValue * 80}px`
          }} title={`${type === 'efficiency' ? item.value + '%' : formatCurrency(item.value)}`}></div>}
            </div>
            <span className="text-xs text-gray-600">{item.day || item.day}</span>
          </div>)}
      </div>
    </div>;
};

export default function AltaProManagerDashboard() {
  const [submissions, setSubmissions] = useState<TimesheetSubmission[]>(dashboardData.recentSubmissions);
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

  // Fixed: Added missing handleSelectAll function
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
    setSubmissions(prev => prev.map(sub => selectedSubmissions.has(sub.id) ? {
      ...sub,
      status: 'Approved' as const
    } : sub));
    setSelectedSubmissions(new Set());
    setIsLoading(false);
  }, [selectedSubmissions]);
  
  const handleApprove = useCallback(async (submissionId: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissions(prev => prev.map(sub => sub.id === submissionId ? {
      ...sub,
      status: 'Approved' as const
    } : sub));
    setIsLoading(false);
  }, []);
  
  const handleReject = useCallback(async (submissionId: number) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmissions(prev => prev.map(sub => sub.id === submissionId ? {
      ...sub,
      status: 'Rejected' as const
    } : sub));
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
      groups[project].submissions.push(submission);
      return groups;
    }, {});
  }, [submissions]);
  
  return <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AltaPro Timesheet Manager</h1>
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
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Pending Reviews</p>
                  <p className="text-xl font-bold text-yellow-600">{pendingSubmissions.length}</p>
                </div>
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Hours</p>
                  <p className="text-xl font-bold text-blue-600">{dashboardData.overview.totalHours}</p>
                </div>
                <Timer className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Active Projects</p>
                  <p className="text-xl font-bold text-purple-600">{dashboardData.overview.activeProjects}</p>
                </div>
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
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
          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
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
                      <input type="checkbox" checked={selectedSubmissions.size === pendingSubmissions.length && pendingSubmissions.length > 0} onChange={handleSelectAll} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-600">
                        Select All ({selectedSubmissions.size}/{pendingSubmissions.length})
                      </span>
                    </div>
                    
                    <Button onClick={handleBulkApprove} disabled={selectedSubmissions.size === 0 || isLoading} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Approve Selected ({selectedSubmissions.size})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {Object.entries(groupedSubmissions).map(([projectCode, group]) => {
                const isExpanded = expandedProjects.has(projectCode);
                return <div key={projectCode} className="space-y-4">
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
                            
                            <ProjectSelectButton group={group} projectCode={projectCode} selectedSubmissions={selectedSubmissions} onSelectAllInProject={handleSelectAllInProject} />
                            
                            <Button variant="ghost" size="sm" onClick={() => handleToggleProject(projectCode)} className="text-blue-700 hover:bg-blue-100">
                              {isExpanded ? <>
                                  <ChevronUp className="w-4 h-4 mr-1" />
                                  Collapse
                                </> : <>
                                  <ChevronDown className="w-4 h-4 mr-1" />
                                  Expand
                                </>}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {isExpanded && <div className="grid gap-4 pl-4">
                          {group.submissions.map(submission => <SubmissionCard key={submission.id} submission={submission} onApprove={handleApprove} onReject={handleReject} isSelected={selectedSubmissions.has(submission.id)} onSelect={() => handleSelectSubmission(submission.id)} />)}
                        </div>}
                    </div>;
              })}
                
                {pendingSubmissions.length === 0 && <div className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No pending timesheet submissions to review.</p>
                  </div>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same... */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Hours Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart data={dashboardData.weeklyTrends.hoursData} type="hours" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Efficiency Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart data={dashboardData.weeklyTrends.efficiencyTrend} type="efficiency" />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Daily Cost Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyChart data={dashboardData.weeklyTrends.costTrend} type="costs" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {dashboardData.projectMetrics.map(project => <ProjectMetricsCard key={project.code} project={project} />)}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">87%</p>
                    <p className="text-sm text-gray-600">Overall Team Efficiency</p>
                  </div>
                  
                  <div className="space-y-3">
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
                <CardHeader>
                  <CardTitle>Weekly Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="border-green-200 bg-green-50">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Great News!</strong> Team efficiency is up 5% from last week.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-blue-200 bg-blue-50">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Notice:</strong> Project 21-0066 approaching budget limit (67% used).
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-yellow-200 bg-yellow-50">
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
        {isLoading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-lg font-medium">Processing approval...</span>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}
