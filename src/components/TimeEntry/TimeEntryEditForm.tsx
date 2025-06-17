
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';
import ProjectDetailsRow from './ProjectDetailsRow';

interface TimeEntry {
  entryID: number;
  dateWorked: string;
  projectCode: string;
  projectDescription: string;
  extraValue?: string;
  costCode: string;
  timeIn?: string;
  timeOut?: string;
  breaks?: number;
  standardHours?: number;
  overtimeHours?: number;
  doubleTimeHours?: number;
  total: number;
  location?: string;
  comments?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  entryType: 'Standard' | 'TimeInOut';
}

interface TimeEntryEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  entry: TimeEntry | null;
  onSave: (updatedEntry: TimeEntry) => void;
}

const TimeEntryEditForm: React.FC<TimeEntryEditFormProps> = ({
  isOpen,
  onClose,
  entry,
  onSave
}) => {
  const [formData, setFormData] = useState<TimeEntry | null>(entry);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');

  React.useEffect(() => {
    if (entry) {
      setFormData(entry);
      // Initialize the cascade dropdown states based on entry data
      // Note: These would need to be mapped from the entry's string values to IDs
      setSelectedProject(''); // Would need to map projectCode to projectID
      setSelectedExtra(''); // Would need to map extraValue to extraID
      setSelectedCostCode(''); // Would need to map costCode to costCodeID
    }
  }, [entry]);

  if (!formData) return null;

  const handleInputChange = (field: keyof TimeEntry, value: string | number) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedExtra('');
    setSelectedCostCode('');
    // Update formData with the selected project details
    // This would need proper mapping from project ID to project code
  };

  const handleExtraChange = (extraId: string) => {
    setSelectedExtra(extraId);
    setSelectedCostCode('');
    // Update formData with the selected extra details
  };

  const handleCostCodeChange = (costCodeId: string) => {
    setSelectedCostCode(costCodeId);
    // Update formData with the selected cost code details
  };

  const handleSave = () => {
    if (formData) {
      // Recalculate total hours
      const standardHours = formData.standardHours || 0;
      const overtimeHours = formData.overtimeHours || 0;
      const doubleTimeHours = formData.doubleTimeHours || 0;
      const total = standardHours + overtimeHours + doubleTimeHours;

      const updatedEntry = { ...formData, total };
      onSave(updatedEntry);
      onClose();
      toast.success('Time entry updated successfully');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Time Entry #{formData.entryID}</DialogTitle>
          <DialogDescription>
            Make changes to your time entry. Only draft entries can be modified.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date */}
          <div>
            <Label htmlFor="dateWorked">Date Worked</Label>
            <Input
              id="dateWorked"
              type="date"
              value={formData.dateWorked}
              onChange={(e) => handleInputChange('dateWorked', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Cascading Project Selection */}
          <div>
            <Label className="text-base font-medium">Project Selection</Label>
            <div className="mt-2">
              <ProjectDetailsRow
                selectedProject={selectedProject}
                setSelectedProject={handleProjectChange}
                selectedExtra={selectedExtra}
                setSelectedExtra={handleExtraChange}
                selectedCostCode={selectedCostCode}
                setSelectedCostCode={handleCostCodeChange}
                selectedDate={formData.dateWorked}
                setSelectedDate={(date) => handleInputChange('dateWorked', date)}
                selectedEmployee=""
                setSelectedEmployee={() => {}}
                useCostCodeInput={false}
                useMultiDateSelection={false}
              />
            </div>
          </div>

          {/* Time In/Out for TimeInOut entries */}
          {formData.entryType === 'TimeInOut' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="timeIn">Time In</Label>
                <Input
                  id="timeIn"
                  type="time"
                  value={formData.timeIn || ''}
                  onChange={(e) => handleInputChange('timeIn', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="timeOut">Time Out</Label>
                <Input
                  id="timeOut"
                  type="time"
                  value={formData.timeOut || ''}
                  onChange={(e) => handleInputChange('timeOut', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="breaks">Breaks (hours)</Label>
                <Input
                  id="breaks"
                  type="number"
                  step="0.25"
                  value={formData.breaks || 0}
                  onChange={(e) => handleInputChange('breaks', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          )}

          {/* Hours for Standard entries */}
          {formData.entryType === 'Standard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="standardHours">Standard Hours</Label>
                <Input
                  id="standardHours"
                  type="number"
                  step="0.25"
                  value={formData.standardHours || 0}
                  onChange={(e) => handleInputChange('standardHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="overtimeHours">Overtime Hours</Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.25"
                  value={formData.overtimeHours || 0}
                  onChange={(e) => handleInputChange('overtimeHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label htmlFor="doubleTimeHours">Double Time Hours</Label>
                <Input
                  id="doubleTimeHours"
                  type="number"
                  step="0.25"
                  value={formData.doubleTimeHours || 0}
                  onChange={(e) => handleInputChange('doubleTimeHours', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location || ''}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Site A"
            />
          </div>

          {/* Comments */}
          <div>
            <Label htmlFor="comments">Comments</Label>
            <Textarea
              id="comments"
              value={formData.comments || ''}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryEditForm;
