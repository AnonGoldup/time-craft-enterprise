
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import StandardHoursEntry from './StandardHoursEntry';
import NotesAndSubmitRow from './NotesAndSubmitRow';

interface TimeEntryCardProps {
  entry: { id: number; notes: string };
  index: number;
  canDelete: boolean;
  onDelete: (id: number) => void;
  updateEntryNotes: (id: number, notes: string) => void;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedExtra: string;
  setSelectedExtra: (value: string) => void;
  selectedCostCode: string;
  setSelectedCostCode: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedEmployees: string[];
  setSelectedEmployees: (value: string[]) => void;
  standardHours: string;
  setStandardHours: (hours: string) => void;
  overtimeHours: string;
  setOvertimeHours: (hours: string) => void;
  setQuickHours: (hours: number) => void;
  onSubmit?: () => void;
}

const TimeEntryCard: React.FC<TimeEntryCardProps> = ({
  entry,
  index,
  canDelete,
  onDelete,
  updateEntryNotes,
  selectedProject,
  setSelectedProject,
  selectedExtra,
  setSelectedExtra,
  selectedCostCode,
  setSelectedCostCode,
  selectedDate,
  setSelectedDate,
  selectedDates,
  setSelectedDates,
  selectedEmployee,
  setSelectedEmployee,
  selectedEmployees,
  setSelectedEmployees,
  standardHours,
  setStandardHours,
  overtimeHours,
  setOvertimeHours,
  setQuickHours,
  onSubmit = () => {}
}) => {
  const getRowBackgroundClass = (index: number) => {
    if (index === 0) return 'bg-card';
    return index % 2 === 1 ? 'bg-muted/50' : 'bg-accent/20';
  };

  return (
    <Card className={`border p-2 space-y-4 ${getRowBackgroundClass(index)}`}>
      {/* Entry Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">
              {index + 1}
            </span>
          </div>
          <h3 className="font-semibold text-foreground">
            Entry {index + 1}
          </h3>
        </div>
        
        {canDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(entry.id)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Hours Entry Section */}
      <StandardHoursEntry 
        standardHours={standardHours} 
        setStandardHours={setStandardHours} 
        overtimeHours={overtimeHours} 
        setOvertimeHours={setOvertimeHours} 
        setQuickHours={setQuickHours}
        selectedProject={selectedProject}
        selectedExtra={selectedExtra}
        selectedCostCode={selectedCostCode}
        selectedDate={selectedDate}
        notes={entry.notes}
      />

      {/* Notes Section */}
      <div className="bg-muted/30 rounded-lg p-2 border">
        <NotesAndSubmitRow 
          notes={entry.notes} 
          setNotes={(notes) => updateEntryNotes(entry.id, notes)} 
          showTotalHours={false}
          onSubmit={onSubmit}
        />
      </div>
    </Card>
  );
};

export default TimeEntryCard;
