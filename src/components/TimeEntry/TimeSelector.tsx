
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeSelectorProps {
  hour: string;
  setHour: (value: string) => void;
  minute: string;
  setMinute: (value: string) => void;
  period: string;
  setPeriod: (value: string) => void;
  label: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  hour,
  setHour,
  minute,
  setMinute,
  period,
  setPeriod,
  label
}) => {
  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">{label}:</span>
      <div className="flex items-center gap-1">
        <Select value={hour} onValueChange={setHour}>
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
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
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
  );
};

export default TimeSelector;
