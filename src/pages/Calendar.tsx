
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Office Complex - Electrical Work",
      date: "2024-01-15",
      time: "8:00 AM - 4:00 PM",
      location: "Downtown Site",
      type: "Work Assignment",
      status: "Scheduled"
    },
    {
      id: 2,
      title: "Team Meeting",
      date: "2024-01-16", 
      time: "10:00 AM - 11:00 AM",
      location: "Conference Room",
      type: "Meeting",
      status: "Confirmed"
    },
    {
      id: 3,
      title: "Safety Training",
      date: "2024-01-18",
      time: "2:00 PM - 4:00 PM", 
      location: "Training Center",
      type: "Training",
      status: "Required"
    }
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentWeek = generateWeekDays(currentDate);

  function generateWeekDays(date: Date) {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Work Assignment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Meeting': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Training': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">Schedule and track work assignments</p>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Compact Calendar Navigation */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="h-8 px-3"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Week View */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs font-medium text-muted-foreground mb-2">{day}</div>
                <div className={`
                  h-8 w-8 mx-auto rounded-lg flex items-center justify-center text-xs font-medium
                  ${currentWeek[index].toDateString() === new Date().toDateString() 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-muted/50 cursor-pointer'
                  }
                `}>
                  {currentWeek[index].getDate()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compact Upcoming Events */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upcoming Events</CardTitle>
          <CardDescription className="text-xs">Your scheduled work and meetings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
