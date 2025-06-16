
import React from 'react';
import TimeSelector from './TimeSelector';
import BreakTimeSelector from './BreakTimeSelector';
import QuickTimeButtons from './QuickTimeButtons';

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
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <TimeSelector
        hour={timeInHour}
        setHour={setTimeInHour}
        minute={timeInMinute}
        setMinute={setTimeInMinute}
        period={timeInPeriod}
        setPeriod={setTimeInPeriod}
        label="Start"
      />

      <span className="text-slate-400">-</span>

      <TimeSelector
        hour={timeOutHour}
        setHour={setTimeOutHour}
        minute={timeOutMinute}
        setMinute={setTimeOutMinute}
        period={timeOutPeriod}
        setPeriod={setTimeOutPeriod}
        label="End"
      />

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <BreakTimeSelector
        breakInHour={breakInHour}
        setBreakInHour={setBreakInHour}
        breakInMinute={breakInMinute}
        setBreakInMinute={setBreakInMinute}
        breakInPeriod={breakInPeriod}
        setBreakInPeriod={setBreakInPeriod}
        breakOutHour={breakOutHour}
        setBreakOutHour={setBreakOutHour}
        breakOutMinute={breakOutMinute}
        setBreakOutMinute={setBreakOutMinute}
        breakOutPeriod={breakOutPeriod}
        setBreakOutPeriod={setBreakOutPeriod}
      />

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <QuickTimeButtons setQuickTime={setQuickTime} />
    </div>
  );
};

export default TimeInOutRow;
