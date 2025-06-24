
import { startOfWeek, endOfWeek, getWeek, isAfter, isBefore, parseISO, format, addDays, subWeeks } from 'date-fns';

export interface WeekBoundaries {
  start: Date;
  end: Date;
  weekEndingDate: Date;
  weekNumber: number;
}

export interface WeekValidationResult {
  canSubmit: boolean;
  reason?: string;
}

// Get week boundaries (Sunday to Saturday)
export const getWeekBoundaries = (date: Date = new Date()): WeekBoundaries => {
  // Week runs Sunday to Saturday
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // Sunday
  const weekEnd = endOfWeek(date, { weekStartsOn: 0 }); // Saturday
  
  return {
    start: weekStart,
    end: weekEnd,
    weekEndingDate: weekEnd, // Saturday
    weekNumber: getWeek(date, { weekStartsOn: 0 })
  };
};

// Check if a date is in the current week
export const isInCurrentWeek = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  const currentWeek = getWeekBoundaries();
  
  return !isBefore(checkDate, currentWeek.start) && !isAfter(checkDate, currentWeek.end);
};

// Check if a date is in the previous week (last week)
export const isInLastWeek = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? parseISO(date) : date;
  const lastWeek = getWeekBoundaries(subWeeks(new Date(), 1));
  
  return !isBefore(checkDate, lastWeek.start) && !isAfter(checkDate, lastWeek.end);
};

// Get the week ending date for a given date
export const getWeekEndingDate = (date: Date | string): Date => {
  const workingDate = typeof date === 'string' ? parseISO(date) : date;
  return getWeekBoundaries(workingDate).weekEndingDate;
};

// Format week ending date for display
export const formatWeekEndingDate = (date: Date | string): string => {
  const weekEndingDate = typeof date === 'string' ? parseISO(date) : date;
  return format(getWeekEndingDate(weekEndingDate), 'MM/dd/yyyy');
};

// Get all dates in a week
export const getWeekDates = (weekEndingDate: Date): Date[] => {
  const weekBoundaries = getWeekBoundaries(weekEndingDate);
  const dates: Date[] = [];
  
  for (let i = 0; i < 7; i++) {
    dates.push(addDays(weekBoundaries.start, i));
  }
  
  return dates;
};

// Check if week can be submitted
export const canSubmitWeek = (weekEndingDate: Date): WeekValidationResult => {
  const today = new Date();
  
  // Cannot submit future weeks
  if (isAfter(weekEndingDate, today)) {
    return {
      canSubmit: false,
      reason: "Cannot submit future weeks"
    };
  }
  
  return { canSubmit: true };
};

// Get the current week ending date
export const getCurrentWeekEndingDate = (): Date => {
  return getWeekBoundaries().weekEndingDate;
};

// Get the previous week ending date
export const getPreviousWeekEndingDate = (): Date => {
  const lastWeek = subWeeks(new Date(), 1);
  return getWeekBoundaries(lastWeek).weekEndingDate;
};

// Format week range for display (e.g., "12/15/2024 - 12/21/2024")
export const formatWeekRange = (weekEndingDate: Date): string => {
  const weekBoundaries = getWeekBoundaries(weekEndingDate);
  const startFormatted = format(weekBoundaries.start, 'MM/dd/yyyy');
  const endFormatted = format(weekBoundaries.end, 'MM/dd/yyyy');
  return `${startFormatted} - ${endFormatted}`;
};
