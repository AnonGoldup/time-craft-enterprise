
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FolderPlus } from 'lucide-react';

const AddDivision = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <FolderPlus className="h-8 w-8 text-green-600 dark:text-green-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Division</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage company divisions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Division Information</CardTitle>
          <CardDescription>Add a new division to your company structure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="divisionName">Division Name</Label>
              <Input id="divisionName" placeholder="Enter division name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="divisionCode">Division Code</Label>
              <Input id="divisionCode" placeholder="Enter division code" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter division description" rows={3} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manager">Division Manager</Label>
              <Input id="manager" placeholder="Enter manager name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter location" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Add Division</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDivision;
