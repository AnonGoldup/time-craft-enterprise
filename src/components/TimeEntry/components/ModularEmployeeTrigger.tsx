
import * as React from "react"
import { ChevronsUpDown, Users, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface ModularEmployeeTriggerProps {
  selectedCount: number
  displayText: string
  onClearAll: () => void
  disabled?: boolean
  className?: string
}

export function ModularEmployeeTrigger({
  selectedCount,
  displayText,
  onClearAll,
  disabled = false,
  className,
}: ModularEmployeeTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        className={cn(
          "w-full justify-between text-left font-normal",
          !selectedCount && "text-muted-foreground",
          className
        )}
        disabled={disabled}
      >
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          {displayText}
        </div>
        <div className="flex items-center space-x-1">
          {selectedCount > 0 && (
            <Badge 
              variant="secondary"
              className="mr-1"
              onClick={(e) => {
                e.stopPropagation()
                onClearAll()
              }}
            >
              {selectedCount}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          )}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </Button>
    </PopoverTrigger>
  )
}
