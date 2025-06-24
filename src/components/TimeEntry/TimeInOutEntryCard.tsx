
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ProjectDetailsRow from './ProjectDetailsRow';
import TimeInOutRow from './TimeInOutRow';
import NotesAndSubmitRow from './NotesAndSubmitRow';

interface TimeInOutFormState {
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
  timeInHour: string;
  setTimeInHour: (value: string) => void;
  timeInMinute: string;
  setTimeInMinute: (value: string) => void;
  timeInPeriod: 'AM' | 'PM';
  setTimeInPeriod: (value: 'AM' | 'PM') => void;
  timeOutHour: string;
  setTimeOutHour: (value: string) => void;
  timeOutMinute: string;
  setTimeOutMinute: (value: string) => void;
  timeOutPeriod: 'AM' | 'PM';
  setTimeOutPeriod: (value: 'AM' | 'PM') => void;
  breakInHour: string;
  setBreakInHour: (value: string) => void;
  breakInMinute: string;
  setBreakInMinute: (value: string) => void;
  breakInPeriod: 'AM' | 'PM';
  setBreakInPeriod: (value: 'AM' | 'PM') => void;
  breakOutHour: string;
  setBreakOutHour: (value: string) => void;
  breakOutMinute: string;
  setBreakOutMinute: (value: string) => void;
  breakOutPeriod: 'AM' | 'PM';
  setBreakOutPeriod: (value: 'AM' | 'PM') => void;
  setQuickTime: (startHour: string, startPeriod: 'AM' | 'PM', endHour: string, endPeriod: 'AM' | 'PM') => void;
  updateEntryNotes: (entryId: number, notes: string) => void;
  deleteRow: (id: number) => void;
  handleSubmit: () => void;
}

interface TimeInOutEntryCardProps {
  entry: { id: number; notes: string };
  index: number;
  entriesLength: number;
  formState: TimeInOutFormState;
}

const TimeInOutEntryCard: React.FC<TimeInOutEntryCardProps> = ({
  entry,
  index,
  entriesLength,
  formState
}) => {
  const getRowBackgroundClass = (index: number) => {
    if (index === 0) return 'bg-card';
    return index % 2 === 1 ? 'bg-muted/50' : 'bg-accent/20';
  };

  return (
    <div className={`rounded-lg border p-2 space-y-4 ${getRowBackgroundClass(index)}`}>
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
        
        {entriesLength > 1 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => formState.deleteRow(entry.id)} 
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Combined Project Details and Time In/Out Section */}
      <div className="bg-muted/30 rounded-lg p-3 border space-y-4 px-[8px] py-[8px]">
        {/* Project Details Row */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Project & Time Details</h4>
          <ProjectDetailsRow 
            selectedProject={formState.selectedProject}
            setSelectedProject={formState.setSelectedProject}
            selectedExtra={formState.selectedExtra}
            setSelectedExtra={formState.setSelectedExtra}
            selectedCostCode={formState.selectedCostCode}
            setSelectedCostCode={formState.setSelectedCostCode}
            selectedDate={formState.selectedDate}
            setSelectedDate={formState.setSelectedDate}
            selectedDates={formState.selectedDates}
            setSelectedDates={formState.setSelectedDates}
            selectedEmployee={formState.selectedEmployee}
            setSelectedEmployee={formState.setSelectedEmployee}
            selectedEmployees={formState.selectedEmployees}
            setSelectedEmployees={formState.setSelectedEmployees}
            useCostCodeInput={false}
            useMultiDateSelection={true}
          />
        </div>

        {/* Time In/Out Row */}
        <div className="border-t pt-3">
          <TimeInOutRow 
            timeInHour={formState.timeInHour}
            setTimeInHour={formState.setTimeInHour}
            timeInMinute={formState.timeInMinute}
            setTimeInMinute={formState.setTimeInMinute}
            timeInPeriod={formState.timeInPeriod}
            setTimeInPeriod={formState.setTimeInPeriod}
            timeOutHour={formState.timeOutHour}
            setTimeOutHour={formState.setTimeOutHour}
            timeOutMinute={formState.timeOutMinute}
            setTimeOutMinute={formState.setTimeOutMinute}
            timeOutPeriod={formState.timeOutPeriod}
            setTimeOutPeriod={formState.setTimeOutPeriod}
            breakInHour={formState.breakInHour}
            setBreakInHour={formState.setBreakInHour}
            breakInMinute={formState.breakInMinute}
            setBreakInMinute={formState.setBreakInMinute}
            breakInPeriod={formState.breakInPeriod}
            setBreakInPeriod={formState.setBreakInPeriod}
            breakOutHour={formState.breakOutHour}
            setBreakOutHour={formState.setBreakOutHour}
            breakOutMinute={formState.breakOutMinute}
            setBreakOutMinute={formState.setBreakOutMinute}
            breakOutPeriod={formState.breakOutPeriod}
            setBreakOutPeriod={formState.setBreakOutPeriod}
            setQuickTime={formState.setQuickTime}
          />
        </div>
      </div>

      {/* Notes Section - Individual per entry */}
      <div className="bg-muted/30 rounded-lg p-2 border">
        <NotesAndSubmitRow 
          notes={entry.notes}
          setNotes={(notes) => formState.updateEntryNotes(entry.id, notes)}
          showTotalHours={true}
          timeInHour={formState.timeInHour}
          timeInMinute={formState.timeInMinute}
          timeInPeriod={formState.timeInPeriod}
          timeOutHour={formState.timeOutHour}
          timeOutMinute={formState.timeOutMinute}
          timeOutPeriod={formState.timeOutPeriod}
          breakInHour={formState.breakInHour}
          breakInMinute={formState.breakInMinute}
          breakInPeriod={formState.breakInPeriod}
          breakOutHour={formState.breakOutHour}
          breakOutMinute={formState.breakOutMinute}
          breakOutPeriod={formState.breakOutPeriod}
          onSubmit={formState.handleSubmit}
        />
      </div>
    </div>
  );
};

export default TimeInOutEntryCard;
