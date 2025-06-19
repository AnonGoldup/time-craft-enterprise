
import React, { useState } from 'react';
import { Users, Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Employee } from '@/services/api';
import { useEmployeeData } from '@/hooks/useEmployeeData';

interface EmployeeSelectorProps {
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedEmployees?: string[];
  setSelectedEmployees?: (value: string[]) => void;
  employees?: Employee[]; // Optional override for employees data
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  selectedEmployees = [],
  setSelectedEmployees,
  employees: propEmployees
}) => {
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false);
  const { employees: hookEmployees, loading } = useEmployeeData();
  
  // Use provided employees or fall back to hook data
  const employees = propEmployees || hookEmployees;
  const safeSelectedEmployees = Array.isArray(selectedEmployees) ? selectedEmployees : [];

  const handleEmployeeSelect = (employeeId: string) => {
    if (setSelectedEmployees) {
      // Multi-select mode
      const newSelection = safeSelectedEmployees.includes(employeeId)
        ? safeSelectedEmployees.filter(id => id !== employeeId)
        : [...safeSelectedEmployees, employeeId];
      setSelectedEmployees(newSelection);
    } else {
      // Single select mode
      setSelectedEmployee(employeeId);
      setEmployeePopoverOpen(false);
    }
  };

  const removeEmployee = (employeeId: string) => {
    if (setSelectedEmployees) {
      setSelectedEmployees(safeSelectedEmployees.filter(id => id !== employeeId));
    }
  };

  const getSelectedEmployeeNames = () => {
    return employees
      .filter(emp => safeSelectedEmployees.includes(emp.employeeID))
      .map(emp => emp.fullName || `${emp.firstName} ${emp.lastName}`);
  };

  const getDisplayText = () => {
    if (setSelectedEmployees) {
      // Multi-select mode
      if (safeSelectedEmployees.length === 0) return "Select employees...";
      if (safeSelectedEmployees.length === 1) return getSelectedEmployeeNames()[0];
      return `${safeSelectedEmployees.length} employees selected`;
    } else {
      // Single select mode
      const employee = employees.find(emp => emp.employeeID === selectedEmployee);
      return employee ? (employee.fullName || `${employee.firstName} ${employee.lastName}`) : "Select employee...";
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Employee</span>
        </div>
        <div className="w-48 p-2 text-sm text-muted-foreground border rounded">
          Loading employees...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Employee</span>
        </div>
        
        {employees.length === 0 ? (
          <div className="w-48 p-2 text-sm text-muted-foreground border rounded">
            No employees found
          </div>
        ) : setSelectedEmployees ? (
          // Multi-select mode
          <Popover open={employeePopoverOpen} onOpenChange={setEmployeePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={employeePopoverOpen}
                className="w-48 justify-between border-slate-300 dark:border-slate-600"
              >
                {getDisplayText()}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-[9999]">
              <Command>
                <CommandInput placeholder="Search employees..." />
                <CommandEmpty>No employee found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {employees.map((employee) => (
                    <CommandItem
                      key={employee.employeeID}
                      value={employee.fullName || `${employee.firstName} ${employee.lastName}`}
                      onSelect={() => handleEmployeeSelect(employee.employeeID)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          safeSelectedEmployees.includes(employee.employeeID) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{employee.fullName || `${employee.firstName} ${employee.lastName}`}</span>
                        <span className="text-xs text-slate-500">
                          {employee.class} - {employee.department}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          // Single select mode
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select employee..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 z-[9999]">
              {employees.map((employee) => (
                <SelectItem key={employee.employeeID} value={employee.employeeID}>
                  <div className="flex flex-col">
                    <span>{employee.fullName || `${employee.firstName} ${employee.lastName}`}</span>
                    <span className="text-xs text-slate-500">
                      {employee.class} - {employee.department}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Selected employees badges (for multi-select) */}
      {setSelectedEmployees && safeSelectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-1 max-w-64">
          {getSelectedEmployeeNames().map((name, index) => (
            <Badge
              key={safeSelectedEmployees[index]}
              variant="secondary"
              className="text-xs"
            >
              {name}
              <button
                onClick={() => removeEmployee(safeSelectedEmployees[index])}
                className="ml-1 hover:text-red-500"
                type="button"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSelector;
