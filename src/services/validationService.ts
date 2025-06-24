
import { timesheetApi } from './api';

export interface DuplicateCheckParams {
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  costCode: string;
  excludeEntryId?: number;
}

export interface DuplicateCheckResult {
  exists: boolean;
  existingEntry?: {
    entryID: number;
    hours: number;
    status: string;
  };
}

// Check for duplicate timesheet entries
export const checkDuplicateEntry = async (
  params: DuplicateCheckParams
): Promise<DuplicateCheckResult> => {
  try {
    // For now, return a mock implementation
    // In a real implementation, this would call the backend API
    console.log('Checking for duplicate entry:', params);
    
    // Mock implementation - in real app, this would be an API call
    return {
      exists: false
    };
  } catch (error) {
    console.error('Error checking for duplicate entry:', error);
    throw new Error('Failed to check for duplicate entries');
  }
};

// Validate a complete timesheet entry
export const validateTimesheetEntry = async (entry: {
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  entryId?: number;
}): Promise<{ isValid: boolean; errors: string[] }> => {
  const errors: string[] = [];
  
  // Check for duplicates
  const duplicateCheck = await checkDuplicateEntry({
    employeeId: entry.employeeId,
    dateWorked: entry.dateWorked,
    projectCode: entry.projectCode,
    costCode: entry.costCode,
    excludeEntryId: entry.entryId
  });
  
  if (duplicateCheck.exists) {
    errors.push('A duplicate entry already exists for this employee, date, project, and cost code');
  }
  
  // Validate hours
  const totalHours = entry.standardHours + entry.overtimeHours;
  if (totalHours > 16) {
    errors.push('Total hours cannot exceed 16 hours per day');
  }
  
  if (entry.standardHours % 0.25 !== 0 || entry.overtimeHours % 0.25 !== 0) {
    errors.push('Hours must be in quarter-hour increments (0.25)');
  }
  
  if (entry.standardHours < 0 || entry.overtimeHours < 0) {
    errors.push('Hours cannot be negative');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Batch validate multiple entries
export const validateMultipleEntries = async (
  entries: Array<{
    employeeId: string;
    dateWorked: string;
    projectCode: string;
    costCode: string;
    standardHours: number;
    overtimeHours: number;
    entryId?: number;
  }>
): Promise<{ isValid: boolean; entryErrors: Array<{ index: number; errors: string[] }> }> => {
  const entryErrors: Array<{ index: number; errors: string[] }> = [];
  
  for (let i = 0; i < entries.length; i++) {
    const validation = await validateTimesheetEntry(entries[i]);
    if (!validation.isValid) {
      entryErrors.push({
        index: i,
        errors: validation.errors
      });
    }
  }
  
  return {
    isValid: entryErrors.length === 0,
    entryErrors
  };
};
