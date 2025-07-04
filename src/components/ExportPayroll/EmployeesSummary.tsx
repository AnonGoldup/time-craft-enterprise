
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  Download,
  Mail,
  UserCheck,
  UserX,
  DollarSign,
  Target
} from 'lucide-react';

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

interface Employee {
  id: string;
  name: string;
  department: string;
  supervisor: string;
  status: 'submitted' | 'pending' | 'not-submitted' | 'approved' | 'rejected';
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  estimatedPay: number;
  lastSubmission: string;
  daysLate: number;
  projects: string[];
  submissionRate: number;
}

interface EmployeesSummaryProps {
  weeklyStats: WeeklyStats;
}

// Mock employee data - in real app this would come from API
const employeeData: Employee[] = [
  {
    id: 'EMP001',
    name: 'John Smith',
    department: 'Construction',
    supervisor: 'Mike Johnson',
    status: 'submitted',
    regularHours: 40,
    overtimeHours: 8,
    totalHours: 48,
    estimatedPay: 2400,
    lastSubmission: '2025-06-20T17:30:00',
    daysLate: 0,
    projects: ['21-0066', '22-0006'],
    submissionRate: 95
  },
  {
    id: 'EMP002',
    name: 'Sarah Wilson',
    department: 'Electrical',
    supervisor: 'Tom Brown',
    status: 'pending',
    regularHours: 40,
    overtimeHours: 4,
    totalHours: 44,
    estimatedPay: 2200,
    lastSubmission: '2025-06-19T16:15:00',
    daysLate: 1,
    projects: ['24-0052'],
    submissionRate: 88
  },
  {
    id: 'EMP003',
    name: 'Bob Davis',
    department: 'Plumbing',
    supervisor: 'Mike Johnson',
    status: 'not-submitted',
    regularHours: 0,
    overtimeHours: 0,
    totalHours: 0,
    estimatedPay: 0,
    lastSubmission: '2025-06-15T14:20:00',
    daysLate: 5,
    projects: ['25-0012'],
    submissionRate: 72
  },
  {
    id: 'EMP004',
    name: 'Lisa Chen',
    department: 'Construction',
    supervisor: 'Tom Brown',
    status: 'approved',
    regularHours: 40,
    overtimeHours: 0,
    totalHours: 40,
    estimatedPay: 2000,
    lastSubmission: '2025-06-20T18:45:00',
    daysLate: 0,
    projects: ['21-0066', '24-0078'],
    submissionRate: 98
  },
  {
    id: 'EMP005',
    name: 'Mark Johnson',
    department: 'Electrical',
    supervisor: 'Mike Johnson',
    status: 'rejected',
    regularHours: 35,
    overtimeHours: 3,
    totalHours: 38,
    estimatedPay: 1900,
    lastSubmission: '2025-06-19T10:30:00',
    daysLate: 2,
    projects: ['22-0089'],
    submissionRate: 83
  }
];

