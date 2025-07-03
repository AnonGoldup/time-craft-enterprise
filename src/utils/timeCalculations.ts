
import { parseISO, differenceInMinutes, addDays, format, isBefore, isAfter, startOfDay, endOfDay } from 'date-fns';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errors?: string[];
}

export interface SplitShift {
  date: string;
  timeIn: string;
  timeOut: string;
  breakMinutes: number;
  hours: number;
}

export interface Break {
  startTime: string;
  endTime: string;
  duration: number; // in minutes
}

// Round to nearest quarter hour (0.25)
export const roundToQuarter = (hours: number): number => {
  return Math.round(hours * 4) / 4;
};

// Parse time string (HH:mm) to minutes since midnight
export const parseTimeToMinutes = (timeString: string): number => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

// Convert minutes since midnight back to HH:mm format
export const minutesToTimeString = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

// Calculate hours from time in/out with breaks
export const calculateHoursFromTimeInOut = (
  timeIn: string,
  timeOut: string,
  breakMinutes: number = 0
): number => {
  const startMinutes = parseTimeToMinutes(timeIn);
  let endMinutes = parseTimeToMinutes(timeOut);
  
  // Handle cross-midnight (end time is next day)
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours
  }
  
  const totalMinutes = endMinutes - startMinutes - breakMinutes;
  const hours = totalMinutes / 60;
  return roundToQuarter(Math.max(0, hours));
};

// Maximum 16 hours per day validation
export const validateDailyHours = (
  standardHours: number,
  overtimeHours: number
): ValidationResult => {
  const total = standardHours + overtimeHours;
  if (total > 16) {
    return {
      isValid: false,
      error: `Total hours (${total}) exceeds maximum 16 hours per day`
    };
  }
  return { isValid: true };
};

// Validate quarter hour increments
export const validateQuarterHours = (hours: number): ValidationResult => {
  if (hours % 0.25 !== 0) {
    return {
      isValid: false,
      error: 'Hours must be in quarter-hour increments (0.25)'
    };
  }
  return { isValid: true };
};

// Split cross-midnight shift into two entries
export const splitCrossMidnightShift = (
  dateIn: string,
  timeIn: string,
  timeOut: string,
  breaks: Break[] = []
): SplitShift[] => {
  const startMinutes = parseTimeToMinutes(timeIn);
  const endMinutes = parseTimeToMinutes(timeOut);
  
  // Check if shift crosses midnight
  if (endMinutes > startMinutes) {
    // Single day shift - no splitting needed
    const totalBreakMinutes = breaks.reduce((sum, b) => sum + b.duration, 0);
    const hours = calculateHoursFromTimeInOut(timeIn, timeOut, totalBreakMinutes);
    
    return [{
      date: dateIn,
      timeIn: timeIn,
      timeOut: timeOut,
      breakMinutes: totalBreakMinutes,
      hours
    }];
  }
  
  // Cross-midnight shift - split into two entries
  const totalBreakMinutes = breaks.reduce((sum, b) => sum + b.duration, 0);
  
  // Calculate minutes for each day
  const firstDayMinutes = (24 * 60) - startMinutes; // From start time to midnight
  const secondDayMinutes = endMinutes; // From midnight to end time
  const totalMinutes = firstDayMinutes + secondDayMinutes;
  
  // Allocate breaks proportionally
  const firstDayBreaks = Math.round((firstDayMinutes / totalMinutes) * totalBreakMinutes);
  const secondDayBreaks = totalBreakMinutes - firstDayBreaks;
  
  // Calculate hours for each day
  const firstDayHours = roundToQuarter((firstDayMinutes - firstDayBreaks) / 60);
  const secondDayHours = roundToQuarter((secondDayMinutes - secondDayBreaks) / 60);
  
  const nextDate = format(addDays(parseISO(dateIn), 1), 'yyyy-MM-dd');
  
  return [
    {
      date: dateIn,
      timeIn: timeIn,
      timeOut: "23:59",
      breakMinutes: firstDayBreaks,
      hours: firstDayHours
    },
    {
      date: nextDate,
      timeIn: "00:00",
      timeOut: timeOut,
      breakMinutes: secondDayBreaks,
      hours: secondDayHours
    }
  ];
};

// Check if a shift crosses midnight
export const crossesMidnight = (timeIn: string, timeOut: string): boolean => {
  const startMinutes = parseTimeToMinutes(timeIn);
  const endMinutes = parseTimeToMinutes(timeOut);
  return endMinutes <= startMinutes;
};

// Validate time format (HH:mm)
export const validateTimeFormat = (time: string): ValidationResult => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return {
      isValid: false,
      error: 'Time must be in HH:mm format (24-hour)'
    };
  }
  return { isValid: true };
};

// Calculate total break time from break periods
export const calculateTotalBreakTime = (breaks: Break[]): number => {
  return breaks.reduce((total, breakPeriod) => {
    const startMinutes = parseTimeToMinutes(breakPeriod.startTime);
    let endMinutes = parseTimeToMinutes(breakPeriod.endTime);
    
    // Handle breaks that cross midnight
    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }
    
    return total + (endMinutes - startMinutes);
  }, 0);
};

// Format duration in minutes to human readable format
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
};

// Calculate duration between two time strings
export const calculateDuration = (timeIn: string, timeOut: string): number => {
  const startMinutes = parseTimeToMinutes(timeIn);
  let endMinutes = parseTimeToMinutes(timeOut);
  
  // Handle cross-midnight
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60;
  }
  
  return endMinutes - startMinutes;
};
