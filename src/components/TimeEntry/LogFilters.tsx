
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addWeeks, subWeeks } from 'date-fns';

interface Project {
  projectID: number;
  projectCode: string;
  projectDescription: string;
}

interface LogFiltersProps {
  selectedEmployee: string;
  setSelectedEmployee: (value: string) => void;
  selectedProject: string;
  setSelectedProject: (value: string) => void;
  currentWeek: Date;
  setCurrentWeek: (date: Date) => void;
  projects: Project[];
  userFullName: string;
  getWeekRange: () => string;
}

const LogFilters: React.FC<LogFiltersProps> = ({
  selectedEmployee,
  setSelectedEmployee,
  selectedProject,
  setSelectedProject,
  currentWeek,
  setCurrentWeek,
  projects,
  userFullName,
  getWeekRange
}) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Employee Filter */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" aria-hidden="true" />
            <label htmlFor="employee-select" className="text-sm text-muted-foreground min-w-[70px]">
              Employee:
            </label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger 
                id="employee-select"
                className="w-48 border-input bg-background focus:ring-ring"
                aria-label="Select employee"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value={selectedEmployee}>{userFullName}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-6 w-px bg-border" aria-hidden="true"></div>

          {/* Project Filter */}
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
            <label htmlFor="project-select" className="text-sm text-muted-foreground min-w-[50px]">
              Project:
            </label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger 
                id="project-select"
                className="w-64 border-input bg-background focus:ring-ring"
                aria-label="Select project"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.projectID} value={project.projectID.toString()}>
                    {project.projectCode} - {project.projectDescription}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="h-6 w-px bg-border" aria-hidden="true"></div>

          {/* Enhanced Week Navigation */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            <label className="text-sm text-muted-foreground min-w-[40px]">Week:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
                className="h-8 w-8 p-0 focus:ring-ring"
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[200px] text-center text-foreground">
                {getWeekRange()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
                className="h-8 w-8 p-0 focus:ring-ring"
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogFilters;
