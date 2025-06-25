import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BulkEntryTab from './BulkEntryTab';
import { MyTimesheetsTab } from './MyTimesheetsTab';
import StandardHoursTab from './StandardHoursTab';
import { TimeInOutTab } from './TimeInOutTab';
import { ComprehensiveTimeEntryFormProps, TimeEntryData } from './types';
import { toast } from 'sonner';

export const ComprehensiveTimeEntryForm: React.FC<ComprehensiveTimeEntryFormProps> = ({
  onSubmit
}) => {
  const [activeTab, setActiveTab] = useState('standard');

  const handleBulkSubmit = (entries: any[]) => {
    console.log('Bulk entries submitted:', entries);
    onSubmit(entries);
  };

  const handleTimeEntrySubmit = (data: any) => {
    console.log('Time entry submitted:', data);
    onSubmit(data);
    toast.success('Time entry submitted successfully!');
  };

  return (
    <Card className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Tab Headers - Mobile responsive */}
        <div className="border-b">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="standard" className="text-xs sm:text-sm px-2 py-2">
              <span className="hidden sm:inline">Standard Hours</span>
              <span className="sm:hidden">Standard</span>
            </TabsTrigger>
            <TabsTrigger value="timeinout" className="text-xs sm:text-sm px-2 py-2">
              <span className="hidden sm:inline">Time In/Out</span>
              <span className="sm:hidden">Time I/O</span>
            </TabsTrigger>
            <TabsTrigger value="bulk" className="text-xs sm:text-sm px-2 py-2">
              <span className="hidden sm:inline">Bulk Entry</span>
              <span className="sm:hidden">Bulk</span>
            </TabsTrigger>
            <TabsTrigger value="timesheets" className="text-xs sm:text-sm px-2 py-2">
              <span className="hidden sm:inline">My Timesheets</span>
              <span className="sm:hidden">My Time</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Standard Hours Tab */}
        <TabsContent value="standard" className="p-0">
          <StandardHoursTab />
        </TabsContent>

        {/* Time In/Out Tab */}
        <TabsContent value="timeinout" className="p-0">
          <TimeInOutTab />
        </TabsContent>

        {/* Bulk Entry Tab */}
        <TabsContent value="bulk" className="p-3 sm:p-4 md:p-6">
          <BulkEntryTab onSubmit={handleBulkSubmit} />
        </TabsContent>

        {/* My Timesheets Tab */}
        <TabsContent value="timesheets" className="p-3 sm:p-4 md:p-6">
          <MyTimesheetsTab />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
