
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calendar = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            View your schedule and upcoming events.
          </p>
        </div>
        <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar View
            </CardTitle>
            <CardDescription className="text-primary-foreground/90">Your schedule overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Calendar component would go here</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-xl">
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription className="text-primary-foreground/90">Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg transition-colors hover:bg-primary/15">
                <Clock className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Team Meeting</p>
                  <p className="text-sm text-muted-foreground">Today, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg transition-colors hover:bg-green-500/15">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-foreground">Project Review</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
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
