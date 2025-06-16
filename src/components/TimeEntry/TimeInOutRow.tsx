import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plug } from 'lucide-react';

interface TimeInOutRowProps {
  timeInHour: string;
  setTimeInHour: (value: string) => void;
  timeInMinute: string;
  setTimeInMinute: (value: string) => void;
  timeInPeriod: string;
  setTimeInPeriod: (value: string) => void;
  timeOutHour: string;
  setTimeOutHour: (value: string) => void;
  timeOutMinute: string;
  setTimeOutMinute: (value: string) => void;
  timeOutPeriod: string;
  setTimeOutPeriod: (value: string) => void;
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
  setQuickTime: (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => void;
}

const TimeInOutRow: React.FC<TimeInOutRowProps> = ({
  timeInHour,
  setTimeInHour,
  timeInMinute,
  setTimeInMinute,
  timeInPeriod,
  setTimeInPeriod,
  timeOutHour,
  setTimeOutHour,
  timeOutMinute,
  setTimeOutMinute,
  timeOutPeriod,
  setTimeOutPeriod,
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
  setBreakOutPeriod,
  setQuickTime
}) => {
  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];

  const handleAddBreak = () => {
    // This will allow users to add another break entry
    console.log('Add another break clicked');
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Start:</span>
        <div className="flex items-center gap-1">
          <Select value={timeInHour} onValueChange={setTimeInHour}>
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
          <Select value={timeInMinute} onValueChange={setTimeInMinute}>
            <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {minutes.map(minute => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeInPeriod} onValueChange={setTimeInPeriod}>
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

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[30px]">End:</span>
        <div className="flex items-center gap-1">
          <Select value={timeOutHour} onValueChange={setTimeOutHour}>
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
          <Select value={timeOutMinute} onValueChange={setTimeOutMinute}>
            <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {minutes.map(minute => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeOutPeriod} onValueChange={setTimeOutPeriod}>
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

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

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

      {/* Add Break Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleAddBreak}
        className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600"
        title="Add another break"
      >
        <Plug className="h-4 w-4" />
      </Button>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      {/* Quick Fill Buttons */}
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
    </div>
  );
};

export default TimeInOutRow;
