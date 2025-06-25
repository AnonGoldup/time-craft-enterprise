
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TabContentProps } from './types';

const StandardHoursTab: React.FC<TabContentProps> = ({
  entries,
  setEntries,
  selectedDates,
  setSelectedDates,
  useMultiDateSelection,
  setUseMultiDateSelection,
  onSubmit
}) => {
  const projects = [
    { code: "PROJ001", name: "Office Building Renovation" },
    { code: "PROJ002", name: "Shopping Mall Construction" },
    { code: "PROJ003", name: "Residential Complex" }
  ];

  const costCodes = [
    { code: "LAB001", name: "General Labor" },
    { code: "EQP001", name: "Equipment Operation" },
    { code: "MAT001", name: "Material Handling" },
    { code: "SUP001", name: "Supervision" }
  ];

  const updateEntry = (index: number, field: keyof typeof entries[0], value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {entries.map((entry, index) => (
        <Card key={index} className="p-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center justify-between">
              Entry #{index + 1}
              <Badge variant="outline">
                {entry.dateWorked}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date */}
            <div>
              <Label htmlFor={`date-${index}`}>Date</Label>
              <Input
                id={`date-${index}`}
                type="date"
                value={entry.dateWorked}
                onChange={(e) => updateEntry(index, 'dateWorked', e.target.value)}
              />
            </div>

            {/* Project Selection */}
            <div>
              <Label>Project</Label>
              <Select value={entry.projectCode} onValueChange={(value) => updateEntry(index, 'projectCode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select project..." />
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

            {/* Cost Code */}
            <div>
              <Label>Cost Code</Label>
              <Select value={entry.costCode} onValueChange={(value) => updateEntry(index, 'costCode', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cost code..." />
                </SelectTrigger>
                <SelectContent>
                  {costCodes.map((code) => (
                    <SelectItem key={code.code} value={code.code}>
                      {code.code} - {code.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`standard-${index}`}>Standard Hours</Label>
                <Input
                  id={`standard-${index}`}
                  type="number"
                  step="0.25"
                  value={entry.standardHours}
                  onChange={(e) => updateEntry(index, 'standardHours', parseFloat(e.target.value) || 0)}
                  placeholder="8.0"
                />
              </div>
              <div>
                <Label htmlFor={`overtime-${index}`}>Overtime Hours</Label>
                <Input
                  id={`overtime-${index}`}
                  type="number"
                  step="0.25"
                  value={entry.overtimeHours}
                  onChange={(e) => updateEntry(index, 'overtimeHours', parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor={`notes-${index}`}>Notes</Label>
              <Textarea
                id={`notes-${index}`}
                value={entry.notes}
                onChange={(e) => updateEntry(index, 'notes', e.target.value)}
                placeholder="Add any additional notes..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit">
          Submit Entries
        </Button>
      </div>
    </form>
  );
};

export default StandardHoursTab;
