
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TimesheetEntry {
  id: string;
  employeeName: string;
  employeeId: string;
  project: string;
  projectCode: string;
  date: string;
  standardHours: number;
  overtimeHours: number;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
  submittedDate: string;
  submittedBy: string;
}

interface TimesheetEntryListProps {
  entries: TimesheetEntry[];
  statusFilter: string;
  selectedEntry: TimesheetEntry | null;
  setSelectedEntry: (entry: TimesheetEntry | null) => void;
  onApprove: (entryId: string) => void;
  onReject: (entryId: string, reason: string) => void;
  rejectReason: string;
  setRejectReason: (reason: string) => void;
}

export const TimesheetEntryList: React.FC<TimesheetEntryListProps> = ({
  entries,
  statusFilter,
  selectedEntry,
  setSelectedEntry,
  onApprove,
  onReject,
  rejectReason,
  setRejectReason
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-400";
      case "approved":
        return "bg-green-500/20 text-green-600 dark:text-green-400 border-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-600 dark:text-red-400 border-red-400";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Timesheet Entries</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto">
        {entries
          .filter(entry => statusFilter === "all" || entry.status === statusFilter)
          .map((entry) => (
          <div
            key={entry.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-accent/50 ${
              selectedEntry?.id === entry.id
                ? "border-primary bg-primary/10"
                : "border-border"
            }`}
            onClick={() => setSelectedEntry(entry)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-foreground font-semibold">{entry.employeeName}</h3>
                <p className="text-muted-foreground text-sm">{entry.date} • {entry.project}</p>
                <p className="text-muted-foreground text-xs">
                  Std: {entry.standardHours}h | OT: {entry.overtimeHours}h
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline" className={getStatusColor(entry.status)}>
                  {entry.status}
                </Badge>
                {entry.status === 'pending' && (
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-green-400 text-green-600 hover:bg-green-400 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(entry.id);
                      }}
                    >
                      ✓
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 border-red-400 text-red-600 hover:bg-red-400 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          ✗
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-popover border-border">
                        <DialogHeader>
                          <DialogTitle className="text-popover-foreground">Reject Timesheet Entry</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">
                            Please provide a reason for rejecting this timesheet entry.
                          </p>
                          <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Enter rejection reason..."
                            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button
                              onClick={() => onReject(entry.id, rejectReason)}
                              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            >
                              Confirm Rejection
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
