
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ProjectDetailsRow from '@/components/TimeEntry/ProjectDetailsRow';
import TimeInOutRow from '@/components/TimeEntry/TimeInOutRow';
import NotesAndSubmitRow from '@/components/TimeEntry/NotesAndSubmitRow';

const TimeEntryTimeInOut = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | string[]>('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [timeInHour, setTimeInHour] = useState('');
  const [timeInMinute, setTimeInMinute] = useState('');
  const [timeInPeriod, setTimeInPeriod] = useState('AM');
  const [timeOutHour, setTimeOutHour] = useState('');
  const [timeOutMinute, setTimeOutMinute] = useState('');
  const [timeOutPeriod, setTimeOutPeriod] = useState('AM');
  const [breakInHour, setBreakInHour] = useState('');
  const [breakInMinute, setBreakInMinute] = useState('');
  const [breakInPeriod, setBreakInPeriod] = useState('AM');
  const [breakOutHour, setBreakOutHour] = useState('');
  const [breakOutMinute, setBreakOutMinute] = useState('');
  const [breakOutPeriod, setBreakOutPeriod] = useState('AM');
  const [notes, setNotes] = useState('');
  const [multiDateMode, setMultiDateMode] = useState(false);

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('00');
    setTimeOutPeriod(endPeriod);
    // Set default lunch break
    setBreakInHour('12');
    setBreakInMinute('00');
    setBreakInPeriod('PM');
    setBreakOutHour('1');
    setBreakOutMinute('00');
    setBreakOutPeriod('PM');
  };

  const handleCopyPreviousDay = () => {
    // Mock implementation - in real app, this would fetch previous day's data
    toast.success("Copied previous day's entry");
  };

  const handleCopyPreviousWeek = () => {
    // Mock implementation - in real app, this would fetch previous week's data
    toast.success("Copied previous week's entry");
  };

  const handleAddMultipleEntries = () => {
    setMultiDateMode(!multiDateMode);
    if (!multiDateMode) {
      // Convert single date to array
      if (typeof selectedDate === 'string' && selectedDate) {
        setSelectedDate([selectedDate]);
      } else if (!selectedDate) {
        setSelectedDate([]);
      }
      toast.success("Multiple date mode enabled");
    } else {
      // Convert array back to single date
      if (Array.isArray(selectedDate) && selectedDate.length > 0) {
        setSelectedDate(selectedDate[0]);
      } else {
        setSelectedDate('');
      }
      toast.success("Single date mode enabled");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/time-entry" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Time Entry</span>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Time Entry
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={handleAddMultipleEntries}
          className={`${multiDateMode ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}`}
        >
          <Plus className="h-4 w-4 mr-2" />
          {multiDateMode ? 'Single Entry' : 'Multiple Entries'}
        </Button>
      </div>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <Tabs defaultValue="time-in-out" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="enter-hours" asChild>
                <Link to="/time-entry/standard" className="text-slate-600 dark:text-slate-400">Enter Hours</Link>
              </TabsTrigger>
              <TabsTrigger value="time-in-out" className="text-blue-600 dark:text-blue-400">Time In/Out</TabsTrigger>
            </TabsList>
            
            <TabsContent value="time-in-out" className="space-y-6 mt-6">
              {/* Project Details Row */}
              <ProjectDetailsRow
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                selectedExtra={selectedExtra}
                setSelectedExtra={setSelectedExtra}
                selectedCostCode={selectedCostCode}
                setSelectedCostCode={setSelectedCostCode}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedEmployee={selectedEmployee}
                setSelectedEmployee={setSelectedEmployee}
                useCostCodeInput={true}
                multiDateMode={multiDateMode}
                onCopyPreviousDay={handleCopyPreviousDay}
                onCopyPreviousWeek={handleCopyPreviousWeek}
                onAddMultipleEntries={handleAddMultipleEntries}
              />

              {/* Time In/Out Row */}
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

              {/* Notes and Submit Row */}
              <NotesAndSubmitRow
                notes={notes}
                setNotes={setNotes}
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
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
