
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import { calculateWorkHours } from '@/utils/timeCalculations';
import ProjectDetailsRow from './ProjectDetailsRow';

interface TimeInOutEntry {
  id: number;
  date: string;
  timeInHour: string;
  timeInMinute: string;
  timeInPeriod: 'AM' | 'PM';
  timeOutHour: string;
  timeOutMinute: string;
  timeOutPeriod: 'AM' | 'PM';
  breakInHour: string;
  breakInMinute: string;
  breakInPeriod: 'AM' | 'PM';
  breakOutHour: string;
  breakOutMinute: string;
  breakOutPeriod: 'AM' | 'PM';
  notes: string;
}

const NewTimeInOut = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { createEntry } = useTimesheetData(user?.employeeId || '');
  
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  
  const [entries, setEntries] = useState<TimeInOutEntry[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      timeInHour: '',
      timeInMinute: '00',
      timeInPeriod: 'AM',
      timeOutHour: '',
      timeOutMinute: '00',
      timeOutPeriod: 'PM',
      breakInHour: '',
      breakInMinute: '00',
      breakInPeriod: 'PM',
      breakOutHour: '',
      breakOutMinute: '00',
      breakOutPeriod: 'PM',
      notes: ''
    }
  ]);

  const updateEntry = (id: number, field: keyof TimeInOutEntry, value: string | 'AM' | 'PM') => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const addEntry = () => {
    const newEntry: TimeInOutEntry = {
      id: Math.max(...entries.map(e => e.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      timeInHour: '',
      timeInMinute: '00',
      timeInPeriod: 'AM',
      timeOutHour: '',
      timeOutMinute: '00',
      timeOutPeriod: 'PM',
      breakInHour: '',
      breakInMinute: '00',
      breakInPeriod: 'PM',
      breakOutHour: '',
      breakOutMinute: '00',
      breakOutPeriod: 'PM',
      notes: ''
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const setQuickTime = (entryId: number, startHour: string, startPeriod: 'AM' | 'PM', endHour: string, endPeriod: 'AM' | 'PM') => {
    updateEntry(entryId, 'timeInHour', startHour);
    updateEntry(entryId, 'timeInPeriod', startPeriod);
    updateEntry(entryId, 'timeOutHour', endHour);
    updateEntry(entryId, 'timeOutPeriod', endPeriod);
    updateEntry(entryId, 'breakInHour', '12');
    updateEntry(entryId, 'breakInPeriod', 'PM');
    updateEntry(entryId, 'breakOutHour', '12');
    updateEntry(entryId, 'breakOutMinute', '30');
    updateEntry(entryId, 'breakOutPeriod', 'PM');
  };

  const calculateHours = (entry: TimeInOutEntry) => {
    if (!entry.timeInHour || !entry.timeOutHour) return 0;

    const timeCalculation = calculateWorkHours(
      { hour: entry.timeInHour, minute: entry.timeInMinute, period: entry.timeInPeriod },
      { hour: entry.timeOutHour, minute: entry.timeOutMinute, period: entry.timeOutPeriod },
      entry.breakInHour ? { hour: entry.breakInHour, minute: entry.breakInMinute, period: entry.breakInPeriod } : undefined,
      entry.breakOutHour ? { hour: entry.breakOutHour, minute: entry.breakOutMinute, period: entry.breakOutPeriod } : undefined
    );

    return timeCalculation.isValid ? timeCalculation.totalHours : 0;
  };

  const handleSubmit = async () => {
    if (!selectedProject || !selectedCostCode || !user) {
      toast({
        title: "Missing Information",
        description: "Please select project and cost code.",
        variant: "destructive"
      });
      return;
    }

    try {
      for (const entry of entries) {
        const totalHours = calculateHours(entry);
        
        if (totalHours > 0) {
          await createEntry({
            employeeID: user.employeeId,
            dateWorked: entry.date,
            projectID: parseInt(selectedProject),
            extraID: selectedExtra ? parseInt(selectedExtra) : 0,
            costCodeID: parseInt(selectedCostCode),
            payID: 1,
            hours: totalHours,
            unionID: 1,
            entryType: 'TimeInOut',
            notes: entry.notes,
            status: 'Draft',
            createdBy: user.employeeId,
            createdDate: new Date().toISOString(),
            modifiedBy: '',
            modifiedDate: '',
            exportedDate: '',
            startTime: `${entry.timeInHour}:${entry.timeInMinute}`,
            endTime: `${entry.timeOutHour}:${entry.timeOutMinute}`,
            breakInTime: entry.breakInHour ? `${entry.breakInHour}:${entry.breakInMinute}` : '',
            breakOutTime: entry.breakOutHour ? `${entry.breakOutHour}:${entry.breakOutMinute}` : '',
            timeIn: `${entry.timeInHour}:${entry.timeInMinute}`,
            timeOut: `${entry.timeOutHour}:${entry.timeOutMinute}`,
            breakIn: entry.breakInHour ? `${entry.breakInHour}:${entry.breakInMinute}` : '',
            breakOut: entry.breakOutHour ? `${entry.breakOutHour}:${entry.breakOutMinute}` : ''
          });
        }
      }

      toast({
        title: "Success",
        description: "Time entries created successfully."
      });

      // Reset form
      setEntries([{
        id: 1,
        date: new Date().toISOString().split('T')[0],
        timeInHour: '',
        timeInMinute: '00',
        timeInPeriod: 'AM',
        timeOutHour: '',
        timeOutMinute: '00',
        timeOutPeriod: 'PM',
        breakInHour: '',
        breakInMinute: '00',
        breakInPeriod: 'PM',
        breakOutHour: '',
        breakOutMinute: '00',
        breakOutPeriod: 'PM',
        notes: ''
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create time entries.",
        variant: "destructive"
      });
    }
  };

  const hours = Array.from({length: 12}, (_, i) => (i + 1).toString());
  const minutes = ['00', '15', '30', '45'];

  return (
    <div className="max-w-full mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Time In/Out</h1>
        <Button onClick={addEntry} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <Card>
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
          
          <TabsContent value="time-in-out" className="mt-0 p-4 space-y-4">
            {/* Project Details */}
            <Card className="p-4">
              <h3 className="font-medium mb-4">Project Details</h3>
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
                useMultiDateSelection={false}
              />
            </Card>

            {/* Time Entries */}
            {entries.map((entry, index) => (
              <Card key={entry.id} className="p-4">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Entry {index + 1}</CardTitle>
                    {entries.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeEntry(entry.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {/* Date */}
                  <div>
                    <Label htmlFor={`date-${entry.id}`}>Date</Label>
                    <Input
                      id={`date-${entry.id}`}
                      type="date"
                      value={entry.date}
                      onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                    />
                  </div>

                  {/* Time In/Out */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Time In</Label>
                      <div className="flex gap-2">
                        <Select value={entry.timeInHour} onValueChange={(value) => updateEntry(entry.id, 'timeInHour', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Hour" />
                          </SelectTrigger>
                          <SelectContent>
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.timeInMinute} onValueChange={(value) => updateEntry(entry.id, 'timeInMinute', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {minutes.map(minute => (
                              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.timeInPeriod} onValueChange={(value: 'AM' | 'PM') => updateEntry(entry.id, 'timeInPeriod', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Time Out</Label>
                      <div className="flex gap-2">
                        <Select value={entry.timeOutHour} onValueChange={(value) => updateEntry(entry.id, 'timeOutHour', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Hour" />
                          </SelectTrigger>
                          <SelectContent>
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.timeOutMinute} onValueChange={(value) => updateEntry(entry.id, 'timeOutMinute', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {minutes.map(minute => (
                              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.timeOutPeriod} onValueChange={(value: 'AM' | 'PM') => updateEntry(entry.id, 'timeOutPeriod', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Break Times */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Break In</Label>
                      <div className="flex gap-2">
                        <Select value={entry.breakInHour} onValueChange={(value) => updateEntry(entry.id, 'breakInHour', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Hour" />
                          </SelectTrigger>
                          <SelectContent>
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.breakInMinute} onValueChange={(value) => updateEntry(entry.id, 'breakInMinute', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {minutes.map(minute => (
                              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.breakInPeriod} onValueChange={(value: 'AM' | 'PM') => updateEntry(entry.id, 'breakInPeriod', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Break Out</Label>
                      <div className="flex gap-2">
                        <Select value={entry.breakOutHour} onValueChange={(value) => updateEntry(entry.id, 'breakOutHour', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="Hour" />
                          </SelectTrigger>
                          <SelectContent>
                            {hours.map(hour => (
                              <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.breakOutMinute} onValueChange={(value) => updateEntry(entry.id, 'breakOutMinute', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {minutes.map(minute => (
                              <SelectItem key={minute} value={minute}>{minute}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={entry.breakOutPeriod} onValueChange={(value: 'AM' | 'PM') => updateEntry(entry.id, 'breakOutPeriod', value)}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="AM">AM</SelectItem>
                            <SelectItem value="PM">PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Quick Time Buttons */}
                  <div className="flex gap-2">
                    <span className="text-sm text-muted-foreground self-center">Quick:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickTime(entry.id, '8', 'AM', '5', 'PM')}
                    >
                      8-5
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickTime(entry.id, '7', 'AM', '4', 'PM')}
                    >
                      7-4
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickTime(entry.id, '9', 'AM', '6', 'PM')}
                    >
                      9-6
                    </Button>
                  </div>

                  {/* Total Hours Display */}
                  <div className="p-3 bg-muted/50 rounded">
                    <span className="text-sm font-medium">
                      Total Hours: {calculateHours(entry).toFixed(2)}
                    </span>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor={`notes-${entry.id}`}>Notes</Label>
                    <Textarea
                      id={`notes-${entry.id}`}
                      value={entry.notes}
                      onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                      placeholder="Add any additional notes..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Submit */}
            <div className="flex justify-end">
              <Button onClick={handleSubmit} className="min-w-32">
                Submit Entries
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default NewTimeInOut;
