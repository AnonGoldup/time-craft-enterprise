
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar, FileSpreadsheet } from 'lucide-react';

const HoursBreakdown = () => {
  const [fromDate, setFromDate] = useState('2025-05-19');
  const [throughDate, setThroughDate] = useState('2025-06-18');
  const [selectedProject, setSelectedProject] = useState('all');
  const [includeUnapproved, setIncludeUnapproved] = useState(false);

  const handleGenerateReport = () => {
    console.log('Generating Hours Breakdown report...', {
      fromDate,
      throughDate,
      selectedProject,
      includeUnapproved
    });
  };

  const handleUnapprovedChange = (checked: boolean | "indeterminate") => {
    setIncludeUnapproved(checked === true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-sm">Tm</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hours Breakdown - Excel
        </h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg text-gray-700 dark:text-gray-300">
            Query: <span className="italic">Select parameters to Hours Breakdown - Excel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fromDate" className="text-red-600 font-medium">
                From Date:
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="fromDate"
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="flex-1"
                />
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="throughDate" className="text-red-600 font-medium">
                Through Date:
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="throughDate"
                  type="date"
                  value={throughDate}
                  onChange={(e) => setThroughDate(e.target.value)}
                  className="flex-1"
                />
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project" className="text-red-600 font-medium">
              Project:
            </Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger id="project" className="w-full">
                <SelectValue placeholder="Select project..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="project1">Project Alpha</SelectItem>
                <SelectItem value="project2">Project Beta</SelectItem>
                <SelectItem value="project3">Project Gamma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeUnapproved"
              checked={includeUnapproved}
              onCheckedChange={handleUnapprovedChange}
            />
            <Label htmlFor="includeUnapproved" className="text-red-600 font-medium">
              Include Unapproved Time:
            </Label>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleGenerateReport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded"
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              SPREADSHEET
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HoursBreakdown;
