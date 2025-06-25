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
import { CalendarIcon, Plus, X, Copy, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { TabContentProps } from './types';

interface StandardHoursEntry {
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

const StandardHoursTab: React.FC<TabContentProps> = ({
  entries,
  setEntries,
  selectedDates,
  setSelectedDates,
  useMultiDateSelection,
  setUseMultiDateSelection,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [standardEntries, setStandardEntries] = useState<StandardHoursEntry[]>([
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

  const addEntry = () => {
    const newEntry: StandardHoursEntry = {
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
    setStandardEntries([...standardEntries, newEntry]);
  };

  const removeEntry = (id: string) => {
    if (standardEntries.length > 1) {
      setStandardEntries(standardEntries.filter(entry => entry.id !== id));
    }
  };

  const duplicateEntry = (id: string) => {
    const entryToDuplicate = standardEntries.find(entry => entry.id === id);
    if (entryToDuplicate) {
      const newEntry = {
        ...entryToDuplicate,
        id: Date.now().toString()
      };
      setStandardEntries([...standardEntries, newEntry]);
    }
  };

  const updateEntry = (id: string, field: keyof StandardHoursEntry, value: any) => {
    setStandardEntries(entries => 
      entries.map(entry => 
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    for (let i = 0; i < standardEntries.length; i++) {
      const entry = standardEntries[i];
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
      toast.success(`${standardEntries.length} time ${standardEntries.length === 1 ? 'entry' : 'entries'} submitted successfully!`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Standard Hours Entry</span>
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {standardEntries.map((entry, index) => (
              <Card key={entry.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Entry {index + 1}</h3>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateEntry(entry.id)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {standardEntries.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEntry(entry.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`date-${entry.id}`}>Date Worked</Label>
                      <Input
                        id={`date-${entry.id}`}
                        type="date"
                        value={entry.dateWorked}
                        onChange={(e) => updateEntry(entry.id, 'dateWorked', e.target.value)}
                        className="w-full"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`employee-${entry.id}`}>Employee ID</Label>
                      <Input
                        id={`employee-${entry.id}`}
                        value={entry.employeeId}
                        onChange={(e) => updateEntry(entry.id, 'employeeId', e.target.value)}
                        placeholder="Employee ID"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`project-${entry.id}`}>Project</Label>
                      <Select 
                        value={entry.projectCode} 
                        onValueChange={(value) => updateEntry(entry.id, 'projectCode', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.code} value={project.code}>
                              {project.code} - {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`costcode-${entry.id}`}>Cost Code</Label>
                      <Select 
                        value={entry.costCode} 
                        onValueChange={(value) => updateEntry(entry.id, 'costCode', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select cost code" />
                        </SelectTrigger>
                        <SelectContent>
                          {costCodes.map((costCode) => (
                            <SelectItem key={costCode.code} value={costCode.code}>
                              {costCode.code} - {costCode.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`standard-${entry.id}`}>Standard Hours</Label>
                      <Input
                        id={`standard-${entry.id}`}
                        type="number"
                        step="0.25"
                        min="0"
                        max="16"
                        value={entry.standardHours}
                        onChange={(e) => updateEntry(entry.id, 'standardHours', parseFloat(e.target.value) || 0)}
                        placeholder="8.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`overtime-${entry.id}`}>Overtime Hours</Label>
                      <Input
                        id={`overtime-${entry.id}`}
                        type="number"
                        step="0.25"
                        min="0"
                        max="16"
                        value={entry.overtimeHours}
                        onChange={(e) => updateEntry(entry.id, 'overtimeHours', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Total Hours</Label>
                      <div className="flex items-center h-10 px-3 py-2 border border-input bg-background rounded-md">
                        <Badge variant="secondary">
                          {(entry.standardHours + entry.overtimeHours).toFixed(2)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`notes-${entry.id}`}>Notes</Label>
                    <Textarea
                      id={`notes-${entry.id}`}
                      value={entry.notes}
                      onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                      placeholder="Optional notes..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : `Submit ${standardEntries.length} ${standardEntries.length === 1 ? 'Entry' : 'Entries'}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StandardHoursTab;
