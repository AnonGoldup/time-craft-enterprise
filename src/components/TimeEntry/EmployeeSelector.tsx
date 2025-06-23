
import React, { useState } from 'react';
import { Users, Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Employee } from '@/services/api';

interface EmployeeSelectorProps {
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedEmployees?: string[];
  setSelectedEmployees?: (value: string[]) => void;
  employees: Employee[];
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  selectedEmployees = [],
  setSelectedEmployees,
  employees = [] // Provide default empty array
}) => {
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false);

  // Ensure arrays are always properly defined and not null/undefined
  const safeSelectedEmployees = Array.isArray(selectedEmployees) ? selectedEmployees : [];
  const safeEmployees = Array.isArray(employees) && employees ? employees : [];

  const handleEmployeeSelect = (employeeId: string) => {
    if (setSelectedEmployees) {
      // Multi-select mode
      const newSelection = safeSelectedEmployees.includes(employeeId)
        ? safeSelectedEmployees.filter(id => id !== employeeId)
        : [...safeSelectedEmployees, employeeId];
      setSelectedEmployees(newSelection);
    } else {
      // Single select mode (fallback)
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
    return safeEmployees
      .filter(emp => safeSelectedEmployees.includes(emp.employeeID))
      .map(emp => emp.fullName);
  };

  // Don't render if employees are still loading or empty
  if (!safeEmployees || safeEmployees.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Employee</span>
        </div>
        <div className="w-48 p-2 border rounded text-sm text-muted-foreground">
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
        
        {setSelectedEmployees ? (
          // Multi-select mode
          <Popover open={employeePopoverOpen} onOpenChange={setEmployeePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={employeePopoverOpen}
                className="w-48 justify-between border-slate-300 dark:border-slate-600"
              >
                {safeSelectedEmployees.length === 0
                  ? "Select employees..."
                  : safeSelectedEmployees.length === 1
                  ? getSelectedEmployeeNames()[0]
                  : `${safeSelectedEmployees.length} employees selected`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <Command>
                <CommandInput placeholder="Search employees..." />
                <CommandEmpty>No employee found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {safeEmployees.map((employee) => (
                    <CommandItem
                      key={employee.employeeID}
                      value={employee.fullName}
                      onSelect={() => handleEmployeeSelect(employee.employeeID)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          safeSelectedEmployees.includes(employee.employeeID) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {employee.fullName}
                      <span className="ml-auto text-xs text-slate-500">
                        {employee.class}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          // Single select mode (fallback)
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select employee..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              {safeEmployees.map((employee) => (
                <SelectItem key={employee.employeeID} value={employee.employeeID}>
                  {employee.fullName} - {employee.class}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Selected employees badges (for multi-select) */}
      {setSelectedEmployees && safeSelectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-1">
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
