
"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ModularMultiDatePickerProps {
  selectedDates?: Date[]
  onDateChange: (dates: Date[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxDates?: number
  allowFutureDates?: boolean
}

export function ModularMultiDatePicker({
  selectedDates = [],
  onDateChange,
  placeholder = "Select dates...",
  className,
  disabled = false,
  maxDates,
  allowFutureDates = false,
}: ModularMultiDatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      onDateChange(Array.from(dates).sort((a, b) => a.getTime() - b.getTime()))
    }
  }

  const removeDateAtIndex = (indexToRemove: number) => {
    const newDates = selectedDates.filter((_, index) => index !== indexToRemove)
    onDateChange(newDates)
  }

  const clearAllDates = () => {
    onDateChange([])
  }

  const formatSelectedDatesText = () => {
    if (selectedDates.length === 0) return placeholder
    if (selectedDates.length === 1) return format(selectedDates[0], "PPP")
    return `${selectedDates.length} dates selected`
  }

  const isFutureDate = (date: Date) => {
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    return date > today
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDates.length && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatSelectedDatesText()}
            {selectedDates.length > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  clearAllDates()
                }}
              >
                {selectedDates.length}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (!allowFutureDates && isFutureDate(date)) return true
              
              if (maxDates && selectedDates.length >= maxDates) {
                const isAlreadySelected = selectedDates.some(
                  (selectedDate) => format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                )
                return !isAlreadySelected
              }
              
              return false
            }}
            className="rounded-md border"
          />
          {maxDates && (
            <div className="p-3 border-t text-xs text-muted-foreground text-center">
              {selectedDates.length}/{maxDates} dates selected
              {selectedDates.length >= maxDates && " (limit reached)"}
            </div>
          )}
        </PopoverContent>
      </Popover>

      {selectedDates.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedDates.map((date, index) => (
            <Badge
              key={format(date, 'yyyy-MM-dd')}
              variant="outline"
              className="text-xs px-2 py-1"
            >
              {format(date, "MMM dd, yyyy")}
              <button
                type="button"
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => removeDateAtIndex(index)}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
