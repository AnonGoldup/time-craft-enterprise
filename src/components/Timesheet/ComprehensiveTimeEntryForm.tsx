
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StandardHoursTab } from './StandardHoursTab';
import { TimeInOutTab } from './TimeInOutTab';
import { BulkEntryTab } from './BulkEntryTab';
import { MyTimesheetsTab } from './MyTimesheetsTab';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { TimeEntryData } from './types';

interface ComprehensiveTimeEntryFormProps {
  onSubmit: (data: TimeEntryData | TimeEntryData[]) => void;
}

export const ComprehensiveTimeEntryForm: React.FC<ComprehensiveTimeEntryFormProps> = ({
  onSubmit
}) => {
  const { user, hasRole, UserRole } = useAuth();
  const isManager = hasRole([UserRole.MANAGER, UserRole.ADMIN]);
  
  const [activeTab, setActiveTab] = useState('standard');
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    isManager ? [] : [user?.employeeId || 'EMP001']
  );
  
  const [formData, setFormData] = useState<TimeEntryData>({
    employeeId: user?.employeeId || 'EMP001',
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

  useEffect(() => {
    if (formData.timeIn && formData.timeOut) {
      const timeInMinutes = parseTimeToMinutes(formData.timeIn);
      const timeOutMinutes = parseTimeToMinutes(formData.timeOut);
      setCrossesMidnight(timeOutMinutes <= timeInMinutes);
    }
  }, [formData.timeIn, formData.timeOut]);

  const parseTimeToMinutes = (timeString: string): number => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculateTimeInOut = () => {
    if (!formData.timeIn || !formData.timeOut) return;

    const startMinutes = parseTimeToMinutes(formData.timeIn);
    let endMinutes = parseTimeToMinutes(formData.timeOut);

    if (endMinutes <= startMinutes) {
      endMinutes += 24 * 60;
    }

    let totalMinutes = endMinutes - startMinutes;

    if (formData.breakStart && formData.breakEnd) {
      const breakStartMinutes = parseTimeToMinutes(formData.breakStart);
      const breakEndMinutes = parseTimeToMinutes(formData.breakEnd);
      const breakMinutes = breakEndMinutes - breakStartMinutes;
      totalMinutes -= breakMinutes;
    }

    const totalHours = Math.round((totalMinutes / 60) * 4) / 4;
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

  const generateEntriesFromSelections = () => {
    const generatedEntries: TimeEntryData[] = [];
    const employeesToProcess = isManager ? selectedEmployees : [user?.employeeId || 'EMP001'];
    
    selectedDates.forEach(date => {
      employeesToProcess.forEach(employeeId => {
        generatedEntries.push({
          ...formData,
          employeeId,
          dateWorked: date.toISOString().split('T')[0]
        });
      });
    });
    
    return generatedEntries;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const allEntries = generateEntriesFromSelections();
    
    for (let i = 0; i < allEntries.length; i++) {
      const entry = allEntries[i];
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

    onSubmit(allEntries.length === 1 ? allEntries[0] : allEntries);
    toast.success(`${allEntries.length} time ${allEntries.length === 1 ? 'entry' : 'entries'} submitted successfully!`);
  };

  const handleBulkSubmit = (entries: any[]) => {
    console.log('Bulk entries submitted:', entries);
    onSubmit(entries);
  };

  return (
    <Card>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="standard">Standard Hours</TabsTrigger>
            <TabsTrigger value="timeinout">Time In/Out</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Entry</TabsTrigger>
            <TabsTrigger value="timesheets">My Timesheets</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standard">
          <StandardHoursTab
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </TabsContent>

        <TabsContent value="timeinout">
          <TimeInOutTab
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            crossesMidnight={crossesMidnight}
            onCalculateTime={calculateTimeInOut}
          />
        </TabsContent>

        <TabsContent value="bulk">
          <BulkEntryTab onSubmit={handleBulkSubmit} />
        </TabsContent>

        <TabsContent value="timesheets">
          <MyTimesheetsTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
