
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Calendar
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View your schedule and upcoming events.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar View
            </CardTitle>
            <CardDescription>Your schedule overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-50 dark:bg-slate-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Calendar component would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium">Team Meeting</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Today, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                <div>
                  <p className="font-medium">Project Review</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tomorrow, 10:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
