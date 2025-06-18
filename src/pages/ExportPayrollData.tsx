
import React, { useState } from 'react';
import { Download, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PayrollConfiguration } from '@/components/ExportPayroll/PayrollConfiguration';
import { PayrollFilesTable } from '@/components/ExportPayroll/PayrollFilesTable';

const ExportPayrollData = () => {
  const [exportFileNo, setExportFileNo] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

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
        <Download className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Export / Lock Payroll Data</h1>
          <p className="text-muted-foreground">Export payroll data and manage payroll locks</p>
        </div>
      </div>

      <Alert className="border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="font-medium">
          WARNING! This Project's Payroll is Not Set as Live
        </AlertDescription>
      </Alert>

      <PayrollConfiguration
        exportFileNo={exportFileNo}
        setExportFileNo={setExportFileNo}
      />

      <PayrollFilesTable
        payrollFiles={payrollFiles}
        selectedFiles={selectedFiles}
        onFileSelection={handleFileSelection}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
};

export default ExportPayrollData;
