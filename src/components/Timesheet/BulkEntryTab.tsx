import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, X, Upload, Download } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BulkEntryTabProps {
  onSubmit: (entries: any[]) => void;
}

interface BulkEntry {
  id: string;
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  notes: string;
}

const BulkEntryTab: React.FC<BulkEntryTabProps> = ({ onSubmit }) => {
  const [bulkEntries, setBulkEntries] = useState<BulkEntry[]>([
    {
      id: '1',
      employeeId: 'JSMITH',
      dateWorked: new Date().toISOString().split('T')[0],
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 8,
      overtimeHours: 0,
      notes: ''
    }
  ]);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(['JSMITH']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projects = [
    { code: 'PROJ001', name: 'Office Building Construction' },
    { code: 'PROJ002', name: 'Highway Bridge Repair' },
    { code: 'PROJ003', name: 'Shopping Mall Development' }
  ];

  const costCodes = [
    { code: 'LAB001', name: 'General Labor' },
    { code: 'EQP001', name: 'Equipment Operation' },
    { code: 'MAT001', name: 'Material Handling' }
  ];

  const employees = [
    { id: 'JSMITH', name: 'John Smith' },
    { id: 'MJONES', name: 'Mary Jones' },
    { id: 'RBROWN', name: 'Robert Brown' },
    { id: 'SWILSON', name: 'Sarah Wilson' }
  ];

  const addEntry = () => {
    const newEntry: BulkEntry = {
      id: Date.now().toString(),
      employeeId: 'JSMITH',
      dateWorked: new Date().toISOString().split('T')[0],
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 8,
      overtimeHours: 0,
      notes: ''
    };
    setBulkEntries([...bulkEntries, newEntry]);
  };

  const removeEntry = (id: string) => {
    if (bulkEntries.length > 1) {
      setBulkEntries(bulkEntries.filter(entry => entry.id !== id));
    }
  };

  const updateEntry = (id: string, field: keyof BulkEntry, value: any) => {
    setBulkEntries(entries => 
      entries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const generateBulkEntries = () => {
    if (selectedDates.length === 0 || selectedEmployees.length === 0) {
      toast.error('Please select dates and employees');
      return;
    }

    const newEntries: BulkEntry[] = [];
    
    selectedEmployees.forEach(employeeId => {
      selectedDates.forEach(date => {
        newEntries.push({
          id: `${employeeId}-${date.toISOString().split('T')[0]}-${Date.now()}`,
          employeeId,
          dateWorked: date.toISOString().split('T')[0],
          projectCode: bulkEntries[0]?.projectCode || '',
          extraValue: 'Default',
          costCode: bulkEntries[0]?.costCode || '',
          standardHours: 8,
          overtimeHours: 0,
          notes: ''
        });
      });
    });

    setBulkEntries(newEntries);
    toast.success(`Generated ${newEntries.length} entries`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    for (let i = 0; i < bulkEntries.length; i++) {
      const entry = bulkEntries[i];
      if (!entry.projectCode) {
        toast.error(`Please select a project for entry ${i + 1}`);
        return;
      }
      
      if (!entry.costCode) {
        toast.error(`Please select a cost code for entry ${i + 1}`);
        return;
      }

      if (entry.standardHours + entry.overtimeHours === 0) {
        toast.error(`Please enter hours worked for entry ${i + 1}`);
        return;
      }

      if (entry.standardHours + entry.overtimeHours > 16) {
        toast.error(`Total hours cannot exceed 16 per day for entry ${i + 1}`);
        return;
      }
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(bulkEntries);
      toast.success(`${bulkEntries.length} bulk entries submitted successfully!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Entry Generation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      selectedDates.length === 0 && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDates.length > 0 
                      ? `${selectedDates.length} dates selected`
                      : "Select dates"
                    }
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates || [])}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Select Employees</Label>
              <Select 
                value={selectedEmployees[0] || ''} 
                onValueChange={(value) => {
                  if (!selectedEmployees.includes(value)) {
                    setSelectedEmployees([...selectedEmployees, value]);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employees" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.id} - {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedEmployees.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmployees.map((employeeId) => {
                    const employee = employees.find(e => e.id === employeeId);
                    return (
                      <Badge key={employeeId} variant="secondary" className="flex items-center gap-2">
                        {employee?.name || employeeId}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId))}
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <Button onClick={generateBulkEntries} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Generate Entries ({selectedDates.length} dates × {selectedEmployees.length} employees = {selectedDates.length * selectedEmployees.length} entries)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bulk Entries ({bulkEntries.length})</span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEntry}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Entry
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="max-h-96 overflow-y-auto space-y-3">
              {bulkEntries.map((entry, index) => (
                <Card key={entry.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">
                      {employees.find(e => e.id === entry.employeeId)?.name || entry.employeeId} - {entry.dateWorked}
                    </h4>
                    {bulkEntries.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEntry(entry.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Select 
                      value={entry.projectCode} 
                      onValueChange={(value) => updateEntry(entry.id, 'projectCode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.code} value={project.code}>
                            {project.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={entry.costCode} 
                      onValueChange={(value) => updateEntry(entry.id, 'costCode', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Cost Code" />
                      </SelectTrigger>
                      <SelectContent>
                        {costCodes.map((costCode) => (
                          <SelectItem key={costCode.code} value={costCode.code}>
                            {costCode.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Input
                      type="number"
                      step="0.25"
                      min="0"
                      max="16"
                      value={entry.standardHours}
                      onChange={(e) => updateEntry(entry.id, 'standardHours', parseFloat(e.target.value) || 0)}
                      placeholder="Std Hours"
                    />

                    <Input
                      type="number"
                      step="0.25"
                      min="0"
                      max="16"
                      value={entry.overtimeHours}
                      onChange={(e) => updateEntry(entry.id, 'overtimeHours', parseFloat(e.target.value) || 0)}
                      placeholder="OT Hours"
                    />
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : `Submit ${bulkEntries.length} Bulk ${bulkEntries.length === 1 ? 'Entry' : 'Entries'}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkEntryTab;
