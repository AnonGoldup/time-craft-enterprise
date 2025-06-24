
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, Building, Hash, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import MultiDatePicker from '@/components/TimeEntry/MultiDatePicker';
import { TabContentProps, TimeEntryData } from './types';
import { mockEmployees, projects, extras, costCodes } from './mockEmployees';

export const StandardHoursTab: React.FC<TabContentProps> = ({
  entries,
  setEntries,
  selectedDates,
  setSelectedDates,
  useMultiDateSelection,
  setUseMultiDateSelection,
  onSubmit,
  managerMode
}) => {
  const addNewEntry = () => {
    const newEntry: TimeEntryData = {
      employeeId: 'JSMITH',
      dateWorked: new Date().toISOString().split('T')[0],
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 8,
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

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Standard Hours Entry</h3>
          <Badge variant="secondary">
            {useMultiDateSelection && selectedDates.length > 0 
              ? `${selectedDates.length} dates selected`
              : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`
            }
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant={useMultiDateSelection ? "default" : "outline"}
            size="sm"
            onClick={() => setUseMultiDateSelection(!useMultiDateSelection)}
          >
            Multi-Date
          </Button>
          {!useMultiDateSelection && (
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
          )}
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Multi-Date Picker */}
        {useMultiDateSelection && (
          <div className="mb-6 p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <Label className="font-medium">Select Multiple Dates</Label>
            </div>
            <MultiDatePicker
              selectedDates={selectedDates}
              onDatesChange={setSelectedDates}
            />
            <p className="text-sm text-blue-600 mt-2">
              Selected dates will use the same project, cost code, and hours settings below.
            </p>
          </div>
        )}

        {/* Show only first entry for multi-date mode, or all entries for regular mode */}
        {(useMultiDateSelection ? [entries[0]] : entries).map((entry, index) => (
          <div key={index} className="border rounded-lg p-4 relative">
            {!useMultiDateSelection && entries.length > 1 && (
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
            
            {!useMultiDateSelection && (
              <div className="mb-4">
                <Badge variant="outline">Entry {index + 1}</Badge>
              </div>
            )}

            {/* Employee & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Employee *</span>
                </Label>
                <Select 
                  value={entry.employeeId} 
                  onValueChange={(value) => handleInputChange(index, 'employeeId', value)}
                  disabled={!managerMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEmployees.map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} - {emp.class}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {!useMultiDateSelection && (
                <div>
                  <Label className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Date Worked *</span>
                  </Label>
                  <Input
                    type="date"
                    value={entry.dateWorked}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange(index, 'dateWorked', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Project & Extra Row */}
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

            {/* Cost Code */}
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

            {/* Hours Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Standard Hours (PayID 1)</Label>
                <Input
                  type="number"
                  step="0.25"
                  min="0"
                  max="16"
                  value={entry.standardHours}
                  onChange={(e) => handleInputChange(index, 'standardHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Overtime Hours (PayID 2)</Label>
                <Input
                  type="number"
                  step="0.25"
                  min="0"
                  max="16"
                  value={entry.overtimeHours}
                  onChange={(e) => handleInputChange(index, 'overtimeHours', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Hours Display */}
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

            {/* Hours Warning */}
            {(entry.standardHours + entry.overtimeHours) > 16 && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">
                  Total hours cannot exceed 16 per day (current: {(entry.standardHours + entry.overtimeHours).toFixed(2)})
                </span>
              </div>
            )}

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
          Submit {useMultiDateSelection && selectedDates.length > 0 
            ? `${selectedDates.length} Time Entries` 
            : entries.length === 1 ? 'Time Entry' : `${entries.length} Time Entries`
          }
        </Button>
      </form>
    </CardContent>
  );
};
