
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreVertical, Plus, Trash2, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  const [notes, setNotes] = useState('');
  const [entries, setEntries] = useState([{ id: 1 }]);

  const setQuickHours = (hours: number) => {
    setStandardHours(hours.toString());
  };

  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

  const addRow = () => {
    setEntries([...entries, { id: entries.length + 1 }]);
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
    if (index === 0) return 'bg-white dark:bg-slate-900';
    return index % 2 === 1 ? 'bg-slate-50/80 dark:bg-slate-800/50' : 'bg-blue-50/50 dark:bg-blue-900/20';
  };

  return (
    <div className="unity-fade-in max-w-6xl mx-auto">
      {/* Enhanced Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Standard Hours Entry
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Enter your daily work hours and project details
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 px-4 gap-2 border-slate-300 dark:border-slate-600">
                  <MoreVertical className="h-4 w-4" />
                  <span className="hidden sm:inline">Actions</span>
                </Button>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={copyPreviousDay} className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Copy previous day
                </ContextMenuItem>
                <ContextMenuItem onClick={copyPreviousWeek} className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Copy previous week
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            
            <Button 
              onClick={addRow} 
              size="sm" 
              className="h-10 px-4 gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add Entry
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Card Layout */}
      <Card className="border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900">
        <CardContent className="p-0">
          <Tabs defaultValue="enter-hours" className="w-full">
            {/* Enhanced Tab List */}
            <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <TabsList className="h-14 w-full bg-transparent p-0 rounded-none">
                <TabsTrigger 
                  value="enter-hours" 
                  className="flex-1 h-14 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 font-medium gap-2"
                >
                  <Clock className="h-4 w-4" />
                  Enter Hours
                </TabsTrigger>
                <TabsTrigger 
                  value="time-in-out" 
                  asChild 
                  className="flex-1 h-14 rounded-none border-b-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 font-medium gap-2"
                >
                  <Link to="/time-entry/time-in-out" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Time In/Out
                  </Link>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="enter-hours" className="mt-0 p-8 space-y-8">
              {entries.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className={`rounded-lg border border-slate-200 dark:border-slate-700 p-6 space-y-6 transition-all hover:shadow-md ${getRowBackgroundClass(index)}`}
                >
                  {/* Enhanced Entry Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Time Entry {index + 1}
                      </h3>
                    </div>
                    
                    {entries.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteRow(entry.id)}
                        className="h-9 w-9 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Project Details Section */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Project Details
                    </h4>
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
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      Hours & Time
                    </h4>
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
              ))}

              {/* Enhanced Notes and Submit Section */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                <NotesAndSubmitRow
                  notes={notes}
                  setNotes={setNotes}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeEntryStandard;
