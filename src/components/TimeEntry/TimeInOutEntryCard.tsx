
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ProjectDetailsRow from './ProjectDetailsRow';
import TimeInOutRow from './TimeInOutRow';
import NotesAndSubmitRow from './NotesAndSubmitRow';

interface TimeInOutEntryCardProps {
  entry: { id: number; notes: string };
  index: number;
  entriesLength: number;
  onDeleteRow: (id: number) => void;
  onUpdateNotes: (entryId: number, notes: string) => void;
  onSubmit: () => void;
  // Project details props
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
  // Time props
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

const TimeInOutEntryCard: React.FC<TimeInOutEntryCardProps> = ({
  entry,
  index,
  entriesLength,
  onDeleteRow,
  onUpdateNotes,
  onSubmit,
  // Project details props
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
  // Time props
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
            onClick={() => onDeleteRow(entry.id)} 
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
            selectedProject={selectedProject} 
            setSelectedProject={setSelectedProject} 
            selectedExtra={selectedExtra} 
            setSelectedExtra={setSelectedExtra} 
            selectedCostCode={selectedCostCode} 
            setSelectedCostCode={setSelectedCostCode} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            selectedDates={selectedDates} 
            setSelectedDates={setSelectedDates} 
            selectedEmployee={selectedEmployee} 
            setSelectedEmployee={setSelectedEmployee} 
            selectedEmployees={selectedEmployees} 
            setSelectedEmployees={setSelectedEmployees} 
            useCostCodeInput={false} 
            useMultiDateSelection={true} 
          />
        </div>

        {/* Time In/Out Row */}
        <div className="border-t pt-3">
          <TimeInOutRow 
            timeInHour={timeInHour} 
            setTimeInHour={setTimeInHour} 
            timeInMinute={timeInMinute} 
            setTimeInMinute={setTimeInMinute} 
            timeInPeriod={timeInPeriod} 
            setTimeInPeriod={setTimeInPeriod} 
            timeOutHour={timeOutHour} 
            setTimeOutHour={setTimeOutHour} 
            timeOutMinute={timeOutMinute} 
            setTimeOutMinute={setTimeOutMinute} 
            timeOutPeriod={timeOutPeriod} 
            setTimeOutPeriod={setTimeOutPeriod} 
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
            setQuickTime={setQuickTime} 
          />
        </div>
      </div>

      {/* Notes Section - Individual per entry */}
      <div className="bg-muted/30 rounded-lg p-2 border">
        <NotesAndSubmitRow 
          notes={entry.notes} 
          setNotes={(notes) => onUpdateNotes(entry.id, notes)} 
          showTotalHours={true} 
          timeInHour={timeInHour} 
          timeInMinute={timeInMinute} 
          timeInPeriod={timeInPeriod} 
          timeOutHour={timeOutHour} 
          timeOutMinute={timeOutMinute} 
          timeOutPeriod={timeOutPeriod} 
          breakInHour={breakInHour} 
          breakInMinute={breakInMinute} 
          breakInPeriod={breakInPeriod} 
          breakOutHour={breakOutHour} 
          breakOutMinute={breakOutMinute} 
          breakOutPeriod={breakOutPeriod}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default TimeInOutEntryCard;
