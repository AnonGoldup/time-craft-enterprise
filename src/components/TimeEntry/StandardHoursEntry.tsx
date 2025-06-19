
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StandardHoursEntryProps {
  standardHours: string;
  setStandardHours: (hours: string) => void;
  overtimeHours: string;
  setOvertimeHours: (hours: string) => void;
  setQuickHours: (hours: number) => void;
}

const StandardHoursEntry: React.FC<StandardHoursEntryProps> = ({
  standardHours,
  setStandardHours,
  overtimeHours,
  setOvertimeHours,
  setQuickHours
}) => {
  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

  const handleStandardHoursChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
      setStandardHours(value);
    }
  };

  const handleOvertimeHoursChange = (value: string) => {
    const numValue = parseFloat(value);
    if (value === '' || (!isNaN(numValue) && numValue >= 0)) {
      setOvertimeHours(value);
    }
  };

  return (
    <div className="bg-card rounded-lg p-2 border">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Standard Hours */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded flex items-center justify-center">
            <span className="text-sm font-bold text-green-700">ST</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              step="0.1"
              min="0"
              value={standardHours}
              onChange={(e) => handleStandardHoursChange(e.target.value)}
              placeholder="8.0"
              className="w-16 h-9 text-center border-border focus:border-ring bg-muted/30"
            />
          </div>
          <span className="text-xs text-muted-foreground">hrs</span>
        </div>

        {/* Overtime Hours */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500/20 border border-amber-500/30 rounded flex items-center justify-center">
            <span className="text-sm font-bold text-amber-700">OT</span>
          </div>
          <div className="relative">
            <Input
              type="number"
              step="0.1"
              min="0"
              value={overtimeHours}
              onChange={(e) => handleOvertimeHoursChange(e.target.value)}
              placeholder="0.0"
              className="w-16 h-9 text-center border-border focus:border-ring bg-muted/30"
            />
          </div>
          <span className="text-xs text-muted-foreground">hrs</span>
        </div>

        {/* Total */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-primary">Total:</span>
          <div className="px-3 py-1 bg-primary/20 rounded border border-primary/30">
            <span className="text-sm font-semibold text-primary">{totalHours.toFixed(1)}h</span>
          </div>
        </div>

        {/* Quick Fill Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Quick:</span>
          {[4, 6, 8, 10, 12].map((hours) => (
            <Button
              key={hours}
              variant="outline"
              size="sm"
              onClick={() => setQuickHours(hours)}
              className="h-7 px-2 text-xs hover:bg-primary/10 hover:border-primary/30"
            >
              {hours}h
            </Button>
          ))}
        </div>

        {/* Submit Entry Button - positioned to the right */}
        <div className="ml-auto">
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
          >
            Submit Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StandardHoursEntry;
