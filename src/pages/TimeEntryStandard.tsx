
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimeEntryHeader from '@/components/TimeEntry/TimeEntryHeader';
import ProjectDetailsRow from '@/components/TimeEntry/ProjectDetailsRow';
import HoursEntryRow from '@/components/TimeEntry/HoursEntryRow';
import NotesAndSubmitRow from '@/components/TimeEntry/NotesAndSubmitRow';

const TimeEntryStandard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [standardHours, setStandardHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [entries, setEntries] = useState([{
    id: 1,
    notes: ''
  }]);

  const updateEntryNotes = (entryId: number, notes: string) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, notes } : entry
    ));
  };

  const setQuickHours = (hours: number) => {
    setStandardHours(hours.toString());
  };

  const addRow = () => {
    setEntries([...entries, {
      id: entries.length + 1,
      notes: ''
    }]);
  };

  const deleteRow = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const copyPreviousDay = () => {
    console.log('Copy previous day');
  };

  const copyPreviousWeek = () => {
    console.log('Copy previous week');
  };

  const getRowBackgroundClass = (index: number) => {
    if (index === 0) return 'bg-card';
    return index % 2 === 1 ? 'bg-muted/50' : 'bg-accent/20';
  };

  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

  return (
    <div className="unity-fade-in max-w-full mx-auto space-y-6 px-4">
      {/* Header */}
      <TimeEntryHeader
        onAddRow={addRow}
        onCopyPreviousDay={copyPreviousDay}
        onCopyPreviousWeek={copyPreviousWeek}
      />

      {/* Main Card */}
      <Card className="border shadow-sm">
        <Tabs defaultValue="enter-hours" className="w-full">
          <div className="border-b bg-muted/30">
            <TabsList className="h-12 w-full bg-transparent p-0 rounded-none">
              <TabsTrigger 
                value="enter-hours" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card font-medium gap-2"
              >
                <Clock className="h-4 w-4" />
                Enter Hours
              </TabsTrigger>
              <TabsTrigger 
                value="time-in-out" 
                asChild 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent hover:bg-muted/50 font-medium gap-2"
              >
                <Link to="/time-entry/time-in-out" className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Time In/Out
                </Link>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="enter-hours" className="mt-0 p-2 space-y-4">
            {entries.map((entry, index) => (
              <div key={entry.id} className={`rounded-lg border p-2 space-y-4 ${getRowBackgroundClass(index)}`}>
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
                  
                  {entries.length > 1 && (
                    <button
                      onClick={() => deleteRow(entry.id)}
                      className="h-8 w-8 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Combined Project Details and Hours Entry Section */}
                <div className="bg-muted/30 rounded-lg p-2 border space-y-3">
                  {/* Project Details Row */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Project & Hours Details</h4>
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

                  {/* Hours Entry Row */}
                  <div className="border-t pt-2">
                    <HoursEntryRow 
                      standardHours={standardHours}
                      setStandardHours={setStandardHours}
                      overtimeHours={overtimeHours}
                      setOvertimeHours={setOvertimeHours}
                      totalHours={totalHours}
                      setQuickHours={setQuickHours}
                    />
                  </div>
                </div>

                {/* Notes Section - Individual per entry */}
                <div className="bg-muted/30 rounded-lg p-2 border">
                  <NotesAndSubmitRow 
                    notes={entry.notes} 
                    setNotes={(notes) => updateEntryNotes(entry.id, notes)} 
                    showTotalHours={false}
                  />
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeEntryStandard;
