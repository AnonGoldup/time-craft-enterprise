
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { LoadingState } from '@/components/ui/loading';

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

interface LogTableProps {
  timeEntries: TimeEntry[];
  loading: boolean;
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (entryID: number) => void;
}

const LogTable: React.FC<LogTableProps> = ({
  timeEntries,
  loading,
  onEditEntry,
  onDeleteEntry
}) => {
  const getStatusBadge = (status: string) => {
    const variants = {
      'Draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
      'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      'Approved': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
      'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800'
    };
    
    return (
      <Badge className={`${variants[status as keyof typeof variants] || variants.Draft} border`}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Time Entries</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your time entries for the selected week
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingState message="Loading time entries..." />
        ) : timeEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No time entries found for the selected criteria
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Project</TableHead>
                  <TableHead className="text-muted-foreground">Phase/Extra</TableHead>
                  <TableHead className="text-muted-foreground">Cost Code</TableHead>
                  <TableHead className="text-muted-foreground">Time In</TableHead>
                  <TableHead className="text-muted-foreground">Time Out</TableHead>
                  <TableHead className="text-muted-foreground">Breaks</TableHead>
                  <TableHead className="text-muted-foreground">ST</TableHead>
                  <TableHead className="text-muted-foreground">OT</TableHead>
                  <TableHead className="text-muted-foreground">DT</TableHead>
                  <TableHead className="text-muted-foreground">Total</TableHead>
                  <TableHead className="text-muted-foreground">Location</TableHead>
                  <TableHead className="text-muted-foreground">Comments</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeEntries.map((entry) => (
                  <TableRow key={entry.entryID} className="border-border hover:bg-muted/50">
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell className="text-foreground">{format(new Date(entry.dateWorked), 'MMM dd')}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-foreground">{entry.projectCode}</div>
                        <div className="text-xs text-muted-foreground">{entry.projectDescription}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{entry.extraValue || '-'}</TableCell>
                    <TableCell className="text-foreground">{entry.costCode}</TableCell>
                    <TableCell className="text-foreground">{entry.timeIn || '-'}</TableCell>
                    <TableCell className="text-foreground">{entry.timeOut || '-'}</TableCell>
                    <TableCell className="text-foreground">{entry.breaks || 0}</TableCell>
                    <TableCell className="text-foreground">{entry.standardHours || '-'}</TableCell>
                    <TableCell className="text-foreground">{entry.overtimeHours || 0}</TableCell>
                    <TableCell className="text-foreground">{entry.doubleTimeHours || 0}</TableCell>
                    <TableCell className="font-medium text-foreground">{entry.total}</TableCell>
                    <TableCell className="text-foreground">{entry.location || '-'}</TableCell>
                    <TableCell>
                      {entry.comments && (
                        <div className="max-w-32 truncate text-foreground" title={entry.comments}>
                          {entry.comments}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEditEntry(entry)}
                          disabled={entry.status !== 'Draft'}
                          className="h-8 w-8 p-0 focus:ring-ring"
                          aria-label={`Edit entry ${entry.entryID}`}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDeleteEntry(entry.entryID)}
                          disabled={entry.status !== 'Draft'}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive focus:ring-ring"
                          aria-label={`Delete entry ${entry.entryID}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogTable;
