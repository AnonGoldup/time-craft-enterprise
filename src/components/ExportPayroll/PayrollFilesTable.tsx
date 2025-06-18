
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
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Current Payroll Export Files</CardTitle>
        <CardDescription className="text-muted-foreground">Manage existing payroll export files</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary border-b border-border">
              <TableHead className="text-primary-foreground">
                <Checkbox 
                  checked={selectedFiles.length === payrollFiles.length}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead className="text-primary-foreground">ACTION</TableHead>
              <TableHead className="text-primary-foreground">Export File No</TableHead>
              <TableHead className="text-primary-foreground">Starting Date</TableHead>
              <TableHead className="text-primary-foreground">Ending Date</TableHead>
              <TableHead className="text-primary-foreground text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollFiles.map((file, index) => (
              <TableRow key={file.id} className={index % 2 === 0 ? 'bg-card hover:bg-muted/50' : 'bg-muted/30 hover:bg-muted/50'}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFiles.includes(file.id)}
                    onCheckedChange={(checked) => onFileSelection(file.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 border-border hover:bg-accent hover:text-accent-foreground">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 border-border hover:bg-accent hover:text-accent-foreground">
                      📄
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-foreground">{file.id}</TableCell>
                <TableCell className="text-foreground">{file.startDate}</TableCell>
                <TableCell className="text-foreground">{file.endDate}</TableCell>
                <TableCell className="text-right text-foreground">{file.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
