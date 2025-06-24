
import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Employee } from "../types"

interface SelectedEmployeesBadgesProps {
  selectedEmployees: Employee[]
  onRemoveEmployee: (employeeId: string) => void
  disabled?: boolean
}

export function SelectedEmployeesBadges({
  selectedEmployees,
  onRemoveEmployee,
  disabled = false,
}: SelectedEmployeesBadgesProps) {
  if (selectedEmployees.length === 0) return null

  return (
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
              onClick={() => onRemoveEmployee(employee.employeeId)}
              disabled={disabled}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        </Badge>
      ))}
    </div>
  )
}
