
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Users, Building2 } from 'lucide-react';

interface ProjectDetailsRowProps {
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedExtra: string;
  setSelectedExtra: (value: string) => void;
  selectedCostCode: string;
  setSelectedCostCode: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  useCostCodeInput?: boolean;
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
  useCostCodeInput = false
}) => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[60px]">Project:</span>
        <Input
          placeholder="Select project..."
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-48 border-slate-300 dark:border-slate-600"
        />
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-green-500 rounded flex items-center justify-center">
          <span className="text-green-500 text-xs font-bold">E</span>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Extra:</span>
        <Select value={selectedExtra} onValueChange={setSelectedExtra}>
          <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="Select extra..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="phase1">Phase 1</SelectItem>
            <SelectItem value="phase2">Phase 2</SelectItem>
            <SelectItem value="phase3">Phase 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 border-2 border-blue-500 rounded flex items-center justify-center">
          <span className="text-blue-500 text-xs font-bold">C</span>
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[80px]">Cost Code:</span>
        {useCostCodeInput ? (
          <Input
            placeholder="Select code..."
            value={selectedCostCode}
            onChange={(e) => setSelectedCostCode(e.target.value)}
            className="w-48 border-slate-300 dark:border-slate-600"
          />
        ) : (
          <Select value={selectedCostCode} onValueChange={setSelectedCostCode}>
            <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
              <SelectValue placeholder="Select code..." />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <SelectItem value="labor">Labor</SelectItem>
              <SelectItem value="materials">Materials</SelectItem>
              <SelectItem value="equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[40px]">Date:</span>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-36 border-slate-300 dark:border-slate-600"
        />
      </div>

      <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>

      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400 min-w-[70px]">Employee:</span>
        <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
          <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
            <SelectValue placeholder="Select employee..." />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <SelectItem value="john-doe">John Doe</SelectItem>
            <SelectItem value="jane-smith">Jane Smith</SelectItem>
            <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectDetailsRow;
