
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Calendar, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ExportPayrollData = () => {
  const [exportFileNo, setExportFileNo] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // Mock data for current payroll export files
  const payrollFiles = [
    { id: '695', startDate: '10/22/2023', endDate: '10/28/2023', amount: '$0.00' },
    { id: '697', startDate: '10/29/2023', endDate: '10/26/2023', amount: '$0.00' },
    { id: '685', startDate: '10/15/2023', endDate: '10/21/2023', amount: '$0.00' },
    { id: '684', startDate: '10/15/2023', endDate: '10/21/2023', amount: '$0.00' },
    { id: '686', startDate: '10/17/2023', endDate: '10/17/2023', amount: '$0.00' },
    { id: '680', startDate: '10/8/2023', endDate: '10/14/2023', amount: '$0.00' },
    { id: '683', startDate: '10/10/2023', endDate: '10/13/2023', amount: '$0.00' },
    { id: '681', startDate: '10/10/2023', endDate: '10/13/2023', amount: '$0.00' },
    { id: '682', startDate: '10/12/2023', endDate: '10/12/2023', amount: '$0.00' },
    { id: '679', startDate: '10/1/2023', endDate: '10/7/2023', amount: '$0.00' },
    { id: '675', startDate: '9/24/2023', endDate: '9/30/2023', amount: '$0.00' },
    { id: '678', startDate: '9/25/2023', endDate: '9/29/2023', amount: '$0.00' },
    { id: '677', startDate: '9/25/2023', endDate: '9/29/2023', amount: '$0.00' },
    { id: '672', startDate: '9/17/2023', endDate: '9/23/2023', amount: '$0.00' },
    { id: '676', startDate: '9/18/2023', endDate: '9/22/2023', amount: '$0.00' },
    { id: '674', startDate: '9/21/2023', endDate: '9/27/2023', amount: '$0.00' },
    { id: '673', startDate: '9/18/2023', endDate: '9/22/2023', amount: '$0.00' },
    { id: '671', startDate: '9/18/2023', endDate: '9/18/2023', amount: '$0.00' },
    { id: '670', startDate: '9/18/2023', endDate: '9/18/2023', amount: '$0.00' }
  ];

  const handleFileSelection = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles([...selectedFiles, fileId]);
    } else {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFiles(payrollFiles.map(file => file.id));
    } else {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Download className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Export / Lock Payroll Data</h1>
          <p className="text-gray-600 dark:text-gray-400">Export payroll data and manage payroll locks</p>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-red-600 font-medium">
          WARNING! This Project's Payroll is Not Set as Live
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Payroll Export Configuration</CardTitle>
          <CardDescription>Configure and export payroll data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payrollExportFile">Payroll Export File:</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm">NEW</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="exportFileNo">Export File No:</Label>
              <Input 
                id="exportFileNo" 
                value={exportFileNo}
                onChange={(e) => setExportFileNo(e.target.value)}
                placeholder="Enter file number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="financialPackage">Financial Package:</Label>
              <Select defaultValue="sage300">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sage300">Sage 300 CRE (Constructor)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketArea">Market Area(s):</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Market Areas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project">Project(s):</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startingDate">Starting Date:</Label>
              <Input type="date" id="startingDate" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endingDate">Ending Date:</Label>
              <Input type="date" id="endingDate" />
            </div>
          </div>

          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              EXPORT
            </Button>
          </div>
        </CardContent>
      </Card>

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
                    onCheckedChange={handleSelectAll}
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
                      onCheckedChange={(checked) => handleFileSelection(file.id, checked as boolean)}
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
    </div>
  );
};

export default ExportPayrollData;
