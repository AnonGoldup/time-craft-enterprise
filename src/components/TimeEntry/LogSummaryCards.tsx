
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TimeEntry {
  entryID: number;
  dateWorked: string;
  projectCode: string;
  projectDescription: string;
  extraValue?: string;
  costCode: string;
  timeIn?: string;
  timeOut?: string;
  breaks?: number;
  standardHours?: number;
  overtimeHours?: number;
  doubleTimeHours?: number;
  total: number;
  location?: string;
  comments?: string;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  entryType: 'Standard' | 'TimeInOut';
}

interface LogSummaryCardsProps {
  timeEntries: TimeEntry[];
  getTotalHours: () => number;
}

const LogSummaryCards: React.FC<LogSummaryCardsProps> = ({
  timeEntries,
  getTotalHours
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{getTotalHours()}h</p>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{timeEntries.length}</p>
            <p className="text-sm text-muted-foreground">Entries</p>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {timeEntries.filter(e => e.status === 'Draft').length}
            </p>
            <p className="text-sm text-muted-foreground">Draft Entries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogSummaryCards;
