// src/components/TimeEntry/TimesheetReview.tsx
import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Edit2, Trash2, Save, X } from 'lucide-react';
import api from '@/services/api';
import { toast } from '@/hooks/use-toast';

interface TimesheetEntry {
  EntryID: number;
  EmployeeID: string;
  EmployeeName: string;
  DateWorked: string;
  ProjectCode: string;
  ProjectDescription: string;
  ExtraValue?: string;
  CostCode: string;
  CostCodeDescription: string;
  StandardHours: number;
  OvertimeHours: number;
  TimeIn?: string;
  TimeOut?: string;
  BreakIn?: string;
  BreakOut?: string;
  Status: string;
  Notes?: string;
  CreatedDate: string;
  ModifiedDate?: string;
}

interface WeeklySummary {
  EmployeeID: string;
  EmployeeName: string;
  WeekEndingDate: string;
  TotalStandardHours: number;
  TotalOvertimeHours: number;
  TotalHours: number;
  DaysWorked: number;
  Status: string;
  Entries: TimesheetEntry[];
}

export default function TimesheetReview() {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null);
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState<string>(''); // Get from auth context

  const { register, handleSubmit, reset, setValue } = useForm();

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    // Get current user's employee ID from auth context
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    setEmployeeId(currentUser.employeeId);
  }, []);

  useEffect(() => {
    if (employeeId) {
      loadTimesheetData();
    }
  }, [selectedWeek, employeeId]);

  const loadTimesheetData = async () => {
    setLoading(true);
    try {
      const startDate = format(weekStart, 'yyyy-MM-dd');
      const endDate = format(weekEnd, 'yyyy-MM-dd');
      
      // Load timesheet entries for the week
      const response = await api.get('/timesheets', {
        params: {
          employeeId,
          startDate,
          endDate
        }
      });
      
      setEntries(response.data.entries);
      setWeeklySummary(response.data.summary);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load timesheet data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry: TimesheetEntry) => {
    setEditingEntry(entry.EntryID);
    setValue('standardHours', entry.StandardHours);
    setValue('overtimeHours', entry.OvertimeHours);
    setValue('notes', entry.Notes);
  };

  const handleSave = async (entryId: number, data: any) => {
    try {
      await api.put(`/timesheets/${entryId}`, {
        standardHours: parseFloat(data.standardHours),
        overtimeHours: parseFloat(data.overtimeHours),
        notes: data.notes
      });
      
      toast({
        title: "Success",
        description: "Entry updated successfully"
      });
      
      setEditingEntry(null);
      loadTimesheetData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update entry",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (entryId: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      await api.delete(`/timesheets/${entryId}`);
      
      toast({
        title: "Success",
        description: "Entry deleted successfully"
      });
      
      loadTimesheetData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive"
      });
    }
  };

  const handleSubmitWeek = async () => {
    try {
      await api.post('/timesheets/submit', {
        employeeId,
        weekEndingDate: format(weekEnd, 'yyyy-MM-dd')
      });
      
      toast({
        title: "Success",
        description: "Timesheet submitted for approval"
      });
      
      loadTimesheetData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit timesheet",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'secondary';
      case 'Submitted': return 'default';
      case 'Approved': return 'success';
      case 'Rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const groupEntriesByDay = () => {
    const grouped: Record<string, TimesheetEntry[]> = {};
    
    weekDays.forEach(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      grouped[dayStr] = entries.filter(e => e.DateWorked === dayStr);
    });
    
    return grouped;
  };

  const dailyEntries = groupEntriesByDay();

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Timesheet Review</span>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(prev => new Date(prev.setDate(prev.getDate() - 7)))}
              >
                Previous Week
              </Button>
              <span className="text-sm font-normal">
                {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedWeek(prev => new Date(prev.setDate(prev.getDate() + 7)))}
              >
                Next Week
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Weekly Summary */}
      {weeklySummary && (
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-2xl font-bold">{weeklySummary.TotalHours}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Standard Hours</p>
                <p className="text-2xl font-bold">{weeklySummary.TotalStandardHours}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overtime Hours</p>
                <p className="text-2xl font-bold">{weeklySummary.TotalOvertimeHours}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Worked</p>
                <p className="text-2xl font-bold">{weeklySummary.DaysWorked}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={getStatusColor(weeklySummary.Status)} className="mt-2">
                  {weeklySummary.Status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Daily Entries */}
      {weekDays.map(day => {
        const dayStr = format(day, 'yyyy-MM-dd');
        const dayEntries = dailyEntries[dayStr] || [];
        const dayTotal = dayEntries.reduce((sum, e) => sum + e.StandardHours + e.OvertimeHours, 0);
        
        return (
          <Card key={dayStr}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(day, 'EEEE, MMMM d')}
                </span>
                <span className="text-sm font-normal">
                  Total: {dayTotal} hours
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dayEntries.length === 0 ? (
                <p className="text-muted-foreground text-sm">No entries for this day</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Cost Code</TableHead>
                      <TableHead>Standard</TableHead>
                      <TableHead>OT</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dayEntries.map(entry => (
                      <TableRow key={entry.EntryID}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{entry.ProjectCode}</p>
                            <p className="text-xs text-muted-foreground">{entry.ProjectDescription}</p>
                            {entry.ExtraValue && (
                              <p className="text-xs">Extra: {entry.ExtraValue}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{entry.CostCode}</p>
                            <p className="text-xs text-muted-foreground">{entry.CostCodeDescription}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {editingEntry === entry.EntryID ? (
                            <Input
                              type="number"
                              step="0.25"
                              className="w-20"
                              {...register('standardHours')}
                              defaultValue={entry.StandardHours}
                            />
                          ) : (
                            entry.StandardHours
                          )}
                        </TableCell>
                        <TableCell>
                          {editingEntry === entry.EntryID ? (
                            <Input
                              type="number"
                              step="0.25"
                              className="w-20"
                              {...register('overtimeHours')}
                              defaultValue={entry.OvertimeHours}
                            />
                          ) : (
                            entry.OvertimeHours
                          )}
                        </TableCell>
                        <TableCell>
                          {editingEntry === entry.EntryID ? (
                            <Input
                              {...register('notes')}
                              defaultValue={entry.Notes}
                              className="w-full"
                            />
                          ) : (
                            <span className="text-sm">{entry.Notes || '-'}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(entry.Status)}>
                            {entry.Status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {entry.Status === 'Draft' && (
                            <div className="flex gap-2">
                              {editingEntry === entry.EntryID ? (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleSubmit((data) => handleSave(entry.EntryID, data))}
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingEntry(null)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleEdit(entry)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDelete(entry.EntryID)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Submit Week Button */}
      {weeklySummary?.Status === 'Draft' && entries.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <Button 
              onClick={handleSubmitWeek}
              className="w-full"
              size="lg"
            >
              Submit Week for Approval
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
