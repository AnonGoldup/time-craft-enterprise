import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Project, CostCode, ProjectExtra } from "@/services/api";
import { ProjectSelects } from "./ProjectSelector";
import { EntryFormData } from "./EntryValidation";

interface TimeEntryFormFieldsProps {
  entry: EntryFormData;
  updateEntry: (id: number, field: string, value: string) => void;
  projects: Project[];
  projectExtras: ProjectExtra[];
  costCodes: CostCode[];
  employees: any[];
  selectedEmployees: string[];
  removeEntry: (id: number) => void;
  formData: any;
  setFormData: (data: any) => void;
}

export default function TimeEntryFormFields({
  entry,
  updateEntry,
  projects,
  projectExtras,
  costCodes,
  employees,
  selectedEmployees,
  removeEntry,
  formData,
  setFormData
}: TimeEntryFormFieldsProps) {
  return (
    <div className="bg-white/5 border border-white/20 rounded-lg p-6 space-y-6">
      {/* Employee Selection */}
      <div>
        <Label className="text-white text-sm font-medium">
          Employee
        </Label>
        <Select 
          value={entry.employeeID} 
          onValueChange={(value) => updateEntry(entry.id, 'employeeID', value)}
        >
          <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
            entry.errors.employeeID ? 'border-red-400' : ''
          }`}>
            <SelectValue placeholder="Select employee..." />
          </SelectTrigger>
          <SelectContent>
            {selectedEmployees.map((employeeId) => {
              const employee = employees.find(emp => emp.EmployeeID === employeeId);
              if (!employee) return null;
              return (
                <SelectItem key={employee.EmployeeID} value={employee.EmployeeID}>
                  {employee.FullName} ({employee.Class})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {entry.errors.employeeID && (
          <div className="flex items-center mt-1 text-red-400">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span className="text-sm">{entry.errors.employeeID}</span>
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div>
        <Label className="text-white text-sm font-medium">
          Date Worked
        </Label>
        <Input
          type="date"
          value={entry.dateWorked}
          onChange={(e) => updateEntry(entry.id, 'dateWorked', e.target.value)}
          className={`bg-white/10 border-white/20 text-white ${
            entry.errors.dateWorked ? 'border-red-400' : ''
          }`}
        />
        {entry.errors.dateWorked && (
          <div className="flex items-center mt-1 text-red-400">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span className="text-sm">{entry.errors.dateWorked}</span>
          </div>
        )}
      </div>

      {/* Project Selection - Grid Layout */}
      <div>
        <Label className="text-white text-sm font-medium mb-3 block">
          Project Details
        </Label>
        
        {/* Project Dropdown */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <Select 
            value={entry.projectID?.toString()} 
            onValueChange={(value) => updateEntry(entry.id, 'projectID', value)}
          >
            <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
              entry.errors.projectID ? 'border-red-400' : ''
            }`}>
              <SelectValue placeholder="Select project..." />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.ProjectID} value={project.ProjectID.toString()}>
                  {project.ProjectCode} - {project.ProjectDescription}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Extra Selection */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <Select 
            value={entry.extraID?.toString()} 
            onValueChange={(value) => updateEntry(entry.id, 'extraID', value)}
            disabled={!entry.projectID || projectExtras.length === 0}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select extra (optional)..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Extra</SelectItem>
              {projectExtras.map((extra) => (
                <SelectItem key={extra.ExtraID} value={extra.ExtraID.toString()}>
                  {extra.ExtraValue} - {extra.Description || ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Cost Code Selection */}
        <div className="grid grid-cols-1 gap-4">
          <Select 
            value={entry.costCodeID?.toString()} 
            onValueChange={(value) => updateEntry(entry.id, 'costCodeID', value)}
            disabled={!entry.projectID || costCodes.length === 0}
          >
            <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
              entry.errors.costCodeID ? 'border-red-400' : ''
            }`}>
              <SelectValue placeholder="Select cost code..." />
            </SelectTrigger>
            <SelectContent>
              {costCodes.map((costCode) => (
                <SelectItem key={costCode.CostCodeID} value={costCode.CostCodeID.toString()}>
                  {costCode.CostCode} - {costCode.Description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {entry.errors.projectID && (
          <div className="flex items-center mt-1 text-red-400">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span className="text-sm">{entry.errors.projectID}</span>
          </div>
        )}
        {entry.errors.costCodeID && (
          <div className="flex items-center mt-1 text-red-400">
            <AlertTriangle className="w-4 h-4 mr-1" />
            <span className="text-sm">{entry.errors.costCodeID}</span>
          </div>
        )}
      </div>

      {/* Hours Input */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-white text-sm font-medium">
            Standard Hours
          </Label>
          <Input
            type="number"
            step="0.25"
            min="0"
            max="24"
            value={entry.hours || ''}
            onChange={(e) => updateEntry(entry.id, 'hours', e.target.value)}
            className={`bg-white/10 border-white/20 text-white ${
              entry.errors.hours ? 'border-red-400' : ''
            }`}
            placeholder="8.0"
          />
          {entry.errors.hours && (
            <div className="flex items-center mt-1 text-red-400">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span className="text-sm">{entry.errors.hours}</span>
            </div>
          )}
        </div>

        <div>
          <Label className="text-white text-sm font-medium">
            Pay Type
          </Label>
          <Select 
            value={entry.payID?.toString() || '1'} 
            onValueChange={(value) => updateEntry(entry.id, 'payID', value)}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select pay type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Standard Time</SelectItem>
              <SelectItem value="2">Overtime</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <Label className="text-white text-sm font-medium">
          Notes (Optional)
        </Label>
        <Textarea
          value={entry.notes || ''}
          onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="Add any additional notes..."
          rows={3}
        />
      </div>

      {/* Entry Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-white/20">
        <div className="flex gap-2">
          {entry.status && (
            <Badge variant={entry.status === 'Valid' ? 'default' : 'destructive'}>
              {entry.status}
            </Badge>
          )}
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => removeEntry(entry.id)}
          className="bg-red-600 hover:bg-red-700"
        >
          Remove Entry
        </Button>
      </div>
    </div>
  );
}