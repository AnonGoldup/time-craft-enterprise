import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  FileText, 
  Clock, 
  User, 
  AlertCircle, 
  Filter, 
  Search, 
  RefreshCw, 
  Trash2, 
  Plus, 
  Eye, 
  Copy, 
  Edit3, 
  Building, 
  Hash, 
  Download,
  CheckCircle
} from 'lucide-react';
import { format, startOfWeek, endOfWeek, isToday } from 'date-fns';

interface TimesheetEntry {
  entryId: number;
  employeeId: string;
  employeeName: string;
  dateWorked: string;
  projectCode: string;
  projectDescription: string;
  extraValue: string;
  costCode: string;
  costCodeDescription: string;
  standardHours: number;
  overtimeHours: number;
  totalHours: number;
  notes?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  createdDate: string;
  createdBy: string;
}

interface WeekSummary {
  weekEndingDate: string;
  totalStandardHours: number;
  totalOvertimeHours: number;
  totalHours: number;
  entriesCount: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  dailyTotals: { [key: string]: number };
}

export const MyTimesheetsTab: React.FC = () => {
  // Mock data
  const mockEntries: TimesheetEntry[] = [
    {
      entryId: 1,
      employeeId: 'JSMITH',
      employeeName: 'John Smith',
      dateWorked: '2025-06-23',
      projectCode: '21-0066',
      projectDescription: 'Edmonton EXPO SOLAR IPD',
      extraValue: 'Default',
      costCode: '001-040-043',
      costCodeDescription: 'Direct Labor',
      standardHours: 8.0,
      overtimeHours: 0.0,
      totalHours: 8.0,
      notes: 'Regular work day',
      status: 'Draft',
      createdDate: '2025-06-23T08:30:00',
      createdBy: 'JSMITH'
    },
    {
      entryId: 2,
      employeeId: 'JSMITH',
      employeeName: 'John Smith',
      dateWorked: '2025-06-24',
      projectCode: '21-0066',
      projectDescription: 'Edmonton EXPO SOLAR IPD',
      extraValue: 'Phase 1',
      costCode: '001-040-043',
      costCodeDescription: 'Direct Labor',
      standardHours: 8.0,
      overtimeHours: 2.0,
      totalHours: 10.0,
      notes: 'Overtime to meet deadline',
      status: 'Draft',
      createdDate: '2025-06-24T08:30:00',
      createdBy: 'JSMITH'
    },
    {
      entryId: 3,
      employeeId: 'JSMITH',
      employeeName: 'John Smith',
      dateWorked: '2025-06-20',
      projectCode: '22-0006',
      projectDescription: 'AltaPro Service Department',
      extraValue: 'Default',
      costCode: '001-500-501',
      costCodeDescription: 'Vehicle Travel',
      standardHours: 4.0,
      overtimeHours: 0.0,
      totalHours: 4.0,
      notes: 'Site visit and travel',
      status: 'Submitted',
      createdDate: '2025-06-20T16:45:00',
      createdBy: 'JSMITH'
    }
  ];

  const mockWeekSummaries: WeekSummary[] = [
    {
      weekEndingDate: '2025-06-28',
      totalStandardHours: 40.0,
      totalOvertimeHours: 2.0,
      totalHours: 42.0,
      entriesCount: 6,
      status: 'Draft',
      dailyTotals: {
        '2025-06-23': 8.0,
        '2025-06-24': 10.0,
        '2025-06-25': 8.0,
        '2025-06-26': 8.0,
        '2025-06-27': 8.0
      }
    }
  ];

  // State
  const [allEntries] = useState<TimesheetEntry[]>(mockEntries);
  const [filteredEntries, setFilteredEntries] = useState<TimesheetEntry[]>(mockEntries);
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [showEntryModal, setShowEntryModal] = useState(false);
  
  // Filter state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Initialize dates
  useEffect(() => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    
    setStartDate(format(weekStart, 'yyyy-MM-dd'));
    setEndDate(format(weekEnd, 'yyyy-MM-dd'));
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = allEntries.filter(entry => {
      const matchesDateRange = (!startDate || entry.dateWorked >= startDate) && 
                             (!endDate || entry.dateWorked <= endDate);
      const matchesProject = !projectFilter || entry.projectCode.toLowerCase().includes(projectFilter.toLowerCase());
      const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
      const matchesSearch = !searchFilter || 
        entry.projectDescription.toLowerCase().includes(searchFilter.toLowerCase()) ||
        entry.costCodeDescription.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (entry.notes && entry.notes.toLowerCase().includes(searchFilter.toLowerCase()));
      
      return matchesDateRange && matchesProject && matchesStatus && matchesSearch;
    });
    
    setFilteredEntries(filtered);
  }, [allEntries, startDate, endDate, projectFilter, statusFilter, searchFilter]);

  // Helper functions
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), 'MMM dd');
  };

  const formatFullDate = (dateStr: string) => {
    return format(new Date(dateStr), 'EEEE, MMMM do, yyyy');
  };

  const formatDateTime = (dateStr: string) => {
    return format(new Date(dateStr), 'PPpp');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Draft': 'bg-gray-100 text-gray-800 border-gray-200',
      'Submitted': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Approved': 'bg-green-100 text-green-800 border-green-200',
      'Rejected': 'bg-red-100 text-red-800 border-red-200'
    };

    const icons = {
      'Draft': <Edit3 className="w-3 h-3" />,
      'Submitted': <Clock className="w-3 h-3" />,
      'Approved': <CheckCircle className="w-3 h-3" />,
      'Rejected': <AlertCircle className="w-3 h-3" />
    };
    
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border flex items-center gap-1`}>
        {icons[status as keyof typeof icons]}
        {status}
      </Badge>
    );
  };

  // Selection functions
  const toggleEntrySelection = (entryId: number) => {
    setSelectedEntries(prev => 
      prev.includes(entryId) 
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    );
  };

  const toggleSelectAll = () => {
    const draftEntries = filteredEntries.filter(e => e.status === 'Draft').map(e => e.entryId);
    
    if (selectedEntries.length === draftEntries.length) {
      setSelectedEntries([]);
    } else {
      setSelectedEntries(draftEntries);
    }
  };

  const selectAllDraft = () => {
    const draftEntries = filteredEntries.filter(e => e.status === 'Draft').map(e => e.entryId);
    setSelectedEntries(draftEntries);
  };

  const clearSelection = () => {
    setSelectedEntries([]);
  };

  // Entry operations
  const viewEntry = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setShowEntryModal(true);
  };

  const duplicateEntry = (entry: TimesheetEntry) => {
    console.log('Duplicating entry:', entry.entryId);
    // Implementation would create a new entry
  };

  const editEntry = (entry: TimesheetEntry) => {
    if (entry.status !== 'Draft') {
      alert('Only draft entries can be edited');
      return;
    }
    console.log('Editing entry:', entry.entryId);
    // Implementation would open edit form
  };

  const deleteEntry = (entry: TimesheetEntry) => {
    if (entry.status !== 'Draft') {
      alert('Only draft entries can be deleted');
      return;
    }
    
    if (confirm('Are you sure you want to delete this entry?')) {
      console.log('Deleting entry:', entry.entryId);
      // Implementation would delete entry
    }
  };

  const bulkDelete = () => {
    const draftEntries = selectedEntries.filter(id => {
      const entry = allEntries.find(e => e.entryId === id);
      return entry && entry.status === 'Draft';
    });

    if (draftEntries.length === 0) {
      alert('No draft entries selected for deletion');
      return;
    }

    if (confirm(`Delete ${draftEntries.length} selected entries?`)) {
      console.log('Bulk deleting entries:', draftEntries);
      // Implementation would delete entries
      setSelectedEntries([]);
    }
  };

  const resetFilters = () => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    const weekEnd = endOfWeek(today);
    
    setStartDate(format(weekStart, 'yyyy-MM-dd'));
    setEndDate(format(weekEnd, 'yyyy-MM-dd'));
    setProjectFilter('');
    setStatusFilter('all');
    setSearchFilter('');
  };

  // Calculate summary statistics
  const summaryStats = filteredEntries.reduce((acc, entry) => {
    acc.totalEntries += 1;
    acc.totalStandardHours += entry.standardHours;
    acc.totalOvertimeHours += entry.overtimeHours;
    acc.totalHours += entry.totalHours;
    return acc;
  }, {
    totalEntries: 0,
    totalStandardHours: 0,
    totalOvertimeHours: 0,
    totalHours: 0
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">My Timesheets</h3>
        </div>
        <p className="text-muted-foreground mt-1">View and manage your timesheet entries for the selected period</p>
      </CardContent>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">{summaryStats.totalHours.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Standard</p>
                <p className="text-2xl font-bold text-green-600">{summaryStats.totalStandardHours.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Overtime</p>
                <p className="text-2xl font-bold text-orange-600">{summaryStats.totalOvertimeHours.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Entries</p>
                <p className="text-2xl font-bold">{summaryStats.totalEntries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Project</label>
              <Input
                placeholder="Filter by project..."
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
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
            
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search entries..."
                  className="pl-9"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={resetFilters} className="flex items-center space-x-1">
              <RefreshCw className="h-4 w-4" />
              <span>Reset</span>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              Showing {filteredEntries.length} of {allEntries.length} entries
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Card>
        <Tabs defaultValue="entries" className="w-full">
          <div className="border-b">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entries">Entry Details</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Summary</TabsTrigger>
            </TabsList>
          </div>

          {/* Entry Details Tab */}
          <TabsContent value="entries" className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Timesheet Entries</h3>
              <div className="flex space-x-2">
                {selectedEntries.length > 0 && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={clearSelection}>
                      Clear ({selectedEntries.length})
                    </Button>
                    <Button variant="destructive" size="sm" onClick={bulkDelete}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Selected
                    </Button>
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={selectAllDraft}>
                  Select All Draft
                </Button>
              </div>
            </div>

            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No entries found</h3>
                <p className="text-muted-foreground mb-4">No timesheet entries match your current filters.</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Entry
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-2 p-3 bg-muted text-sm font-medium">
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={selectedEntries.length === filteredEntries.filter(e => e.status === 'Draft').length && filteredEntries.filter(e => e.status === 'Draft').length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-input"
                    />
                  </div>
                  <div className="col-span-1">Date</div>
                  <div className="col-span-2">Project</div>
                  <div className="col-span-1">Extra</div>
                  <div className="col-span-2">Cost Code</div>
                  <div className="col-span-1 text-right">Standard</div>
                  <div className="col-span-1 text-right">Overtime</div>
                  <div className="col-span-1 text-right">Total</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                
                {/* Table Body */}
                {filteredEntries.map(entry => (
                  <div
                    key={entry.entryId}
                    className={`grid grid-cols-12 gap-2 p-3 hover:bg-muted/50 border rounded ${
                      selectedEntries.includes(entry.entryId) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEntries.includes(entry.entryId)}
                        onChange={() => toggleEntrySelection(entry.entryId)}
                        disabled={entry.status !== 'Draft'}
                        className="rounded border-input"
                      />
                    </div>
                    <div className="col-span-1 flex items-center font-medium">
                      {formatDate(entry.dateWorked)}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center space-x-1">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        <div className="min-w-0">
                          <div className="font-medium text-sm">{entry.projectCode}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {entry.projectDescription}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <Badge variant="secondary" className="text-xs">
                        {entry.extraValue}
                      </Badge>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center space-x-1">
                        <Hash className="h-3 w-3 text-muted-foreground" />
                        <div className="min-w-0">
                          <div className="font-medium text-sm">{entry.costCode}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {entry.costCodeDescription}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1 text-right font-mono flex items-center justify-end">
                      {entry.standardHours.toFixed(2)}
                    </div>
                    <div className="col-span-1 text-right font-mono text-orange-600 flex items-center justify-end">
                      {entry.overtimeHours.toFixed(2)}
                    </div>
                    <div className="col-span-1 text-right font-mono font-semibold flex items-center justify-end">
                      {entry.totalHours.toFixed(2)}
                    </div>
                    <div className="col-span-1 flex items-center">
                      {getStatusBadge(entry.status)}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => viewEntry(entry)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateEntry(entry)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        {entry.status === 'Draft' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => editEntry(entry)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEntry(entry)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Weekly Summary Tab */}
          <TabsContent value="weekly" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Weekly Summaries</h3>
              <p className="text-muted-foreground">View weekly timesheet summaries and submission status</p>
            </div>
            
            <div className="space-y-4">
              {mockWeekSummaries.map((week, index) => {
                const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const todayStr = format(new Date(), 'yyyy-MM-dd');
                
                return (
                  <Card key={index}>
                    <div className="p-6 border-b">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold">
                          Week Ending {formatFullDate(week.weekEndingDate)}
                        </h4>
                        {getStatusBadge(week.status)}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Summary Statistics */}
                        <div className="space-y-4">
                          <h5 className="font-semibold">Summary</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Total Entries</p>
                              <p className="text-2xl font-bold">{week.entriesCount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Hours</p>
                              <p className="text-2xl font-bold">{week.totalHours.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Standard Hours</p>
                              <p className="text-xl font-semibold text-green-600">{week.totalStandardHours.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Overtime Hours</p>
                              <p className="text-xl font-semibold text-orange-600">{week.totalOvertimeHours.toFixed(1)}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Daily Breakdown */}
                        <div className="space-y-4">
                          <h5 className="font-semibold">Daily Breakdown</h5>
                          <div className="grid grid-cols-7 gap-2 text-center">
                            {weekDays.map((day, dayIndex) => {
                              const weekEndDate = new Date(week.weekEndingDate);
                              const dayDate = new Date(weekEndDate);
                              dayDate.setDate(weekEndDate.getDate() - (6 - dayIndex));
                              const dayKey = format(dayDate, 'yyyy-MM-dd');
                              
                              const hours = week.dailyTotals[dayKey] || 0;
                              const isToday = dayKey === todayStr;
                              
                              return (
                                <div key={dayIndex} className="space-y-1">
                                  <div className={`text-xs font-medium ${
                                    isToday ? "text-blue-600" : "text-muted-foreground"
                                  }`}>
                                    {day}
                                  </div>
                                  <div className={`text-sm font-semibold p-2 rounded ${
                                    hours > 0 ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"
                                  }`}>
                                    {hours > 0 ? hours.toFixed(1) : '-'}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-between items-center mt-6 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          {week.status === 'Draft' ? 'Ready to submit for approval' : 
                           week.status === 'Submitted' ? 'Awaiting manager approval' : 
                           'Approved and ready for payroll'}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Export CSV
                          </Button>
                          {week.status === 'Draft' && (
                            <Button size="sm">
                              Submit for Approval
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Entry Details Modal */}
      <Dialog open={showEntryModal} onOpenChange={setShowEntryModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Entry Details</DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Employee</label>
                  <p className="text-sm">{selectedEntry.employeeName} ({selectedEntry.employeeId})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Date Worked</label>
                  <p className="text-sm">{formatFullDate(selectedEntry.dateWorked)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Project</label>
                  <p className="text-sm">{selectedEntry.projectCode} - {selectedEntry.projectDescription}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Extra</label>
                  <p className="text-sm">{selectedEntry.extraValue}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Cost Code</label>
                  <p className="text-sm">{selectedEntry.costCode} - {selectedEntry.costCodeDescription}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Status</label>
                  <div className="pt-1">{getStatusBadge(selectedEntry.status)}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Standard Hours</label>
                  <p className="text-lg font-semibold">{selectedEntry.standardHours.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Overtime Hours</label>
                  <p className="text-lg font-semibold text-orange-600">{selectedEntry.overtimeHours.toFixed(2)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Total Hours</label>
                  <p className="text-lg font-semibold text-blue-600">{selectedEntry.totalHours.toFixed(2)}</p>
                </div>
              </div>
              {selectedEntry.notes && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-sm bg-muted p-2 rounded">{selectedEntry.notes}</p>
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Created: {formatDateTime(selectedEntry.createdDate)} by {selectedEntry.createdBy}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
