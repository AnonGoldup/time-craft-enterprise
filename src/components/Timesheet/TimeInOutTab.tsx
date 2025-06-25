
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar,
  Clock,
  Edit2,
  Trash2,
  Plus,
  Filter,
  Download,
  Upload,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BarChart3,
  FileText,
  Timer,
  User,
  Building,
  Hash,
  Search,
  RefreshCw,
  Eye,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';

// Types based on the system architecture
interface TimesheetEntry {
  entryId: number;
  employeeId: string;
  employeeName: string;
  dateWorked: string;
  projectCode: string;
  projectDescription: string;
  extraValue: string;
  extraDescription?: string;
  costCode: string;
  costCodeDescription: string;
  standardHours: number;
  overtimeHours: number;
  totalHours: number;
  notes?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  createdDate: string;
  createdBy: string;
  timeIn?: string;
  timeOut?: string;
  breakStartTime?: string;
  breakEndTime?: string;
}

interface WeeklySummary {
  weekEndingDate: string;
  totalStandardHours: number;
  totalOvertimeHours: number;
  totalHours: number;
  entriesCount: number;
  submissionStatus: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  submittedOn?: string;
}

interface Project {
  projectCode: string;
  projectDescription: string;
  isActive: boolean;
}

// Utility functions
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const formatDate = (date: Date | string, format: string = 'MMM dd, yyyy'): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = {};
  
  switch (format) {
    case 'yyyy-MM-dd':
      return d.toISOString().split('T')[0];
    case 'MMM dd, yyyy':
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
      break;
    case 'MMM dd':
      options.month = 'short';
      options.day = 'numeric';
      break;
    default:
      return d.toLocaleDateString();
  }
  
  return d.toLocaleDateString('en-US', options);
};

const getWeekEndingDate = (date: Date): Date => {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const daysToSaturday = (6 - dayOfWeek) % 7;
  d.setDate(d.getDate() + daysToSaturday);
  return d;
};

const getCurrentWeekDates = (): { start: Date; end: Date } => {
  const today = new Date();
  const currentDay = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDay);
  
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  
  return { start: sunday, end: saturday };
};

// Mock data - In production, this would come from API calls
const mockTimesheetEntries: TimesheetEntry[] = [
  {
    entryId: 1,
    employeeId: 'JSMITH',
    employeeName: 'John Smith',
    dateWorked: '2025-06-23',
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 1',
    extraDescription: 'Phase 1 - Initial Setup',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    standardHours: 8.0,
    overtimeHours: 0.0,
    totalHours: 8.0,
    notes: 'Regular day work',
    status: 'Draft',
    createdDate: '2025-06-23T08:00:00Z',
    createdBy: 'JSMITH',
    timeIn: '07:00',
    timeOut: '15:30',
    breakStartTime: '12:00',
    breakEndTime: '12:30'
  },
  {
    entryId: 2,
    employeeId: 'JSMITH',
    employeeName: 'John Smith',
    dateWorked: '2025-06-22',
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 1',
    costCode: '001-040-043',
    costCodeDescription: 'INDIRECT LAB-Direct Labor',
    standardHours: 8.0,
    overtimeHours: 2.0,
    totalHours: 10.0,
    notes: 'Overtime for project deadline',
    status: 'Submitted',
    createdDate: '2025-06-22T08:00:00Z',
    createdBy: 'JSMITH'
  },
  {
    entryId: 3,
    employeeId: 'JSMITH',
    employeeName: 'John Smith',
    dateWorked: '2025-06-21',
    projectCode: '22-0006',
    projectDescription: 'AltaPro Service Department',
    extraValue: 'Default',
    costCode: '001-500-501',
    costCodeDescription: 'GENEXP-Vehicle Travel',
    standardHours: 6.0,
    overtimeHours: 0.0,
    totalHours: 6.0,
    notes: 'Service call to client site',
    status: 'Approved',
    createdDate: '2025-06-21T08:00:00Z',
    createdBy: 'JSMITH'
  },
  {
    entryId: 4,
    employeeId: 'JSMITH',
    employeeName: 'John Smith',
    dateWorked: '2025-06-20',
    projectCode: '21-0066',
    projectDescription: 'Edmonton EXPO SOLAR IPD',
    extraValue: 'Phase 2',
    costCode: '001-040-054',
    costCodeDescription: 'INDIRECT LAB-Employee Training',
    standardHours: 4.0,
    overtimeHours: 0.0,
    totalHours: 4.0,
    notes: 'Training session',
    status: 'Rejected',
    createdDate: '2025-06-20T08:00:00Z',
    createdBy: 'JSMITH'
  }
];

