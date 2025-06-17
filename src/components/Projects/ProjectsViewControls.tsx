
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { ViewMode, SortBy, FilterBy } from './types';

interface ProjectsViewControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  filterBy: FilterBy;
  onFilterChange: (filter: FilterBy) => void;
}

export const ProjectsViewControls: React.FC<ProjectsViewControlsProps> = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('card')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'tile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('tile')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="number">Order by: Number</SelectItem>
              <SelectItem value="name">Order by: Name</SelectItem>
              <SelectItem value="manager">Order by: Project Manager</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={filterBy} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="OPEN">Filter by: Open</SelectItem>
              <SelectItem value="COMPLETE">Filter by: Closed</SelectItem>
              <SelectItem value="BID">Filter by: Bid</SelectItem>
              <SelectItem value="BID_WIN">Filter by: Bid Win</SelectItem>
              <SelectItem value="BID_LOST">Filter by: Bid Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
