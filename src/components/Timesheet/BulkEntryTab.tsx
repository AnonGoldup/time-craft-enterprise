
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, User, Building, Hash, Plus, Trash2, Users, Upload, Download, Copy, Clock, CheckSquare, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

interface Employee {
  id: string;
  name: string;
  class: string;
}

interface DayEntry {
  project?: string;
  costCode?: string;
  standardHours: number;
  overtimeHours: number;
}

interface EmployeeWeekData {
  employee: Employee;
  days: {
    sunday: DayEntry;
    monday: DayEntry;
    tuesday: DayEntry;
    wednesday: DayEntry;
    thursday: DayEntry;
    friday: DayEntry;
    saturday: DayEntry;
  };
  selected: boolean;
}

interface BulkEntryTabProps {
  onSubmit: (entries: any[]) => void;
  managerMode?: boolean;
}

export const BulkEntryTab: React.FC<BulkEntryTabProps> = ({ onSubmit, managerMode = false }) => {
  const [employees, setEmployees] = useState<EmployeeWeekData[]>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCostCode, setSelectedCostCode] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [showPreview, setShowPreview] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState(new Date().toISOString().split('T')[0]);

  const availableEmployees: Employee[] = [
    { id: 'JSMITH', name: 'John Smith', class: 'Foreman' },
    { id: 'MJONES', name: 'Mary Jones', class: 'Journeyman' },
    { id: 'BWILSON', name: 'Bob Wilson', class: 'Apprentice' },
    { id: 'SGREEN', name: 'Steve Green', class: 'Foreman' },
    { id: 'LJOHNSON', name: 'Lisa Johnson', class: 'Journeyman' },
    { id: 'DBROWN', name: 'David Brown', class: 'Apprentice' }
  ];

  const projects = [
    { code: '21-0066', name: 'Edmonton EXPO SOLAR IPD' },
    { code: '22-0006', name: 'AltaPro Service Department' },
    { code: '23-0004', name: 'Office and Shop OH' }
  ];

  const costCodes = [
    { code: '001-040-043', name: 'Direct Labor' },
    { code: '001-500-501', name: 'Vehicle Travel' }
  ];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;

  const createEmptyDay = (): DayEntry => ({
    standardHours: 0,
    overtimeHours: 0
  });

  const createEmptyWeek = (employee: Employee): EmployeeWeekData => ({
    employee,
    days: {
      sunday: createEmptyDay(),
      monday: createEmptyDay(),
      tuesday: createEmptyDay(),
      wednesday: createEmptyDay(),
      thursday: createEmptyDay(),
      friday: createEmptyDay(),
      saturday: createEmptyDay()
    },
    selected: false
  });

  const addEmployee = (employeeId: string) => {
    const employee = availableEmployees.find(emp => emp.id === employeeId);
    if (employee && !employees.find(emp => emp.employee.id === employeeId)) {
      setEmployees([...employees, createEmptyWeek(employee)]);
    }
  };

  const addEmployeesByClass = (className: string) => {
    const classEmployees = availableEmployees.filter(emp => 
      emp.class === className && !employees.find(existing => existing.employee.id === emp.id)
    );
    const newEmployees = classEmployees.map(emp => createEmptyWeek(emp));
    setEmployees([...employees, ...newEmployees]);
  };

  const removeEmployee = (employeeId: string) => {
    setEmployees(employees.filter(emp => emp.employee.id !== employeeId));
  };

  const updateEmployeeDay = (employeeId: string, day: keyof EmployeeWeekData['days'], field: keyof DayEntry, value: any) => {
    setEmployees(employees.map(emp => {
      if (emp.employee.id === employeeId) {
        return {
          ...emp,
          days: {
            ...emp.days,
            [day]: {
              ...emp.days[day],
              [field]: value
            }
          }
        };
      }
      return emp;
    }));
  };

  const toggleEmployeeSelection = (employeeId: string) => {
    setEmployees(employees.map(emp => 
      emp.employee.id === employeeId ? { ...emp, selected: !emp.selected } : emp
    ));
  };

  const selectAllEmployees = () => {
    setEmployees(employees.map(emp => ({ ...emp, selected: true })));
  };

  const deselectAllEmployees = () => {
    setEmployees(employees.map(emp => ({ ...emp, selected: false })));
  };

  const applyTemplate = (template: string) => {
    const templateHours = template === 'standard' ? 8 : template === 'service' ? 10 : 6;
    const selectedEmployees = employees.filter(emp => emp.selected);
    
    if (selectedEmployees.length === 0) {
      toast.error('Please select employees to apply template');
      return;
    }

    setEmployees(employees.map(emp => {
      if (emp.selected) {
        const newDays = { ...emp.days };
        if (template === 'standard') {
          // Monday to Friday, 8 hours each
          ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
            newDays[day as keyof typeof newDays] = {
              ...newDays[day as keyof typeof newDays],
              standardHours: templateHours,
              project: selectedProject,
              costCode: selectedCostCode
            };
          });
        }
        return { ...emp, days: newDays };
      }
      return emp;
    }));
    
    toast.success(`Applied ${template} template to ${selectedEmployees.length} employees`);
  };

  const copyRowDown = (fromEmployeeId: string) => {
    const fromEmployee = employees.find(emp => emp.employee.id === fromEmployeeId);
    if (!fromEmployee) return;

    const selectedEmployees = employees.filter(emp => emp.selected && emp.employee.id !== fromEmployeeId);
    if (selectedEmployees.length === 0) {
      toast.error('Please select target employees to copy to');
      return;
    }

    setEmployees(employees.map(emp => {
      if (emp.selected && emp.employee.id !== fromEmployeeId) {
        return { ...emp, days: { ...fromEmployee.days } };
      }
      return emp;
    }));

    toast.success(`Copied time entries to ${selectedEmployees.length} employees`);
  };

  const calculateEmployeeTotal = (employeeData: EmployeeWeekData) => {
    return dayKeys.reduce((total, day) => {
      const dayData = employeeData.days[day];
      return total + dayData.standardHours + dayData.overtimeHours;
    }, 0);
  };

  const calculateDayTotal = (day: keyof EmployeeWeekData['days']) => {
    return employees.reduce((total, emp) => {
      const dayData = emp.days[day];
      return total + dayData.standardHours + dayData.overtimeHours;
    }, 0);
  };

  const getTotalHours = () => {
    return employees.reduce((total, emp) => total + calculateEmployeeTotal(emp), 0);
  };

  const getValidationStats = () => {
    let errors = 0;
    let warnings = 0;
    
    employees.forEach(emp => {
      dayKeys.forEach(day => {
        const dayData = emp.days[day];
        const total = dayData.standardHours + dayData.overtimeHours;
        if (total > 16) errors++;
        if (total > 12) warnings++;
      });
    });

    return { errors, warnings };
  };

  const handleSubmit = () => {
    const { errors } = getValidationStats();
    if (errors > 0) {
      toast.error('Please fix validation errors before submitting');
      return;
    }

    // Convert to submission format
    const entries: any[] = [];
    employees.forEach(emp => {
      dayKeys.forEach((day, index) => {
        const dayData = emp.days[day];
        if (dayData.standardHours > 0 || dayData.overtimeHours > 0) {
          const entryDate = new Date(weekStartDate);
          entryDate.setDate(entryDate.getDate() + index);
          
          if (dayData.standardHours > 0) {
            entries.push({
              employeeId: emp.employee.id,
              dateWorked: entryDate.toISOString().split('T')[0],
              projectCode: dayData.project || selectedProject,
              costCode: dayData.costCode || selectedCostCode,
              standardHours: dayData.standardHours,
              overtimeHours: 0,
              payType: 'standard'
            });
          }
          
          if (dayData.overtimeHours > 0) {
            entries.push({
              employeeId: emp.employee.id,
              dateWorked: entryDate.toISOString().split('T')[0],
              projectCode: dayData.project || selectedProject,
              costCode: dayData.costCode || selectedCostCode,
              standardHours: 0,
              overtimeHours: dayData.overtimeHours,
              payType: 'overtime'
            });
          }
        }
      });
    });

    onSubmit(entries);
    toast.success(`Submitted ${entries.length} time entries for ${employees.length} employees`);
  };

  const filteredAvailableEmployees = filterClass === 'all' 
    ? availableEmployees 
    : availableEmployees.filter(emp => emp.class === filterClass);

  const stats = getValidationStats();

  return (
    <CardContent className="p-6">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Bulk Time Entry</h3>
        <Badge variant="secondary">{employees.length} employees</Badge>
      </div>

      {/* Controls Section */}
      <div className="space-y-4 mb-6">
        {/* Week Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Week Starting</Label>
            <Input
              type="date"
              value={weekStartDate}
              onChange={(e) => setWeekStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label>Default Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project.code} value={project.code}>
                    {project.code} - {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Default Cost Code</Label>
            <Select value={selectedCostCode} onValueChange={setSelectedCostCode}>
              <SelectTrigger>
                <SelectValue placeholder="Select Cost Code" />
              </SelectTrigger>
              <SelectContent>
                {costCodes.map(code => (
                  <SelectItem key={code.code} value={code.code}>
                    {code.code} - {code.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Employee Management */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Employee Management</h4>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllEmployees}>
                <CheckSquare className="w-4 h-4 mr-1" />
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={deselectAllEmployees}>
                Deselect All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Filter by Class</Label>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Foreman">Foreman</SelectItem>
                  <SelectItem value="Journeyman">Journeyman</SelectItem>
                  <SelectItem value="Apprentice">Apprentice</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Add Employee</Label>
              <Select onValueChange={addEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {filteredAvailableEmployees
                    .filter(emp => !employees.find(existing => existing.employee.id === emp.id))
                    .map(employee => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name} - {employee.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Add by Class</Label>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => addEmployeesByClass('Foreman')}>
                  Foreman
                </Button>
                <Button variant="outline" size="sm" onClick={() => addEmployeesByClass('Journeyman')}>
                  Journeyman
                </Button>
                <Button variant="outline" size="sm" onClick={() => addEmployeesByClass('Apprentice')}>
                  Apprentice
                </Button>
              </div>
            </div>
            <div>
              <Label>Templates</Label>
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => applyTemplate('standard')}>
                  Standard
                </Button>
                <Button variant="outline" size="sm" onClick={() => applyTemplate('service')}>
                  Service
                </Button>
                <Button variant="outline" size="sm" onClick={() => applyTemplate('training')}>
                  Training
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Total Hours</div>
            <div className="text-xl font-bold text-blue-600">{getTotalHours().toFixed(1)}</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Employees</div>
            <div className="text-xl font-bold text-green-600">{employees.length}</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Warnings</div>
            <div className="text-xl font-bold text-orange-600">{stats.warnings}</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">Errors</div>
            <div className="text-xl font-bold text-red-600">{stats.errors}</div>
          </div>
        </div>
      </div>

      {/* Time Entry Grid */}
      {employees.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="min-w-40">Employee</TableHead>
                  {dayNames.map(day => (
                    <TableHead key={day} className="text-center min-w-24">
                      <div>{day.slice(0, 3)}</div>
                      <div className="text-xs text-muted-foreground">
                        {calculateDayTotal(dayKeys[dayNames.indexOf(day)]).toFixed(1)}h
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="w-8">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map(emp => (
                  <TableRow key={emp.employee.id}>
                    <TableCell>
                      <Checkbox
                        checked={emp.selected}
                        onCheckedChange={() => toggleEmployeeSelection(emp.employee.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{emp.employee.name}</div>
                        <div className="text-xs text-muted-foreground">{emp.employee.class}</div>
                      </div>
                    </TableCell>
                    {dayKeys.map(day => (
                      <TableCell key={day} className="p-1">
                        <div className="space-y-1">
                          <Input
                            type="number"
                            step="0.25"
                            min="0"
                            max="16"
                            placeholder="Std"
                            value={emp.days[day].standardHours || ''}
                            onChange={(e) => updateEmployeeDay(emp.employee.id, day, 'standardHours', parseFloat(e.target.value) || 0)}
                            className="text-xs h-7"
                          />
                          <Input
                            type="number"
                            step="0.25"
                            min="0"
                            max="16"
                            placeholder="OT"
                            value={emp.days[day].overtimeHours || ''}
                            onChange={(e) => updateEmployeeDay(emp.employee.id, day, 'overtimeHours', parseFloat(e.target.value) || 0)}
                            className="text-xs h-7"
                          />
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-medium">
                      {calculateEmployeeTotal(emp).toFixed(1)}h
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyRowDown(emp.employee.id)}
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEmployee(emp.employee.id)}
                          className="p-1 h-6 w-6 text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <Button variant="outline">Preview Entries</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Preview Time Entries</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <p className="text-sm text-muted-foreground mb-4">
                  This will create {employees.reduce((total, emp) => {
                    return total + dayKeys.reduce((dayTotal, day) => {
                      const dayData = emp.days[day];
                      return dayTotal + (dayData.standardHours > 0 ? 1 : 0) + (dayData.overtimeHours > 0 ? 1 : 0);
                    }, 0);
                  }, 0)} time entries.
                </p>
                {/* Preview content would go here */}
              </div>
            </DialogContent>
          </Dialog>
          
          <Button onClick={handleSubmit} disabled={employees.length === 0 || stats.errors > 0}>
            Submit All Entries
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {employees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No employees added</h3>
          <p className="text-muted-foreground mb-4">
            Add employees using the controls above to start entering bulk time data.
          </p>
          <Button onClick={() => addEmployeesByClass('Foreman')}>
            <Plus className="w-4 h-4 mr-2" />
            Add All Foremen
          </Button>
        </div>
      )}
    </CardContent>
  );
};
