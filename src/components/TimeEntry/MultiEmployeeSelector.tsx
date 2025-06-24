
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

// Employee interface matching your database structure
interface Employee {
  employeeId: string
  fullName: string
  email?: string
  class?: string
  isActive?: boolean
}

interface MultiEmployeeSelectorProps {
  employees: Employee[]
  selectedEmployees: Employee[]
  onEmployeeChange: (employees: Employee[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxSelected?: number
  searchPlaceholder?: string
  emptyText?: string
  groupByClass?: boolean
}

export function MultiEmployeeSelector({
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
}: MultiEmployeeSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedEmployeeIds = new Set(selectedEmployees.map(emp => emp.employeeId))

  const filteredEmployees = React.useMemo(() => {
    if (!searchValue) return employees

    return employees.filter(employee =>
      employee.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.class?.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [employees, searchValue])

  const groupedEmployees = React.useMemo(() => {
    if (!groupByClass) {
      return { 'All Employees': filteredEmployees }
    }

    const grouped = filteredEmployees.reduce((acc, employee) => {
      const group = employee.class || 'Unassigned'
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(employee)
      return acc
    }, {} as Record<string, Employee[]>)

    // Sort groups and employees within groups
    const sortedGrouped: Record<string, Employee[]> = {}
    Object.keys(grouped)
      .sort()
      .forEach(key => {
        sortedGrouped[key] = grouped[key].sort((a, b) => a.fullName.localeCompare(b.fullName))
      })

    return sortedGrouped
  }, [filteredEmployees, groupByClass])

  const handleEmployeeSelect = (employee: Employee) => {
    const isSelected = selectedEmployeeIds.has(employee.employeeId)
    
    if (isSelected) {
      // Remove employee
      const newSelection = selectedEmployees.filter(emp => emp.employeeId !== employee.employeeId)
      onEmployeeChange(newSelection)
    } else {
      // Add employee (if under max limit)
      if (maxSelected && selectedEmployees.length >= maxSelected) {
        return
      }
      const newSelection = [...selectedEmployees, employee].sort((a, b) => a.fullName.localeCompare(b.fullName))
      onEmployeeChange(newSelection)
    }
  }

  const removeEmployee = (employeeId: string) => {
    const newSelection = selectedEmployees.filter(emp => emp.employeeId !== employeeId)
    onEmployeeChange(newSelection)
  }

  const clearAllEmployees = () => {
    onEmployeeChange([])
  }

  const formatSelectedText = () => {
    if (selectedEmployees.length === 0) return placeholder
    if (selectedEmployees.length === 1) return selectedEmployees[0].fullName
    return `${selectedEmployees.length} employees selected`
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between text-left font-normal",
              !selectedEmployees.length && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              {formatSelectedText()}
            </div>
            <div className="flex items-center space-x-1">
              {selectedEmployees.length > 0 && (
                <Badge 
                  variant="secondary"
                  className="mr-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearAllEmployees()
                  }}
                >
                  {selectedEmployees.length}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={searchPlaceholder}
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>{emptyText}</CommandEmpty>
            <ScrollArea className="h-64">
              <CommandList>
                {Object.entries(groupedEmployees).map(([groupName, groupEmployees]) => (
                  <CommandGroup key={groupName} heading={groupByClass ? groupName : undefined}>
                    {groupEmployees.map((employee) => {
                      const isSelected = selectedEmployeeIds.has(employee.employeeId)
                      const isDisabled = maxSelected && 
                        selectedEmployees.length >= maxSelected && 
                        !isSelected

                      return (
                        <CommandItem
                          key={employee.employeeId}
                          value={`${employee.fullName} ${employee.employeeId} ${employee.email || ''}`}
                          onSelect={() => handleEmployeeSelect(employee)}
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
                {selectedEmployees.length}/{maxSelected} employees selected
                {selectedEmployees.length >= maxSelected && " (limit reached)"}
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Employees Display */}
      {selectedEmployees.length > 0 && (
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
                  onClick={() => removeEmployee(employee.employeeId)}
                  disabled={disabled}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
