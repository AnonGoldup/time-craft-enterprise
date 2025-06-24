import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, User, Calendar, Building, Hash, AlertTriangle, Users, FileText } from 'lucide-react';
import { useProjectCostCodes } from '@/hooks/useProjectCostCodes';
import { BulkEntryTab } from './BulkEntryTab';
import { MyTimesheetsTab } from './MyTimesheetsTab';
import { toast } from 'sonner';

interface TimeEntryData {
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  notes: string;
  timeIn?: string;
  timeOut?: string;
  breakStart?: string;
  breakEnd?: string;
}

interface ComprehensiveTimeEntryFormProps {
  onSubmit: (data: TimeEntryData | TimeEntryData[]) => void;
  managerMode?: boolean;
}

export const ComprehensiveTimeEntryForm: React.FC<ComprehensiveTimeEntryFormProps> = ({
  onSubmit,
  managerMode = false
}) => {
  const [activeTab, setActiveTab] = useState('standard');
  const [formData, setFormData] = useState<TimeEntryData>({
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
  });

  const [crossesMidnight, setCrossesMidnight] = useState(false);
  const [hoursWarning, setHoursWarning] = useState(false);

  const { extras, costCodes, selectedExtra, setSelectedExtra } = useProjectCostCodes(formData.projectCode);

  // Validation and calculations
  useEffect(() => {
    const total = formData.standardHours + formData.overtimeHours;
    setHoursWarning(total > 16);
  }, [formData.standardHours, formData.overtimeHours]);

  useEffect(() => {
    if (formData.timeIn && formData.timeOut) {
      const timeInMinutes = parseTimeToMinutes(formData.timeIn);
      const timeOutMinutes = parseTimeToMinutes(formData.timeOut);
      setCrossesMidnight(timeOutMinutes <= timeInMinutes);
    }
  }, [formData.timeIn, formData.timeOut]);

  // Utility functions
  const parseTimeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculateTimeInOut = () => {
    if (!formData.timeIn || !formData.timeOut) return;

    const startMinutes = parseTimeToMinutes(formData.timeIn);
    let endMinutes = parseTimeToMinutes(formData.timeOut);

    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60; // Next day
    }

    let totalMinutes = endMinutes - startMinutes;

    // Subtract break time
    if (formData.breakStart && formData.breakEnd) {
      const breakStartMinutes = parseTimeToMinutes(formData.breakStart);
      const breakEndMinutes = parseTimeToMinutes(formData.breakEnd);
      const breakMinutes = breakEndMinutes - breakStartMinutes;
      totalMinutes -= breakMinutes;
    }

    const totalHours = Math.round((totalMinutes / 60) * 4) / 4; // Quarter hour rounding
    const standardHours = Math.min(totalHours, 8);
    const overtimeHours = Math.max(0, totalHours - 8);

    setFormData(prev => ({
      ...prev,
      standardHours,
      overtimeHours
    }));
  };

  const handleInputChange = (field: keyof TimeEntryData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.projectCode) {
      toast.error('Please select a project');
      return;
    }
    
    if (!formData.costCode) {
      toast.error('Please select a cost code');
      return;
    }

    if (formData.standardHours + formData.overtimeHours === 0) {
      toast.error('Please enter hours worked');
      return;
    }

    if (formData.standardHours + formData.overtimeHours > 16) {
      toast.error('Total hours cannot exceed 16 per day');
      return;
    }

    onSubmit(formData);
    toast.success('Time entry submitted successfully!');
  };

  const handleBulkSubmit = (entries: any[]) => {
    console.log('Bulk entries submitted:', entries);
    onSubmit(entries);
  };

  return (
    <Card>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Headers */}
        <div className="border-b">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="standard">Standard Hours</TabsTrigger>
            <TabsTrigger value="timeinout">Time In/Out</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Entry</TabsTrigger>
            <TabsTrigger value="timesheets">My Timesheets</TabsTrigger>
          </TabsList>
        </div>

        {/* Standard Hours Tab */}
        <TabsContent value="standard">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Standard Hours Entry</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Employee & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Employee *</span>
                  </Label>
                  <Select 
                    value={formData.employeeId} 
                    onValueChange={(value) => handleInputChange('employeeId', value)}
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
                    value={formData.dateWorked}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange('dateWorked', e.target.value)}
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
                    value={formData.projectCode} 
                    onValueChange={(value) => handleInputChange('projectCode', value)}
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
                  <div className="text-xs text-muted-foreground flex items-center space-x-1 mt-1">
                    <span>Project</span>
                    <span>→</span>
                    <span>Extra</span>
                    <span>→</span>
                    <span>Cost Code</span>
                  </div>
                </div>
                <div>
                  <Label>Extra</Label>
                  <Select 
                    value={formData.extraValue} 
                    onValueChange={(value) => handleInputChange('extraValue', value)}
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
              <div>
                <Label className="flex items-center space-x-1">
                  <Hash className="w-4 h-4" />
                  <span>Cost Code *</span>
                </Label>
                <Select 
                  value={formData.costCode} 
                  onValueChange={(value) => handleInputChange('costCode', value)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Standard Hours (PayID 1)</Label>
                  <Input
                    type="number"
                    step="0.25"
                    min="0"
                    max="16"
                    value={formData.standardHours}
                    onChange={(e) => handleInputChange('standardHours', parseFloat(e.target.value) || 0)}
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
                    onChange={(e) => handleInputChange('overtimeHours', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              {/* Hours Display */}
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

              {/* Hours Warning */}
              {hoursWarning && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700">
                    Total hours cannot exceed 16 per day (current: {(formData.standardHours + formData.overtimeHours).toFixed(2)})
                  </span>
                </div>
              )}

              {/* Notes */}
              <div>
                <Label>Notes</Label>
                <Textarea
                  rows={3}
                  placeholder="Enter any additional notes..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Time Entry
              </Button>
            </form>
          </CardContent>
        </TabsContent>

        {/* Time In/Out Tab */}
        <TabsContent value="timeinout">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Time In/Out Entry</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Employee & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Employee *</span>
                  </Label>
                  <Select 
                    value={formData.employeeId} 
                    onValueChange={(value) => handleInputChange('employeeId', value)}
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
                    value={formData.dateWorked}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => handleInputChange('dateWorked', e.target.value)}
                  />
                </div>
              </div>

              {/* Time Fields */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label>Time In *</Label>
                  <Input
                    type="time"
                    value={formData.timeIn}
                    onChange={(e) => {
                      handleInputChange('timeIn', e.target.value);
                      setTimeout(calculateTimeInOut, 100);
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
                      handleInputChange('timeOut', e.target.value);
                      setTimeout(calculateTimeInOut, 100);
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
                      handleInputChange('breakStart', e.target.value);
                      setTimeout(calculateTimeInOut, 100);
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
                      handleInputChange('breakEnd', e.target.value);
                      setTimeout(calculateTimeInOut, 100);
                    }}
                    className="font-mono text-center"
                  />
                </div>
              </div>

              {/* Cross Midnight Warning */}
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

              {/* Calculated Hours */}
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

              {/* Project Information */}
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
                      onValueChange={(value) => handleInputChange('projectCode', value)}
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
                      onValueChange={(value) => handleInputChange('extraValue', value)}
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
                    onValueChange={(value) => handleInputChange('costCode', value)}
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

              {/* Notes */}
              <div>
                <Label>Notes</Label>
                <Textarea
                  rows={3}
                  placeholder="Enter any additional notes..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Time Entry
              </Button>
            </form>
          </CardContent>
        </TabsContent>

        {/* Bulk Entry Tab */}
        <TabsContent value="bulk">
          <BulkEntryTab onSubmit={handleBulkSubmit} managerMode={managerMode} />
        </TabsContent>

        {/* My Timesheets Tab */}
        <TabsContent value="timesheets">
          <MyTimesheetsTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
