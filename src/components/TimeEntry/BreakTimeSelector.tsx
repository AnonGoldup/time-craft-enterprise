
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface BreakTime {
  id: string;
  breakInHour: string;
  breakInMinute: string;
  breakInPeriod: string;
  breakOutHour: string;
  breakOutMinute: string;
  breakOutPeriod: string;
}

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
  const [additionalBreaks, setAdditionalBreaks] = React.useState<BreakTime[]>([]);
  const hours = Array.from({length: 12}, (_, i) => i + 1);
  const minutes = ['00', '15', '30', '45'];

  const handleAddBreak = () => {
    const newBreak: BreakTime = {
      id: Date.now().toString(),
      breakInHour: '',
      breakInMinute: '00',
      breakInPeriod: 'AM',
      breakOutHour: '',
      breakOutMinute: '00',
      breakOutPeriod: 'AM'
    };
    setAdditionalBreaks([...additionalBreaks, newBreak]);
  };

  const handleRemoveBreak = (id: string) => {
    setAdditionalBreaks(additionalBreaks.filter(breakTime => breakTime.id !== id));
  };

  const updateAdditionalBreak = (id: string, field: keyof Omit<BreakTime, 'id'>, value: string) => {
    setAdditionalBreaks(additionalBreaks.map(breakTime => 
      breakTime.id === id ? { ...breakTime, [field]: value } : breakTime
    ));
  };

  const renderBreakRow = (
    breakData: Partial<BreakTime> & { 
      breakInHour: string; 
      breakInMinute: string; 
      breakInPeriod: string;
      breakOutHour: string;
      breakOutMinute: string;
      breakOutPeriod: string;
    },
    onUpdate: (field: string, value: string) => void,
    showDelete: boolean = false,
    onDelete?: () => void
  ) => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[45px]">Break:</span>
      <div className="flex items-center gap-1">
        <Select value={breakData.breakInHour} onValueChange={(value) => onUpdate('breakInHour', value)}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-50">
            {hours.map(hour => (
              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={breakData.breakInMinute} onValueChange={(value) => onUpdate('breakInMinute', value)}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-50">
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={breakData.breakInPeriod} onValueChange={(value) => onUpdate('breakInPeriod', value)}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-50">
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <span className="text-slate-400">-</span>

      <div className="flex items-center gap-1">
        <Select value={breakData.breakOutHour} onValueChange={(value) => onUpdate('breakOutHour', value)}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-50">
            {hours.map(hour => (
              <SelectItem key={hour} value={hour.toString()}>{hour}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>:</span>
        <Select value={breakData.breakOutMinute} onValueChange={(value) => onUpdate('breakOutMinute', value)}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="--" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-50">
            {minutes.map(minute => (
              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={breakData.breakOutPeriod} onValueChange={(value) => onUpdate('breakOutPeriod', value)}>
          <SelectTrigger className="w-16 border-slate-300 dark:border-slate-600">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-50">
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showDelete && onDelete && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDelete}
          className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Remove break"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      {/* Breaks container - aligned to center of Start-End times */}
      <div className="flex flex-col gap-2">
        {/* Main break row with + button */}
        <div className="flex items-center gap-2">
          {renderBreakRow(
            {
              breakInHour,
              breakInMinute,
              breakInPeriod,
              breakOutHour,
              breakOutMinute,
              breakOutPeriod
            },
            (field, value) => {
              switch (field) {
                case 'breakInHour': setBreakInHour(value); break;
                case 'breakInMinute': setBreakInMinute(value); break;
                case 'breakInPeriod': setBreakInPeriod(value); break;
                case 'breakOutHour': setBreakOutHour(value); break;
                case 'breakOutMinute': setBreakOutMinute(value); break;
                case 'breakOutPeriod': setBreakOutPeriod(value); break;
              }
            }
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleAddBreak}
            className="h-8 w-8 p-0 border-slate-300 dark:border-slate-600"
            title="Add another break"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Additional break rows - aligned with the first break */}
        {additionalBreaks.map((breakTime) => (
          <div key={breakTime.id} className="flex items-center gap-2">
            {renderBreakRow(
              breakTime,
              (field, value) => updateAdditionalBreak(breakTime.id, field as keyof Omit<BreakTime, 'id'>, value),
              true,
              () => handleRemoveBreak(breakTime.id)
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakTimeSelector;
