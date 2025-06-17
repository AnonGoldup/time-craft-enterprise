
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, User, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval } from 'date-fns';
import { toast } from 'sonner';

interface TimeEntry {
  entryID: number;
  dateWorked: string;
  projectCode: string;
  projectDescription: string;
  extraValue?: string;
  costCode: string;
  timeIn?: string;
  timeOut?: string;
  breaks?: number;
  standardHours?: number;
  overtimeHours?: number;
  doubleTimeHours?: number;
  total: number;
  location?: string;
  comments?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  entryType: 'Standard' | 'TimeInOut';
}

interface Project {
  projectID: number;
  projectCode: string;
  projectDescription: string;
}

const Log = () => {
  const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(user?.employeeId.toString() || '');
  const [selectedProject, setSelectedProject] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    loadProjects();
    loadTimeEntries();
  }, [selectedEmployee, selectedProject, currentWeek]);

  const loadProjects = async () => {
    // Mock projects data
    const mockProjects: Project[] = [
      { projectID: 1, projectCode: "PROJ001", projectDescription: "Office Building Renovation" },
      { projectID: 2, projectCode: "PROJ002", projectDescription: "Shopping Mall Construction" },
      { projectID: 3, projectCode: "PROJ003", projectDescription: "Residential Complex" }
    ];
    setProjects(mockProjects);
  };

  const loadTimeEntries = async () => {
    setLoading(true);
    try {
      // Mock time entries data
      const mockEntries: TimeEntry[] = [
        {
          entryID: 1,
          dateWorked: format(currentWeek, 'yyyy-MM-dd'),
          projectCode: "PROJ001",
          projectDescription: "Office Building Renovation",
          extraValue: "Phase 1",
          costCode: "LAB-001-001",
          timeIn: "08:00",
          timeOut: "17:00",
          breaks: 0.5,
          total: 8.0,
          location: "Site A",
          comments: "Foundation work completed",
          status: "Draft",
          entryType: "TimeInOut"
        },
        {
          entryID: 2,
          dateWorked: format(addWeeks(currentWeek, 0), 'yyyy-MM-dd'),
          projectCode: "PROJ002",
          projectDescription: "Shopping Mall Construction",
          costCode: "EQP-001-001",
          standardHours: 8,
          overtimeHours: 2,
          total: 10.0,
          status: "Submitted",
          entryType: "Standard"
        }
      ];
      setTimeEntries(mockEntries);
    } catch (error) {
      toast.error("Failed to load time entries");
    } finally {
      setLoading(false);
    }
  };

  const getWeekRange = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
  };

  const getWeekDays = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  };

  const getTotalHours = () => {
    return timeEntries.reduce((sum, entry) => sum + entry.total, 0);
  };

  const handleEditEntry = (entry: TimeEntry) => {
    if (entry.status !== 'Draft') {
      toast.error("Only draft entries can be edited");
      return;
    }
    // Navigate to appropriate edit page based on entry type
    // This would be implemented with router navigation
    toast.success(`Editing entry ${entry.entryID}`);
  };

  const handleDeleteEntry = async (entryID: number) => {
    const entry = timeEntries.find(e => e.entryID === entryID);
    if (entry?.status !== 'Draft') {
      toast.error("Only draft entries can be deleted");
      return;
    }
    
    try {
      // Mock delete API call
      setTimeEntries(entries => entries.filter(e => e.entryID !== entryID));
      toast.success("Entry deleted successfully");
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Approved': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.Draft}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Time Log
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage your time entries
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Employee Filter */}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[70px]">Employee:</span>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <SelectItem value={user?.employeeId.toString() || ''}>{user?.fullName}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

            {/* Project Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[50px]">Project:</span>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-64 border-slate-300 dark:border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.projectID} value={project.projectID.toString()}>
                      {project.projectCode} - {project.projectDescription}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

            {/* Week Navigation */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Week:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[200px] text-center">
                  {getWeekRange()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getTotalHours()}h</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Hours</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{timeEntries.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Entries</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {timeEntries.filter(e => e.status === 'Draft').length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Draft Entries</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries Table */}
      <Card className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Time Entries</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Your time entries for the selected week
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : timeEntries.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No time entries found for the selected criteria
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Phase/Extra</TableHead>
                    <TableHead>Cost Code</TableHead>
                    <TableHead>Time In</TableHead>
                    <TableHead>Time Out</TableHead>
                    <TableHead>Breaks</TableHead>
                    <TableHead>ST</TableHead>
                    <TableHead>OT</TableHead>
                    <TableHead>DT</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeEntries.map((entry) => (
                    <TableRow key={entry.entryID}>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>{format(new Date(entry.dateWorked), 'MMM dd')}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{entry.projectCode}</div>
                          <div className="text-xs text-gray-500">{entry.projectDescription}</div>
                        </div>
                      </TableCell>
                      <TableCell>{entry.extraValue || '-'}</TableCell>
                      <TableCell>{entry.costCode}</TableCell>
                      <TableCell>{entry.timeIn || '-'}</TableCell>
                      <TableCell>{entry.timeOut || '-'}</TableCell>
                      <TableCell>{entry.breaks || 0}</TableCell>
                      <TableCell>{entry.standardHours || '-'}</TableCell>
                      <TableCell>{entry.overtimeHours || 0}</TableCell>
                      <TableCell>{entry.doubleTimeHours || 0}</TableCell>
                      <TableCell className="font-medium">{entry.total}</TableCell>
                      <TableCell>{entry.location || '-'}</TableCell>
                      <TableCell>
                        {entry.comments && (
                          <div className="max-w-32 truncate" title={entry.comments}>
                            {entry.comments}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditEntry(entry)}
                            disabled={entry.status !== 'Draft'}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteEntry(entry.entryID)}
                            disabled={entry.status !== 'Draft'}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Log;
