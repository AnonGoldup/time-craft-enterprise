import React, { useState } from 'react';
import { Users, Check, ChevronsUpDown, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  employees = []
}) => {
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false);

  // Ensure arrays are always properly defined
  const safeSelectedEmployees = Array.isArray(selectedEmployees) ? selectedEmployees : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];

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

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[70px]">Employee:</span>
        
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
                  {safeEmployees.length > 0 ? (
                    safeEmployees.map((employee) => (
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
                    ))
                  ) : (
                    <CommandItem disabled>Loading employees...</CommandItem>
                  )}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          // Single select mode
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-48 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md"
          >
            <option value="">Select employee...</option>
            {safeEmployees.map((employee) => (
              <option key={employee.employeeID} value={employee.employeeID}>
                {employee.fullName} ({employee.class})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Display selected employees as badges in multi-select mode */}
      {setSelectedEmployees && safeSelectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-[86px]">
          {safeEmployees
            .filter(emp => safeSelectedEmployees.includes(emp.employeeID))
            .map(employee => (
              <Badge
                key={employee.employeeID}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <span>{employee.fullName}</span>
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-500"
                  onClick={() => removeEmployee(employee.employeeID)}
                />
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSelector;