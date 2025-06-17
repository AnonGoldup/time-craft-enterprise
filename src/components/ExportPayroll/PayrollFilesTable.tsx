
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Download } from 'lucide-react';

interface PayrollFile {
  id: string;
  startDate: string;
  endDate: string;
  amount: string;
}

interface PayrollFilesTableProps {
  payrollFiles: PayrollFile[];
  selectedFiles: string[];
  onFileSelection: (fileId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export const PayrollFilesTable: React.FC<PayrollFilesTableProps> = ({
  payrollFiles,
  selectedFiles,
  onFileSelection,
  onSelectAll
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Payroll Export Files</CardTitle>
        <CardDescription>Manage existing payroll export files</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-600 hover:bg-blue-600">
              <TableHead className="text-white">
                <Checkbox 
                  checked={selectedFiles.length === payrollFiles.length}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="text-white">ACTION</TableHead>
              <TableHead className="text-white">Export File No</TableHead>
              <TableHead className="text-white">Starting Date</TableHead>
              <TableHead className="text-white">Ending Date</TableHead>
              <TableHead className="text-white text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollFiles.map((file, index) => (
              <TableRow key={file.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFiles.includes(file.id)}
                    onCheckedChange={(checked) => onFileSelection(file.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                      📄
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{file.id}</TableCell>
                <TableCell>{file.startDate}</TableCell>
                <TableCell>{file.endDate}</TableCell>
                <TableCell className="text-right">{file.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
