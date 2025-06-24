
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserPlus, Filter, X, Copy, Calendar, Building, Hash, 
  Trash2, CheckCircle, AlertTriangle, AlertCircle, Eye, Save, 
  Download, Upload, Plus, UserMinus
} from 'lucide-react';
import { toast } from 'sonner';

// Sample employee data
const allEmployees = [
  { id: 'JSMITH', name: 'John Smith', class: 'Foreman' },
  { id: 'MJONES', name: 'Mary Jones', class: 'Journeyman' },
  { id: 'BWILSON', name: 'Bob Wilson', class: 'Apprentice' },
  { id: 'SGREEN', name: 'Sarah Green', class: 'Journeyman' },
  { id: 'TBROWN', name: 'Tom Brown', class: 'Laborer' },
  { id: 'LWHITE', name: 'Lisa White', class: 'Foreman' },
  { id: 'DBLACK', name: 'David Black', class: 'Apprentice' },
  { id: 'JGRAY', name: 'Jessica Gray', class: 'Journeyman' },
  { id: 'MBLUE', name: 'Mike Blue', class: 'Laborer' },
  { id: 'ARED', name: 'Anna Red', class: 'Apprentice' },
  { id: 'PYELLOW', name: 'Paul Yellow', class: 'Journeyman' },
  { id: 'CORANGE', name: 'Carol Orange', class: 'Foreman' },
  { id: 'RPURPLE', name: 'Rick Purple', class: 'Laborer' },
  { id: 'SPINK', name: 'Steve Pink', class: 'Apprentice' },
  { id: 'NCYAN', name: 'Nancy Cyan', class: 'Journeyman' }
];

interface BulkEntry {
  employeeId: string;
  employeeName: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  hours: number;
  payType: 'standard' | 'overtime';
  notes?: string;
}

interface BulkEntryTabProps {
  onSubmit: (entries: BulkEntry[]) => void;
  managerMode?: boolean;
}

