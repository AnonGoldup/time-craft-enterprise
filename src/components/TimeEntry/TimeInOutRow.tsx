
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
    <div className="space-y-4">
      {/* Start/End and Break Times Row - Reduced padding */}
      <div className="flex items-start gap-8 flex-wrap p-2">
        {/* Start and End Times */}
        <div className="flex items-center gap-4">
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
        </div>

        {/* Break Times */}
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
      </div>

      {/* Quick Time Buttons */}
      <div className="flex justify-start">
        <QuickTimeButtons setQuickTime={setQuickTime} />
      </div>
    </div>
  );
};

export default TimeInOutRow;
