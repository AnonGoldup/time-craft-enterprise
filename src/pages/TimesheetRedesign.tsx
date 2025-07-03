import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Copy, 
  Edit, 
  Trash2, 
  Save,
  MoreHorizontal,
  Play,
  Pause
} from 'lucide-react';
import { TimesheetGroupCard } from '@/components/TimesheetRedesign/TimesheetGroupCard';
import { TimelineOverview } from '@/components/TimesheetRedesign/TimelineOverview';
import { BulkActionsToolbar } from '@/components/TimesheetRedesign/BulkActionsToolbar';
import { QuickEntryPanel } from '@/components/TimesheetRedesign/QuickEntryPanel';
import { TimesheetStats } from '@/components/TimesheetRedesign/TimesheetStats';
import { WorkflowDiagrams } from '@/components/TimesheetRedesign/WorkflowDiagrams';

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
  duration: number; // in minutes
  date: string;
  notes?: string;
}

interface GroupedEntries {
  [key: string]: {
    projectCode: string;
    projectName: string;
    costCode: string;
    costCodeName: string;
    entries: TimeEntry[];
    totalDuration: number;
  };
}

const TimesheetRedesign: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-07-01');
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [showQuickEntry, setShowQuickEntry] = useState(false);
  const [showDiagrams, setShowDiagrams] = useState(false);

  // Sample data for testing
  const sampleEntries: TimeEntry[] = [
    {
      id: '1',
      projectCode: '25-0001',
      projectName: 'AltaPro Project Alpha',
      costCode: '001-040-041',
      costCodeName: 'INDIRECT LABOR',
      timeIn: '08:00',
      timeOut: '12:00',
      duration: 240,
      date: '2025-07-01',
      notes: 'Morning shift'
    },
    {
      id: '2',
      projectCode: '25-0001',
      projectName: 'AltaPro Project Alpha',
      costCode: '001-040-041',
      costCodeName: 'INDIRECT LABOR',
      timeIn: '13:00',
      timeOut: '17:00',
      duration: 240,
      date: '2025-07-01',
      notes: 'Afternoon shift'
    },
    {
      id: '3',
      projectCode: '25-0001',
      projectName: 'AltaPro Project Alpha',
      costCode: '001-080-050',
      costCodeName: 'EQUIPMENT OPERATION',
      timeIn: '17:30',
      timeOut: '19:00',
      duration: 90,
      date: '2025-07-01',
      notes: 'Equipment maintenance'
    },
    {
      id: '4',
      projectCode: '25-0002',
      projectName: 'Beta Construction',
      costCode: '002-010-020',
      costCodeName: 'SITE PREPARATION',
      timeIn: '07:00',
      timeOut: '08:00',
      duration: 60,
      date: '2025-07-01',
      notes: 'Early setup'
    }
  ];

  // Group entries by project and cost code
  const groupedEntries: GroupedEntries = useMemo(() => {
    return sampleEntries.reduce((groups, entry) => {
      const key = `${entry.projectCode}-${entry.costCode}`;
      if (!groups[key]) {
        groups[key] = {
          projectCode: entry.projectCode,
          projectName: entry.projectName,
          costCode: entry.costCode,
          costCodeName: entry.costCodeName,
          entries: [],
          totalDuration: 0
        };
      }
      groups[key].entries.push(entry);
      groups[key].totalDuration += entry.duration;
      return groups;
    }, {} as GroupedEntries);
  }, []);

  const handleSelectEntry = useCallback((entryId: string, selected: boolean) => {
    setSelectedEntries(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(entryId);
      } else {
        newSet.delete(entryId);
      }
      return newSet;
    });
  }, []);

  const handleSelectGroup = useCallback((groupKey: string, selected: boolean) => {
    const group = groupedEntries[groupKey];
    if (!group) return;

    setSelectedEntries(prev => {
      const newSet = new Set(prev);
      group.entries.forEach(entry => {
        if (selected) {
          newSet.add(entry.id);
        } else {
          newSet.delete(entry.id);
        }
      });
      return newSet;
    });
  }, [groupedEntries]);

  const totalHours = useMemo(() => {
    return Object.values(groupedEntries).reduce((total, group) => total + group.totalDuration, 0) / 60;
  }, [groupedEntries]);

  const selectedCount = selectedEntries.size;

  return (
    <div className="space-y-6 p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timesheet - Redesigned</h1>
          <p className="text-muted-foreground">Enhanced interface for efficient time tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowDiagrams(!showDiagrams)}
            className="gap-2"
          >
            <MoreHorizontal className="h-4 w-4" />
            {showDiagrams ? 'Hide' : 'Show'} Diagrams
          </Button>
          <Button 
            onClick={() => setShowQuickEntry(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Quick Entry
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <TimesheetStats 
        totalHours={totalHours}
        entriesCount={sampleEntries.length}
        projectsCount={new Set(sampleEntries.map(e => e.projectCode)).size}
        selectedDate={selectedDate}
      />

      {/* Timeline Overview */}
      <TimelineOverview 
        entries={sampleEntries}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      {/* Bulk Actions Toolbar */}
      {selectedCount > 0 && (
        <BulkActionsToolbar 
          selectedCount={selectedCount}
          onClear={() => setSelectedEntries(new Set())}
          onDuplicate={() => console.log('Duplicate selected entries')}
          onDelete={() => console.log('Delete selected entries')}
          onMerge={() => console.log('Merge selected entries')}
        />
      )}

      {/* Grouped Entries */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Time Entries - {new Date(selectedDate).toLocaleDateString()}
        </h2>

        {Object.entries(groupedEntries).map(([key, group]) => (
          <TimesheetGroupCard
            key={key}
            group={group}
            selectedEntries={selectedEntries}
            onSelectEntry={handleSelectEntry}
            onSelectGroup={handleSelectGroup}
            onEditEntry={(entryId) => console.log('Edit entry:', entryId)}
            onDuplicateEntry={(entryId) => console.log('Duplicate entry:', entryId)}
            onDeleteEntry={(entryId) => console.log('Delete entry:', entryId)}
          />
        ))}

        {Object.keys(groupedEntries).length === 0 && (
          <Card className="border-dashed border-2 border-border">
            <CardContent className="py-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No entries for this date</h3>
              <p className="text-muted-foreground mb-4">Start tracking your time by creating a new entry</p>
              <Button onClick={() => setShowQuickEntry(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Add First Entry
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Diagrams Section */}
      {showDiagrams && <WorkflowDiagrams />}

      {/* Quick Entry Panel */}
      {showQuickEntry && (
        <QuickEntryPanel 
          onClose={() => setShowQuickEntry(false)}
          onSave={(entry) => {
            console.log('Save new entry:', entry);
            setShowQuickEntry(false);
          }}
        />
      )}
    </div>
  );
};

export default TimesheetRedesign;