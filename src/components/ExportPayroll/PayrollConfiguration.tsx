
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PayrollConfigurationProps {
  exportFileNo: string;
  setExportFileNo: (value: string) => void;
}

export const PayrollConfiguration: React.FC<PayrollConfigurationProps> = ({
  exportFileNo,
  setExportFileNo
}) => {
  return (
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
  );
};
