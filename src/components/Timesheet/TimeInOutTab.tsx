
import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, User, Calendar, Building, Hash, AlertTriangle } from 'lucide-react';
import MultiDatePicker from '@/components/TimeEntry/MultiDatePicker';
import EmployeeSelector from '@/components/TimeEntry/EmployeeSelector';
import { useAuth } from '@/contexts/AuthContext';
import { mockEmployees } from './mockEmployees';
import { TimeEntryData } from './types';

interface TimeInOutTabProps {
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  selectedEmployees: string[];
  setSelectedEmployees: (employees: string[]) => void;
  formData: TimeEntryData;
  onInputChange: (field: keyof TimeEntryData, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  crossesMidnight: boolean;
  onCalculateTime: () => void;
}

export const TimeInOutTab: React.FC<TimeInOutTabProps> = ({
  selectedDates,
  setSelectedDates,
  selectedEmployees,
  setSelectedEmployees,
  formData,
  onInputChange,
  onSubmit,
  crossesMidnight,
  onCalculateTime
}) => {
  const { user, hasRole, UserRole } = useAuth();
  const isManager = hasRole([UserRole.MANAGER, UserRole.ADMIN]);
  
  const totalEntriesToCreate = selectedDates.length * (isManager ? selectedEmployees.length : 1);

  return (
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Time In/Out Entry</h3>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label>Time In *</Label>
              <Input
                type="time"
                value={formData.timeIn}
                onChange={(e) => {
                  onInputChange('timeIn', e.target.value);
                  setTimeout(() => onCalculateTime(), 100);
                }}
                className="font-mono text-center"
              />
            </div>
            <div>
              <Label>Time Out *</Label>
              <Input
                type="time"
                value={formData.timeOut}
                onChange={(e) => {
                  onInputChange('timeOut', e.target.value);
                  setTimeout(() => onCalculateTime(), 100);
                }}
                className="font-mono text-center"
              />
            </div>
            <div>
              <Label>Break Start</Label>
              <Input
                type="time"
                value={formData.breakStart}
                onChange={(e) => {
                  onInputChange('breakStart', e.target.value);
                  setTimeout(() => onCalculateTime(), 100);
                }}
                className="font-mono text-center"
              />
            </div>
            <div>
              <Label>Break End</Label>
              <Input
                type="time"
                value={formData.breakEnd}
                onChange={(e) => {
                  onInputChange('breakEnd', e.target.value);
                  setTimeout(() => onCalculateTime(), 100);
                }}
                className="font-mono text-center"
              />
            </div>
          </div>

          {crossesMidnight && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg border-l-4 border-l-amber-500">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-900 mb-2">⚠️ Cross-Midnight Shift Detected</div>
                  <p className="text-amber-800 text-sm mb-3">This shift crosses midnight and will be split into two entries:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between bg-white p-2 rounded border text-sm">
                      <span>{formData.dateWorked}: {formData.timeIn} - 11:59 PM</span>
                      <span className="font-medium">2.00 hours</span>
                    </div>
                    <div className="flex justify-between bg-white p-2 rounded border text-sm">
                      <span>Next day: 12:00 AM - {formData.timeOut}</span>
                      <span className="font-medium">6.00 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg">
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

          <div className="border-t pt-6">
            <h4 className="text-sm font-medium mb-4">Project Information</h4>
            
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
                    <SelectItem value="Default">Default</SelectItem>
                    <SelectItem value="005">005 - Phase 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
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
                  <SelectItem value="001-040-043">001-040-043 - Direct Labor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

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
