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
    if (index === 0) return 'bg-card';
    return index % 2 === 1 ? 'bg-muted/50' : 'bg-accent/20';
  };

  return (
    <div className="unity-fade-in max-w-full mx-auto space-y-6 px-4">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Enter Hours</h1>
          <p className="text-sm text-muted-foreground">Log your daily work hours</p>
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
          
          <Button onClick={addRow} size="sm" className="h-9 px-3 gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Wider Card Layout */}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRow(entry.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

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

                {/* Hours Entry Section - Improved styling */}
                <div className="bg-card rounded-lg p-2 border">
                  <div className="flex items-center gap-4 flex-wrap">
                    {/* Standard Hours */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded flex items-center justify-center">
                        <span className="text-sm font-bold text-green-800 dark:text-green-200">ST</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={standardHours}
                          onChange={(e) => setStandardHours(e.target.value)}
                          placeholder="8.0"
                          className="w-16 h-9 text-center border-green-300 dark:border-green-700 focus:border-green-500 bg-green-50/50 dark:bg-green-900/20"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">hrs</span>
                    </div>

                    {/* Overtime Hours */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded flex items-center justify-center">
                        <span className="text-sm font-bold text-amber-800 dark:text-amber-200">OT</span>
                      </div>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.1"
                          value={overtimeHours}
                          onChange={(e) => setOvertimeHours(e.target.value)}
                          placeholder="0.0"
                          className="w-16 h-9 text-center border-amber-300 dark:border-amber-700 focus:border-amber-500 bg-amber-50/50 dark:bg-amber-900/20"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">hrs</span>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">Total:</span>
                      <div className="px-3 py-1 bg-primary/20 rounded border border-primary/30">
                        <span className="text-sm font-semibold text-primary">{totalHours.toFixed(1)}h</span>
                      </div>
                    </div>

                    {/* Quick Fill Buttons */}
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-muted-foreground">Quick:</span>
                      {[4, 6, 8, 10, 12].map((hours) => (
                        <Button
                          key={hours}
                          variant="outline"
                          size="sm"
                          onClick={() => setQuickHours(hours)}
                          className="h-7 px-2 text-xs hover:bg-primary/10 hover:border-primary/30"
                        >
                          {hours}h
                        </Button>
                      ))}
                    </div>
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
