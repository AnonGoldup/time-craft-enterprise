
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NotesAndSubmitRowProps {
  notes: string;
  setNotes: (value: string) => void;
  totalHours?: number;
  showTotalHours?: boolean;
  timeInHour?: string;
  timeInMinute?: string;
  timeInPeriod?: string;
  timeOutHour?: string;
  timeOutMinute?: string;
  timeOutPeriod?: string;
  breakInHour?: string;
  breakInMinute?: string;
  breakInPeriod?: string;
  breakOutHour?: string;
  breakOutMinute?: string;
  breakOutPeriod?: string;
}

const NotesAndSubmitRow: React.FC<NotesAndSubmitRowProps> = ({
  notes,
  setNotes,
  totalHours,
  showTotalHours = false,
  timeInHour,
  timeInMinute,
  timeInPeriod,
  timeOutHour,
  timeOutMinute,
  timeOutPeriod,
  breakInHour,
  breakInMinute,
  breakInPeriod,
  breakOutHour,
  breakOutMinute,
  breakOutPeriod
}) => {
  const convertTo24Hour = (hour: string, minute: string, period: string) => {
    if (!hour || !minute) return null;
    let h = parseInt(hour);
    const m = parseInt(minute);
    
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    
    return h * 60 + m; // Return minutes from midnight
  };

  const calculateTotalHours = () => {
    if (showTotalHours && timeInHour && timeInMinute && timeInPeriod && timeOutHour && timeOutMinute && timeOutPeriod) {
      const timeInMinutes = convertTo24Hour(timeInHour, timeInMinute, timeInPeriod);
      const timeOutMinutes = convertTo24Hour(timeOutHour, timeOutMinute, timeOutPeriod);
      
      if (timeInMinutes !== null && timeOutMinutes !== null) {
        let workMinutes = timeOutMinutes - timeInMinutes;
        
        // Calculate break time if provided
        if (breakInHour && breakInMinute && breakInPeriod && breakOutHour && breakOutMinute && breakOutPeriod) {
          const breakInMinutes = convertTo24Hour(breakInHour, breakInMinute, breakInPeriod);
          const breakOutMinutes = convertTo24Hour(breakOutHour, breakOutMinute, breakOutPeriod);
          
          if (breakInMinutes !== null && breakOutMinutes !== null) {
            const breakDuration = breakOutMinutes - breakInMinutes;
            workMinutes -= breakDuration;
          }
        }
        
        return Math.max(0, workMinutes / 60); // Convert to hours
      }
    }
    
    return totalHours || 0;
  };

  const calculatedHours = calculateTotalHours();

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Total Hours Display - only for Time In/Out */}
      {showTotalHours && (
        <>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded px-4 py-2">
            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Total Hours: {calculatedHours.toFixed(1)}
            </span>
          </div>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
        </>
      )}

      <div className="flex items-center gap-2 flex-1">
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[45px]">Notes:</span>
        <Input
          placeholder={showTotalHours ? "Add any notes here..." : "Add any notes or details about the work performed..."}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${showTotalHours ? 'flex-1 max-w-md' : 'flex-1 max-w-2xl'} border-slate-300 dark:border-slate-600`}
        />
      </div>

      <Button variant="outline" className="border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 px-6">
        Save Draft
      </Button>

      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
        Submit
      </Button>
    </div>
  );
};

export default NotesAndSubmitRow;
