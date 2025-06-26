// src/components/TimeEntry/ProjectSelector.tsx
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projectApi, Project, ProjectExtra, CostCode } from '@/services/api';

interface ProjectSelectorProps {
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  projects: Project[];
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  selectedProject,
  setSelectedProject,
  projects
}) => {
  return (
    <div className="flex-1 min-w-[200px]">
      <label className="block text-sm font-medium mb-1 text-foreground">
        Project
      </label>
      <Select value={selectedProject} onValueChange={setSelectedProject}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select project..." />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.ProjectCode} value={project.ProjectCode}>
              {project.ProjectCode} - {project.ProjectDescription}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectSelector;

// Also export the ProjectSelects component for other uses
export function ProjectSelects({
  projectCode,
  extraValue,
  costCodeId,
  onProjectChange,
  onExtraChange,
  onCostCodeChange
}: {
  projectCode?: string;
  extraValue?: string;
  costCodeId?: number;
  onProjectChange: (code: string) => void;
  onExtraChange: (value: string) => void;
  onCostCodeChange: (id: number) => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [extras, setExtras] = useState<ProjectExtra[]>([]);
  const [costCodes, setCostCodes] = useState<CostCode[]>([]);
  const [loading, setLoading] = useState({
    projects: true,
    extras: false,
    costCodes: false
  });

  // Fetch all projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch extras when project changes
  useEffect(() => {
    if (projectCode) {
      fetchExtras(projectCode);
    } else {
      setExtras([]);
      setCostCodes([]);
    }
  }, [projectCode]);

  // Fetch cost codes when project or extra changes
  useEffect(() => {
    if (projectCode) {
      fetchCostCodes(projectCode, extraValue);
    }
  }, [projectCode, extraValue]);

  const fetchProjects = async () => {
    try {
      const response = await projectApi.getAll();
      setProjects(response.data.data || response.data);
      setLoading(prev => ({ ...prev, projects: false }));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  const fetchExtras = async (code: string) => {
    setLoading(prev => ({ ...prev, extras: true }));
    try {
      const response = await projectApi.getExtras(code);
      setExtras(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch extras:', error);
      setExtras([]);
    }
    setLoading(prev => ({ ...prev, extras: false }));
  };

  const fetchCostCodes = async (code: string, extra?: string) => {
    setLoading(prev => ({ ...prev, costCodes: true }));
    try {
      const response = await projectApi.getCostCodes(code, extra);
      setCostCodes(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch cost codes:', error);
      setCostCodes([]);
    }
    setLoading(prev => ({ ...prev, costCodes: false }));
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Project Dropdown */}
      <Select 
        value={projectCode} 
        onValueChange={(value) => {
          onProjectChange(value);
          onExtraChange(''); // Reset extra
          onCostCodeChange(0); // Reset cost code
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={loading.projects ? "Loading..." : "Select project"} />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.ProjectCode} value={project.ProjectCode}>
              {project.ProjectCode} - {project.ProjectDescription}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Extra Dropdown */}
      <Select 
        value={extraValue} 
        onValueChange={(value) => {
          onExtraChange(value);
          onCostCodeChange(0); // Reset cost code
        }}
        disabled={!projectCode || loading.extras}
      >
        <SelectTrigger>
          <SelectValue placeholder={loading.extras ? "Loading..." : "Select extra (optional)"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">No Extra</SelectItem>
          {extras.map((extra) => (
            <SelectItem key={extra.ExtraID} value={extra.ExtraValue}>
              {extra.ExtraValue} - {extra.Description || ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Cost Code Dropdown */}
      <Select 
        value={costCodeId?.toString()} 
        onValueChange={(value) => onCostCodeChange(parseInt(value))}
        disabled={!projectCode || loading.costCodes}
      >
        <SelectTrigger>
          <SelectValue placeholder={loading.costCodes ? "Loading..." : "Select cost code"} />
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
  );
}
