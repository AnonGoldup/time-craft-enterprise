
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  useMultiDateSelection?: boolean;
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
  useMultiDateSelection = false
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="project">Project</Label>
        <Input
          id="project"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          placeholder="Select project"
        />
      </div>
      <div>
        <Label htmlFor="extra">Extra</Label>
        <Input
          id="extra"
          value={selectedExtra}
          onChange={(e) => setSelectedExtra(e.target.value)}
          placeholder="Select extra"
        />
      </div>
      <div>
        <Label htmlFor="costCode">Cost Code</Label>
        <Input
          id="costCode"
          value={selectedCostCode}
          onChange={(e) => setSelectedCostCode(e.target.value)}
          placeholder="Select cost code"
        />
      </div>
    </div>
  );
};

export default ProjectDetailsRow;
