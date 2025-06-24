
import { useState, useEffect } from 'react';
import { TimesheetEntry } from '@/services/api';

export const useTimesheetData = (employeeId: string, weekEndingDate: string) => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Mock data for now
    setEntries([]);
    setLoading(false);
    setError(null);
  }, [employeeId, weekEndingDate]);

  const updateEntry = async (entryId: number, updates: Partial<TimesheetEntry>) => {
    // Mock implementation
    console.log('Updating entry:', entryId, updates);
  };

  const deleteEntry = async (entryId: number) => {
    // Mock implementation
    console.log('Deleting entry:', entryId);
  };

  const refresh = async () => {
    // Mock implementation
    console.log('Refreshing timesheet data');
  };

  return {
    entries,
    loading,
    error,
    updateEntry,
    deleteEntry,
    refresh
  };
};
