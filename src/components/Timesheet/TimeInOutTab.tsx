
import React, { useState } from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, Building, Hash, Plus, Trash2, Timer } from 'lucide-react';
import { MultiDatePicker } from '@/components/TimeEntry/MultiDatePicker';
import { MultiEmployeeSelector } from '@/components/TimeEntry/MultiEmployeeSelector';
import { TabContentProps, TimeEntryData } from './types';
import { mockEmployees, projects, extras, costCodes } from './mockEmployees';

// Employee interface matching the Multi-Employee Selector
interface Employee {
  employeeId: string
  fullName: string
  email?: string
  class?: string
  isActive?: boolean
}

export const TimeInOutTab: React.FC<TabContentProps> = ({
  entries,
  setEntries,
  onSubmit
}) => {
  // Convert mock employees to proper format with required fields
  const employees: Employee[] = mockEmployees
    .filter(emp => emp.id && emp.name) // Filter first to ensure we have required data
    .map(emp => ({
      employeeId: emp.id!,
      fullName: emp.name!,
      email: `${emp.id!.toLowerCase()}@company.com`,
      class: emp.class || '',
      isActive: true
    }))

  const addNewEntry = () => {
    const newEntry: TimeEntryData = {
      employeeId: 'JSMITH',
      dateWorked: new Date().toISOString().split('T')[0],
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 0,
      overtimeHours: 0,
      notes: '',
      timeIn: '07:00',
      timeOut: '15:30',
      breakStart: '12:00',
      breakEnd: '12:30'
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const handleInputChange = (index: number, field: keyof TimeEntryData, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value
    };
    setEntries(newEntries);
  };

  const calculateHoursFromTimes = (timeIn: string, timeOut: string, breakStart?: string, breakEnd?: string) => {
    if (!timeIn || !timeOut) return { standardHours: 0, overtimeHours: 0 };
    
    const [inHour, inMin] = timeIn.split(':').map(Number);
    const [outHour, outMin] = timeOut.split(':').map(Number);
    
    let totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);
    
    // Subtract break time if provided
    if (breakStart && breakEnd) {
      const [breakStartHour, breakStartMin] = breakStart.split(':').map(Number);
      const [breakEndHour, breakEndMin] = breakEnd.split(':').map(Number);
      const breakMinutes = (breakEndHour * 60 + breakEndMin) - (breakStartHour * 60 + breakStartMin);
      totalMinutes -= breakMinutes;
    }
    
    const totalHours = totalMinutes / 60;
    const standardHours = Math.min(totalHours, 8);
    const overtimeHours = Math.max(0, totalHours - 8);
    
    return { standardHours, overtimeHours };
  };

  const handleTimeChange = (index: number, field: 'timeIn' | 'timeOut' | 'breakStart' | 'breakEnd', value: string) => {
    const newEntries = [...entries];
    newEntries[index] = {
      ...newEntries[index],
      [field]: value
    };
    
    // Recalculate hours if we have both time in and time out
    if (newEntries[index].timeIn && newEntries[index].timeOut) {
      const { standardHours, overtimeHours } = calculateHoursFromTimes(
        newEntries[index].timeIn!,
        newEntries[index].timeOut!,
        newEntries[index].breakStart,
        newEntries[index].breakEnd
      );
      
      newEntries[index].standardHours = standardHours;
      newEntries[index].overtimeHours = overtimeHours;
    }
    
    setEntries(newEntries);
  };

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Time In/Out Entry</h3>
          <Badge variant="secondary">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewEntry}
            className="flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </Button>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {entries.map((entry, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            {entries.length > 1 && (
              <div className="absolute top-2 right-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEntry(index)}
                  className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="mb-4">
              <Badge variant="outline">Entry {index + 1}</Badge>
            </div>

            {/* Employee & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Employee(s) *</Label>
                <MultiEmployeeSelector
                  employees={employees.filter(emp => emp.isActive !== false)}
                  selectedEmployees={employees.filter(emp => emp.employeeId === entry.employeeId)}
                  onEmployeeChange={(selected) => {
                    if (selected.length > 0) {
                      handleInputChange(index, 'employeeId', selected[0].employeeId);
                    }
                  }}
                  placeholder="Select employees..."
                  groupByClass={true}
                  disabled={false}
                />
              </div>
              <div>
                <Label>Date Worked *</Label>
                <MultiDatePicker
                  selectedDates={entry.dateWorked ? [new Date(entry.dateWorked)] : []}
                  onDateChange={(dates) => {
                    if (dates.length > 0) {
                      handleInputChange(index, 'dateWorked', dates[0].toISOString().split('T')[0]);
                    }
                  }}
                  placeholder="Select date..."
                  maxDates={1}
                />
              </div>
            </div>

            {/* Time In/Out Section */}
            <div className="border rounded-lg p-4 mb-4 bg-muted/50">
              <h4 className="text-sm font-medium mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Time Tracking
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Time In *</Label>
                  <Input
                    type="time"
                    value={entry.timeIn || ''}
                    onChange={(e) => handleTimeChange(index, 'timeIn', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Time Out *</Label>
                  <Input
                    type="time"
                    value={entry.timeOut || ''}
                    onChange={(e) => handleTimeChange(index, 'timeOut', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Break Start</Label>
                  <Input
                    type="time"
                    value={entry.breakStart || ''}
                    onChange={(e) => handleTimeChange(index, 'breakStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Break End</Label>
                  <Input
                    type="time"
                    value={entry.breakEnd || ''}
                    onChange={(e) => handleTimeChange(index, 'breakEnd', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Calculated Hours Display */}
            <div className="bg-muted p-4 rounded-lg mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Standard</div>
                  <div className="text-2xl font-bold">{entry.standardHours.toFixed(2)}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overtime</div>
                  <div className="text-2xl font-bold text-orange-600">{entry.overtimeHours.toFixed(2)}</div>
                </div>
                <div className="bg-card p-4 rounded-lg border">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</div>
                  <div className="text-2xl font-bold text-blue-600">{(entry.standardHours + entry.overtimeHours).toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-4">Project Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="flex items-center space-x-1">
                    <Building className="w-4 h-4" />
                    <span>Project *</span>
                  </Label>
                  <Select 
                    value={entry.projectCode} 
                    onValueChange={(value) => handleInputChange(index, 'projectCode', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.code} value={project.code}>
                          {project.code} - {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Extra</Label>
                  <Select 
                    value={entry.extraValue} 
                    onValueChange={(value) => handleInputChange(index, 'extraValue', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {extras.map(extra => (
                        <SelectItem key={extra.extraID} value={extra.extraValue}>
                          {extra.extraValue} - {extra.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mb-4">
                <Label className="flex items-center space-x-1">
                  <Hash className="w-4 h-4" />
                  <span>Cost Code *</span>
                </Label>
                <Select 
                  value={entry.costCode} 
                  onValueChange={(value) => handleInputChange(index, 'costCode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Cost Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {costCodes.map(code => (
                      <SelectItem key={code.costCodeID} value={code.costCode}>
                        {code.costCode} - {code.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea
                rows={3}
                placeholder="Enter any additional notes..."
                value={entry.notes}
                onChange={(e) => handleInputChange(index, 'notes', e.target.value)}
              />
            </div>
          </div>
        ))}

        <Button type="submit" className="w-full">
          Submit {entries.length} Time {entries.length === 1 ? 'Entry' : 'Entries'}
        </Button>
      </form>
    </CardContent>
  );
};
