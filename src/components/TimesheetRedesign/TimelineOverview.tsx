import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface TimeEntry {
  id: string;
  projectCode: string;
  projectName: string;
  costCode: string;
  costCodeName: string;
  timeIn: string;
  timeOut: string;
  duration: number;
  date: string;
  notes?: string;
}

interface TimelineOverviewProps {
  entries: TimeEntry[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const TimelineOverview: React.FC<TimelineOverviewProps> = ({
  entries,
  selectedDate,
  onDateChange,
}) => {
  const timelineData = useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0');
      return {
        hour,
        entries: entries.filter(entry => {
          const startHour = parseInt(entry.timeIn.split(':')[0]);
          const endHour = parseInt(entry.timeOut.split(':')[0]);
          return i >= startHour && i <= endHour;
        })
      };
    });
    return hours;
  }, [entries]);

  const changeDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    onDateChange(newDate.toISOString().split('T')[0]);
  };

  const getProjectColor = (projectCode: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500'
    ];
    const hash = projectCode.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Timeline
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeDate('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Badge variant="outline" className="px-3 py-1">
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeDate('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Timeline Grid */}
          <div className="grid grid-cols-24 gap-1 text-xs">
            {timelineData.map(({ hour, entries: hourEntries }) => (
              <div key={hour} className="space-y-1">
                {/* Hour Label */}
                <div className="text-center text-muted-foreground font-mono">
                  {hour}
                </div>
                
                {/* Hour Column */}
                <div className="h-20 border border-border rounded relative bg-muted/20">
                  {hourEntries.map((entry, index) => (
                    <div
                      key={`${entry.id}-${index}`}
                      className={`absolute inset-x-0 rounded-sm opacity-80 ${getProjectColor(entry.projectCode)}`}
                      style={{
                        top: `${(index * 20)}%`,
                        height: '15%',
                      }}
                      title={`${entry.projectCode} - ${entry.timeIn} to ${entry.timeOut}`}
                    />
                  ))}
                  
                  {/* Current Time Indicator */}
                  {hour === new Date().getHours().toString().padStart(2, '0') && 
                   selectedDate === new Date().toISOString().split('T')[0] && (
                    <div className="absolute inset-x-0 h-0.5 bg-red-500 z-10" 
                         style={{ top: `${(new Date().getMinutes() / 60) * 100}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(entries.map(e => e.projectCode))).map(projectCode => {
              const project = entries.find(e => e.projectCode === projectCode);
              return (
                <div key={projectCode} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${getProjectColor(projectCode)}`} />
                  <span className="text-sm text-muted-foreground">
                    {projectCode} - {project?.projectName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Total: {(entries.reduce((sum, e) => sum + e.duration, 0) / 60).toFixed(1)}h
                </span>
              </div>
              <div className="text-muted-foreground">
                Projects: {new Set(entries.map(e => e.projectCode)).size}
              </div>
              <div className="text-muted-foreground">
                Entries: {entries.length}
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              View Week
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};