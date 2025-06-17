
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clipboard, Clock, Pen } from 'lucide-react';
import { Project } from './types';
import { getStatusBadge } from './utils';

interface ProjectsTileViewProps {
  projects: Project[];
  isAdmin: boolean;
  onIconClick: (action: string, projectId: string) => void;
  onProjectClick: (projectId: string) => void;
}

export const ProjectsTileView: React.FC<ProjectsTileViewProps> = ({
  projects,
  isAdmin,
  onIconClick,
  onProjectClick,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {projects.map((project) => (
        <Card 
          key={project.id} 
          className="bg-card border-border hover:border-border/60 transition-colors cursor-pointer"
          onClick={() => onProjectClick(project.id)}
        >
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="text-sm font-medium">{project.code}</div>
              <div className="text-xs text-muted-foreground truncate">{project.name}</div>
              {getStatusBadge(project.status)}
              <div className="flex justify-center gap-1 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIconClick('daily-reports', project.id);
                  }}
                  className="h-6 w-6"
                >
                  <Clipboard className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIconClick('time-log', project.id);
                  }}
                  className="h-6 w-6"
                >
                  <Clock className="h-3 w-3" />
                </Button>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      onIconClick('edit', project.id);
                    }}
                    className="h-6 w-6"
                  >
                    <Pen className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
