
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface HoursEntryRowProps {
  standardHours: string;
  setStandardHours: (value: string) => void;
  overtimeHours: string;
  setOvertimeHours: (value: string) => void;
}

const HoursEntryRow: React.FC<HoursEntryRowProps> = ({
  standardHours,
  setStandardHours,
  overtimeHours,
  setOvertimeHours
}) => {
  const setQuickHours = (hours: number) => {
    setStandardHours(hours.toString());
  };

  return (
    <div className="space-y-4">
      {/* Hours Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm text-slate-600 dark:text-slate-400">Standard Hours</Label>
          <div className="flex gap-1">
            <Input
              type="number"
              step="0.25"
              min="0"
              max="24"
              placeholder="8.0"
              value={standardHours}
              onChange={(e) => setStandardHours(e.target.value)}
              className="border-slate-300 dark:border-slate-600"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStandardHours("")}
              className="px-2 border-slate-300 dark:border-slate-600"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-slate-600 dark:text-slate-400">Overtime Hours</Label>
          <div className="flex gap-1">
            <Input
              type="number"
              step="0.25"
              min="0"
              max="24"
              placeholder="0.0"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(e.target.value)}
              className="border-slate-300 dark:border-slate-600"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOvertimeHours("")}
              className="px-2 border-slate-300 dark:border-slate-600"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Hour Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(8)}
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          8 hrs
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(10)}
          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
        >
          10 hrs
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(12)}
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
        >
          12 hrs
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setStandardHours("");
            setOvertimeHours("");
          }}
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default HoursEntryRow;
