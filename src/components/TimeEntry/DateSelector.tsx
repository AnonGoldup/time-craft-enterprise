
import React from 'react';
import { Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MultiDatePicker from './MultiDatePicker';

interface DateSelectorProps {
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedDates?: Date[];
  setSelectedDates?: (dates: Date[]) => void;
  useMultiDateSelection?: boolean;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  setSelectedDate,
  selectedDates = [],
  setSelectedDates,
  useMultiDateSelection = false
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400">Date</span>
      </div>
      {useMultiDateSelection && setSelectedDates ? (
        <MultiDatePicker
          selectedDates={selectedDates}
          onDatesChange={setSelectedDates}
        />
      ) : (
        <Input 
          type="date" 
          value={selectedDate} 
          onChange={e => setSelectedDate(e.target.value)} 
          className="w-36 border-slate-300 dark:border-slate-600 bg-slate-50" 
        />
      )}
    </div>
  );
};

export default DateSelector;
