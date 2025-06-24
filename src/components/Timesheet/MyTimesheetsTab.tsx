
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FileText, Calendar, Edit, Trash2, Eye, Download, Filter, Search } from 'lucide-react';
import { toast } from 'sonner';

interface TimesheetEntry {
  id: string;
  date: string;
  project: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
  status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
  notes?: string;
}

export const MyTimesheetsTab: React.FC = () => {
  const [entries, setEntries] = useState<TimesheetEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      project: '21-0066 - Edmonton EXPO SOLAR IPD',
      costCode: '001-040-043 - Direct Labor',
      standardHours: 8,
      overtimeHours: 0,
      status: 'Approved',
      notes: 'Regular work day'
    },
    {
      id: '2',
      date: '2024-01-16',
      project: '22-0006 - AltaPro Service Department',
      costCode: '001-500-501 - Vehicle Travel',
      standardHours: 6,
      overtimeHours: 2,
      status: 'Submitted'
    },
    {
      id: '3',
      date: '2024-01-17',
      project: '21-0066 - Edmonton EXPO SOLAR IPD',
      costCode: '001-040-043 - Direct Labor',
      standardHours: 8,
      overtimeHours: 0,
      status: 'Draft',
      notes: 'Need to update project details'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<TimesheetEntry | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const filteredEntries = entries.filter(entry => {
    const matchesStatus = filterStatus === 'all' || entry.status.toLowerCase() === filterStatus;
    const matchesSearch = entry.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.costCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: TimesheetEntry['status']) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
    setShowEditDialog(true);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    toast.success('Timesheet entry deleted');
  };

  const handleView = (entry: TimesheetEntry) => {
    setSelectedEntry(entry);
  };

  const totalHours = filteredEntries.reduce((total, entry) => 
    total + entry.standardHours + entry.overtimeHours, 0
  );

  const statusCounts = entries.reduce((counts, entry) => {
    counts[entry.status] = (counts[entry.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return (
    <CardContent className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">My Timesheets</h3>
        <Badge variant="secondary">{entries.length} entries</Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Total Hours</div>
          <div className="text-xl font-bold text-blue-600">{totalHours.toFixed(1)}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Draft</div>
          <div className="text-xl font-bold text-gray-600">{statusCounts.Draft || 0}</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Submitted</div>
          <div className="text-xl font-bold text-blue-600">{statusCounts.Submitted || 0}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Approved</div>
          <div className="text-xl font-bold text-green-600">{statusCounts.Approved || 0}</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Rejected</div>
          <div className="text-xl font-bold text-red-600">{statusCounts.Rejected || 0}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <Label>Filter by Status</Label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search project or cost code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-end space-x-2">
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="flex-1">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Timesheet Entries Table - Fixed layout */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Cost Code</TableHead>
                <TableHead className="text-center">Standard</TableHead>
                <TableHead className="text-center">Overtime</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48 truncate">
                      {entry.project}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-40 truncate">
                      {entry.costCode}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.standardHours.toFixed(1)}h
                  </TableCell>
                  <TableCell className="text-center">
                    {entry.overtimeHours.toFixed(1)}h
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {(entry.standardHours + entry.overtimeHours).toFixed(1)}h
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(entry)}
                        className="p-1 h-8 w-8"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {entry.status === 'Draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(entry)}
                          className="p-1 h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      {entry.status === 'Draft' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(entry.id)}
                          className="p-1 h-8 w-8 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No timesheet entries found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your filters or search terms.'
              : 'Start by creating your first time entry.'
            }
          </p>
        </div>
      )}

      {/* Entry Detail Dialog */}
      <Dialog open={!!selectedEntry && !showEditDialog} onOpenChange={() => setSelectedEntry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Timesheet Entry Details</DialogTitle>
          </DialogHeader>
          {selectedEntry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <div className="font-medium">{new Date(selectedEntry.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedEntry.status)}>
                    {selectedEntry.status}
                  </Badge>
                </div>
              </div>
              <div>
                <Label>Project</Label>
                <div className="font-medium">{selectedEntry.project}</div>
              </div>
              <div>
                <Label>Cost Code</Label>
                <div className="font-medium">{selectedEntry.costCode}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Standard Hours</Label>
                  <div className="font-medium">{selectedEntry.standardHours.toFixed(1)}h</div>
                </div>
                <div>
                  <Label>Overtime Hours</Label>
                  <div className="font-medium">{selectedEntry.overtimeHours.toFixed(1)}h</div>
                </div>
                <div>
                  <Label>Total Hours</Label>
                  <div className="font-medium">{(selectedEntry.standardHours + selectedEntry.overtimeHours).toFixed(1)}h</div>
                </div>
              </div>
              {selectedEntry.notes && (
                <div>
                  <Label>Notes</Label>
                  <div className="p-3 bg-muted rounded-lg">{selectedEntry.notes}</div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Timesheet Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Edit functionality would be implemented here with form fields.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowEditDialog(false);
                toast.success('Entry updated successfully');
              }}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </CardContent>
  );
};
