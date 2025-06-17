
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
  selectedEmployees,
  setSelectedEmployees,
  employees
}) => {
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false);

  // Ensure arrays are always properly defined with fallbacks
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
    if (!safeEmployees.length) return [];
    return safeEmployees
      .filter(emp => emp && safeSelectedEmployees.includes(emp.EmployeeID))
      .map(emp => emp.FullName || 'Unknown');
  };

  const selectedNames = getSelectedEmployeeNames();

  // Don't render Command if there's no data
  if (!safeEmployees.length && employeePopoverOpen) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[70px]">Employee:</span>
          <div className="w-48 px-3 py-2 text-sm text-gray-500 border border-slate-300 dark:border-slate-600 rounded-md">
            Loading employees...
          </div>
        </div>
      </div>
    );
  }

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
                  ? selectedNames[0] || "1 employee selected"
                  : `${safeSelectedEmployees.length} employees selected`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              {safeEmployees.length > 0 ? (
                <Command>
                  <CommandInput placeholder="Search employees..." />
                  <CommandEmpty>No employee found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {safeEmployees.map((employee) => {
                      if (!employee || !employee.EmployeeID) return null;
                      return (
                        <CommandItem
                          key={employee.EmployeeID}
                          value={`${employee.FullName || ''} ${employee.EmployeeID}`}
                          onSelect={() => handleEmployeeSelect(employee.EmployeeID)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              safeSelectedEmployees.includes(employee.EmployeeID) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span>{employee.FullName || 'Unknown'}</span>
                          <span className="ml-auto text-xs text-slate-500">
                            {employee.Class || ''}
                          </span>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              ) : (
                <div className="p-2 text-sm text-gray-500">Loading employees...</div>
              )}
            </PopoverContent>
          </Popover>
        ) : (
          // Single select mode
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-48 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-gray-800"
          >
            <option value="">Select employee...</option>
            {safeEmployees.map((employee) => {
              if (!employee || !employee.EmployeeID) return null;
              return (
                <option key={employee.EmployeeID} value={employee.EmployeeID}>
                  {employee.FullName || 'Unknown'} ({employee.Class || 'N/A'})
                </option>
              );
            })}
          </select>
        )}
      </div>

      {/* Display selected employees as badges in multi-select mode */}
      {setSelectedEmployees && safeSelectedEmployees.length > 0 && (
        <div className="flex flex-wrap gap-2 ml-[86px]">
          {safeEmployees
            .filter(emp => emp && safeSelectedEmployees.includes(emp.EmployeeID))
            .map(employee => (
              <Badge
                key={employee.EmployeeID}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <span>{employee.FullName || 'Unknown'}</span>
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-500"
                  onClick={() => removeEmployee(employee.EmployeeID)}
                />
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeSelector;
