
import * as React from "react"
import { Check } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Employee } from "../types"

interface ModularEmployeeListProps {
  groupedEmployees: Record<string, Employee[]>
  selectedEmployeeIds: Set<string>
  onEmployeeSelect: (employee: Employee) => void
  searchValue: string
  onSearchChange: (value: string) => void
  maxSelected?: number
  selectedCount: number
  groupByClass?: boolean
}

export function ModularEmployeeList({
  groupedEmployees,
  selectedEmployeeIds,
  onEmployeeSelect,
  searchValue,
  onSearchChange,
  maxSelected,
  selectedCount,
  groupByClass = false,
}: ModularEmployeeListProps) {
  return (
    <Command>
      <CommandInput 
        placeholder="Search employees..."
        value={searchValue}
        onValueChange={onSearchChange}
      />
      <CommandEmpty>No employees found.</CommandEmpty>
      <ScrollArea className="h-64">
        <CommandList>
          {Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => (
            <CommandGroup key={groupName} heading={groupByClass ? groupName : undefined}>
              {groupEmployees.map((employee) => {
                const isSelected = selectedEmployeeIds.has(employee.employeeId)
                const isDisabled = maxSelected && 
                  selectedCount >= maxSelected && 
                  !isSelected

                return (
                  <CommandItem
                    key={employee.employeeId}
                    value={`${employee.fullName} ${employee.employeeId} ${employee.email || ''}`}
                    onSelect={() => onEmployeeSelect(employee)}
                    disabled={isDisabled}
                    className={cn(
                      "flex items-center space-x-2 px-2 py-1.5",
                      isDisabled && "opacity-50 cursor-not-allowed"
                    )}
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
                  </CommandItem>
                )
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </ScrollArea>
      {maxSelected && (
        <div className="p-3 border-t text-xs text-muted-foreground text-center">
          {selectedCount}/{maxSelected} employees selected
          {selectedCount >= maxSelected && " (limit reached)"}
        </div>
      )}
    </Command>
  )
}
