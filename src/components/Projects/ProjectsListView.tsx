
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Clipboard, Clock, Pen, User } from 'lucide-react';
import { Project } from './types';
import { getStatusBadge, getHoursBadge } from './utils';

interface ProjectsListViewProps {
  projects: Project[];
  isAdmin: boolean;
  onIconClick: (action: string, projectId: string) => void;
}

export const ProjectsListView: React.FC<ProjectsListViewProps> = ({
  projects,
  isAdmin,
  onIconClick,
}) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Manager</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{project.code} - {project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.category}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {project.manager}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(project.status)}</TableCell>
              <TableCell>
                <div>
                  <div className="text-sm text-muted-foreground">Est. Hours {project.estimatedHours}</div>
                  {getHoursBadge(project.actualHours, project.estimatedHours)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onIconClick('daily-reports', project.id)}
                    className="h-8 w-8"
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onIconClick('time-log', project.id)}
                    className="h-8 w-8"
                  >
                    <Clock className="h-4 w-4" />
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onIconClick('edit', project.id)}
                      className="h-8 w-8"
                    >
                      <Pen className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
