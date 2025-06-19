
import React from 'react';
import ProjectSelector from './ProjectSelector';
import ExtraSelector from './ExtraSelector';
import CostCodeSelector from './CostCodeSelector';
import DateSelector from './DateSelector';
import EmployeeSelector from './EmployeeSelector';
import { useProjectData } from './hooks/useProjectData';

interface ProjectDetailsRowProps {
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  selectedExtra: string;
  setSelectedExtra: (value: string) => void;
  selectedCostCode: string;
  setSelectedCostCode: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedDates?: Date[];
  setSelectedDates?: (dates: Date[]) => void;
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedEmployees?: string[];
  setSelectedEmployees?: (value: string[]) => void;
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
  selectedDates = [],
  setSelectedDates,
  selectedEmployee,
  setSelectedEmployee,
  selectedEmployees = [],
  setSelectedEmployees,
  useCostCodeInput = false,
  useMultiDateSelection = false
}) => {
  const { projects, projectExtras, costCodes, loading } = useProjectData(selectedProject, selectedExtra);

  const handleProjectChange = (value: string) => {
    console.log('Project changed to:', value);
    setSelectedProject(value);
    setSelectedExtra('');
    setSelectedCostCode('');
  };

  const handleExtraChange = (value: string) => {
    console.log('Extra changed to:', value);
    setSelectedExtra(value);
  };

  const handleCostCodeChange = (value: string) => {
    console.log('Cost code changed to:', value);
    setSelectedCostCode(value);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-6 flex-wrap">
        <div className="text-sm text-muted-foreground">Loading project data...</div>
      </div>
    );
  }

  console.log('ProjectDetailsRow - projects available:', projects?.length || 0);
  console.log('ProjectDetailsRow - selectedProject:', selectedProject);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-6 flex-wrap">
        <ProjectSelector
          selectedProject={selectedProject}
          setSelectedProject={handleProjectChange}
          projects={projects || []}
        />

        <ExtraSelector
          selectedExtra={selectedExtra}
          setSelectedExtra={handleExtraChange}
          projectExtras={projectExtras || []}
          disabled={!selectedProject}
        />

        <CostCodeSelector
          selectedCostCode={selectedCostCode}
          setSelectedCostCode={handleCostCodeChange}
          costCodes={costCodes || []}
          disabled={!selectedProject}
          useCostCodeInput={useCostCodeInput}
        />

        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          useMultiDateSelection={useMultiDateSelection}
        />

        <EmployeeSelector
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
        />
      </div>
    </div>
  );
};

export default ProjectDetailsRow;