const mockWeeklySummaries: WeeklySummary[] = [
  {
    weekEndingDate: '2025-06-28',
    totalStandardHours: 32.0,
    totalOvertimeHours: 4.0,
    totalHours: 36.0,
    entriesCount: 8,
    submissionStatus: 'Draft'
  },
  {
    weekEndingDate: '2025-06-21',
    totalStandardHours: 40.0,
    totalOvertimeHours: 2.0,
    totalHours: 42.0,
    entriesCount: 10,
    submissionStatus: 'Submitted',
    submittedOn: '2025-06-22T17:00:00Z'
  }
];

const mockProjects: Project[] = [
  { projectCode: '21-0066', projectDescription: 'Edmonton EXPO SOLAR IPD', isActive: true },
  { projectCode: '22-0006', projectDescription: 'AltaPro Service Department', isActive: true },
  { projectCode: '24-0052', projectDescription: 'Grant MacEwan School', isActive: true },
  { projectCode: '21-0029', projectDescription: 'Edmonton EXPO IPD', isActive: true }
];

// Status badge component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Draft':
        return { variant: 'secondary' as const, icon: Edit2, color: 'text-gray-600' };
      case 'Submitted':
        return { variant: 'default' as const, icon: Send, color: 'text-blue-600' };
      case 'Approved':
        return { variant: 'default' as const, icon: CheckCircle2, color: 'text-green-600' };
      case 'Rejected':
        return { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' };
      default:
        return { variant: 'outline' as const, icon: AlertTriangle, color: 'text-gray-600' };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="text-xs">
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </Badge>
  );
};

