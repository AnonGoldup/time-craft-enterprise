import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Edit, 
  Trash2, 
  Clock,
  Play,
  Pause,
  MoreHorizontal
} from 'lucide-react';
import { formatDuration, calculateDuration } from '@/utils/timeCalculations';

interface TimeEntry {
  id: string;
  projectCode: string;
  projectName: string;
  costCode: string;
  costCodeName: string;
  timeIn: string;
  timeOut: string;
  breakIn?: string;
  breakOut?: string;
  duration: number;
  date: string;
  notes?: string;
}

interface GroupData {
  projectCode: string;
  projectName: string;
  costCode: string;
  costCodeName: string;
  entries: TimeEntry[];
  totalDuration: number;
}

interface TimesheetGroupCardProps {
  group: GroupData;
  selectedEntries: Set<string>;
  onSelectEntry: (entryId: string, selected: boolean) => void;
  onSelectGroup: (groupKey: string, selected: boolean) => void;
  onEditEntry: (entryId: string) => void;
  onDuplicateEntry: (entryId: string) => void;
  onDeleteEntry: (entryId: string) => void;
}

export const TimesheetGroupCard: React.FC<TimesheetGroupCardProps> = ({
  group,
  selectedEntries,
  onSelectEntry,
  onSelectGroup,
  onEditEntry,
  onDuplicateEntry,
  onDeleteEntry,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const groupKey = `${group.projectCode}-${group.costCode}`;
  const allSelected = group.entries.every(entry => selectedEntries.has(entry.id));
  const someSelected = group.entries.some(entry => selectedEntries.has(entry.id));

  const handleGroupSelect = () => {
    onSelectGroup(groupKey, !allSelected);
  };

  const getTimeBlockWidth = (duration: number) => {
    const maxDuration = Math.max(...group.entries.map(e => e.duration));
    return `${(duration / maxDuration) * 100}%`;
  };

  const getStatusColor = (entry: TimeEntry) => {
    const now = new Date();
    const entryDate = new Date(`${entry.date}T${entry.timeOut}`);
    
    if (entryDate > now) return 'bg-blue-500';
    if (entry.duration > 480) return 'bg-orange-500'; // Over 8 hours
    return 'bg-green-500';
  };

  return (
    <Card className="border border-border hover:border-border/60 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 h-auto"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>

            <Checkbox
              checked={allSelected}
              onCheckedChange={handleGroupSelect}
              ref={(el) => {
                if (el && el.querySelector('button')) {
                  const checkbox = el.querySelector('button') as HTMLButtonElement & { indeterminate?: boolean };
                  if (checkbox) {
                    checkbox.indeterminate = someSelected && !allSelected;
                  }
                }
              }}
            />

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {group.projectCode}
                </Badge>
                <span className="font-semibold text-foreground">{group.projectName}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="font-mono text-xs">
                  {group.costCode}
                </Badge>
                <span className="text-sm text-muted-foreground">{group.costCodeName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {formatDuration(group.totalDuration)}
              </div>
              <div className="text-xs text-muted-foreground">
                {group.entries.length} {group.entries.length === 1 ? 'entry' : 'entries'}
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="gap-2">
              <Copy className="h-4 w-4" />
              Clone Group
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-3">
            {group.entries.map((entry, index) => (
              <div key={entry.id} className="group">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <Checkbox
                    checked={selectedEntries.has(entry.id)}
                    onCheckedChange={(checked) => onSelectEntry(entry.id, !!checked)}
                  />

                  {/* Time Block Visualization */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm font-mono">
                          <Play className="h-3 w-3 text-green-600" />
                          {entry.timeIn}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-mono">
                          <Pause className="h-3 w-3 text-red-600" />
                          {entry.timeOut}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {formatDuration(entry.duration)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditEntry(entry.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDuplicateEntry(entry.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDeleteEntry(entry.id)}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Duration Bar */}
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${getStatusColor(entry)}`}
                        style={{ width: getTimeBlockWidth(entry.duration) }}
                      />
                    </div>

                    {entry.notes && (
                      <p className="text-xs text-muted-foreground italic">{entry.notes}</p>
                    )}
                  </div>
                </div>

                {index < group.entries.length - 1 && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};