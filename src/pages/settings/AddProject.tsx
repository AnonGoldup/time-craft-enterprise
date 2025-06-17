
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FolderPlus } from 'lucide-react';

const AddProject = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FolderPlus className="h-8 w-8 text-orange-600 dark:text-orange-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Project</h1>
          <p className="text-gray-600 dark:text-gray-400">Create a new project in the system</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>Configure a new project with all necessary details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" placeholder="Enter project name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectNumber">Project Number</Label>
              <Input id="projectNumber" placeholder="Enter project number" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea id="description" placeholder="Enter project description" rows={3} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" type="number" placeholder="Enter budget amount" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Input id="client" placeholder="Enter client name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectManager">Project Manager</Label>
              <Input id="projectManager" placeholder="Enter project manager" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Project</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProject;
