
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface NotesAndSubmitRowProps {
  notes: string;
  setNotes: (notes: string) => void;
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
  onSubmit?: () => void;
}

const NotesAndSubmitRow: React.FC<NotesAndSubmitRowProps> = ({
  notes,
  setNotes,
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
  breakOutPeriod,
  onSubmit
}) => {
  // Calculate total hours for Time In/Out display
  const calculateTotalHours = () => {
    if (!timeInHour || !timeOutHour) return 0;
    
    const timeInHour12 = parseInt(timeInHour);
    const timeOutHour12 = parseInt(timeOutHour);
    const timeInMinutes = parseInt(timeInMinute || '0');
    const timeOutMinutes = parseInt(timeOutMinute || '0');
    
    // Convert to 24-hour format
    let timeIn24 = timeInHour12;
    let timeOut24 = timeOutHour12;
    
    if (timeInPeriod === 'PM' && timeInHour12 !== 12) timeIn24 += 12;
    if (timeInPeriod === 'AM' && timeInHour12 === 12) timeIn24 = 0;
    if (timeOutPeriod === 'PM' && timeOutHour12 !== 12) timeOut24 += 12;
    if (timeOutPeriod === 'AM' && timeOutHour12 === 12) timeOut24 = 0;
    
    const startTime = timeIn24 * 60 + timeInMinutes;
    const endTime = timeOut24 * 60 + timeOutMinutes;
    
    let totalMinutes = endTime - startTime;
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle next day
    
    // Subtract break time if provided
    if (breakInHour && breakOutHour) {
      const breakInHour12 = parseInt(breakInHour);
      const breakOutHour12 = parseInt(breakOutHour);
      const breakInMinutes = parseInt(breakInMinute || '0');
      const breakOutMinutes = parseInt(breakOutMinute || '0');
      
      let breakIn24 = breakInHour12;
      let breakOut24 = breakOutHour12;
      
      if (breakInPeriod === 'PM' && breakInHour12 !== 12) breakIn24 += 12;
      if (breakInPeriod === 'AM' && breakInHour12 === 12) breakIn24 = 0;
      if (breakOutPeriod === 'PM' && breakOutHour12 !== 12) breakOut24 += 12;
      if (breakOutPeriod === 'AM' && breakOutHour12 === 12) breakOut24 = 0;
      
      const breakStart = breakIn24 * 60 + breakInMinutes;
      const breakEnd = breakOut24 * 60 + breakOutMinutes;
      const breakDuration = breakEnd - breakStart;
      
      if (breakDuration > 0) {
        totalMinutes -= breakDuration;
      }
    }
    
    return Math.max(0, totalMinutes / 60);
  };

  const totalHours = showTotalHours ? calculateTotalHours() : 0;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this time entry..."
          className="min-h-[80px] resize-none border-border focus:border-ring bg-background"
        />
      </div>

      <div className="flex items-center justify-between">
        {showTotalHours && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Total Hours:</span>
            <div className="px-3 py-1 bg-primary/20 rounded border border-primary/30">
              <span className="text-sm font-semibold text-primary">{totalHours.toFixed(2)}h</span>
            </div>
          </div>
        )}
        
        <Button 
          onClick={onSubmit}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Send className="h-4 w-4" />
          Submit Entry
        </Button>
      </div>
    </div>
  );
};

export default NotesAndSubmitRow;
