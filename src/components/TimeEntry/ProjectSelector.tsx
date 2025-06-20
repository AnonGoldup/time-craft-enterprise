// src/components/TimeEntry/ProjectSelector.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/services/api';

interface Project {
  projectId: number;
  projectCode: string;
  projectDescription: string;
  status: string;
  isActive: boolean;
}

interface ProjectSelectorProps {
  value?: number;
  onChange: (projectId: number, project: Project) => void;
  disabled?: boolean;
  className?: string;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  className
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/projects?active=true');
      setProjects(response.data);
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback((projectId: string) => {
    const numericId = parseInt(projectId, 10);
    const selectedProject = projects.find(p => p.projectId === numericId);
    
    if (selectedProject) {
      onChange(numericId, selectedProject);
    }
  }, [projects, onChange]);

  if (loading) return <div className="animate-pulse h-10 bg-gray-200 rounded" />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Select 
      value={value?.toString()} 
      onValueChange={handleChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        {projects.map((project) => (
          <SelectItem 
            key={project.projectId} 
            value={project.projectId.toString()}
          >
            {project.projectCode} - {project.projectDescription}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
