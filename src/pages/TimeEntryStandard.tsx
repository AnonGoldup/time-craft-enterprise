
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreVertical, Plus, Trash2, Clock, Calendar, Building2, Timer, User } from 'lucide-react';
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

  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

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
    if (index === 0) return 'bg-white dark:bg-slate-900';
    return index % 2 === 1 ? 'bg-slate-50/80 dark:bg-slate-800/50' : 'bg-blue-50/50 dark:bg-blue-900/20';
  };

  return (
    <div className="unity-fade-in max-w-full mx-auto space-y-6 px-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Enter Hours</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Log your daily work hours</p>
        </div>
        
        <div className="flex items-center gap-2">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
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
          
          <Button onClick={addRow} size="sm" className="h-9 px-3 gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Wider Card Layout */}
      <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
        <Tabs defaultValue="enter-hours" className="w-full">
          <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <TabsList className="h-12 w-full bg-transparent p-0 rounded-none">
              <TabsTrigger 
                value="enter-hours" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 font-medium gap-2"
              >
                <Clock className="h-4 w-4" />
                Enter Hours
              </TabsTrigger>
              <TabsTrigger 
                value="time-in-out" 
                asChild 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 font-medium gap-2"
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
              <div key={entry.id} className={`rounded-lg border border-slate-200 dark:border-slate-700 p-2 space-y-4 ${getRowBackgroundClass(index)}`}>
                {/* Entry Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Entry {index + 1}
                    </h3>
                  </div>
                  
                  {entries.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRow(entry.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* Project Details Section */}
                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
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

                {/* Hours Entry Section - Reduced padding */}
                <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Standard Hours */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400 min-w-[24px]">ST:</span>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={standardHours}
                          onChange={(e) => setStandardHours(e.target.value)}
                          placeholder="8.0"
                          className="w-16 h-9 text-center border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        />
                      </div>
                      <span className="text-xs text-slate-500">hrs</span>
                    </div>

                    {/* Overtime Hours */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-amber-700 dark:text-amber-400 min-w-[24px]">OT:</span>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={overtimeHours}
                          onChange={(e) => setOvertimeHours(e.target.value)}
                          placeholder="0.0"
                          className="w-16 h-9 text-center border-amber-300 dark:border-amber-700 focus:border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                        />
                      </div>
                      <span className="text-xs text-slate-500">hrs</span>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Total:</span>
                      <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-800">
                        <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">{totalHours.toFixed(1)}h</span>
                      </div>
                    </div>

                    {/* Quick Fill Buttons */}
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-slate-500">Quick:</span>
                      {[4, 6, 8, 10, 12].map((hours) => (
                        <Button
                          key={hours}
                          variant="outline"
                          size="sm"
                          onClick={() => setQuickHours(hours)}
                          className="h-7 px-2 text-xs border-slate-300 dark:border-slate-600 hover:bg-blue-50 hover:border-blue-300"
                        >
                          {hours}h
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notes Section - Individual per entry */}
                <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
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
