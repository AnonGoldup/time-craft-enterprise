
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, X, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Employee } from '@/services/api';
import { Crew, CrewEntry } from './types';

interface CrewSectionProps {
  crew: Crew;
  employees: Employee[];
  loadingEmployees: boolean;
  isExpanded: boolean;
  showDeleteConfirmation: boolean;
  canDelete: boolean;
  onToggleExpanded: () => void;
  onAddEntry: () => void;
  onRemoveEntry: (entryId: string) => void;
  onUpdateCrew: (field: 'costCode' | 'workType', value: string) => void;
  onUpdateEntry: (entryId: string, field: keyof CrewEntry, value: string | number) => void;
  onRequestDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  getTotalHours: (type: 'st' | 'ot' | 'lost') => number;
}

const CrewSection: React.FC<CrewSectionProps> = ({
  crew,
  employees,
  loadingEmployees,
  isExpanded,
  showDeleteConfirmation,
  canDelete,
  onToggleExpanded,
  onAddEntry,
  onRemoveEntry,
  onUpdateCrew,
  onUpdateEntry,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  getTotalHours
}) => {
  const workTypeOptions = [
    'Base Contract',
    'COR - Approved',
    'Field Work Order / T&M',
    'Price / Do Not Proceed',
    'Price / Proceed',
    'Work Under Protest'
  ];

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggleExpanded}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>{crew.name}</CardTitle>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Button onClick={onAddEntry} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Line
                </Button>
                {canDelete && (
                  <AlertDialog open={showDeleteConfirmation} onOpenChange={(open) => !open && onCancelDelete()}>
                    <AlertDialogTrigger asChild>
                      <Button 
                        onClick={onRequestDelete} 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove Crew
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You are about to delete the Crew from the Daily Report.
                          If you continue, all data entered into this crew will be lost.
                          <br /><br />
                          Are you sure that you want to delete this Crew?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>NO</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={onConfirmDelete}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Yes, delete this Crew
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            {/* Crew-level Cost Code and Work Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="text-sm font-medium">Cost Code:</label>
                <Input
                  value={crew.costCode}
                  onChange={(e) => onUpdateCrew('costCode', e.target.value)}
                  placeholder="Enter cost code..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Work Type:</label>
                <Select
                  value={crew.workType}
                  onValueChange={(value) => onUpdateCrew('workType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-blue-700 hover:bg-blue-700">
                  <TableHead className="text-white">Employees</TableHead>
                  <TableHead className="text-white">ST</TableHead>
                  <TableHead className="text-white">OT</TableHead>
                  <TableHead className="text-white">Lost</TableHead>
                  <TableHead className="text-white">Work</TableHead>
                  <TableHead className="text-white">Comments</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crew.entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <Select
                        value={entry.employee}
                        onValueChange={(value) => onUpdateEntry(entry.id, 'employee', value)}
                        disabled={loadingEmployees}
                      >
                        <SelectTrigger className="min-w-[200px]">
                          <SelectValue placeholder={loadingEmployees ? "Loading..." : "Select Employee"} />
                        </SelectTrigger>
                        <SelectContent>
                          {employees.map((employee) => (
                            <SelectItem 
                              key={employee.employeeID} 
                              value={`${employee.lastName}, ${employee.firstName}`}
                            >
                              {employee.lastName}, {employee.firstName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.st}
                        onChange={(e) => onUpdateEntry(entry.id, 'st', parseInt(e.target.value) || 0)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.ot}
                        onChange={(e) => onUpdateEntry(entry.id, 'ot', parseInt(e.target.value) || 0)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={entry.lost}
                        onChange={(e) => onUpdateEntry(entry.id, 'lost', parseInt(e.target.value) || 0)}
                        className="w-16"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.work}
                        onChange={(e) => onUpdateEntry(entry.id, 'work', e.target.value)}
                        className="min-w-[150px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={entry.comments}
                        onChange={(e) => onUpdateEntry(entry.id, 'comments', e.target.value)}
                        className="min-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRemoveEntry(entry.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableCell className="text-white font-bold">Total Hours:</TableCell>
                  <TableCell className="text-white font-bold">{getTotalHours('st')}</TableCell>
                  <TableCell className="text-white font-bold">{getTotalHours('ot')}</TableCell>
                  <TableCell className="text-white font-bold">{getTotalHours('lost')}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default CrewSection;
