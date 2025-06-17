
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, X, AlertTriangle } from 'lucide-react';
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
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  React.useEffect(() => {
    if (entry) {
      setFormData(entry);
      setSelectedProject('');
      setSelectedExtra('');
      setSelectedCostCode('');
      setValidationErrors({});
    }
  }, [entry]);

  if (!formData) return null;

  const validateTimeValue = (value: number, fieldName: string): string | null => {
    if (value < 0) {
      return `${fieldName} cannot be negative`;
    }
    if (value > 16) {
      return `${fieldName} cannot exceed 16 hours`;
    }
    return null;
  };

  const validateTotalTime = (standard: number, overtime: number, doubleTime: number): string | null => {
    const total = standard + overtime + doubleTime;
    if (total > 16) {
      return 'Total hours cannot exceed 16 hours per day';
    }
    return null;
  };

  const handleInputChange = (field: keyof TimeEntry, value: string | number) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);

    // Clear validation error for this field
    const newErrors = { ...validationErrors };
    delete newErrors[field];

    // Validate time fields
    if (field === 'standardHours' || field === 'overtimeHours' || field === 'doubleTimeHours' || field === 'breaks') {
      const numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      const error = validateTimeValue(numValue, field);
      if (error) {
        newErrors[field] = error;
      }

      // Validate total time for hour fields
      if (field === 'standardHours' || field === 'overtimeHours' || field === 'doubleTimeHours') {
        const standard = field === 'standardHours' ? numValue : (newFormData.standardHours || 0);
        const overtime = field === 'overtimeHours' ? numValue : (newFormData.overtimeHours || 0);
        const doubleTime = field === 'doubleTimeHours' ? numValue : (newFormData.doubleTimeHours || 0);
        
        const totalError = validateTotalTime(standard, overtime, doubleTime);
        if (totalError) {
          newErrors.total = totalError;
        } else {
          delete newErrors.total;
        }
      }
    }

    setValidationErrors(newErrors);
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    setSelectedExtra('');
    setSelectedCostCode('');
  };

  const handleExtraChange = (extraId: string) => {
    setSelectedExtra(extraId);
    setSelectedCostCode('');
  };

  const handleCostCodeChange = (costCodeId: string) => {
    setSelectedCostCode(costCodeId);
  };

  const handleSave = () => {
    if (formData && Object.keys(validationErrors).length === 0) {
      const standardHours = formData.standardHours || 0;
      const overtimeHours = formData.overtimeHours || 0;
      const doubleTimeHours = formData.doubleTimeHours || 0;
      const total = standardHours + overtimeHours + doubleTimeHours;

      const updatedEntry = { ...formData, total };
      onSave(updatedEntry);
      onClose();
      toast.success('Time entry updated successfully');
    } else {
      toast.error('Please fix validation errors before saving');
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
                  min="0"
                  max="16"
                  value={formData.breaks || 0}
                  onChange={(e) => handleInputChange('breaks', parseFloat(e.target.value) || 0)}
                  className={validationErrors.breaks ? 'border-red-500' : ''}
                />
                {validationErrors.breaks && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {validationErrors.breaks}
                  </p>
                )}
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
                  min="0"
                  max="16"
                  value={formData.standardHours || 0}
                  onChange={(e) => handleInputChange('standardHours', parseFloat(e.target.value) || 0)}
                  className={validationErrors.standardHours || validationErrors.total ? 'border-red-500' : ''}
                />
                {validationErrors.standardHours && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {validationErrors.standardHours}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="overtimeHours">Overtime Hours</Label>
                <Input
                  id="overtimeHours"
                  type="number"
                  step="0.25"
                  min="0"
                  max="16"
                  value={formData.overtimeHours || 0}
                  onChange={(e) => handleInputChange('overtimeHours', parseFloat(e.target.value) || 0)}
                  className={validationErrors.overtimeHours || validationErrors.total ? 'border-red-500' : ''}
                />
                {validationErrors.overtimeHours && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {validationErrors.overtimeHours}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="doubleTimeHours">Double Time Hours</Label>
                <Input
                  id="doubleTimeHours"
                  type="number"
                  step="0.25"
                  min="0"
                  max="16"
                  value={formData.doubleTimeHours || 0}
                  onChange={(e) => handleInputChange('doubleTimeHours', parseFloat(e.target.value) || 0)}
                  className={validationErrors.doubleTimeHours || validationErrors.total ? 'border-red-500' : ''}
                />
                {validationErrors.doubleTimeHours && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {validationErrors.doubleTimeHours}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Total validation error */}
          {validationErrors.total && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {validationErrors.total}
            </p>
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
          <Button 
            onClick={handleSave}
            disabled={Object.keys(validationErrors).length > 0}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryEditForm;
