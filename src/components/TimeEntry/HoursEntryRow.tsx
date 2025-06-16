
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock } from 'lucide-react';

interface HoursEntryRowProps {
  standardHours: string;
  setStandardHours: (value: string) => void;
  overtimeHours: string;
  setOvertimeHours: (value: string) => void;
  totalHours: number;
  setQuickHours: (hours: number) => void;
}

const HoursEntryRow: React.FC<HoursEntryRowProps> = ({
  standardHours,
  setStandardHours,
  overtimeHours,
  setOvertimeHours,
  totalHours,
  setQuickHours
}) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Standard Hours */}
      <div className="flex items-center gap-2">
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded px-4 py-2 flex items-center gap-2">
          <Clock className="h-4 w-4 text-emerald-600" />
          <span className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">ST:</span>
          <Input
            type="number"
            step="0.25"
            min="0"
            max="24"
            value={standardHours}
            onChange={(e) => setStandardHours(e.target.value)}
            className="w-16 text-center border-emerald-300 dark:border-emerald-700"
            placeholder="8.0"
          />
          <span className="text-sm text-emerald-600 dark:text-emerald-400">hrs</span>
        </div>
      </div>

      {/* Overtime Hours */}
      <div className="flex items-center gap-2">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded px-4 py-2 flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-800 dark:text-amber-300 font-medium">OT:</span>
          <Input
            type="number"
            step="0.25"
            min="0"
            max="24"
            value={overtimeHours}
            onChange={(e) => setOvertimeHours(e.target.value)}
            className="w-16 text-center border-amber-300 dark:border-amber-700"
            placeholder="0.0"
          />
          <span className="text-sm text-amber-600 dark:text-amber-400">hrs</span>
        </div>
      </div>

      {/* Total Hours Display */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded px-4 py-2">
        <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Total: {totalHours.toFixed(1)}h</span>
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      {/* Quick Fill Buttons */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400">Quick:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(4)}
          className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        >
          4h
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(8)}
          className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        >
          8h
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(10)}
          className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        >
          10h
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(12)}
          className="h-8 px-3 text-xs border-slate-300 dark:border-slate-600"
        >
          12h
        </Button>
      </div>
    </div>
  );
};

export default HoursEntryRow;
