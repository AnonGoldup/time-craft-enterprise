
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
      >
        6-2
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('7', 'AM', '3', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
      >
        7-3
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('8', 'AM', '4', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
      >
        8-4
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setQuickTime('9', 'AM', '5', 'PM')}
        className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
      >
        9-5
      </Button>
    </div>
  );
};

export default QuickTimeButtons;
