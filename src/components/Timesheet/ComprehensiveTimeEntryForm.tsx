
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BulkEntryTab } from './BulkEntryTab';
import { MyTimesheetsTab } from './MyTimesheetsTab';
import { StandardHoursTab } from './StandardHoursTab';
import { TimeInOutTab } from './TimeInOutTab';
import { ComprehensiveTimeEntryFormProps, TimeEntryData } from './types';
import { toast } from 'sonner';

export const ComprehensiveTimeEntryForm: React.FC<ComprehensiveTimeEntryFormProps> = ({
  onSubmit
}) => {
  const [activeTab, setActiveTab] = useState('standard');
  const [entries, setEntries] = useState<TimeEntryData[]>([{
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
  }]);

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [useMultiDateSelection, setUseMultiDateSelection] = useState(false);

  const createEntriesForMultipleDates = (templateEntry: TimeEntryData): TimeEntryData[] => {
    if (!useMultiDateSelection || selectedDates.length === 0) {
      return [templateEntry];
    }

    return selectedDates.map(date => ({
      ...templateEntry,
      dateWorked: date.toISOString().split('T')[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalEntries: TimeEntryData[] = [];

    if (useMultiDateSelection && selectedDates.length > 0) {
      // Create entries for each selected date using the first entry as template
      finalEntries = createEntriesForMultipleDates(entries[0]);
    } else {
      finalEntries = entries;
    }

    // Validation for all entries
    for (let i = 0; i < finalEntries.length; i++) {
      const entry = finalEntries[i];
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

    onSubmit(finalEntries.length === 1 ? finalEntries[0] : finalEntries);
    toast.success(`${finalEntries.length} time ${finalEntries.length === 1 ? 'entry' : 'entries'} submitted successfully!`);
  };

  const handleBulkSubmit = (entries: any[]) => {
    console.log('Bulk entries submitted:', entries);
    onSubmit(entries);
  };

  const tabContentProps = {
    entries,
    setEntries,
    selectedDates,
    setSelectedDates,
    useMultiDateSelection,
    setUseMultiDateSelection,
    onSubmit: handleSubmit
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
          <StandardHoursTab {...tabContentProps} />
        </TabsContent>

        {/* Time In/Out Tab */}
        <TabsContent value="timeinout">
          <TimeInOutTab {...tabContentProps} />
        </TabsContent>

        {/* Bulk Entry Tab */}
        <TabsContent value="bulk">
          <BulkEntryTab onSubmit={handleBulkSubmit} />
        </TabsContent>

        {/* My Timesheets Tab */}
        <TabsContent value="timesheets">
          <MyTimesheetsTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
