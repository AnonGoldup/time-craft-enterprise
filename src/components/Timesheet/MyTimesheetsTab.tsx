import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Search, Filter, RefreshCw, Clock, Timer, Hash, Eye, Edit, Trash2, Building, FileText, AlertTriangle, CheckCircle2, XCircle, ChevronLeft, ChevronRight, MoreVertical, CalendarDays, BarChart3, User } from 'lucide-react';

// Type definitions
interface WeeklySummary {
  weekStart: Date;
  weekEnd: Date;
  days: Record<number, DayData>;
  totalStandard: number;
  totalOvertime: number;
  totalHours: number;
  entries: number;
  projects: Set<string>;
}
interface DayData {
  standard: number;
  overtime: number;
  entries: any[];
}

// Utility functions
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');
const formatDate = (date: Date | string, format = 'yyyy-MM-dd') => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  if (format === 'MMM dd, yyyy') {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[d.getMonth()]} ${day}, ${year}`;
  }
  return `${year}-${month}-${day}`;
};

// Mock data - Replace with actual API calls
const mockUser = {
  employeeId: 'GOLNIC',
  fullName: 'Nicholas Goldup',
  role: 'admin'
};
const mockProjects = [{
  projectId: 1,
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD'
}, {
  projectId: 2,
  projectCode: '22-0006',
  projectDescription: 'AltaPro Service Department'
}, {
  projectId: 3,
  projectCode: '24-0052',
  projectDescription: 'Grant MacEwan School'
}, {
  projectId: 4,
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD'
}];
const mockEntries = [
// Current week entries (June 23-29, 2025)
{
  entryId: 101,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-23',
  projectCode: '22-0006',
  projectDescription: 'AltaPro Service Department',
  extraValue: 'Default',
  costCode: '001-500-501',
  costCodeDescription: 'GENEXP-Vehicle Travel',
  standardHours: 3,
  overtimeHours: 0,
  totalHours: 3,
  status: 'Draft',
  notes: 'Site visit documentation',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-23T16:25:09'
}, {
  entryId: 102,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-24',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 2,
  totalHours: 10,
  status: 'Draft',
  notes: 'Installation work - Panel setup',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-24T08:00:00'
}, {
  entryId: 103,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-25',
  projectCode: '24-0052',
  projectDescription: 'Grant MacEwan School',
  extraValue: 'Default',
  costCode: '001-040-054',
  costCodeDescription: 'INDIRECT LAB-Employee Training',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Draft',
  notes: 'Safety training session',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-25T09:00:00'
},
// Last week entries (June 16-22, 2025)
{
  entryId: 91,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-16',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Submitted',
  notes: 'Phase 1 completion',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-16T08:00:00'
}, {
  entryId: 92,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-17',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 2',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 1,
  totalHours: 9,
  status: 'Submitted',
  notes: 'Phase 2 kickoff',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-17T08:00:00'
}, {
  entryId: 93,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-18',
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  extraValue: 'Default',
  costCode: '001-040-055',
  costCodeDescription: 'INDIRECT LAB-Safety Training',
  standardHours: 4,
  overtimeHours: 0,
  totalHours: 4,
  status: 'Submitted',
  notes: 'Safety meeting',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-18T08:00:00'
}, {
  entryId: 94,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-18',
  projectCode: '22-0006',
  projectDescription: 'AltaPro Service Department',
  extraValue: 'Default',
  costCode: '001-500-501',
  costCodeDescription: 'GENEXP-Vehicle Travel',
  standardHours: 4,
  overtimeHours: 0,
  totalHours: 4,
  status: 'Submitted',
  notes: 'Service calls',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-18T13:00:00'
}, {
  entryId: 95,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-19',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 2',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 3,
  totalHours: 11,
  status: 'Submitted',
  notes: 'Electrical connections setup',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-19T08:00:00'
}, {
  entryId: 96,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-20',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 2',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 2,
  totalHours: 10,
  status: 'Submitted',
  notes: 'System testing',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-20T08:00:00'
}, {
  entryId: 97,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-21',
  projectCode: '24-0052',
  projectDescription: 'Grant MacEwan School',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Submitted',
  notes: 'Installation prep',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-21T08:00:00'
},
// Two weeks ago (June 9-15, 2025)
{
  entryId: 80,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-09',
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'Site preparation',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-09T08:00:00'
}, {
  entryId: 81,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-10',
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 2,
  totalHours: 10,
  status: 'Approved',
  notes: 'Material handling',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-10T08:00:00'
}, {
  entryId: 82,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-11',
  projectCode: '22-0006',
  projectDescription: 'AltaPro Service Department',
  extraValue: 'Default',
  costCode: '001-040-054',
  costCodeDescription: 'INDIRECT LAB-Employee Training',
  standardHours: 6,
  overtimeHours: 0,
  totalHours: 6,
  status: 'Approved',
  notes: 'Team training',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-11T08:00:00'
}, {
  entryId: 83,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-12',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 4,
  totalHours: 12,
  status: 'Approved',
  notes: 'Panel installation - rush job',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-12T08:00:00'
}, {
  entryId: 84,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-13',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 2,
  totalHours: 10,
  status: 'Approved',
  notes: 'Wiring completion',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-13T08:00:00'
}, {
  entryId: 85,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-14',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'System testing and QA',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-14T08:00:00'
},
// Three weeks ago (June 2-8, 2025)
{
  entryId: 71,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-02',
  projectCode: '24-0052',
  projectDescription: 'Grant MacEwan School',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'Initial site survey',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-02T08:00:00'
}, {
  entryId: 72,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-03',
  projectCode: '24-0052',
  projectDescription: 'Grant MacEwan School',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 1,
  totalHours: 9,
  status: 'Approved',
  notes: 'Planning and design',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-03T08:00:00'
}, {
  entryId: 73,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-04',
  projectCode: '22-0006',
  projectDescription: 'AltaPro Service Department',
  extraValue: 'Default',
  costCode: '001-500-501',
  costCodeDescription: 'GENEXP-Vehicle Travel',
  standardHours: 5,
  overtimeHours: 0,
  totalHours: 5,
  status: 'Approved',
  notes: 'Emergency service calls',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-04T08:00:00'
}, {
  entryId: 74,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-05',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'Pre-installation prep',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-05T08:00:00'
}, {
  entryId: 75,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-06',
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  extraValue: 'Phase 1',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 2,
  totalHours: 10,
  status: 'Approved',
  notes: 'Material receiving and organization',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-06T08:00:00'
}, {
  entryId: 76,
  employeeId: 'GOLNIC',
  dateWorked: '2025-06-07',
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  extraValue: 'Default',
  costCode: '001-040-054',
  costCodeDescription: 'INDIRECT LAB-Employee Training',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'Team coordination meeting',
  createdBy: 'GOLNIC',
  createdDate: '2025-06-07T08:00:00'
},
// Four weeks ago (May 26 - June 1, 2025)
{
  entryId: 61,
  employeeId: 'GOLNIC',
  dateWorked: '2025-05-26',
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'Project kickoff',
  createdBy: 'GOLNIC',
  createdDate: '2025-05-26T08:00:00'
}, {
  entryId: 62,
  employeeId: 'GOLNIC',
  dateWorked: '2025-05-27',
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  extraValue: 'Default',
  costCode: '001-040-043',
  costCodeDescription: 'INDIRECT LAB-Direct Labor',
  standardHours: 8,
  overtimeHours: 0,
  totalHours: 8,
  status: 'Approved',
  notes: 'Initial planning',
  createdBy: 'GOLNIC',
  createdDate: '2025-05-27T08:00:00'
}];

// Status badge component
const StatusBadge = ({
  status
}) => {
  const variants = {
    Draft: {
      variant: 'outline',
      className: 'border-gray-300 text-gray-700'
    },
    Submitted: {
      variant: 'secondary',
      className: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    Approved: {
      variant: 'default',
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    Rejected: {
      variant: 'destructive',
      className: 'bg-red-100 text-red-700 border-red-200'
    }
  };
  const config = variants[status] || variants.Draft;
  return <Badge variant={config.variant} className={cn('text-xs', config.className)}>
      {status}
    </Badge>;
};

// Entry details dialog
const EntryDetailsDialog = ({
  entry,
  open,
  onOpenChange
}) => {
  if (!entry) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Timesheet Entry Details</span>
            <StatusBadge status={entry.status} />
          </DialogTitle>
          <DialogDescription>
            Entry ID: {entry.entryId} • Created on {formatDate(entry.createdDate, 'MMM dd, yyyy')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Date Worked</Label>
              <p className="font-medium">{formatDate(entry.dateWorked, 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Employee</Label>
              <p className="font-medium">{entry.employeeId}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Project</Label>
              <p className="font-medium">{entry.projectCode}</p>
              <p className="text-sm text-muted-foreground">{entry.projectDescription}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Extra</Label>
              <p className="font-medium">{entry.extraValue}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground">Cost Code</Label>
            <p className="font-medium">{entry.costCode}</p>
            <p className="text-sm text-muted-foreground">{entry.costCodeDescription}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Standard Hours</Label>
              <p className="font-medium text-blue-600">{entry.standardHours.toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Overtime Hours</Label>
              <p className="font-medium text-orange-600">{entry.overtimeHours.toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Total Hours</Label>
              <p className="font-medium text-green-600">{entry.totalHours.toFixed(2)}</p>
            </div>
          </div>
          
          {entry.notes && <div>
              <Label className="text-xs text-muted-foreground">Notes</Label>
              <p className="text-sm bg-muted p-2 rounded">{entry.notes}</p>
            </div>}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {entry.status === 'Draft' && <>
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </>}
        </DialogFooter>
      </DialogContent>
    </Dialog>;
};
export default function MyTimesheet() {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 30); // Show last 30 days by default
    return start;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('entries');

  // Filter entries based on criteria
  const filteredEntries = useMemo(() => {
    return mockEntries.filter(entry => {
      // Date filter
      const entryDate = new Date(entry.dateWorked);
      if (entryDate < startDate || entryDate > endDate) return false;

      // Project filter
      if (selectedProject !== 'all' && entry.projectCode !== selectedProject) return false;

      // Status filter
      if (selectedStatus !== 'all' && entry.status !== selectedStatus) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return entry.projectCode.toLowerCase().includes(query) || entry.projectDescription.toLowerCase().includes(query) || entry.costCode.toLowerCase().includes(query) || entry.costCodeDescription.toLowerCase().includes(query) || entry.notes?.toLowerCase().includes(query);
      }
      return true;
    });
  }, [startDate, endDate, selectedProject, selectedStatus, searchQuery]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const stats = filteredEntries.reduce((acc, entry) => {
      acc.totalHours += entry.totalHours;
      acc.standardHours += entry.standardHours;
      acc.overtimeHours += entry.overtimeHours;
      acc.entries += 1;
      return acc;
    }, {
      totalHours: 0,
      standardHours: 0,
      overtimeHours: 0,
      entries: 0
    });
    return stats;
  }, [filteredEntries]);

  // Calculate weekly summary data
  const weeklySummary = useMemo(() => {
    const weeks: Record<string, WeeklySummary> = {};
    filteredEntries.forEach(entry => {
      const date = new Date(entry.dateWorked);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekKey = formatDate(weekStart);
      if (!weeks[weekKey]) {
        weeks[weekKey] = {
          weekStart,
          weekEnd: new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
          days: {},
          totalStandard: 0,
          totalOvertime: 0,
          totalHours: 0,
          entries: 0,
          projects: new Set()
        };
      }
      const dayKey = date.getDay();
      if (!weeks[weekKey].days[dayKey]) {
        weeks[weekKey].days[dayKey] = {
          standard: 0,
          overtime: 0,
          entries: []
        };
      }
      weeks[weekKey].days[dayKey].standard += entry.standardHours;
      weeks[weekKey].days[dayKey].overtime += entry.overtimeHours;
      weeks[weekKey].days[dayKey].entries.push(entry);
      weeks[weekKey].totalStandard += entry.standardHours;
      weeks[weekKey].totalOvertime += entry.overtimeHours;
      weeks[weekKey].totalHours += entry.totalHours;
      weeks[weekKey].entries += 1;
      weeks[weekKey].projects.add(entry.projectCode);
    });
    return Object.values(weeks).sort((a, b) => b.weekStart.getTime() - a.weekStart.getTime());
  }, [filteredEntries]);
  const resetFilters = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 30); // Reset to last 30 days
    setStartDate(start);
    setEndDate(today);
    setSelectedProject('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };
  const handleEdit = entry => {
    if (entry.status === 'Draft') {
      // Navigate to edit page or open edit dialog
      console.log('Edit entry:', entry.entryId);
    }
  };
  const handleDelete = entry => {
    if (entry.status === 'Draft') {
      if (window.confirm(`Are you sure you want to delete entry ${entry.entryId}?`)) {
        console.log('Delete entry:', entry.entryId);
      }
    }
  };
  const handleViewDetails = entry => {
    setSelectedEntry(entry);
    setShowDetailsDialog(true);
  };
  return <div className="max-w-7xl mx-auto p-4 space-y-4 px-0 py-0">
      <Card>
        <CardContent className="p-6 px-[16px] py-[16px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">My Timesheet</h2>
                <p className="text-sm text-muted-foreground">View and manage your timesheet entries</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <User className="w-3 h-3 mr-1" />
                {mockUser.employeeId}
              </Badge>
              {mockUser.role === 'admin' && <Badge variant="secondary" className="text-xs">Admin View</Badge>}
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <Card className="border-2">
              <CardContent className="p-4 h-[80px] flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-muted-foreground mb-1">Total Hours</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalHours.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-blue-200 bg-blue-50/30">
              <CardContent className="p-4 h-[80px] flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-muted-foreground mb-1">Standard</p>
                    <p className="text-2xl font-bold text-blue-600">{statistics.standardHours.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Timer className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-orange-200 bg-orange-50/30">
              <CardContent className="p-4 h-[80px] flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-muted-foreground mb-1">Overtime</p>
                    <p className="text-2xl font-bold text-orange-600">{statistics.overtimeHours.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Timer className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardContent className="p-4 h-[80px] flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-muted-foreground mb-1">Entries</p>
                    <p className="text-2xl font-bold text-green-600">{statistics.entries}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="border-t pt-6 mb-6"></div>
          
          {/* Filters */}
          <div className="space-y-4 mb-6">
            {/* First Row: Dates and Project/Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs mb-1">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal h-9">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(startDate, 'MMM dd, yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} disabled={date => date > new Date()} />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label className="text-xs mb-1">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal h-9">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(endDate, 'MMM dd, yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} disabled={date => date > new Date() || date < startDate} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Project and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs mb-1">Project</Label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Projects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      {mockProjects.map(project => <SelectItem key={project.projectCode} value={project.projectCode}>
                          {project.projectCode}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs mb-1">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Submitted">Submitted</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Second Row: Search */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs mb-1">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search entries..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-8 h-9" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="grid max-w-md grid-cols-2">
                <TabsTrigger value="entries" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Entry Details
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Weekly Summary
                </TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm" onClick={resetFilters}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset Filters
              </Button>
            </div>
            
            {/* Entry Details Tab */}
            <TabsContent value="entries" className="space-y-4">
              <Card>
                <CardContent className="p-0">
                  <div className="border-b bg-gray-50 p-4">
                    <h3 className="font-semibold">Timesheet Entries</h3>
                  </div>
                  
                  {filteredEntries.length === 0 ? <div className="p-8 text-center text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
                      <p className="text-sm">Try adjusting your filters or date range</p>
                    </div> : <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Extra</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost Code</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Hours</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredEntries.map(entry => <tr key={entry.entryId} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 text-sm font-medium">{entry.entryId}</td>
                              <td className="px-4 py-3 text-sm">{formatDate(entry.dateWorked, 'MMM dd')}</td>
                              <td className="px-4 py-3 text-sm">
                                <div>
                                  <div className="font-medium">{entry.projectCode}</div>
                                  <div className="text-xs text-gray-500">{entry.projectDescription}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">{entry.extraValue}</td>
                              <td className="px-4 py-3 text-sm">
                                <div>
                                  <div className="font-medium">{entry.costCode}</div>
                                  <div className="text-xs text-gray-500 truncate max-w-[200px]">{entry.costCodeDescription}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm text-center">
                                <div className="flex flex-col items-center">
                                  <div className="flex items-center space-x-2">
                                    {entry.standardHours > 0 && <span className="text-blue-600 font-medium">{entry.standardHours}</span>}
                                    {entry.overtimeHours > 0 && <span className="text-orange-600 font-medium">+{entry.overtimeHours}</span>}
                                  </div>
                                  <div className="text-xs text-gray-500">Total: {entry.totalHours}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <StatusBadge status={entry.status} />
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center justify-center space-x-1">
                                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(entry)} className="h-8 w-8 p-0">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleEdit(entry)} disabled={entry.status !== 'Draft'} className="h-8 w-8 p-0">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(entry)} disabled={entry.status !== 'Draft'} className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Weekly Summary Tab */}
            <TabsContent value="summary" className="space-y-4">
              {weeklySummary.length === 0 ? <Card>
                  <CardContent className="p-8 text-center text-gray-500">
                    <CalendarDays className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No weekly data</h3>
                    <p className="text-sm">No timesheet entries found for the selected period</p>
                  </CardContent>
                </Card> : weeklySummary.map((week, weekIndex) => <Card key={weekIndex}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-semibold">
                            Week of {formatDate(week.weekStart, 'MMM dd')} - {formatDate(week.weekEnd, 'MMM dd, yyyy')}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {week.entries} entries • {week.projects.size} projects
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Total Hours</p>
                            <p className="text-2xl font-bold">{week.totalHours.toFixed(2)}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <div>
                                <p className="text-xs text-muted-foreground">Standard</p>
                                <p className="text-lg font-semibold text-blue-600">{week.totalStandard.toFixed(2)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">Overtime</p>
                                <p className="text-lg font-semibold text-orange-600">{week.totalOvertime.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Daily breakdown */}
                      <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => {
                    const dayData = week.days[dayIndex];
                    const hasData = dayData && (dayData.standard > 0 || dayData.overtime > 0);
                    return <div key={dayIndex} className={cn("border rounded-lg p-3 text-center transition-all", hasData ? "bg-gray-50 border-gray-300" : "border-gray-200")}>
                              <div className="text-xs font-medium text-gray-500 mb-1">{day}</div>
                              {hasData ? <>
                                  <div className="text-lg font-bold">
                                    {(dayData.standard + dayData.overtime).toFixed(1)}
                                  </div>
                                  <div className="text-xs space-y-1 mt-1">
                                    {dayData.standard > 0 && <div className="text-blue-600">Std: {dayData.standard.toFixed(1)}</div>}
                                    {dayData.overtime > 0 && <div className="text-orange-600">OT: {dayData.overtime.toFixed(1)}</div>}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {dayData.entries.length} {dayData.entries.length === 1 ? 'entry' : 'entries'}
                                  </div>
                                </> : <div className="text-gray-400 text-sm">-</div>}
                            </div>;
                  })}
                      </div>
                      
                      {/* Projects worked on this week */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm font-medium mb-2">Projects this week:</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(week.projects).map(projectCode => <Badge key={projectCode} variant="secondary" className="text-xs">
                              {projectCode}
                            </Badge>)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Entry Details Dialog */}
      <EntryDetailsDialog entry={selectedEntry} open={showDetailsDialog} onOpenChange={setShowDetailsDialog} />
    </div>;
}