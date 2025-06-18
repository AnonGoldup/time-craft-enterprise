
import React from 'react';
import { Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Project } from '@/services/api';

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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-blue-500" />
        <span className="text-sm text-slate-600 dark:text-slate-400">Project</span>
      </div>
      <Select value={selectedProject} onValueChange={setSelectedProject}>
        <SelectTrigger className="w-48 border-slate-300 dark:border-slate-600">
          <SelectValue placeholder="Select project..." />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          {projects.map((project) => (
            <SelectItem key={project.projectID} value={project.projectID.toString()}>
              {project.projectCode} - {project.projectDescription}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProjectSelector;
