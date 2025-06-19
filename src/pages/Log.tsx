
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { format, startOfWeek, endOfWeek, addWeeks } from 'date-fns';
import { toast } from 'sonner';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import TimeEntryEditForm from '@/components/TimeEntry/TimeEntryEditForm';
import LogFilters from '@/components/TimeEntry/LogFilters';
import LogSummaryCards from '@/components/TimeEntry/LogSummaryCards';
import LogTable from '@/components/TimeEntry/LogTable';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import { mockApiService } from '@/services/mockApiService';
import { Project } from '@/services/api';

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
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected' | 'Exported';
  entryType: 'Standard' | 'TimeInOut';
}

const Log = () => {
  const { user } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(user?.employeeId.toString() || '');
  const [selectedProject, setSelectedProject] = useState('all');
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const weekEndingDate = format(endOfWeek(currentWeek, { weekStartsOn: 1 }), 'yyyy-MM-dd');
  const { entries, loading, error, updateEntry, deleteEntry, refresh } = useTimesheetData(
    selectedEmployee, 
    weekEndingDate
  );

  // Transform timesheet entries to display format
  const timeEntries: TimeEntry[] = entries.map(entry => ({
    entryID: entry.entryID!,
    dateWorked: entry.dateWorked,
    projectCode: `PROJ${entry.projectID.toString().padStart(3, '0')}`,
    projectDescription: projects.find(p => p.projectID === entry.projectID)?.projectDescription || 'Unknown Project',
    extraValue: entry.extraID ? `Extra ${entry.extraID}` : undefined,
    costCode: `CC-${entry.costCodeID.toString().padStart(3, '0')}`,
    standardHours: entry.payID === 1 ? entry.hours : undefined,
    overtimeHours: entry.payID === 2 ? entry.hours : undefined,
    total: entry.hours,
    location: 'Site A', // Mock data
    comments: entry.notes,
    status: entry.status,
    entryType: entry.entryType as 'Standard' | 'TimeInOut'
  }));

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await mockApiService.projects.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to load projects:', error);
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

  const handleSaveEntry = async (updatedEntry: TimeEntry) => {
    try {
      await updateEntry(updatedEntry.entryID, {
        dateWorked: updatedEntry.dateWorked,
        hours: updatedEntry.total,
        notes: updatedEntry.comments
      });
      await refresh();
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
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
      await deleteEntry(entryID);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <p className="text-destructive text-lg font-medium">Error Loading Data</p>
          <p className="text-muted-foreground mt-2">{error}</p>
          <Button onClick={refresh} className="mt-4">
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

        {/* Filters */}
        <LogFilters
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          projects={projects}
          userFullName={user?.fullName || ''}
          getWeekRange={getWeekRange}
        />

        {/* Summary Cards */}
        <LogSummaryCards 
          timeEntries={timeEntries}
          getTotalHours={getTotalHours}
        />

        {/* Table */}
        <LogTable
          timeEntries={timeEntries}
          loading={loading}
          onEditEntry={handleEditEntry}
          onDeleteEntry={handleDeleteEntry}
        />

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
