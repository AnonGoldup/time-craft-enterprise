
"use client"

import * as React from "react"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { Employee } from "./types"
import { useEmployeeSelection } from "./hooks/useEmployeeSelection"
import { EmployeeSelectionTrigger } from "./components/EmployeeSelectionTrigger"
import { EmployeeSelectionList } from "./components/EmployeeSelectionList"
import { SelectedEmployeesBadges } from "./components/SelectedEmployeesBadges"

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
  })

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
  )
}