// Date range picker component
const DateRangePicker: React.FC<{
  startDate?: Date;
  endDate?: Date;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
}> = ({ startDate, endDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | undefined>(startDate);
  const [tempEnd, setTempEnd] = useState<Date | undefined>(endDate);

  const formatDateRange = () => {
    if (!startDate && !endDate) return "Select date range";
    if (startDate && !endDate) return `From ${formatDate(startDate, 'MMM dd')}`;
    if (!startDate && endDate) return `Until ${formatDate(endDate, 'MMM dd')}`;
    return `${formatDate(startDate!, 'MMM dd')} - ${formatDate(endDate!, 'MMM dd')}`;
  };

  const handleApply = () => {
    onDateChange(tempStart, tempEnd);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempStart(undefined);
    setTempEnd(undefined);
    onDateChange(undefined, undefined);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-start text-left font-normal">
          <Calendar className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Start Date</Label>
              <CalendarComponent
                mode="single"
                selected={tempStart}
                onSelect={setTempStart}
                className="rounded-md border"
              />
            </div>
            <div>
              <Label className="text-xs">End Date</Label>
              <CalendarComponent
                mode="single"
                selected={tempEnd}
                onSelect={setTempEnd}
                className="rounded-md border"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Main component
export const TimeInOutTab = () => {
  // State management
  const [entries, setEntries] = useState<TimesheetEntry[]>(mockTimesheetEntries);
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>(mockWeeklySummaries);
  const [filteredEntries, setFilteredEntries] = useState<TimesheetEntry[]>(entries);
  
  // Filter states
  const [startDateFilter, setStartDateFilter] = useState<Date | undefined>();
  const [endDateFilter, setEndDateFilter] = useState<Date | undefined>();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  
  // UI states
  const [selectedEntries, setSelectedEntries] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'list' | 'weekly'>('list');
  const [editingEntry, setEditingEntry] = useState<TimesheetEntry | null>(null);

  // Current week calculation
  const currentWeek = useMemo(() => getCurrentWeekDates(), []);

  // Filter entries based on active filters
  useEffect(() => {
    let filtered = [...entries];

    // Date range filter
    if (startDateFilter) {
      filtered = filtered.filter(entry => new Date(entry.dateWorked) >= startDateFilter);
    }
    if (endDateFilter) {
      filtered = filtered.filter(entry => new Date(entry.dateWorked) <= endDateFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(entry => entry.status === statusFilter);
    }

    // Project filter
    if (projectFilter !== 'all') {
      filtered = filtered.filter(entry => entry.projectCode === projectFilter);
    }

    // Search filter
    if (searchFilter) {
      const search = searchFilter.toLowerCase();
      filtered = filtered.filter(entry =>
        entry.projectCode.toLowerCase().includes(search) ||
        entry.projectDescription.toLowerCase().includes(search) ||
        entry.costCode.toLowerCase().includes(search) ||
        entry.costCodeDescription.toLowerCase().includes(search) ||
        entry.notes?.toLowerCase().includes(search)
      );
    }

    setFilteredEntries(filtered);
  }, [entries, startDateFilter, endDateFilter, statusFilter, projectFilter, searchFilter]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalStandard = filteredEntries.reduce((sum, entry) => sum + entry.standardHours, 0);
    const totalOvertime = filteredEntries.reduce((sum, entry) => sum + entry.overtimeHours, 0);
    const statusCounts = filteredEntries.reduce((counts, entry) => {
      counts[entry.status] = (counts[entry.status] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    return {
      totalEntries: filteredEntries.length,
      totalStandardHours: totalStandard,
      totalOvertimeHours: totalOvertime,
      totalHours: totalStandard + totalOvertime,
      statusCounts
    };
  }, [filteredEntries]);

  // Handlers
  const handleDateRangeChange = useCallback((start: Date | undefined, end: Date | undefined) => {
    setStartDateFilter(start);
    setEndDateFilter(end);
  }, []);

  const handleDeleteEntry = useCallback((entryId: number) => {
    if (window.confirm('Are you sure you want to delete this timesheet entry?')) {
      setEntries(prev => prev.filter(entry => entry.entryId !== entryId));
      setSelectedEntries(prev => {
        const newSet = new Set(prev);
        newSet.delete(entryId);
        return newSet;
      });
    }
  }, []);

  const handleEditEntry = useCallback((entry: TimesheetEntry) => {
    setEditingEntry(entry);
  }, []);

  const handleToggleSelection = useCallback((entryId: number) => {
    setSelectedEntries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(entryId)) {
        newSet.delete(entryId);
      } else {
        newSet.add(entryId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedEntries.size === filteredEntries.length) {
      setSelectedEntries(new Set());
    } else {
      setSelectedEntries(new Set(filteredEntries.map(entry => entry.entryId)));
    }
  }, [selectedEntries.size, filteredEntries]);

  const handleSubmitWeek = useCallback((weekEndingDate: string) => {
    if (window.confirm(`Submit timesheet for week ending ${formatDate(weekEndingDate)}?`)) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        alert('Timesheet submitted successfully!');
        setIsLoading(false);
      }, 1000);
    }
  }, []);

  const handleQuickFilter = useCallback((filter: 'currentWeek' | 'lastWeek' | 'thisMonth') => {
    const today = new Date();
    
    switch (filter) {
      case 'currentWeek':
        setStartDateFilter(currentWeek.start);
        setEndDateFilter(currentWeek.end);
        break;
      case 'lastWeek':
        const lastWeekStart = new Date(currentWeek.start);
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);
        const lastWeekEnd = new Date(currentWeek.end);
        lastWeekEnd.setDate(lastWeekEnd.getDate() - 7);
        setStartDateFilter(lastWeekStart);
        setEndDateFilter(lastWeekEnd);
        break;
      case 'thisMonth':
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        setStartDateFilter(monthStart);
        setEndDateFilter(monthEnd);
        break;
    }
  }, [currentWeek]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Timesheets</h1>
          <p className="text-muted-foreground">View and manage your timesheet entries</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setView(view === 'list' ? 'weekly' : 'list')}>
            {view === 'list' ? <BarChart3 className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
            {view === 'list' ? 'Weekly View' : 'List View'}
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Hours</p>
                <p className="text-2xl font-bold">{summaryStats.totalHours.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Standard</p>
                <p className="text-2xl font-bold text-green-600">{summaryStats.totalStandardHours.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Overtime</p>
                <p className="text-2xl font-bold text-orange-600">{summaryStats.totalOvertimeHours.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Entries</p>
                <p className="text-2xl font-bold">{summaryStats.totalEntries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-64"
              />
            </div>
            
            <DateRangePicker
              startDate={startDateFilter}
              endDate={endDateFilter}
              onDateChange={handleDateRangeChange}
            />
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {mockProjects.map(project => (
                  <SelectItem key={project.projectCode} value={project.projectCode}>
                    {project.projectCode} - {project.projectDescription.substring(0, 30)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleQuickFilter('currentWeek')}>
                This Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickFilter('lastWeek')}>
                Last Week
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickFilter('thisMonth')}>
                This Month
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setStartDateFilter(undefined);
                setEndDateFilter(undefined);
                setStatusFilter('all');
                setProjectFilter('all');
                setSearchFilter('');
              }}
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {view === 'weekly' ? (
        /* Weekly Summary View */
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Weekly Summaries</h2>
          {weeklySummaries.map((summary, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Week Ending {formatDate(summary.weekEndingDate)}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{summary.entriesCount} entries</span>
                      <span>{summary.totalStandardHours.toFixed(1)}h standard</span>
                      <span>{summary.totalOvertimeHours.toFixed(1)}h overtime</span>
                      <span className="font-medium">{summary.totalHours.toFixed(1)}h total</span>
                    </div>
                    {summary.submittedOn && (
                      <p className="text-xs text-muted-foreground">
                        Submitted on {formatDate(summary.submittedOn, 'MMM dd, yyyy')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <StatusBadge status={summary.submissionStatus} />
                    {summary.submissionStatus === 'Draft' && (
                      <Button 
                        size="sm"
                        onClick={() => handleSubmitWeek(summary.weekEndingDate)}
                        disabled={isLoading}
                      >
                        {isLoading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                        Submit Week
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Timesheet Entries</CardTitle>
              <div className="flex items-center space-x-2">
                {selectedEntries.size > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {selectedEntries.size} selected
                  </span>
                )}
                <Button variant="outline" size="sm" onClick={handleSelectAll}>
                  {selectedEntries.size === filteredEntries.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-2 p-4">
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-medium">No timesheet entries found</h3>
                    <p className="text-sm">Try adjusting your filters or create a new entry</p>
                  </div>
                ) : (
                  filteredEntries.map((entry) => (
                    <Card key={entry.entryId} className={cn(
                      "transition-all cursor-pointer hover:shadow-md",
                      selectedEntries.has(entry.entryId) && "ring-2 ring-blue-500 bg-blue-50"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={selectedEntries.has(entry.entryId)}
                              onChange={() => handleToggleSelection(entry.entryId)}
                              className="rounded"
                            />
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-sm">{formatDate(entry.dateWorked, 'MMM dd, yyyy')}</h4>
                                <StatusBadge status={entry.status} />
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                <span className="flex items-center">
                                  <Building className="w-3 h-3 mr-1" />
                                  {entry.projectCode}
                                </span>
                                <span className="flex items-center">
                                  <Hash className="w-3 h-3 mr-1" />
                                  {entry.costCode}
                                </span>
                                {entry.extraValue !== 'Default' && (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                                    {entry.extraValue}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {entry.projectDescription}
                              </p>
                              {entry.notes && (
                                <p className="text-xs text-muted-foreground italic line-clamp-1">
                                  "{entry.notes}"
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {entry.totalHours.toFixed(2)}h
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {entry.standardHours > 0 && `${entry.standardHours.toFixed(1)}h reg`}
                                {entry.standardHours > 0 && entry.overtimeHours > 0 && ' + '}
                                {entry.overtimeHours > 0 && `${entry.overtimeHours.toFixed(1)}h OT`}
                              </div>
                              {entry.timeIn && entry.timeOut && (
                                <div className="text-xs text-muted-foreground">
                                  {entry.timeIn} - {entry.timeOut}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditEntry(entry)}
                                disabled={entry.status !== 'Draft'}
                                title={entry.status !== 'Draft' ? 'Only draft entries can be edited' : 'Edit entry'}
                              >
                                <Edit2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteEntry(entry.entryId)}
                                disabled={entry.status !== 'Draft'}
                                className="text-red-600 hover:text-red-700"
                                title={entry.status !== 'Draft' ? 'Only draft entries can be deleted' : 'Delete entry'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Bulk Actions */}
      {selectedEntries.size > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">
                  {selectedEntries.size} entries selected
                </span>
                <div className="text-xs text-muted-foreground">
                  Total: {filteredEntries
                    .filter(entry => selectedEntries.has(entry.entryId))
                    .reduce((sum, entry) => sum + entry.totalHours, 0)
                    .toFixed(1)}h
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Selected
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
