
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Settings2 } from 'lucide-react';

const AddOccupancyType = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add Occupancy Type</h1>
          <p className="text-gray-600 dark:text-gray-400">Define occupancy classifications for projects</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Occupancy Type Information</CardTitle>
          <CardDescription>Create a new occupancy type classification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="typeName">Occupancy Type Name</Label>
              <Input id="typeName" placeholder="Enter occupancy type name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeCode">Type Code</Label>
              <Input id="typeCode" placeholder="Enter type code" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter occupancy type description" rows={3} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter category" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regulations">Applicable Regulations</Label>
              <Input id="regulations" placeholder="Enter applicable regulations" />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Add Occupancy Type</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddOccupancyType;
