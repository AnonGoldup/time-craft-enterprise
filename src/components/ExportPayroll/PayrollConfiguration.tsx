
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
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Payroll Export Configuration</CardTitle>
        <CardDescription className="text-muted-foreground">Configure and export payroll data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payrollExportFile" className="text-foreground">Payroll Export File:</Label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">NEW</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exportFileNo" className="text-foreground">Export File No:</Label>
            <Input 
              id="exportFileNo" 
              value={exportFileNo}
              onChange={(e) => setExportFileNo(e.target.value)}
              placeholder="Enter file number"
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="financialPackage" className="text-foreground">Financial Package:</Label>
            <Select defaultValue="sage300">
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="sage300" className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">Sage 300 CRE (Constructor)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketArea" className="text-foreground">Market Area(s):</Label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all" className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">All Market Areas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project" className="text-foreground">Project(s):</Label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all" className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">All Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startingDate" className="text-foreground">Starting Date:</Label>
            <Input type="date" id="startingDate" className="bg-input border-border text-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endingDate" className="text-foreground">Ending Date:</Label>
            <Input type="date" id="endingDate" className="bg-input border-border text-foreground" />
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
            EXPORT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
