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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Timer, 
  Hash, 
  AlertTriangle, 
  Plus, 
  Trash2,
  Calculator,
  Users,
  Calendar,
  CheckCircle2,
  XCircle,
  Zap,
  Check,
  ChevronsUpDown,
  X,
  Search,
  Clock
} from 'lucide-react';

// Utility function to merge classNames
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Date formatting utilities
const formatDate = (date: Date, format: string): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthName = monthNames[date.getMonth()];

  switch (format) {
    case 'yyyy-MM-dd':
      return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    case 'MMM dd, yyyy':
      return `${monthName} ${day.toString().padStart(2, '0')}, ${year}`;
    case 'PPP':
      return `${monthName} ${day}, ${year}`;
    default:
      return date.toDateString();
  }
};

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

interface StandardHoursEntry {
  id: string;
  selectedEmployees: Employee[];
  selectedDates: Date[];
  projectCode: string;
  extraValue: string;
  costCode: string;
  standardHours: number;
  overtimeHours: number;
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
  groupByClass,
}: {
  employees: Employee[];
  selectedEmployees: Employee[];
  onEmployeeChange: (employees: Employee[]) => void;
  maxSelected?: number;
  groupByClass: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedEmployeeIds = useMemo(() => 
    new Set(selectedEmployees.map(emp => emp.employeeId)), 
    [selectedEmployees]
  );

  const filteredEmployees = useMemo(() => {
    if (!searchValue) return employees;
    return employees.filter(employee =>
      employee.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.class?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [employees, searchValue]);

  const groupedEmployees = useMemo(() => {
    if (!groupByClass) {
      return { 'All Employees': filteredEmployees };
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
    Object.keys(grouped)
      .sort()
      .forEach(key => {
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
    formatSelectedText,
  };
};

// EmployeeSelectionTrigger component
const EmployeeSelectionTrigger: React.FC<{
  selectedCount: number;
  displayText: string;
  onClearAll: () => void;
  disabled: boolean;
  className?: string;
}> = ({ selectedCount, displayText, onClearAll, disabled, className }) => (
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      className={cn(
        "w-full justify-between text-left font-normal h-8",
        !selectedCount && "text-muted-foreground",
        className
      )}
      disabled={disabled}
    >
      <div className="flex items-center">
        <Users className="mr-2 h-4 w-4" />
        {displayText}
      </div>
      <div className="flex items-center space-x-1">
        {selectedCount > 0 && (
          <Badge 
            variant="secondary"
            className="mr-1"
            onClick={(e) => {
              e.stopPropagation();
              onClearAll();
            }}
          >
            {selectedCount}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        )}
        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
      </div>
    </Button>
  </PopoverTrigger>
);

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
}) => {
  const hasResults = Object.values(groupedEmployees).some(group => group.length > 0);

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="flex items-center border-b px-3 py-2">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          className="flex h-8 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Results */}
      <ScrollArea className="h-64">
        <div className="p-1">
          {!hasResults ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyText}
            </div>
          ) : (
            Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => (
              <div key={groupName}>
                {groupByClass && groupEmployees.length > 0 && (
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {groupName}
                  </div>
                )}
                {groupEmployees.map((employee) => {
                  const isSelected = selectedEmployeeIds.has(employee.employeeId);
                  const isDisabled = maxSelected && 
                    selectedCount >= maxSelected && 
                    !isSelected;

                  return (
                    <div
                      key={employee.employeeId}
                      className={cn(
                        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => !isDisabled && onEmployeeSelect(employee)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{employee.fullName}</div>
                        <div className="text-xs text-muted-foreground flex items-center space-x-2">
                          <span>{employee.employeeId}</span>
                          {employee.class && (
                            <span className="bg-muted px-1 rounded text-xs">
                              {employee.class}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      
      {maxSelected && (
        <div className="p-3 border-t text-xs text-muted-foreground text-center">
          {selectedCount}/{maxSelected} employees selected
          {selectedCount >= maxSelected && " (limit reached)"}
        </div>
      )}
    </div>
  );
};

// SelectedEmployeesBadges component
const SelectedEmployeesBadges: React.FC<{
  selectedEmployees: Employee[];
  onRemoveEmployee: (employeeId: string) => void;
  disabled: boolean;
}> = ({ selectedEmployees, onRemoveEmployee, disabled }) => {
  if (selectedEmployees.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {selectedEmployees.map((employee) => (
        <Badge
          key={employee.employeeId}
          variant="outline"
          className="text-xs px-2 py-1 max-w-[200px]"
        >
          <div className="flex items-center space-x-1 min-w-0">
            <span className="truncate">{employee.fullName}</span>
            <span className="text-muted-foreground">({employee.employeeId})</span>
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => onRemoveEmployee(employee.employeeId)}
              disabled={disabled}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </Badge>
      ))}
    </div>
  );
};

// MultiDatePicker component
const MultiDatePicker: React.FC<{
  selectedDates?: Date[];
  onDateChange: (dates: Date[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDates?: number;
}> = ({
  selectedDates = [],
  onDateChange,
  placeholder = "Select dates...",
  className,
  disabled = false,
  maxDates,
}) => {
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      const sortedDates = Array.from(dates).sort((a, b) => a.getTime() - b.getTime());
      onDateChange(sortedDates);
    }
  };

  const removeDateAtIndex = (indexToRemove: number) => {
    const newDates = selectedDates.filter((_, index) => index !== indexToRemove);
    onDateChange(newDates);
  };

  const clearAllDates = () => {
    onDateChange([]);
  };

  const formatSelectedDatesText = () => {
    if (selectedDates.length === 0) return placeholder;
    if (selectedDates.length === 1) return formatDate(selectedDates[0], "PPP");
    return `${selectedDates.length} dates selected`;
  };

  // Check if date is a future date (business rule: no future dates)
  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return date > today;
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal h-8",
              !selectedDates.length && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {formatSelectedDatesText()}
            {selectedDates.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllDates();
                }}
              >
                {selectedDates.length}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="multiple"
            selected={selectedDates}
            onSelect={handleDateSelect}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            disabled={(date) => {
              // Disable future dates (business rule)
              if (isFutureDate(date)) return true;
              
              // Disable if max dates reached and date not already selected
              if (maxDates && selectedDates.length >= maxDates) {
                const isAlreadySelected = selectedDates.some(
                  (selectedDate) => formatDate(selectedDate, 'yyyy-MM-dd') === formatDate(date, 'yyyy-MM-dd')
                );
                return !isAlreadySelected;
              }
              
              return false;
            }}
            className="rounded-md border"
          />
          {maxDates && (
            <div className="p-3 border-t text-xs text-muted-foreground text-center">
              {selectedDates.length}/{maxDates} dates selected
              {selectedDates.length >= maxDates && " (limit reached)"}
            </div>
          )}
        </PopoverContent>
      </Popover>

      {/* Selected Dates Display */}
      {selectedDates.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedDates.map((date, index) => (
            <Badge
              key={formatDate(date, 'yyyy-MM-dd')}
              variant="outline"
              className="text-xs px-2 py-1"
            >
              {formatDate(date, "MMM dd, yyyy")}
              <button
                type="button"
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => removeDateAtIndex(index)}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
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
  groupByClass = false,
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
    formatSelectedText,
  } = useEmployeeSelection({
    employees,
    selectedEmployees,
    onEmployeeChange,
    maxSelected,
    groupByClass,
  });

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <EmployeeSelectionTrigger
          selectedCount={selectedEmployees.length}
          displayText={formatSelectedText(placeholder)}
          onClearAll={clearAllEmployees}
          disabled={disabled}
          className={className}
        />
        <PopoverContent className="w-full p-0" align="start">
          <EmployeeSelectionList
            groupedEmployees={groupedEmployees}
            selectedEmployeeIds={selectedEmployeeIds}
            onEmployeeSelect={handleEmployeeSelect}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            maxSelected={maxSelected}
            selectedCount={selectedEmployees.length}
            searchPlaceholder={searchPlaceholder}
            emptyText={emptyText}
            groupByClass={groupByClass}
          />
        </PopoverContent>
      </Popover>
      <SelectedEmployeesBadges
        selectedEmployees={selectedEmployees}
        onRemoveEmployee={removeEmployee}
        disabled={disabled}
      />
    </div>
  );
};

// Mock data
const mockEmployees: Employee[] = [
  { employeeId: 'JSMITH', fullName: 'John Smith', email: 'john@company.com', class: 'FMAN', isActive: true },
  { employeeId: 'MJONES', fullName: 'Mary Jones', email: 'mary@company.com', class: 'JMAN', isActive: true },
  { employeeId: 'BWILSON', fullName: 'Bob Wilson', email: 'bob@company.com', class: 'AP3', isActive: true },
  { employeeId: 'ADMIN001', fullName: 'Admin User', email: 'admin@company.com', class: 'ADMIN', isActive: true },
  { employeeId: 'GOLNIC', fullName: 'Nicholas Goldup', email: 'nick@company.com', class: 'ADMIN', isActive: true },
  { employeeId: 'BARHEN', fullName: 'Henry Barendregt', email: 'henry@company.com', class: 'FMAN', isActive: true },
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
const roundToQuarterHour = (hours: number): number => {
  return Math.round(hours * 4) / 4;
};

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validation functions
const validateEntry = (entry: StandardHoursEntry): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!entry.selectedEmployees || entry.selectedEmployees.length === 0) {
    errors.push({ field: 'selectedEmployees', message: 'At least one employee is required' });
  }

  if (!entry.selectedDates || entry.selectedDates.length === 0) {
    errors.push({ field: 'selectedDates', message: 'At least one date is required' });
  } else {
    // Check for future dates
    const hasFutureDate = entry.selectedDates.some(date => {
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return date > today;
    });
    
    if (hasFutureDate) {
      errors.push({ field: 'selectedDates', message: 'Cannot enter time for future dates' });
    }
  }

  if (!entry.projectCode) {
    errors.push({ field: 'projectCode', message: 'Project is required' });
  }

  if (!entry.costCode) {
    errors.push({ field: 'costCode', message: 'Cost code is required' });
  }

  // Validate hours
  const totalHours = entry.standardHours + entry.overtimeHours;
  if (totalHours <= 0) {
    errors.push({ field: 'standardHours', message: 'Total hours must be greater than 0' });
  }

  if (totalHours > 24) {
    errors.push({ field: 'standardHours', message: 'Total hours cannot exceed 24 per day' });
  }

  // Check for quarter-hour increments
  if (entry.standardHours % 0.25 !== 0) {
    errors.push({ field: 'standardHours', message: 'Standard hours must be in quarter-hour increments (0.25, 0.5, 0.75, etc.)' });
  }

  if (entry.overtimeHours % 0.25 !== 0) {
    errors.push({ field: 'overtimeHours', message: 'Overtime hours must be in quarter-hour increments (0.25, 0.5, 0.75, etc.)' });
  }

  return errors;
};

export default function StandardHoursTab() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entries, setEntries] = useState<StandardHoursEntry[]>([
    {
      id: generateId(),
      selectedEmployees: [mockEmployees[0]], // Default to first employee
      selectedDates: [new Date()], // Default to today
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 8,
      overtimeHours: 0,
      notes: '',
    }
  ]);
  const [errors, setErrors] = useState<EntryErrors>({});

  useEffect(() => {
    const newErrors: EntryErrors = {};
    
    entries.forEach((entry) => {
      const entryErrors = validateEntry(entry);
      if (entryErrors.length > 0) {
        newErrors[entry.id] = entryErrors;
      }
    });
    
    setErrors(newErrors);
  }, [entries]);

  const updateEntry = useCallback((id: string, field: keyof StandardHoursEntry, value: any) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  }, []);

  const addNewEntry = useCallback(() => {
    const lastEntry = entries[entries.length - 1];
    const newEntry: StandardHoursEntry = {
      id: generateId(),
      selectedEmployees: lastEntry?.selectedEmployees || [mockEmployees[0]],
      selectedDates: [new Date()], // Default to today
      projectCode: lastEntry?.projectCode || '',
      extraValue: 'Default',
      costCode: lastEntry?.costCode || '',
      standardHours: 8,
      overtimeHours: 0,
      notes: '',
    };
    setEntries(prev => [...prev, newEntry]);
  }, [entries]);

  const removeEntry = useCallback((id: string) => {
    if (entries.length > 1) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  }, [entries.length]);

  const resetForm = useCallback(() => {
    setEntries([{
      id: generateId(),
      selectedEmployees: [mockEmployees[0]],
      selectedDates: [new Date()], // Default to today
      projectCode: '',
      extraValue: 'Default',
      costCode: '',
      standardHours: 8,
      overtimeHours: 0,
      notes: '',
    }]);
    setErrors({});
  }, []);

  const handleSubmit = async () => {
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      alert('Please fix all validation errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const timesheetEntries: any[] = [];
      
      entries.forEach((entry) => {
        const notes = entry.notes || '';
        
        // Create entries for each selected employee and date combination
        entry.selectedEmployees.forEach(employee => {
          entry.selectedDates.forEach(date => {
            const formattedDate = formatDate(date, 'yyyy-MM-dd');
            
            if (entry.standardHours > 0) {
              timesheetEntries.push({
                employeeId: employee.employeeId,
                employeeName: employee.fullName,
                dateWorked: formattedDate,
                projectCode: entry.projectCode,
                extraValue: entry.extraValue,
                costCode: entry.costCode,
                standardHours: entry.standardHours,
                overtimeHours: 0,
                notes: notes,
              });
            }
            
            if (entry.overtimeHours > 0) {
              timesheetEntries.push({
                employeeId: employee.employeeId,
                employeeName: employee.fullName,
                dateWorked: formattedDate,
                projectCode: entry.projectCode,
                extraValue: entry.extraValue,
                costCode: entry.costCode,
                standardHours: 0,
                overtimeHours: entry.overtimeHours,
                notes: `${notes} [Overtime]`,
              });
            }
          });
        });
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`Successfully created ${timesheetEntries.length} timesheet entries!\n\nEntries:\n${timesheetEntries.map((e, i) => 
        `${i+1}. ${e.employeeName} (${e.employeeId}) - ${e.dateWorked} - ${e.standardHours + e.overtimeHours}hrs (${e.projectCode})`
      ).join('\n')}`);
      
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
      const employeeCount = entry.selectedEmployees.length;
      const dateCount = entry.selectedDates.length;
      const entriesPerEmployeeDate = (entry.standardHours > 0 ? 1 : 0) + (entry.overtimeHours > 0 ? 1 : 0);
      
      return total + (employeeCount * dateCount * entriesPerEmployeeDate);
    }, 0);
  }, [entries]);

  const hasValidationErrors = Object.keys(errors).length > 0;

  const getFieldError = (entryId: string, fieldName: string) => {
    const entryErrors = errors[entryId] || [];
    return entryErrors.find(err => err.field === fieldName)?.message;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 w-full">
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 pt-1">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-base font-semibold">Standard Hours</h3>
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </Badge>
              {totalTimesheetEntries > entries.length && (
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  → {totalTimesheetEntries} timesheet entries
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={addNewEntry}
                className="flex items-center space-x-1 h-8 bg-green-600 hover:bg-green-700 text-white"
                disabled={isSubmitting}
              >
                <Plus className="w-3 h-3" />
                <span>Add Entry</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {entries.map((entry, index) => {
              const entryErrors = errors[entry.id] || [];
              const hasErrors = entryErrors.length > 0;
              const totalHours = entry.standardHours + entry.overtimeHours;
              
              return (
                <div key={entry.id} className="border rounded-lg p-3 relative space-y-3">
                  {entries.length > 1 && (
                    <div className="absolute top-2 right-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEntry(entry.id)}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        disabled={isSubmitting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs">Entry {index + 1}</Badge>
                    {hasErrors && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        <XCircle className="w-3 h-3 mr-1" />
                        Has Errors
                      </Badge>
                    )}
                    {!hasErrors && totalHours > 0 && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Valid
                      </Badge>
                    )}
                    {entry.selectedEmployees.length > 0 && entry.selectedDates.length > 0 && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {entry.selectedEmployees.length} × {entry.selectedDates.length} = {entry.selectedEmployees.length * entry.selectedDates.length} combinations
                      </Badge>
                    )}
                  </div>

                  {/* Employee & Date Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Employees *</Label>
                      <MultiEmployeeSelector
                        employees={mockEmployees.filter(emp => emp.isActive !== false)}
                        selectedEmployees={entry.selectedEmployees}
                        onEmployeeChange={(employees) => updateEntry(entry.id, 'selectedEmployees', employees)}
                        placeholder="Select employees..."
                        groupByClass={true}
                        searchPlaceholder="Search by name, ID, or job class..."
                        disabled={isSubmitting}
                      />
                      {getFieldError(entry.id, 'selectedEmployees') && (
                        <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'selectedEmployees')}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-xs">Dates Worked *</Label>
                      <MultiDatePicker
                        selectedDates={entry.selectedDates}
                        onDateChange={(dates) => updateEntry(entry.id, 'selectedDates', dates)}
                        placeholder="Select dates worked..."
                        disabled={isSubmitting}
                      />
                      {getFieldError(entry.id, 'selectedDates') && (
                        <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'selectedDates')}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Project *</Label>
                        <Select 
                          value={entry.projectCode} 
                          onValueChange={(value) => updateEntry(entry.id, 'projectCode', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select Project" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockProjects.filter(project => project.isActive).map(project => (
                              <SelectItem key={project.projectCode} value={project.projectCode}>
                                <div className="flex flex-col">
                                  <span className="font-medium text-xs">{project.projectCode}</span>
                                  <span className="text-xs text-gray-500">{project.projectDescription}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {getFieldError(entry.id, 'projectCode') && (
                          <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'projectCode')}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-xs">Extra</Label>
                        <Select 
                          value={entry.extraValue} 
                          onValueChange={(value) => updateEntry(entry.id, 'extraValue', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {mockExtras.map(extra => (
                              <SelectItem key={extra.extraID} value={extra.extraValue}>
                                <span className="text-xs">{extra.extraValue} - {extra.description}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Label className="flex items-center space-x-1 text-xs">
                        <Hash className="w-3 h-3" />
                        <span>Cost Code *</span>
                      </Label>
                      <Select 
                        value={entry.costCode} 
                        onValueChange={(value) => updateEntry(entry.id, 'costCode', value)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Select Cost Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCostCodes.map(code => (
                            <SelectItem key={code.costCodeId} value={code.costCode}>
                              <div className="flex flex-col">
                                <span className="font-medium text-xs">{code.costCode}</span>
                                <span className="text-xs text-gray-500">{code.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {getFieldError(entry.id, 'costCode') && (
                        <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'costCode')}</p>
                      )}
                    </div>
                  </div>

                  {/* Hours Entry */}
                  <div className="pt-2">
                    <Label className="text-xs font-medium flex items-center space-x-1 mb-2">
                      <Timer className="w-3 h-3" />
                      <span>Hours Entry</span>
                    </Label>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">Standard Hours *</Label>
                        <Input
                          type="number"
                          step="0.25"
                          min="0"
                          max="24"
                          className="h-8 text-xs"
                          value={entry.standardHours}
                          onChange={(e) => updateEntry(entry.id, 'standardHours', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Quarter-hour increments</p>
                        {getFieldError(entry.id, 'standardHours') && (
                          <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'standardHours')}</p>
                        )}
                      </div>

                      <div>
                        <Label className="text-xs">Overtime Hours</Label>
                        <Input
                          type="number"
                          step="0.25"
                          min="0"
                          max="24"
                          className="h-8 text-xs"
                          value={entry.overtimeHours}
                          onChange={(e) => updateEntry(entry.id, 'overtimeHours', parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Quarter-hour increments</p>
                        {getFieldError(entry.id, 'overtimeHours') && (
                          <p className="text-xs text-red-600 mt-1">{getFieldError(entry.id, 'overtimeHours')}</p>
                        )}
                      </div>

                    {/* Quick Hour Buttons */}
                    <div className="flex items-center gap-2 py-2">
                      <span className="text-xs text-slate-600 dark:text-slate-400 min-w-[80px] flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        Quick Hours:
                      </span>
                      <div className="flex gap-1 flex-wrap">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateEntry(entry.id, 'standardHours', 8);
                            updateEntry(entry.id, 'overtimeHours', 0);
                          }}
                          className="h-6 px-2 text-xs"
                          disabled={isSubmitting}
                        >
                          8h Standard
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateEntry(entry.id, 'standardHours', 8);
                            updateEntry(entry.id, 'overtimeHours', 2);
                          }}
                          className="h-6 px-2 text-xs"
                          disabled={isSubmitting}
                        >
                          8h + 2h OT
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateEntry(entry.id, 'standardHours', 8);
                            updateEntry(entry.id, 'overtimeHours', 4);
                          }}
                          className="h-6 px-2 text-xs"
                          disabled={isSubmitting}
                        >
                          8h + 4h OT
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            updateEntry(entry.id, 'standardHours', 0);
                            updateEntry(entry.id, 'overtimeHours', 0);
                          }}
                          className="h-6 px-2 text-xs"
                          disabled={isSubmitting}
                        >
                          Clear
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Hours Summary */}
                  {totalHours > 0 && (
                    <div className="bg-muted p-2 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calculator className="w-3 h-3" />
                        <span className="text-xs font-medium">Hours Summary</span>
                        {(entry.selectedEmployees.length > 1 || entry.selectedDates.length > 1) && (
                          <Badge variant="outline" className="text-xs">
                            × {entry.selectedEmployees.length} employees × {entry.selectedDates.length} dates
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Standard</div>
                          <div className="text-sm font-bold text-blue-600">{entry.standardHours.toFixed(2)}</div>
                        </div>
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Overtime</div>
                          <div className="text-sm font-bold text-orange-600">{entry.overtimeHours.toFixed(2)}</div>
                        </div>
                        <div className="bg-card p-1.5 rounded border">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total</div>
                          <div className="text-sm font-bold text-green-600">{totalHours.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total hours warning */}
                  {totalHours > 16 && (
                    <Alert className="border-amber-200 bg-amber-50">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-semibold text-amber-900">
                            High Hours Warning
                          </div>
                          <p className="text-amber-800 text-sm">
                            Total hours exceed 16 hours per day. Please verify this is correct.
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Notes */}
                  <div>
                    <Label className="text-xs">Notes</Label>
                    <Textarea
                      rows={2}
                      placeholder="Enter any additional notes..."
                      value={entry.notes || ''}
                      onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>
              );
            })}

            {/* Submit Button */}
            <div className="flex justify-end space-x-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isSubmitting}
                size="sm"
              >
                Reset Form
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || totalTimesheetEntries === 0 || hasValidationErrors}
                className="min-w-[120px]"
                size="sm"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  `Submit ${totalTimesheetEntries} ${totalTimesheetEntries === 1 ? 'Entry' : 'Entries'}`
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}