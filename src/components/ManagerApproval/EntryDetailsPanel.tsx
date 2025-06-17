
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, XCircle, Edit, Users } from 'lucide-react';

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

interface EntryDetailsPanelProps {
  selectedEntry: TimesheetEntry | null;
  onApprove: (entryId: string) => void;
  onReject: (entryId: string, reason: string) => void;
  onRequestChanges: (entryId: string) => void;
  rejectReason: string;
  setRejectReason: (reason: string) => void;
}

export const EntryDetailsPanel: React.FC<EntryDetailsPanelProps> = ({
  selectedEntry,
  onApprove,
  onReject,
  onRequestChanges,
  rejectReason,
  setRejectReason
}) => {
  return (
    <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-white">Entry Details</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedEntry ? (
          <div className="space-y-6">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Employee</p>
              <p className="text-white">{selectedEntry.employeeName}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Date</p>
              <p className="text-white">{new Date(selectedEntry.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Project</p>
              <p className="text-white">{selectedEntry.projectCode} - {selectedEntry.project}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg">
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Standard Hours</p>
                <p className="text-2xl font-bold text-white">{selectedEntry.standardHours}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Overtime Hours</p>
                <p className="text-2xl font-bold text-orange-400">{selectedEntry.overtimeHours}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Notes</p>
              <p className="text-white text-sm">{selectedEntry.notes}</p>
            </div>

            <div>
              <p className="text-gray-400 text-xs">
                Submitted by {selectedEntry.submittedBy} on {selectedEntry.submittedDate}
              </p>
            </div>

            {selectedEntry.status === 'pending' && (
              <div className="space-y-3 pt-4 border-t border-white/10">
                <textarea
                  placeholder="Add approval comments..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={3}
                />
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    onClick={() => onApprove(selectedEntry.id)}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve Entry
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject Entry
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/20">
                      <DialogHeader>
                        <DialogTitle className="text-white">Reject Timesheet Entry</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-gray-400">
                          Please provide a reason for rejecting this timesheet entry.
                        </p>
                        <textarea
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="Enter rejection reason..."
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                          rows={3}
                        />
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button
                            onClick={() => onReject(selectedEntry.id, rejectReason)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Confirm Rejection
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    onClick={() => onRequestChanges(selectedEntry.id)}
                    variant="outline" 
                    className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Request Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">Select a timesheet entry to view details</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