export const BulkEntryTab: React.FC<BulkEntryTabProps> = ({
  onSubmit,
  managerMode = false
}) => {
  const [activeEmployees, setActiveEmployees] = useState(allEmployees.slice(0, 5));
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [classFilter, setClassFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState('none');
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const [bulkData, setBulkData] = useState({
    projectCode: 'none',
    extraValue: 'Default',
    costCode: 'none',
    notes: ''
  });

  const [hoursData, setHoursData] = useState<Record<string, Record<string, number>>>({});
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Initialize hours data for active employees
  useEffect(() => {
    const newHoursData: Record<string, Record<string, number>> = {};
    activeEmployees.forEach(emp => {
      newHoursData[emp.id] = {};
      days.forEach(day => {
        newHoursData[emp.id][day] = hoursData[emp.id]?.[day] || 0;
      });
    });
    setHoursData(newHoursData);
  }, [activeEmployees]);

  // Calculate statistics
  const calculateStatistics = () => {
    let totalHours = 0;
    let standardHours = 0;
    let overtimeHours = 0;
    let validEntries = 0;

    activeEmployees.forEach(emp => {
      days.forEach(day => {
        const hours = hoursData[emp.id]?.[day] || 0;
        if (hours > 0) {
          validEntries++;
          totalHours += hours;
          if (hours <= 8) {
            standardHours += hours;
          } else {
            standardHours += 8;
            overtimeHours += (hours - 8);
          }
        }
      });
    });

    return { totalHours, standardHours, overtimeHours, validEntries };
  };

  const getAvailableEmployees = () => {
    return allEmployees.filter(emp => {
      const notActive = !activeEmployees.find(active => active.id === emp.id);
      const matchesClass = classFilter === 'all' || emp.class === classFilter;
      return notActive && matchesClass;
    });
  };

  const addEmployee = (employeeId: string) => {
    if (employeeId === 'none') return;
    
    const employee = allEmployees.find(emp => emp.id === employeeId);
    if (!employee || activeEmployees.find(emp => emp.id === employeeId)) return;

    setActiveEmployees(prev => [...prev, employee].sort((a, b) => a.name.localeCompare(b.name)));
    setSelectedEmployee('none');
    toast.success(`Added ${employee.name} to bulk entry`);
  };

  const removeEmployee = (employeeId: string) => {
    const employee = activeEmployees.find(emp => emp.id === employeeId);
    if (!employee) return;

    setActiveEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      newSet.delete(employeeId);
      return newSet;
    });
    
    setHoursData(prev => {
      const newData = { ...prev };
      delete newData[employeeId];
      return newData;
    });

    toast.success(`Removed ${employee.name} from bulk entry`);
  };

  const addEmployeesByClass = () => {
    if (classFilter === 'all') {
      toast.error('Please select a class filter first');
      return;
    }

    const employeesToAdd = getAvailableEmployees().filter(emp => emp.class === classFilter);
    if (employeesToAdd.length === 0) {
      toast.error(`No ${classFilter} employees available to add`);
      return;
    }

    setActiveEmployees(prev => 
      [...prev, ...employeesToAdd].sort((a, b) => a.name.localeCompare(b.name))
    );
    toast.success(`Added ${employeesToAdd.length} ${classFilter} employees`);
  };

  const updateHours = (employeeId: string, day: string, value: number) => {
    setHoursData(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: value
      }
    }));
  };

  const getEmployeeTotal = (employeeId: string) => {
    return days.reduce((total, day) => total + (hoursData[employeeId]?.[day] || 0), 0);
  };

  const applyTemplate = (templateType: 'standard' | 'service' | 'training') => {
    if (selectedEmployees.size === 0) {
      toast.error('Please select employees first');
      return;
    }

    const templates = {
      standard: { mon: 8, tue: 8, wed: 8, thu: 8, fri: 8 },
      service: { mon: 6, tue: 7, wed: 8, thu: 9, fri: 8 },
      training: { mon: 8, tue: 8, wed: 8, thu: 8, fri: 8 }
    };

    const template = templates[templateType];
    const newHoursData = { ...hoursData };

    selectedEmployees.forEach(employeeId => {
      Object.entries(template).forEach(([day, hours]) => {
        if (!newHoursData[employeeId]) newHoursData[employeeId] = {};
        newHoursData[employeeId][day] = hours;
      });
    });

    setHoursData(newHoursData);
    toast.success(`Applied ${templateType} template to ${selectedEmployees.size} employees`);
  };

  const copyRowDown = (sourceEmployeeId: string) => {
    if (selectedEmployees.size === 0) {
      toast.error('Please select target employees first');
      return;
    }

    const sourceHours = hoursData[sourceEmployeeId] || {};
    const newHoursData = { ...hoursData };

    selectedEmployees.forEach(employeeId => {
      if (employeeId !== sourceEmployeeId) {
        newHoursData[employeeId] = { ...sourceHours };
      }
    });

    setHoursData(newHoursData);
    toast.success(`Copied hours to ${selectedEmployees.size} employees`);
  };

  const validateEntries = () => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (bulkData.projectCode === 'none') errors.push('Project is required');
    if (bulkData.costCode === 'none') errors.push('Cost Code is required');
    if (activeEmployees.length === 0) errors.push('No employees added to bulk entry');

    activeEmployees.forEach(emp => {
      days.forEach(day => {
        const hours = hoursData[emp.id]?.[day] || 0;
        if (hours > 16) {
          errors.push(`${emp.name} - ${day}: Cannot exceed 16 hours`);
        } else if (hours > 12) {
          warnings.push(`${emp.name} - ${day}: High hours (${hours})`);
        }
      });
    });

    setValidationErrors(errors);
    setValidationWarnings(warnings);
    return { errors, warnings };
  };

  const collectEntries = (): BulkEntry[] => {
    const entries: BulkEntry[] = [];
    
    if (bulkData.projectCode === 'none' || bulkData.costCode === 'none') return entries;

    activeEmployees.forEach(emp => {
      days.forEach((day, index) => {
        const hours = hoursData[emp.id]?.[day] || 0;
        if (hours > 0) {
          const standardHours = Math.min(hours, 8);
          const overtimeHours = Math.max(0, hours - 8);

          if (standardHours > 0) {
            entries.push({
              employeeId: emp.id,
              employeeName: emp.name,
              dateWorked: `2025-06-${22 + index}`,
              projectCode: bulkData.projectCode,
              extraValue: bulkData.extraValue,
              costCode: bulkData.costCode,
              hours: standardHours,
              payType: 'standard',
              notes: bulkData.notes
            });
          }

          if (overtimeHours > 0) {
            entries.push({
              employeeId: emp.id,
              employeeName: emp.name,
              dateWorked: `2025-06-${22 + index}`,
              projectCode: bulkData.projectCode,
              extraValue: bulkData.extraValue,
              costCode: bulkData.costCode,
              hours: overtimeHours,
              payType: 'overtime',
              notes: bulkData.notes
            });
          }
        }
      });
    });

    return entries;
  };

  const handleSubmit = () => {
    const { errors } = validateEntries();
    if (errors.length > 0) {
      toast.error('Please fix validation errors before submitting');
      return;
    }

    const entries = collectEntries();
    if (entries.length === 0) {
      toast.error('No entries to submit');
      return;
    }

    onSubmit(entries);
    toast.success(`Successfully submitted ${entries.length} timesheet entries!`);
  };

  const stats = calculateStatistics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold mb-1">Bulk Entry Mode</h3>
            <p className="text-slate-300 text-sm">Enter time for multiple employees efficiently</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {selectedEmployees.size} selected
            </Badge>
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
              {stats.validEntries} entries
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Control Panel */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Bulk Entry Controls</h3>
              
              {/* Project Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label className="flex items-center space-x-1 mb-2">
                    <Building className="w-4 h-4" />
                    <span>Project *</span>
                  </Label>
                  <Select value={bulkData.projectCode} onValueChange={(value) => setBulkData(prev => ({ ...prev, projectCode: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Select Project</SelectItem>
                      <SelectItem value="21-0066">21-0066 - Edmonton EXPO SOLAR IPD</SelectItem>
                      <SelectItem value="22-0006">22-0006 - AltaPro Service Department</SelectItem>
                      <SelectItem value="23-0004">23-0004 - Office and Shop OH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-2">Extra</Label>
                  <Select value={bulkData.extraValue} onValueChange={(value) => setBulkData(prev => ({ ...prev, extraValue: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Default">Default</SelectItem>
                      <SelectItem value="005">005 - Phase 1</SelectItem>
                      <SelectItem value="010">010 - Phase 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="flex items-center space-x-1 mb-2">
                    <Hash className="w-4 h-4" />
                    <span>Cost Code *</span>
                  </Label>
                  <Select value={bulkData.costCode} onValueChange={(value) => setBulkData(prev => ({ ...prev, costCode: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Cost Code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Select Cost Code</SelectItem>
                      <SelectItem value="001-040-043">001-040-043 - Direct Labor</SelectItem>
                      <SelectItem value="001-040-054">001-040-054 - Employee Training</SelectItem>
                      <SelectItem value="001-500-501">001-500-501 - Vehicle Travel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Employee Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="flex items-center space-x-1 mb-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Add Employees</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select Employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Select Employee</SelectItem>
                        {getAvailableEmployees().map(emp => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name} - {emp.class}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => selectedEmployee && addEmployee(selectedEmployee)} className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="flex items-center space-x-1 mb-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter by Class</span>
                  </Label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="Foreman">Foremen</SelectItem>
                      <SelectItem value="Journeyman">Journeymen</SelectItem>
                      <SelectItem value="Apprentice">Apprentices</SelectItem>
                      <SelectItem value="Laborer">Laborers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button onClick={() => setSelectedEmployees(new Set(activeEmployees.map(emp => emp.id)))} className="bg-blue-600 hover:bg-blue-700">
                  <Users className="w-4 h-4 mr-1" />
                  Select All
                </Button>
                <Button onClick={() => setSelectedEmployees(new Set())} variant="outline">
                  <X className="w-4 h-4 mr-1" />
                  Clear Selection
                </Button>
                <Button onClick={addEmployeesByClass} className="bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Add by Class
                </Button>
                <Button onClick={() => applyTemplate('standard')} className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="w-4 h-4 mr-1" />
                  Standard Week
                </Button>
              </div>

              {/* Notes */}
              <div>
                <Label className="mb-2">Bulk Notes</Label>
                <Textarea
                  rows={2}
                  placeholder="Enter notes to apply to all entries..."
                  value={bulkData.notes}
                  onChange={(e) => setBulkData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Employee Grid */}
          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Employee Time Grid</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      {stats.validEntries} valid entries • {stats.totalHours.toFixed(2)} total hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid Header */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="grid grid-cols-10 gap-2 items-center text-sm font-medium text-gray-700">
                  <div className="col-span-3">Employee ({activeEmployees.length})</div>
                  {dayNames.slice(0, 7).map(day => (
                    <div key={day} className="text-center">{day.slice(0, 3)}</div>
                  ))}
                </div>
              </div>

              {/* Employee Rows */}
              <div className="max-h-96 overflow-y-auto">
                {activeEmployees.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Employees Added</h3>
                    <p className="text-sm">Add employees using the controls above to start bulk entry</p>
                  </div>
                ) : (
                  activeEmployees.map(emp => (
                    <div key={emp.id} className={`p-4 border-b hover:bg-gray-50 ${selectedEmployees.has(emp.id) ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="grid grid-cols-10 gap-2 items-center">
                        <div className="col-span-3 flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedEmployees.has(emp.id)}
                            onChange={(e) => {
                              const newSet = new Set(selectedEmployees);
                              if (e.target.checked) {
                                newSet.add(emp.id);
                              } else {
                                newSet.delete(emp.id);
                              }
                              setSelectedEmployees(newSet);
                            }}
                            className="rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">{emp.name}</div>
                            <div className="text-xs text-gray-500">{emp.id} - {emp.class}</div>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyRowDown(emp.id)}
                              className="p-1 h-6 w-6"
                              title="Copy to selected"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeEmployee(emp.id)}
                              className="p-1 h-6 w-6 text-red-600 hover:text-red-700"
                              title="Remove"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        {days.map(day => (
                          <div key={day} className="text-center">
                            <Input
                              type="number"
                              step="0.25"
                              min="0"
                              max="16"
                              placeholder="0"
                              value={hoursData[emp.id]?.[day] || ''}
                              onChange={(e) => updateHours(emp.id, day, parseFloat(e.target.value) || 0)}
                              className="w-16 h-8 text-center text-xs"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-right text-sm font-medium">
                        Total: {getEmployeeTotal(emp.id).toFixed(2)} hrs
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validation Results */}
          {(validationErrors.length > 0 || validationWarnings.length > 0) && (
            <Card>
              <CardContent className="p-4">
                {validationErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-red-900 mb-2">Errors ({validationErrors.length})</div>
                        <ul className="text-sm text-red-800 space-y-1">
                          {validationErrors.map((error, index) => (
                            <li key={index}>• {error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {validationWarnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-yellow-900 mb-2">Warnings ({validationWarnings.length})</div>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          {validationWarnings.map((warning, index) => (
                            <li key={index}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Submit Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Submit Bulk Entries</h3>
                  <p className="text-sm text-gray-600">Review and submit all valid timesheet entries</p>
                </div>
                <div className="flex space-x-3">
                  <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setPreviewOpen(true)}>
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                      <DialogHeader>
                        <DialogTitle>Preview Bulk Entries</DialogTitle>
                      </DialogHeader>
                      <div className="overflow-y-auto max-h-96 p-4">
                        {collectEntries().length === 0 ? (
                          <p className="text-center text-gray-500">No entries to preview</p>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-sm text-gray-600">
                              {collectEntries().length} entries will be created
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-2 py-1 text-left">Employee</th>
                                    <th className="px-2 py-1 text-left">Date</th>
                                    <th className="px-2 py-1 text-left">Project</th>
                                    <th className="px-2 py-1 text-left">Hours</th>
                                    <th className="px-2 py-1 text-left">Type</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {collectEntries().map((entry, index) => (
                                    <tr key={index} className="border-t">
                                      <td className="px-2 py-1">{entry.employeeName}</td>
                                      <td className="px-2 py-1">{entry.dateWorked}</td>
                                      <td className="px-2 py-1">{entry.projectCode}</td>
                                      <td className="px-2 py-1">{entry.hours}</td>
                                      <td className="px-2 py-1">
                                        <Badge variant={entry.payType === 'standard' ? 'default' : 'secondary'}>
                                          {entry.payType}
                                        </Badge>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setPreviewOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={collectEntries().length === 0}>
                          Confirm Submit
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    onClick={() => {
                      validateEntries();
                      handleSubmit();
                    }}
                    disabled={stats.validEntries === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Submit {stats.validEntries} Entries
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Statistics */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Employees</span>
                  <span className="font-semibold">{activeEmployees.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Selected</span>
                  <span className="font-semibold text-blue-600">{selectedEmployees.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Hours</span>
                  <span className="font-semibold">{stats.totalHours.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Standard</span>
                  <span className="font-semibold">{stats.standardHours.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overtime</span>
                  <span className="font-semibold text-orange-600">{stats.overtimeHours.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Valid Entries</span>
                    <span>{stats.validEntries}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Quick Templates</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => applyTemplate('standard')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <div className="text-left">
                    <div className="font-medium">Standard Week</div>
                    <div className="text-xs text-gray-500">Mon-Fri • 8hrs/day</div>
                  </div>
                </Button>
                <Button
                  onClick={() => applyTemplate('service')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <div className="text-left">
                    <div className="font-medium">Service Calls</div>
                    <div className="text-xs text-gray-500">Various hours</div>
                  </div>
                </Button>
                <Button
                  onClick={() => applyTemplate('training')}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <div className="text-left">
                    <div className="font-medium">Training Week</div>
                    <div className="text-xs text-gray-500">8hrs/day • Training code</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
