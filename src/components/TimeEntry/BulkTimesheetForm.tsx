
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { MultiDatePicker } from "./MultiDatePicker"
import { MultiEmployeeSelector } from "./MultiEmployeeSelector"
import { BulkTimesheetFormProps, Employee, TimesheetEntry } from "./types"
import { bulkTimeEntrySchema, BulkTimeEntryFormValues, validateEmployees } from "./validation"

export function BulkTimesheetForm({
  employees,
  projects,
  costCodes,
  onSubmit,
  currentUser,
  userRole = 'EMPLOYEE',
}: BulkTimesheetFormProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  
  const isAdmin = userRole === 'ADMIN'
  const validEmployees = React.useMemo(() => validateEmployees(employees), [employees])
  
  // Get default employee selection
  const getDefaultEmployees = React.useCallback((): Employee[] => {
    if (currentUser && validEmployees.some(emp => emp.employeeId === currentUser.employeeId)) {
      return [currentUser as Employee]
    }
    return []
  }, [currentUser, validEmployees])

  const form = useForm<BulkTimeEntryFormValues>({
    resolver: zodResolver(bulkTimeEntrySchema),
    defaultValues: {
      selectedEmployees: getDefaultEmployees(),
      selectedDates: [],
      projectId: "",
      costCodeId: "",
      standardHours: 8,
      overtimeHours: 0,
      notes: "",
    },
  })

  const watchedEmployees = form.watch("selectedEmployees")
  const watchedDates = form.watch("selectedDates")
  const totalEntries = watchedEmployees.length * watchedDates.length

  const handleFormSubmit = async (values: BulkTimeEntryFormValues) => {
    setIsLoading(true)
    
    try {
      const entries: TimesheetEntry[] = []
      
      values.selectedEmployees.forEach(employee => {
        values.selectedDates.forEach(date => {
          // Create standard hours entry if > 0
          if (values.standardHours > 0) {
            entries.push({
              employeeId: employee.employeeId,
              dateWorked: date.toISOString().split('T')[0],
              projectId: parseInt(values.projectId),
              costCodeId: parseInt(values.costCodeId),
              standardHours: values.standardHours,
              overtimeHours: 0,
              notes: isAdmin ? 
                `${values.notes || ''} [Admin Entry by ${currentUser?.employeeId || 'SYSTEM'}]`.trim() :
                values.notes,
            })
          }
          
          // Create overtime entry if > 0
          if (values.overtimeHours > 0) {
            entries.push({
              employeeId: employee.employeeId,
              dateWorked: date.toISOString().split('T')[0],
              projectId: parseInt(values.projectId),
              costCodeId: parseInt(values.costCodeId),
              standardHours: 0,
              overtimeHours: values.overtimeHours,
              notes: isAdmin ? 
                `${values.notes || ''} [Admin Entry by ${currentUser?.employeeId || 'SYSTEM'}]`.trim() :
                values.notes,
            })
          }
        })
      })

      await onSubmit(entries)
      
      toast.success(`Successfully created ${entries.length} timesheet entries`)
      
      // Reset form
      form.reset({
        selectedEmployees: getDefaultEmployees(),
        selectedDates: [],
        projectId: "",
        costCodeId: "",
        standardHours: 8,
        overtimeHours: 0,
        notes: "",
      })
      
    } catch (error) {
      toast.error("Failed to create timesheet entries")
      console.error("Timesheet entry error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Bulk Time Entry
          {totalEntries > 1 && (
            <Badge variant="outline">
              {totalEntries} entries will be created
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Create multiple timesheet entries efficiently for multiple employees and dates.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            
            {/* Employee Selection */}
            <FormField
              control={form.control}
              name="selectedEmployees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Employees</FormLabel>
                  <FormControl>
                    <MultiEmployeeSelector
                      employees={validEmployees}
                      selectedEmployees={field.value}
                      onEmployeeChange={field.onChange}
                      placeholder="Select employees..."
                      groupByClass={true}
                      searchPlaceholder="Search by name, ID, or job class..."
                    />
                  </FormControl>
                  <FormDescription>
                    Select one or more employees to create timesheet entries for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Selection */}
            <FormField
              control={form.control}
              name="selectedDates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date(s) Worked</FormLabel>
                  <FormControl>
                    <MultiDatePicker
                      selectedDates={field.value}
                      onDateChange={field.onChange}
                      placeholder="Select dates worked..."
                    />
                  </FormControl>
                  <FormDescription>
                    Select the date(s) when work was performed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Project and Cost Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects
                          .filter(project => project.isActive)
                          .map((project) => (
                            <SelectItem 
                              key={project.projectId} 
                              value={project.projectId.toString()}
                            >
                              {project.projectCode} - {project.projectDescription}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="costCodeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Code</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cost code" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {costCodes.map((costCode) => (
                          <SelectItem 
                            key={costCode.costCodeId} 
                            value={costCode.costCodeId.toString()}
                          >
                            {costCode.costCode} - {costCode.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="standardHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.25"
                        min="0"
                        max="16"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Hours in quarter-hour increments
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="overtimeHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overtime Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.25"
                        min="0"
                        max="16"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      Overtime hours (separate entry will be created)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional notes..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  {isAdmin && (
                    <FormDescription>
                      All entries will be marked as admin entries.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            {totalEntries > 0 && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Entry Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Employees:</span>
                    <div className="font-medium">{watchedEmployees.length}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dates:</span>
                    <div className="font-medium">{watchedDates.length}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Entries:</span>
                    <div className="font-medium">{totalEntries}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">User Role:</span>
                    <div className="font-medium">{userRole}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isLoading}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isLoading || totalEntries === 0}>
                {isLoading ? "Creating Entries..." : `Create ${totalEntries} Entries`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
