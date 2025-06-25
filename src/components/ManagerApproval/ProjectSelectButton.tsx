
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProjectGroup } from './types';
import { cn } from './utils';

interface ProjectSelectButtonProps {
  group: ProjectGroup;
  projectCode: string;
  selectedSubmissions: Set<number>;
  onSelectAllInProject: (projectCode: string) => void;
}

export const ProjectSelectButton: React.FC<ProjectSelectButtonProps> = ({
  group,
  projectCode,
  selectedSubmissions,
  onSelectAllInProject
}) => {
  const projectSubmissionIds = group.submissions.map(sub => sub.id);
  const allSelected = projectSubmissionIds.every(id => selectedSubmissions.has(id));
  const someSelected = projectSubmissionIds.some(id => selectedSubmissions.has(id));

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={() => onSelectAllInProject(projectCode)} 
      className={cn(
        "text-blue-700 border-blue-300", 
        allSelected ? "bg-blue-100" : someSelected ? "bg-blue-50" : "hover:bg-blue-50"
      )}
    >
      <input 
        type="checkbox" 
        checked={allSelected} 
        ref={el => {
          if (el) el.indeterminate = someSelected && !allSelected;
        }} 
        readOnly 
        className="mr-2" 
      />
      {allSelected ? 'Deselect All' : 'Select All'}
    </Button>
  );
};
