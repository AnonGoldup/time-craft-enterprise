
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { ViewMode } from './types';

interface ProjectsViewControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ProjectsViewControls: React.FC<ProjectsViewControlsProps> = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
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
  );
};
