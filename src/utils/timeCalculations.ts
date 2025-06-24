
export interface TimeInput {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}

export interface TimeCalculationResult {
  totalHours: number;
  isValid: boolean;
  error?: string;
}

export const convertTo24Hour = (hour: string, minute: string, period: 'AM' | 'PM'): number => {
  const hour12 = parseInt(hour);
  const minutes = parseInt(minute) || 0;
  
  let hour24 = hour12;
  
  if (period === 'PM' && hour12 !== 12) hour24 += 12;
  if (period === 'AM' && hour12 === 12) hour24 = 0;
  
  return hour24 * 60 + minutes;
};

export const calculateWorkHours = (
  timeIn: TimeInput,
  timeOut: TimeInput,
  breakIn?: TimeInput,
  breakOut?: TimeInput
): TimeCalculationResult => {
  try {
    if (!timeIn.hour || !timeOut.hour) {
      return { totalHours: 0, isValid: false, error: 'Start and end times are required' };
    }
    
    const startTime = convertTo24Hour(timeIn.hour, timeIn.minute, timeIn.period);
    const endTime = convertTo24Hour(timeOut.hour, timeOut.minute, timeOut.period);
    
    let totalMinutes = endTime - startTime;
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle next day
    
    // Subtract break time if provided
    if (breakIn?.hour && breakOut?.hour) {
      const breakStart = convertTo24Hour(breakIn.hour, breakIn.minute, breakIn.period);
      const breakEnd = convertTo24Hour(breakOut.hour, breakOut.minute, breakOut.period);
      const breakDuration = breakEnd - breakStart;
      
      if (breakDuration > 0) {
        totalMinutes -= breakDuration;
      }
    }
    
    const totalHours = Math.max(0, totalMinutes / 60);
    
    return {
      totalHours,
      isValid: totalHours > 0 && totalHours <= 24,
      error: totalHours === 0 ? 'Invalid time range' : undefined
    };
  } catch (error) {
    return {
      totalHours: 0,
      isValid: false,
      error: 'Invalid time format'
    };
  }
};

export const formatTime = (hour: string, minute: string): string => {
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
};

export const validateTimeInput = (hour: string, minute: string): boolean => {
  const h = parseInt(hour);
  const m = parseInt(minute);
  return h >= 1 && h <= 12 && m >= 0 && m <= 59;
};
