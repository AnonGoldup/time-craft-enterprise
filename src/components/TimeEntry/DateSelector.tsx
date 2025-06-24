
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { { MultiDatePicker } from './MultiDatePicker';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  label?: string;
  disabled?: boolean;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onDateChange,
  label = "Date",
  disabled = false
}) => {
  const handleDateChange = (dates: Date[]) => {
    if (dates.length > 0) {
      onDateChange(dates[0].toISOString().split('T')[0]);
    }
  };

  const selectedDates = selectedDate ? [new Date(selectedDate)] : [];

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <MultiDatePicker
        selectedDates={selectedDates}
        onDateChange={handleDateChange}
        placeholder="Select date..."
        maxDates={1}
        disabled={disabled}
      />
    </div>
  );
};
