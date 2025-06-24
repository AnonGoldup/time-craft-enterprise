
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTimeInOutForm } from '@/components/TimeEntry/hooks/useTimeInOutForm';
import TimeInOutHeader from '@/components/TimeEntry/TimeInOutHeader';
import TimeInOutEntryCard from '@/components/TimeEntry/TimeInOutEntryCard';

const TimeEntryTimeInOut = () => {
  const timeInOutForm = useTimeInOutForm();

  return (
    <div className="unity-fade-in max-w-full mx-auto space-y-6 px-4">
      <TimeInOutHeader
        onAddRow={timeInOutForm.addRow}
        onCopyPreviousDay={timeInOutForm.copyPreviousDay}
        onCopyPreviousWeek={timeInOutForm.copyPreviousWeek}
      />

      <Card className="border shadow-sm">
        <Tabs defaultValue="time-in-out" className="w-full">
          <div className="border-b bg-muted/30">
            <TabsList className="h-12 w-full bg-transparent p-0 rounded-none">
              <TabsTrigger value="enter-hours" asChild className="flex-1 h-12 rounded-none border-b-2 border-transparent hover:bg-muted/50 font-medium gap-2">
                <Link to="/time-entry/standard" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Enter Hours
                </Link>
              </TabsTrigger>
              <TabsTrigger value="time-in-out" className="flex-1 h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-card font-medium gap-2">
                <Timer className="h-4 w-4" />
                Time In/Out
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="time-in-out" className="mt-0 p-2 space-y-4">
            {timeInOutForm.entries.map((entry, index) => (
              <TimeInOutEntryCard
                key={entry.id}
                entry={entry}
                index={index}
                entriesLength={timeInOutForm.entries.length}
                formState={timeInOutForm}
              />
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default TimeEntryTimeInOut;
