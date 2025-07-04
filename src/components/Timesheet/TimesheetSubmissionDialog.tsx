import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit2, Check, Users, Calendar, Clock, FileText } from 'lucide-react';

interface TimesheetEntry {
  employeeId: string;
  employeeName: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  notes: string;
}

interface TimesheetSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: TimesheetEntry[];
  onConfirmSubmission: (entries: TimesheetEntry[]) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const TimesheetSubmissionDialog: React.FC<TimesheetSubmissionDialogProps> = ({
  open,
  onOpenChange,
  entries,
  onConfirmSubmission,
  onCancel,
  isSubmitting = false
}) => {
  const [editableEntries, setEditableEntries] = useState<TimesheetEntry[]>(entries);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Update entries when prop changes
  React.useEffect(() => {
    setEditableEntries(entries);
  }, [entries]);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    setEditingIndex(null);
  };

  const updateEntry = (index: number, field: keyof TimesheetEntry, value: string | number) => {
    const updated = [...editableEntries];
    updated[index] = { ...updated[index], [field]: value };
    setEditableEntries(updated);
  };

  const handleConfirm = () => {
    onConfirmSubmission(editableEntries);
  };

  const handleCancel = () => {
    setEditableEntries(entries); // Reset to original
    setEditingIndex(null);
    onCancel();
  };

  // Calculate totals
  const totalEntries = editableEntries.length;
  const totalStandardHours = editableEntries.reduce((sum, entry) => sum + entry.standardHours, 0);
  const totalOvertimeHours = editableEntries.reduce((sum, entry) => sum + entry.overtimeHours, 0);
  const totalHours = totalStandardHours + totalOvertimeHours;
  const uniqueEmployees = new Set(editableEntries.map(e => e.employeeId)).size;
  const uniqueDates = new Set(editableEntries.map(e => e.dateWorked)).size;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Confirm Timesheet Submission
          </DialogTitle>
          <DialogDescription>
            Review your timesheet entries before submitting. You can make edits if needed.
          </DialogDescription>
        </DialogHeader>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">{totalEntries}</p>
                  <p className="text-xs text-muted-foreground">Entries</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">{uniqueEmployees}</p>
                  <p className="text-xs text-muted-foreground">Employees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">{uniqueDates}</p>
                  <p className="text-xs text-muted-foreground">Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">{totalHours.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Entries Table */}
        <ScrollArea className="flex-1 max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Cost Code</TableHead>
                <TableHead>Standard</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editableEntries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{entry.employeeName}</p>
                      <p className="text-xs text-muted-foreground">{entry.employeeId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{entry.dateWorked}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{entry.projectCode}</p>
                      {entry.extraValue !== 'Default' && (
                        <Badge variant="outline" className="text-xs mt-1">
                          {entry.extraValue}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{entry.costCode}</TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Input
                        type="number"
                        step="0.25"
                        value={entry.standardHours}
                        onChange={(e) => updateEntry(index, 'standardHours', parseFloat(e.target.value) || 0)}
                        className="w-20 h-8"
                      />
                    ) : (
                      <span className="text-sm font-medium text-blue-600">
                        {entry.standardHours.toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Input
                        type="number"
                        step="0.25"
                        value={entry.overtimeHours}
                        onChange={(e) => updateEntry(index, 'overtimeHours', parseFloat(e.target.value) || 0)}
                        className="w-20 h-8"
                      />
                    ) : (
                      <span className="text-sm font-medium text-orange-600">
                        {entry.overtimeHours.toFixed(2)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    {editingIndex === index ? (
                      <Textarea
                        value={entry.notes}
                        onChange={(e) => updateEntry(index, 'notes', e.target.value)}
                        className="w-full h-16 text-xs"
                        placeholder="Notes..."
                      />
                    ) : (
                      <p className="text-xs text-muted-foreground truncate">
                        {entry.notes || 'No notes'}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingIndex === index ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleSaveEdit}
                        className="h-7 w-7 p-0"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(index)}
                        className="h-7 w-7 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>

        {/* Hours Summary */}
        <div className="flex justify-between items-center py-3 border-t bg-muted/30 rounded-md px-4">
          <div className="flex gap-6">
            <div>
              <span className="text-sm font-medium">Standard Hours: </span>
              <span className="text-sm font-bold text-blue-600">{totalStandardHours.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Overtime Hours: </span>
              <span className="text-sm font-bold text-orange-600">{totalOvertimeHours.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-sm font-medium">Total Hours: </span>
              <span className="text-sm font-bold text-green-600">{totalHours.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Submitting...</span>
              </div>
            ) : (
              `Submit ${totalEntries} ${totalEntries === 1 ? 'Entry' : 'Entries'}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};