
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar, Search, RefreshCw } from 'lucide-react';
import { formatDate } from './utils';
import { Project } from './types';

interface FiltersSectionProps {
  startDate: Date;
  endDate: Date;
  selectedProject: string;
  selectedStatus: string;
  searchQuery: string;
  mockProjects: Project[];
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onProjectChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onResetFilters: () => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  startDate,
  endDate,
  selectedProject,
  selectedStatus,
  searchQuery,
  mockProjects,
  onStartDateChange,
  onEndDateChange,
  onProjectChange,
  onStatusChange,
  onSearchChange,
  onResetFilters
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* First Row: Dates and Project/Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-9">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(startDate, 'MMM dd, yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent 
                  mode="single" 
                  selected={startDate} 
                  onSelect={onStartDateChange}
                  disabled={(date) => date > new Date()} 
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label className="text-xs mb-1">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-9">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(endDate, 'MMM dd, yyyy')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent 
                  mode="single" 
                  selected={endDate} 
                  onSelect={onEndDateChange}
                  disabled={(date) => date > new Date() || date < startDate} 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Project and Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs mb-1">Project</Label>
            <Select value={selectedProject} onValueChange={onProjectChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {mockProjects.map((project) => (
                  <SelectItem key={project.projectCode} value={project.projectCode}>
                    {project.projectCode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-xs mb-1">Status</Label>
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Second Row: Search and Reset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-xs mb-1">Search</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search entries..." 
              value={searchQuery} 
              onChange={(e) => onSearchChange(e.target.value)} 
              className="pl-8 h-9" 
            />
          </div>
        </div>
        <div className="flex items-end">
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            <RefreshCw className="w-4 h-4 mr-1" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};
