import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface NotesAndSubmitRowProps {
  notes: string;
  setNotes: (value: string) => void;
  showTotalHours?: boolean;
  totalHours?: number;
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
  showTotalHours = false,
  totalHours,
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
  const calculateTotalHours = () => {
    if (!timeInHour || !timeOutHour || !timeInMinute || !timeOutMinute || !timeInPeriod || !timeOutPeriod) {
      return '0.00';
    }

    // Convert to 24-hour format
    let startHour = parseInt(timeInHour);
    if (timeInPeriod === 'PM' && startHour !== 12) startHour += 12;
    if (timeInPeriod === 'AM' && startHour === 12) startHour = 0;

    let endHour = parseInt(timeOutHour);
    if (timeOutPeriod === 'PM' && endHour !== 12) endHour += 12;
    if (timeOutPeriod === 'AM' && endHour === 12) endHour = 0;

    const startTime = startHour + parseInt(timeInMinute) / 60;
    const endTime = endHour + parseInt(timeOutMinute) / 60;

    let totalHours = endTime - startTime;

    // Calculate break time if provided
    if (breakInHour && breakOutHour && breakInMinute && breakOutMinute && breakInPeriod && breakOutPeriod) {
      let breakStartHour = parseInt(breakInHour);
      if (breakInPeriod === 'PM' && breakStartHour !== 12) breakStartHour += 12;
      if (breakInPeriod === 'AM' && breakStartHour === 12) breakStartHour = 0;

      let breakEndHour = parseInt(breakOutHour);
      if (breakOutPeriod === 'PM' && breakEndHour !== 12) breakEndHour += 12;
      if (breakOutPeriod === 'AM' && breakEndHour === 12) breakEndHour = 0;

      const breakStartTime = breakStartHour + parseInt(breakInMinute) / 60;
      const breakEndTime = breakEndHour + parseInt(breakOutMinute) / 60;
      const breakDuration = breakEndTime - breakStartTime;

      totalHours -= breakDuration;
    }

    return Math.max(0, totalHours).toFixed(2);
  };

  const getDisplayTotalHours = () => {
    // If totalHours is provided (from Standard Hours), use it
    if (totalHours !== undefined) {
      return totalHours.toFixed(2);
    }
    // Otherwise calculate from time values (for Time In/Out)
    return calculateTotalHours();
  };

  const calculateLineCount = () => {
    if (!notes) return 1;
    const lineBreaks = (notes.match(/\n/g) || []).length;
    const wrappedLines = Math.ceil(notes.length / 50); // Approximate character wrap
    return Math.max(1, Math.max(lineBreaks + 1, Math.min(wrappedLines, 4)));
  };

  return (
    <div className="space-y-4">
      {/* Notes Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Notes
        </label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this time entry..."
          className="resize-y border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          rows={calculateLineCount()}
          style={{ minHeight: '40px' }}
        />
      </div>

      {/* Total Hours and Submit Section */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
        {showTotalHours && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Hours:
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {getDisplayTotalHours()}
            </span>
          </div>
        )}
        
        <div className="ml-auto">
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Send className="h-4 w-4" />
            Submit Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesAndSubmitRow;
