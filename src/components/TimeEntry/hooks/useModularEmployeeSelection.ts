
import { useState, useMemo } from "react"
import { Employee } from "../types"

interface UseModularEmployeeSelectionProps {
  employees: Employee[]
  selectedEmployees: Employee[]
  onEmployeeChange: (employees: Employee[]) => void
  maxSelected?: number
  groupByClass?: boolean
}

export function useModularEmployeeSelection({
  employees,
  selectedEmployees,
  onEmployeeChange,
  maxSelected,
  groupByClass = false,
}: UseModularEmployeeSelectionProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const selectedEmployeeIds = new Set(selectedEmployees.map(emp => emp.employeeId))

  const filteredEmployees = useMemo(() => {
    if (!searchValue) return employees

    return employees.filter(employee =>
      employee.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchValue.toLowerCase()) ||
      employee.class?.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [employees, searchValue])

  const groupedEmployees = useMemo(() => {
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
      const newSelection = selectedEmployees.filter(emp => emp.employeeId !== employee.employeeId)
      onEmployeeChange(newSelection)
    } else {
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

  const formatSelectedText = (placeholder: string) => {
    if (selectedEmployees.length === 0) return placeholder
    if (selectedEmployees.length === 1) return selectedEmployees[0].fullName
    return `${selectedEmployees.length} employees selected`
  }

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
  }
}
