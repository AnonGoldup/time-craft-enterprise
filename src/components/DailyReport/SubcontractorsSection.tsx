
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { SubcontractorEntry } from './types';

interface SubcontractorsSectionProps {
  subcontractors: SubcontractorEntry[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onAddSubcontractor: () => void;
  onUpdateSubcontractor: (id: string, field: keyof SubcontractorEntry, value: string | number) => void;
}

const SubcontractorsSection: React.FC<SubcontractorsSectionProps> = ({
  subcontractors,
  isOpen,
  setIsOpen,
  onAddSubcontractor,
  onUpdateSubcontractor
}) => {
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <div className="flex items-center justify-between">
              <CardTitle>Subcontractors</CardTitle>
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <Button 
                  onClick={(e) => { e.stopPropagation(); onAddSubcontractor(); }} 
                  size="sm" 
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Subcontractor
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
                  <TableHead className="text-white">Subcontractors</TableHead>
                  <TableHead className="text-white">Workers</TableHead>
                  <TableHead className="text-white">Comments</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subcontractors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No subcontractors added
                    </TableCell>
                  </TableRow>
                ) : (
                  subcontractors.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <Input 
                          value={entry.subcontractor} 
                          onChange={(e) => onUpdateSubcontractor(entry.id, 'subcontractor', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={entry.workers} 
                          onChange={(e) => onUpdateSubcontractor(entry.id, 'workers', parseInt(e.target.value) || 0)}
                          className="w-20" 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={entry.comments} 
                          onChange={(e) => onUpdateSubcontractor(entry.id, 'comments', e.target.value)}
                        />
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

export default SubcontractorsSection;
