
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
<<<<<<< HEAD
=======
  const { projects, employees, projectExtras, costCodes } = useProjectData(selectedProject, selectedExtra);
  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectApi.getAll(); // Use getAll instead of getActive
      // Check if response.data is an array or has a data property
      const projectsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || []);
      setProjects(projectsData.filter(p => p.IsActive || p.isActive));
    } catch (error) {
      console.error('Failed to load projects:', error);
      // Keep the fallback data
      setProjects([
        { ProjectID: 1, ProjectCode: "21-0075", ProjectDescription: "Kamloops RCMP IPD", Status: "Active", IsActive: true },
        { ProjectID: 2, ProjectCode: "22-0003", ProjectDescription: "Highland Building Maintenance", Status: "Active", IsActive: true }
      ]);
    } finally {
      setLoading(false);
    }
  };
  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
    setSelectedExtra('');
    setSelectedCostCode('');
  };

>>>>>>> f0a0cdd (feat: Complete Phase 1 - Frontend UI Implementation)
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
