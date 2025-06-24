
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { calculateWorkHours } from '@/utils/timeCalculations';

interface NotesAndSubmitRowProps {
  notes: string;
  setNotes: (notes: string) => void;
  showTotalHours?: boolean;
  timeInHour?: string;
  timeInMinute?: string;
  timeInPeriod?: 'AM' | 'PM';
  timeOutHour?: string;
  timeOutMinute?: string;
  timeOutPeriod?: 'AM' | 'PM';
  breakInHour?: string;
  breakInMinute?: string;
  breakInPeriod?: 'AM' | 'PM';
  breakOutHour?: string;
  breakOutMinute?: string;
  breakOutPeriod?: 'AM' | 'PM';
  onSubmit: () => void;
}

const NotesAndSubmitRow: React.FC<NotesAndSubmitRowProps> = ({
  notes,
  setNotes,
  showTotalHours = false,
  timeInHour = '',
  timeInMinute = '',
  timeInPeriod = 'AM',
  timeOutHour = '',
  timeOutMinute = '',
  timeOutPeriod = 'AM',
  breakInHour = '',
  breakInMinute = '',
  breakInPeriod = 'AM',
  breakOutHour = '',
  breakOutMinute = '',
  breakOutPeriod = 'AM',
  onSubmit
}) => {
  const calculateTotalHours = () => {
    if (!showTotalHours || !timeInHour || !timeOutHour) return null;
    
    const result = calculateWorkHours(
      { hour: timeInHour, minute: timeInMinute, period: timeInPeriod },
      { hour: timeOutHour, minute: timeOutMinute, period: timeOutPeriod },
      breakInHour ? { hour: breakInHour, minute: breakInMinute, period: breakInPeriod } : undefined,
      breakOutHour ? { hour: breakOutHour, minute: breakOutMinute, period: breakOutPeriod } : undefined
    );
    
    return result.isValid ? result.totalHours.toFixed(2) : '0.00';
  };

  const totalHours = calculateTotalHours();

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Notes</label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any additional notes..."
          className="min-h-[80px] resize-none"
        />
      </div>
      
      <div className="flex items-center justify-between">
        {showTotalHours && totalHours && (
          <Badge variant="outline" className="text-sm">
            Total Hours: {totalHours}
          </Badge>
        )}
        
        <Button 
          onClick={onSubmit}
          className="ml-auto bg-primary hover:bg-primary/90"
        >
          Submit Entry
        </Button>
      </div>
    </div>
  );
};

export default NotesAndSubmitRow;
