
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
