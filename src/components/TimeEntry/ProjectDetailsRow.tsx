
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { CalendarIcon, MoreVertical, X, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ProjectDetailsRowProps {
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedExtra: string;
  setSelectedExtra: (value: string) => void;
  selectedCostCode: string;
  setSelectedCostCode: (value: string) => void;
  selectedDate: string | string[];
  setSelectedDate: (value: string | string[]) => void;
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  useCostCodeInput?: boolean;
  multiDateMode?: boolean;
  onCopyPreviousDay?: () => void;
  onCopyPreviousWeek?: () => void;
  onAddMultipleEntries?: () => void;
}

const ProjectDetailsRow: React.FC<ProjectDetailsRowProps> = ({
  selectedProject,
  setSelectedProject,
  selectedExtra,
  setSelectedExtra,
  selectedCostCode,
  setSelectedCostCode,
  selectedDate,
  setSelectedDate,
  selectedEmployee,
  setSelectedEmployee,
  useCostCodeInput = false,
  multiDateMode = false,
  onCopyPreviousDay,
  onCopyPreviousWeek,
  onAddMultipleEntries
}) => {
  const projects = [
    { code: "PROJ001", name: "Office Building Renovation" },
    { code: "PROJ002", name: "Shopping Mall Construction" },
    { code: "PROJ003", name: "Residential Complex" }
  ];

  const extras = [
    { code: "E1", name: "Phase 1" },
    { code: "E2", name: "Phase 2" },
    { code: "E3", name: "Phase 3" }
  ];

  const costCodes = [
    { code: "LAB001", name: "General Labor" },
    { code: "EQP001", name: "Equipment Operation" },
    { code: "MAT001", name: "Material Handling" }
  ];

  const employees = [
    { id: "EMP001", name: "John Doe" },
    { id: "EMP002", name: "Jane Smith" },
    { id: "EMP003", name: "Mike Johnson" }
  ];

  const parseSelectedDates = (): Date[] => {
    if (Array.isArray(selectedDate)) {
      return selectedDate.map(d => new Date(d));
    }
    return selectedDate ? [new Date(selectedDate)] : [];
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (multiDateMode) {
      const currentDates = parseSelectedDates();
      const dateStr = date.toISOString().split('T')[0];
      
      if (Array.isArray(selectedDate)) {
        const exists = selectedDate.includes(dateStr);
        if (exists) {
          setSelectedDate(selectedDate.filter(d => d !== dateStr));
        } else {
          setSelectedDate([...selectedDate, dateStr]);
        }
      } else {
        setSelectedDate([dateStr]);
      }
    } else {
      setSelectedDate(date.toISOString().split('T')[0]);
    }
  };

  const formatDateDisplay = () => {
    if (Array.isArray(selectedDate)) {
      if (selectedDate.length === 0) return "Select dates...";
      if (selectedDate.length === 1) return format(new Date(selectedDate[0]), "PPP");
      return `${selectedDate.length} dates selected`;
    }
    return selectedDate ? format(new Date(selectedDate), "PPP") : "Select date...";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Date Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm text-slate-600 dark:text-slate-400">
            Date {multiDateMode && "(Multiple)"}
          </Label>
          <div className="flex items-center gap-1">
            {onAddMultipleEntries && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddMultipleEntries}
                className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-slate-500 hover:text-slate-700"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                {onCopyPreviousDay && (
                  <ContextMenuItem onClick={onCopyPreviousDay}>
                    Copy previous day
                  </ContextMenuItem>
                )}
                {onCopyPreviousWeek && (
                  <ContextMenuItem onClick={onCopyPreviousWeek}>
                    Copy previous week
                  </ContextMenuItem>
                )}
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border-slate-300 dark:border-slate-600",
                (!selectedDate || (Array.isArray(selectedDate) && selectedDate.length === 0)) && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateDisplay()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode={multiDateMode ? "multiple" : "single"}
              selected={multiDateMode ? parseSelectedDates() : (selectedDate ? new Date(selectedDate as string) : undefined)}
              onSelect={handleDateSelect}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Employee Selection */}
      <div className="space-y-2">
        <Label className="text-sm text-slate-600 dark:text-slate-400">Employee</Label>
        <div className="flex gap-1">
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select employee..." />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedEmployee("")}
            className="px-2 border-slate-300 dark:border-slate-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Project Selection */}
      <div className="space-y-2">
        <Label className="text-sm text-slate-600 dark:text-slate-400">Project</Label>
        <div className="flex gap-1">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select project..." />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.code} value={project.code}>
                  {project.code} - {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedProject("")}
            className="px-2 border-slate-300 dark:border-slate-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Extra Selection */}
      <div className="space-y-2">
        <Label className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <span className="bg-emerald-500 text-white text-xs rounded px-1">E</span>
          Extra
        </Label>
        <div className="flex gap-1">
          <Select value={selectedExtra} onValueChange={setSelectedExtra}>
            <SelectTrigger className="border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select extra..." />
            </SelectTrigger>
            <SelectContent>
              {extras.map((extra) => (
                <SelectItem key={extra.code} value={extra.code}>
                  {extra.code} - {extra.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedExtra("")}
            className="px-2 border-slate-300 dark:border-slate-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Cost Code Selection */}
      <div className="space-y-2">
        <Label className="text-sm text-slate-600 dark:text-slate-400">Cost Code</Label>
        <div className="flex gap-1">
          {useCostCodeInput ? (
            <Input
              placeholder="Enter cost code..."
              value={selectedCostCode}
              onChange={(e) => setSelectedCostCode(e.target.value)}
              className="border-slate-300 dark:border-slate-600"
            />
          ) : (
            <Select value={selectedCostCode} onValueChange={setSelectedCostCode}>
              <SelectTrigger className="border-slate-300 dark:border-slate-600">
                <SelectValue placeholder="Select cost code..." />
              </SelectTrigger>
              <SelectContent>
                {costCodes.map((code) => (
                  <SelectItem key={code.code} value={code.code}>
                    {code.code} - {code.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedCostCode("")}
            className="px-2 border-slate-300 dark:border-slate-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsRow;
