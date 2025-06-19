
import React from 'react';
import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { MoreVertical, Plus, Calendar } from 'lucide-react';

interface TimeEntryHeaderProps {
  onAddRow: () => void;
  onCopyPreviousDay: () => void;
  onCopyPreviousWeek: () => void;
}

const TimeEntryHeader: React.FC<TimeEntryHeaderProps> = ({
  onAddRow,
  onCopyPreviousDay,
  onCopyPreviousWeek
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Enter Hours</h1>
        <p className="text-sm text-muted-foreground">Log your daily work hours</p>
      </div>
      
      <div className="flex items-center gap-2">
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 px-3">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuItem onClick={onCopyPreviousDay} className="gap-2">
              <Calendar className="h-4 w-4" />
              Copy previous day
            </ContextMenuItem>
            <ContextMenuItem onClick={onCopyPreviousWeek} className="gap-2">
              <Calendar className="h-4 w-4" />
              Copy previous week
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        
        <Button onClick={onAddRow} size="sm" className="h-9 px-3 gap-2 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>
    </div>
  );
};

export default TimeEntryHeader;
