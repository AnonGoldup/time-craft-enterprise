
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plug } from 'lucide-react';

interface BreakTimeSelectorProps {
  breakInHour: string;
  setBreakInHour: (value: string) => void;
  breakInMinute: string;
  setBreakInMinute: (value: string) => void;
  breakInPeriod: string;
  setBreakInPeriod: (value: string) => void;
  breakOutHour: string;
  setBreakOutHour: (value: string) => void;
  breakOutMinute: string;
  setBreakOutMinute: (value: string) => void;
  breakOutPeriod: string;
  setBreakOutPeriod: (value: string) => void;
}

const BreakTimeSelector: React.FC<BreakTimeSelectorProps> = ({
  breakInHour,
  setBreakInHour,
  breakInMinute,
  setBreakInMinute,
  breakInPeriod,
  setBreakInPeriod,
  breakOutHour,
  setBreakOutHour,
  breakOutMinute,
  setBreakOutMinute,
  breakOutPeriod,
  setBreakOutPeriod
}) => {
  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];

  const handleAddBreak = () => {
    console.log('Add another break clicked');
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[45px]">Break:</span>
        <div className="flex items-center gap-1">
          <Select value={breakInHour} onValueChange={setBreakInHour}>
            <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {hours.map(hour => (
                <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>:</span>
          <Select value={breakInMinute} onValueChange={setBreakInMinute}>
            <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {minutes.map(minute => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={breakInPeriod} onValueChange={setBreakInPeriod}>
            <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <span className="text-slate-400">-</span>

      <div className="flex items-center gap-1">
        <Select value={breakOutHour} onValueChange={setBreakOutHour}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {hours.map(hour => (
              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={breakOutMinute} onValueChange={setBreakOutMinute}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={breakOutPeriod} onValueChange={setBreakOutPeriod}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleAddBreak}
        className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600"
        title="Add another break"
      >
        <Plug className="h-4 w-4" />
      </Button>
    </>
  );
};

export default BreakTimeSelector;
