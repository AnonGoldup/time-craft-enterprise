
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Timer, Calendar } from 'lucide-react';

interface TimeEntryTypeSelectorProps {
  selectedType: 'standard' | 'time-in-out' | 'enhanced';
  onTypeChange: (type: 'standard' | 'time-in-out' | 'enhanced') => void;
}

const TimeEntryTypeSelector: React.FC<TimeEntryTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  const entryTypes = [
    {
      type: 'standard' as const,
      label: 'Standard Hours',
      icon: Clock,
      description: 'Enter standard time entries'
    },
    {
      type: 'time-in-out' as const,
      label: 'Time In/Out',
      icon: Timer,
      description: 'Clock in and out tracking'
    },
    {
      type: 'enhanced' as const,
      label: 'Enhanced Entry',
      icon: Calendar,
      description: 'Detailed time entry form'
    }
  ];

  return (
    <div className="flex gap-2 mb-6">
      {entryTypes.map(({ type, label, icon: Icon, description }) => (
        <Button
          key={type}
          variant={selectedType === type ? 'default' : 'outline'}
          onClick={() => onTypeChange(type)}
          className="flex items-center gap-2"
          title={description}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default TimeEntryTypeSelector;
