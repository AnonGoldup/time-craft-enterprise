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
import { LoadingState } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import TimeEntryEditForm from '@/components/TimeEntry/TimeEntryEditForm';

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
  const [error, setError] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  // Enhanced data loading with error handling
  useEffect(() => {
    loadData();
  }, [selectedEmployee, selectedProject, currentWeek]);

  const loadData = async () => {
    try {
      setError(null);
      await Promise.all([loadProjects(), loadTimeEntries()]);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error('Data loading error:', err);
    }
  };

  const loadProjects = async () => {
    // Mock projects data with better error simulation
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
      toast.error("Failed to load time entries", {
        description: "Please check your connection and try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeekRange = () => {
    const start = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
  };

  const getTotalHours = () => {
    return timeEntries.reduce((sum, entry) => sum + entry.total, 0);
  };

  const handleEditEntry = (entry: TimeEntry) => {
    if (entry.status !== 'Draft') {
      toast.error("Only draft entries can be edited", {
        description: "Submitted entries cannot be modified."
      });
      return;
    }
    setEditingEntry(entry);
    setIsEditFormOpen(true);
  };

  const handleSaveEntry = (updatedEntry: TimeEntry) => {
    setTimeEntries(entries => 
      entries.map(entry => 
        entry.entryID === updatedEntry.entryID ? updatedEntry : entry
      )
    );
  };

  const handleDeleteEntry = async (entryID: number) => {
    const entry = timeEntries.find(e => e.entryID === entryID);
    if (entry?.status !== 'Draft') {
      toast.error("Only draft entries can be deleted", {
        description: "Submitted entries cannot be removed."
      });
      return;
    }
    
    try {
      setTimeEntries(entries => entries.filter(e => e.entryID !== entryID));
      toast.success("Entry deleted successfully", {
        description: "The time entry has been removed."
      });
    } catch (error) {
      toast.error("Failed to delete entry", {
        description: "Please try again later."
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      'Approved': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
      'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800'
    };
    
    return (
      <Badge className={`${variants[status as keyof typeof variants] || variants.Draft} border`}>
        {status}
      </Badge>
    );
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-destructive text-lg font-medium">Error Loading Data</p>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={loadData} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Time Log
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage your time entries
            </p>
          </div>
        </div>

        {/* Enhanced Filters Bar */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Employee Filter */}
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
                <label htmlFor="employee-select" className="text-sm text-muted-foreground min-w-[70px]">
                  Employee:
                </label>
                <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                  <SelectTrigger 
                    id="employee-select"
                    className="w-48 border-input bg-background focus:ring-ring"
                    aria-label="Select employee"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value={user?.employeeId.toString() || ''}>{user?.fullName}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="h-6 w-px bg-border" aria-hidden="true"></div>

              {/* Project Filter */}
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
                <label htmlFor="project-select" className="text-sm text-muted-foreground min-w-[50px]">
                  Project:
                </label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger 
                    id="project-select"
                    className="w-64 border-input bg-background focus:ring-ring"
                    aria-label="Select project"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="all">All Projects</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.projectID} value={project.projectID.toString()}>
                        {project.projectCode} - {project.projectDescription}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="h-6 w-px bg-border" aria-hidden="true"></div>

              {/* Enhanced Week Navigation */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                <label className="text-sm text-muted-foreground min-w-[40px]">Week:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                    className="h-8 w-8 p-0 focus:ring-ring"
                    aria-label="Previous week"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[200px] text-center text-foreground">
                    {getWeekRange()}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                    className="h-8 w-8 p-0 focus:ring-ring"
                    aria-label="Next week"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Week Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{getTotalHours()}h</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{timeEntries.length}</p>
                <p className="text-sm text-muted-foreground">Entries</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">
                  {timeEntries.filter(e => e.status === 'Draft').length}
                </p>
                <p className="text-sm text-muted-foreground">Draft Entries</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Time Entries Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Time Entries</CardTitle>
            <CardDescription className="text-muted-foreground">
              Your time entries for the selected week
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <LoadingState message="Loading time entries..." />
            ) : timeEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No time entries found for the selected criteria
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-muted/50">
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Project</TableHead>
                      <TableHead className="text-muted-foreground">Phase/Extra</TableHead>
                      <TableHead className="text-muted-foreground">Cost Code</TableHead>
                      <TableHead className="text-muted-foreground">Time In</TableHead>
                      <TableHead className="text-muted-foreground">Time Out</TableHead>
                      <TableHead className="text-muted-foreground">Breaks</TableHead>
                      <TableHead className="text-muted-foreground">ST</TableHead>
                      <TableHead className="text-muted-foreground">OT</TableHead>
                      <TableHead className="text-muted-foreground">DT</TableHead>
                      <TableHead className="text-muted-foreground">Total</TableHead>
                      <TableHead className="text-muted-foreground">Location</TableHead>
                      <TableHead className="text-muted-foreground">Comments</TableHead>
                      <TableHead className="text-muted-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeEntries.map((entry) => (
                      <TableRow key={entry.entryID} className="border-border hover:bg-muted/50">
                        <TableCell>{getStatusBadge(entry.status)}</TableCell>
                        <TableCell className="text-foreground">{format(new Date(entry.dateWorked), 'MMM dd')}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-foreground">{entry.projectCode}</div>
                            <div className="text-xs text-muted-foreground">{entry.projectDescription}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">{entry.extraValue || '-'}</TableCell>
                        <TableCell className="text-foreground">{entry.costCode}</TableCell>
                        <TableCell className="text-foreground">{entry.timeIn || '-'}</TableCell>
                        <TableCell className="text-foreground">{entry.timeOut || '-'}</TableCell>
                        <TableCell className="text-foreground">{entry.breaks || 0}</TableCell>
                        <TableCell className="text-foreground">{entry.standardHours || '-'}</TableCell>
                        <TableCell className="text-foreground">{entry.overtimeHours || 0}</TableCell>
                        <TableCell className="text-foreground">{entry.doubleTimeHours || 0}</TableCell>
                        <TableCell className="font-medium text-foreground">{entry.total}</TableCell>
                        <TableCell className="text-foreground">{entry.location || '-'}</TableCell>
                        <TableCell>
                          {entry.comments && (
                            <div className="max-w-32 truncate text-foreground" title={entry.comments}>
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
                              className="h-8 w-8 p-0 focus:ring-ring"
                              aria-label={`Edit entry ${entry.entryID}`}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEntry(entry.entryID)}
                              disabled={entry.status !== 'Draft'}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive focus:ring-ring"
                              aria-label={`Delete entry ${entry.entryID}`}
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

        {/* Edit Form Modal */}
        <TimeEntryEditForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setEditingEntry(null);
          }}
          entry={editingEntry}
          onSave={handleSaveEntry}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Log;
