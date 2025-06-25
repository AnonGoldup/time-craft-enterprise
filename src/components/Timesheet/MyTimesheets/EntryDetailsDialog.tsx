
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Edit, Trash2 } from 'lucide-react';
import { TimesheetEntry } from './types';
import { StatusBadge } from './StatusBadge';
import { formatDate } from './utils';

interface EntryDetailsDialogProps {
  entry: TimesheetEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EntryDetailsDialog: React.FC<EntryDetailsDialogProps> = ({
  entry,
  open,
  onOpenChange
}) => {
  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Timesheet Entry Details</span>
            <StatusBadge status={entry.status} />
          </DialogTitle>
          <DialogDescription>
            Entry ID: {entry.entryId} • Created on {formatDate(entry.createdDate, 'MMM dd, yyyy')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Date Worked</Label>
              <p className="font-medium">{formatDate(entry.dateWorked, 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Employee</Label>
              <p className="font-medium">{entry.employeeId}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Project</Label>
              <p className="font-medium">{entry.projectCode}</p>
              <p className="text-sm text-muted-foreground">{entry.projectDescription}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Extra</Label>
              <p className="font-medium">{entry.extraValue}</p>
            </div>
          </div>
          
          <div>
            <Label className="text-xs text-muted-foreground">Cost Code</Label>
            <p className="font-medium">{entry.costCode}</p>
            <p className="text-sm text-muted-foreground">{entry.costCodeDescription}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Standard Hours</Label>
              <p className="font-medium text-blue-600">{entry.standardHours.toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Overtime Hours</Label>
              <p className="font-medium text-orange-600">{entry.overtimeHours.toFixed(2)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Total Hours</Label>
              <p className="font-medium text-green-600">{entry.totalHours.toFixed(2)}</p>
            </div>
          </div>
          
          {entry.notes && (
            <div>
              <Label className="text-xs text-muted-foreground">Notes</Label>
              <p className="text-sm bg-muted p-2 rounded">{entry.notes}</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {entry.status === 'Draft' && (
            <>
              <Button variant="outline" className="text-blue-600 hover:text-blue-700">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
