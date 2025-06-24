
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Copy, FileText, BookOpen, Calendar, CheckCircle, Download, TrendingUp, History, Timer, AlertCircle, Plus } from 'lucide-react';

interface WeekSummary {
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  projects: number;
  daysWorked: number;
  progress: number;
  dailyTotals: { [key: string]: number };
}

interface RecentEntry {
  date: string;
  project: string;
  hours: number;
  costCode: string;
}

interface TimesheetSidebarProps {
  weekSummary: WeekSummary;
  onQuickAction: (action: string) => void;
  onSubmitWeek: () => void;
}

export const TimesheetSidebar: React.FC<TimesheetSidebarProps> = ({
  weekSummary,
  onQuickAction,
  onSubmitWeek
}) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const today = new Date().getDay();

  const recentEntries: RecentEntry[] = [
    { date: '12/23', project: '21-0066', hours: 8, costCode: '001-040-043' },
    { date: '12/22', project: '21-0067', hours: 6, costCode: '001-040-045' },
    { date: '12/21', project: '21-0066', hours: 8, costCode: '001-040-043' }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Entry */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Plus className="w-5 h-5" />
            <span>Quick Entry</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="default"
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onQuickAction('new-entry')}
          >
            <Clock className="w-4 h-4 mr-2" />
            New Time Entry
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickAction('clock-in')}
            >
              <Timer className="w-3 h-3 mr-1" />
              Clock In
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickAction('clock-out')}
            >
              <Timer className="w-3 h-3 mr-1" />
              Clock Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Calendar className="w-5 h-5" />
            <span>Today's Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Total Hours</span>
            <span className="font-semibold">8.00</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Entries</span>
            <span className="font-semibold">1</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-sm text-muted-foreground">Last Entry</span>
            <span className="text-sm">3:30 PM</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant="secondary">Draft</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <History className="w-5 h-5" />
            <span>Recent Entries</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-48 overflow-y-auto">
          <div className="space-y-2">
            {recentEntries.map((entry, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start p-2 h-auto hover:bg-gray-50"
                onClick={() => onQuickAction(`recent-${index}`)}
              >
                <div className="text-left flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-sm">{entry.project}</div>
                    <div className="text-xs text-muted-foreground">{entry.date}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {entry.costCode} • {entry.hours} hrs
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <TrendingUp className="w-5 h-5" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start hover:border-blue-300 transition-all"
            onClick={() => onQuickAction('copy-last-week')}
          >
            <Copy className="w-4 h-4 mr-3" />
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">Copy Last Week</div>
              <div className="text-xs text-muted-foreground">5 entries • 40 hours</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start hover:border-blue-300 transition-all"
            onClick={() => onQuickAction('use-template')}
          >
            <FileText className="w-4 h-4 mr-3" />
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">Use Template</div>
              <div className="text-xs text-muted-foreground">3 saved templates</div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start hover:border-blue-300 transition-all"
            onClick={() => onQuickAction('bulk-edit')}
          >
            <BookOpen className="w-4 h-4 mr-3" />
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">Bulk Edit</div>
              <div className="text-xs text-muted-foreground">Edit multiple entries</div>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Week Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <CheckCircle className="w-5 h-5" />
            <span>Week Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-muted-foreground">{weekSummary.totalHours}/40 hrs</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(weekSummary.progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Daily Breakdown */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day, index) => {
              const hours = Object.values(weekSummary.dailyTotals)[index] || 0;
              const isToday = index === today;
              return (
                <div key={index} className="space-y-1">
                  <div className={`text-xs font-medium ${isToday ? 'text-blue-600' : 'text-muted-foreground'}`}>
                    {day}
                  </div>
                  <div className={`text-sm font-semibold ${hours > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {hours > 0 ? hours : '-'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Standard Hours</span>
              <span className="font-medium">{weekSummary.regularHours.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overtime Hours</span>
              <span className="font-medium text-orange-600">{weekSummary.overtimeHours.toFixed(1)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Hours</span>
              <span>{weekSummary.totalHours.toFixed(1)}</span>
            </div>
          </div>

          {/* Validation Status */}
          <div className="border-t pt-3">
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-muted-foreground">2 entries need review</span>
            </div>
          </div>

          <Button 
            onClick={onSubmitWeek}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Submit Week for Approval
          </Button>
        </CardContent>
      </Card>

      {/* My Templates */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <BookOpen className="w-5 h-5" />
            <span>My Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-48 overflow-y-auto">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto hover:bg-gray-50"
              onClick={() => onQuickAction('template-regular')}
            >
              <div className="text-left">
                <div className="font-medium text-sm">Regular Week</div>
                <div className="text-xs text-muted-foreground">Mon-Fri • 8hrs/day • Project 21-0066</div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto hover:bg-gray-50"
              onClick={() => onQuickAction('template-service')}
            >
              <div className="text-left">
                <div className="font-medium text-sm">Service Calls</div>
                <div className="text-xs text-muted-foreground">Various • Travel + Labor</div>
              </div>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start p-2 h-auto hover:bg-gray-50"
              onClick={() => onQuickAction('template-training')}
            >
              <div className="text-left">
                <div className="font-medium text-sm">Training Days</div>
                <div className="text-xs text-muted-foreground">8hrs • Cost Code 001-040-054</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export & Reports */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Download className="w-5 h-5" />
            <span>Export & Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={() => onQuickAction('export-csv')}
          >
            <Download className="w-3 h-3 mr-2" />
            Export CSV
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="w-full"
            onClick={() => onQuickAction('weekly-report')}
          >
            <FileText className="w-3 h-3 mr-2" />
            Weekly Report
          </Button>
          
          {/* CSV Preview */}
          <div className="bg-gray-50 p-3 rounded text-xs font-mono overflow-x-auto space-y-1">
            <div className="whitespace-nowrap">"JSMITH",210066,"Default","001040043",1,1,8,,,06232025</div>
            <div className="whitespace-nowrap text-muted-foreground">Format: EmpID,Project,Extra,CostCode,PayID,Hours</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
