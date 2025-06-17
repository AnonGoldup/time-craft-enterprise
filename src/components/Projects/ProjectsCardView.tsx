
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clipboard, Clock, Pen, User, Building } from 'lucide-react';
import { Project } from './types';
import { getStatusBadge, getHoursBadge } from './utils';

interface ProjectsCardViewProps {
  projects: Project[];
  isAdmin: boolean;
  onIconClick: (action: string, projectId: string) => void;
  onProjectClick: (projectId: string) => void;
}

export const ProjectsCardView: React.FC<ProjectsCardViewProps> = ({
  projects,
  isAdmin,
  onIconClick,
  onProjectClick,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          className="bg-card border-border cursor-pointer hover:border-border/60 transition-colors"
          onClick={() => onProjectClick(project.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{project.code}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{project.name}</p>
              </div>
              {getStatusBadge(project.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="text-sm">{project.manager}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="h-4 w-4" />
              <span className="text-sm">{project.category}</span>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Est. Hours {project.estimatedHours}</div>
              {getHoursBadge(project.actualHours, project.estimatedHours)}
            </div>
            <div className="flex items-center gap-2 pt-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onIconClick('daily-reports', project.id);
                }}
                className="flex-1"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                Reports
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onIconClick('time-log', project.id);
                }}
                className="flex-1"
              >
                <Clock className="h-4 w-4 mr-2" />
                Time Log
              </Button>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIconClick('edit', project.id);
                  }}
                >
                  <Pen className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
