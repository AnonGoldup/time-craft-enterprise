
import { useState, useEffect } from 'react';
import { mockApiService } from '@/services/mockApiService';
import { TimesheetEntry, TimesheetSubmission } from '@/services/api';
import { toast } from 'sonner';

export const useTimesheetData = (employeeId: string, weekEnding?: string) => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [submissions, setSubmissions] = useState<TimesheetSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (employeeId) {
      loadTimesheetData();
    }
  }, [employeeId, weekEnding]);

  const loadTimesheetData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [entriesResponse, submissionsResponse] = await Promise.all([
        mockApiService.timesheets.getEntries(employeeId, weekEnding),
        mockApiService.timesheets.getPendingApprovals()
      ]);
      
      setEntries(entriesResponse.data);
      setSubmissions(submissionsResponse.data.filter(sub => sub.employeeID === employeeId));
    } catch (err) {
      setError('Failed to load timesheet data');
      console.error('Timesheet data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEntry = async (entryData: Omit<TimesheetEntry, 'entryID'>) => {
    try {
      const response = await mockApiService.timesheets.createEntry(entryData);
      setEntries(prev => [...prev, response.data]);
      toast.success('Time entry created successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to create time entry');
      throw error;
    }
  };

  const updateEntry = async (entryId: number, updates: Partial<TimesheetEntry>) => {
    try {
      const response = await mockApiService.timesheets.updateEntry(entryId, updates);
      setEntries(prev => prev.map(entry => 
        entry.entryID === entryId ? response.data : entry
      ));
      toast.success('Time entry updated successfully');
      return response.data;
    } catch (error) {
      toast.error('Failed to update time entry');
      throw error;
    }
  };

  const deleteEntry = async (entryId: number) => {
    try {
      await mockApiService.timesheets.deleteEntry(entryId);
      setEntries(prev => prev.filter(entry => entry.entryID !== entryId));
      toast.success('Time entry deleted successfully');
    } catch (error) {
      toast.error('Failed to delete time entry');
      throw error;
    }
  };

  const submitWeek = async (weekEndingDate: string) => {
    try {
      const response = await mockApiService.timesheets.submitWeek(employeeId, weekEndingDate);
      setSubmissions(prev => [...prev, response.data]);
      toast.success('Timesheet submitted for approval');
      return response.data;
    } catch (error) {
      toast.error('Failed to submit timesheet');
      throw error;
    }
  };

  return {
    entries,
    submissions,
    loading,
    error,
    createEntry,
    updateEntry,
    deleteEntry,
    submitWeek,
    refresh: loadTimesheetData
  };
};
