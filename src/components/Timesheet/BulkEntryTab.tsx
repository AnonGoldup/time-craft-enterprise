
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Building, Hash, Plus, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';

interface BulkTimeEntryData {
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  notes: string;
}

interface BulkEntryTabProps {
  onSubmit: (entries: BulkTimeEntryData[]) => void;
  managerMode?: boolean;
}

export const BulkEntryTab: React.FC<BulkEntryTabProps> = ({ onSubmit, managerMode = false }) => {
  const [entries, setEntries] = useState<BulkTimeEntryData[]>([
    {
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

  const addEntry = () => {
    const lastEntry = entries[entries.length - 1];
    setEntries([...entries, {
      ...lastEntry,
      notes: ''
    }]);
  };

  const removeEntry = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const updateEntry = (index: number, field: keyof BulkTimeEntryData, value: any) => {
    const updated = [...entries];
    updated[index] = { ...updated[index], [field]: value };
    setEntries(updated);
  };

  const handleSubmit = () => {
    // Validation
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (!entry.projectCode) {
        toast.error(`Please select a project for entry ${i + 1}`);
        return;
      }
      if (!entry.costCode) {
        toast.error(`Please select a cost code for entry ${i + 1}`);
        return;
      }
      if (entry.standardHours + entry.overtimeHours === 0) {
        toast.error(`Please enter hours for entry ${i + 1}`);
        return;
      }
    }

    onSubmit(entries);
    toast.success(`${entries.length} entries submitted successfully!`);
  };

  return (
    <CardContent className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Bulk Entry</h3>
      </div>

      <div className="space-y-6">
        {entries.map((entry, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Entry {index + 1}</h4>
              {entries.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEntry(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Employee & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>Employee *</span>
                </Label>
                <Select 
                  value={entry.employeeId} 
                  onValueChange={(value) => updateEntry(index, 'employeeId', value)}
                  disabled={!managerMode}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JSMITH">John Smith - Foreman</SelectItem>
                    <SelectItem value="MJONES">Mary Jones - Journeyman</SelectItem>
                    <SelectItem value="BWILSON">Bob Wilson - Apprentice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Date Worked *</span>
                </Label>
                <Input
                  type="date"
                  value={entry.dateWorked}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => updateEntry(index, 'dateWorked', e.target.value)}
                />
              </div>
            </div>

            {/* Project & Extra Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>Project *</span>
                </Label>
                <Select 
                  value={entry.projectCode} 
                  onValueChange={(value) => updateEntry(index, 'projectCode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21-0066">21-0066 - Edmonton EXPO SOLAR IPD</SelectItem>
                    <SelectItem value="22-0006">22-0006 - AltaPro Service Department</SelectItem>
                    <SelectItem value="23-0004">23-0004 - Office and Shop OH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Extra</Label>
                <Select 
                  value={entry.extraValue} 
                  onValueChange={(value) => updateEntry(index, 'extraValue', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="Phase 1">Phase 1</SelectItem>
                    <SelectItem value="Phase 2">Phase 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Cost Code */}
            <div>
              <Label className="flex items-center space-x-1">
                <Hash className="w-4 h-4" />
                <span>Cost Code *</span>
              </Label>
              <Select 
                value={entry.costCode} 
                onValueChange={(value) => updateEntry(index, 'costCode', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Cost Code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="001-040-043">001-040-043 - Direct Labor</SelectItem>
                  <SelectItem value="001-500-501">001-500-501 - Vehicle Travel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Hours Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Standard Hours</Label>
                <Input
                  type="number"
                  step="0.25"
                  min="0"
                  max="16"
                  value={entry.standardHours}
                  onChange={(e) => updateEntry(index, 'standardHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Overtime Hours</Label>
                <Input
                  type="number"
                  step="0.25"
                  min="0"
                  max="16"
                  value={entry.overtimeHours}
                  onChange={(e) => updateEntry(index, 'overtimeHours', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {/* Hours Display */}
            <div className="bg-muted p-3 rounded-lg">
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="text-xs text-muted-foreground">Standard</div>
                  <div className="font-bold">{entry.standardHours.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Overtime</div>
                  <div className="font-bold text-orange-600">{entry.overtimeHours.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Total</div>
                  <div className="font-bold text-blue-600">{(entry.standardHours + entry.overtimeHours).toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea
                rows={2}
                placeholder="Enter any additional notes..."
                value={entry.notes}
                onChange={(e) => updateEntry(index, 'notes', e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Add Entry Button */}
        <Button 
          variant="outline" 
          onClick={addEntry}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Entry
        </Button>

        {/* Submit Button */}
        <Button onClick={handleSubmit} className="w-full">
          Submit {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
        </Button>
      </div>
    </CardContent>
  );
};
