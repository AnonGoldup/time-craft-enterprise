
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProjectData } from '@/components/TimeEntry/hooks/useProjectData';
import { useTimeInOutForm } from '@/components/TimeEntry/hooks/useTimeInOutForm';
import TimeInOutHeader from '@/components/TimeEntry/TimeInOutHeader';
import TimeInOutEntryCard from '@/components/TimeEntry/TimeInOutEntryCard';

const TimeEntryTimeInOut = () => {
  const {
    // State
    selectedProject, setSelectedProject,
    selectedExtra, setSelectedExtra,
    selectedCostCode, setSelectedCostCode,
    selectedDate, setSelectedDate,
    selectedDates, setSelectedDates,
    selectedEmployee, setSelectedEmployee,
    selectedEmployees, setSelectedEmployees,
    timeInHour, setTimeInHour,
    timeInMinute, setTimeInMinute,
    timeInPeriod, setTimeInPeriod,
    timeOutHour, setTimeOutHour,
    timeOutMinute, setTimeOutMinute,
    timeOutPeriod, setTimeOutPeriod,
    breakInHour, setBreakInHour,
    breakInMinute, setBreakInMinute,
    breakInPeriod, setBreakInPeriod,
    breakOutHour, setBreakOutHour,
    breakOutMinute, setBreakOutMinute,
    breakOutPeriod, setBreakOutPeriod,
    entries,
    // Actions
    updateEntryNotes,
    setQuickTime,
    addRow,
    deleteRow,
    copyPreviousDay,
    copyPreviousWeek,
    handleSubmit
  } = useTimeInOutForm();

  const { projects, employees, projectExtras, costCodes, loading } = useProjectData(selectedProject, selectedExtra);

  return (
    <div className="unity-fade-in max-w-full mx-auto space-y-6 px-4">
      {/* Header */}
      <TimeInOutHeader
        onAddRow={addRow}
        onCopyPreviousDay={copyPreviousDay}
        onCopyPreviousWeek={copyPreviousWeek}
      />

      {/* Main Card */}
      <Card className="border shadow-sm">
        <Tabs defaultValue="time-in-out" className="w-full">
          <div className="border-b bg-muted/30">
            <TabsList className="h-12 w-full bg-transparent p-0 rounded-none">
              <TabsTrigger value="enter-hours" asChild className="flex-1 h-12 rounded-none border-b-2 border-transparent hover:bg-muted/50 font-medium gap-2">
                <Link to="/time-entry/standard" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Enter Hours
                </Link>
              </TabsTrigger>
              <TabsTrigger value="time-in-out" className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card font-medium gap-2">
                <Timer className="h-4 w-4" />
                Time In/Out
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="time-in-out" className="mt-0 p-2 space-y-4">
            {entries.map((entry, index) => (
              <TimeInOutEntryCard
                key={entry.id}
                entry={entry}
                index={index}
                entriesLength={entries.length}
                onDeleteRow={deleteRow}
                onUpdateNotes={updateEntryNotes}
                onSubmit={handleSubmit}
                // Project details props
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
                // Time props
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
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
