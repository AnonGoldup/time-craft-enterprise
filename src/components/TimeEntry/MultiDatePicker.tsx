
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

interface MultiDatePickerProps {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
  className?: string;
}

const MultiDatePicker: React.FC<MultiDatePickerProps> = ({
  selectedDates,
  onDatesChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const isAlreadySelected = selectedDates.some(
      selectedDate => selectedDate.toDateString() === date.toDateString()
    );

    if (isAlreadySelected) {
      // Remove date if already selected
      onDatesChange(selectedDates.filter(
        selectedDate => selectedDate.toDateString() !== date.toDateString()
      ));
    } else {
      // Add date to selection
      onDatesChange([...selectedDates, date]);
    }
  };

  const removeDate = (dateToRemove: Date) => {
    onDatesChange(selectedDates.filter(
      date => date.toDateString() !== dateToRemove.toDateString()
    ));
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-48 justify-start text-left font-normal border-slate-300 dark:border-slate-600",
              selectedDates.length === 0 && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDates.length === 0
              ? "Select dates..."
              : selectedDates.length === 1
              ? format(selectedDates[0], "PPP")
              : `${selectedDates.length} dates selected`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={undefined}
            onSelect={handleDateSelect}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
            modifiers={{
              selected: selectedDates
            }}
            modifiersStyles={{
              selected: { backgroundColor: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Selected dates badges */}
      {selectedDates.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedDates.map((date, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs"
            >
              {format(date, "MMM dd")}
              <button
                onClick={() => removeDate(date)}
                className="ml-1 hover:text-red-500"
                type="button"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiDatePicker;
