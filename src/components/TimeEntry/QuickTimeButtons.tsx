
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuickTimeButtonsProps {
  setQuickTime: (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => void;
}

const QuickTimeButtons: React.FC<QuickTimeButtonsProps> = ({ setQuickTime }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 dark:text-slate-400">Quick:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('6', 'AM', '2', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        title="6:00 AM - 2:30 PM (8 hours with 30min break)"
      >
        6-2:30
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('7', 'AM', '3', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        title="7:00 AM - 3:30 PM (8 hours with 30min break)"
      >
        7-3:30
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('8', 'AM', '4', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        title="8:00 AM - 4:30 PM (8 hours with 30min break)"
      >
        8-4:30
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('9', 'AM', '5', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        title="9:00 AM - 5:30 PM (8 hours with 30min break)"
      >
        9-5:30
      </Button>
    </div>
  );
};

export default QuickTimeButtons;
