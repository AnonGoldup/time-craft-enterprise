
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import TimeEntryHeader from '@/components/TimeEntry/TimeEntryHeader';
import TimeEntryCard from '@/components/TimeEntry/TimeEntryCard';

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
              <TimeEntryCard
                key={entry.id}
                entry={entry}
                index={index}
                canDelete={entries.length > 1}
                onDelete={deleteRow}
                updateEntryNotes={updateEntryNotes}
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
                standardHours={standardHours}
                setStandardHours={setStandardHours}
                overtimeHours={overtimeHours}
                setOvertimeHours={setOvertimeHours}
                setQuickHours={setQuickHours}
              />
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeEntryStandard;
