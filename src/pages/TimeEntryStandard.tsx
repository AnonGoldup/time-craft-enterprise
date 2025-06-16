
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { ChevronLeft, MoreVertical, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectDetailsRow from '@/components/TimeEntry/ProjectDetailsRow';
import HoursEntryRow from '@/components/TimeEntry/HoursEntryRow';
import NotesAndSubmitRow from '@/components/TimeEntry/NotesAndSubmitRow';

const TimeEntryStandard = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [standardHours, setStandardHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState([{ id: 1 }]);

  const setQuickHours = (hours: number) => {
    setStandardHours(hours.toString());
  };

  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

  const addRow = () => {
    setEntries([...entries, { id: entries.length + 1 }]);
  };

  const copyPreviousDay = () => {
    console.log('Copy previous day');
    // Implementation for copying previous day's data
  };

  const copyPreviousWeek = () => {
    console.log('Copy previous week');
    // Implementation for copying previous week's data
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
        <CardContent className="p-6">
          <Tabs defaultValue="enter-hours" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="enter-hours" className="text-blue-600 dark:text-blue-400">Enter Hours</TabsTrigger>
              <TabsTrigger value="time-in-out" asChild>
                <Link to="/time-entry/time-in-out" className="text-slate-600 dark:text-slate-400">Time In/Out</Link>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="enter-hours" className="space-y-6 mt-6">
              {entries.map((entry, index) => (
                <div key={entry.id} className="space-y-6 pb-6 border-b border-slate-200 dark:border-slate-700 last:border-b-0">
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
                  />

                  {/* Hours Entry Row */}
                  <HoursEntryRow
                    standardHours={standardHours}
                    setStandardHours={setStandardHours}
                    overtimeHours={overtimeHours}
                    setOvertimeHours={setOvertimeHours}
                    totalHours={totalHours}
                    setQuickHours={setQuickHours}
                  />
                </div>
              ))}

              {/* Notes and Submit Row */}
              <NotesAndSubmitRow
                notes={notes}
                setNotes={setNotes}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeEntryStandard;
