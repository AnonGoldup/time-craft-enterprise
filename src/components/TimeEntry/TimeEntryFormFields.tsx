
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Project, CostCode, ProjectExtra } from "@/services/api";
import { EntryFormData } from "./EntryValidation";

interface TimeEntryFormFieldsProps {
  entry: EntryFormData;
  updateEntry: (id: number, field: string, value: string) => void;
  projects: Project[];
  projectExtras: { [key: string]: ProjectExtra[] };
  costCodes: { [key: string]: CostCode[] };
  setQuickHours: (entryId: number, hours: number) => void;
  userFullName?: string;
  canRemove: boolean;
  onRemove: (id: number) => void;
}

const TimeEntryFormFields: React.FC<TimeEntryFormFieldsProps> = ({
  entry,
  updateEntry,
  projects,
  projectExtras,
  costCodes,
  setQuickHours,
  userFullName,
  canRemove,
  onRemove
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium">Entry #{entry.id}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {entry.date}
          </Badge>
          {canRemove && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onRemove(entry.id)}
              className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      {/* Date and Employee */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`date-${entry.id}`} className="text-gray-300">Date *</Label>
          <Input
            id={`date-${entry.id}`}
            type="date"
            value={entry.date}
            onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
            className={`bg-white/10 border-white/20 text-white ${
              entry.errors.date ? 'border-red-400' : ''
            }`}
          />
          {entry.errors.date && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {entry.errors.date}
            </p>
          )}
        </div>
        <div>
          <Label className="text-gray-300">Employee</Label>
          <Input
            value={userFullName || ''}
            disabled
            className="bg-white/5 border-white/10 text-gray-400"
          />
        </div>
      </div>

      {/* Project Selection */}
      <div>
        <Label className="text-gray-300">Project *</Label>
        <Select 
          value={entry.projectID} 
          onValueChange={(value) => updateEntry(entry.id, 'projectID', value)}
        >
          <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
            entry.errors.projectID ? 'border-red-400' : ''
          }`}>
            <SelectValue placeholder="Select project..." />
          </SelectTrigger>
          <ProjectSelects
  projectCode={formData.projectCode}
  extraValue={formData.extraValue}
  costCodeId={formData.costCodeId}
  onProjectChange={(code) => setFormData({...formData, projectCode: code})}
  onExtraChange={(value) => setFormData({...formData, extraValue: value})}
  onCostCodeChange={(id) => setFormData({...formData, costCodeId: id})}
/>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.projectID} value={project.projectID.toString()}>
                {project.projectCode} - {project.projectDescription}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {entry.errors.projectID && (
          <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {entry.errors.projectID}
          </p>
        )}
      </div>

      {/* Project Extra and Cost Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Phase/Extra</Label>
          <Select 
            value={entry.extraID} 
            onValueChange={(value) => updateEntry(entry.id, 'extraID', value)}
            disabled={!entry.projectID}
          >
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select phase..." />
            </SelectTrigger>
            <SelectContent>
              {projectExtras[entry.projectID]?.map((extra) => (
                <SelectItem key={extra.extraID} value={extra.extraID.toString()}>
                  {extra.extraValue} - {extra.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-gray-300">Cost Code *</Label>
          <Select 
            value={entry.costCodeID} 
            onValueChange={(value) => updateEntry(entry.id, 'costCodeID', value)}
            disabled={!entry.projectID}
          >
            <SelectTrigger className={`bg-white/10 border-white/20 text-white ${
              entry.errors.costCodeID ? 'border-red-400' : ''
            }`}>
              <SelectValue placeholder="Select cost code..." />
            </SelectTrigger>
            <SelectContent>
              {costCodes[entry.projectID]?.map((code) => (
                <SelectItem key={code.costCodeID} value={code.costCodeID.toString()}>
                  {code.costCode} - {code.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {entry.errors.costCodeID && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {entry.errors.costCodeID}
            </p>
          )}
        </div>
      </div>

      {/* Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`standard-${entry.id}`} className="text-gray-300">Standard Hours</Label>
          <Input
            id={`standard-${entry.id}`}
            type="number"
            step="0.25"
            min="0"
            max="24"
            value={entry.standardHours}
            onChange={(e) => updateEntry(entry.id, 'standardHours', e.target.value)}
            className={`bg-white/10 border-white/20 text-white ${
              entry.errors.standardHours || entry.errors.hours ? 'border-red-400' : ''
            }`}
            placeholder="8.0"
          />
          {entry.errors.standardHours && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {entry.errors.standardHours}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor={`overtime-${entry.id}`} className="text-gray-300">Overtime Hours</Label>
          <Input
            id={`overtime-${entry.id}`}
            type="number"
            step="0.25"
            min="0"
            max="24"
            value={entry.overtimeHours}
            onChange={(e) => updateEntry(entry.id, 'overtimeHours', e.target.value)}
            className={`bg-white/10 border-white/20 text-white ${
              entry.errors.overtimeHours || entry.errors.hours ? 'border-red-400' : ''
            }`}
            placeholder="0.0"
          />
          {entry.errors.overtimeHours && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              {entry.errors.overtimeHours}
            </p>
          )}
        </div>
      </div>

      {/* Hours validation error */}
      {entry.errors.hours && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {entry.errors.hours}
        </p>
      )}

      {/* Quick Hour Buttons */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(entry.id, 8)}
          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
        >
          8 hrs
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(entry.id, 10)}
          className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
        >
          10 hrs
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setQuickHours(entry.id, 12)}
          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
        >
          12 hrs
        </Button>
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor={`notes-${entry.id}`} className="text-gray-300">Notes</Label>
        <Textarea
          id={`notes-${entry.id}`}
          value={entry.notes}
          onChange={(e) => updateEntry(entry.id, 'notes', e.target.value)}
          className="bg-white/10 border-white/20 text-white"
          placeholder="Add any additional notes..."
          rows={3}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default TimeEntryFormFields;
