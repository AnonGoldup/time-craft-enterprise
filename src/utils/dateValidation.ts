
import { parseISO, isAfter, isBefore, isToday } from 'date-fns';
import { isInLastWeek, isInCurrentWeek } from './weekCalculations';

export interface DateValidationResult {
  canModify: boolean;
  canCreate: boolean;
  reason?: string;
}

export interface ModificationRules {
  canModifyEntry: boolean;
  canCreateEntry: boolean;
  reason?: string;
}

// Check if an entry can be modified based on date and status
export const canModifyEntry = (
  entryDate: string | Date,
  entryStatus: 'Draft' | 'Submitted' | 'Approved' | 'Rejected'
): DateValidationResult => {
  const date = typeof entryDate === 'string' ? parseISO(entryDate) : entryDate;
  const today = new Date();
  
  // Cannot modify approved entries
  if (entryStatus === 'Approved') {
    return {
      canModify: false,
      canCreate: false,
      reason: "Cannot modify approved entries"
    };
  }
  
  // Can modify current week entries
  if (isInCurrentWeek(date)) {
    return {
      canModify: true,
      canCreate: true
    };
  }
  
  // Can modify last week entries
  if (isInLastWeek(date)) {
    return {
      canModify: true,
      canCreate: true
    };
  }
  
  // Cannot modify entries older than last week
  return {
    canModify: false,
    canCreate: false,
    reason: "Cannot modify entries older than last week"
  };
};

// Check if a new entry can be created for a specific date
export const canCreateEntryForDate = (date: string | Date): DateValidationResult => {
  const entryDate = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  
  // Cannot create entries for future dates
  if (isAfter(entryDate, today)) {
    return {
      canModify: false,
      canCreate: false,
      reason: "Cannot create entries for future dates"
    };
  }
  
  // Can create entries for current week
  if (isInCurrentWeek(entryDate)) {
    return {
      canModify: true,
      canCreate: true
    };
  }
  
  // Can create entries for last week
  if (isInLastWeek(entryDate)) {
    return {
      canModify: true,
      canCreate: true
    };
  }
  
  // Cannot create entries older than last week
  return {
    canModify: false,
    canCreate: false,
    reason: "Cannot create entries older than last week"
  };
};

// Validate if a date is within business rules
export const validateBusinessDate = (date: string | Date): DateValidationResult => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  
  // No future dates
  if (isAfter(checkDate, today)) {
    return {
      canModify: false,
      canCreate: false,
      reason: "Cannot select future dates"
    };
  }
  
  // Check modification rules
  return canCreateEntryForDate(checkDate);
};

// Get the oldest date that can be modified
export const getOldestModifiableDate = (): Date => {
  // Last week's Sunday
  const today = new Date();
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay()); // This week's Sunday
  
  const lastWeekStart = new Date(currentWeekStart);
  lastWeekStart.setDate(currentWeekStart.getDate() - 7); // Last week's Sunday
  
  return lastWeekStart;
};

// Get date range for date picker (last week to today)
export const getValidDateRange = (): { min: Date; max: Date } => {
  return {
    min: getOldestModifiableDate(),
    max: new Date()
  };
};
