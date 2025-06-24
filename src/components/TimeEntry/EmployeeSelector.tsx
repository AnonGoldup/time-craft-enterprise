
import React, { useState } from 'react';
import { Users, Check, ChevronsUpDown } from 'lucide-react';
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
  loading?: boolean;
}

const EmployeeSelector: React.FC<EmployeeSelectorProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  selectedEmployees = [],
  setSelectedEmployees,
  employees = [],
  loading = false
}) => {
  const [employeePopoverOpen, setEmployeePopoverOpen] = useState(false);

  const safeSelectedEmployees = Array.isArray(selectedEmployees) ? selectedEmployees : [];
  const safeEmployees = Array.isArray(employees) ? employees : [];

  const handleEmployeeSelect = (employeeId: string) => {
    if (setSelectedEmployees) {
      const newSelection = safeSelectedEmployees.includes(employeeId)
        ? safeSelectedEmployees.filter(id => id !== employeeId)
        : [...safeSelectedEmployees, employeeId];
      setSelectedEmployees(newSelection);
    } else {
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

  const getButtonText = () => {
    if (loading) return "Loading employees...";
    
    if (setSelectedEmployees) {
      if (safeSelectedEmployees.length === 0) return "Select employees...";
      if (safeSelectedEmployees.length === 1) return getSelectedEmployeeNames()[0];
      return `${safeSelectedEmployees.length} employees selected`;
    } else {
      if (!selectedEmployee) return "Select employee...";
      const employee = safeEmployees.find(emp => emp.employeeID === selectedEmployee);
      return employee?.fullName || "Select employee...";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Employee</span>
        </div>
        
        <Popover open={employeePopoverOpen} onOpenChange={setEmployeePopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={employeePopoverOpen}
              className="w-48 justify-between border-slate-300 dark:border-slate-600"
              disabled={loading}
            >
              {getButtonText()}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0 bg-popover border-border z-50">
            <Command>
              <CommandInput placeholder="Search employees..." />
              <CommandEmpty>
                {loading ? "Loading..." : "No employee found."}
              </CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {safeEmployees.map((employee) => (
                  <CommandItem
                    key={employee.employeeID}
                    value={employee.fullName}
                    onSelect={() => handleEmployeeSelect(employee.employeeID)}
                    className="hover:bg-accent hover:text-accent-foreground"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (setSelectedEmployees 
                          ? safeSelectedEmployees.includes(employee.employeeID)
                          : selectedEmployee === employee.employeeID
                        ) ? "opacity-100" : "opacity-0"
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
      </div>

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