export const EmployeesSummary: React.FC<EmployeesSummaryProps> = ({ weeklyStats }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  
  const submissionRate = ((weeklyStats.submitted / weeklyStats.totalEmployees) * 100).toFixed(1);
  
  // Filter employees based on search and filters
  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: Employee['status']) => {
    const variants = {
      'submitted': { variant: 'secondary' as const, label: 'Submitted' },
      'pending': { variant: 'outline' as const, label: 'Pending' },
      'not-submitted': { variant: 'destructive' as const, label: 'Not Submitted' },
      'approved': { variant: 'default' as const, label: 'Approved' },
      'rejected': { variant: 'destructive' as const, label: 'Rejected' }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: Employee['status']) => {
    switch (status) {
      case 'submitted':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'not-submitted':
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const departments = Array.from(new Set(employeeData.map(emp => emp.department)));
  const criticalEmployees = employeeData.filter(emp => emp.daysLate > 2 || emp.status === 'rejected');
  const lowPerformers = employeeData.filter(emp => emp.submissionRate < 85);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{weeklyStats.totalEmployees}</p>
                <p className="text-xs text-muted-foreground">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{weeklyStats.submitted}</p>
                <p className="text-xs text-muted-foreground">Submitted</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{weeklyStats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserX className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{weeklyStats.notSubmitted}</p>
                <p className="text-xs text-muted-foreground">Missing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Rate Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Weekly Submission Rate</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">{submissionRate}%</div>
          </div>
          <Progress value={parseFloat(submissionRate)} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Target: 95%</span>
            <span>{weeklyStats.submitted} of {weeklyStats.totalEmployees} submitted</span>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {criticalEmployees.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>{criticalEmployees.length} employees</strong> require immediate attention: 
            {criticalEmployees.slice(0, 3).map(emp => emp.name).join(', ')}
            {criticalEmployees.length > 3 && ` and ${criticalEmployees.length - 3} more`}
          </AlertDescription>
        </Alert>
      )}

      {/* Employee Management Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="payroll">Payroll Ready</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {departments.map(dept => {
                    const deptEmployees = employeeData.filter(emp => emp.department === dept);
                    const deptSubmitted = deptEmployees.filter(emp => emp.status === 'submitted' || emp.status === 'approved').length;
                    const deptRate = ((deptSubmitted / deptEmployees.length) * 100).toFixed(0);
                    
                    return (
                      <div key={dept} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{dept}</p>
                          <p className="text-sm text-muted-foreground">{deptEmployees.length} employees</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{deptRate}%</p>
                          <p className="text-sm text-muted-foreground">{deptSubmitted}/{deptEmployees.length}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Totals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Regular Hours</span>
                    <span className="font-semibold">{weeklyStats.regularHours.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Overtime Hours</span>
                    <span className="font-semibold">{weeklyStats.overtimeHours.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Entries</span>
                    <span className="font-semibold">{weeklyStats.totalEntries.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="font-medium">Estimated Payroll</span>
                    <span className="font-bold text-green-600">${weeklyStats.estimatedPayroll.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detailed View Tab */}
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Employee Details</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="not-submitted">Not Submitted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Hours</TableHead>
                      <TableHead>Est. Pay</TableHead>
                      <TableHead>Submission Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(employee.status)}
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">{employee.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{employee.department}</p>
                            <p className="text-sm text-muted-foreground">Sup: {employee.supervisor}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {getStatusBadge(employee.status)}
                            {employee.daysLate > 0 && (
                              <p className="text-xs text-red-600">{employee.daysLate} days late</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.totalHours}h</p>
                            <p className="text-xs text-muted-foreground">
                              R: {employee.regularHours}h, OT: {employee.overtimeHours}h
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-green-600">
                          ${employee.estimatedPay.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${employee.submissionRate >= 90 ? 'text-green-600' : employee.submissionRate >= 80 ? 'text-orange-600' : 'text-red-600'}`}>
                              {employee.submissionRate}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Mail className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Issues Tab */}
        <TabsContent value="issues">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Critical Issues ({criticalEmployees.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {criticalEmployees.length === 0 ? (
                  <p className="text-muted-foreground">No critical issues found.</p>
                ) : (
                  <div className="space-y-3">
                    {criticalEmployees.map(employee => (
                      <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {employee.status === 'rejected' ? 'Timesheet rejected' : `${employee.daysLate} days overdue`}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Mail className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Low Performance ({lowPerformers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {lowPerformers.length === 0 ? (
                  <p className="text-muted-foreground">All employees meeting performance standards.</p>
                ) : (
                  <div className="space-y-3">
                    {lowPerformers.map(employee => (
                      <div key={employee.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {employee.submissionRate}% submission rate (target: 85%+)
                          </p>
                        </div>
                        <Badge variant="secondary">{employee.submissionRate}%</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payroll Ready Tab */}
        <TabsContent value="payroll">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Payroll Export Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-green-800">Ready for Export</p>
                    <p className="text-sm text-green-600">
                      {employeeData.filter(emp => emp.status === 'approved').length} employees approved
                    </p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Approved
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-bold">
                      {employeeData.filter(emp => emp.status === 'approved').reduce((sum, emp) => sum + emp.totalHours, 0)}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Regular Hours</p>
                    <p className="text-2xl font-bold">
                      {employeeData.filter(emp => emp.status === 'approved').reduce((sum, emp) => sum + emp.regularHours, 0)}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">Overtime Hours</p>
                    <p className="text-2xl font-bold">
                      {employeeData.filter(emp => emp.status === 'approved').reduce((sum, emp) => sum + emp.overtimeHours, 0)}
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Total Hours</TableHead>
                        <TableHead>Estimated Pay</TableHead>
                        <TableHead>Projects</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employeeData.filter(emp => emp.status === 'approved').map(employee => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <div>
                                <p className="font-medium">{employee.name}</p>
                                <p className="text-sm text-muted-foreground">{employee.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{employee.totalHours}h</p>
                              <p className="text-xs text-muted-foreground">
                                R: {employee.regularHours}h, OT: {employee.overtimeHours}h
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-green-600">
                            ${employee.estimatedPay.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {employee.projects.map(project => (
                                <Badge key={project} variant="outline" className="text-xs">
                                  {project}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
