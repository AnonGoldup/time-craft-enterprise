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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Timer, Hash, AlertTriangle, Plus, Trash2, Calculator, Users, Calendar, CheckCircle2, XCircle, Coffee, Play, Pause, Zap, Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
interface TimeValue {
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}
interface Break {
  id: string;
  startTime: TimeValue;
  endTime: TimeValue;
}
interface TimeCalculation {
  totalMinutes: number;
  standardHours: number;
  overtimeHours: number;
  crossesMidnight: boolean;
  totalBreakMinutes: number;
  dayOneHours?: number;
  dayTwoHours?: number;
  dayOneDate?: string;
  dayTwoDate?: string;
  workMinutes: number;
  breakDetails: {
    startTime: string;
    endTime: string;
    minutes: number;
  }[];
}
interface TimeEntry {
  id: string;
  selectedEmployees: Employee[];
  dateWorked: string;
  projectCode: string;
  extraValue: string;
  costCode: string;
  timeIn: TimeValue;
  timeOut: TimeValue;
  breaks: Break[];
  notes?: string;
}
interface ValidationError {
  field: string;
  message: string;
}
interface EntryErrors {
  [entryId: string]: ValidationError[];
}

// Custom hook for employee selection
const useEmployeeSelection = ({
  employees,
  selectedEmployees,
  onEmployeeChange,
  maxSelected,
  groupByClass
}: {
  employees: Employee[];
  selectedEmployees: Employee[];
  onEmployeeChange: (employees: Employee[]) => void;
  maxSelected?: number;
  groupByClass: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectedEmployeeIds = useMemo(() => new Set(selectedEmployees.map(emp => emp.employeeId)), [selectedEmployees]);
  const filteredEmployees = useMemo(() => {
    if (!searchValue) return employees;
    return employees.filter(employee => employee.fullName.toLowerCase().includes(searchValue.toLowerCase()) || employee.employeeId.toLowerCase().includes(searchValue.toLowerCase()) || employee.email?.toLowerCase().includes(searchValue.toLowerCase()) || employee.class?.toLowerCase().includes(searchValue.toLowerCase()));
  }, [employees, searchValue]);
  const groupedEmployees = useMemo(() => {
    if (!groupByClass) {
      return {
        'All Employees': filteredEmployees
      };
    }
    const grouped = filteredEmployees.reduce((acc, employee) => {
      const group = employee.class || 'Unassigned';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(employee);
      return acc;
    }, {} as Record<string, Employee[]>);
    const sortedGrouped: Record<string, Employee[]> = {};
    Object.keys(grouped).sort().forEach(key => {
      sortedGrouped[key] = grouped[key].sort((a, b) => a.fullName.localeCompare(b.fullName));
    });
    return sortedGrouped;
  }, [filteredEmployees, groupByClass]);
  const handleEmployeeSelect = useCallback((employee: Employee) => {
    const isSelected = selectedEmployeeIds.has(employee.employeeId);
    if (isSelected) {
      const newSelection = selectedEmployees.filter(emp => emp.employeeId !== employee.employeeId);
      onEmployeeChange(newSelection);
    } else {
      if (maxSelected && selectedEmployees.length >= maxSelected) {
        return;
      }
      const newSelection = [...selectedEmployees, employee].sort((a, b) => a.fullName.localeCompare(b.fullName));
      onEmployeeChange(newSelection);
    }
  }, [selectedEmployees, selectedEmployeeIds, onEmployeeChange, maxSelected]);
  const removeEmployee = useCallback((employeeId: string) => {
    const newSelection = selectedEmployees.filter(emp => emp.employeeId !== employeeId);
    onEmployeeChange(newSelection);
  }, [selectedEmployees, onEmployeeChange]);
  const clearAllEmployees = useCallback(() => {
    onEmployeeChange([]);
  }, [onEmployeeChange]);
  const formatSelectedText = useCallback((placeholder: string) => {
    if (selectedEmployees.length === 0) return placeholder;
    if (selectedEmployees.length === 1) return selectedEmployees[0].fullName;
    return `${selectedEmployees.length} employees selected`;
  }, [selectedEmployees]);
  return {
    open,
    setOpen,
    searchValue,
    setSearchValue,
    selectedEmployeeIds,
    groupedEmployees,
    handleEmployeeSelect,
    removeEmployee,
    clearAllEmployees,
    formatSelectedText
  };
};

// EmployeeSelectionTrigger component
const EmployeeSelectionTrigger: React.FC<{
  selectedCount: number;
  displayText: string;
  onClearAll: () => void;
  disabled: boolean;
  className?: string;
}> = ({
  selectedCount,
  displayText,
  onClearAll,
  disabled,
  className
}) => <PopoverTrigger asChild>
    <Button variant="outline" role="combobox" className={cn("w-full justify-between text-left font-normal h-8", !selectedCount && "text-muted-foreground", className)} disabled={disabled}>
      <div className="flex items-center">
        <Users className="mr-2 h-4 w-4" />
        {displayText}
      </div>
      <div className="flex items-center space-x-1">
        {selectedCount > 0 && <Badge variant="secondary" className="mr-1" onClick={e => {
        e.stopPropagation();
        onClearAll();
      }}>
            {selectedCount}
            <X className="ml-1 h-3 w-3" />
          </Badge>}
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
      </div>
    </Button>
  </PopoverTrigger>;

// EmployeeSelectionList component
const EmployeeSelectionList: React.FC<{
  groupedEmployees: Record<string, Employee[]>;
  selectedEmployeeIds: Set<string>;
  onEmployeeSelect: (employee: Employee) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  maxSelected?: number;
  selectedCount: number;
  searchPlaceholder: string;
  emptyText: string;
  groupByClass: boolean;
}> = ({
  groupedEmployees,
  selectedEmployeeIds,
  onEmployeeSelect,
  searchValue,
  onSearchChange,
  maxSelected,
  selectedCount,
  searchPlaceholder,
  emptyText,
  groupByClass
}) => <Command>
    <CommandInput placeholder={searchPlaceholder} value={searchValue} onValueChange={onSearchChange} />
    <CommandEmpty>{emptyText}</CommandEmpty>
    <ScrollArea className="h-64">
      <CommandList>
        {Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => <CommandGroup key={groupName} heading={groupByClass ? groupName : undefined}>
            {groupEmployees.map(employee => {
          const isSelected = selectedEmployeeIds.has(employee.employeeId);
          const isDisabled = maxSelected && selectedCount >= maxSelected && !isSelected;
          return <CommandItem key={employee.employeeId} value={`${employee.fullName} ${employee.employeeId} ${employee.email || ''}`} onSelect={() => onEmployeeSelect(employee)} disabled={isDisabled} className={cn("flex items-center space-x-2 px-2 py-1.5", isDisabled && "opacity-50 cursor-not-allowed")}>
                  <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{employee.fullName}</div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-2">
                      <span>{employee.employeeId}</span>
                      {employee.class && <span className="bg-muted px-1 rounded text-xs">
                          {employee.class}
                        </span>}
                    </div>
                  </div>
                </CommandItem>;
        })}
          </CommandGroup>)}
      </CommandList>
    </ScrollArea>
    {maxSelected && <div className="p-3 border-t text-xs text-muted-foreground text-center">
        {selectedCount}/{maxSelected} employees selected
        {selectedCount >= maxSelected && " (limit reached)"}
      </div>}
  </Command>;

