import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Users, 
  Plus, 
  Trash2,
  Calculator,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Download,
  Upload,
  Calendar,
  Building,
  Hash,
  Filter,
  UserPlus,
  UserMinus,
  Clock,
  Save,
  Eye,
  X,
  Zap,
  BarChart3
} from 'lucide-react';

// Types
interface Employee {
  employeeId: string;
  fullName: string;
  email?: string;
  class?: string;
  isActive?: boolean;
}

interface Project {
  projectId: number;
  projectCode: string;
  projectDescription: string;
  isActive: boolean;
}

interface CostCode {
  costCodeId: number;
  costCode: string;
  description: string;
}

interface Extra {
  extraID: number;
  extraValue: string;
  description: string;
}

interface BulkEntry {
  employeeId: string;
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  hours: number;
  payType: 'standard' | 'overtime';
  notes?: string;
}

interface DayHours {
  [employeeId: string]: {
    [day: string]: {
      regular: number;
      overtime: number;
    };
  };
}

interface ValidationError {
  employeeId: string;
  day: string;
  message: string;
}

// Mock data
const mockEmployees: Employee[] = [
  { employeeId: 'JSMITH', fullName: 'John Smith', email: 'john@company.com', class: 'FMAN', isActive: true },
  { employeeId: 'MJONES', fullName: 'Mary Jones', email: 'mary@company.com', class: 'JMAN', isActive: true },
  { employeeId: 'BWILSON', fullName: 'Bob Wilson', email: 'bob@company.com', class: 'AP3', isActive: true },
  { employeeId: 'SGREEN', fullName: 'Sarah Green', email: 'sarah@company.com', class: 'JMAN', isActive: true },
  { employeeId: 'TBROWN', fullName: 'Tom Brown', email: 'tom@company.com', class: 'LAB', isActive: true },
  { employeeId: 'LWHITE', fullName: 'Lisa White', email: 'lisa@company.com', class: 'FMAN', isActive: true },
  { employeeId: 'DBLACK', fullName: 'David Black', email: 'david@company.com', class: 'AP2', isActive: true },
  { employeeId: 'JGRAY', fullName: 'Jessica Gray', email: 'jessica@company.com', class: 'JMAN', isActive: true },
  { employeeId: 'MBLUE', fullName: 'Mike Blue', email: 'mike@company.com', class: 'LAB', isActive: true },
  { employeeId: 'ARED', fullName: 'Anna Red', email: 'anna@company.com', class: 'AP1', isActive: true },
];

const mockProjects: Project[] = [
  { projectId: 1, projectCode: '21-0066', projectDescription: 'Edmonton EXPO SOLAR IPD', isActive: true },
  { projectId: 2, projectCode: '22-0006', projectDescription: 'AltaPro Service Department', isActive: true },
  { projectId: 3, projectCode: '24-0052', projectDescription: 'Grant MacEwan School', isActive: true },
  { projectId: 4, projectCode: '21-0029', projectDescription: 'Edmonton EXPO IPD', isActive: true },
];

const mockExtras: Extra[] = [
  { extraID: 1, extraValue: 'Default', description: 'Default' },
  { extraID: 2, extraValue: 'Phase 1', description: 'Phase 1 - Initial Setup' },
  { extraID: 3, extraValue: 'Phase 2', description: 'Phase 2 - Implementation' },
  { extraID: 4, extraValue: 'Phase 3', description: 'Phase 3 - Testing' },
];

const mockCostCodes: CostCode[] = [
  { costCodeId: 1, costCode: '001-040-043', description: 'INDIRECT LAB-Direct Labor' },
  { costCodeId: 2, costCode: '001-040-054', description: 'INDIRECT LAB-Employee Training' },
  { costCodeId: 3, costCode: '001-500-501', description: 'GENEXP-Vehicle Travel' },
  { costCodeId: 4, costCode: '001-040-055', description: 'INDIRECT LAB-Safety Training' },
];

// Utility functions
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const getCurrentWeekDates = (): Date[] => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDay);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

const validateHours = (hours: number): string | null => {
  if (hours < 0) return 'Hours cannot be negative';
  if (hours > 24) return 'Cannot exceed 24 hours per day';
  if (hours % 0.25 !== 0) return 'Must be in quarter-hour increments';
  return null;
};

