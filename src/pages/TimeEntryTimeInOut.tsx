import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreVertical, Plus, Trash2, Clock, Calendar, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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
  const [entries, setEntries] = useState([{
    id: 1,
    notes: ''
  }]);

  const { toast } = useToast();

  const updateEntryNotes = (entryId: number, notes: string) => {
    setEntries(entries.map(entry => 
      entry.id === entryId ? { ...entry, notes } : entry
    ));
  };

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('30'); // Set to 30 minutes to account for break
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
    const previousDayData = {
      project: 'Project Alpha',
      extra: 'Foundation Work',
      costCode: 'CC-001',
      timeInHour: '8',
      timeInMinute: '00',
      timeInPeriod: 'AM',
      timeOutHour: '5',
      timeOutMinute: '00',
      timeOutPeriod: 'PM',
      breakInHour: '12',
      breakInMinute: '00',
      breakInPeriod: 'PM',
      breakOutHour: '12',
      breakOutMinute: '30',
      breakOutPeriod: 'PM',
      notes: 'Continued work from previous day'
    };

    setSelectedProject(previousDayData.project);
    setSelectedExtra(previousDayData.extra);
    setSelectedCostCode(previousDayData.costCode);
    setTimeInHour(previousDayData.timeInHour);
    setTimeInMinute(previousDayData.timeInMinute);
    setTimeInPeriod(previousDayData.timeInPeriod);
    setTimeOutHour(previousDayData.timeOutHour);
    setTimeOutMinute(previousDayData.timeOutMinute);
    setTimeOutPeriod(previousDayData.timeOutPeriod);
    setBreakInHour(previousDayData.breakInHour);
    setBreakInMinute(previousDayData.breakInMinute);
    setBreakInPeriod(previousDayData.breakInPeriod);
    setBreakOutHour(previousDayData.breakOutHour);
    setBreakOutMinute(previousDayData.breakOutMinute);
    setBreakOutPeriod(previousDayData.breakOutPeriod);
    updateEntryNotes(entries[0].id, previousDayData.notes);

    toast({
      title: "Previous Day Copied",
      description: "Time entry data from previous day has been copied to the current form.",
    });
  };

  const copyPreviousWeek = () => {
    const previousWeekData = {
      project: 'Project Beta',
      extra: 'Structural Work',
      costCode: 'CC-002',
      timeInHour: '7',
      timeInMinute: '30',
      timeInPeriod: 'AM',
      timeOutHour: '4',
      timeOutMinute: '30',
      timeOutPeriod: 'PM',
      breakInHour: '12',
      breakInMinute: '00',
      breakInPeriod: 'PM',
      breakOutHour: '1',
      breakOutMinute: '00',
      breakOutPeriod: 'PM',
      notes: 'Weekly routine work pattern'
    };

    setSelectedProject(previousWeekData.project);
    setSelectedExtra(previousWeekData.extra);
    setSelectedCostCode(previousWeekData.costCode);
    setTimeInHour(previousWeekData.timeInHour);
    setTimeInMinute(previousWeekData.timeInMinute);
    setTimeInPeriod(previousWeekData.timeInPeriod);
    setTimeOutHour(previousWeekData.timeOutHour);
    setTimeOutMinute(previousWeekData.timeOutMinute);
    setTimeOutPeriod(previousWeekData.timeOutPeriod);
    setBreakInHour(previousWeekData.breakInHour);
    setBreakInMinute(previousWeekData.breakInMinute);
    setBreakInPeriod(previousWeekData.breakInPeriod);
    setBreakOutHour(previousWeekData.breakOutHour);
    setBreakOutMinute(previousWeekData.breakOutMinute);
    setBreakOutPeriod(previousWeekData.breakOutPeriod);
    updateEntryNotes(entries[0].id, previousWeekData.notes);

    toast({
      title: "Previous Week Copied",
      description: "Time entry data from previous week has been copied to the current form.",
    });
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
          <h1 className="text-2xl font-bold text-foreground">Time In/Out</h1>
          <p className="text-sm text-muted-foreground">Track your start and end times</p>
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
        <Tabs defaultValue="time-in-out" className="w-full">
          <div className="border-b bg-muted/30">
            <TabsList className="h-12 w-full bg-transparent p-0 rounded-none">
              <TabsTrigger 
                value="enter-hours" 
                asChild 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent hover:bg-muted/50 font-medium gap-2"
              >
                <Link to="/time-entry/standard" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Enter Hours
                </Link>
              </TabsTrigger>
              <TabsTrigger 
                value="time-in-out" 
                className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card font-medium gap-2"
              >
                <Timer className="h-4 w-4" />
                Time In/Out
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="time-in-out" className="mt-0 p-2 space-y-4">
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

                {/* Time In/Out Section - Reduced padding */}
                <div className="bg-card rounded-lg p-2 border">
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

                {/* Notes Section - Individual per entry */}
                <div className="bg-muted/30 rounded-lg p-2 border">
                  <NotesAndSubmitRow 
                    notes={entry.notes} 
                    setNotes={(notes) => updateEntryNotes(entry.id, notes)} 
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
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
