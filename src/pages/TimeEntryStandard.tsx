
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import TimeEntryHeader from '@/components/TimeEntry/TimeEntryHeader';
import ProjectDetailsRow from '@/components/TimeEntry/ProjectDetailsRow';
import HoursEntryRow from '@/components/TimeEntry/HoursEntryRow';
import NotesAndSubmitRow from '@/components/TimeEntry/NotesAndSubmitRow';
import { useProjectData } from '@/components/TimeEntry/hooks/useProjectData';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import { format } from 'date-fns';

const TimeEntryStandard = () => {
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
  const [standardHours, setStandardHours] = useState('');
  const [overtimeHours, setOvertimeHours] = useState('');
  const [entries, setEntries] = useState([{
    id: 1,
    notes: ''
  }]);

  const { projects, employees, projectExtras, costCodes, loading } = useProjectData(selectedProject, selectedExtra);

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
    // Copy mock data from previous day
    setSelectedProject('1');
    setSelectedExtra('1');
    setSelectedCostCode('1');
    setStandardHours('8');
    setOvertimeHours('0');
    updateEntryNotes(entries[0].id, 'Continued work from previous day');
    
    toast({
      title: "Previous Day Copied",
      description: "Time entry data from previous day has been copied."
    });
  };

  const copyPreviousWeek = () => {
    // Copy mock data from previous week
    setSelectedProject('2');
    setSelectedExtra('3');
    setSelectedCostCode('2');
    setStandardHours('7.5');
    setOvertimeHours('0.5');
    updateEntryNotes(entries[0].id, 'Weekly routine work pattern');
    
    toast({
      title: "Previous Week Copied",
      description: "Time entry data from previous week has been copied."
    });
  };

  const handleSubmit = async () => {
    if (!selectedProject || !selectedCostCode || !user) {
      toast({
        title: "Missing Information",
        description: "Please select project, cost code, and enter hours.",
        variant: "destructive"
      });
      return;
    }

    const datesToSubmit = selectedDates.length > 0 
      ? selectedDates.map(date => format(date, 'yyyy-MM-dd'))
      : selectedDate ? [selectedDate] : [format(new Date(), 'yyyy-MM-dd')];

    const employeesToSubmit = selectedEmployees.length > 0 ? selectedEmployees : [user.employeeId];

    try {
      for (const employeeId of employeesToSubmit) {
        for (const dateWorked of datesToSubmit) {
          for (const entry of entries) {
            // Create standard hours entry
            if (parseFloat(standardHours) > 0) {
              await createEntry({
                employeeID: employeeId,
                dateWorked: dateWorked,
                projectID: parseInt(selectedProject),
                extraID: selectedExtra ? parseInt(selectedExtra) : 0,
                costCodeID: parseInt(selectedCostCode),
                payID: 1,
                hours: parseFloat(standardHours),
                unionID: 1,
                entryType: 'Standard',
                notes: entry.notes,
                status: 'Draft',
                createdBy: user.employeeId,
                createdDate: new Date().toISOString(),
                modifiedBy: '',
                modifiedDate: '',
                exportedDate: '',
                startTime: '',
                endTime: '',
                breakInTime: '',
                breakOutTime: '',
                timeIn: '',
                timeOut: '',
                breakIn: '',
                breakOut: ''
              });
            }

            // Create overtime hours entry
            if (parseFloat(overtimeHours) > 0) {
              await createEntry({
                employeeID: employeeId,
                dateWorked: dateWorked,
                projectID: parseInt(selectedProject),
                extraID: selectedExtra ? parseInt(selectedExtra) : 0,
                costCodeID: parseInt(selectedCostCode),
                payID: 2,
                hours: parseFloat(overtimeHours),
                unionID: 1,
                entryType: 'Standard',
                notes: entry.notes,
                status: 'Draft',
                createdBy: user.employeeId,
                createdDate: new Date().toISOString(),
                modifiedBy: '',
                modifiedDate: '',
                exportedDate: '',
                startTime: '',
                endTime: '',
                breakInTime: '',
                breakOutTime: '',
                timeIn: '',
                timeOut: '',
                breakIn: '',
                breakOut: ''
              });
            }
          }
        }
      }

      // Reset form
      setStandardHours('');
      setOvertimeHours('');
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

  const totalHours = (parseFloat(standardHours) || 0) + (parseFloat(overtimeHours) || 0);

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
                    <button
                      onClick={() => deleteRow(entry.id)}
                      className="h-8 w-8 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 flex items-center justify-center"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Combined Project Details and Hours Entry Section */}
                <div className="bg-muted/30 rounded-lg p-2 border space-y-3">
                  {/* Project Details Row */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Project & Hours Details</h4>
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

                  {/* Hours Entry Row */}
                  <div className="border-t pt-2">
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

                {/* Notes Section - Individual per entry */}
                <div className="bg-muted/30 rounded-lg p-2 border">
                  <NotesAndSubmitRow 
                    notes={entry.notes} 
                    setNotes={(notes) => updateEntryNotes(entry.id, notes)} 
                    showTotalHours={false}
                    onSubmit={handleSubmit}
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
