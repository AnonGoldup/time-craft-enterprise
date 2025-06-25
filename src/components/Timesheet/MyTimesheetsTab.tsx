
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart3, User } from 'lucide-react';

// Import components
import { StatisticsCards } from './MyTimesheets/StatisticsCards';
import { FiltersSection } from './MyTimesheets/FiltersSection';
import { EntryDetailsTable } from './MyTimesheets/EntryDetailsTable';
import { WeeklySummaryView } from './MyTimesheets/WeeklySummaryView';
import { EntryDetailsDialog } from './MyTimesheets/EntryDetailsDialog';

// Import types and data
import { TimesheetEntry, WeeklySummary, DayData, Statistics } from './MyTimesheets/types';
import { mockUser, mockProjects, mockEntries } from './MyTimesheets/mockData';
import { formatDate } from './MyTimesheets/utils';

const MyTimesheetsTab: React.FC = () => {
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
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('entries');

  // Filter entries based on criteria
  const filteredEntries = useMemo(() => {
    return mockEntries.filter((entry) => {
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
        return (
          entry.projectCode.toLowerCase().includes(query) ||
          entry.projectDescription.toLowerCase().includes(query) ||
          entry.costCode.toLowerCase().includes(query) ||
          entry.costCodeDescription.toLowerCase().includes(query) ||
          entry.notes?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [startDate, endDate, selectedProject, selectedStatus, searchQuery]);

  // Calculate statistics
  const statistics: Statistics = useMemo(() => {
    const stats = filteredEntries.reduce(
      (acc, entry) => {
        acc.totalHours += entry.totalHours;
        acc.standardHours += entry.standardHours;
        acc.overtimeHours += entry.overtimeHours;
        acc.entries += 1;
        return acc;
      },
      {
        totalHours: 0,
        standardHours: 0,
        overtimeHours: 0,
        entries: 0
      }
    );
    return stats;
  }, [filteredEntries]);

  // Calculate weekly summary data
  const weeklySummary: WeeklySummary[] = useMemo(() => {
    const weeks: Record<string, WeeklySummary> = {};
    
    filteredEntries.forEach((entry) => {
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

  const handleEdit = (entry: TimesheetEntry) => {
    if (entry.status === 'Draft') {
      // Navigate to edit page or open edit dialog
      console.log('Edit entry:', entry.entryId);
    }
  };

  const handleDelete = (entry: TimesheetEntry) => {
    if (entry.status === 'Draft') {
      if (window.confirm(`Are you sure you want to delete entry ${entry.entryId}?`)) {
        console.log('Delete entry:', entry.entryId);
      }
    }
  };

  const handleViewDetails = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setShowDetailsDialog(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4 px-0 py-0">
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
              {mockUser.role === 'admin' && (
                <Badge variant="secondary" className="text-xs">Admin View</Badge>
              )}
            </div>
          </div>
          
          {/* Statistics */}
          <StatisticsCards statistics={statistics} />
          
          <div className="border-t pt-6 mb-6"></div>
          
          {/* Filters */}
          <FiltersSection
            startDate={startDate}
            endDate={endDate}
            selectedProject={selectedProject}
            selectedStatus={selectedStatus}
            searchQuery={searchQuery}
            mockProjects={mockProjects}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onProjectChange={setSelectedProject}
            onStatusChange={setSelectedStatus}
            onSearchChange={setSearchQuery}
            onResetFilters={resetFilters}
          />
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
            
            {/* Entry Details Tab */}
            <TabsContent value="entries" className="space-y-4">
              <EntryDetailsTable
                entries={filteredEntries}
                onViewDetails={handleViewDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </TabsContent>
            
            {/* Weekly Summary Tab */}
            <TabsContent value="summary" className="space-y-4">
              <WeeklySummaryView weeklySummary={weeklySummary} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Entry Details Dialog */}
      <EntryDetailsDialog 
        entry={selectedEntry} 
        open={showDetailsDialog} 
        onOpenChange={setShowDetailsDialog} 
      />
    </div>
  );
};

export default MyTimesheetsTab;
