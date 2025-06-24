
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, Building, Hash, AlertTriangle } from 'lucide-react';
import { useProjectCostCodes } from '@/hooks/useProjectCostCodes';
import MultiDatePicker from '@/components/TimeEntry/MultiDatePicker';
import EmployeeSelector from '@/components/TimeEntry/EmployeeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { mockEmployees } from './mockEmployees';
import { TimeEntryData } from './types';

interface StandardHoursTabProps {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  selectedEmployees: string[];
  setSelectedEmployees: (employees: string[]) => void;
  formData: TimeEntryData;
  onInputChange: (field: keyof TimeEntryData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const StandardHoursTab: React.FC<StandardHoursTabProps> = ({
  selectedDates,
  setSelectedDates,
  selectedEmployees,
  setSelectedEmployees,
  formData,
  onInputChange,
  onSubmit
}) => {
  const { user, hasRole, UserRole } = useAuth();
  const isManager = hasRole([UserRole.MANAGER, UserRole.ADMIN]);
  const { extras, costCodes } = useProjectCostCodes(formData.projectCode);
  
  const totalEntriesToCreate = selectedDates.length * (isManager ? selectedEmployees.length : 1);

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Standard Hours Entry</h3>
          <Badge variant="secondary">
            {totalEntriesToCreate} {totalEntriesToCreate === 1 ? 'entry' : 'entries'} will be created
          </Badge>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="border rounded-lg p-4">
          <div className="mb-4">
            <Label className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>Employee{isManager ? 's' : ''} *</span>
            </Label>
            {isManager ? (
              <EmployeeSelector
                selectedEmployee=""
                setSelectedEmployee={() => {}}
                selectedEmployees={selectedEmployees}
                setSelectedEmployees={setSelectedEmployees}
                employees={mockEmployees}
              />
            ) : (
              <Input
                value={user?.fullName || 'John Smith'}
                disabled
                className="bg-gray-50"
              />
            )}
          </div>

          <div className="mb-4">
            <Label className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Date{selectedDates.length > 1 ? 's' : ''} Worked *</span>
            </Label>
            <MultiDatePicker
              selectedDates={selectedDates}
              onDatesChange={setSelectedDates}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="flex items-center space-x-1">
                <Building className="w-4 h-4" />
                <span>Project *</span>
              </Label>
              <Select 
                value={formData.projectCode} 
                onValueChange={(value) => onInputChange('projectCode', value)}
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
                value={formData.extraValue} 
                onValueChange={(value) => onInputChange('extraValue', value)}
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
              value={formData.costCode} 
              onValueChange={(value) => onInputChange('costCode', value)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>Standard Hours (PayID 1)</Label>
              <Input
                type="number"
                step="0.25"
                min="0"
                max="16"
                value={formData.standardHours}
                onChange={(e) => onInputChange('standardHours', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <Label>Overtime Hours (PayID 2)</Label>
              <Input
                type="number"
                step="0.25"
                min="0"
                max="16"
                value={formData.overtimeHours}
                onChange={(e) => onInputChange('overtimeHours', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Standard</div>
                <div className="text-2xl font-bold">{formData.standardHours.toFixed(2)}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overtime</div>
                <div className="text-2xl font-bold text-orange-600">{formData.overtimeHours.toFixed(2)}</div>
              </div>
              <div className="bg-card p-4 rounded-lg border">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</div>
                <div className="text-2xl font-bold text-blue-600">{(formData.standardHours + formData.overtimeHours).toFixed(2)}</div>
              </div>
            </div>
          </div>

          {(formData.standardHours + formData.overtimeHours) > 16 && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-red-700">
                Total hours cannot exceed 16 per day (current: {(formData.standardHours + formData.overtimeHours).toFixed(2)})
              </span>
            </div>
          )}

          <div>
            <Label>Notes</Label>
            <Textarea
              rows={3}
              placeholder="Enter any additional notes..."
              value={formData.notes}
              onChange={(e) => onInputChange('notes', e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          Submit {totalEntriesToCreate === 1 ? 'Time Entry' : `${totalEntriesToCreate} Time Entries`}
        </Button>
      </form>
    </CardContent>
  );
};
