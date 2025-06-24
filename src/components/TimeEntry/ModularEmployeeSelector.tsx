
"use client"

import * as React from "react"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { Employee } from "./types"
import { useModularEmployeeSelection } from "./hooks/useModularEmployeeSelection"
import { ModularEmployeeTrigger } from "./components/ModularEmployeeTrigger"
import { ModularEmployeeList } from "./components/ModularEmployeeList"
import { ModularSelectedBadges } from "./components/ModularSelectedBadges"

interface ModularEmployeeSelectorProps {
  employees: Employee[]
  selectedEmployees: Employee[]
  onEmployeeChange: (employees: Employee[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxSelected?: number
  groupByClass?: boolean
}

export function ModularEmployeeSelector({
  employees,
  selectedEmployees,
  onEmployeeChange,
  placeholder = "Select employees...",
  className,
  disabled = false,
  maxSelected,
  groupByClass = false,
}: ModularEmployeeSelectorProps) {
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
  } = useModularEmployeeSelection({
    employees,
    selectedEmployees,
    onEmployeeChange,
    maxSelected,
    groupByClass,
  })

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <ModularEmployeeTrigger
          selectedCount={selectedEmployees.length}
          displayText={formatSelectedText(placeholder)}
          onClearAll={clearAllEmployees}
          disabled={disabled}
          className={className}
        />
        <PopoverContent className="w-full p-0" align="start">
          <ModularEmployeeList
            groupedEmployees={groupedEmployees}
            selectedEmployeeIds={selectedEmployeeIds}
            onEmployeeSelect={handleEmployeeSelect}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            maxSelected={maxSelected}
            selectedCount={selectedEmployees.length}
            groupByClass={groupByClass}
          />
        </PopoverContent>
      </Popover>

      <ModularSelectedBadges
        selectedEmployees={selectedEmployees}
        onRemoveEmployee={removeEmployee}
        disabled={disabled}
      />
    </div>
  )
}
