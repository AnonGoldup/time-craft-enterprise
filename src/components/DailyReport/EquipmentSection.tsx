
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, ChevronRight, X } from 'lucide-react';
import { EquipmentEntry } from './types';

interface EquipmentSectionProps {
  equipment: EquipmentEntry[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddEquipment: () => void;
  onUpdateEquipment: (id: string, field: keyof EquipmentEntry, value: string | number) => void;
  onRemoveEquipment: (id: string) => void;
}

const EquipmentSection: React.FC<EquipmentSectionProps> = ({
  equipment,
  isOpen,
  setIsOpen,
  onAddEquipment,
  onUpdateEquipment,
  onRemoveEquipment
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle>Equipment</CardTitle>
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Button 
                  onClick={(e) => { e.stopPropagation(); onAddEquipment(); }} 
                  size="sm" 
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Equipment
                </Button>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-700 hover:bg-blue-700">
                  <TableHead className="text-white">Equipment</TableHead>
                  <TableHead className="text-white">Hours</TableHead>
                  <TableHead className="text-white">Notes</TableHead>
                  <TableHead className="text-white w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {equipment.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      No equipment added
                    </TableCell>
                  </TableRow>
                ) : (
                  equipment.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Input 
                          value={entry.equipment} 
                          onChange={(e) => onUpdateEquipment(entry.id, 'equipment', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={entry.hours} 
                          onChange={(e) => onUpdateEquipment(entry.id, 'hours', parseInt(e.target.value) || 0)}
                          className="w-20" 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={entry.notes} 
                          onChange={(e) => onUpdateEquipment(entry.id, 'notes', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveEquipment(entry.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default EquipmentSection;
