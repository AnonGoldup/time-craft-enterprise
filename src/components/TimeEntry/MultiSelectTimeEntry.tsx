// src/components/TimeEntry/MultiSelectTimeEntry.tsx
import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface Employee {
  EmployeeID: string;
  FullName: string;
  Email: string;
  Class: string;
}

interface Project {
  ProjectID: number;
  ProjectCode: string;
  ProjectDescription: string;
  DisplayName: string;
}

interface Extra {
  ExtraID: number;
  ExtraValue: string;
  Description: string;
}

interface CostCode {
  CostCodeID: number;
  CostCode: string;
  Description: string;
  DisplayText: string;
}

interface TimeEntryFormData {
  selectedDates: Date[];
  selectedEmployees: string[];
  projectCode: string;
  extraId?: number;
  costCodeId: number;
  entryType: 'standard' | 'timeinout';
  // Standard time fields
  standardHours?: number;
  overtimeHours?: number;
  // Time in/out fields
  timeIn?: string;
  timeOut?: string;
  breakIn?: string;
  breakOut?: string;
  notes?: string;
}

export default function MultiSelectTimeEntry() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [entryType, setEntryType] = useState<'standard' | 'timeinout'>('standard');

  const { register, handleSubmit, watch, setValue, reset } = useForm<TimeEntryFormData>();
  const selectedProject = watch('projectCode');
  const selectedExtra = watch('extraId');

  // Load initial data
  useEffect(() => {
    loadEmployees();
    loadProjects();
  }, []);

  // Load extras when project changes
  useEffect(() => {
    if (selectedProject) {
      loadExtras(selectedProject);
    } else {
      setExtras([]);
      setCostCodes([]);
    }
  }, [selectedProject]);

  // Load cost codes when project and extra change
  useEffect(() => {
    if (selectedProject) {
      loadCostCodes(selectedProject, selectedExtra);
    }
  }, [selectedProject, selectedExtra]);

  const loadEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load employees",
        variant: "destructive"
      });
    }
  };

  const loadProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    }
  };

  const loadExtras = async (projectCode: string) => {
    try {
      const response = await api.get(`/projects/${projectCode}/extras`);
      setExtras(response.data);
    } catch (error) {
      console.error('Failed to load extras:', error);
      setExtras([]);
    }
  };

  const loadCostCodes = async (projectCode: string, extraId?: number) => {
    try {
      const url = extraId 
        ? `/projects/${projectCode}/costcodes?extraId=${extraId}`
        : `/projects/${projectCode}/costcodes`;
      const response = await api.get(url);
      setCostCodes(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load cost codes",
        variant: "destructive"
      });
      setCostCodes([]);
    }
  };

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (!dates) return;
    setSelectedDates(dates);
  };

  const handleEmployeeToggle = (employeeId: string) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const onSubmit = async (data: TimeEntryFormData) => {
    if (selectedDates.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one date",
        variant: "destructive"
      });
      return;
    }

    if (selectedEmployees.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please select at least one employee",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const entries = [];
      
      // Create an entry for each combination of date and employee
      for (const date of selectedDates) {
        for (const employeeId of selectedEmployees) {
          const entry = {
            employeeId,
            dateWorked: format(date, 'yyyy-MM-dd'),
            projectCode: data.projectCode,
            extraId: data.extraId || null,
            costCodeId: data.costCodeId,
            entryType: entryType,
            notes: data.notes || '',
            // Standard time fields
            ...(entryType === 'standard' && {
              standardHours: data.standardHours || 0,
              overtimeHours: data.overtimeHours || 0,
            }),
            // Time in/out fields
            ...(entryType === 'timeinout' && {
              timeIn: data.timeIn,
              timeOut: data.timeOut,
              breakIn: data.breakIn,
              breakOut: data.breakOut,
            }),
          };
          entries.push(entry);
        }
      }

      // Submit all entries
      const promises = entries.map(entry => api.post('/timesheets', entry));
      await Promise.all(promises);

      toast({
        title: "Success",
        description: `Created ${entries.length} timesheet entries successfully`,
      });

      // Reset form
      reset();
      setSelectedDates([]);
      setSelectedEmployees([]);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create timesheet entries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Multi-Select Time Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Dates</Label>
            <div className="flex gap-4">
              <Calendar
                mode="multiple"
                selected={selectedDates}
                onSelect={handleDateSelect}
                className="rounded-md border"
              />
              <div className="flex-1">
                <h4 className="font-medium mb-2">Selected Dates:</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {selectedDates.map((date, index) => (
                    <div key={index} className="text-sm">
                      {format(date, 'EEEE, MMMM d, yyyy')}
                    </div>
                  ))}
                  {selectedDates.length === 0 && (
                    <p className="text-muted-foreground text-sm">No dates selected</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Employee Selection */}
          <div className="space-y-2">
            <Label>Select Employees</Label>
            <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2">
                {employees.map((employee) => (
                  <div key={employee.EmployeeID} className="flex items-center space-x-2">
                    <Checkbox
                      id={employee.EmployeeID}
                      checked={selectedEmployees.includes(employee.EmployeeID)}
                      onCheckedChange={() => handleEmployeeToggle(employee.EmployeeID)}
                    />
                    <label
                      htmlFor={employee.EmployeeID}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {employee.FullName} ({employee.Class})
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedEmployees.length} employee(s) selected
            </p>
          </div>

          {/* Project Selection */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select
                value={selectedProject}
                onValueChange={(value) => setValue('projectCode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.ProjectCode} value={project.ProjectCode}>
                      {project.DisplayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Extra Selection */}
            <div className="space-y-2">
              <Label htmlFor="extra">Extra (Optional)</Label>
              <Select
                value={selectedExtra?.toString()}
                onValueChange={(value) => setValue('extraId', parseInt(value))}
                disabled={!selectedProject || extras.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select extra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {extras.map((extra) => (
                    <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
                      {extra.ExtraValue} - {extra.Description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cost Code Selection */}
            <div className="space-y-2">
              <Label htmlFor="costCode">Cost Code</Label>
              <Select
                value={watch('costCodeId')?.toString()}
                onValueChange={(value) => setValue('costCodeId', parseInt(value))}
                disabled={!selectedProject || costCodes.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cost code" />
                </SelectTrigger>
                <SelectContent>
                  {costCodes.map((code) => (
                    <SelectItem key={code.CostCodeID} value={code.CostCodeID.toString()}>
                      {code.DisplayText}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Entry Type Tabs */}
          <Tabs value={entryType} onValueChange={(v) => setEntryType(v as 'standard' | 'timeinout')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">Standard Time</TabsTrigger>
              <TabsTrigger value="timeinout">Time In/Out</TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="standardHours">Standard Hours</Label>
                  <Input
                    id="standardHours"
                    type="number"
                    step="0.25"
                    min="0"
                    max="24"
                    {...register('standardHours')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overtimeHours">Overtime Hours</Label>
                  <Input
                    id="overtimeHours"
                    type="number"
                    step="0.25"
                    min="0"
                    max="24"
                    {...register('overtimeHours')}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeinout" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeIn">Time In</Label>
                  <Input
                    id="timeIn"
                    type="time"
                    {...register('timeIn')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeOut">Time Out</Label>
                  <Input
                    id="timeOut"
                    type="time"
                    {...register('timeOut')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakIn">Break In</Label>
                  <Input
                    id="breakIn"
                    type="time"
                    {...register('breakIn')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakOut">Break Out</Label>
                  <Input
                    id="breakOut"
                    type="time"
                    {...register('breakOut')}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <textarea
              id="notes"
              className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register('notes')}
            />
          </div>

          {/* Summary */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Entry Summary:</h4>
            <p className="text-sm">
              Creating {selectedDates.length} × {selectedEmployees.length} = {selectedDates.length * selectedEmployees.length} entries
            </p>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Creating Entries..." : "Submit All Entries"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
