
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';
import { WeeklySummary } from './types';
import { formatDate, cn } from './utils';

interface WeeklySummaryViewProps {
  weeklySummary: WeeklySummary[];
}

export const WeeklySummaryView: React.FC<WeeklySummaryViewProps> = ({ weeklySummary }) => {
  if (weeklySummary.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          <CalendarDays className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No weekly data</h3>
          <p className="text-sm">No timesheet entries found for the selected period</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {weeklySummary.map((week, weekIndex) => (
        <Card key={weekIndex}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">
                  Week of {formatDate(week.weekStart, 'MMM dd')} - {formatDate(week.weekEnd, 'MMM dd, yyyy')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {week.entries} entries • {week.projects.size} projects
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold">{week.totalHours.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Standard</p>
                      <p className="text-lg font-semibold text-blue-600">{week.totalStandard.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Overtime</p>
                      <p className="text-lg font-semibold text-orange-600">{week.totalOvertime.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Daily breakdown */}
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, dayIndex) => {
                const dayData = week.days[dayIndex];
                const hasData = dayData && (dayData.standard > 0 || dayData.overtime > 0);
                
                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      "border rounded-lg p-3 text-center transition-all",
                      hasData ? "bg-gray-50 border-gray-300" : "border-gray-200"
                    )}
                  >
                    <div className="text-xs font-medium text-gray-500 mb-1">{day}</div>
                    {hasData ? (
                      <>
                        <div className="text-lg font-bold">
                          {(dayData.standard + dayData.overtime).toFixed(1)}
                        </div>
                        <div className="text-xs space-y-1 mt-1">
                          {dayData.standard > 0 && (
                            <div className="text-blue-600">Std: {dayData.standard.toFixed(1)}</div>
                          )}
                          {dayData.overtime > 0 && (
                            <div className="text-orange-600">OT: {dayData.overtime.toFixed(1)}</div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {dayData.entries.length} {dayData.entries.length === 1 ? 'entry' : 'entries'}
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-400 text-sm">-</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Projects worked on this week */}
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">Projects this week:</p>
              <div className="flex flex-wrap gap-2">
                {Array.from(week.projects).map((projectCode) => (
                  <Badge key={projectCode} variant="secondary" className="text-xs">
                    {projectCode}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
