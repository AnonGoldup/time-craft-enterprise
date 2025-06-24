import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreVertical, Plus, Trash2, Clock, Calendar, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import { useProjectData } from '@/components/TimeEntry/hooks/useProjectData';
import ProjectDetailsRow from '@/components/TimeEntry/ProjectDetailsRow';
import TimeInOutRow from '@/components/TimeEntry/TimeInOutRow';
import NotesAndSubmitRow from '@/components/TimeEntry/NotesAndSubmitRow';
import { format } from 'date-fns';

const TimeEntryTimeInOut = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createEntry } = useTimesheetData(user?.employeeId || '');
  
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

  const { projects, employees, projectExtras, costCodes, loading } = useProjectData(selectedProject, selectedExtra);

  const updateEntryNotes = (entryId: number, notes: string) => {
    setEntries(entries.map(entry => entry.id === entryId ? {
      ...entry,
      notes
    } : entry));
  };

  const setQuickTime = (startHour: string, startPeriod: string, endHour: string, endPeriod: string) => {
    setTimeInHour(startHour);
    setTimeInMinute('00');
    setTimeInPeriod(startPeriod);
    setTimeOutHour(endHour);
    setTimeOutMinute('30');
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
      project: '1',
      extra: '1',
      costCode: '1',
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
      description: "Time entry data from previous day has been copied to the current form."
    });
  };

  const copyPreviousWeek = () => {
    const previousWeekData = {
      project: '2',
      extra: '3',
      costCode: '2',
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
      description: "Time entry data from previous week has been copied to the current form."
    });
  };

  const calculateHours = () => {
    if (!timeInHour || !timeOutHour) return 0;
    
    const timeInHour12 = parseInt(timeInHour);
    const timeOutHour12 = parseInt(timeOutHour);
    const timeInMinutes = parseInt(timeInMinute) || 0;
    const timeOutMinutes = parseInt(timeOutMinute) || 0;
    
    // Convert to 24-hour format
    let timeIn24 = timeInHour12;
    let timeOut24 = timeOutHour12;
    
    if (timeInPeriod === 'PM' && timeInHour12 !== 12) timeIn24 += 12;
    if (timeInPeriod === 'AM' && timeInHour12 === 12) timeIn24 = 0;
    if (timeOutPeriod === 'PM' && timeOutHour12 !== 12) timeOut24 += 12;
    if (timeOutPeriod === 'AM' && timeOutHour12 === 12) timeOut24 = 0;
    
    const startTime = timeIn24 * 60 + timeInMinutes;
    const endTime = timeOut24 * 60 + timeOutMinutes;
    
    let totalMinutes = endTime - startTime;
    if (totalMinutes < 0) totalMinutes += 24 * 60; // Handle next day
    
    // Subtract break time if provided
    if (breakInHour && breakOutHour) {
      const breakInHour12 = parseInt(breakInHour);
      const breakOutHour12 = parseInt(breakOutHour);
      const breakInMinutes = parseInt(breakInMinute) || 0;
      const breakOutMinutes = parseInt(breakOutMinute) || 0;
      
      let breakIn24 = breakInHour12;
      let breakOut24 = breakOutHour12;
      
      if (breakInPeriod === 'PM' && breakInHour12 !== 12) breakIn24 += 12;
      if (breakInPeriod === 'AM' && breakInHour12 === 12) breakIn24 = 0;
      if (breakOutPeriod === 'PM' && breakOutHour12 !== 12) breakOut24 += 12;
      if (breakOutPeriod === 'AM' && breakOutHour12 === 12) breakOut24 = 0;
      
      const breakStart = breakIn24 * 60 + breakInMinutes;
      const breakEnd = breakOut24 * 60 + breakOutMinutes;
      const breakDuration = breakEnd - breakStart;
      
      if (breakDuration > 0) {
        totalMinutes -= breakDuration;
      }
    }
    
    return Math.max(0, totalMinutes / 60);
  };

  const handleSubmit = async () => {
    if (!selectedProject || !selectedCostCode || !user) {
      toast({
        title: "Missing Information",
        description: "Please select project, cost code, and enter times.",
        variant: "destructive"
      });
      return;
    }

    const datesToSubmit = selectedDates.length > 0 
      ? selectedDates.map(date => format(date, 'yyyy-MM-dd'))
      : selectedDate ? [selectedDate] : [format(new Date(), 'yyyy-MM-dd')];

    const employeesToSubmit = selectedEmployees.length > 0 ? selectedEmployees : [user.employeeId];
    const calculatedHours = calculateHours();

    if (calculatedHours === 0) {
      toast({
        title: "Invalid Times",
        description: "Please enter valid start and end times.",
        variant: "destructive"
      });
      return;
    }

    try {
      for (const employeeId of employeesToSubmit) {
        for (const dateWorked of datesToSubmit) {
          for (const entry of entries) {
            await createEntry({
              employeeID: employeeId,
              dateWorked: dateWorked,
              projectID: parseInt(selectedProject),
              extraID: selectedExtra ? parseInt(selectedExtra) : 0,
              costCodeID: parseInt(selectedCostCode),
              payID: 1,
              hours: calculatedHours,
              unionID: 1,
              entryType: 'TimeInOut',
              notes: entry.notes,
              status: 'Draft',
              createdBy: user.employeeId,
              createdDate: new Date().toISOString(),
              modifiedBy: '',
              modifiedDate: '',
              exportedDate: '',
              startTime: `${timeInHour.padStart(2, '0')}:${timeInMinute.padStart(2, '0')}:00`,
              endTime: `${timeOutHour.padStart(2, '0')}:${timeOutMinute.padStart(2, '0')}:00`,
              breakInTime: breakInHour ? `${breakInHour.padStart(2, '0')}:${breakInMinute.padStart(2, '0')}:00` : '',
              breakOutTime: breakOutHour ? `${breakOutHour.padStart(2, '0')}:${breakOutMinute.padStart(2, '0')}:00` : '',
              timeIn: `${timeInHour.padStart(2, '0')}:${timeInMinute.padStart(2, '0')}:00`,
              timeOut: `${timeOutHour.padStart(2, '0')}:${timeOutMinute.padStart(2, '0')}:00`,
              breakIn: breakInHour ? `${breakInHour.padStart(2, '0')}:${breakInMinute.padStart(2, '0')}:00` : '',
              breakOut: breakOutHour ? `${breakOutHour.padStart(2, '0')}:${breakOutMinute.padStart(2, '0')}:00` : ''
            });
          }
        }
      }

      // Reset form
      setTimeInHour('');
      setTimeInMinute('');
      setTimeOutHour('');
      setTimeOutMinute('');
      setBreakInHour('');
      setBreakInMinute('');
      setBreakOutHour('');
      setBreakOutMinute('');
      setSelectedDates([]);
      setEntries([{ id: 1, notes: '' }]);
      
      toast({
        title: "Success",
        description: `Time entries created for ${employeesToSubmit.length} employee(s) across ${datesToSubmit.length} date(s).`
      });
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const getRowBackgroundClass = (index: number) => {
    if (index === 0) return 'bg-card';
    return index % 2 === 1 ? 'bg-muted/50' : 'bg-accent/20';
  };

  return <div className="unity-fade-in max-w-full mx-auto space-y-6 px-4">
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
            {entries.map((entry, index) => <div key={entry.id} className={`rounded-lg border p-2 space-y-4 ${getRowBackgroundClass(index)}`}>
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
                  
                  {entries.length > 1 && <Button variant="outline" size="sm" onClick={() => deleteRow(entry.id)} className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>}
                </div>

                {/* Combined Project Details and Time In/Out Section */}
                <div className="bg-muted/30 rounded-lg p-3 border space-y-4 px-[8px] py-[8px]">
                  {/* Project Details Row */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Project & Time Details</h4>
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

                  {/* Time In/Out Row */}
                  <div className="border-t pt-3">
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
                </div>

                {/* Notes Section - Individual per entry */}
                <div className="bg-muted/30 rounded-lg p-2 border">
                  <NotesAndSubmitRow 
                    notes={entry.notes} 
                    setNotes={notes => updateEntryNotes(entry.id, notes)} 
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
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>)}
          </TabsContent>
        </Tabs>
      </Card>
    </div>;
};

export default TimeEntryTimeInOut;
