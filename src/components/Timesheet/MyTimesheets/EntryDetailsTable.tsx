
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';
import { TimesheetEntry } from './types';
import { StatusBadge } from './StatusBadge';
import { formatDate } from './utils';

interface EntryDetailsTableProps {
  entries: TimesheetEntry[];
  onViewDetails: (entry: TimesheetEntry) => void;
  onEdit: (entry: TimesheetEntry) => void;
  onDelete: (entry: TimesheetEntry) => void;
}

export const EntryDetailsTable: React.FC<EntryDetailsTableProps> = ({
  entries,
  onViewDetails,
  onEdit,
  onDelete
}) => {
  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
          <p className="text-sm">Try adjusting your filters or date range</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="border-b bg-gray-50 p-4">
          <h3 className="font-semibold">Timesheet Entries</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Extra</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost Code</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {entries.map((entry) => (
                <tr key={entry.entryId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{entry.entryId}</td>
                  <td className="px-4 py-3 text-sm">{formatDate(entry.dateWorked, 'MMM dd')}</td>
                  <td className="px-4 py-3 text-sm">
                    <div>
                      <div className="font-medium">{entry.projectCode}</div>
                      <div className="text-xs text-gray-500">{entry.projectDescription}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{entry.extraValue}</td>
                  <td className="px-4 py-3 text-sm">
                    <div>
                      <div className="font-medium">{entry.costCode}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]">{entry.costCodeDescription}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-2">
                        {entry.standardHours > 0 && (
                          <span className="text-blue-600 font-medium">{entry.standardHours}</span>
                        )}
                        {entry.overtimeHours > 0 && (
                          <span className="text-orange-600 font-medium">+{entry.overtimeHours}</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">Total: {entry.totalHours}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onViewDetails(entry)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEdit(entry)}
                        disabled={entry.status !== 'Draft'}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onDelete(entry)}
                        disabled={entry.status !== 'Draft'}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