// Quick Templates
const quickTemplates = {
  standard: {
    name: 'Standard Week',
    description: 'Mon-Fri, 8hrs/day',
    hours: { 
      mon: { regular: 8, overtime: 0 }, 
      tue: { regular: 8, overtime: 0 }, 
      wed: { regular: 8, overtime: 0 }, 
      thu: { regular: 8, overtime: 0 }, 
      fri: { regular: 8, overtime: 0 } 
    }
  },
  overtime: {
    name: 'Overtime Week',
    description: 'Mon-Fri, 8hrs + 2hrs OT',
    hours: { 
      mon: { regular: 8, overtime: 2 }, 
      tue: { regular: 8, overtime: 2 }, 
      wed: { regular: 8, overtime: 2 }, 
      thu: { regular: 8, overtime: 2 }, 
      fri: { regular: 8, overtime: 2 } 
    }
  },
  service: {
    name: 'Service Calls',
    description: 'Variable hours',
    hours: { 
      mon: { regular: 6, overtime: 0 }, 
      tue: { regular: 7, overtime: 1 }, 
      wed: { regular: 8, overtime: 0 }, 
      thu: { regular: 8, overtime: 1 }, 
      fri: { regular: 8, overtime: 0 } 
    }
  }
};

export default function BulkTimesheetEntry() {
  // State
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());
  const [activeEmployees, setActiveEmployees] = useState<Employee[]>(mockEmployees.slice(0, 5));
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>(mockEmployees.slice(5));
  const [dayHours, setDayHours] = useState<DayHours>({});
  const [projectCode, setProjectCode] = useState('');
  const [extraValue, setExtraValue] = useState('Default');
  const [costCode, setCostCode] = useState('');
  const [bulkNotes, setBulkNotes] = useState('');
  const [classFilter, setClassFilter] = useState('all'); // Changed from empty string to 'all'
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const weekDates = getCurrentWeekDates();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  // Initialize hours for new employees
  useEffect(() => {
    const newDayHours = { ...dayHours };
    activeEmployees.forEach(emp => {
      if (!newDayHours[emp.employeeId]) {
        newDayHours[emp.employeeId] = {};
        dayKeys.forEach(day => {
          newDayHours[emp.employeeId][day] = {
            regular: 0,
            overtime: 0
          };
        });
      }
    });
    setDayHours(newDayHours);
  }, [activeEmployees]);

  // Calculate statistics
  const statistics = useMemo(() => {
    let totalHours = 0;
    let standardHours = 0;
    let overtimeHours = 0;
    let validEntries = 0;
    let employeesWithHours = 0;

    activeEmployees.forEach(emp => {
      let empTotal = 0;
      let hasEntries = false;

      dayKeys.forEach(day => {
        const dayData = dayHours[emp.employeeId]?.[day] || { regular: 0, overtime: 0 };
        const regularHours = dayData.regular || 0;
        const otHours = dayData.overtime || 0;
        
        if (regularHours > 0 || otHours > 0) {
          hasEntries = true;
          empTotal += regularHours + otHours;
          
          if (regularHours > 0) validEntries++;
          if (otHours > 0) validEntries++;
          
          standardHours += regularHours;
          overtimeHours += otHours;
        }
      });

      if (hasEntries) {
        employeesWithHours++;
      }
      totalHours += empTotal;
    });

    return {
      totalHours,
      standardHours,
      overtimeHours,
      validEntries,
      employeesWithHours
    };
  }, [dayHours, activeEmployees, dayKeys]);

  // Update hours for an employee/day
  const updateHours = useCallback((employeeId: string, day: string, type: 'regular' | 'overtime', value: string) => {
    const hours = parseFloat(value) || 0;
    const roundedHours = Math.round(hours * 4) / 4; // Round to quarter hours

    setDayHours(prev => ({
      ...prev,
      [employeeId]: {
        ...prev[employeeId],
        [day]: {
          ...prev[employeeId]?.[day],
          [type]: roundedHours
        }
      }
    }));
  }, []);

  // Add employee to bulk entry
  const addEmployee = useCallback((employeeId: string) => {
    const employee = availableEmployees.find(emp => emp.employeeId === employeeId);
    if (!employee) return;

    // Filter by class if selected (excluding 'all')
    if (classFilter !== 'all' && employee.class !== classFilter) return;

    setActiveEmployees(prev => [...prev, employee].sort((a, b) => a.fullName.localeCompare(b.fullName)));
    setAvailableEmployees(prev => prev.filter(emp => emp.employeeId !== employeeId));
  }, [availableEmployees, classFilter]);

  // Remove employee from bulk entry
  const removeEmployee = useCallback((employeeId: string) => {
    const employee = activeEmployees.find(emp => emp.employeeId === employeeId);
    if (!employee) return;

    setActiveEmployees(prev => prev.filter(emp => emp.employeeId !== employeeId));
    setAvailableEmployees(prev => [...prev, employee].sort((a, b) => a.fullName.localeCompare(b.fullName)));
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      newSet.delete(employeeId);
      return newSet;
    });

    // Clear hours data
    setDayHours(prev => {
      const newHours = { ...prev };
      delete newHours[employeeId];
      return newHours;
    });
  }, [activeEmployees]);

  // Toggle employee selection
  const toggleEmployeeSelection = useCallback((employeeId: string) => {
    setSelectedEmployees(prev => {
      const newSet = new Set(prev);
      if (newSet.has(employeeId)) {
        newSet.delete(employeeId);
      } else {
        newSet.add(employeeId);
      }
      return newSet;
    });
  }, []);

  // Select all employees
  const selectAllEmployees = useCallback(() => {
    setSelectedEmployees(new Set(activeEmployees.map(emp => emp.employeeId)));
  }, [activeEmployees]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedEmployees(new Set());
  }, []);

  // Apply quick template
  const applyQuickTemplate = useCallback((templateKey: keyof typeof quickTemplates) => {
    if (selectedEmployees.size === 0) {
      alert('Please select employees first');
      return;
    }

    const template = quickTemplates[templateKey];
    const newDayHours = { ...dayHours };

    selectedEmployees.forEach(employeeId => {
      if (!newDayHours[employeeId]) {
        newDayHours[employeeId] = {};
        dayKeys.forEach(day => {
          newDayHours[employeeId][day] = { regular: 0, overtime: 0 };
        });
      }
      
      Object.entries(template.hours).forEach(([day, hours]) => {
        newDayHours[employeeId][day] = { ...hours };
      });
    });

    setDayHours(newDayHours);
  }, [selectedEmployees, dayHours, dayKeys]);

  // Copy row to selected employees
  const copyRowToSelected = useCallback((sourceEmployeeId: string) => {
    if (selectedEmployees.size === 0) {
      alert('Please select target employees first');
      return;
    }

    const sourceHours = dayHours[sourceEmployeeId] || {};
    const newDayHours = { ...dayHours };

    selectedEmployees.forEach(employeeId => {
      if (employeeId !== sourceEmployeeId) {
        newDayHours[employeeId] = { ...sourceHours };
      }
    });

    setDayHours(newDayHours);
  }, [selectedEmployees, dayHours]);

  // Validate all entries
  const validateEntries = useCallback(() => {
    const errors: ValidationError[] = [];

    if (!projectCode) {
      errors.push({ employeeId: 'ALL', day: 'project', message: 'Project is required' });
    }

    if (!costCode) {
      errors.push({ employeeId: 'ALL', day: 'costCode', message: 'Cost code is required' });
    }

    activeEmployees.forEach(emp => {
      dayKeys.forEach(day => {
        const dayData = dayHours[emp.employeeId]?.[day] || { regular: 0, overtime: 0 };
        const regularHours = dayData.regular || 0;
        const otHours = dayData.overtime || 0;
        const totalDayHours = regularHours + otHours;
        
        if (regularHours > 0) {
          const error = validateHours(regularHours);
          if (error) {
            errors.push({
              employeeId: emp.employeeId,
              day,
              message: `${emp.fullName} - ${dayNames[dayKeys.indexOf(day)]} Regular: ${error}`
            });
          }
        }
        
        if (otHours > 0) {
          const error = validateHours(otHours);
          if (error) {
            errors.push({
              employeeId: emp.employeeId,
              day,
              message: `${emp.fullName} - ${dayNames[dayKeys.indexOf(day)]} OT: ${error}`
            });
          }
        }
        
        if (totalDayHours > 24) {
          errors.push({
            employeeId: emp.employeeId,
            day,
            message: `${emp.fullName} - ${dayNames[dayKeys.indexOf(day)]}: Total hours cannot exceed 24 per day`
          });
        }
      });
    });

    setValidationErrors(errors);
    return errors.length === 0;
  }, [activeEmployees, dayHours, projectCode, costCode, dayKeys, dayNames]);

  // Collect all entries for submission
  const collectEntries = useCallback((): BulkEntry[] => {
    const entries: BulkEntry[] = [];

    activeEmployees.forEach(emp => {
      dayKeys.forEach((day, index) => {
        const dayData = dayHours[emp.employeeId]?.[day] || { regular: 0, overtime: 0 };
        const regularHours = dayData.regular || 0;
        const otHours = dayData.overtime || 0;
        
        if (regularHours > 0 || otHours > 0) {
          const date = weekDates[index];
          
          // Standard hours entry
          if (regularHours > 0) {
            entries.push({
              employeeId: emp.employeeId,
              dateWorked: formatDate(date),
              projectCode,
              extraValue,
              costCode,
              hours: regularHours,
              payType: 'standard',
              notes: bulkNotes
            });
          }

          // Overtime entry
          if (otHours > 0) {
            entries.push({
              employeeId: emp.employeeId,
              dateWorked: formatDate(date),
              projectCode,
              extraValue,
              costCode,
              hours: otHours,
              payType: 'overtime',
              notes: bulkNotes
            });
          }
        }
      });
    });

    return entries;
  }, [activeEmployees, dayHours, weekDates, projectCode, extraValue, costCode, bulkNotes, dayKeys]);

  // Submit entries
  const submitEntries = useCallback(async () => {
    if (!validateEntries()) {
      alert('Please fix validation errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const entries = collectEntries();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully created ${entries.length} timesheet entries!`);
      
      // Clear form
      setDayHours({});
      setSelectedEmployees(new Set());
      setBulkNotes('');
      setValidationErrors([]);
      
    } catch (error) {
      console.error('Error submitting entries:', error);
      alert('Error submitting entries. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowPreview(false);
    }
  }, [validateEntries, collectEntries]);

  // Filter available employees by class
  const filteredAvailableEmployees = useMemo(() => {
    return availableEmployees.filter(emp => 
      classFilter === 'all' || emp.class === classFilter
    );
  }, [availableEmployees, classFilter]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Control Panel */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">Bulk Entry</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">
                    <Users className="w-3 h-3 mr-1" />
                    {selectedEmployees.size} selected
                  </Badge>
                  <Badge variant="outline">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    {statistics.validEntries} entries
                  </Badge>
                </div>
              </div>
              
              {/* Project Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label className="flex items-center space-x-1 text-sm mb-2">
                    <Building className="w-4 h-4" />
                    <span>Project *</span>
                  </Label>
                  <Select value={projectCode} onValueChange={setProjectCode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Project" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects.map(project => (
                        <SelectItem key={project.projectCode} value={project.projectCode}>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{project.projectCode}</span>
                            <span className="text-xs text-gray-500">{project.projectDescription}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm mb-2">Extra</Label>
                  <Select value={extraValue} onValueChange={setExtraValue}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockExtras.map(extra => (
                        <SelectItem key={extra.extraID} value={extra.extraValue}>
                          {extra.extraValue} - {extra.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="flex items-center space-x-1 text-sm mb-2">
                    <Hash className="w-4 h-4" />
                    <span>Cost Code *</span>
                  </Label>
                  <Select value={costCode} onValueChange={setCostCode}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Cost Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCostCodes.map(code => (
                        <SelectItem key={code.costCodeId} value={code.costCode}>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{code.costCode}</span>
                            <span className="text-xs text-gray-500">{code.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Employee Management */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="flex items-center space-x-1 text-sm mb-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Add Employees</span>
                  </Label>
                  <div className="flex space-x-2">
                    <Select value="placeholder" onValueChange={addEmployee}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select Employee to Add" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredAvailableEmployees.map(emp => (
                          <SelectItem key={emp.employeeId} value={emp.employeeId}>
                            {emp.fullName} - {emp.class}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label className="flex items-center space-x-1 text-sm mb-2">
                    <Filter className="w-4 h-4" />
                    <span>Filter by Class</span>
                  </Label>
                  <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Classes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="FMAN">Foremen</SelectItem>
                      <SelectItem value="JMAN">Journeymen</SelectItem>
                      <SelectItem value="AP1">Apprentice 1st Year</SelectItem>
                      <SelectItem value="AP2">Apprentice 2nd Year</SelectItem>
                      <SelectItem value="AP3">Apprentice 3rd Year</SelectItem>
                      <SelectItem value="LAB">Laborers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-4">
                <Button onClick={selectAllEmployees} variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-1" />
                  Select All
                </Button>
                <Button onClick={clearSelection} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-1" />
                  Clear Selection
                </Button>
                {Object.entries(quickTemplates).map(([key, template]) => (
                  <Button 
                    key={key}
                    onClick={() => applyQuickTemplate(key as keyof typeof quickTemplates)} 
                    variant="outline" 
                    size="sm"
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    {template.name}
                  </Button>
                ))}
              </div>

              {/* Notes */}
              <div>
                <Label className="text-sm mb-2">Bulk Notes (Applied to all entries)</Label>
                <Textarea
                  value={bulkNotes}
                  onChange={(e) => setBulkNotes(e.target.value)}
                  placeholder="Enter notes to apply to all selected entries..."
                  rows={2}
                  className="resize-none"
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
                      {statistics.validEntries} valid entries • {statistics.totalHours.toFixed(2)} total hours
                    </span>
                    <Button onClick={validateEntries} variant="outline" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Validate
                    </Button>
                  </div>
                </div>
              </div>

              {/* Grid Header */}
              <div className="p-4 border-b bg-gray-50 sticky top-0 z-10">
                <div className="grid grid-cols-12 gap-2 items-center text-sm font-medium text-gray-700">
                  <div className="col-span-3 flex items-center space-x-2">
                    <Checkbox
                      checked={selectedEmployees.size === activeEmployees.length && activeEmployees.length > 0}
                      onCheckedChange={(checked) => checked ? selectAllEmployees() : clearSelection()}
                    />
                    <span>Employee ({activeEmployees.length})</span>
                  </div>
                  {dayNames.map(day => (
                    <div key={day} className="text-center">
                      <div>{day}</div>
                      <div className="text-xs text-gray-500">Reg/OT</div>
                    </div>
                  ))}
                  <div className="text-center">
                    <div>Total</div>
                    <div className="text-xs text-gray-500">Reg/OT</div>
                  </div>
                  <div className="text-center">Actions</div>
                </div>
                
                {/* Legend */}
                <div className="mt-2 flex items-center justify-center space-x-6 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 border border-gray-300 bg-white rounded"></div>
                    <span>Regular Hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 border border-orange-300 bg-orange-50/30 rounded"></div>
                    <span>Overtime Hours</span>
                  </div>
                </div>
              </div>

              {/* Employee Rows */}
              <div className="max-h-96 overflow-y-auto">
                {activeEmployees.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Employees Added</h3>
                    <p className="text-sm">Add employees using the dropdown above to start bulk entry</p>
                  </div>
                ) : (
                  activeEmployees.map(emp => {
                    const empHours = dayHours[emp.employeeId] || {};
                    const totalRegular = dayKeys.reduce((sum, day) => sum + (empHours[day]?.regular || 0), 0);
                    const totalOvertime = dayKeys.reduce((sum, day) => sum + (empHours[day]?.overtime || 0), 0);
                    const grandTotal = totalRegular + totalOvertime;
                    const isSelected = selectedEmployees.has(emp.employeeId);

                    return (
                      <div
                        key={emp.employeeId}
                        className={cn(
                          "border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors",
                          isSelected && "bg-blue-50 border-blue-200"
                        )}
                      >
                        <div className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-3 flex items-center space-x-2">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleEmployeeSelection(emp.employeeId)}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-gray-900 truncate">{emp.fullName}</div>
                              <div className="text-xs text-gray-500">{emp.employeeId} - {emp.class}</div>
                            </div>
                          </div>
                          
                          {dayKeys.map(day => {
                            const dayData = empHours[day] || { regular: 0, overtime: 0 };
                            const totalDayHours = (dayData.regular || 0) + (dayData.overtime || 0);
                            
                            return (
                              <div key={day} className="text-center space-y-1">
                                {/* Regular Hours Input */}
                                <Input
                                  type="number"
                                  step="0.25"
                                  min="0"
                                  max="24"
                                  placeholder="0"
                                  value={dayData.regular || ''}
                                  onChange={(e) => updateHours(emp.employeeId, day, 'regular', e.target.value)}
                                  className={cn(
                                    "w-16 h-6 text-xs text-center border-gray-300",
                                    totalDayHours > 16 && "border-red-500 bg-red-50",
                                    totalDayHours > 12 && totalDayHours <= 16 && "border-yellow-500 bg-yellow-50"
                                  )}
                                  title="Regular Hours"
                                />
                                {/* Overtime Hours Input */}
                                <Input
                                  type="number"
                                  step="0.25"
                                  min="0"
                                  max="24"
                                  placeholder="0"
                                  value={dayData.overtime || ''}
                                  onChange={(e) => updateHours(emp.employeeId, day, 'overtime', e.target.value)}
                                  className={cn(
                                    "w-16 h-6 text-xs text-center border-orange-300 bg-orange-50/30",
                                    totalDayHours > 16 && "border-red-500 bg-red-50"
                                  )}
                                  title="Overtime Hours"
                                />
                              </div>
                            );
                          })}
                          
                          <div className="text-center">
                            <div className={cn(
                              "font-medium text-xs",
                              grandTotal > 48 ? "text-red-600" : grandTotal > 40 ? "text-yellow-600" : "text-gray-900"
                            )}>
                              <div className="text-blue-600">{totalRegular.toFixed(2)}</div>
                              <div className="text-orange-600">{totalOvertime.toFixed(2)}</div>
                              <div className="border-t pt-1 font-semibold">{grandTotal.toFixed(2)}</div>
                            </div>
                          </div>
                          
                          <div className="text-center flex justify-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyRowToSelected(emp.employeeId)}
                              className="h-6 w-6 p-0"
                              title="Copy to selected employees"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEmployee(emp.employeeId)}
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                              title="Remove employee"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>
                <div className="font-semibold mb-2">Validation Errors ({validationErrors.length})</div>
                <ul className="text-sm space-y-1">
                  {validationErrors.slice(0, 5).map((error, index) => (
                    <li key={index}>• {error.message}</li>
                  ))}
                  {validationErrors.length > 5 && (
                    <li>• ... and {validationErrors.length - 5} more errors</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
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
                  <Button
                    onClick={() => setShowPreview(true)}
                    variant="outline"
                    disabled={statistics.validEntries === 0}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    onClick={submitEntries}
                    disabled={isSubmitting || statistics.validEntries === 0 || validationErrors.length > 0}
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        <span>Creating...</span>
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-1" />
                        Submit {statistics.validEntries} Entries
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Statistics */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Employees</span>
                  <span className="font-semibold">{statistics.employeesWithHours}/{activeEmployees.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Hours</span>
                  <span className="font-semibold">{statistics.totalHours.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Standard Hours</span>
                  <span className="font-semibold text-blue-600">{statistics.standardHours.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Overtime Hours</span>
                  <span className="font-semibold text-orange-600">{statistics.overtimeHours.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Valid Entries</span>
                    <span className="text-green-600">{statistics.validEntries}</span>
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
                {Object.entries(quickTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => applyQuickTemplate(key as keyof typeof quickTemplates)}
                    disabled={selectedEmployees.size === 0}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500">{template.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Employees */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Available Employees</h3>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {filteredAvailableEmployees.map(emp => (
                    <div key={emp.employeeId} className="flex items-center justify-between text-sm">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{emp.fullName}</div>
                        <div className="text-xs text-gray-500">{emp.employeeId} - {emp.class}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addEmployee(emp.employeeId)}
                        className="h-6 w-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  {filteredAvailableEmployees.length === 0 && (
                    <div className="text-center text-gray-500 text-sm py-4">
                      No employees available
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Preview Bulk Entries</h2>
                <Button variant="ghost" onClick={() => setShowPreview(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="space-y-4">
                <div className="text-sm text-gray-600 mb-4">
                  {collectEntries().length} entries will be created
                </div>
                <ScrollArea className="h-64">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
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
                        <tr key={index} className="border-t border-gray-100">
                          <td className="px-2 py-1">{activeEmployees.find(emp => emp.employeeId === entry.employeeId)?.fullName}</td>
                          <td className="px-2 py-1">{entry.dateWorked}</td>
                          <td className="px-2 py-1">{entry.projectCode}</td>
                          <td className="px-2 py-1">{entry.hours.toFixed(2)}</td>
                          <td className="px-2 py-1">
                            <Badge variant={entry.payType === 'standard' ? 'default' : 'secondary'}>
                              {entry.payType === 'standard' ? 'Regular' : 'Overtime'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Cancel
                </Button>
                <Button onClick={submitEntries}>
                  Confirm Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}