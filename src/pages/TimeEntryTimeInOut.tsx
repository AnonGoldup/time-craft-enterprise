
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { ChevronLeft, MoreVertical, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectDetailsRow from '@/components/TimeEntry/ProjectDetailsRow';
import TimeInOutRow from '@/components/TimeEntry/TimeInOutRow';
import NotesAndSubmitRow from '@/components/TimeEntry/NotesAndSubmitRow';

const TimeEntryTimeInOut = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
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
  const [entries, setEntries] = useState([{
    id: 1
  }]);

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('00');
    setTimeOutPeriod(endPeriod);
    setBreakInHour('12');
    setBreakInMinute('00');
    setBreakInPeriod('PM');
    setBreakOutHour('12');
    setBreakOutMinute('30');
    setBreakOutPeriod('PM');
  };

  const addRow = () => {
    setEntries([...entries, {
      id: entries.length + 1
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
    if (index === 0) return '';
    return index % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-800/30' : 'bg-blue-50/30 dark:bg-blue-900/10';
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
        <div className="flex items-center gap-2">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem onClick={copyPreviousDay}>
                Copy previous day
              </ContextMenuItem>
              <ContextMenuItem onClick={copyPreviousWeek}>
                Copy previous week
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <Button onClick={addRow} size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            Add Row
          </Button>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6 bg-inherit">
          <Tabs defaultValue="time-in-out" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="enter-hours" asChild>
                <Link to="/time-entry/standard" className="text-slate-600 dark:text-slate-400">Enter Hours</Link>
              </TabsTrigger>
              <TabsTrigger value="time-in-out" className="bg-[slate-00] bg-slate-600 hover:bg-slate-500 text-slate-950">Time In/Out</TabsTrigger>
            </TabsList>
            
            <TabsContent value="time-in-out" className="space-y-6 mt-6">
              {entries.map((entry, index) => (
                <div key={entry.id} className={`space-y-6 pb-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0 rounded-lg p-4 ${getRowBackgroundClass(index)}`}>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                      Entry {index + 1}
                    </h3>
                    {entries.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => deleteRow(entry.id)} className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Project Details Row with multi-select employees and multi-date selection, using dropdown for cost codes */}
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
                </div>
              ))}

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
