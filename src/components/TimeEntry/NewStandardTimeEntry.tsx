
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useTimesheetData } from '@/hooks/useTimesheetData';
import ProjectDetailsRow from './ProjectDetailsRow';

interface TimeEntry {
  id: number;
  date: string;
  standardHours: string;
  overtimeHours: string;
  notes: string;
}

const NewStandardTimeEntry = () => {
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
  
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      standardHours: '',
      overtimeHours: '',
      notes: ''
    }
  ]);

  const updateEntry = (id: number, field: keyof TimeEntry, value: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const addEntry = () => {
    const newEntry: TimeEntry = {
      id: Math.max(...entries.map(e => e.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      standardHours: '',
      overtimeHours: '',
      notes: ''
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter(entry => entry.id !== id));
    }
  };

  const setQuickHours = (entryId: number, hours: number) => {
    updateEntry(entryId, 'standardHours', hours.toString());
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
        const standardHrs = parseFloat(entry.standardHours) || 0;
        const overtimeHrs = parseFloat(entry.overtimeHours) || 0;

        if (standardHrs > 0) {
          await createEntry({
            employeeID: user.employeeId,
            dateWorked: entry.date,
            projectID: parseInt(selectedProject),
            extraID: selectedExtra ? parseInt(selectedExtra) : 0,
            costCodeID: parseInt(selectedCostCode),
            payID: 1,
            hours: standardHrs,
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

        if (overtimeHrs > 0) {
          await createEntry({
            employeeID: user.employeeId,
            dateWorked: entry.date,
            projectID: parseInt(selectedProject),
            extraID: selectedExtra ? parseInt(selectedExtra) : 0,
            costCodeID: parseInt(selectedCostCode),
            payID: 2,
            hours: overtimeHrs,
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

      toast({
        title: "Success",
        description: "Time entries created successfully."
      });

      // Reset form
      setEntries([{
        id: 1,
        date: new Date().toISOString().split('T')[0],
        standardHours: '',
        overtimeHours: '',
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

  return (
    <div className="max-w-full mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Time Entry</h1>
        <Button onClick={addEntry} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      <Card>
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
          
          <TabsContent value="enter-hours" className="mt-0 p-4 space-y-4">
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

                  {/* Hours */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`standard-${entry.id}`}>Standard Hours</Label>
                      <Input
                        id={`standard-${entry.id}`}
                        type="number"
                        step="0.25"
                        min="0"
                        max="24"
                        value={entry.standardHours}
                        onChange={(e) => updateEntry(entry.id, 'standardHours', e.target.value)}
                        placeholder="8.0"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`overtime-${entry.id}`}>Overtime Hours</Label>
                      <Input
                        id={`overtime-${entry.id}`}
                        type="number"
                        step="0.25"
                        min="0"
                        max="24"
                        value={entry.overtimeHours}
                        onChange={(e) => updateEntry(entry.id, 'overtimeHours', e.target.value)}
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  {/* Quick Hours */}
                  <div className="flex gap-2">
                    <span className="text-sm text-muted-foreground self-center">Quick:</span>
                    {[4, 6, 8, 10, 12].map((hours) => (
                      <Button
                        key={hours}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuickHours(entry.id, hours)}
                      >
                        {hours}h
                      </Button>
                    ))}
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

export default NewStandardTimeEntry;
