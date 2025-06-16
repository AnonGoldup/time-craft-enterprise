
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

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
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = ['00', '15', '30', '45'];
  const periods = ['AM', 'PM'];

  const clearAllTimes = () => {
    setTimeInHour('');
    setTimeInMinute('');
    setTimeInPeriod('AM');
    setTimeOutHour('');
    setTimeOutMinute('');
    setTimeOutPeriod('AM');
    setBreakInHour('');
    setBreakInMinute('');
    setBreakInPeriod('AM');
    setBreakOutHour('');
    setBreakOutMinute('');
    setBreakOutPeriod('AM');
  };

  const clearBreakTimes = () => {
    setBreakInHour('');
    setBreakInMinute('');
    setBreakInPeriod('AM');
    setBreakOutHour('');
    setBreakOutMinute('');
    setBreakOutPeriod('AM');
  };

  return (
    <div className="space-y-6">
      {/* Time In */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-slate-600 dark:text-slate-400">Time In</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTimeInHour('');
              setTimeInMinute('');
              setTimeInPeriod('AM');
            }}
            className="text-red-400 hover:text-red-600 h-6 px-2"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={timeInHour} onValueChange={setTimeInHour}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Hr" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeInMinute} onValueChange={setTimeInMinute}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeInPeriod} onValueChange={setTimeInPeriod}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>{period}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Time Out */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-slate-600 dark:text-slate-400">Time Out</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setTimeOutHour('');
              setTimeOutMinute('');
              setTimeOutPeriod('AM');
            }}
            className="text-red-400 hover:text-red-600 h-6 px-2"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={timeOutHour} onValueChange={setTimeOutHour}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Hr" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeOutMinute} onValueChange={setTimeOutMinute}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeOutPeriod} onValueChange={setTimeOutPeriod}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>{period}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Break In */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-slate-600 dark:text-slate-400">Break In</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBreakInHour('');
              setBreakInMinute('');
              setBreakInPeriod('AM');
            }}
            className="text-red-400 hover:text-red-600 h-6 px-2"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={breakInHour} onValueChange={setBreakInHour}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Hr" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={breakInMinute} onValueChange={setBreakInMinute}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={breakInPeriod} onValueChange={setBreakInPeriod}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>{period}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Break Out */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-slate-600 dark:text-slate-400">Break Out</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setBreakOutHour('');
              setBreakOutMinute('');
              setBreakOutPeriod('AM');
            }}
            className="text-red-400 hover:text-red-600 h-6 px-2"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select value={breakOutHour} onValueChange={setBreakOutHour}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Hr" />
            </SelectTrigger>
            <SelectContent>
              {hours.map((hour) => (
                <SelectItem key={hour} value={hour}>{hour}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={breakOutMinute} onValueChange={setBreakOutMinute}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Min" />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((minute) => (
                <SelectItem key={minute} value={minute}>{minute}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={breakOutPeriod} onValueChange={setBreakOutPeriod}>
            <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period} value={period}>{period}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Time Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickTime('8', 'AM', '5', 'PM')}
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          8AM - 5PM
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickTime('7', 'AM', '5', 'PM')}
          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
        >
          7AM - 5PM
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickTime('6', 'AM', '6', 'PM')}
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
        >
          6AM - 6PM
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearBreakTimes}
          className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white"
        >
          Clear Breaks
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllTimes}
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
};

export default TimeInOutRow;
