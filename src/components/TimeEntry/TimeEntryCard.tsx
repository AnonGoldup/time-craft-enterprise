
import React from 'react';
import EntryCardHeader from './EntryCardHeader';
import ProjectDetailsRow from './ProjectDetailsRow';
import StandardHoursEntry from './StandardHoursEntry';
import NotesAndSubmitRow from './NotesAndSubmitRow';

interface TimeEntry {
  id: number;
  notes: string;
}

interface TimeEntryCardProps {
  entry: TimeEntry;
  index: number;
  canDelete: boolean;
  onDelete: (id: number) => void;
  updateEntryNotes: (entryId: number, notes: string) => void;
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
  setQuickHours
}) => {
  const getRowBackgroundClass = (index: number) => {
    if (index === 0) return 'bg-card';
    return index % 2 === 1 ? 'bg-muted/50' : 'bg-accent/20';
  };

  return (
    <div className={`rounded-lg border p-2 space-y-4 ${getRowBackgroundClass(index)}`}>
      {/* Entry Header */}
      <EntryCardHeader
        entryNumber={index + 1}
        canDelete={canDelete}
        onDelete={() => onDelete(entry.id)}
      />

      {/* Project Details Section */}
      <div className="bg-muted/30 rounded-lg p-2 border">
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

      {/* Hours Entry Section */}
      <StandardHoursEntry
        standardHours={standardHours}
        setStandardHours={setStandardHours}
        overtimeHours={overtimeHours}
        setOvertimeHours={setOvertimeHours}
        setQuickHours={setQuickHours}
      />

      {/* Notes Section */}
      <div className="bg-muted/30 rounded-lg p-2 border">
        <NotesAndSubmitRow 
          notes={entry.notes} 
          setNotes={(notes) => updateEntryNotes(entry.id, notes)} 
          showTotalHours={false}
        />
      </div>
    </div>
  );
};

export default TimeEntryCard;