// SelectedEmployeesBadges component
const SelectedEmployeesBadges: React.FC<{
  selectedEmployees: Employee[];
  onRemoveEmployee: (employeeId: string) => void;
  disabled: boolean;
}> = ({
  selectedEmployees,
  onRemoveEmployee,
  disabled
}) => {
  if (selectedEmployees.length === 0) return null;
  return <div className="flex flex-wrap gap-1">
      {selectedEmployees.map(employee => <Badge key={employee.employeeId} variant="outline" className="text-xs px-2 py-1 max-w-[200px]">
          <div className="flex items-center space-x-1 min-w-0">
            <span className="truncate">{employee.fullName}</span>
            <span className="text-muted-foreground">({employee.employeeId})</span>
            <button type="button" className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2" onClick={() => onRemoveEmployee(employee.employeeId)} disabled={disabled}>
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </Badge>)}
    </div>;
};

// MultiEmployeeSelector main component
const MultiEmployeeSelector: React.FC<{
  employees: Employee[];
  selectedEmployees: Employee[];
  onEmployeeChange: (employees: Employee[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxSelected?: number;
  searchPlaceholder?: string;
  emptyText?: string;
  groupByClass?: boolean;
}> = ({
  employees,
  selectedEmployees,
  onEmployeeChange,
  placeholder = "Select employees...",
  className,
  disabled = false,
  maxSelected,
  searchPlaceholder = "Search employees...",
  emptyText = "No employees found.",
  groupByClass = false
}) => {
  const {
    open,
    setOpen,
    searchValue,
    setSearchValue,
    selectedEmployeeIds,
    groupedEmployees,
    handleEmployeeSelect,
    removeEmployee,
    clearAllEmployees,
    formatSelectedText
  } = useEmployeeSelection({
    employees,
    selectedEmployees,
    onEmployeeChange,
    maxSelected,
    groupByClass
  });
  return <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <EmployeeSelectionTrigger selectedCount={selectedEmployees.length} displayText={formatSelectedText(placeholder)} onClearAll={clearAllEmployees} disabled={disabled} className={className} />
        <PopoverContent className="w-full p-0" align="start">
          <EmployeeSelectionList groupedEmployees={groupedEmployees} selectedEmployeeIds={selectedEmployeeIds} onEmployeeSelect={handleEmployeeSelect} searchValue={searchValue} onSearchChange={setSearchValue} maxSelected={maxSelected} selectedCount={selectedEmployees.length} searchPlaceholder={searchPlaceholder} emptyText={emptyText} groupByClass={groupByClass} />
        </PopoverContent>
      </Popover>
      <SelectedEmployeesBadges selectedEmployees={selectedEmployees} onRemoveEmployee={removeEmployee} disabled={disabled} />
    </div>;
};

// Mock data
const mockEmployees: Employee[] = [{
  employeeId: 'JSMITH',
  fullName: 'John Smith',
  email: 'john@company.com',
  class: 'FMAN',
  isActive: true
}, {
  employeeId: 'MJONES',
  fullName: 'Mary Jones',
  email: 'mary@company.com',
  class: 'JMAN',
  isActive: true
}, {
  employeeId: 'BWILSON',
  fullName: 'Bob Wilson',
  email: 'bob@company.com',
  class: 'AP3',
  isActive: true
}, {
  employeeId: 'ADMIN001',
  fullName: 'Admin User',
  email: 'admin@company.com',
  class: 'ADMIN',
  isActive: true
}, {
  employeeId: 'GOLNIC',
  fullName: 'Nicholas Goldup',
  email: 'nick@company.com',
  class: 'ADMIN',
  isActive: true
}, {
  employeeId: 'BARHEN',
  fullName: 'Henry Barendregt',
  email: 'henry@company.com',
  class: 'FMAN',
  isActive: true
}];
const mockProjects: Project[] = [{
  projectId: 1,
  projectCode: '21-0066',
  projectDescription: 'Edmonton EXPO SOLAR IPD',
  isActive: true
}, {
  projectId: 2,
  projectCode: '22-0006',
  projectDescription: 'AltaPro Service Department',
  isActive: true
}, {
  projectId: 3,
  projectCode: '24-0052',
  projectDescription: 'Grant MacEwan School',
  isActive: true
}, {
  projectId: 4,
  projectCode: '21-0029',
  projectDescription: 'Edmonton EXPO IPD',
  isActive: true
}];
const mockExtras: Extra[] = [{
  extraID: 1,
  extraValue: 'Default',
  description: 'Default'
}, {
  extraID: 2,
  extraValue: 'Phase 1',
  description: 'Phase 1 - Initial Setup'
}, {
  extraID: 3,
  extraValue: 'Phase 2',
  description: 'Phase 2 - Implementation'
}, {
  extraID: 4,
  extraValue: 'Phase 3',
  description: 'Phase 3 - Testing'
}];
const mockCostCodes: CostCode[] = [{
  costCodeId: 1,
  costCode: '001-040-043',
  description: 'INDIRECT LAB-Direct Labor'
}, {
  costCodeId: 2,
  costCode: '001-040-054',
  description: 'INDIRECT LAB-Employee Training'
}, {
  costCodeId: 3,
  costCode: '001-500-501',
  description: 'GENEXP-Vehicle Travel'
}, {
  costCodeId: 4,
  costCode: '001-040-055',
  description: 'INDIRECT LAB-Safety Training'
}];

// Time picker component
const TimePicker: React.FC<{
  value: TimeValue;
  onChange: (time: TimeValue) => void;
  placeholder?: string;
}> = ({
  value,
  onChange,
  placeholder = "--"
}) => {
  const hours = Array.from({
    length: 12
  }, (_, i) => {
    const hour = i === 0 ? 12 : i;
    return hour.toString().padStart(2, '0');
  });
  const minutes = Array.from({
    length: 60
  }, (_, i) => {
    return i.toString().padStart(2, '0');
  });
  return <div className="flex items-center gap-1">
      <Select value={value.hour} onValueChange={hour => onChange({
      ...value,
      hour
    })}>
        <SelectTrigger className="w-14 h-8 border-slate-300 dark:border-slate-600 text-xs">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {hours.map(hour => <SelectItem key={hour} value={hour} className="text-xs">{hour}</SelectItem>)}
        </SelectContent>
      </Select>
      
      <span className="text-xs">:</span>
      
      <Select value={value.minute} onValueChange={minute => onChange({
      ...value,
      minute
    })}>
        <SelectTrigger className="w-14 h-8 border-slate-300 dark:border-slate-600 text-xs">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {minutes.map(minute => <SelectItem key={minute} value={minute} className="text-xs">{minute}</SelectItem>)}
        </SelectContent>
      </Select>
      
      <Select value={value.period} onValueChange={(period: 'AM' | 'PM') => onChange({
      ...value,
      period
    })}>
        <SelectTrigger className="w-14 h-8 border-slate-300 dark:border-slate-600 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM" className="text-xs">AM</SelectItem>
          <SelectItem value="PM" className="text-xs">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>;
};

// Utility functions
const timeValueToString = (time: TimeValue): string => {
  if (!time.hour || !time.minute) return '';
  let hour = parseInt(time.hour);
  if (time.period === 'PM' && hour !== 12) hour += 12;
  if (time.period === 'AM' && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, '0')}:${time.minute}`;
};
const parseTimeToMinutes = (timeString: string): number => {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};
const roundToQuarterHour = (hours: number): number => {
  return Math.round(hours * 4) / 4;
};
const formatDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validation functions
const validateTimeValue = (time: TimeValue): boolean => {
  return !!(time.hour && time.minute && time.period);
};
const validateFutureDate = (dateString: string): boolean => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return selectedDate <= today;
};
const validateEntry = (entry: TimeEntry): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (!entry.selectedEmployees || entry.selectedEmployees.length === 0) {
    errors.push({
      field: 'selectedEmployees',
      message: 'At least one employee is required'
    });
  }
  if (!entry.dateWorked) {
    errors.push({
      field: 'dateWorked',
      message: 'Date is required'
    });
  } else if (!validateFutureDate(entry.dateWorked)) {
    errors.push({
      field: 'dateWorked',
      message: 'Cannot enter time for future dates'
    });
  }
  if (!entry.projectCode) {
    errors.push({
      field: 'projectCode',
      message: 'Project is required'
    });
  }
  if (!entry.costCode) {
    errors.push({
      field: 'costCode',
      message: 'Cost code is required'
    });
  }
  if (!validateTimeValue(entry.timeIn)) {
    errors.push({
      field: 'timeIn',
      message: 'Time in is required'
    });
  }
  if (!validateTimeValue(entry.timeOut)) {
    errors.push({
      field: 'timeOut',
      message: 'Time out is required'
    });
  }
  return errors;
};
const calculateTimeInOut = (timeIn: TimeValue, timeOut: TimeValue, breaks: Break[], dateWorked?: string): TimeCalculation => {
  const timeInString = timeValueToString(timeIn);
  const timeOutString = timeValueToString(timeOut);
  if (!timeInString || !timeOutString) {
    return {
      totalMinutes: 0,
      workMinutes: 0,
      standardHours: 0,
      overtimeHours: 0,
      crossesMidnight: false,
      totalBreakMinutes: 0,
      breakDetails: []
    };
  }
  const startMinutes = parseTimeToMinutes(timeInString);
  let endMinutes = parseTimeToMinutes(timeOutString);
  const crossesMidnight = endMinutes <= startMinutes;
  if (crossesMidnight) {
    endMinutes += 24 * 60;
  }
  let totalMinutes = endMinutes - startMinutes;
  let totalBreakMinutes = 0;
  const breakDetails: {
    startTime: string;
    endTime: string;
    minutes: number;
  }[] = [];
  breaks.forEach(breakItem => {
    const breakStartString = timeValueToString(breakItem.startTime);
    const breakEndString = timeValueToString(breakItem.endTime);
    if (breakStartString && breakEndString) {
      const breakStartMinutes = parseTimeToMinutes(breakStartString);
      const breakEndMinutes = parseTimeToMinutes(breakEndString);
      const breakDuration = Math.max(0, breakEndMinutes - breakStartMinutes);
      totalBreakMinutes += breakDuration;
      breakDetails.push({
        startTime: breakStartString,
        endTime: breakEndString,
        minutes: breakDuration
      });
    }
  });
  const workMinutes = Math.max(0, totalMinutes - totalBreakMinutes);
  const totalHours = workMinutes / 60;
  const roundedHours = roundToQuarterHour(totalHours);
  const standardHours = Math.min(roundedHours, 8);
  const overtimeHours = Math.max(0, roundedHours - 8);
  return {
    totalMinutes,
    workMinutes,
    standardHours,
    overtimeHours,
    crossesMidnight,
    totalBreakMinutes,
    breakDetails
  };
};
export default function MultiEmployeeTimeEntryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entries, setEntries] = useState<TimeEntry[]>([{
    id: generateId(),
    selectedEmployees: [mockEmployees[0]],
    // Default to first employee
    dateWorked: formatDateString(new Date()),
    projectCode: '',
    extraValue: 'Default',
    costCode: '',
    timeIn: {
      hour: '07',
      minute: '00',
      period: 'AM'
    },
    timeOut: {
      hour: '03',
      minute: '30',
      period: 'PM'
    },
    breaks: [{
      id: generateId(),
      startTime: {
        hour: '12',
        minute: '00',
        period: 'PM'
      },
      endTime: {
        hour: '12',
        minute: '30',
        period: 'PM'
      }
    }],
    notes: ''
  }]);
  const [errors, setErrors] = useState<EntryErrors>({});
  const [calculations, setCalculations] = useState<Record<string, TimeCalculation>>({});
  useEffect(() => {
    const newCalculations: Record<string, TimeCalculation> = {};
    const newErrors: EntryErrors = {};
    entries.forEach(entry => {
      const entryErrors = validateEntry(entry);
      if (entryErrors.length > 0) {
        newErrors[entry.id] = entryErrors;
      }
      if (validateTimeValue(entry.timeIn) && validateTimeValue(entry.timeOut)) {
        try {
          const calc = calculateTimeInOut(entry.timeIn, entry.timeOut, entry.breaks, entry.dateWorked);
          newCalculations[entry.id] = calc;
        } catch (error) {
          console.error(`Error calculating time for entry ${entry.id}:`, error);
        }
      }
    });
    setErrors(newErrors);
    setCalculations(newCalculations);
  }, [entries]);
  const updateEntry = useCallback((id: string, field: keyof TimeEntry, value: any) => {
    setEntries(prev => prev.map(entry => entry.id === id ? {
      ...entry,
      [field]: value
    } : entry));
  }, []);
  const updateBreak = useCallback((entryId: string, breakId: string, field: 'startTime' | 'endTime', value: TimeValue) => {
    setEntries(prev => prev.map(entry => entry.id === entryId ? {
      ...entry,
      breaks: entry.breaks.map(breakItem => breakItem.id === breakId ? {
        ...breakItem,
        [field]: value
      } : breakItem)
    } : entry));
  }, []);
  const addBreak = useCallback((entryId: string) => {
    setEntries(prev => prev.map(entry => entry.id === entryId ? {
      ...entry,
      breaks: [...entry.breaks, {
        id: generateId(),
        startTime: {
          hour: '',
          minute: '',
          period: 'AM'
        },
        endTime: {
          hour: '',
          minute: '',
          period: 'AM'
        }
      }]
    } : entry));
  }, []);
  const removeBreak = useCallback((entryId: string, breakId: string) => {
    setEntries(prev => prev.map(entry => entry.id === entryId ? {
      ...entry,
      breaks: entry.breaks.filter(breakItem => breakItem.id !== breakId)
    } : entry));
  }, []);
  const addNewEntry = useCallback(() => {
    const lastEntry = entries[entries.length - 1];
    const newEntry: TimeEntry = {
      id: generateId(),
      selectedEmployees: lastEntry?.selectedEmployees || [mockEmployees[0]],
      dateWorked: formatDateString(new Date()),
      projectCode: lastEntry?.projectCode || '',
      extraValue: 'Default',
      costCode: lastEntry?.costCode || '',
      timeIn: {
        hour: '07',
        minute: '00',
        period: 'AM'
      },
      timeOut: {
        hour: '03',
        minute: '30',
        period: 'PM'
      },
      breaks: [{
        id: generateId(),
        startTime: {
          hour: '12',
          minute: '00',
          period: 'PM'
        },
        endTime: {
          hour: '12',
          minute: '30',
          period: 'PM'
        }
      }],
      notes: ''
    };
    setEntries(prev => [...prev, newEntry]);
  }, [entries]);
  const removeEntry = useCallback((id: string) => {
    if (entries.length > 1) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
      setErrors(prev => {
        const newErrors = {
          ...prev
        };
        delete newErrors[id];
        return newErrors;
      });
      setCalculations(prev => {
        const newCalc = {
          ...prev
        };
        delete newCalc[id];
        return newCalc;
      });
    }
  }, [entries.length]);
  const resetForm = useCallback(() => {
    setEntries([{
      id: generateId(),
      selectedEmployees: [mockEmployees[0]],
      dateWorked: formatDateString(new Date()),
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      timeIn: {
        hour: '07',
        minute: '00',
        period: 'AM'
      },
      timeOut: {
        hour: '03',
        minute: '30',
        period: 'PM'
      },
      breaks: [{
        id: generateId(),
        startTime: {
          hour: '12',
          minute: '00',
          period: 'PM'
        },
        endTime: {
          hour: '12',
          minute: '30',
          period: 'PM'
        }
      }],
      notes: ''
    }]);
    setErrors({});
    setCalculations({});
  }, []);
  const handleSubmit = async () => {
    const hasErrors = Object.keys(errors).length > 0;
    const hasValidCalculations = entries.every(entry => calculations[entry.id]);
    if (hasErrors || !hasValidCalculations) {
      alert('Please fix all validation errors before submitting.');
      return;
    }
    setIsSubmitting(true);
    try {
      const timesheetEntries: any[] = [];
      entries.forEach(entry => {
        const calc = calculations[entry.id];
        if (!calc) return;
        const notes = entry.notes || '';
        const breakInfo = calc.breakDetails.length > 0 ? ` [Breaks: ${calc.breakDetails.map(b => `${b.startTime}-${b.endTime}`).join(', ')}]` : '';

        // Create entries for each selected employee
        entry.selectedEmployees.forEach(employee => {
          if (calc.standardHours > 0) {
            timesheetEntries.push({
              employeeId: employee.employeeId,
              employeeName: employee.fullName,
              dateWorked: entry.dateWorked,
              projectCode: entry.projectCode,
              extraValue: entry.extraValue,
              costCode: entry.costCode,
              standardHours: calc.standardHours,
              overtimeHours: 0,
              notes: `${notes}${breakInfo}`,
              timeIn: timeValueToString(entry.timeIn),
              timeOut: timeValueToString(entry.timeOut)
            });
          }
          if (calc.overtimeHours > 0) {
            timesheetEntries.push({
              employeeId: employee.employeeId,
              employeeName: employee.fullName,
              dateWorked: entry.dateWorked,
              projectCode: entry.projectCode,
              extraValue: entry.extraValue,
              costCode: entry.costCode,
              standardHours: 0,
              overtimeHours: calc.overtimeHours,
              notes: `${notes}${breakInfo} [Overtime]`,
              timeIn: timeValueToString(entry.timeIn),
              timeOut: timeValueToString(entry.timeOut)
            });
          }
        });
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Successfully created ${timesheetEntries.length} timesheet entries!\n\nEntries:\n${timesheetEntries.map((e, i) => `${i + 1}. ${e.employeeName} (${e.employeeId}) - ${e.dateWorked} - ${e.standardHours + e.overtimeHours}hrs (Project: ${e.projectCode})`).join('\n')}`);
      resetForm();
    } catch (error) {
      console.error('Error submitting timesheet entries:', error);
      alert('Error submitting timesheet entries. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const totalTimesheetEntries = useMemo(() => {
    return entries.reduce((total, entry) => {
      const calc = calculations[entry.id];
      if (!calc) return total;
      const employeeCount = entry.selectedEmployees.length;
      const entriesPerEmployee = (calc.standardHours > 0 ? 1 : 0) + (calc.overtimeHours > 0 ? 1 : 0);
      return total + employeeCount * entriesPerEmployee;
    }, 0);
  }, [entries, calculations]);
  const hasValidationErrors = Object.keys(errors).length > 0;
  const getFieldError = (entryId: string, fieldName: string) => {
    const entryErrors = errors[entryId] || [];
    return entryErrors.find(err => err.field === fieldName)?.message;
  };
  return <div className="max-w-7xl mx-auto p-4 w-full px-[8px] py-[8px]">
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 pt-1">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Timer className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold">Time In/Out</h3>
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </Badge>
              {totalTimesheetEntries > entries.length && <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  → {totalTimesheetEntries} timesheet entries
                </Badge>}
            </div>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="default" size="sm" onClick={addNewEntry} className="flex items-center space-x-1 h-8 bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
                <Plus className="w-3 h-3" />
                <span>Add Entry</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {entries.map((entry, index) => {
            const calc = calculations[entry.id];
            const entryErrors = errors[entry.id] || [];
            const hasErrors = entryErrors.length > 0;
            return <div key={entry.id} className="border rounded-lg p-3 relative space-y-3">
                  {entries.length > 1 && <div className="absolute top-2 right-2">
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeEntry(entry.id)} className="h-6 w-6 p-0 text-red-600 hover:text-red-700" disabled={isSubmitting}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>}
                  
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">Entry {index + 1}</Badge>
                    {hasErrors && <Badge variant="destructive" className="ml-2 text-xs">
                        <XCircle className="w-3 h-3 mr-1" />
                        Has Errors
                      </Badge>}
                    {calc && !hasErrors && <Badge variant="secondary" className="ml-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Calculated
                      </Badge>}
                    {entry.selectedEmployees.length > 0 && <Badge variant="outline" className="ml-2 text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {entry.selectedEmployees.length} employees
                      </Badge>}
                  </div>

                  {/* Employee & Date Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Employees *</Label>
                      <MultiEmployeeSelector employees={mockEmployees.filter(emp => emp.isActive !== false)} selectedEmployees={entry.selectedEmployees} onEmployeeChange={employees => updateEntry(entry.id, 'selectedEmployees', employees)} placeholder="Select employees..." groupByClass={true} searchPlaceholder="Search by name, ID, or job class..." disabled={isSubmitting} />
                      {getFieldError(entry.id, 'selectedEmployees') && <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'selectedEmployees')}</p>}
                    </div>
                    
                    <div>
                      <Label className="text-xs">Date Worked *</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
                        <Input type="date" className="pl-7 h-8 text-xs" value={entry.dateWorked} onChange={e => updateEntry(entry.id, 'dateWorked', e.target.value)} max={formatDateString(new Date())} />
                      </div>
                      {getFieldError(entry.id, 'dateWorked') && <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'dateWorked')}</p>}
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Project *</Label>
                        <Select value={entry.projectCode} onValueChange={value => updateEntry(entry.id, 'projectCode', value)}>
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select Project" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockProjects.filter(project => project.isActive).map(project => <SelectItem key={project.projectCode} value={project.projectCode}>
                                <div className="flex flex-col">
                                  <span className="font-medium text-xs">{project.projectCode}</span>
                                  <span className="text-xs text-gray-500">{project.projectDescription}</span>
                                </div>
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        {getFieldError(entry.id, 'projectCode') && <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'projectCode')}</p>}
                      </div>
                      
                      <div>
                        <Label className="text-xs">Extra</Label>
                        <Select value={entry.extraValue} onValueChange={value => updateEntry(entry.id, 'extraValue', value)}>
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {mockExtras.map(extra => <SelectItem key={extra.extraID} value={extra.extraValue}>
                                <span className="text-xs">{extra.extraValue} - {extra.description}</span>
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label className="flex items-center space-x-1 text-xs">
                        <Hash className="w-3 h-3" />
                        <span>Cost Code *</span>
                      </Label>
                      <Select value={entry.costCode} onValueChange={value => updateEntry(entry.id, 'costCode', value)}>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select Cost Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCostCodes.map(code => <SelectItem key={code.costCodeId} value={code.costCode}>
                              <div className="flex flex-col">
                                <span className="font-medium text-xs">{code.costCode}</span>
                                <span className="text-xs text-gray-500">{code.description}</span>
                              </div>
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                      {getFieldError(entry.id, 'costCode') && <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'costCode')}</p>}
                    </div>
                  </div>

                  {/* Quick Time Presets */}
                  <div className="flex items-center gap-2 py-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[80px] flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      Quick Times:
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                    updateEntry(entry.id, 'timeIn', {
                      hour: '06',
                      minute: '00',
                      period: 'AM'
                    });
                    updateEntry(entry.id, 'timeOut', {
                      hour: '02',
                      minute: '30',
                      period: 'PM'
                    });
                  }} className="h-6 px-2 text-xs" disabled={isSubmitting}>
                        6AM - 2:30PM
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                    updateEntry(entry.id, 'timeIn', {
                      hour: '07',
                      minute: '00',
                      period: 'AM'
                    });
                    updateEntry(entry.id, 'timeOut', {
                      hour: '03',
                      minute: '30',
                      period: 'PM'
                    });
                  }} className="h-6 px-2 text-xs" disabled={isSubmitting}>
                        7AM - 3:30PM
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                    updateEntry(entry.id, 'timeIn', {
                      hour: '08',
                      minute: '00',
                      period: 'AM'
                    });
                    updateEntry(entry.id, 'timeOut', {
                      hour: '04',
                      minute: '30',
                      period: 'PM'
                    });
                  }} className="h-6 px-2 text-xs" disabled={isSubmitting}>
                        8AM - 4:30PM
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => {
                    updateEntry(entry.id, 'timeIn', {
                      hour: '09',
                      minute: '00',
                      period: 'AM'
                    });
                    updateEntry(entry.id, 'timeOut', {
                      hour: '05',
                      minute: '30',
                      period: 'PM'
                    });
                  }} className="h-6 px-2 text-xs" disabled={isSubmitting}>
                        9AM - 5:30PM
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 flex-wrap p-1 px-0 py-0">
                    {/* Start and End Times in horizontal layout */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[35px] flex items-center">
                          <Play className="w-3 h-3 mr-1 text-green-600" />
                          Start:
                        </span>
                        <TimePicker value={entry.timeIn} onChange={time => updateEntry(entry.id, 'timeIn', time)} />
                      </div>
                      
                      <span className="text-slate-400">-</span>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[30px] flex items-center">
                          <Pause className="w-3 h-3 mr-1 text-red-600" />
                          End:
                        </span>
                        <TimePicker value={entry.timeOut} onChange={time => updateEntry(entry.id, 'timeOut', time)} />
                      </div>
                    </div>

                    {/* Breaks section */}
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-2">
                        {entry.breaks.map((breakItem, breakIndex) => <div key={breakItem.id} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[35px] flex items-center">
                                <Coffee className="w-3 h-3 mr-1 text-amber-600" />
                                Break:
                              </span>
                              <TimePicker value={breakItem.startTime} onChange={time => updateBreak(entry.id, breakItem.id, 'startTime', time)} />
                            </div>
                            
                            <span className="text-slate-400">-</span>
                            
                            <TimePicker value={breakItem.endTime} onChange={time => updateBreak(entry.id, breakItem.id, 'endTime', time)} />
                            
                            {breakIndex === 0 && <Button type="button" variant="outline" size="sm" onClick={() => addBreak(entry.id)} className="h-6 w-6 p-0 border-red-300 dark:border-red-600 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" title="Add another break" disabled={isSubmitting}>
                                <Plus className="h-3 w-3 text-red-600" />
                              </Button>}
                            
                            {breakIndex > 0 && <Button type="button" variant="outline" size="sm" onClick={() => removeBreak(entry.id, breakItem.id)} className="h-6 w-6 p-0 border-slate-300 dark:border-slate-600 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" title="Remove break" disabled={isSubmitting}>
                                <Trash2 className="h-3 w-3" />
                              </Button>}
                          </div>)}
                      </div>
                    </div>
                  </div>

                  {/* Cross Midnight Warning */}
                  {calc?.crossesMidnight && <Alert className="border-amber-200 bg-amber-50">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-semibold text-amber-900">
                            Cross-Midnight Shift Detected
                          </div>
                          <p className="text-amber-800 text-sm">
                            This shift will be split into separate timesheet entries.
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>}

                  {/* Calculated Hours */}
                  {calc && <div className="bg-muted p-2 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calculator className="w-3 h-3" />
                        <span className="text-xs font-medium">Calculated Hours</span>
                        {entry.selectedEmployees.length > 1 && <Badge variant="outline" className="text-xs">
                            × {entry.selectedEmployees.length} employees
                          </Badge>}
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Standard</div>
                          <div className="text-sm font-bold text-blue-600">{calc.standardHours.toFixed(2)}</div>
                        </div>
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overtime</div>
                          <div className="text-sm font-bold text-orange-600">{calc.overtimeHours.toFixed(2)}</div>
                        </div>
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</div>
                          <div className="text-sm font-bold text-green-600">
                            {(calc.standardHours + calc.overtimeHours).toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Breaks</div>
                          <div className="text-xs font-bold text-purple-600">
                            {calc.totalBreakMinutes}m
                          </div>
                        </div>
                      </div>
                      
                      {calc.breakDetails.length > 0 && <div className="mt-1 text-center text-xs text-muted-foreground">
                          Breaks: {calc.breakDetails.map(b => `${b.startTime}-${b.endTime} (${b.minutes}m)`).join(', ')}
                        </div>}
                    </div>}

                  {/* Notes */}
                  <div>
                    <Label className="text-xs">Notes</Label>
                    <Textarea rows={2} placeholder="Enter any additional notes..." value={entry.notes || ''} onChange={e => updateEntry(entry.id, 'notes', e.target.value)} className="text-xs" />
                  </div>
                </div>;
          })}

            {/* Submit Button */}
            <div className="flex justify-end space-x-2 pt-1">
              <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting} size="sm">
                Reset Form
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting || totalTimesheetEntries === 0 || hasValidationErrors} className="min-w-[120px]" size="sm">
                {isSubmitting ? <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </div> : `Submit ${totalTimesheetEntries} ${totalTimesheetEntries === 1 ? 'Entry' : 'Entries'}`}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
}